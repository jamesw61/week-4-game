
var names = ["obiwan", "luke", "vader", "fett"];
var healths = [120, 100, 150, 180];
var attacks = [8, 5, 25, 20];
var yourCharHealth = 0;
var yourCharAttack = 0;
var enemyCharHealth = 0;
var enemyCharAttack = 0;
var initialAttack = 0;

$("#obiFoot").html(healths[0]);
$("#skyFoot").html(healths[1]);
$("#vadFoot").html(healths[2]);
$("#fettFoot").html(healths[3]);


$(".characterBox").click(function()
	{
    	$(this).detach().appendTo("#yourChar").removeClass("characterBox").removeClass("notClicked").addClass("clickedCharacter");
    	$(".notClicked").detach().appendTo("#enemiesAvailable").css("background-color","red").addClass("possibleEnemies");
    	characterYouChose();   	
    	$( ".clickedCharacter > footer" ).html(yourCharHealth);
    	$(".characterBox").off("click"); 

    	$(".possibleEnemies").click(function()
     		{
     			$(this).detach().appendTo("#defender").removeClass("notClicked").removeClass("possibleEnemies").addClass("clickedDefender").css("background-color","black").css("color","white");
     			$(".possibleEnemies").off("click");
     			enemyYouChose();	
     			$( ".clickedDefender > footer" ).html(enemyCharHealth);
     				
     				$("button").click(function(){
     					fight();
     					});

			});
	});

function characterYouChose(){
	for (var i = 0; i<names.length; i++) {
		if($(".clickedCharacter").attr("id") == names[i]) {
			yourCharHealth = healths[i];
			yourCharAttack = attacks[i];
			initialAttack = attacks[i];	
		}
	}
}

function enemyYouChose(){
	for (var i = 0; i<names.length; i++) {
		if($(".clickedDefender").attr("id") == names[i]) {
			enemyCharHealth = healths[i];
			enemyCharAttack = attacks[i];		
		}
	}
}

function fight() {
	enemyCharHealth = enemyCharHealth - yourCharAttack;
	yourCharHealth = yourCharHealth - enemyCharAttack;
	yourCharAttack = yourCharAttack + initialAttack;
	$( ".clickedCharacter > footer" ).html(yourCharHealth);
	$( ".clickedDefender > footer" ).html(enemyCharHealth);
}


