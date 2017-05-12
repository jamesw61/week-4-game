//After a few resets of the game clicking attack will sometimes
// run the calculations multiple times and I can't figure out why.
// I also had a situation where, after several resets, the game would not
// create the restart button after defeating 3 enemies - it asked me to choose another enemy.

// Update 5/11 - after doing the Trivia homework, I realized that having click events inside of functions was 
// causing problems and that was likely why the attack button wasn't working properly in this homework.

$( document ).ready(function() {

var names = ["obiwan", "luke", "vader", "fett"];
var otherNames = ["Obiwan", "Luke", "Darth Vader", "Boba Fett"]
var healths = [100, 200, 300, 400];
var attacks = [2, 4, 6, 8];
var counterAttacks = [4, 8, 12, 16];
var yourCharHealth = 1;
var yourCharAttack = 0;
var enemyCharHealth = 1;
var enemyCharAttack = 0;
var initialAttack = 0;
var enemyCount = 3;
var enemyName = "";


function startGame(){
	//resetCharacter resets each character to the original state - moves them to top, resets css, adds/subtracts classes
	resetCharacter('#obiwan');
	resetCharacter('#luke');
	resetCharacter('#vader');
	resetCharacter('#fett');
	healths = [100, 200, 300, 400];
	attacks = [2, 4, 6, 8];
	counterAttacks = [4, 8, 12, 16];
	enemyCount = 3;
	initialAttack = 0;
	enemyCharAttack = 0;
	yourCharAttack = 0;
	$('#gameAlert').hide();
	$("#obiFoot").html(healths[0]);
	$("#skyFoot").html(healths[1]);
	$("#vadFoot").html(healths[2]);
	$("#fettFoot").html(healths[3]);
	
	//The game starts here
	$(".characterBox").click(function(){
		$(this).detach().appendTo("#yourChar").removeClass("notClicked").addClass("clickedCharacter");
		$(".notClicked").detach().appendTo("#enemiesAvailable").css("background-color","red").addClass("possibleEnemies");
		//gets your character's health and attack properties:
		getYourProperties();  
		// The game calculations are nested in this function - I couldn't find a way to do them separately.		
		makeEnemiesClickable(); 
	});
}

function makeEnemiesClickable(){
	$(".possibleEnemies").click(function(){
     		$(this).detach().appendTo("#defender").addClass("clickedDefender").removeClass('possibleEnemies').css("background-color","black").css("color","white");
     		$(".characterBox").off("click");
     		//gets the enemy properties:
     		getEnemyProperties();
     		$("#gameAlert").hide();	
     		$('button').click(function(){
				fightUpdate();
			});
	});
}

function getYourProperties(){
	for (var i = 0; i<names.length; i++) {
		if($(".clickedCharacter").attr("id") == names[i]) {
			yourCharHealth = healths[i];
			yourCharAttack = attacks[i];
			initialAttack = attacks[i];	
		}
	}
	$( ".clickedCharacter > footer" ).html(yourCharHealth);
	$(".clickedCharacter").off("click");
}

function getEnemyProperties(){
	for (var j = 0; j<names.length; j++) {
		if($(".clickedDefender").attr("id") == names[j]) {
			enemyCharHealth = healths[j];
			enemyCharAttack = counterAttacks[j];
			console.log("1" + enemyCharAttack);
			enemyName = otherNames[j];
		}
	}
	$( ".clickedDefender > footer" ).html(enemyCharHealth);
}

function fightCalc(){
	console.log("count " + enemyCount);
	console.log(yourCharHealth);
	console.log(yourCharAttack);
	console.log(enemyCharHealth);
	console.log(enemyCharAttack);
	enemyCharHealth = enemyCharHealth - yourCharAttack;
	//only subtracts from your health if the enemy is still alive:
	if(enemyCharHealth > 0){
		yourCharHealth = yourCharHealth - enemyCharAttack;
	}	
	$("#updateYourAttack").show().html("You attacked " + enemyName + " for " + yourCharAttack + " damage");
	$('#updateEnemyAttack').show().html("You were attacked by " + enemyName + " for " + enemyCharAttack  + " damage");
	yourCharAttack = yourCharAttack + initialAttack;
	console.log("countb " + enemyCount);
	console.log(yourCharHealth);
	console.log(yourCharAttack);
	console.log(enemyCharHealth);
	console.log(enemyCharAttack);
	
}

function fightUpdate() {
		fightCalc();
		$( ".clickedCharacter > footer" ).html(yourCharHealth);
		$( ".clickedDefender > footer" ).html(enemyCharHealth);
		if(enemyCharHealth <= 0){
			enemyCount--;
			$("#gameAlert").show().html("Chose Another Enemy");
			$('.clickedDefender').hide().removeClass('clickedDefender');
			$('#updateEnemyAttack').hide();
			$('#updateYourAttack').hide();	
			//Once the enemyCount variable reaches 0, you win:		
			if(enemyCount === 0){
				$("#gameAlert").show().html("You Won<br><br><br>");
				addRestartButton();
			}
			$('button').off('click');
			makeEnemiesClickable();
		}
		
		else if(yourCharHealth <= 0){
			$("#gameAlert").show().html("You Lost<br><br><br>");
			$('button').off('click');
			$('#updateEnemyAttack').hide();
			$('#updateYourAttack').hide();
			addRestartButton();
		}
}

function addRestartButton() {
	var newButton = "<button>Restart Game</button>"; 
    $("#gameAlert").show().append(newButton).addClass('restartButton');
    $('.restartButton').click(function(){
     		startGame();
     	});
}

function resetCharacter(id){
	$(id).detach().appendTo('.allChar').show().addClass('notClicked');
	$(id).removeClass('clickedCharacter').removeClass('possibleEnemies').removeClass('clickedDefender');
	$(id).css('background-color','white').css('color','black');
}

startGame();

});