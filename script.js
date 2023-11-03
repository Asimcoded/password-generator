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
const close = document.querySelector(".error-field .note button");
const indicatorMsg = document.querySelector(".indication-container p");
const indicatorBar = document.getElementsByClassName("indication-bar")

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = upperCase.toLocaleLowerCase();
const number = "1234567890";
const symbol = "~!@#$%^&*()_+=-[]{}\\|/?><";
const message = ["Weak", "Medium", "Strong", "Very Strong"];
const indicationClases = ["weak", "medium", "strong", "vstrong"];

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

        }, 3500)
    }
    else {
        for (i = 1; i <= range.value; i++) {
            password += allChar[Math.floor(Math.random() * allChar.length)];
        }
        indicator(password);
        passwordBox.value = password;
    }
}

function indicator(value) {
    let point = -1;
    let regx = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];
    if (value.length >= 10) {
        regx.forEach((item) => {
            if (item.test(value)) {
                point++;
            }
        })
        if (point <= 1) {
            indicatorBar[0].classList.add(indicationClases[0]);
            indicatorBar[1].classList.add(indicationClases[1]);
            indicatorBar[2].classList.add(indicationClases[2]);
            indicatorBar[3].classList.remove(indicationClases[3]);
            indicatorMsg.textContent = message[2];
            indicatorMsg.classList.add(indicationClases[2]);
            indicatorMsg.classList.remove(indicationClases[1]);
            indicatorMsg.classList.remove(indicationClases[0]);
            indicatorMsg.classList.remove(indicationClases[3]);
        }
        else {
            indicatorBar[0].classList.add(indicationClases[0]);
            indicatorBar[1].classList.add(indicationClases[1]);
            indicatorBar[2].classList.add(indicationClases[2]);
            indicatorBar[3].classList.add(indicationClases[3]);
            indicatorMsg.textContent = message[3];
            indicatorMsg.classList.add(indicationClases[3]);
            indicatorMsg.classList.remove(indicationClases[1]);
            indicatorMsg.classList.remove(indicationClases[0]);
            indicatorMsg.classList.remove(indicationClases[2]);
        }
    }
    else if (value.length > 6) {
        indicatorBar[1].classList.add(indicationClases[1]);
        indicatorBar[2].classList.remove(indicationClases[2]);
        indicatorBar[3].classList.remove(indicationClases[3]);
        indicatorMsg.textContent = message[1];
        indicatorMsg.classList.add(indicationClases[1]);
        indicatorMsg.classList.remove(indicationClases[0]);
        indicatorMsg.classList.remove(indicationClases[2]);
        indicatorMsg.classList.remove(indicationClases[3]);
    }
    else {
        indicatorBar[0].classList.add(indicationClases[0]);
        indicatorBar[1].classList.remove(indicationClases[1], indicationClases[2], indicationClases[3]);
        indicatorBar[2].classList.remove(indicationClases[2]);
        indicatorBar[3].classList.remove(indicationClases[3]);
        indicatorMsg.textContent = message[0];
        indicatorMsg.classList.add(indicationClases[0]);
        indicatorMsg.classList.remove(indicationClases[1]);
        indicatorMsg.classList.remove(indicationClases[2]);
        indicatorMsg.classList.remove(indicationClases[3]);
    }
}


close.addEventListener("click", () => {
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

regenerateBtn.addEventListener("click", createPassword)
copyBtn.addEventListener("click",()=>{
    passwordBox.select();
    passwordBox.setSelectionRange(0, 99999);
    document.execCommand("copy")
    navigator.clipboard.writeText(passwordBox.value);
})
createPassword();
