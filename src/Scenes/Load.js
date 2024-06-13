class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");

        this.health = 10; 
        this.score = 0;
    }

    preload() {
        this.load.setPath("./assets/");

        // Load townsfolk
        this.load.image("purple", "purple_townie.png");
        this.load.image("blue", "blue_townie.png");
        this.load.image("rabbit", "bunny1_stand.png");
        this.load.image("rabbitWalk", "bunny1_walk1.png");
        this.load.image("rabbitWalk2", "bunny1_walk2.png");
        this.load.image("carrot", "carrot.png");
        this.load.image("gold", "carrot_gold.png");
        this.load.image("enemyFly", "flyMan_still_fly.png");
        this.load.image("enemyFly2", "flyMan_jump.png");
        this.load.image("sword", "sword.png");
        this.load.image("walking", "smoke_10.png");
        this.load.image("finishFlag", "flag.png");

        // Load tilemap information
        this.load.image("tilemap_tiles", "tilemap_packed.png");                   // Packed tilemap
        this.load.tilemapTiledJSON("three-farmhouses", "three-farmhouses.tmj");   // Tilemap in JSON

        // play sound
        this.load.audio("walkSound", "footstep_grass_003.ogg");
        this.load.audio("swordSwing", "impactPlate_light_003.ogg");
    }

    create() {
        

         // ...and pass to the next Scene
         this.scene.start("pathfinderScene", {health: 10}, {score: 0});
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}
