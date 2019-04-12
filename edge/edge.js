var diceSet = {};
var numInPool = 0;
$(document).ready(function () {

	initDiceObj();

	// init onclick for dice select
	$('.dice').on('click', function (e) {
		numInPool++;
		$("#pool-message").hide();
		var diceType = $(this).attr('class').replace("dice ", "").replace("-die", "");
		var curDie = diceSet[diceType];
		console.log(curDie);
		var $wrapper = $('#dice-pool .' + diceType + "-die-wrapper");
		var $newDie = $('<div class="dice to-roll ' + diceType + '-die"></div>')
			.data("dice-data", diceType)
			.on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).fadeOut(200, function () {
					numInPool--;
					if (numInPool == 0) {
						$("#pool-message").fadeIn();
					}
					$(this).remove();
				});
			});
		if ($wrapper[0].childElementCount < 5) {
			$newDie.hide().appendTo($wrapper).fadeIn();
		}
	});

});

function getResults() {
	var resultsObj = {
		totalTriumph: 0,
		totalSuccess: 0,
		totalAdv: 0,
		totalDespair: 0
	};
	console.clear();
	$('.icon-wrapper').each(function(){
		$(this).remove();
	});
	$('#results-wrapper').empty();
	// Get each die, roll it, and calc results
	$('.to-roll').each(function () {
		rollDie($(this), resultsObj);
	});
	
	// Display results
	var $resultsWrap = $('#results-wrapper');
	var $successResult = $('<div></div>');
	var sucString, sucIcon,
		advString, advIcon;
	if(resultsObj.totalSuccess > 0){
		sucString = "Success";
		sucIcon = "success-icon";
	} else if (resultsObj.totalSuccess < 0){
		sucString = "Failure";
		sucIcon = "failure-icon black";
	}
	if(resultsObj.totalAdv > 0){
		advString = "Advantage";
		advIcon = "adv-icon";
	} else if (resultsObj.totalAdv < 0){
		advString = "Threat";
		advIcon = "threat-icon black";
	}
	var $sucDiv = $('<div></div>');
	var $advDiv = $('<div></div>');
	for(var j=0; j < Math.abs(resultsObj.totalTriumph); j++){
		$('<div class="results-icon triumph-icon"></div>').appendTo($sucDiv);
	}
	for(var j=0; j < Math.abs(resultsObj.totalSuccess); j++){
		$('<div class="results-icon ' + sucIcon + '"></div>').appendTo($sucDiv);
	}
	for(var j=0; j < Math.abs(resultsObj.totalDespair); j++){
		$('<div class="results-icon despair-icon black"></div>').appendTo($sucDiv);
	}
	for(var j=0; j < Math.abs(resultsObj.totalAdv); j++){
		$('<div class="results-icon ' + advIcon + '"></div>').appendTo($advDiv);
	}
	$resultsWrap.append($sucDiv).append($advDiv);
	
}

function rollDie(elem, resultsObj){
	var $iconWrap = $('<div></div>').addClass('icon-wrapper');
	var curDie = diceSet[elem.data("dice-data")].sides;
	var rollVal = Math.floor(Math.random() * curDie.length);
	var roll = curDie[rollVal];
	var numIcons = Math.abs(roll.success) + Math.abs(roll.adv);
	// Inc total
	if(rollVal+1 == 12) {
		if(roll.success == 1) {
			resultsObj.totalTriumph++;
			$iconWrap.append($('<div class="icon triumph-icon"></div>'));
		} else {
			resultsObj.totalDespair++;
			$iconWrap.append($('<div class="icon despair-icon"></div>'));
		}
	} else {
		resultsObj.totalSuccess += roll.success;
		resultsObj.totalAdv += roll.adv;
		// Build Icons
		if(numIcons == 2)
			$iconWrap.addClass('two-icons');
		// Add Success Icons
		if(roll.success > 0) {
			for(var i=0; i < roll.success; i++){
				$iconWrap.append($('<div class="icon success-icon"></div>'));
			}
		}
		// Add Advantage Icons
		if(roll.adv > 0) {
			for(var i=0; i < roll.adv; i++){
				$iconWrap.append($('<div class="icon adv-icon"></div>'));
			}
		}
		// Add Failure Icons
		if(roll.success < 0) { 
			for(var i=0; i < Math.abs(roll.success); i++){
				$iconWrap.append($('<div class="icon failure-icon"></div>'));
			}
		}
		// Add Threat Icons
		if(roll.adv < 0) {
			for(var i=0; i < Math.abs(roll.adv); i++){
				$iconWrap.append($('<div class="icon threat-icon"></div>'));
			}
		}
	}
	elem.append($iconWrap);
	
	// Log
	console.log("Die: " + $(this).data("dice-data") + ", Roll: " + (rollVal + 1) + "/" + curDie.length);
	console.log("Success: " + roll.success + " Adv: " + roll.adv);
	console.log("Total icons: " + numIcons);
	console.log("---");
}
function clearPool(){
	$('.to-roll').each(function () {
		$(this).remove();
	});
	$("#pool-message").fadeIn();
	$('#results-wrapper').empty();
}

function initDiceObj() {
	diceSet = {
		boost: {
			size: "d6",
			color: "lightblue",
			sides: 
				[{ success: 0, adv: 0 }, { success: 0, adv: 0 },
				{ success: 1, adv: 0 }, { success: 1, adv: 1 },
				{ success: 0, adv: 2 }, { success: 0, adv: 1 }]
		},
		setback: {
			size: "d6",
			color: "black",
			sides: 
				[{ success: 0, adv: 0 }, { success: 0, adv: 0 },
				{ success: -1, adv: 0 }, { success: -1, adv: 0 },
				{ success: 0, adv: -1 }, { success: 0, adv: -1 }]
		},
		ability: {
			size: "d8",
			color: "green",
			sides: 
				[{ success: 0, adv: 0 }, { success: 1, adv: 0 },
				{ success: 1, adv: 0 }, { success: 2, adv: 0 },
				{ success: 0, adv: 1 }, { success: 0, adv: 1 },
				{ success: 1, adv: 1 }, { success: 0, adv: 2 }]
		},
		difficulty: {
			size: "d8",
			color: "purple",
			sides: 
				[{ success: 0, adv: 0 }, { success: -1, adv: 0 },
				{ success: -2, adv: 0 }, { success: 0, adv: -1 },
				{ success: 0, adv: -1 }, { success: 0, adv: -1 },
				{ success: -1, adv: -1 }, { success: 0, adv: -2 }]
		},
		proficiency: {
			size: "d12",
			color: "yellow",
			sides: 
				[{ success: 0, adv: 0 }, { success: 1, adv: 0 },
				{ success: 1, adv: 0 }, { success: 2, adv: 0 },
				{ success: 2, adv: 0 }, { success: 0, adv: 1 },
				{ success: 1, adv: 1 }, { success: 1, adv: 1 },
				{ success: 1, adv: 1 }, { success: 0, adv: 2 },
				{ success: 0, adv: 2 }, { success: 1, adv: 0 }]
		},
		challenge: {
			size: "d12",
			color: "red",
			sides: 
				[{ success: 0, adv: 0 }, { success: -1, adv: 0 },
				{ success: -1, adv: 0 }, { success: -2, adv: 0 },
				{ success: -2, adv: 0 }, { success: 0, adv: -1 },
				{ success: 0, adv: -1 }, { success: -1, adv: -1 },
				{ success: -1, adv: -1 }, { success: 0, adv: -2 },
				{ success: 0, adv: -2 }, { success: -1, adv: 0 }]
		}
	}
}