const sentenceDiv = document.querySelector(".sentence");
const userInput = document.querySelector("#typeArea");
const start = document.querySelector(".start");
const timer = document.querySelector(".timer span");

const resultBox = document.querySelector('.resultInterface');
const accuracy = document.querySelector('.accuracy');

const sentence = "A computer is a machine that can be programmed to automatically carry out sequences of arithmetic or logical operations (computation). Modern digital electronic computers can perform generic sets of operations known as programs. These programs enable computers to perform a wide range of tasks. The term computer system may refer to a nominally complete computer that includes the hardware, operating system, software, and peripheral equipment needed and used for full operation; or to a group of computers that are linked and function together, such as a computer network or computer cluster";

let totalTime = 30;
userInput.readOnly = true;
start.addEventListener("click", () => {
    userInput.focus();
    sentenceDiv.innerHTML = sentence;
    let timeValue = totalTime;
    timer.innerHTML = timeValue;
    
    let intervalId = setInterval(() => {
        userInput.readOnly = false;
        timeValue--;
        if (timeValue == 0) {
            clearInterval(intervalId); 
            userInput.readOnly = true;
            showResult();
            intervalId = null;
            userInput.value = "";
        }
        timer.innerHTML = timeValue;
    }, 1000);
});

userInput.addEventListener("input", () => {
    const inputText = userInput.value;
    let formattedText = "";

    for (let i = 0; i < sentence.length; i++) {
        if (i < inputText.length) {
            if (inputText[i] === sentence[i]) {
                formattedText += `<span class="correct">${sentence[i]}</span>`;
            } else {
                formattedText += `<span class="incorrect">${sentence[i]}</span>`;
            }
        } else {
            formattedText += sentence[i];
        }
    }
    
    sentenceDiv.innerHTML = formattedText;
});

function showResult(){
    const wpm = document.querySelector('.wpm');
    resultBox.style.display = 'block';
    const stats = calculateStats(userInput.value, sentence, totalTime); 
    accuracy.innerHTML = `Accuracy: ${stats.accuracy}%`;
    wpm.innerHTML = `WPM: ${parseInt(stats.wpm)}`;

}
function calculateStats(inputText, sentence, timeElapsed) {
    const trimmedInput = inputText.slice(0, sentence.length); 
    let correctChars = 0;

    for (let i = 0; i < trimmedInput.length; i++) {
        if (trimmedInput[i] === sentence[i]) correctChars++;
    }

    const totalTyped = trimmedInput.length;
    const accuracy = totalTyped === 0 ? 0 : (correctChars / totalTyped) * 100;

    // Words per minute (
    const wordsTyped = totalTyped / 5; 
    const wpm = (wordsTyped / timeElapsed) * 60;

    return {
        accuracy: accuracy.toFixed(2),
        wpm: wpm.toFixed(2),
    };
}



// 3rd Layer script 

const restart = document.querySelector('.again');
const cancel = document.querySelector('.cancel');

cancel.addEventListener('click',()=>{
    CancelThings();
});
function CancelThings(){
    resultBox.style.display = 'none';
    sentenceDiv.innerHTML = "";
}
