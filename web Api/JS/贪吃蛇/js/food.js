
//  —— 自调用函数，开辟一个新的私有空间，避免命名冲突，
(function(){
  let position = 'absolute';
  // 记录上一次生成的食物， 为删除做准备；
  let elements = [];
  
  function Food(parent, options) {
    options = options || {};
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.color = options.color || 'green';
  }
  
  // 渲染
  Food.prototype.render = function(map) {
    // 删除食物
    remove();
    // 动态创建 div，页面上显示的食物
    let div = document.createElement('div');
    map.appendChild(div);
  
    elements.push(div)
  
    // 根据 tools 工具设置位置
    this.x = Tools.getRandom(0, map.offsetWidth/this.width - 1) * this.width;
    this.y = Tools.getRandom(0, map.offsetHeight/this.height - 1) * this.height;
  
    //  给 div 设置样式
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    div.style.position = position;
    div.style.backgroundColor = this.color;
  
  }
  function remove() {
    for(let i = elements.length - 1; i >= 0; i --) {
      // 删除 div
      elements[i].parentNode.removeChild(elements[i]);
      // 删除数组中的元素
      elements.splice(i, 1)
    }
  }
  window.Food = Food;
})()
