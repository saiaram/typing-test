const results = document.getElementById("results");
const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalCharacters = document.getElementById("finalCharacters");

const startButton = document.getElementById("startButton");

const quote = document.getElementById("quote");
const input = document.getElementById("input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let timer = 60;
let interval;

const quotes = [
    "The crowd erupts as the champion raises the title high above the ring.",
    "The lights go dark and the arena waits for the superstar to make their entrance.",
    "The referee counts the pinfall as thousands of fans watch the final moment.",
    "A true champion never gives up when the pressure reaches its highest point.",
    "The road to WrestleMania is filled with rivalries, surprises, and unforgettable moments.",
    "The superstar climbs the turnbuckle and celebrates in front of the WWE Universe.",
    "Every great match tells a story of determination, resilience, and heart.",
    "The bell rings and two competitors prepare for a battle inside the squared circle.",
    "The championship represents years of sacrifice, dedication, and hard work.",
    "The greatest performers create moments that fans remember forever."
];

let originalText = "";

startButton.addEventListener("click", () => {
    clearInterval(interval);

    input.disabled = false;
    input.value = "";
    input.focus();

    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    quote.innerText = randomQuote;
    originalText = randomQuote;

    timer = 60;
    timerDisplay.innerText = timer;

    wpmDisplay.innerText = "0";
    accuracyDisplay.innerText = "100%";

    startTimer();
});

input.addEventListener("input", () => {
    updateStats();
});

ffunction startTimer() {
    interval = setInterval(() => {
        timer--;

        timerDisplay.innerText = timer;

        if (timer <= 0) {
            clearInterval(interval);
            input.disabled = true;

            showResults();
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

    let accuracy = 100;

    if (typedText.length > 0) {
        accuracy = Math.round(
            (correctCharacters / typedText.length) * 100
        );
    }

    accuracyDisplay.innerText = accuracy + "%";

    let wordsTyped = typedText.trim().split(/\s+/).length;

    let timeElapsed = (60 - timer) / 60;

    if (timeElapsed > 0) {
        let wpm = Math.round(wordsTyped / timeElapsed);
        wpmDisplay.innerText = wpm;
    }
}
function showResults() {
    results.classList.remove("hidden");

    finalWpm.innerText = wpmDisplay.innerText;
    finalAccuracy.innerText = accuracyDisplay.innerText;
    finalCharacters.innerText = input.value.length;
}