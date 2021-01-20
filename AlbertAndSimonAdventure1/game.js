const levels = 	[
	//level 0
		["flag", "rock", "", "", "",
		"fenceside", "rock",  "", "", "rider",
		"", "tree", "animate", "animate", "animate",
		"", "water", "", "horseup", "",
		"", "fenceup", "", "", "",] ,
		
	//level 1
		[ "flag",  "water", "", "", "",
		"fenceside",  "water", "", "", "rider",
		"animate", "bridge animate", "animate", "animate", "animate",
		"", "water", "", "", "",
		"", "water", "horseup", "", "",],
		
	//level 2
		[ "tree","tree","flag","tree","tree",
		"animate", "bridge animate", "animate", "animate", "animate",
		"water", "bridge", "water", "water", "water",
		"", "", "", "fenceup", "", 
		"rider", "rock", "", "", "horseup"]
	//end of levels
	];
const gridBoxes	= document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "tree", "water"];  
var currentLevel = 0; //starting level
var riderOn = false; //is rider on?
var currentLocationOfHorse = 0;
var currentAnimation;// alows 1 animation per level
var widthOfBoard = 5;
//start game
window.addEventListener("load", function(){
	loadLevel();
});

//move horse
document.addEventListener("keydown", function(e){
	switch(e.keyCode){
		case 37: //left arrow
			 if(currentLocationOfHorse % widthOfBoard !== 0){
				 tryToMove("left");
			 }
			break;
		case 38:// up arrow
			if(currentLocationOfHorse - widthOfBoard >= 0){
				 tryToMove("up");
			 }
			break;
		case 39://right arrow
			if(currentLocationOfHorse % widthOfBoard < widthOfBoard - 1){
				 tryToMove("right");
			 }
			break;
		case 40: //down arrow
			if(currentLocationOfHorse + widthOfBoard < widthOfBoard * widthOfBoard){
				 tryToMove("down");
			 }
			break;
		
	}//switch
});//key event listener

//try to move horse
function tryToMove (direction){
	
	//location before move
	let oldLocation = currentLocationOfHorse;
	
	//class of location before move
	let oldClassName = gridBoxes[oldLocation].className;
	
	let nextLocation = 0;// location we wish to move
	let nextClass = ""; // class of location we wish to move to
	
	let nextLocation2 = 0;
	let nextClass2 = "";
	
	let newClass = ""; // new class to switch to if move successful
	switch (direction){
		case "left":
			 nextLocation = currentLocationOfHorse - 1;
			 break;
	    case "right":
			 nextLocation = currentLocationOfHorse + 1;
			 break;
		case "up":
			 nextLocation = currentLocationOfHorse - widthOfBoard;
			 break;	 
		case "down":
			 nextLocation = currentLocationOfHorse + widthOfBoard;
			 break;
	}//switch
	
	nextClass = gridBoxes[nextLocation].className;
	
	// if the obstacle is not passable don't move
	if(noPassObstacles.includes(nextClass)){return;}//if
	
	//if it is a fence, and there is no rider, don't move
	if(!riderOn && nextClass.includes("fence")){return;}
	
	// if ther is a fence move stwo spaces with animation
	if(nextClass.includes("fence")){
		
		// rider must be on horse
		if(riderOn){
			gridBoxes[currentLocationOfHorse].className = "";
			oldClassName = gridBoxes[nextLocation].className;
			
			//set values according to direction
			if(direction == "left"){
				nextClass = "jumpleft";
				nextClass2 = "horseriderleft";
				nextLocation2 = nextLocation - 1;
			}else if (direction == "right"){
				nextClass = "jumpright";
				nextClass2 = "horseriderright";
				nextLocation2 = nextLocation + 1;
			}else if (direction == "up"){
				nextClass = "jumpup";
				nextClass2 = "horseriderup";
				nextLocation2 = nextLocation - widthOfBoard;
			}else if (direction == "down"){
				nextClass = "jumpdown";
				nextClass2 = "horseriderdown";
				nextLocation2 = nextLocation + widthOfBoard;
			}
			
			// show horse jumping
			gridBoxes[nextLocation].className = nextClass;
			
			setTimeout(function() {
				
				//set jump back to just a fence
				gridBoxes[nextLocation].className = oldClassName;
				
				// update current location of horse to be 2 spaces past take off
				currentLocationOfHorse = nextLocation2;
				
				//get class of box after jump
				nextClass = gridBoxes[currentLocationOfHorse].className;
				
				// show horse and rider after landing
				gridBoxes[currentLocationOfHorse].className = nextClass2;
				
				// if next box is flag level up
				levelUp(nextClass);
			},350);
			return;
		}//if rider is on
		
	}//if class has fence
	
	
	//if ther is a rider, add rider
	if(nextClass == "rider"){
		riderOn = true;

	}
	// if ther is a bridge in the old location keep it
	if(oldClassName.includes("bridge")){
		gridBoxes[oldLocation].className = "bridge";
	}else{
		gridBoxes[oldLocation].className = "";
	}//else
		
	// build name of new class
	newClass = (riderOn)? "horserider" : "horse";
	newClass += direction;
	
	// if there is a bridge in the next location keep it
	if(gridBoxes[nextLocation].classList.contains("bridge")) {
		newClass += " bridge";
	}
	//move 1 space
	currentLocationOfHorse = nextLocation;
	gridBoxes[currentLocationOfHorse].className = newClass;
	// if it is an enemy, end game
	if(nextClass.includes("enemy")){
		document.getElementById("lose").style.display = "block";
		return;
	}
	// if hit flag go to next level
	levelUp(nextClass);
}//tryToMove

//move up a level
function levelUp(nextClass){
	if(nextClass == "flag"){// && riderOn == true){
		document.getElementById("levelup").style.display = "block";
		clearTimeout(currentAnimation);
		setTimeout (function(){
			document.getElementById("levelup").style.display = "none";
			currentLevel++;
		//TODO not increment currentLevel if level is last level and show end screen
		
		loadLevel();
		},1000);
		
	}//if
}

//loads levels 0-maxlevel
function loadLevel(){
	
	let levelMap = levels[currentLevel];
	let animateBoxes;
	riderOn = false;
	
	//load board

	for (i = 0; i < gridBoxes.length; i++){
		gridBoxes[i].className = levelMap[i];
		if(levelMap[i].includes("horse")) currentLocationOfHorse = i;
	}//for
	
	animateBoxes = document.querySelectorAll(".animate");
	animateEnemy(animateBoxes, 0, "right");
}//loadlevel

//animate enemy left to right (could add up to down for this)
//boxes - array of grid boxes that include animation
//index - current location of animation
//direction - current direction of animation
function animateEnemy(boxes, index, direction){
	//exit function if no animation
	if(boxes.length <= 0) {return};
	
	//update images
	if(direction == "right"){
		boxes[index].classList.add("enemyright");
	}else{
		boxes[index].classList.add("enemyleft");
	}
	
	//remove images from other boxes
	for(i = 0; i< boxes.length; i++){
		if (i != index){
			boxes[i].classList.remove("enemyleft");
			boxes[i].classList.remove("enemyright");
			
		}
	}//for
	
	//moving right
	if(direction == "right"){
		//turn around if hit right side
		if(index == boxes.length - 1){
			index--;
			direction = "left";
		}else{
			index++;
		}
		//moving left
	}else{
		//turn around if hit left side
		if(index == 0){
			index++;
			direction = "right";
		}else{
			index--;
		}
	}//else
		
	currentAnimation = setTimeout(function(){
		animateEnemy(boxes, index, direction);
	},750);
}//animate enemy