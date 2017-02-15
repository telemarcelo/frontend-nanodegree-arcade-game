// creates a global variable to represent the difficulty of the game
var difficulty = 50;

// creates a global object to represent the score
var score= {"value":0};
//erases the old score by rewriting in white
score.erase = function() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score: " + this.value,150,50);
}
//writes the new score
score.render = function() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + this.value,150,50);
}
//erases the old score, sets it to zero, writes the 0 score on screen
score.reset = function(){
    score.erase();
    this.value = 0;
    score.render();
}
//erases the old score, increases it by one, writes the new score on screen
score.increment = function(){
    score.erase();
    this.value++;
    score.render();
}


// Enemies our player must avoid
var Enemy = function(X,Y) {
    // Variables applied to each of our instances go here
    // x and y are the initial coordinates of an enemy
    this.x = X;
    this.y = Y;
    // stores the speed at which an enemy is moving
    this.speed = 200*Math.random() + difficulty;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // updates position every dt seconds
    this.x = this.x + this.speed*dt;
    // checks to see if enemy is off screen and brings it to other side 
    // if necessary
    if(this.x>500){
        this.x=-100; 
        difficulty = difficulty + 5;
        // increases speed of enemy once a "lap" is completed
        this.speed = 200*Math.random() + difficulty};    
    // checks for collisions with the player and initializes player and initializes
    // the score if necessary.  
    if(player.y==this.y){
        if(Math.abs(player.x-this.x)<50){
            player.initialize();
            //conserves the old score for erasing and sets score to zero
            //also brings difficulty back to initial value
            score.reset();
            difficulty = 50;
        }
    }
};

// Draw the enemy on the screen using its x and y positions
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Places the player in its initlia game postion: 
    //this.x = 200;
    //this.y = 405;
    this.initialize()
    // The image/sprite for our enemies
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
// Not needed for non-cotinuous movements
Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

};

//sets the initial position for player
Player.prototype.initialize = function() {
    this.x=200;
    this.y=405;
}

// creates the players change in x and y variables according to 
// players choice of key presses
Player.prototype.handleInput = function(keyName) {
    // moves is an array holding changes in x and y coordinates
    var moves = {
        'left': [-100,0],
        'up': [0,-85],
        'right': [100,0],
        'down': [0,85]
    };
    var move = moves[keyName];
    
    // makes sure player stays on screen
    this.x = Math.max(Math.min(this.x + move[0],400),0);
    this.y = Math.max(Math.min(this.y + move[1],405),-100);
    // brings player back to initial position if player wins
    if(this.y<0){
        this.initialize();
        //increments score
        score.increment();
    };
}



// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// creates an array to hold all enemy objects
var allEnemies = [];
// creates each enemy on a different lane and adds them to allEnemies array
allEnemies.push(new Enemy(-100,65));
allEnemies.push(new Enemy(-100,150));
allEnemies.push(new Enemy(-100,235));

// creates the player object
var player = new Player();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
