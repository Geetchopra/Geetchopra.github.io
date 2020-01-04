export class Brickzz extends Phaser.Scene {
	private bricks : Array<Phaser.GameObject.Physics> = [];
	private colour : string[] = ["none", "pink", "yellow", "green", "red", "blue"];
	private power_ups : string[] = ["enlarge", "multi_ball", "invulnerable"];
	private paddle : Phaser.GameObject.Physics;
	private ball : Phaser.GameObject.Physics;
	private score_text : Phaser.GameObject.Text;
	private score : number;
	private lives_text : Phaser.GameObject.Text;
	private lives : number;
	private full_reset : boolean;

	constructor() {
	    super({
	      key: "brickzz"
	    });
	  }

	preload() : void {
		let assets : Array<string> = ["super_bar", "you_win", "you_lose", "invulnerable", "green_ball", "enlarge", "multi_ball", "blue_brick", "red_brick", "yellow_brick", "green_brick", "pink_brick", "ball", "paddle", "background"];
		for (var i = 0; i < assets.length; i++) {
			this.load.image(assets[i], "assets/" + assets[i] + ".png");
		}
	}

	create() : void {
		this.physics.world.setBoundsCollision(true, true, true, false);
		this.init_UI();
		this.init_bricks();
		this.init_paddle();
		this.init_ball();
		this.init_colliders();
	}

	update() : void {
		this.input_manager();
		if (this.ball.y >= 1210) {
			if (--this.lives == 0)
				this.lose();
			else
				this.reset_game();
		}
	}

	init_bricks() : void {
		let x : number = 72;
	    let y : number = 100;
	    let brick_colour : string;
	    let power_up : string;
	    for (var i = 0; i < 5; i++) {
	        for (var j = 0; j < 9; j++) {
	            brick_colour = this.get_colour(Math.random());
	            power_up = this.get_power_up(Math.random());
	            let brick = this.physics.add.sprite(x, y, brick_colour + "_brick").setOrigin(0,0).setImmovable();
	            brick.setData({"colour":  brick_colour, "original_colour": brick_colour, "power_up" : power_up});
	            if (power_up != "none") {
	            	brick.setData("power", this.physics.add.sprite(x + 22, y + 6, power_up).setOrigin(0, 0).setName(power_up).setScale(0.65));
	            }
	            this.bricks.push(brick);
	            x += 64;
	        }
	        x = 72;
	        y += 32;
	    }
	}

	get_power_up(num: number) : string {
		if (num >= 0.00 && num <= 0.10) {
			return this.power_ups[0];
		}
		else if (num > 0.10 && num <= 0.20) {
			return this.power_ups[1];
		}
		else if (num > 0.20 && num <= 0.30) {
			return this.power_ups[2];
		}
		else {
			return "none";
		}
	}

	get_colour(num : number) : string {
		if (num >= 0.00 && num <= 0.30) {
	        return this.colour[1];
	    }
	    else if (num > 0.30 && num <= 0.55) {
	        return this.colour[2];
	    }
	    else if (num > 0.55 && num <= 0.75) {
	        return this.colour[3];
	    }
	    else if (num > 0.75 && num <= 0.90) {
	        return this.colour[4];
	    }
	    else if (num > 0.90 && num <= 1.00) {
	        return this.colour[5];
	    }
	}

	init_paddle() : void {
		this.paddle = this.physics.add.sprite(296, 1200, 'paddle').setOrigin(0,0);
		this.paddle.setCollideWorldBounds(true);
    	this.paddle.setImmovable();
    	this.paddle.setInteractive({draggable: true});
    	this.paddle.body.setAllowGravity(false);
	}

	init_ball() : void {
		this.ball = this.physics.add.sprite(347.5, 1150, 'ball').setOrigin(0,0);
		this.ball.setCollideWorldBounds(true);
    	this.ball.setData('on_paddle', true);
    	this.ball.setBounce(1, 1);
	}

	init_colliders() : void {
		for (var i = 0; i < this.bricks.length; i++) {
			this.physics.add.collider(this.ball, this.bricks[i], this.hit_brick, null, this);
		}
		this.physics.add.collider(this.ball, this.paddle, this.hit_paddle, null, this);
	}

	init_UI() : void {
		this.score = 0;
		this.lives = 3;
		this.full_reset = false;
		this.add.image(0, 0, 'background').setOrigin(0, 0);
		this.score_text = this.add.text(34, 30, "Score: " + this.score, {font : "18px Arial"});
    	this.lives_text = this.add.text(619, 30, "Lives: " + this.lives, {font : "18px Arial"});
	}

	input_manager() : void {
		this.paddle.on('drag', (pointer) => {
			this.callback_paddle(pointer);
		});

		this.paddle.on('pointerup', (pointer) => {
			this.callback_ball(pointer);
		});
	}

	callback_ball(pointer) : void {
		if (this.ball.getData('on_paddle'))
        {
            this.ball.setVelocity(-75, -500);
            this.ball.setData('on_paddle', false);
        }
	}

	callback_paddle(pointer) : void {
        this.paddle.x = Phaser.Math.Clamp(pointer.x-64, 0, 720-128);
        if (this.ball.getData('on_paddle'))
        {
            this.ball.x = this.paddle.x+51;
        }
	}

	hit_brick(ball : Phaser.GameObject.Physics, brick : Phaser.GameObject.Physics) : void {
		let brick_colour : string;

		let index : number = this.colour.indexOf(brick.getData("colour"));
		brick_colour = this.colour[index-1];

		if (brick_colour == "none") {
			this.score += 35;
			brick.disableBody(true, true);
			if (brick.getData("power_up") != "none" && this.bricks.findIndex(brick => brick.active == true) != -1)
				this.drop_power(brick.getData("power_up"), brick.getData("power"));
		}
		else {
			this.score += 10;
			brick.setTexture(brick_colour + "_brick");
			brick.setData("colour", brick_colour);
		}

		this.score_text.setText("Score: " + this.score);
		if (this.bricks.findIndex(brick => brick.active == true) == -1) {
			console.log(this.bricks.findIndex(brick => brick.active == true));
			this.full_reset = true;
			this.win();
		}
	}

	hit_paddle(ball: Physics.GameObject.Physics, paddle: Physics.GameObject.Physics,) : void {
		var diff : number = 0;
	    //Used same math logic as the Breakout game at https://phaser.io/examples/v3/view/games/breakout/breakout
	    if (ball.x < paddle.x)
	    {
	        diff = paddle.x - ball.x;
	        ball.setVelocity(-10 * diff, -500);
	    }
	    else if (ball.x >= paddle.x)
	    {
	        diff = ball.x - paddle.x;
	        ball.setVelocity(10 * diff, -500);
	    }
	}

	lose() : void {
		let retry : Phaser.GameObject.Text;
		this.ball.setVelocity(0, 0);
		this.full_reset = true;
		this.input.disable(this.paddle);
		retry = this.physics.add.sprite(0, 400, "you_lose").setOrigin(0, 0).setInteractive();
		retry.on('pointerup', () => {
			this.input.enable(this.paddle);
			this.paddle.setPosition(296, 1200);
			this.ball.setPosition(this.paddle.x + 51, 1150);
			retry.destroy();
		});
	}

	reset_game() : void {
		this.lives_text.setText("Lives: " + (this.lives));
	    if (this.full_reset) {
	        this.lives = 3;
	        this.score = 0;
	        this.score_text.setText("Score: " + this.score);
	        this.lives_text.setText("Lives: " + this.lives);
	        this.full_reset = false;
	        for (var i = 0; i < this.bricks.length; i++) {
	        	let brick_colour : string = this.bricks[i].getData("original_colour");
	        	this.bricks[i].setTexture(brick_colour + "_brick");
				this.bricks[i].setData("colour", brick_colour);
	            this.bricks[i].enableBody(false, 0, 0, true, true);
	            if (this.bricks[i].getData("power_up") != "none") {
	            	let sprite : Physics.GameObject.Physics = this.bricks[i].getData("power");
	            	sprite.enableBody(false, 0, 0, true, true);
	            	this.bricks[i].setData("power", sprite);
	            }
	        }
	    }
	    this.ball.setVelocity(0, 0);
	    this.ball.enableBody(false, 0, 0, true, true);
	    this.paddle.enableBody(false, 0, 0, true, true)
	    this.ball.setPosition(this.paddle.x + 51, 1150);
	    this.ball.setData("on_paddle", true);
	}

	drop_power(type : string, power : Physics.GameObject.Physics) : void {
		let clone : Phaser.GameObject.Physics = this.physics.add.sprite(power.x, power.y, type).setOrigin(0,0).setName(type).setScale(0.65);
		power.disableBody(true, true);
		this.physics.add.collider(this.paddle, clone, this.apply_power_up, null, this);
		clone.body.setVelocityY(400);
	}

	apply_power_up(paddle : Physics.GameObject.Physics, power : Physics.GameObject.Physics) : void {
		power.disableBody(true, true);
		let ball : Phaser.GameObject.Physics;
		if (power.name == "multi_ball") {	
			for (var i = 0; i < 2; i++) {
				ball = this.physics.add.sprite(347.5 + (i * 100), 250, 'green_ball').setOrigin(0,0);
				ball.setCollideWorldBounds(true);
				ball.setBounce(1, 1);
				ball.setVelocity(55 * Math.pow(-1, i), 500);
				for (var j = 0; j < this.bricks.length; j++) {
					this.physics.add.collider(ball, this.bricks[j], this.hit_brick, null, this);
				}
				this.physics.add.collider(ball, this.paddle, this.hit_paddle, null, this);
				this.time.delayedCall(10000, function (ball) {
					ball.destroy();
				}, [ball], this);
			}
		}
		else if (power.name == "enlarge") {
			this.paddle.setScale(this.paddle.scaleX + 1, this.paddle.scaleY);
			this.time.delayedCall(10000, function () {
				this.paddle.setScale(this.paddle.scaleX - 1, this.paddle.scaleY);
			}, [], this);
		}
		else if (power.name == "invulnerable") {
			let bar : Phaser.GameObject.Physics = this.physics.add.sprite(0, 1230, "super_bar").setOrigin(0,0);
			this.physics.add.collider(this.ball, bar, null, null, this);
    		bar.setImmovable();
    		this.time.delayedCall(10000, function () {
				bar.destroy();
			}, [], this);
		}
	}

	win() : void {
		let sprite : Phaser.GameObject.Image;
		sprite = this.add.image(0, 400, "you_win").setOrigin(0, 0).setScale(0);
		let tween : Phaser.Types.Tweens;

		this.ball.disableBody(true, true);
		this.paddle.disableBody(true, true);

		tween = this.tweens.add({
	        targets: sprite,
	        scale: 1,
	        ease: 'linear',
	        duration: 500,
	        yoyo: false
    	});
	}
}

// var config : Phaser.Types.Core.GameConfig = {
// 	title: "Arkanoid Clone - Geet Chopra",
//     type: Phaser.AUTO,
//     width: 720,
//     height: 1280,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 0 }
//         }
//     },
//     scene: [Arkanoid]
// };

// var game = new Phaser.Game(config);
