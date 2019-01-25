

//  构造盒子
function NewBox(parent, option) {
  // console.dir(parent)
  option = option || {};
  this.width = option.width || 15;
  this.height = option.height || 15;
  this.backgroundColor = option.backgroundColor || 'red';
  this.x = option.x || 0;
  this.y = option.y || 0;

  this.div = document.createElement('div');
  parent.appendChild(this.div);
  this.parent = parent;

  this.init();
  this.random();
}

NewBox.prototype.init = function() {
  let div = this.div;
  div.style.backgroundColor = this.backgroundColor;
  div.style.width = this.width + 'px';
  div.style.height = this.height + 'px';
  div.style.left = this.x + 'px';
  div.style.top = this.y + 'px';

  div.style.position = 'absolute';
}

//  随机生成方块的位置
NewBox.prototype.random = function() {
  let x = Tools.getRandom(0, this.parent.offsetWidth / this.width -1) * this.width;
  let y = Tools.getRandom(0, this.parent.offsetHeight / this.height -1) * this.height;

  this.div.style.left = x + 'px';
  this.div.style.top = y + 'px';
}