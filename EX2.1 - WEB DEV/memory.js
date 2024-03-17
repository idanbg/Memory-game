document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the stored values from localStorage
    const playerName = localStorage.getItem("playerName");
    const numOfCards = localStorage.getItem("numOfCards");
  
    // Get the necessary HTML elements
    const timeValue = document.getElementById("timer");
    const headLine = document.getElementById("header");
    const tilesContainer = document.querySelector(".tiles");
    const endGameButtons = document.getElementById("end-game-buttons");
    const newGameButton = document.getElementById("new-game-button");
    const goBackButton = document.getElementById("go-back-button");
    const timeTakenElement = document.getElementById("timeTaken");
    const audioEnd = new Audio("ChampionsSong.mp3");
    const audioTrue = new Audio("CorrectAnswer.mp3");
    const audioFalse = new Audio("RefereeWhistle.mp3");
    const audioCardFlip = new Audio("cardClicked.mp3");

    // Array of images
    const images = [
      "images/ajax.png", "images/barca.png", "images/bayren.png", "images/beersheva.png", "images/beitar.png",
      "images/boka.png","images/chels.png","images/dortmud.png","images/liverpool.png","images/maccabi.png",
      "images/Milan-Logo.png","images/mUnited.png","images/napoli.png","images/psg.jpeg","images/Real.png",
      "images/natanya.png", "images/Ashdod.png", "images/arsenal.png", "images/city.jpg", "images/atletico.png",
      "images/Flamengo.png","images/nacyonal.png","images/inter.png","images/juventus.png","images/rishon.png",
      "images/lyon.png","images/olympaicos.png","images/wolfsborg.png","images/benfica.png","images/porto.png"

    ];
    const backImg = "images/champions.png";
  
    // Display the player's name in the header
    headLine.textContent = `Good Luck, ${playerName}!`;
  
    ///////////////////////END GAME//////////////////////////
  
    // Hide the end game buttons initially
    endGameButtons.style.display = "none";
  
    // Event listener for the new game button
    newGameButton.addEventListener("click", function() {
      // Restart the game by reloading the page
      location.reload();
    });
  
    // Event listener for the go back button
    goBackButton.addEventListener("click", function() {
      // Go back to the previous HTML file
      history.back();
    });
  
    //////////////////////////////////////////////////////
  
    ///////////////////////TIMER////////////////////////////////
    // Timer variables
    let seconds = 0;
    let minutes = 0;
    let interval;

    // Start the timer
    interval = setInterval(timeGenerator, 1000);
  
    // Timer function
    function timeGenerator() {
      seconds += 1;
  
      // Check if minutes need to be incremented
      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }
  
      // Format the time and update the timer element
      let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
      let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
      timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}`;
    }
  
    //////////////////////////////////////////////////////////////////////////////////
  
    // Create an array with pairs of images
    const tempImg = [];
    for (var i = 0; i < numOfCards; i++) {
      const randomIndex = Math.floor(Math.random() * 30); //takes a random pic from the array
      if (!tempImg.includes(images[randomIndex])
      ) {
        tempImg.push(images[randomIndex]);
      } else {
        i--;
      }
    }
    const imgArr = tempImg.concat(tempImg); //This line creates a new array called imgArr by concatenating the pairs array with itself.
    
    // Shuffle the imgArr array
    shuffleArray(imgArr);
  
    /////////////////////Shuffle///////////////////////////////
    // Fisher-Yates shuffle algorithm
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) 
      {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    ////////////////////////////////////////////////////////////
  
    // Create and append the tiles to the tiles container
    for (let i = 0; i < imgArr.length; i++) 
    {
      const tile = buildTile(imgArr[i]);
      tilesContainer.appendChild(tile);
    }
  
    // Game variables
    let revealedCount = 0;
    let activeTile = null;
    let endOfMove = false;
  
    ///////////////////////////FLIP CARD////////////////////////////////
  
    // Event listener for tile clicks
    tilesContainer.addEventListener("click", function(event) {
      const clickedTile = event.target;
      audioCardFlip.play();
      // Check if the clicked element is a tile
      if (clickedTile.classList.contains("tile") && !endOfMove) {
        // Ignore clicks on already revealed tiles
        if (!clickedTile.classList.contains("revealed")) {
          revealTile(clickedTile);
  
          // Check if this is the first tile of the move
          if (activeTile === null) {
            activeTile = clickedTile;
          } else {
            // This is the second tile of the move
            endOfMove = true;
  
            // Check if the tiles match
            if (activeTile.getAttribute("data-img") === clickedTile.getAttribute("data-img"))
             {
              // Tiles match, keep them revealed
              activeTile.classList.add("matched");
              clickedTile.classList.add("matched");
              audioTrue.play()
              revealedCount += 2;
              
  
              // Update the game over condition inside the "if (revealedCount === numOfCards * 2)" block
              if (revealedCount === numOfCards * 2)
               {
                // Game over
                setTimeout(function() {
                  endGame();
                }, 500);
              }
  
              // Reset the active tile and end of move flag
              activeTile = null;
              endOfMove = false;
            } else {
              
              //audioFalse.play();
              // Tiles don't match, hide them after a delay
              setTimeout(function() {
                hideTiles(activeTile, clickedTile);
                activeTile = null;
                endOfMove = false;
              }, 1000);
            }
          }
        }
      }
    });
    ////////////////////////////////////////////////////////
  
    ///////////////////////// Functions /////////////////////////
  
    // Create a tile element with the specified image
    function buildTile(image)
     {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute("data-img", image);
      return tile;
    }
  
    // Reveal a tile by adding the revealed class and setting the background image
    function revealTile(tile)
     {
      tile.classList.add("revealed");
      const image = tile.getAttribute("data-img");
      tile.style.backgroundImage = `url(${image})`;
    }
  
    // Hide the provided tiles by removing the revealed class and resetting the background image
    function hideTiles(tile1, tile2)
     {
      tile1.classList.remove("revealed");
      tile2.classList.remove("revealed");
      tile1.style.backgroundImage = `url(${backImg})`;
      tile2.style.backgroundImage = `url(${backImg})`;
    }
  
   

// Function to show the end game buttons and stop the timer
function endGame()
 {
    audioEnd.play();
    clearInterval(interval);
    endGameButtons.style.display = "block";
    timeValue.style.display = "none";
    const timeTaken = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    headLine.textContent = `Congratulations ${playerName}, You Won !`;
    timeTakenElement.textContent = `Time Taken: ${timeTaken}`;
  
    // Remove all tiles from the tiles container
    while (tilesContainer.firstChild) 
    {
      tilesContainer.removeChild(tilesContainer.firstChild);
    }
  }
  

    
  });
  