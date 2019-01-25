// 自调用函数、封装局部作用域， 开辟私有空间，避免命名冲突

(function(){
  let that = this;
  function Game(map) {
    this.snake = new Snake();
    this.food = new Food();
    this.map = map;
    that = this;
  }

  Game.prototype.start= function() {
    // 1、把食物和对象渲染到地图上
    this.food.render(this.map);
    this.snake.render(this.map);
    // 2、开始游戏的逻辑
    // 2.1 让蛇运动起来
    runSnake();
    // 2.2 当蛇遇到边界游戏结束
    
    // 2.3 通过键盘控制蛇移动的方向
    derSnake();
    // 2.4 当蛇遇到食物，做相应的处理
  }
  // 2.1 让蛇运动起来 
  function runSnake() {
    var timerId = setInterval(function() {
      that.snake.move(that.map, that.food);
      that.snake.render(that.map);
      // 2.2 当蛇遇到边界游戏结束
      let maxX = that.map.offsetWidth / that.snake.width;
      let maxY = that.map.offsetHeight / that.snake.height;
      let headX = that.snake.body[0].x;
      let headY = that.snake.body[0].y;
      // console.log(maxX + '|' + maxY + '|' + headX + '|' + headY);
      if(headX < 0 || headX >= maxX) {
        clearInterval(timerId);
        alert('game over');
      }
      if(headY < 0 || headY >= maxY) {
        alert('game over');
        clearInterval(timerId);
      }
    }, 150)
  }
  // 2.3 通过键盘控制蛇移动的方向
  function derSnake() {
    document.addEventListener('keydown', function(e){
      switch(e.keyCode) {
        case 37:
          that.snake.direction = 'left';
          break;
        case 38:
          that.snake.direction = 'top';
          break;
        case 39:
          that.snake.direction = 'right';
          break;
        case 40:
          that.snake.direction = 'bottom';
          break;
      }
    }, false)
  }
  window.Game = Game;
})()