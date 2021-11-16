// 依赖：tools.js
// 食物对象：随机生成食物
// 自调用函数-开启一个新的作用域，避免命名冲突-封装
(function(window, undefined) {
    /**
     * 在自调用函数中，
     * 定义的变量或函数只能在其内使用
     */
    var position = 'absolute'; //定位方式
    var elements = []; //记录上一次创建的食物，为删除做准备
    function Food(options) {
        // 传递参数处理
        options = options || {}; //若是未传递options参数，则默认为options
        ElementNode.call(this, options);//继承父类型中的属性
        this.x = options.x || 0; //食物水平位置
        this.y = options.y || 0; //食物垂直位置
        this.color = options.color || '#080'; //食物颜色
    }
    Food.prototype = new ElementNode();
    Food.prototype.constructor = Food;
    // 随机生成食物
    Food.prototype.render = function(map) {
        if (map === undefined) {
            throw new Error('未传递map参数'); //抛出异常，会被系统捕获
        }
        // 删除之前创建的食物
        remove();
        var div = document.createElement('div'); //食物
        map.appendChild(div); //将食物盛放到容器

        // 水平方向能盛放多少食物
        this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
        // 垂直方向能盛放多少食物
        this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;

        // 给食物添加配料——
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.backgroundColor = this.color;
        div.style.position = position;
        elements.push(div);
    };
    // 删除之前创建的食物
    function remove() {
        while (elements.length) {
            var i = elements.length - 1;
            // 将元素从DOM树中删除，元素依旧在内存中，直到垃圾回收
            elements[i].parentNode.removeChild(elements[i]);
            // 将元素从数组中删除，改变原数组
            elements.splice(i, 1);
        }
    }
    //通过window暴露Food构造函数
    window.Food = Food;
})(window, undefined);

// 测试：
/* var map = Tools.$id('map');
var food = new Food(); //此时调用的是window.Food,window可以省略
food.render(map); //随机产生食物
food.render(map); //随机产生食物
food.render(map); //随机产生食物
food.render(map); //随机产生食物
console.dir(food.elements); */
