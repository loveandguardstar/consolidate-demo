window.onload=function(){
  searchEffect();

  timeBack();

  bannerEffect();
}
  
/*头部的js效果*/
function searchEffect(){
  /*头部搜索块的js效果*/
  /*1.获取当前banner的高度*/
  var banner =document.querySelector(".jd_banner");
  var bannerHeight=banner.offsetHeight;
  /*获取header搜索块*/
  var search=document.querySelector(".jd_search");
  /*2.获取当前屏幕滚动时，banner滚动出屏幕的距离*/
  window.onscroll=function(){
      var offsetTop=document.body.scrollTop;
      /*3.计算比例值，获取透明度，设置背景颜色的样式*/
      var opacity=0;
      /*判断，如果当banner还没有完全 滚出屏幕，那么才有必要计算透明度和设置透明度*/
      if(offsetTop < bannerHeight){
          opacity=offsetTop/bannerHeight;
          /*设置样式*/
          search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
      }
  }
}

/*倒计时效果*/

function timeBack(){
  /*1.获取用于展示时间的span*/
  var spans=document.querySelector(".jd_sk_time").querySelectorAll("span");
  /*2.设置初始的倒计时时间,以秒做为单位*/
  var totalTime=3700; //1*60*60   3700%3600=100 /60
  /*3.开启定时器*/
  var timerId=setInterval(function(){
      totalTime--;
      /*判断倒计时时间是否已经完成*/
      if(totalTime < 0){
          /*清除时钟*/
          clearInterval(timerId);
          return;
      }
      /*得到剩余时间中的  时  分  秒*/
      /*获取时*/
      var hour=Math.floor(totalTime/3600);
  
      /*获取分*/
      var minute=Math.floor(totalTime%3600/60);
  
      /*获取秒*/
      var second=Math.floor(totalTime%60);
      /*赋值，将时间填充到span中  12*/
      spans[0].innerHTML=Math.floor(hour/10);
      spans[1].innerHTML=Math.floor(hour%10);

      spans[3].innerHTML=Math.floor(minute/10);
      spans[4].innerHTML=Math.floor(minute%10);

      spans[6].innerHTML=Math.floor(second/10);
      spans[7].innerHTML=Math.floor(second%10);
  },1000);
}
/*轮播图*/
function  bannerEffect(){
/*1.设置修改轮播图的页面结构
* a.在开始位置添加原始的最后一张图片
* b.在结束位置添加原始的第一张图片*/
/*1.1.获取轮播图结构*/
var banner=document.querySelector(".jd_banner");
/*1.2.获取图片容器*/
var imgBox=banner.querySelector("ul:first-of-type");
/*1.3.获取原始的第一张图片*/
var first=imgBox.querySelector("li:first-of-type");
/*1.4.获取原始的最后一张图片*/
var last=imgBox.querySelector("li:last-of-type");
/*1.5.在首尾插入两张图片   cloneNode:复制一个dom元素*/
imgBox.appendChild(first.cloneNode(true));
/*insertBefore(需要插入的dom元素，位置)*/
imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);

/*2.设置对应的样式*/
/*2.1获取所有li元素*/
var lis=imgBox.querySelectorAll("li");
/*2.2 获取li元素的数量*/
var count=lis.length;
/*2.3.获取banner的宽度*/
var bannerWidth=banner.offsetWidth;
/*2.4 设置图片盒子的宽度*/
imgBox.style.width=count*bannerWidth+"px";
/*2.5 设置每一个li(图片)元素的宽度*/
for(var i=0;i<lis.length;i++){
    lis[i].style.width=bannerWidth+"px";
}

/*定义图片索引:图片已经有一个宽度的默认偏移*/
var index=1;

/*3.设置默认的偏移*/
imgBox.style.left=-bannerWidth+"px";

/*4.当屏幕变化的时候，重新计算宽度*/
window.onresize=function(){
    /*4.1.获取banner的宽度,覆盖全局的宽度值*/
    bannerWidth=banner.offsetWidth;
    /*4.2 设置图片盒子的宽度*/
    imgBox.style.width=count*bannerWidth+"px";
    /*4.3设置每一个li(图片)元素的宽度*/
    for(var i=0;i<lis.length;i++){
        lis[i].style.width=bannerWidth+"px";
    }
    /*4.4重新设置定位值*/
    imgBox.style.left=-index*bannerWidth+"px";
}

function addTag(index) {
  //  实现 li 标记操作
  let indicators = banner.querySelector('ul:last-of-type').querySelectorAll('li');
  // 先清除所有 li 元素位置的标记
  for(var i = 0; i < indicators.length; i ++) {
    indicators[i].classList.remove('active');
  }
  // 重新赋值 li 元素标记
  // console.log(index + '|' + (index-1));
  indicators[index-1].classList.add('active');
}

var timerId;
/*5.实现自动轮播*/
var startTime=function(){
    timerId=setInterval(function(){
        /*5.1 变换索引*/
        index++;
        /*5.2.添加过渡效果*/
        imgBox.style.transition="left 0.5s ease-in-out";
        /*5.3 设置偏移*/
        imgBox.style.left=(-index*bannerWidth)+"px";
        /*5.4 判断是否到最后一张，如果是则*/
        setTimeout(function(){
          console.log(count);
            if(index==count-1){
                console.log(index);
                index=1;
                /*如果一个元素的某个属性之前添加过过渡效果，那么过渡属性会一直存在，如果不想要，则需要清除过渡效果*/
                /*关闭过渡效果*/
                imgBox.style.transition="none";
                /*偏移到指定的位置*/
                imgBox.style.left=(-index*bannerWidth)+"px";
                addTag(index);
            }
        },500);
    },2000);
}
startTime();

let startX, moveX, distanceX;
let isEnd = true;
// 手指点击开始
imgBox.addEventListener('touchstart', function(e) {
  // 清除定时器
  clearInterval(timerId);
  // 记录手指起始地点
  // console.log(e.targetTouches[0].clientX)
  startX = e.targetTouches[0].clientX;
})
// 手指滑动过程
imgBox.addEventListener('touchmove', function(e){
  if(isEnd) {
    // 计算滑动滑动距离
    moveX = e.targetTouches[0].clientX;
    // 算出位移
    distanceX = moveX - startX;
    /*为了保证效果正常，将之前可能添加的过渡样式清除*/
    imgBox.style.transition="none";
    // 实现元素的偏移量
    // console.log(-index * bannerWidth + distanceX);
    imgBox.style.left = (-index * bannerWidth + distanceX) + 'px'
  }
})

// 手指滑动结束过程
imgBox.addEventListener('touchend', function(e){
  //松开手指，标记滑动正在进行
  isEnd = false;
  console.log(distanceX);
  // 计算是否滑到位
  if(Math.abs(distanceX) > 100) {
    if (distanceX > 0) {
      index --; // 上一张
    } else {
      index ++; // 下一张
    }
    imgBox.style.transition = 'left 0.5s ease-in-out';
    imgBox.style.left = - index*bannerWidth + 'px';
  } else if (Math.abs(distanceX) > 0) {
    imgBox.style.transition="left 0.5s ease-in-out";
    imgBox.style.left=-index*bannerWidth+"px";
  }
  startX = 0;
  moveX = 0;
  distanceX = 0;
})
/*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件*/
imgBox.addEventListener('webkitTransitionEnd', function() {
  if(index == count - 1) {
    index = 1;
    console.log('first');
    // 清除过渡
    imgBox.style.transition = 'none';
    imgBox.style.left = -index * bannerWidth + 'px';
  }
  else if(index == 0) {
    index = count -2;
    console.log('second');
    imgBox.style.transition = 'none';
    imgBox.style.left = -index * bannerWidth + 'px';
  }
  // 运动结束添加标记
  addTag(index);
  setTimeout(() => {
     //  重新让 touchmove 生效
    isEnd = true;
    //  重新开启定时器
    clearInterval(timerId);
    startTime();
  }, 500);
})
}