var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var game;

var Brick = (function () {
    function Brick() {
        this.colour = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
        this.width = 50;
        this.height = 10;
        this.alive = true;
    }
    return Brick;
})();

var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this.colour = "rgb(0,0,0)";
        this.position = 250;
    }
    Player.prototype.moveLeft = function () {
        this.position -= 10;

        if (this.position < this.width / 2) {
            this.position = this.width / 2;
        }
    };

    Player.prototype.moveRight = function () {
        this.position += 10;
    };
    return Player;
})(Brick);

var BrickBreaker = (function () {
    function BrickBreaker(canvas) {
        this._canvas = canvas;
        this._bricks = new Array(5);
        this._player = new Player();

        for (var i = 0; i < this._bricks.length; i++) {
            this._bricks[i] = new Array(15);
            for (var j = 0; j < this._bricks[i].length; j++) {
                this._bricks[i][j] = new Brick();
            }
        }

        var FPS = 30;
        this._renderTimer = setInterval(function () {
            game.update();
            game.render();
        }, FPS);
    }
    BrickBreaker.prototype.update = function () {
    };

    BrickBreaker.prototype.render = function () {
        var context = this._canvas.getContext("2d");
        context.fillStyle = "rgb(255, 255,255)";
        context.clearRect(0, 0, 500, 500);

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
    };

    BrickBreaker.prototype.play = function () {
        this.update();
        this.render();
    };

    BrickBreaker.prototype.input = function (event) {
        //Left arrow;
        if (event.keyCode === 37) {
            game._player.moveLeft();
        }

        //Right arrow;
        if (event.keyCode === 39) {
            game._player.moveRight();
        }
    };
    return BrickBreaker;
})();

window.onload = function () {
    var canvas = document.getElementsByTagName("canvas")[0];
    game = new BrickBreaker(canvas);
    document.onkeydown = game.input;
};
//# sourceMappingURL=app.js.map
