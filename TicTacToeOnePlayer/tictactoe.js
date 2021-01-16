let currentPlayer = "X";
let gameStatus = ""; //"" - continue game, "Tie", "X Wins", "O Wins"
let numTurns = 0;
let idNames = ["one","two","three","four","five", "six", "seven", "eight", "nine"];

//reset board and all variables
function newGame(){
	//reset board
	for (var i = 0; i < idNames.length; i++){
			document.getElementById(idNames[i]).innerHTML = "";
	}//for
	
	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";
	
	changeVisibility("controls"); 
}

//take player turn
function playerTakeTurn(e){
	if(e.innerHTML == ""){
		e.innerHTML = currentPlayer;
		checkGameStatus();
		
		//if game not over, computer goes
		
		if(gameStatus == ""){
			setTimeout(function() {
					
					computerTakeTurn();
					checkGameStatus();
				
				}, 500
			);
		}//if
		
	}else{
		showLightBox("This box is already selected", "please try another.");
	
	return;
	}//else

}//playerTakeTurn

//randomly chooses a free box for computer;
function computerTakeTurn(){
	
	let idName = "";
	let rand = 0;
	//if center is empty choose center
	if(document.getElementById("five").innerHTML == ""){
		
		document.getElementById("five").innerHTML = currentPlayer;
		
	//else if corners are empty take corner
	}else if(document.getElementById("one").innerHTML == "" || document.getElementById("three").innerHTML == "" || document.getElementById("seven").innerHTML == "" || document.getElementById("nine").innerHTML == ""){
		do{
			
			rand = parseInt(Math.random()*9) + 1;  //1-9
			if(rand == 1 || rand == 3 || rand == 7 || rand == 9){
				if(document.getElementById(idNames[rand - 1]).innerHTML == ""){
					document.getElementById(idNames[rand - 1]).innerHTML = currentPlayer;
					break;
				}
				
			}//if
			continue;
		}while(true)
		
	}else {
	
		//chooses random boxes until an empty box is found
		do{
			
			let rand = parseInt(Math.random()*9) + 1;  //1-9
			idName = idNames[rand - 1];
			
			
			//check if box is empty;
			if (document.getElementById(idName).innerHTML == "") {
				document.getElementById(idName).innerHTML = currentPlayer;
				break;
			}
		}while(true)
	}
}//computerTakeTurn

// after each turn, check for a winner, a tie,
//or continue playing
function checkGameStatus(){
	numTurns++; //count turn
	//check Win
	if(checkWin()){
		gameStatus = currentPlayer + " wins!";
		
	}
	
	//check for tie
	if(checkWin() == false && numTurns == 9){
		gameStatus = "Tie Game!";
		
	}//num turns
	
	//switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X");
		
	//game is over
	if(gameStatus != ""){
		setTimeout (function() {showLightBox(gameStatus, "Game Over.");},500);
		
	}
}//checkGameStatus

//check for a Win, there 8 win paths
function checkWin(){
	let cb = [];//current board
	cb[0] = ""; //not going to use
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
	
	//top row
	if(cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]){
			return true;
	}
	
	//middle row
	if(cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]){
			return true;
	}
	
	//bottom row
	if(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]){
			return true;
	}
	
	//left column
	if(cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]){
			return true;
	}
	
	//middle column
	if(cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]){
			return true;
	}
	
	//right column
	if(cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]){
			return true;
	}
	
	//left up to right down diagonal
	if(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]){
			return true;
	}
	
	//right up to left down diagonal
	if(cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]){
			return true;
	}
	
}//checkWin

//change the visability of divID
function changeVisibility(divId){
	let elem = document.getElementById(divId);
	//if element exists, it is considered true
	if(elem){
		elem.className = (elem.className == "hidden")? "unhidden" : "hidden";
		
	}//if
	
}//changeVisability

//checks if there is any boxes that are one turn from winning

function showLightBox(message, message2) {
	
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
	if(gameStatus != "") {
		changeVisibility("controls");
	}
}
