//global variables
var leftScore = 0;
var rightScore = 0;


var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

var paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;
const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var numLeftPower = 5;
var numRightPower = 5;

var bounce = new sound("bounce.mp3");
var exit = new sound ("exit.mp3");

//used to control game start/stop
var controlPlay;



//move paddles
document.addEventListener('keydown' , function(e) {
	if(e.keyCode == 87 || e.which == 87) { //W
		speedOfPaddle1 = -10;
	}
	
	if(e.keyCode == 83 || e.which == 83) { //S
		speedOfPaddle1 = 10;
	}

	if(e.keyCode == 38 || e.which == 38) { //up
		speedOfPaddle2 = -10;
	}
	
	if(e.keyCode == 40 || e.which == 40) { //down
		speedOfPaddle2 = 10;
	}
	
//key press for power ups	

//only work if there are power-ups left
	if(numLeftPower > 0){
	//ball speeds up for almost a second
		if(e.keyCode == 71 || e.which == 71) { //G
			numLeftPower--;
			document.getElementById("pLeft").innerHTML = "Power ups left: " + numLeftPower;
			var leftCounter = 0;
			var rightCounter = 0;
			var topCounter = 0;
			var bottomCounter = 0;
			if(leftSpeedOfBall < 0){
				leftCounter++;
				leftSpeedOfBall = -15;
				
				setTimeout (function(){
				leftSpeedOfBall = -5;
				}, 300);
			}
			
			if(leftSpeedOfBall > 0){
				leftSpeedOfBall = 15;
				rightCounter++;
				setTimeout (function(){
				leftSpeedOfBall = 5;
				}, 300);
			}
			
			
			if(topSpeedOfBall < 0){
				topSpeedOfBall = -15;
				topCounter++;
				setTimeout (function(){
				topSpeedOfBall = -5;
				}, 300);
			}
			
			if(topSpeedOfBall > 0){
				topSpeedOfBall = 15;
				bottomCounter++;
				setTimeout (function(){
				topSpeedOfBall = 5;
				}, 300);
			}
			
		}
	}//if
	if(numLeftPower > 0){
	if(e.keyCode == 72 || e.which == 72) { //H
		numLeftPower--;
		document.getElementById("pLeft").innerHTML = "Power-ups left: " +  numLeftPower;
		document.getElementById("paddle1").style.height = "280px";
		paddleHeight = document.getElementById("paddle1").offsetHeight;
		
		setTimeout (function(){
		document.getElementById("paddle1").style.height = "140px";
		paddleHeight = document.getElementById("paddle1").offsetHeight;
		}, 2000);
	}
	}
	if(numRightPower > 0){
		if(e.keyCode == 75 || e.which == 75) { //K
			numRightPower--;
			document.getElementById("pRight").innerHTML = "Power-ups left: " + numRightPower;
			document.getElementById("paddle2").style.height = "280px";
			paddleHeight = document.getElementById("paddle2").offsetHeight;
				
			setTimeout (function(){
				document.getElementById("paddle2").style.height = "140px";
				paddleHeight = document.getElementById("paddle2").offsetHeight;
			}, 2000);
		}
	}//if
	
	//ball speeds up for almost a second
	if(numRightPower  > 0){
		if(e.keyCode == 76 || e.which == 76) { //L
			numRightPower--;
			document.getElementById("pRight").innerHTML = "Power-ups left: " + numRightPower;
			var leftCounter = 0;
			var rightCounter = 0;
			var topCounter = 0;
			var bottomCounter = 0;
			if(leftSpeedOfBall < 0){
				leftCounter++;
				leftSpeedOfBall = -15;
				
				setTimeout (function(){
				leftSpeedOfBall = -5;
				}, 300);
			}
			
			if(leftSpeedOfBall > 0){
				leftSpeedOfBall = 15;
				rightCounter++;
				setTimeout (function(){
				leftSpeedOfBall = 5;
				}, 300);
			}
			
			
			if(topSpeedOfBall < 0){
				topSpeedOfBall = -15;
				topCounter++;
				setTimeout (function(){
				topSpeedOfBall = -5;
				}, 300);
			}
			
			if(topSpeedOfBall > 0){
				topSpeedOfBall = 15;
				bottomCounter++;
				setTimeout (function(){
				topSpeedOfBall = 5;
				}, 300);
			}
		}		
		
	}//if
});
//stop paddles
document.addEventListener('keyup' , function(e) {
//	console.log("key up" + e.keyCode);
	if(e.keyCode == 87 || e.which == 87) { //W
		speedOfPaddle1 = 0;
	}
	if(e.keyCode == 83 || e.which == 83) { //S
		speedOfPaddle1 = 0;
	}

	if(e.keyCode == 38 || e.which == 38) { //up
		speedOfPaddle2 = 0;
	}
	
	if(e.keyCode == 40 || e.which == 40) { //down
		speedOfPaddle2 = 0;
	}
	
	
	
});

//object constructor to play sounds
//https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

//start the ball motion
function startBall() {
	let directionX = 1;
	let directionY = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	
	//50% chance of starting in either direction(right or left)// 50% chance start moving up or down
	if(Math.random() < 0.5){
		directionX = 1;
		directionY = 1;
		
	}else{
		directionX = -1;
		directionY = -1;
	}
	
	
	
	topSpeedOfBall = 6;
	leftSpeedOfBall = 6;
}//startBall

//continues the ball motion, does not reset ball's speed
function continueBall() {
	let directionX = 1;
	let directionY = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	
	//50% chance of starting in either direction(right or left)// 50% chance start moving up or down
	if(Math.random() < 0.5){
		directionX = 1;
		directionY = 1;
		
	}else{
		directionX = -1;
		directionY = -1;
	}
	
	
}//continueBall

// updates location of paddles and ball
function show(){
	var beforeBallSpeed = topSpeedOfBall;
	//updates position of elements
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	
	//stops paddle from leaving top of game board
	if(positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0;
	}
	
	if(positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0;
	}
	
	//stops paddle from leaving bottom of game board
	if(positionOfPaddle1 >= gameboardHeight - paddleHeight){
		positionOfPaddle1 = gameboardHeight - paddleHeight;
	}
	
	if(positionOfPaddle2 >= gameboardHeight - paddleHeight){
		positionOfPaddle2 = gameboardHeight - paddleHeight;
	}
	
	//if ball hits top, or bottom, of gameboard, change direction
	if(topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight){
		
		topSpeedOfBall *= -1;
		
		
	}//if
	
	// double height paddles power

	
	
	
	
	
	//ball hits left edge of gameboard
	if (leftPositionOfBall <= paddleWidth){
			
			
		//if ball hits paddle change direction
		if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){
			
			bounce.play();
			leftSpeedOfBall *= -1;
		
		}else{
			
			rightScore++;
			if(rightScore == 10){
				stopGame();
			}
			document.getElementById("score2").innerHTML = rightScore;
			exit.play();
		//	alert(leftSpeedOfBall + topSpeedOfBall);
		
	
			
			continueBall();
		}
	}
	
	//ball hits right edge of gameboard
	if (leftPositionOfBall >= (gameboardWidth - paddleWidth - ballHeight)){
		
		//if ball hits paddle change direction
		if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){
			bounce.play();
			leftSpeedOfBall *= -1;
			
		}else{
			
			leftScore++;
			if(leftScore == 10){
				
				stopGame();
				return;
			}
			leftSpeedOfBall++;
			
			exit.play();
			document.getElementById("score1").innerHTML = leftScore;
	
		
			continueBall();
			
		}
	}
	
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
	
	
	
}//show

//resume game play
function resumeGame(){
	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60 );
	}
	
}//resumeGame

function pauseGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
}//pauseGame

//start game
function startGame(){
	//reset scores and paddle position
	leftScore = 0;
	rightScore = 0;
	pleft = 5;
	pRight = 5;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;
	startBall();
	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60 );
	}
	
}//startGame

//stop game playing
function stopGame(){
	pauseGame();
	let message1 = "Tie Game";
	let message2 = "Close to continue";
	
	if(rightScore > leftScore){
		
	    message1 = "Player 2 Wins With " + rightScore + " Points!";
		message2 = "Player 1 Had " + leftScore + " Points";
	}else if(rightScore < leftScore){
				
		message1 = "Player 1 Wins With " + leftScore + " Points!";
		message2 = "Player 2 Had " + rightScore + " Points";
	}//else
		
	showMessage(message1, message2);
}//stopGame

/*lightbox code***/
//change the visability of divID
function changeVisibility(divId){
	let elem = document.getElementById(divId);
	//if element exists, it is considered true
	if(elem){
		elem.className = (elem.className == "hidden")? "unhidden" : "hidden";
		
	}//if
	
}//changeVisability



function showMessage(message, message2) {
	
	//set message
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	
	//show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	
}

//close lightbox
function continueGame(){
	changeVisibility("lightbox")
	changeVisibility("boundaryMessage");
	
	//if game is over, show controls
	
}
/****end of lightbox code **/