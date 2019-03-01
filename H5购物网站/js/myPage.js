/*
* @Author: apple
* @Date:   2017-09-17 18:16:20
* @Last Modified by:   apple
* @Last Modified time: 2017-09-21 17:32:09
*/
$(function(){
	var k = $(window).height(); // 当前屏幕的高度
	var flag = false;  // 控制动画
    $('#fullpage').fullpage({ // fullpage  方法里面接受json对象形式

    	// 是否显示项目导航
    	navigation: true,
    	// navigationPosition: "left",
    	// loopBottom: true,
    	// 滚动速度，单位为毫秒
    	scrollingSpeed: 1200,

    	// 回调函数滚动到第二屏后的回调函数，接收 anchorLink 和 index 两个参数，anchorLink 是锚链接的名称，index 是序号，从1开始计算
    	afterLoad: function(anchorLink, index) {
    		if(index == 2 && flag == false) {
    			$(".search").show().animate({"right": 370}, 1500, function() {
    				// 方块走进来，沙发2个字显示
    				$(".search-wrods").animate({"opacity": 1},500, function() {
    					$(".search").hide();
    					// 图片 往右上角， 缩小
    					$(".search-02-1").show().animate({"height": 30, "right": 250, "bottom": 452}, 1000, function() {
    						 flag = true;  // 如果flag 等于true 说明 所有动画执行完毕
    					});
    					// 同时 沙发图片 变大
    					$(".goods-02").show().animate({"height": 218}, 1000)
    					// 同时 白色文字渐渐的显示出来
    					$(".words-02").animate({"opacity": 1},500)
    				});
    			});
    		}
    	},

    	// 刚开始滚动屏幕就触发的回调函数 onLeave
    	// 滚动前的回调函数，接收 index、nextIndex 和 direction 3个参数：index 是离开的“页面”的序号，从1开始计算；nextIndex 是滚动到的“页面”的序号，从1开始计算；direction 判断往上滚动还是往下滚动，值是 up 或 down。
    	onLeave: function(index, nextIndex, direction) {
    		if(index == 2 && nextIndex == 3 && flag== true) {
    			// 当第二屏幕往第三屏幕滚动的时候， 沙发显示并且往第三屏幕跑  白色盒子显示
    			// 沙发要往第三屏幕走，  走的距离 就是  当前哦屏幕的高度 - main 到底部的高度 - 沙发到main的距离    (当前屏幕的高度  - 250 )
    			$(".shirt-02").show().animate({"bottom": -(k - 250), "width": 207 , "left": 260}, 2000, function() {
    				$(".img-01-a").animate({"opacity": 1}, 500, function() {
    					$(".btn-01-a").animate({"opacity": 1}, 500);
    				})
    			});
    			$(".cover").show();
    		}
    		// 第3屏幕到第4屏幕过渡
    		if(index == 3 && nextIndex == 4 ) {
    			$(".shirt-02").hide();
    			 // 沙发的距离   当前屏幕的高度  - 250    + 第三屏幕的 50距离
    			$(".t1f").show().animate({"bottom" : -((k - 250) + 50), "left": 260 }, 2000, function() {
    				 $(this).hide();  // 动画完毕之后，自动隐藏
    				 $(".car-img").show();
    				 // 这购物车就开始往右走
    				 $(".car").animate({"left": "150%"}, 4000);
    			})

    		}
    	},
  
    });  
});