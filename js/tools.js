// 无依赖
// 工具对象
(function(window, undefined) {
    var Tools = {
        // 获取[min, max]之间的随机数
        getRandom: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        // 根据id，获取元素
        $id: function(id) {
            return document.getElementById(id);
        }
    };
    window.Tools = Tools;
})(window, undefined);
