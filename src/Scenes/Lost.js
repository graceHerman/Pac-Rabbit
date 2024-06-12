class Lost extends Phaser.Scene {
    constructor() {
        super("lostScene");

        // Initialize a class variable "my" which is an object.
        // The object has one property, "sprite" which is also an object.
        // This will be used to hold bindings (pointers) to created sprites.
        this.my = {sprite: {}};

        this.score = 0;
        this.health = 10;
        
    }

    init(data) {
        this.score = data.score || 0; // Retrieve the score from data, defaulting to 0 if not provided
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

        this.titleText = this.add.text(650, 200, 'You lost', { fontFamily: 'Comic Sans MS', fontSize: 100, color: '#ffffff' });
        this.titleText = this.add.text(620, 350, 'You got this! :)', { fontFamily: 'Comic Sans MS', fontSize: 65, color: '#ffffff' });

        this.score = this.scene.settings.data.score;

        // Create score text and play option
        this.scoreText = this.add.text(700, 450, 'Score: ' + this.score, { fontFamily: 'Comic Sans MS', fontSize: 50});
        
        this.playText = this.add.text(850, 600, 'Restart!', { fontFamily: 'Comic Sans MS', fontSize: 50, color: '#ffffff'}).setOrigin(0.5).setInteractive();

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
            this.scene.start("loadScene", { health: 10, score: 0, maxScore: this.maxScore});
        });
    }
}
