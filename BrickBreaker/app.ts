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

class BrickBreaker {
    private _canvas : HTMLCanvasElement;
    private _bricks : Array<Array<Brick>>;

    constructor(canvas : HTMLCanvasElement) {
        this._canvas = canvas;
        this._bricks = new Array<Array<Brick>>(5);

        for (var i = 0; i < this._bricks.length; i++) {
            this._bricks[i] = new Array<Brick>(15);
            for (var j = 0; j < this._bricks[i].length; j ++) {
                this._bricks[i][j] = new Brick();
            }
        }
    }

    private update() {

    }

    private render() {
        var context = this._canvas.getContext("2d");
        
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
    }

    play() {
        this.update();
        this.render();
    }
}

window.onload = () => {
    var canvas = document.getElementsByTagName("canvas")[0];
    var game = new BrickBreaker(canvas);
    game.play();
};