
var buttonColours=["red","blue","green","yellow"];
var gamepattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextsequence();
    started=true;
  }
});

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.

$(".btn").click(function(){
  var userChosenColour= this.getAttribute("id");
  //console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatepressed(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel) {

  if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamepattern.length){
      setTimeout(function () {
        nextsequence();
      }, 1000);
    }
  } else {
    playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


function nextsequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
    
  var randomnumber=Math.floor(Math.random()*4);
    
  var  randomChosenColour=buttonColours[randomnumber];
    
  
  gamepattern.push( randomChosenColour);
  playsound(randomChosenColour);
  $("#" +  randomChosenColour).fadeOut(100).fadeIn(100);

}






function animatepressed(currentcolour)
{
  document.querySelector("."+currentcolour).classList.add("pressed");
  
  setTimeout(function(){document.querySelector("."+currentcolour).classList.remove("pressed")},100);
  console.log("pressed");
}
function playsound(name){
  var audio=new Audio("sounds/"+ name+".mp3");
  audio.play();
}

function startOver(){

  gamepattern=[];

  level=0;
  started=false;
}

