// JavaScript for Scavenger Hunt Website
displaySuccessMessage();
document.getElementById("submitBtn").addEventListener("click", function() {
    // Get values from the input boxes
    const entryBox1 = document.getElementById("entryBox1").value.trim();
    const entryBox2 = document.getElementById("entryBox2").value.trim();
    const entryBox3 = document.getElementById("entryBox3").value.trim();
    const entryBox4 = document.getElementById("entryBox4").value.trim();
    const entryBox5 = document.getElementById("entryBox5").value.trim();

    // Define correct codes
    const correctCodes = {
        entryBox1: "APPLE", // Replace with the actual correct code
        entryBox2: "4939576680741903", // Replace with the actual correct code
        entryBox3: "ACE93MD2R34L", // Replace with the actual correct code
        entryBox4: "PURPLE", // Replace with the actual correct code
        entryBox5: "9389" // Replace with the actual correct code
    };

    // Check if each input matches the correct code
    const isBox1Correct = checkCode("entryBox1", entryBox1, correctCodes.entryBox1);
    const isBox2Correct = checkCode("entryBox2", entryBox2, correctCodes.entryBox2);
    const isBox3Correct = checkCode("entryBox3", entryBox3, correctCodes.entryBox3);
    const isBox4Correct = checkCode("entryBox4", entryBox4, correctCodes.entryBox4);
    const isBox5Correct = checkCode("entryBox5", entryBox5, correctCodes.entryBox5);

    // If all codes are correct, display success message
    if (isBox1Correct && isBox2Correct && isBox3Correct && isBox4Correct && isBox5Correct) {
        displaySuccessMessage();
    }
});

function checkCode(inputId, userCode, correctCode) {
    const inputBox = document.getElementById(inputId);
    if (userCode === correctCode) {
        inputBox.style.outline = "2px solid lightgreen";
        return true;
    } else {
        inputBox.style.outline = "2px solid lightcoral";
        return false;
    }
}

function displaySuccessMessage() {
    let messageDiv = document.getElementById("successMessage");
    if (!messageDiv) {
        messageDiv = document.createElement("div");
        messageDiv.id = "successMessage";
        messageDiv.style.marginTop = "40px";
        messageDiv.style.color = "green";
        messageDiv.style.fontWeight = "bold";
        messageDiv.style.fontSize = "60px";
        document.body.appendChild(messageDiv);
    }
    messageDiv.textContent = "Steam ($25) - Inside old PC inside Zack's room";
}
