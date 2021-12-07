var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
  }
});

$(".btn").on("click",handler);

function handler(){
    var userChosenColur = $(this).attr("id");
    userClickedPattern.push(userChosenColur);
    playSound(userChosenColur);
    animatePress(userChosenColur);
    checkAnswer(userClickedPattern.length - 1);
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var num = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[num];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                  nextSequence();
              },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
