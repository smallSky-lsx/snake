// 依赖:
// 蛇对象:

(function(window, undefined) {
    var position = 'absolute'; //蛇节定位方式
    var elements = []; //记录之前所创建的蛇节
    function Snake(options) {
        // 参数处理
        options = options || {}; //若是未传递options参数，则默认为空对象
        // 蛇节的大小
        ElementNode.call(this, options);//继承父类型中的属性
        // 蛇移动的方向,right/left/top/bottom
        this.direction = options.direction || 'right';
        // 蛇的身体(蛇节)，第一个元素是蛇头
        this.body = [{
            x: 3,
            y: 2,
            color: '#f00'
        }, {
            x: 2,
            y: 2,
            color: '#00f'
        }, {
            x: 1,
            y: 2,
            color: '#00f'
        }];
    }
    Snake.prototype = new ElementNode();//Snake原型对象指向ElementNode对象，重用其指向的原型对象中的方法
    Snake.prototype.constructor = Snake;
    Snake.prototype.render = function(map) {
        // 删除之前创建的蛇
        remove();
        // 把每一个蛇节渲染到地图上
        for (var i = 0, len = this.body.length; i < len; i++) {
            // 蛇节
            var snakeOne = this.body[i];
            var div = document.createElement('div');
            map.appendChild(div);

            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.position = position;
            div.style.left = snakeOne.x * this.width + 'px';
            div.style.top = snakeOne.y * this.height + 'px';
            div.style.backgroundColor = snakeOne.color;
            elements.push(div);
        }
    };
    // 控制蛇移动的方法：蛇头控制方向，蛇身往前一步
    Snake.prototype.move = function(food, map) {
        // 控制蛇的身体移动，当前蛇节 到 上一个蛇节的位置
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 控制蛇头移动一节0
        var head = this.body[0];
        switch (this.direction) {
            case 'top':
                head.y -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
        }
        // 判断蛇头是否和食物的坐标重合
        // 蛇头的坐标
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if (headX === food.x && headY === food.y) {
            // 让蛇增加一节
            /* var len = this.body.length; //蛇现有节数
            this.body[len] = {
                x: this.body[len - 1].x,
                y: this.body[len - 1].y,
                color: '#00f'
            }; */
            var lastSnake = this.body[this.body.length - 1];
            var obj = {};
            // 将lastSnake中的成员拷贝到obj
            extend(obj, lastSnake);
            this.body.push(obj);
            // 随机在地图上重新生成食物
            food.render(map);
        }

    };
    // 删除之前记录的所有蛇节
    function remove() {
        while (elements.length) {
            var i = elements.length - 1;
            //删除DOM树上的蛇节
            elements[i].parentNode.removeChild(elements[i]);
            // 删除数组中的元素
            elements.splice(i, 1);
        }
    }
    // 拷贝蛇节
    function extend(child, parent) {
        for (var key in parent) {
            if (child[key] === undefined) { //将child对象中未定义的成员拷贝
                child[key] = parent[key];
            }
        }
    }
    // 暴露构造函数给外部
    window.Snake = Snake;
})(window, undefined);

// 测试代码
/* var map = Tools.$id('map');
var snake = new Snake();
snake.render(map); */
