// Function to make the browser speak text
function speak(text) {
    // Cancel any previous speech that's still running
    speechSynthesis.cancel(); 

    // Create a new speech utterance
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US'; // You can change this for different accents
    speechSynthesis.speak(utterance);
}

// Global variables and game state
let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#msg");
let turnO = true;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Handle box clicks and alternating turns
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerHTML = "O";
            speak("It's X turn");  // Speak when X's turn
            turnO = false;
        } else {
            box.innerHTML = "X";
            speak("It's O turn");  // Speak when O's turn
            turnO = true;
        }
        box.disabled = true;  // Disable the clicked box
        checkWinner();  // Check if there's a winner
    });
});

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        // Check if the positions have the same value and aren't empty
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner", pos1val);
                showWinner(pos1val);  // Display winner if found
            }
        }
    }
};

// Disable all boxes after a winner is found
const disablebox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to display the winner and change background color
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    speak(`Congratulations! Winner is ${winner}`);
    document.body.style.backgroundColor = "red";  // Change background color when there's a winner
    disablebox();  // Disable all boxes
};

// Reset the game when the reset button is clicked
let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.disabled = false;  // Enable all boxes for the next game
    });
    msg.innerHTML = "";  // Clear the winner message
    speak("The game is reset");  // Announce the reset
    document.body.style.backgroundColor = "rgb(31, 125, 142)";  // Reset background color
});
