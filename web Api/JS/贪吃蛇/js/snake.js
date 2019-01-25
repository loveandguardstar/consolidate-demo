//  创建自调用函数 —— 封装作用域，开辟一个私有空间，避免命名冲突

(function() {
  let position = 'absolute';
  // 删除蛇
  let elements = [];
  //  蛇的类
  function Snake(options) {
    options = options || {};
    this.width = options.width || 20;
    this.height = options.height || 20;
    // 蛇的每一部分, 第一部分是蛇头
    this.body = [
      {x: 3, y: 2, color: 'red'},
      {x: 2, y: 2, color: 'blue'},
      {x: 1, y: 2, color: 'blue'}
    ];
    this.direction = options.direction || 'right';
  }

  Snake.prototype.render = function(map) {
    // 删除之前创建的蛇
    remove();
    // 把每个蛇渲染到地图上
    for(let i = 0, len = this.body.length; i < len; i ++) {
      let obj = this.body[i];
      let div = document.createElement('div');
      map.appendChild(div);

      // 将蛇添加到删除里
      elements.push(div);

      div.style.left = obj.x * this.width + 'px';
      div.style.top = obj.y * this.height + 'px';
      div.style.position = position;
      div.style.backgroundColor = obj.color;
      div.style.width = this.width + 'px';
      div.style.height = this.height + 'px';
    }
  }

  Snake.prototype.move = function(map, food) {
    for (var i = this.body.length - 1; i > 0; i --) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    var head = this.body[0];
    switch(this.direction) {
      case 'right':
        head.x +=1;
        break;
      case 'left':
        head.x -=1;
        break;
      case 'top':
        head.y -=1;
        break;
      case 'bottom':
        head.y +=1;
        break;
    }
    // 2.4 当蛇遇到食物，做相应的处理
    let headX = head.x * this.width;
    let headY = head.y * this.height;
    if (headX === food.x && headY === food.y) {
      let last = this.body[this.body.length -1];
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      })
      food.render(map)
    }
  }

  function remove() {
    for(let i = elements.length - 1; i >= 0; i --) {
      //  删除 div
      // console.dir(elements[i])
      elements[i].parentNode.removeChild(elements[i]);
      // 删除数组
      elements.splice(i, 1);
    }
  }
  window.Snake = Snake;
})()