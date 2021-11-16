(function(window, undefined) {
    function ElementNode(options){
        // 传递参数处理
        options = options || {}; //若是未传递options参数，则默认为options
        this.width = options.width || 20; //食物宽度
        this.height = options.height || 20; //食物高度
    }
    window.ElementNode = ElementNode;
})(window, undefined);
