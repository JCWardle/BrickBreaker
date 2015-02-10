var game: BrickBreaker;

class Brick {
    colour: string;
    width: number;
    height: number;
    alive: boolean;

    constructor() {
        this.colour = "rgb(" + Math.floor(Math.random() * 255)
            + "," + Math.floor(Math.random() * 255) + ","
            + Math.floor(Math.random() * 255) + ")";
        this.width = 50;
        this.height = 10;
        this.alive = true;
    }
}

class Player extends Brick {
    position: number;

    constructor() {
        super();
        this.colour = "rgb(0,0,0)";
        this.position = 250;
    }

    moveLeft() {
        this.position -= 10;

        if (this.position < this.width / 2) {
            this.position = this.width / 2;
        }
    }

    moveRight() {
        this.position += 10;
    }
}

class BrickBreaker {
    private _canvas : HTMLCanvasElement;
    private _bricks: Array<Array<Brick>>;
    private _player: Player;
    private _renderTimer: number;

    constructor(canvas : HTMLCanvasElement) {
        this._canvas = canvas;
        this._bricks = new Array<Array<Brick>>(5);
        this._player = new Player();

        for (var i = 0; i < this._bricks.length; i++) {
            this._bricks[i] = new Array<Brick>(15);
            for (var j = 0; j < this._bricks[i].length; j ++) {
                this._bricks[i][j] = new Brick();
            }
        }

        var FPS = 30;
        this._renderTimer = setInterval(function() {
            game.update();
            game.render();
        }, FPS);
    }

    private update() {

    }

    private render() {
        var context = this._canvas.getContext("2d");
        context.fillStyle = "rgb(255, 255,255)";
        context.clearRect(0, 0, 500, 500);
        
        //Render Bricks        
        for (var y = 0; y < this._bricks.length; y++) {
            for (var x = 0; x < this._bricks[y].length; x++) {
                var brick = this._bricks[y][x];

                if (brick.alive) {
                    context.fillStyle = brick.colour;
                    context.fillRect(x * brick.width, y * brick.height, brick.width, brick.height);
                }
            }
        }

        //Render Player
        context.fillStyle = this._player.colour;
        context.fillRect(this._player.position + this._player.width / 2, 300, this._player.width, this._player.height);
    }

    play() {
        this.update();
        this.render();
    }

    input(event) {
        //Left arrow;
        if (event.keyCode === 37) {
            game._player.moveLeft();
        }

        //Right arrow;
        if (event.keyCode === 39) {
            game._player.moveRight();
        }
    }
}

window.onload = () => {
    var canvas = document.getElementsByTagName("canvas")[0];
    game = new BrickBreaker(canvas);
    document.onkeydown = game.input;
};