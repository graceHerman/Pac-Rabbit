class Pathfinder extends Phaser.Scene {
    constructor() {
        super("pathfinderScene");

        this.score = 0;
        this.health = 10;
        this.maxScore = 0;
        this.invince = false;
        this.invinceDura = 1000;
    }

    resetGame() {
        this.score = 0;
        this.health = 10;
        //this.scoretext.setText('Score: ' + this.score)
        this.healthText.setText('Health: ' + this.health);

        this.scene.restart();
    }

    preload() {

    }

    init() {
        this.TILESIZE = 16;
        this.SCALE = 2.0;
        this.TILEWIDTH = 40;
        this.TILEHEIGHT = 25;
        this.playerSpeed = 2;

        this.PARTICLE_VELOCITY = 50;

        this.score = 0;
        this.health = 10;
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

        // Create bunny sprite
        // Use setOrigin() to ensure the tile space computations work well
        my.sprite.playerRabbit = this.physics.add.sprite(this.tileXtoWorld(5), this.tileYtoWorld(5), "rabbit").setOrigin(0,0); //changes the spawn location of the player.
        my.sprite.playerRabbit.depth = 1;
        my.sprite.finishFlag = this.physics.add.sprite(this.tileXtoWorld(29), this.tileYtoWorld(5), "finishFlag").setOrigin(0,0); //changes the spawn location of the player.

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
                speed: 3,
                health: 1
            });
        }

        for (let i = 0; i < this.enemyData.length; i++) {
            let enemy = this.enemyData[i].enemy;
            this.physics.add.overlap(my.sprite.playerRabbit, enemy, this.handleEnemyCollision, null, this);
        }

        this.sword = this.add.sprite(0, 0, 'sword');
        this.sword.setOrigin(0.5, 1);
        this.sword.visible = false;

        this.physics.add.overlap(my.sprite.playerRabbit, my.sprite.finishFlag, this.handleFinishFlagCollision, null, this);

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

        //trying to figure out why this doesnt work.
        this.walkingParticles = this.add.particles(8,8, 'walking',{
            speed: { min: -50, max: 50 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.02, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 500,
            blendMode: 'ADD',
            follow: my.sprite.playerRabbit,
            //offsetX: 8,
            //offsetY: 8,
            on: false // Start the emitter in an inactive state
        });
        this.walkingParticles.depth = 0;
        this.walkingParticles.stop();
        

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

        // add key inputs for character movement AWSD
        this.reset = this.input.keyboard.addKey("R");
        this.zKey = this.input.keyboard.addKey("Z");
        this.xKey = this.input.keyboard.addKey("X");
        this.cKey = this.input.keyboard.addKey("C");
        this.vKey = this.input.keyboard.addKey("V");

        this.nKey = this.input.keyboard.addKey("N");

        // make a score text 
        this.scoreText = this.add.text(525, 5, 'Score: ' + this.score, { fontFamily: 'Comic Sans MS', fontSize: 18, color: '#0ffffff' });
        this.healthText = this.add.text(400, 5, 'Health: ' + this.health, { fontFamily: 'Comic Sans MS', fontSize: 18, color: '#0ffffff' });

        // Walking sound
        this.walkSound = this.sound.add('walkSound', { volume: 0.25 });

        this.isRabbitMoving = false;

        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

    }

    update() {
        this.moveEnemies(this.game.loop.delta);

        // Play walking sound if rabbit is moving and stop it if not
        if (this.isRabbitMoving) {
            if (!this.walkSound.isPlaying) {
                this.walkSound.play();
                console.log("Sound playing");
            }
        } 
        else {
            if (this.walkSound.isPlaying) {
                this.walkSound.stop();
                console.log("Sound is not moving");
            }
        }

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
            this.resetGame();
        }

        // sword controls
        if (Phaser.Input.Keyboard.JustDown(this.zKey)) {
            this.swingSword('left');
        } else if (Phaser.Input.Keyboard.JustDown(this.xKey)) {
            this.swingSword('up');
        } else if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            this.swingSword('down');
        } else if (Phaser.Input.Keyboard.JustDown(this.vKey)) {
            this.swingSword('right');
        }

        // for testing purposes
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.scene.start("credits", {score: this.score, maxScore: this.maxScore});
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
        for (let y = 0; y<this.map.height; y++){
            let row = [];
            for (let x = 0; x < this.map.width;x++){
                row.push(0);
            }
            grid.push(row)
        }
        // Loop over layers to find tile IDs, store in grid
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

        this.isRabbitMoving = true;

        this.walkingParticles.start();

        this.tweens.chain({
            targets: character,
            tweens: tweens,
            onComplete: () => {
                character.anims.stop();
                character.setTexture("rabbit");

                // Stop the walking sound when the animation stops
                this.isRabbitMoving = false;
                this.walkingParticles.stop();
            }
        });

    }

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
                //this.scene.restart();
                this.scene.start("lostScene", {score: this.score});
            }
        }
    }

    swingSword(direction) {
        // Set the sword position to the player's position
        this.sword.x = my.sprite.playerRabbit.x;
        this.sword.y = my.sprite.playerRabbit.y;
    
        // Show the sword
        this.sword.visible = true;
    
        // Set the sword rotation based on the direction
        let angle = 0;
        let offsetX = 0;
        let offsetY = 0;
        switch (direction) {
            case 'left':
                angle = -90;
                offsetX = 0;
                offsetY = 8;
                break;
            case 'up':
                angle = 0;
                offsetY = 0;
                offsetX = 8;
                break;
            case 'down':
                angle = 179;
                offsetY = 20;
                offsetX = 8;
                break;
            case 'right':
                angle = 90;
                offsetX = 16;
                offsetY = 8;
                break;
        }

        this.sword.angle = angle;
        this.sword.x += offsetX;
        this.sword.y += offsetY;

        this.physics.world.enable(this.sword);

        for (let i = 0; i < this.enemyData.length; i++) {
            let enemy = this.enemyData[i].enemy;
            this.physics.add.overlap(this.sword, enemy, this.handleSwordEnemyCollision, null, this);
        }
    
        // Create the swinging animation using a tween
        this.tweens.add({
            targets: this.sword,
            angle: angle + 45,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            repeat: 0,
            onComplete: () => {
                // Hide the sword when the animation is complete
                this.sword.visible = false;

                this.physics.world.disable(this.sword);
            }
        });
    }

    handleSwordEnemyCollision(sword, enemy) {
        // Destroy the enemy sprite
        enemy.destroy();
        this.increaseScore(5);
    
        // Remove the enemy from the enemyData array
        this.enemyData = this.enemyData.filter(data => data.enemy !== enemy);
    }

    handleFinishFlagCollision(player, finishFlag) {
    // Start the "credits" scene with the player's score
    this.scene.start("credits", { score: this.score }, {maxScore: this.maxScore});
    }
    
}
