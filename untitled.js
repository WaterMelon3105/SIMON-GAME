// linebreak
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
// linebreak
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);
    var randomNumber =Math.floor (Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
// linebreak
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
// linebreak
function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// linebreak
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
   setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
   }, 100);
}
// linebreak
$("#start-game").click(function(){
    if(gameStarted === false){
        $("#level-title").html("Level " + level);
        nextSequence();
        gameStarted = true
        $("#start-game").addClass("invisible");
    }
})
// linebreak
function checkAnswer(currentLevel){
if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    // console.log("success");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
} else {
    // console.log("wrong");
    var wrong = "wrong";
    playSound(wrong);
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("#start-game").removeClass("invisible");

    $("#level-title").html("Game over! Click 'START GAME' to restart game");
    gameStarted = false;
    gamePattern = [];
    level = 0;
}
}
