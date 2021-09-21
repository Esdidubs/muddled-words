let shuffledArray = [];
let cardNum = -1;
let restarted = false; // Lets us know if 
let flipped=false;

// Items to run in the beginning of the page load
$(function() {
	buttons();
	shuffle(STORE);
	$('#newCard').hide();
    $('#prevCard').hide();
    $('#btnRules').hide();
    $('#answerBtn').hide();
});

// Fisher-Yates shuffle
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[ array[i], array[j] ] = [ array[j], array[i] ];
	}
	shuffledArray = array;
	return shuffledArray;
}

// Events for all of the buttons
function buttons() {
	$('#cardForm').on('click', '#newGame', function() {
		event.preventDefault();
		getCard();
		$('#newGame').hide();
        $('#newCard').show();
        $('#prevCard').show();
        $('#btnRules').show();
        $('#answerBtn').show();
		$('#rules').hide();
	});

	$('#cardForm').on('click', '#newCard', function() {
		event.preventDefault();
		flipped=false;
		getCard();
    });
    
    $('#cardForm').on('click', '#prevCard', function() {
		event.preventDefault();
		flipped=false;
		getPrevCard();
    });
    
    $('#cardForm').on('click', '#answerBtn', function() {
        event.preventDefault();
		displayAnswer();
	});

	$('#cardForm').on('click', '#btnRules', function() {
		event.preventDefault();
		$('#rules').toggle();
	});
}

function getCard() {
	if (cardNum >= shuffledArray.length-1) {
        cardNum = -1;
        restarted = true;
    }
    cardNum++;
	displayCard();	
}

function getPrevCard() {
	if (cardNum > 0) {
        cardNum--;
        displayCard();
	} else if(restarted == true){
        cardNum = shuffledArray.length - 1;
        displayCard();
    } 
	
}

function displayCard() {
	$('#cardSection').html(`
		<div class="flip-card">
  			<div class="flip-card-inner">
    			<div class="flip-card-front">
					<p>Card ${cardNum+1}</p>
    			</div>
    			<div class="flip-card-back">
					<p>${shuffledArray[cardNum]}</p>
    			</div>
  			</div>
		</div>
	`);
}

function displayAnswer() {
	if(flipped==false){
		$('.flip-card-inner').css('transform', 'rotateY(180deg)');
		flipped = true;
	} else {
		$('.flip-card-inner').css('transform', 'rotateY(0deg)');
		flipped = false;
	}
	
}




