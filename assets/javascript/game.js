
//Main Function that wraps everything
$(document).ready(function(){

	//Global Variables
	var currPlayer;
	var currDefender;
	var enemyArr = [];
	var attackCounter = 1;
	var killCounter = 0;

	//gameObject that containes character info and helper functions.
	var gameObject = {

		characterListArray: [ 
		{
			name: 'Luke SkyWalker',
			img: 'assets/images/luke.jpg',
			healthPoints: 160,
			attackPower: 10,
			counterAttackPower: 22,
		},
		{
			name: 'Yoda',
			img: 'assets/images/yoda.png',
			healthPoints: 130,
			attackPower: 15,
			counterAttackPower: 32,
		},
		{
			name: 'R2D2',
			img: 'assets/images/r2.jpg',
			healthPoints: 180,
			attackPower: 7,
			counterAttackPower: 15,
		},
		{
			name: 'Darth Vader',
			img: 'assets/images/darth-vader.jpg',
			healthPoints: 170,
			attackPower: 16,
			counterAttackPower: 25,
		},
		{
			name: 'Kylo Wren',
			img: 'assets/images/kylo-ren.jpg',
			healthPoints: 120,
			attackPower: 13,
			counterAttackPower: 21,
		},
		{
			name: 'Obi Wan Kenobi',
			img: 'assets/images/obi-wan.jpg',
			healthPoints: 140,
			attackPower: 10,
			counterAttackPower: 23,
		}],

		renderOne: function(characterArr, renderArea, makeChar){
			// <div class="character" data-name="character.name">
			var charDiv = $('<div class="characterContainer" data-name="' + characterArr.name + '">');
			var charName = $('<p class="character-name">').text(characterArr.name);
			var charImage = $('<img class="character-img">').attr("src", characterArr.img);
			var charHealth = $('<p class="character-health">').text(characterArr.healthPoints);

			charDiv.append(charName).append(charImage).append(charHealth);
			$(renderArea).append(charDiv);

			if(makeChar === 'enemy'){
				$(charDiv).addClass('enemy');
			} else if(makeChar === 'defender'){
				$(charDiv).addClass('defender');
			}
		},

		renderCharacters: function(characterArr, renderArea){

			//render All characters in characterList
			if(renderArea === '#characterList'){
				$(renderArea).empty();
				for(var i=0; i<characterArr.length; i++){
					gameObject.renderOne(characterArr[i], "#characterList", '');
				}
			}

			//render player character
			if(renderArea === '#yourCharacter'){
				gameObject.renderOne(characterArr, renderArea, '');
			}

			//render enemylist
			if(renderArea === '#enemyList'){
				for(var i=0; i<enemyArr.length; i++){
					gameObject.renderOne(enemyArr[i], renderArea, 'enemy');
				}

				//render one clicked enemy to defender
				$(document).on('click','.enemy', function(){
					name = $(this).data('name');

					// console.log("is(':empty') " + $('#enemyCharacter').is(':empty'));
					// console.log("$('#enemyCharacter').text().length) " + $('#enemyCharacter').text().length);
					// console.log("$('#enemyCharacter').children().length) " + $('#enemyCharacter').children().length);

					//add it to defender area and hide clicked one from enemyList.
					if($('#enemyCharacter').children().length === 0){
						gameObject.renderCharacters(name, '#enemyCharacter');
						$(this).hide();
					}
				});
			}

			//render enemyCharacter
			if(renderArea === '#enemyCharacter'){
				$(renderArea).empty();
				for(var i=0; i<enemyArr.length; i++){
					// console.log("name: " + name);
					// console.log("enemyArr: " + enemyArr[i].name);
					if(enemyArr[i].name === name) {
						// console.log("FIND MATCHING NAME: " + enemyArr[i].name);
						gameObject.renderOne(enemyArr[i], renderArea, 'defender');
						currDefender = enemyArr[i];
					}
				}
			}

			//render again when yourCharacter is attacked
			if(renderArea === 'playerDamaged'){
				$('#yourCharacter').empty();
				gameObject.renderOne(characterArr, '#yourCharacter', '');
			}

			//render again when enemyCharacter is attacked
			if(renderArea === 'enemyDamaged'){
				$('#enemyCharacter').empty();
				gameObject.renderOne(characterArr, '#enemyCharacter', 'defender');
			}
		},

		displayMsg: function(msg){
			var gameStatus = $('#gameStatus');
			gameStatus.html(msg);
		},

		searchObject: function(array, key, prop){
			prop = (typeof prop === 'undefined') ? 'name' : prop;

			for(var i=0; i<array.length; i++){
				if (array[i][prop] === key){
					return array[i];
				}
			}
		},

		restartGame: function(){
			// var $restart = $('<button class="btn btn-primary btn-lg>Battle Again!</button>').on('click', function(){
			// 	location.reload();
			// });
			var $restart = $('<br /><input type="button" value="Battle Again!" class="btn btn-primary btn-lg" id="restartBtn"/>').on('click', function(){
				location.reload();
			});
			$restart.appendTo('#gameStatus');
			console.log("restart");
			// $('#gameStatus').append(restart);
		}
	}; /*************** gameObject End ****************/

	// currPlayer = gameObject.characterListArray[2];
	// enemyArr = gameObject.characterListArray;
	// gameObject.renderCharacters(enemyArr, "#enemyList");
	// gameObject.renderCharacters(currPlayer, "#yourCharacter");

	var charList = gameObject.characterListArray;

	//display every characters to select user character
	gameObject.renderCharacters(charList, '#characterList');

	//when the user pick character
	$(document).on('click', '.characterContainer', function(){
		name = $(this).data('name');
		if(!currPlayer){
			currPlayer = gameObject.searchObject(charList, name);
			
			//put characters into enemyArr except user's character
			for(var i=0; i<charList.length; i++){
				if(charList[i].name != name){
					enemyArr.push(charList[i]);
				}
			}
			//after pick user character, hide characterList and display enemyList, yourCharacter
			$('#characterList').hide();

			gameObject.renderCharacters(currPlayer, '#yourCharacter');
			gameObject.renderCharacters(enemyArr, '#enemyList');
		}
	});

	//when attack button is clicked, something happen btw characters.
	$('#attackBtn').on('click', function(){

		console.log("player name: " + currPlayer.name + "  currPlayer.health: " + currPlayer.healthPoints);
		console.log("defender name: " + currDefender.name + "  currDefender.health: " + currDefender.healthPoints);

		//button functions only when there is defender in area
		if($('#yourCharacter').children().length === 0 || $('#enemyCharacter').children().length === 0){
			gameObject.displayMsg('Please choose your character and enemy character.');
		} else {

			currDefender.healthPoints -= currPlayer.attackPower * attackCounter;

			// if(currDefender.healthPoints <= 0 || currPlayer.healthPoints <= 0){
			// 	currDefender.healthPoints = 0;
			// 	currPlayer.healthPoints = 0;
			// }

			if(currDefender.healthPoints > 0){
				//enemy is stil alive, keep playing
				gameObject.renderCharacters(currDefender, 'enemyDamaged');
				var msg = 'You attacked ' + currDefender.name + ' for ' + (currPlayer.attackPower * attackCounter) + ' damage.' + 
								'<br />' + currDefender.name + ' attacked you back for ' + currDefender.counterAttackPower + ' damage.';
				gameObject.displayMsg(msg);
				attackCounter++;
				
				currPlayer.healthPoints -= currDefender.counterAttackPower;

				gameObject.renderCharacters(currPlayer, 'playerDamaged');

				//losing condition
				if(currPlayer.healthPoints < 0){

					msg = currDefender.name + ' has defeated you! GAME OVER :)';
					gameObject.displayMsg(msg);
					gameObject.restartGame();
					$('#attackBtn').prop('disabled', true);
				}
			} else {
				// defeat single enemy
				$('#enemyCharacter').empty();
				msg = 'You have defeated ' + currDefender.name + ', choose another enemy to fight';
				gameObject.displayMsg(msg);
				killCounter++;

				// winning condition
				if(killCounter === 5){
					msg = 'You defeated all enemies! GAME OVER!';
					gameObject.displayMsg(msg);
					gameObject.restartGame();
				}
			}
		}
	})

});