// 依赖:food.js、snake.js
// 游戏对象-用来管理游戏中的所有对象和开始游戏
(function(window, undefined) {
    var that; //记录游戏对象
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    // 开始游戏
    Game.prototype.start = function() {
        // 1. 把蛇和食物对象，渲染到地图上
        this.food.render(this.map);
        this.snake.render(this.map);

        // 测试move方法
        // this.snake.move();
        // this.snake.render(this.map);
        // this.snake.move();
        // this.snake.render(this.map);
        // this.snake.move();
        // this.snake.render(this.map);

        // 2. 开始游戏逻辑
        // 2.1 让蛇移动起来/当蛇遇到边界-游戏结束
        runSnake();
        // 2.2 通过键盘控制蛇的移动方向
        bindKey();
        // 2.3 当蛇遇到食物，做相应的处理

    };
    // 让蛇跑起来
    function runSnake() {
        var timerId = window.setInterval(function() {
            // 让蛇走一格
            this.snake.move(this.food, this.map);
            this.snake.render(this.map); //重新渲染

            // 当蛇遇到边界时，游戏结束
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            // 水平方向上的边界判断
            if (headX < 0 || headX >= maxX) {
                window.clearInterval(timerId);
                console.log('Game Over');
            }
            // 垂直方向上的边界判断
            if (headY < 0 || headY >= maxY) {
                window.clearInterval(timerId);
                console.log('Game Over');
            }

        }.bind(that), 150); //每间隔150毫秒蛇走一格
    }
    // 通过键盘控制移动的方向
    function bindKey() {
        document.addEventListener('keydown', function(e) {
            e = e || window.event;
            /**
             * top - 38
             * right - 39
             * bottom - 40
             * left - 37
             */
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }
        }.bind(that), false);
    }
    // 通过全局对象window，暴露Game构造函数
    window.Game = Game;
})(window, undefined);

// 测试
/* var map = Tools.$id('map');
var game = new Game(map);
game.start(); */