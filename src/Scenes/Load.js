class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load townsfolk
        this.load.image("purple", "purple_townie.png");
        this.load.image("blue", "blue_townie.png");
        this.load.image("rabbit", "bunny1_stand.png");
        this.load.image("rabbitWalk", "bunny1_walk1.png");
        this.load.image("rabbitWalk2", "bunny1_walk2.png");

        // Load tilemap information
        this.load.image("tilemap_tiles", "tilemap_packed.png");                   // Packed tilemap
        this.load.tilemapTiledJSON("three-farmhouses", "three-farmhouses.tmj");   // Tilemap in JSON
    }

    create() {
        

         // ...and pass to the next Scene
         this.scene.start("pathfinderScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}