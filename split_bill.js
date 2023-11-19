     
        function divideBill() {
            const billName = document.getElementById("billName").value;
            const billAmount = parseFloat(document.getElementById("billAmount").value);
            const paidBy = document.getElementById("paidBy").value;

            const selectedMembers = [];
            const memberCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

            memberCheckboxes.forEach(checkbox => {
                selectedMembers.push(checkbox.value);
            });

            const amountPerMember = billAmount / (selectedMembers.length); 
            const resultsText = document.getElementById("resultsText");
            resultsText.innerHTML = `Bill Name: ${billName}<br>`;
            resultsText.innerHTML += `Bill Amount: $${billAmount.toFixed(2)}<br>`;
            resultsText.innerHTML += `Paid By: ${paidBy}<br>`;
            resultsText.innerHTML += `Divided Among: ${selectedMembers.join(', ')}<br>`;
            resultsText.innerHTML += `Amount per Member: $${amountPerMember.toFixed(2)}`;
        }
   