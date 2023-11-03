const passwordBox = document.getElementById("passbox");
const copyBtn = document.getElementById("copy");
const regenerateBtn = document.getElementById("regenerate");
const rangeBox = document.getElementById("range-box");
const range = document.getElementById("range");
const lowerBtn = document.getElementById("lower");
const upperBtn = document.getElementById("upper");
const numberBtn = document.getElementById("number");
const symbolBtn = document.getElementById("symbol");
const note = document.querySelector(".error-field");
const close = document.querySelector(".error-field .note button")

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = upperCase.toLocaleLowerCase();
const number = "1234567890";
const symbol = "~!@#$%^&*()_+=-[]{}\\|/?><";

function createPassword() {
    let password = "";
    let allChar = "";
    if (lowerBtn.checked) {
        allChar += lowerCase;
    }
    if (upperBtn.checked) {
        allChar += upperCase;
    }
    if (numberBtn.checked) {
        allChar += number;
    }
    if (symbolBtn.checked) {
        allChar += symbol;
    }
    if (upperBtn.checked == false && lowerBtn.checked == false && numberBtn.checked == false && symbolBtn.checked == false) {
        console.log("Check all the box");
        note.style.display = "block"
        setTimeout(() => {
            note.style.display = "none"

        },3500)
    }
    else {
        for (i = 1; i <= range.value; i++) {
            password += allChar[Math.floor(Math.random() * allChar.length)];
        }
        passwordBox.value = password;
    }
}
close.addEventListener("click",()=>{
    note.style.display = "none"
})


range.addEventListener("input", () => {
    rangeBox.value = range.value;
    createPassword();
})
rangeBox.addEventListener("input", () => {
    let value = Number.parseInt(rangeBox.value);
    if (value >= 4 && value <= 50) {
        range.value = value;
        createPassword();
    }
    else {
        let rangeError = document.getElementById("range-error");
        rangeError.style.display = "block"
        setTimeout(() => {
            rangeError.style.display = "none"
        }, 1500)
    }
})

regenerateBtn.addEventListener("click",createPassword)
createPassword();
