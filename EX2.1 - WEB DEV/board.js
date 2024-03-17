

const Start=document.getElementById("submit");// start buttun
const nameInput=document.getElementById("Name")//value of user input. NAME
const NumOfcards=document.getElementById("Amount");// the value that the user input. NUM Of CARDS
const imges=["./images/ajax.png","./images/barca.png","./images/bayren.png","./images/beersheva.png","./images/beitar.png","./images/boka.png","./mages/chelsea.png","images/dortmud.png","images/liverpool.png","images/maccabi.png","images/milan.png","images/mUnited.png","images/napoli.png","images/psg.png","images/realmadrid.png"];//arry of imges


// when clicking on the Start buttun.
const tilesContainer=document.querySelector(".tiles");
const playerName=document.getElementById("player-name");
const preGame=document.querySelector(".pre-game");
const game=document.querySelector(".game");

Start.addEventListener('click',function()
{   
    const name=nameInput.value//name
    const size=NumOfcards.value;
    if(!alerts(size,name))
    {return 0;}// checking that they filled all the requirments
    const timerInterval = setInterval(updateTimer, 1000);// starts the timer
    const imgArr=[];///the array that we gonna use
    playerName.innerHTML = `<span>Player Name:</span> ${name}`;//print the name
    preGame.style.display = "none"; // Hide pre-game div
    game.style.display = "block"; // Show game div


    for(var i=0;i<size;i++)//adding image to the new array
    {
        const randomIndex=Math.floor(Math.random()*size)//takes a random pic from the array
        const img=imges[randomIndex]
        const tile=BuildTile(img);//setting attribute to each color.

        if(!img){i--;}
        else
        {
            imgArr.push(img);//adding the image to the array
            imgArr.push(img);
            imges.splice(randomIndex,1);//removing the added image from the big array to prevent dups
        }
    }

    for(var i=0;i<imgArr.length;i++)
    {   
        const color=imgArr[i];
        const tile=BuildTile(color);
        tilesContainer.appendChild(tile);

    }
    console.log(imgArr);///check

     //Game 
    let revealedCount=0; // starting the game 0 cards has been revealed
    let activeTile=null;//refers to the card that the user clicks on 
    let endOfMove=false;//waiting for the second card to get clicked

});


function alerts(amount,name)// checking that all the inputed is filled correctly
{
    if(name===""||amount===null){
        alert("Please fill all the inputs");
        return 0;
    }
    else if(amount>30)
    {
        alert ("The maximum amount is 30 pairs");
        return 0;
    }
    else if(amount<1)
    {
        alert ("Required minimum of 1 pair");
        return 0;
    }
    return 1; // all good!
    
}
///////////////////////////////////GAME////////////////////////////////////////////////

/////////////////////////////TIMER/////////////////////////////////////////////////////
// Update the timer display
const timerElement = document.getElementById("timer");
let time = 0;
function updateTimer() {
  // Increment the time by 1 second
  time++;
  // Calculate the minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  // Format the time as MM:SS
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  // Update the timer element
  timerElement.textContent = formattedTime;
}
///////////////////////////Building Tile/////////////////////////////////////////////////
function BuildTile(imgArr)
{
    const element=document.createElement("div");//creating a div.
    element.classList.add("tile");//naming the div class "tile"
    element.setAttribute("data-img",imgArr);//giving each one of the div an attribute (div1==beiter.png , div2==maccabi.png...)
    return element;
}
 
//////////////////////////////////////ShuffleArray////////////////////////////////////////


//////////////////////////////////////Show/Hide div///////////////////////////////////////
function showDiv() {
    var div = document.getElementsByClassName("game");
    div.style.visibility = "none";
  }