
//Main Function that wraps everything
$(document).ready(function(){

	//Global Variables
	var currPlayer;
	var currDefender;
	var enemyArr = [];


	//gameObject that containes character info and helper functions.
	var gameObject = {

		characterListArray: [ 
		{
			name: 'Luke SkyWalker',
			img: 'assets/images/luke.jpg',
			healthPoints: 160,
			attackPower: 10,
			counterAttackPower: 20,
		},
		{
			name: 'Yoda',
			img: 'assets/images/yoda.png',
			healthPoints: 130,
			attackPower: 15,
			counterAttackPower: 30,
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
			attackPower: 15,
			counterAttackPower: 25,
		},
		{
			name: 'Kylo Wren',
			img: 'assets/images/kylo-ren.jpg',
			healthPoints: 120,
			attackPower: 13,
			counterAttackPower: 20,
		},
		{
			name: 'Obi Wan Kenobi',
			img: 'assets/images/obi-wan.jpg',
			healthPoints: 140,
			attackPower: 10,
			counterAttackPower: 24,
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
				$(charDiv).addClass('bg-black');
			} else if(makeChar === 'defender'){
				$(charDiv).addClass('bg-red');
			}
		},

		renderCharacters: function(characterArr, renderArea){

			//render All characters in characterList
			if(renderArea === '#characterList'){
				for(var i=0; i<characterArr.length; i++){
					gameObject.renderOne(characterArr[i], "#characterList", '');
				}
			}

			//render player character
			if(renderArea === '#yourCharacter'){
				gameObject.renderOne(characterArr, renderArea, '');
			}

			//render enemy character
			if(renderArea === '#enemyCharacter'){
				for(var i=0; i<enemyArr.length; i++){
					gameObject.renderOne(enemyArr, renderArea, 'enemy');
				}
			}
		}

	};

	currPlayer = gameObject.characterListArray[2];

	gameObject.renderCharacters(gameObject.characterListArray, "#characterList");
	gameObject.renderCharacters(currPlayer, "#yourCharacter");

	
});