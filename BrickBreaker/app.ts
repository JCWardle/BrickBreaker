var game: BrickBreaker;

class Ball {
    private velocity: number;
    private radius: number;
    private speedX: number;
    private speedY: number;
    private x: number;
    private y: number;

    constructor() {
        this.radius = 5;
        this.x = 400;
        this.y = 300;
        this.speedX = 5;
        this.speedY = 5;
    }

    update(boundx, boundy) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > boundx || this.x < 0)
            this.speedX = -this.speedX;
        if (this.y > boundy || this.y < 0)
            this.speedY = -this.speedY;
    }

    render(context : CanvasRenderingContext2D) {
        context.fillStyle = "rgb(255,0,0)";
        context.beginPath();
        context.arc(this.x - this.radius, this.y - this.radius, this.radius, 0, 2 * Math.PI, false);
        context.stroke();
    }
}

class Brick {
    colour: string;
    width: number;
    height: number;
    alive: boolean;
    x: number;
    y: number;

    constructor(x ,y) {
        this.colour = "rgb(" + Math.floor(Math.random() * 255)
            + "," + Math.floor(Math.random() * 255) + ","
            + Math.floor(Math.random() * 255) + ")";
        this.width = 50;
        this.height = 10;
        this.alive = true;
        this.x = x * this.width;
        this.y = y * this.height + 50;
    }

    render(context: CanvasRenderingContext2D, x, y) {
        if (this.alive) {
            context.fillStyle = this.colour;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

class Player extends Brick {
    maxPosition: number;

    constructor(maxPosition) {
        super(0, 0);
        this.x = (maxPosition / 2) - 25;
        this.y = 380;
        this.colour = "rgb(0,0,0)";
        this.maxPosition = maxPosition;
    }

    moveLeft() {
        this.x -= 10;

        if (this.x < this.width / 2) {
            this.x = this.width / 2;
        }
    }

    moveRight() {
        this.x += 10;

        if (this.x > this.maxPosition - this.width / 2) {
            this.x = this.maxPosition - this.width / 2;
        }
    }

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.colour;
        context.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
    }
}

class BrickBreaker {
    private canvas : HTMLCanvasElement;
    private bricks: Array<Array<Brick>>;
    private player: Player;
    private ball: Ball;
    private renderTimer: number;

    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
        this.bricks = new Array<Array<Brick>>(5);
        this.player = new Player(canvas.width);
        this.ball = new Ball();

        for (var i = 0; i < this.bricks.length; i++) {
            this.bricks[i] = new Array<Brick>(16);
            for (var j = 0; j < this.bricks[i].length; j ++) {
                this.bricks[i][j] = new Brick(j, i);
            }
        }

        var fps = 30;
        this.renderTimer = setInterval(function() {
            game.update();
            game.render();
        }, fps);
    }

    private update() {
        this.ball.update(this.canvas.width, this.canvas.height);
    }

    private render() {
        var context = this.canvas.getContext("2d");
        context.fillStyle = "rgb(255, 255,255)";
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.render(context);
        this.ball.render(context);
             
        for (var y = 0; y < this.bricks.length; y++) {
            for (var x = 0; x < this.bricks[y].length; x++) {
                var brick = this.bricks[y][x];
                brick.render(context, x, y);
            }
        }
    }

    play() {
        this.update();
        this.render();
    }

    input(event) {
        //Left arrow;
        if (event.keyCode === 37) {
            game.player.moveLeft();
        }

        //Right arrow;
        if (event.keyCode === 39) {
            game.player.moveRight();
        }
    }
}

window.onload = () => {
    var canvas = document.getElementsByTagName("canvas")[0];
    game = new BrickBreaker(canvas);
    document.onkeydown = game.input;
};