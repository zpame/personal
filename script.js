
document.getElementById("submitBtn").addEventListener("click", function() {
    const entryBox1 = document.getElementById("entryBox1").value.trim();
    const entryBox2 = document.getElementById("entryBox2").value.trim();
    const entryBox3 = document.getElementById("entryBox3").value.trim();

    const correctCodes = {
        entryBox1: "APPLE", 
        entryBox2: "4939576680741903", 
        entryBox3: "ACE93MD2R34L"  
    };

    checkCode("entryBox1", entryBox1, correctCodes.entryBox1);
    checkCode("entryBox2", entryBox2, correctCodes.entryBox2);
    checkCode("entryBox3", entryBox3, correctCodes.entryBox3);
});

function checkCode(inputId, userCode, correctCode) {
    const inputBox = document.getElementById(inputId);
    if (userCode == correctCode) {
        inputBox.style.outline = "2px solid lightgreen";
    } else {
        inputBox.style.outline = "2px solid lightcoral";
    }
}