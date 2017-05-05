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
	

	$(".characterBox").click(function(){
		$(this).detach().appendTo("#yourChar").removeClass("notClicked").addClass("clickedCharacter");
		$(".notClicked").detach().appendTo("#enemiesAvailable").css("background-color","red").addClass("possibleEnemies");
		getYourProperties(); 
		makeEnemiesClickable();
	});
}

function makeEnemiesClickable(){
	$(".possibleEnemies").click(function(){
     		$(this).detach().appendTo("#defender").addClass("clickedDefender").removeClass('possibleEnemies').css("background-color","black").css("color","white");
     		$(".characterBox").off("click");
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
	console.log("2" + enemyCharAttack);
	enemyCharHealth = enemyCharHealth - yourCharAttack;
	if(enemyCharHealth > 0){
		yourCharHealth = yourCharHealth - enemyCharAttack;
	}	
	$("#updateYourAttack").show().html("You attacked " + enemyName + " for " + yourCharAttack + " damage");
	$('#updateEnemyAttack').show().html("You were attacked by " + enemyName + " for " + enemyCharAttack  + " damage");
	yourCharAttack = yourCharAttack + initialAttack;
	console.log("3" + enemyCharAttack);
}

function fightUpdate() {
		console.log("4" + enemyCharAttack);
		fightCalc();
		console.log("5" + enemyCharAttack);
		$( ".clickedCharacter > footer" ).html(yourCharHealth);
		
		$( ".clickedDefender > footer" ).html(enemyCharHealth);
		if(enemyCharHealth <= 0){
			enemyCount--;
			$("#gameAlert").show().html("Chose Another Enemy");
			$('.clickedDefender').hide().removeClass('clickedDefender');
			$('#updateEnemyAttack').hide();
			$('#updateYourAttack').hide();
			$('#gameTitle').html(enemyCount);
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