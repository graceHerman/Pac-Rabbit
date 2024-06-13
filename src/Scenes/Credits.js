class Credits extends Phaser.Scene {
    constructor() {
        super("credits");

        // Initialize a class variable "my" which is an object.
        // The object has one property, "sprite" which is also an object.
        // This will be used to hold bindings (pointers) to created sprites.
        this.my = {sprite: {}};
        
    }

    init(data) {
        //this.maxScore = data.maxScore || 0;
        this.score = data.score || 0; // Retrieve the score from data, defaulting to 0 if not provided

        this.highScore = parseInt(localStorage.getItem('highScore')) || 0;

        // Update the high score if the current score is higher
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore.toString());
        }
    }

    preload() {
        this.load.setPath("./assets/");

        // Load townsfolk
        this.load.image("background", "maxresdefault.png");

    }

    create() {
        let my = this.my;

        // Option 1: we can use key inputs
        // or use these for testing purposes 
        this.nextScene = this.input.keyboard.addKey("B");
        this.restartScene = this.input.keyboard.addKey("R");
        
        // display the background image
        this.add.image(500, 300, "background").setScale(1.40);

        // credits
        this.endText = this.add.text(250, 75, 'YOU DID IT! :D', { fontFamily: 'Comic Sans MS', fontSize: 100, color: '#0ffffff'});
        this.scoreText = this.add.text(395, 200, 'Score: ' + this.score + '      High Score: ' + this.highScore, { fontFamily: 'Comic Sans MS', fontSize: 50, color: '#0ffffff'});

        this.creditText = this.add.text(75, 275, 'Credits:', { fontFamily: 'Comic Sans MS', fontSize: 25, color: '#0ffffff' });
        this.credit1Text = this.add.text(75, 315, 'kenney_jumper-pack for player and enemies', { fontFamily: 'Comic Sans MS', fontSize: 25, color: '#0ffffff' });
        this.credit2Text = this.add.text(75, 355, 'kenny_particle-pack for particle effects', { fontFamily: 'Comic Sans MS', fontSize: 25, color: '#0ffffff' });
        this.credit3Text = this.add.text(75, 395, 'kenny_impact-sound for sound', { fontFamily: 'Comic Sans MS', fontSize: 25, color: '#0ffffff' });
        this.credit4Text = this.add.text(75, 435, 'kenny_tiny-dungeon for sword and kenny_pixel-platformer for flag', { fontFamily: 'Comic Sans MS', fontSize: 25, color: '#0ffffff' });
        this.credit5Text = this.add.text(75, 475, 'Start screen image by Dgwildlife and Credit screen image by ...', { fontFamily: 'Comic Sans MS', fontSize: 25, color: '#0ffffff' });
        this.credit6Text = this.add.text(75, 515, 'Coded, designed and created by Myles Andersson', { fontFamily: 'Comic Sans MS', fontSize: 25, color: '#0ffffff' });
        this.credit7Text = this.add.text(75, 555, 'Coded and designed by Grace Herman', { fontFamily: 'Comic Sans MS', fontSize: 25, color: '#0ffffff' });
        this.credit8Text = this.add.text(75, 595, 'PlatformImprovement-master file by Jim Whitehead as reference for our code ', { fontFamily: 'Comic Sans MS', fontSize: 25, color: '#0ffffff' });

        this.backText = this.add.text(450, 680, 'title', { fontFamily: 'Comic Sans MS', fontSize: 35, color: '#0ffffff'}).setOrigin(0.5).setInteractive();
        this.againText = this.add.text(750, 680, 'replay game', { fontFamily: 'Comic Sans MS', fontSize: 35, color: '#0ffffff'}).setOrigin(0.5).setInteractive();

        // Styles for normal and hover states
        const normalStyle = { fontFamily: 'Comic Sans MS', fontSize: 35, color: '#0ffffff' };
        const hoverStyle = { fontFamily: 'Comic Sans MS', fontSize: 55, color: '#ffffff'};

        // bold when hovered
        this.backText.on('pointerover', () => {
            this.backText.setStyle(hoverStyle);
            console.log("Back text hovered");
        });

        this.againText.on('pointerover', () => {
            this.againText.setStyle(hoverStyle);
            console.log("Again text hovered");
        });
        
        // unbold when not hovered
        this.backText.on('pointerout', () => {
            this.backText.setStyle(normalStyle);
            console.log("Back text pointer out");
        });

        this.againText.on('pointerout', () => {
            this.againText.setStyle(normalStyle);
            console.log("Again text pointer out");
        });

        // handle scenes here
        this.backText.on('pointerdown', () => {
            this.scene.start("start");
        });

        this.againText.on('pointerdown', () => {
            this.scene.start("loadScene", {score: 0}, {maxScore: this.maxScore});
        });

    }

    update() {
        let my = this.my;

        // for testing purposes
        if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("start");
        }
        if (Phaser.Input.Keyboard.JustDown(this.restartScene)) {
            this.scene.restart("loadScene");
        }

    }

}
