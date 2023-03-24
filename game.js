let userClickedPattern = [];
let gamePattern = [];

let level = 0;

let started = false;

const buttonColours = ["red", "blue", "green", "yellow"];

// Press a keyboard key to start the game.
$(document).keydown(()=>{

    if(!started){ 
        $("#level-title").html("Level " + level);

        nextSequence();

        started = true;
    };
});

// Upon click, gets the color of the button that was clicked and adds it to the end of userClickedPattern
$(".btn").click((event)=>{
    userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

// Checks user input against the game pattern
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        };
    } else {
        console.log("Wrong");

        playSound("Wrong");

        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").html("Game Over, Press Any Key to Restart");

        startOver();
    };
};

// Starts the next round
function nextSequence(){
    userClickedPattern = [];

    level ++;

    $("#level-title").html("Level " + level);
    // Generates a random number
    let randomNumber = Math.floor((Math.random() * 3)+1);
    // Randomly chooses a colour from the buttonColours array.
    let randomChosenColour = buttonColours[randomNumber];
    // adds randomly chosen colour to the end of gamePattern array
    gamePattern.push(randomChosenColour);
    // Animate the randomly chosen colours button.
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
};

// plays the audio of the randomly chosen colours button.
function playSound(name){
    const audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
};

// Animate the button that was pressed
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
};

// Restarts the game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
};

