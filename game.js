var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = -1;
var started = 1;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("level " + level);
  level++;
}

function comparePatterns() {
  if (gamePattern.length === userClickedPattern.length) {
    if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 500);
    } else {
      gameOver();
    }
  } else if (
    gamePattern[userClickedPattern.length - 1] !==
    userClickedPattern[userClickedPattern.length - 1]
  ) {
    gameOver();
  }
}

function gameOver() {
  $("#level-title").text("Game Over!, Press Any Key to Restart");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
}

$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  comparePatterns();
  console.log("game - " + gamePattern);
  console.log("player - " + userClickedPattern);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).on("click", () => {
  if (started === 1) {
    started++;
    nextSequence();
    console.log(started);
    $("#level-title").text("level " + level);
  }
});

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = -1;
  started = 1;
}
