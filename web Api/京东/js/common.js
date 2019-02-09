let itcast={
  tap:function(dom, callback) {
    // 判断是不是一个对象
    
    if(!dom || typeof dom != "object") {
      return;
    }

    // 单击操作特点
    //  1. 判断点击次数
    //  2. 判断点击时间
    //  3.判断点击抖动距离
    let startTime, startX, startY;
    dom.addEventListener('touchstart', function(e) {
      if(e.targetTouches.length > 1) {
        return;
      }
      // 记录开始时间和位置
      startTime=Date.now();
      startX=e.targetTouches[0].clientX;
      startY=e.targetTouches[0].clientY;
    })
    // touchend: 当手指松开时候触发，意味着当前元素已经没有手指对象了，无法获取 targetTouches 对象
    dom.addEventListener('touchend', function(e){
      if(e.changedTouches.length > 1) {
        return;
      }
      if(Date.now()-startTime>300){
        return;
      }
      let endX=e.changedTouches[0].clientX;
      let endY=e.changedTouches[0].clientY;
      if(Math.abs(endX-startX) < 6 && Math.abs(endY-startY) < 6) {
        console.log('移动端单击事件 -- tap 事件');
        callback && callback(e);
      }
    })
  }
}