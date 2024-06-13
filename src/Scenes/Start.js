class Start extends Phaser.Scene {
    constructor() {
        super("start");

        // Initialize a class variable "my" which is an object.
        // The object has one property, "sprite" which is also an object.
        // This will be used to hold bindings (pointers) to created sprites.
        this.my = {sprite: {}};

        this.score = 0;
        this.health = 10;
        
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.image("brownrabbit", "brown rabbit.png");
    }

    create() {
        let my = this.my;

        this.add.image(420, 400, "brownrabbit").setScale(3.0);

        // Notice that in this approach, we don't create any bullet sprites in create(),
        // and instead wait until we need them, based on the number of space bar presses

        // Create key objects (for testing purposes)
        this.enterKey = this.input.keyboard.addKey("P");

        this.titleText = this.add.text(600, 125, 'Pac-Rabbit', { fontFamily: 'Comic Sans MS', fontSize: 110, color: '#ffffff' });
        this.title1Text = this.add.text(625, 250, 'Try to collect \n' +  'all of the carrots!', { fontFamily: 'Comic Sans MS', fontSize: 60, color: '#ffffff' });

        // Create score bar
        this.playText = this.add.text(850, 675, 'Play!', { fontFamily: 'Comic Sans MS', fontSize: 50, color: '#ffffff'}).setOrigin(0.5).setInteractive();

        this.controlsText = this.add.text(600, 450, 'z: swing sword left    v: swing sword right', { fontFamily: 'Comic Sans MS', fontSize: 30, color: '#ffffff' });
        this.controls1Text = this.add.text(600, 500, 'x: swing sword up     c: swing sword down', { fontFamily: 'Comic Sans MS', fontSize: 30, color: '#ffffff' });
        this.controls2Text = this.add.text(600, 550, 'r: to restart game', { fontFamily: 'Comic Sans MS', fontSize: 30, color: '#ffffff' });

        // font styles for hovering and normal
        const normalStyle = { fontFamily: 'Comic Sans MS', fontSize: 50, color: '#ffffff' };
        const hoverStyle = { fontFamily: 'Comic Sans MS', fontSize: 80, color: '#0ffffff' };

        // bold when hovered
        this.playText.on('pointerover', () => {
            this.playText.setStyle(hoverStyle);
            console.log("play text hovered");
        });
        
        // unbold when not hovered
        this.playText.on('pointerout', () => {
            this.playText.setStyle(normalStyle);
            console.log("play text pointer out");
        });

        this.playText.on('pointerdown', () => {
            this.handleSceneChange();
        });

    }

    update() {
        let my = this.my;

        // for testing purposes
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.scene.start("loadScene", { score: 0 });
        }

    }

    // handles the scene where there's a delay for the next scene entered after user click
    handleSceneChange() {
        // Disable input to prevent further actions
        this.input.enabled = false;

        // Optionally, add a brief delay before transitioning to the new scene
        this.time.delayedCall(100, () => {
            this.scene.start("loadScene", {health: this.health}, {score: this.score}, {maxScore: this.maxScore});
        });
    }
}
