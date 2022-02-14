function rand(){
  var num = Math.floor(Math.random()*4)+1;
  var btnNum;
  var isClicked = false;
  var level = 0;
  if(num === 1) btnNum = "one";
  else if(num === 2) btnNum = "two";
  else if(num === 3) btnNum = "three";
  else btnNum = "four";
  return btnNum;
}


function blink(){
  setTimeout(function () {
    $("button."+seq[(seq.length)-1]).fadeOut(200).fadeIn(100);
    new Audio($("button."+seq[(seq.length)-1]).attr("id")+".mp3").play();
  }, 500);
}

var seq = [];
var start = false;

if(window.matchMedia("(min-width: 800px)").matches){
  $(document).on("keydown", function(){
    if(start === false && event.key === "a"){
      seq.push(rand());
      blink();
      start = true;
      $("h1").text("Level 0");
    }
  });
}
else{
  $("h1").text("Press Here to start");
  $("h1").on("click", function(){
    if(start === false){
      seq.push(rand());
      blink();
      start = true;
      $("h1").text("Level 0");
    }
  });
}

var gameOver = false;
var count = 0;
$("button").on("click", function(){
  var btn = event.target
  $(btn).css("background", "grey");
  $(btn).css("box-shadow", "0 0 10px 10px white");
  setTimeout(function () {
    $(btn).css("background", $(btn).attr("id"));
    $(btn).css("box-shadow", "none");
  }, 200);
  new Audio($(btn).attr("id")+".mp3").play();
  if($(btn).hasClass(seq[count]) && gameOver === false){
      count++;
      if(count === seq.length){
        $("h1").text("Level "+seq.length);
        seq.push(rand());
        blink();
        count = 0;
      }
  }
  else{
    $("body").css("background","red");
    new Audio("wrong.mp3").play();
    setTimeout(function () {
      $("body").css("background","#0a0b4a");
    }, 300);
    gameOver = true;
    if(window.matchMedia("(min-width: 800px)").matches){
      $("h1").text("Press on any key to restart");
      $(document).on("keydown", function(){
        location.reload();
      });
    }
    else {
      $("h1").text("Retry");
      $("h1").on("click", function(){
        location.reload();
      });
    }

  }
});
