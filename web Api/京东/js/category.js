window.onload=function() {
    var ct_cLeft=document.querySelector(".ct_cLeft");
    var leftHeight=ct_cLeft.offsetHeight;
    var ulBox=ct_cLeft.querySelector("ul:first-of-type");
    var ulBoxHeight=ulBox.offsetHeight;

    let lis=ulBox.querySelectorAll('li');

    // 静止时最小最大值
    let maxTop=0;
    let minTop=leftHeight-ulBoxHeight;
    // 滑动时最大最小top值
    let maxBounceTop=maxTop+100;
    let minBounceTop=minTop-100;

    var startY=0;
    var moveY=0;
    var distanceY=0;
     /*记录当前元素滑动到的距离*/
     var currentY=0;

    ulBox.addEventListener('touchstart', function(e){
        startY = e.targetTouches[0].clientY;
    })

    ulBox.addEventListener('touchmove', function(e){
        moveY = e.targetTouches[0].clientY;
        distanceY = moveY - startY;

        if((currentY+distanceY < minBounceTop) || (currentY+distanceY > maxBounceTop)) {
            return;
        }
        ulBox.style.transition='none';
        ulBox.style.top=(distanceY+currentY)+'px';
    })
    ulBox.addEventListener('touchend',function(){
        if(currentY+distanceY<minTop) {
            currentY=minTop;
            ulBox.style.transition='top 0.5s';
            ulBox.style.top=minTop+'px';
        }
        else if(currentY+distanceY>maxTop) {
            currentY=maxTop;
            ulBox.style.transition='top 0.5s';
            ulBox.style.top=maxTop+'px';
        }else{
            currentY+=distanceY;
        }
    })
    // itcast.tap(ulBox, function(e){
    //     for(var i=0;i < lis.length; i ++) {
    //         lis[i].classList.remove('active');
    //         ulBox.style.transition='none'
    //     }
    //     let li = e.target.parentNode;
    //     li.classList.add('active');
    //     ulBox.style.transition='top 0.5s';
    //     if(li.offsetTop < Math.abs(minTop)) {
    //       ulBox.style.top= - li.offsetTop+ 'px';
    //       currentY = - li.offsetTop;
    //     } else {
    //       ulBox.style.top= minTop+ 'px';
    //       currentY = minTop;
    //     }
    // })
    /*为每一个li元素设置添加一个索引值*/
    for(var i=0;i<lis.length;i++){
        /*lis[i].setAttribute("index",i);*/
        lis[i].index=i;
    }
    /*绑定fastclick*/
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            /*参数可以是任意的dom元素，如果写document.body，说明会将document.body下面的所的元素都绑定fastclick*/
            FastClick.attach(document.body);
        }, false);
    }
    ulBox.addEventListener('click', function(e) {
        /*1.修改li元素的样式：将所有li元素的active样式清除，再为当前被点击的li元素添加active样式*/
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove("active");
        }
        /*为当前被单击的li元素添加样式*/
        var li=e.target.parentNode;
        var liHeight=li.offsetHeight;
        li.classList.add("active");

        /*2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值*/
        /*获取当前li元素的索引值*/
        var index=li.index;
        /*开启过渡*/
        ulBox.style.transition="top .5s";
        /*设置偏移*/
        if(-index*liHeight < minTop){
            /*只能偏移到minTop位置*/
            ulBox.style.top=minTop+"px";
            currentY=minTop;
        }
        else{
            ulBox.style.top=-index*liHeight+"px";
            currentY=-index*liHeight;
        }
    })
}