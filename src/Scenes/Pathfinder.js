class Pathfinder extends Phaser.Scene {
    constructor() {
        super("pathfinderScene");

        this.score = 0;
        this.health = 10;
        this.invince = false;
        this.invinceDura = 1000;
    }

    preload() {

    }

    init() {
        this.TILESIZE = 16;
        this.SCALE = 2.0;
        this.TILEWIDTH = 40;
        this.TILEHEIGHT = 25;
        this.playerSpeed = 2;
    }

    create() {
        // Create a new tilemap which uses 16x16 tiles, and is 40 tiles wide and 25 tiles tall
        this.map = this.add.tilemap("three-farmhouses", this.TILESIZE, this.TILESIZE, this.TILEHEIGHT, this.TILEWIDTH);

        // Add a tileset to the map
        this.tileset = this.map.addTilesetImage("kenney-tiny-town", "tilemap_tiles");

        // Create the layers
        this.groundLayer = this.map.createLayer("Ground-n-Walkways", this.tileset, 0, 0);
        this.treesLayer = this.map.createLayer("Trees-n-Bushes", this.tileset, 0, 0);
        this.housesLayer = this.map.createLayer("Houses-n-Fences", this.tileset, 0, 0);
        
        /*// Create the layers
        this.groundLayer = this.map.createLayer("Ground-n-Walkways", this.tileset, 0, 0);
        my.sprite.playerRabbit = this.physics.add.sprite(this.tileXtoWorld(5), this.tileYtoWorld(5), "purple").setOrigin(0,0); //changes the spawn location of the player.
        this.treesLayer = this.map.createLayer("Trees-n-Bushes", this.tileset, 0, 0);
        this.housesLayer = this.map.createLayer("Houses-n-Fences", this.tileset, 0, 0);

        this.housesLayer.setCollisionByProperty({ collides: true });
        this.treesLayer.setCollisionByProperty({ collides: true });

        // make it where the characters collide with the trees and houses
        my.sprite.playerRabbit.setCollideWorldBounds(true);

        // Enable collision handling
        this.physics.add.collider(my.sprite.playerRabbit, this.housesLayer);
        this.physics.add.collider(my.sprite.playerRabbit, this.treesLayer);*/

        // Create townsfolk sprite
        // Use setOrigin() to ensure the tile space computations work well
        my.sprite.playerRabbit = this.physics.add.sprite(this.tileXtoWorld(5), this.tileYtoWorld(5), "rabbit").setOrigin(0,0); //changes the spawn location of the player.

        // regular carrots
        my.sprite.carrot = this.physics.add.sprite(this.tileXtoWorld(7), this.tileYtoWorld(21), "carrot").setOrigin(0,0);
        my.sprite.carrot1 = this.physics.add.sprite(this.tileXtoWorld(7), this.tileYtoWorld(13), "carrot").setOrigin(0,0);
        my.sprite.carrot2 = this.physics.add.sprite(this.tileXtoWorld(25), this.tileYtoWorld(19), "carrot").setOrigin(0,0);
        my.sprite.carrot3 = this.physics.add.sprite(this.tileXtoWorld(27), this.tileYtoWorld(19), "carrot").setOrigin(0,0);
        my.sprite.carrot4 = this.physics.add.sprite(this.tileXtoWorld(15), this.tileYtoWorld(9), "carrot").setOrigin(0,0);
        my.sprite.carrot5 = this.physics.add.sprite(this.tileXtoWorld(21), this.tileYtoWorld(11), "carrot").setOrigin(0,0);
        my.sprite.carrot6 = this.physics.add.sprite(this.tileXtoWorld(35), this.tileYtoWorld(17), "carrot").setOrigin(0,0);
        my.sprite.carrot7 = this.physics.add.sprite(this.tileXtoWorld(36), this.tileYtoWorld(17), "carrot").setOrigin(0,0);
        my.sprite.carrot8 = this.physics.add.sprite(this.tileXtoWorld(35), this.tileYtoWorld(4), "carrot").setOrigin(0,0);
        my.sprite.carrot9 = this.physics.add.sprite(this.tileXtoWorld(15), this.tileYtoWorld(16), "carrot").setOrigin(0,0);
        my.sprite.carrot10 = this.physics.add.sprite(this.tileXtoWorld(20), this.tileYtoWorld(2), "carrot").setOrigin(0,0);

        // gold carrots
        my.sprite.gold = this.physics.add.sprite(this.tileXtoWorld(5), this.tileYtoWorld(21), "gold").setOrigin(0,0);
        my.sprite.gold1 = this.physics.add.sprite(this.tileXtoWorld(26), this.tileYtoWorld(19), "gold").setOrigin(0,0);
        my.sprite.gold2 = this.physics.add.sprite(this.tileXtoWorld(17), this.tileYtoWorld(23), "gold").setOrigin(0,0);
        my.sprite.gold3 = this.physics.add.sprite(this.tileXtoWorld(35), this.tileYtoWorld(3), "gold").setOrigin(0,0);
        my.sprite.gold4 = this.physics.add.sprite(this.tileXtoWorld(20), this.tileYtoWorld(7), "gold").setOrigin(0,0);

        this.carrots = [my.sprite.carrot, my.sprite.carrot1, my.sprite.carrot2, my.sprite.carrot3, my.sprite.carrot4, my.sprite.carrot5,
            my.sprite.carrot6, my.sprite.carrot7, my.sprite.carrot8, my.sprite.carrot9, my.sprite.carrot10
        ];
        this.gold_carrots = [my.sprite.gold, my.sprite.gold1, my.sprite.gold2, my.sprite.gold3, my.sprite.gold4];

        my.sprite.enemy1 = this.physics.add.sprite(this.tileXtoWorld(10), this.tileYtoWorld(11), "enemyFly").setOrigin(0, 0);
        my.sprite.enemy2 = this.physics.add.sprite(this.tileXtoWorld(15), this.tileYtoWorld(5), "enemyFly").setOrigin(0, 0);
        my.sprite.enemy3 = this.physics.add.sprite(this.tileXtoWorld(23), this.tileYtoWorld(23), "enemyFly").setOrigin(0, 0);
        my.sprite.enemy4 = this.physics.add.sprite(this.tileXtoWorld(30), this.tileYtoWorld(8), "enemyFly").setOrigin(0, 0);
        my.sprite.enemy5 = this.physics.add.sprite(this.tileXtoWorld(35), this.tileYtoWorld(15), "enemyFly").setOrigin(0, 0);
        my.sprite.enemy6 = this.physics.add.sprite(this.tileXtoWorld(35), this.tileYtoWorld(23), "enemyFly").setOrigin(0, 0);
        my.sprite.enemy7 = this.physics.add.sprite(this.tileXtoWorld(3), this.tileYtoWorld(20), "enemyFly").setOrigin(0, 0);
        //my.sprite.enemy8 = this.physics.add.sprite(this.tileXtoWorld(3), this.tileYtoWorld(20), "enemyFly").setOrigin(0, 0);
        this.enemyPaths = [
            [{x: 10, y: 11}, {x: 5, y: 11}, {x: 5, y: 15}, {x: 5, y: 11}], // Path for enemy1
            [{x: 15, y: 5}, {x: 20, y: 5}, {x: 20, y: 7}, {x: 15, y: 7}], // Path for enemy2
            [{x: 23, y: 23}, {x: 33, y: 23}], // Path for enemy3
            [{x: 30, y: 8}, {x: 36, y: 8}, {x: 30, y: 8}, {x: 30, y: 10}, {x: 29, y: 10}, {x: 29, y: 8}], // Path for enemy4
            [{x: 35, y: 15}, {x: 35, y: 13}, {x: 36, y: 13}, {x: 36, y: 17}, {x: 35, y: 17}], // Path for enemy5
            [{x: 35, y: 23}, {x: 38, y: 23}, {x: 38, y: 19}, {x: 33, y: 19}, {x: 33, y: 21}, {x: 35, y: 21}], // Path for enemy6
            [{x: 3, y: 20}, {x: 3, y: 23}, {x: 15, y: 23}, {x: 3, y: 23}] // Path for enemy7
        ];
        this.enemyData = [];
        for (let i = 0; i < this.enemyPaths.length; i++) {
            this.enemyData.push({
                enemy: my.sprite[`enemy${i+1}`],
                path: this.enemyPaths[i],
                pathIndex: 0,
                speed: 5,
                health: 1
            });
        }

        for (let i = 0; i < this.enemyData.length; i++) {
            let enemy = this.enemyData[i].enemy;
            this.physics.add.overlap(my.sprite.playerRabbit, enemy, this.handleEnemyCollision, null, this);
        }
        //this.moveEnemies();
        //my.sprite.blueTownie = this.add.sprite(this.tileXtoWorld(15), this.tileYtoWorld(15), "blue").setOrigin(0,0);
        //Creates a walking animation for the player.
        this.anims.create({
            key: "rabbitWalk",
            frames: [
                { key: "rabbitWalk" },
                { key: "rabbitWalk2" }
            ],
            frameRate: 4,
            repeat: -1
        });
        //Figure out a way to have the game understand when two sprites are colliding.
        //This will help us increment score and add enemy damaging.
    

        // Camera settings
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setZoom(this.SCALE);

        // Create grid of visible tiles for use with path planning
        let tinyTownGrid = this.layersToGrid([this.groundLayer, this.treesLayer, this.housesLayer]);

        let walkables = [1, 2, 3, 30, 40, 41, 42, 43, 44, 95, 13, 14, 15, 25, 26, 27, 37, 38, 39, 70, 84];

        // Initialize EasyStar pathfinder
        this.finder = new EasyStar.js();

        // Pass grid information to EasyStar
        // EasyStar doesn't natively understand what is currently on-screen,
        // so, you need to provide it that information
        this.finder.setGrid(tinyTownGrid);

        // Tell EasyStar which tiles can be walked on
        this.finder.setAcceptableTiles(walkables);

        this.activeCharacter = my.sprite.playerRabbit;

        // Handle mouse clicks
        // Handles the clicks on the map to make the character move
        // The this parameter passes the current "this" context to the
        // function this.handleClick()
        this.input.on('pointerup',this.handleClick, this);

        this.cKey = this.input.keyboard.addKey('C');
        this.lowCost = false;

        /*// add key inputs for character movement AWSD
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.up = this.input.keyboard.addKey("W");
        this.down = this.input.keyboard.addKey("S");*/
        this.reset = this.input.keyboard.addKey("R");

        // make a score text 
        this.scoreText = this.add.text(525, 5, 'Score: ' + this.score, { fontFamily: 'Comic Sans MS', fontSize: 18, color: '#0ffffff' });
        this.healthText = this.add.text(525, 25, 'Health: ' + this.health, { fontFamily: 'Comic Sans MS', fontSize: 18, color: '#ffffff' });

    }

    update() {
        this.moveEnemies(this.game.loop.delta);
        /*if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            if (!this.lowCost) {
                // Make the path low cost with respect to grassy areas
                this.setCost(this.tileset);
                this.lowCost = true;
            } else {
                // Restore everything to same cost
                this.resetCost(this.tileset);
                this.lowCost = false;
            }
        }*/

        /*// make the character move
        // Moving left
        if (this.left.isDown) {
            // Check to make sure the sprite can actually move left
            if (my.sprite.playerRabbit.x > (my.sprite.playerRabbit.displayWidth/2)) {
                my.sprite.playerRabbit.x -= this.playerSpeed;
            }
        }

        // Moving right
        if (this.right.isDown) {
            // Check to make sure the sprite can actually move right
            if (my.sprite.playerRabbit.x < (game.config.width - (my.sprite.playerRabbit.displayWidth/2))) {
                my.sprite.playerRabbit.x += this.playerSpeed;
            }
        }

        // Moving down
        if (this.down.isDown) {
            // Check to make sure the sprite can actually move right
            if (my.sprite.playerRabbit.y < (game.config.height - (my.sprite.playerRabbit.displayHeight/2))) {
                my.sprite.playerRabbit.y += this.playerSpeed;
            }
        }
        
        // Moving up
        if (this.up.isDown) {
            // Check to make sure the sprite can actually move left
            if (my.sprite.playerRabbit.y > (my.sprite.playerRabbit.displayHeight/2)) {
                my.sprite.playerRabbit.y -= this.playerSpeed;
            }
        }*/

        // destroy carrots and gold carrots when player collides with them
        // increase the score once there's a collision
        this.carrots = this.carrots.filter(c => {
            if (this.collides(my.sprite.playerRabbit, c)) {
                console.log("Destroyed carrot");
                this.increaseScore(1);
                c.destroy();
                return false; // Remove carrot from array
            }
            return true; // Keep carrot in array
        });

        this.gold_carrots = this.gold_carrots.filter(g => {
            if (this.collides(my.sprite.playerRabbit, g)) {
                console.log("Destroyed gold");
                this.increaseScore(2);
                g.destroy();
                return false; // Remove gold carrot from array
            }
            return true; // Keep gold carrot in array
        });

        // allows you to restart the game 
        if (Phaser.Input.Keyboard.JustDown(this.reset)) {
            this.scene.restart();
        }
    }

    tileXtoWorld(tileX) {
        return tileX * this.TILESIZE;
    }

    tileYtoWorld(tileY) {
        return tileY * this.TILESIZE;
    }

    // We need this for the game to run 
    // if this function gets commneted out, the entire game doesn't pop up
    //
    // Uses the tile layer information in this.map and outputs
    // an array which contains the tile ids of the visible tiles on screen.
    // This array can then be given to Easystar for use in path finding.
    layersToGrid() {
        let grid = [];
        // Initialize grid as two-dimensional array
        // TODO: write initialization code
        for (let y = 0; y<this.map.height; y++){
            let row = [];
            for (let x = 0; x < this.map.width;x++){
                row.push(0);
            }
            grid.push(row)
        }
        // Loop over layers to find tile IDs, store in grid
        // TODO: write this loop
        for (let layer of this.map.layers){
            for (let y = 0; y < this.map.height; y++){
                for (let x = 0; x < this.map.width; x++){
                    let tile = layer.tilemapLayer.getTileAt(x,y);
                    if (tile){
                        grid[y][x] = tile.index;
                    }
                }
            }
        }

        return grid;
    }

    
    // player movement with point and click of mouse
    handleClick(pointer) {
        let x = pointer.x / this.SCALE;
        let y = pointer.y / this.SCALE;
        let toX = Math.floor(x/this.TILESIZE);
        var toY = Math.floor(y/this.TILESIZE);
        var fromX = Math.floor(this.activeCharacter.x/this.TILESIZE);
        var fromY = Math.floor(this.activeCharacter.y/this.TILESIZE);
        console.log('going from ('+fromX+','+fromY+') to ('+toX+','+toY+')');
    
        this.finder.findPath(fromX, fromY, toX, toY, (path) => {
            if (path === null) {
                console.warn("Path was not found.");
            } else {
                console.log(path);
                this.moveCharacter(path, this.activeCharacter);
            }
        });
        this.finder.calculate(); // ask EasyStar to compute the path
        // When the path computing is done, the arrow function given with
        // this.finder.findPath() will be called.
    }
    
    moveCharacter(path, character) {
        // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
        var tweens = [];
        for(var i = 0; i < path.length-1; i++){
            var ex = path[i+1].x;
            var ey = path[i+1].y;
            tweens.push({
                x: ex*this.map.tileWidth,
                y: ey*this.map.tileHeight,
                duration: 200
            });
        }
    
        character.anims.play("rabbitWalk", true);

        this.tweens.chain({
            targets: character,
            tweens: tweens,
            onComplete: () => {
                character.anims.stop();
                character.setTexture("rabbit");
            }
        });

    }

    /*
    resetCost(tileset) {
        for (let tileID = tileset.firstgid; tileID < tileset.total; tileID++) {
            let props = tileset.getTileProperties(tileID);
            if (props != null) {
                if (props.cost != null) {
                    this.finder.setTileCost(tileID, 1);
                }
            }
        }
    }
    
    // A function which takes as input a tileset and then iterates through all
    // of the tiles in the tileset to retrieve the cost property, and then 
    // uses the value of the cost property to inform EasyStar, using EasyStar's
    // setTileCost(tileID, tileCost) function.
    setCost(tileset) {
        // TODO: write this function
        for (let tileID = tileset.firstgid; tileID < tileset.firstgid + tileset.total; tileID++){
            let props = tileset.getTileProperties(tileID);
            if (props && props.cost){
                this.finder.setTileCost(tileID, props.cost);
            }
        }
        */

    // colliding with object
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    increaseScore(amount) {
        this.score += amount;
        this.scoreText.setText('Score: ' + this.score);
    }

    moveEnemies(delta) {
        for (let i = 0; i < this.enemyData.length; i++) {
            let enemyData = this.enemyData[i];
            let enemy = enemyData.enemy;
            let path = enemyData.path;
            let pathIndex = enemyData.pathIndex;
            let speed = enemyData.speed;
    
            // Get the current and next path points
            let currentPoint = path[pathIndex];
            let nextPoint = path[(pathIndex + 1) % path.length];
    
            // Calculate the distance between the current and next points
            let distanceX = nextPoint.x - currentPoint.x;
            let distanceY = nextPoint.y - currentPoint.y;
            let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
            // Calculate the movement speed based on the distance and enemy speed
            let moveSpeed = speed * delta / 1000;
    
            // Normalize the direction vector
            let directionX = distanceX / distance;
            let directionY = distanceY / distance;
    
            // Calculate the new position based on the movement speed and direction
            let newX = enemy.x + directionX * moveSpeed * this.TILESIZE;
            let newY = enemy.y + directionY * moveSpeed * this.TILESIZE;
    
            // Check if the enemy has reached or passed the next point
            if (Math.abs(newX - nextPoint.x * this.TILESIZE) <= moveSpeed * this.TILESIZE &&
                Math.abs(newY - nextPoint.y * this.TILESIZE) <= moveSpeed * this.TILESIZE) {
                // If the enemy has reached the next point, snap to the exact position
                enemy.x = nextPoint.x * this.TILESIZE;
                enemy.y = nextPoint.y * this.TILESIZE;
                enemyData.pathIndex = (pathIndex + 1) % path.length;
            } else {
                // If the enemy hasn't reached the next point, update its position
                enemy.x = newX;
                enemy.y = newY;
            }
        }
    }
    
    handleEnemyCollision(player, enemy) {
        if (!this.invince) {
            // Reduce player health by 1
            this.health--;
            this.healthText.setText('Health: ' + this.health);
    
            // Set invincibility flag and start cooldown timer
            this.invince = true;
            this.time.delayedCall(this.invinceDura, () => {
                this.invince = false;
            });
    
            // Check if player health reaches 0
            if (this.health <= 0) {
                // Game over logic
                console.log("Game Over");
                this.scene.restart();
            }
        }
    }
    
}
