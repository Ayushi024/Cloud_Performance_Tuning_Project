
const groupMembers = {};

function addMember() {
    const groupName = document.getElementById("groupName").value;
    const memberName = document.getElementById("memberName").value;

    if (groupName && memberName) {
        if (!groupMembers[groupName]) {
            groupMembers[groupName] = [];
        }
        groupMembers[groupName].push(memberName);

        // Update the member list
        const memberList = document.getElementById("memberList");
        const listItem = document.createElement("li");
        listItem.textContent = memberName;
        memberList.appendChild(listItem);

        // Clear the member input
        document.getElementById("memberName").value = "";

        // Update the group select options
        updateGroupSelect();
        updateDeleteMemberSelect(groupName);
    }
}

function updateGroupSelect() {
    const selectGroup = document.getElementById("selectGroup");
    selectGroup.innerHTML = '<option value="" disabled selected>Select a group</option>';
    for (const group in groupMembers) {
        const option = document.createElement("option");
        option.value = group;
        option.textContent = group;
        selectGroup.appendChild(option);
    }
}

function listGroupMembers() {
    const selectedGroup = document.getElementById("selectGroup").value;
    const memberList = document.getElementById("memberList");

    // Clear the existing list
    memberList.innerHTML = '';

    if (selectedGroup && groupMembers[selectedGroup]) {
        groupMembers[selectedGroup].forEach(memberName => {
            const listItem = document.createElement("li");
            listItem.textContent = memberName;
            memberList.appendChild(listItem);
        });
        // Update the delete member select options
        updateDeleteMemberSelect(selectedGroup);
    }
}

function updateDeleteMemberSelect(groupName) {
    const deleteMemberSelect = document.getElementById("deleteMember");
    deleteMemberSelect.innerHTML = '<option value="" disabled selected>Select a member to delete</option>';
    if (groupMembers[groupName]) {
        groupMembers[groupName].forEach(memberName => {
            const option = document.createElement("option");
            option.value = memberName;
            option.textContent = memberName;
            deleteMemberSelect.appendChild(option);
        });
    }
}

function deleteMember() {
    const selectedGroup = document.getElementById("selectGroup").value;
    const selectedMember = document.getElementById("deleteMember").value;

    if (selectedGroup && selectedMember) {
        const groupIndex = groupMembers[selectedGroup].indexOf(selectedMember);
        if (groupIndex !== -1) {
            groupMembers[selectedGroup].splice(groupIndex, 1);
           
            listGroupMembers();
          
            updateDeleteMemberSelect(selectedGroup);
        }
    }
}

function splitBill() {
    window.location.href = "split_bill.html";
}

updateGroupSelect();
