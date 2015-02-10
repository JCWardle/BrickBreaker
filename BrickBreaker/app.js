var Brick = (function () {
    function Brick() {
        this.colour = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
        this.width = 50;
        this.height = 10;
        this.alive = true;
    }
    return Brick;
})();

var BrickBreaker = (function () {
    function BrickBreaker(canvas) {
        this._canvas = canvas;
        this._bricks = new Array(5);

        for (var i = 0; i < this._bricks.length; i++) {
            this._bricks[i] = new Array(15);
            for (var j = 0; j < this._bricks[i].length; j++) {
                this._bricks[i][j] = new Brick();
            }
        }
    }
    BrickBreaker.prototype.update = function () {
    };

    BrickBreaker.prototype.render = function () {
        var context = this._canvas.getContext("2d");

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
    };

    BrickBreaker.prototype.play = function () {
        this.update();
        this.render();
    };
    return BrickBreaker;
})();

window.onload = function () {
    var canvas = document.getElementsByTagName("canvas")[0];
    var game = new BrickBreaker(canvas);
    game.play();
};
//# sourceMappingURL=app.js.map
