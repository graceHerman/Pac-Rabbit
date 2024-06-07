class Start extends Phaser.Scene {
    constructor() {
        super("start");

        // Initialize a class variable "my" which is an object.
        // The object has one property, "sprite" which is also an object.
        // This will be used to hold bindings (pointers) to created sprites.
        this.my = {sprite: {}};

        this.score = 0;
        
    }

    preload() {
        this.load.setPath("./assets/");

    }

    create() {
        let my = this.my;

        // Notice that in this approach, we don't create any bullet sprites in create(),
        // and instead wait until we need them, based on the number of space bar presses

        // Create key objects (for testing purposes)
        this.enterKey = this.input.keyboard.addKey("P");

        this.titleText = this.add.text(200, 250, 'Pac-Rabbit', { fontFamily: 'Comic Sans MS', fontSize: 80, color: '#ffffff' });
        this.titleText = this.add.text(300, 350, 'Try to collect everything!', { fontFamily: 'Comic Sans MS', fontSize: 65, color: '#ffffff' });

        // Create score bar
        this.playText = this.add.text(300, 500, 'Play!', { fontFamily: 'Comic Sans MS', fontSize: 50, color: '#ffffff'}).setOrigin(0.5).setInteractive();

        // font styles for hovering and normal
        const normalStyle = { fontFamily: 'Comic Sans MS', fontSize: 50, color: '#ffffff' };
        const hoverStyle = { fontFamily: 'Comic Sans MS', fontSize: 80, color: '#ffffff' };

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

        // update HTML description
        document.getElementById('description').innerHTML = '<h2>Start.js</h2><br>'

    }

    update() {
        let my = this.my;

        // for testing purposes
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.scene.start("loadScene", { score: this.score });
        }

    }

    // handles the scene where there's a delay for the next scene entered after user click
    handleSceneChange() {
        // Disable input to prevent further actions
        this.input.enabled = false;

        // Optionally, add a brief delay before transitioning to the new scene
        this.time.delayedCall(100, () => {
            this.scene.start("loadScene", { score: this.score });
        });
    }
}