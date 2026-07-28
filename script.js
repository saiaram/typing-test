const quote = document.getElementById("quote");
const input = document.getElementById("input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let timer = 60;
let interval;
let started = false;

let originalText = quote.innerText;

input.addEventListener("input", () => {
    if (!started) {
        started = true;
        startTimer();
    }

    updateStats();
});

function startTimer() {
    interval = setInterval(() => {
        timer--;
        timerDisplay.innerText = timer;

        if (timer === 0) {
            clearInterval(interval);
            input.disabled = true;
        }
    }, 1000);
}

function updateStats() {
    let typedText = input.value;

    let correctCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === originalText[i]) {
            correctCharacters++;
        }
    }

    let accuracy = 0;

    if (typedText.length > 0) {
        accuracy = Math.round(
            (correctCharacters / typedText.length) * 100
        );
    }

    accuracyDisplay.innerText = accuracy + "%";

    let wordsTyped = typedText.trim().split(/\s+/).length;
    let wpm = Math.round(wordsTyped / ((60 - timer) / 60));

    if (timer < 60) {
        wpmDisplay.innerText = wpm;
    }
}