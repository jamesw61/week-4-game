

var obiAttack = 8;
var lukeAttack = 5;
var vaderAttack = 25;
var fettAttack = 20;



document.onkeyup = function(event)
  { 
    var obiWanScore = Math.floor(Math.random() * (40)) + 180;
	$("#obiFoot").html(obiWanScore);
    var lukeScore = Math.floor(Math.random() * (50)) + 200;
    $("#skyFoot").html(lukeScore);
	var vaderScore = Math.floor(Math.random() * (20)) + 100;
	$("#vadFoot").html(vaderScore);
	var fettScore = Math.floor(Math.random() * (30)) + 120;
	$("#fettFoot").html(fettScore);
}

$(".box").click(function(){
    console.log("The paragraph was clicked.");
    // var thisId = $(this).attr("id");  also works
    // var thisId = this.id;
    var moveBox = $(this).detach();
    moveBox.appendTo("#yourChar");
    $(this).removeClass("notClicked").addClass("clickedChar");


    var moveAll = $(".allChar").detach();
    moveAll.appendTo("#enemiesAvailable");

     $(".box").off("click");
     $(".notClicked").click(function(){
     	var moveEnemy = $(this).detach();
     	moveEnemy.appendTo("#defender");
     	

   
     })
});



