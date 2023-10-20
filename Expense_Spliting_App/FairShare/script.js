const groups = []; // An array to store information for multiple groups
let currentGroupIndex = -1; // The index of the currently selected group

document.getElementById("createGroup").addEventListener("click", function () {
    const groupName = document.getElementById("groupName").value;
    if (groupName.trim() === "") {
        alert("Please enter a valid group name.");
        return;
    }

    // Create a new group object
    const group = {
        name: groupName,
        members: [],
        payments: [],
    };

    // Add the group to the array of groups
    groups.push(group);

    // Switch to the newly created group
    switchGroup(groups.length - 1);
    updateGroupSelector();
    document.getElementById("members").style.display = "block";
});

// Switch to a specific group
function switchGroup(index) {
    if (index >= 0 && index < groups.length) {
        currentGroupIndex = index;
        updateMemberList();
        updatePaymentHistory();
        document.getElementById("groupName").value = groups[currentGroupIndex].name;
        updateSelectedMembersList();
    }
}

// Update the group selector (for switching between groups)
function updateGroupSelector() {
    const groupSelector = document.getElementById("groupSelector");
    groupSelector.innerHTML = "";
    groups.forEach((group, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = group.name;
        groupSelector.appendChild(option);
    });
}

// Event listener for group selection
document.getElementById("groupSelector").addEventListener("change", function () {
    const selectedGroupIndex = parseInt(this.value);
    switchGroup(selectedGroupIndex);
});

document.getElementById("addMember").addEventListener("click", function () {
    const memberName = document.getElementById("memberName").value;
    if (memberName.trim() === "") {
        alert("Please enter a valid member name.");
        return;
    }
    groups[currentGroupIndex].members.push({ name: memberName, balance: 0 });
    document.getElementById("memberName").value = "";
    updateMemberList();
    updateSelectedMembersList();
});

document.getElementById("divideBill").addEventListener("click", function () {
    const totalAmount = parseFloat(document.getElementById("billAmount").value);
    const payerName = document.getElementById("payerName").value;
    const paymentPurpose = document.getElementById("paymentPurpose").value;

    if (isNaN(totalAmount) || totalAmount <= 0) {
        alert("Please enter a valid bill amount.");
        return;
    }

    if (groups[currentGroupIndex].members.length === 0) {
        alert("Please add group members before dividing the bill.");
        return;
    }

    if (payerName.trim() === "" || paymentPurpose.trim() === "") {
        alert("Please enter a valid payer name and payment purpose.");
        return;
    }

    // Get the selected members from the checkboxes
    const selectedMembers = getSelectedMembers();

    if (selectedMembers.length === 0) {
        alert("Please select members to split the bill.");
        return;
    }

    const payer = findMemberByName(payerName);

    if (!payer) {
        alert("Invalid payer name. Please enter a valid name.");
        return;
    }

    const individualShare = totalAmount / selectedMembers.length;
    for (const member of selectedMembers) {
        member.balance -= individualShare;
    }
    payer.balance += totalAmount;

    updateMemberList();
    alert(`${payer.name} paid $${totalAmount} for ${paymentPurpose} on behalf of the selected group members.`);
});


function getSelectedMembers() {
    const selectedMembers = [];
    const checkboxes = document.querySelectorAll("#checkboxContainer input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const memberName = checkbox.value;
            const member = findMemberByName(memberName);
            if (member) {
                selectedMembers.push(member);
            }
        }
    }); // Add the closing curly brace here
    return selectedMembers;
}

// Update the selected members list for the current group
function updateSelectedMembersList() {
const checkboxContainer = document.getElementById("checkboxContainer");
checkboxContainer.innerHTML = "";

groups[currentGroupIndex].members.forEach((member) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = member.name;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(member.name));
    checkboxContainer.appendChild(label);
});
}

document.getElementById("recordPayment").addEventListener("click", function () {
const payerName = prompt("Who paid? (Enter their name)");
const recipientName = prompt("To whom should the payment be recorded? (Enter their name)");
const paymentAmount = parseFloat(prompt("Enter the payment amount:"));

if (isNaN(paymentAmount) || paymentAmount <= 0) {
    alert("Please enter a valid payment amount.");
    return;
}

const payer = findMemberByName(payerName);
const recipient = findMemberByName(recipientName);

if (!payer || !recipient) {
    alert("Invalid member names. Please enter valid names.");
    return;
}

payer.balance -= paymentAmount;
recipient.balance += paymentAmount;

updateMemberList();

const paymentInfo = `${payer.name} paid $${paymentAmount} to ${recipient.name}.`;
groups[currentGroupIndex].payments.push(paymentInfo);
updatePaymentHistory();
});

function calculateTransactions() {
const group = groups[currentGroupIndex];
const transactions = [];

group.members.forEach(payer => {
    group.members.forEach(payee => {
        if (payer !== payee) {
            const amountToPay = payee.balance - payer.balance;

            if (amountToPay > 0) {
                transactions.push({
                    from: payer.name,
                    to: payee.name,
                    amount: amountToPay.toFixed(2),
                });
            }
        }
    });
});

return transactions;
}

// Display transactions
document.getElementById("showTransactions").addEventListener("click", function () {
const transactions = calculateTransactions();
if (transactions.length === 0) {
    alert("No transactions needed. Everyone is settled up!");
} else {
    const transactionInfo = transactions.map(
        (transaction) =>
            `${transaction.from} owes ${transaction.to} $${transaction.amount}`
    );
    alert("Transactions:\n" + transactionInfo.join("\n"));
}
});

function findMemberByName(name) {
return groups[currentGroupIndex].members.find(member => member.name === name);
}

function updateMemberList() {
const memberList = document.getElementById("memberList");
memberList.innerHTML = "";
for (const member of groups[currentGroupIndex].members) {
    const li = document.createElement("li");
    li.textContent = `${member.name}: $${member.balance.toFixed(2)}`;
    memberList.appendChild(li);
}
}

function updatePaymentHistory() {
const paymentHistory = document.getElementById("paymentHistory");
paymentHistory.innerHTML = groups[currentGroupIndex].payments.join("<br>");
}

// Call this function when the page loads to set up the initial state
function initialize() {
updateGroupSelector();
switchGroup(0); // Select the first group
}
document.getElementById("recordPayment").addEventListener("click", function () {
    const payerName = prompt("Who paid? (Enter their name)");
    const recipientName = prompt("To whom should the payment be recorded? (Enter their name)");
    const paymentAmount = parseFloat(prompt("Enter the payment amount:"));

    if (isNaN(paymentAmount) || paymentAmount <= 0) {
        alert("Please enter a valid payment amount.");
        return;
    }

    const payer = findMemberByName(payerName);
    const recipient = findMemberByName(recipientName);

    if (!payer || !recipient) {
        alert("Invalid member names. Please enter valid names.");
        return;
    }

    payer.balance -= paymentAmount;
    recipient.balance += paymentAmount;

    updateMemberList();

    const paymentInfo = `${payer.name} paid $${paymentAmount} to ${recipient.name}.`;
    groups[currentGroupIndex].payments.push(paymentInfo);
    updatePaymentHistory();

    // Add the payment to the transaction history
    updateTransactionHistory(paymentInfo);
});

// Function to update and display transaction history

function updateTransactionHistory(paymentInfo) {
    const transactionHistory = document.getElementById("transactionHistory");
    const li = document.createElement("li");
    li.textContent = paymentInfo;
    transactionHistory.appendChild(li);
}

initialize();

