const startButton = document.getElementById("start"); // Start button
function startGame() {
  const nameInput = document.getElementById("Name"); // User input for name
  const cardsInput = document.getElementById("card-count"); // User input for number of cards
  const playerName = nameInput.value.trim(); // Extracting the name value
  const numOfCards = parseInt(cardsInput.value); // Extracting the number of cards value and converting it to an integer

  if (playerName === "") 
  {
    alert("Please enter your name.");
    return; // Stop execution if name is not entered
  }

  if (numOfCards < 1 || numOfCards > 30) 
  {
    alert("Please enter a number of cards between 1 and 30.");
    return; // Stop execution if number of cards is invalid
  }

  // Store the name and number of cards in localStorage 
  localStorage.setItem("playerName", playerName);
  localStorage.setItem("numOfCards", numOfCards);

  // Moving to memory.html
  window.location.href = 'memory.html';
}

startButton.addEventListener("click", startGame);
