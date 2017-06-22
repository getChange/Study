var $imgs = $('.container .img-holder');
var l = $imgs.length;
var radius = 400;
var canvas=document.querySelectorAll("canvas")

TweenMax.set($('.container'), {
				css: {
					transformStyle: 'preserve-3d',
					perspective: 800,
                    transfrom:"rotateX(50deg)",
					perspectiveOrigin: '50% 50%'
				}
			});  

var posArray = [];
var totalImgToView = 5;
var imgMinus = 0.6301;
var angle = 0;
$imgs.each(function(i, item){
     
    angle = i * 0.63; 
  //console.log('angle ',angle);   
    var zPos = - Math.abs(angle * (100 ));  
     
   var xPos = Math.sin (angle) * radius;    
  posArray.push({x:xPos,z:zPos,angle:angle});
  var imgAlpha = (Math.ceil(0.5 * totalImgToView) * imgMinus) * 100;
    //imgAlpha = Math.abs(zPos) < imgAlpha ? 1 : 0;
  TweenMax.to(item,1, {x:xPos,z:zPos,ease:Expo.easeOut,autoAlpha:0}); 
});   
        
 
var curImgViewIndex = 0;
var targetImgViewIndex = 0;
var curIntervalId = 0; 
var scrollbarDragging = false;

function rotate1(){
  setTimeout(function(){
    $(".guaGuabox").css("display","block")

  },2000)
  var minusVal = targetImgViewIndex - curImgViewIndex > 0 ? -0.6301 : 0.6301;

  var easeObj;
  var tweenTime;
  if(Math.abs(targetImgViewIndex - curImgViewIndex) === 1){
    easeObj = Quint.easeOut;
    tweenTime = 1;
  }else {
    easeObj = Linear.easeNone;
    tweenTime = 0.15;
  }

  $imgs.each(function(i, item){
    var pos = posArray[i];
    pos.angle = pos.angle + minusVal ;  //(0.6301*0.06);
    var angleDistance = pos.angle * 100;
    var zPos = - Math.abs(angleDistance);
    var xPos =  Math.sin (pos.angle) * radius;
    var imgAlpha = (Math.ceil(0.5 * totalImgToView) * imgMinus) * 100;

    imgAlpha = Math.abs(zPos) < imgAlpha ? 1 : 0;
    var rotDeg = Math.round(angleDistance) >= 0 ? -30 : 30;
    rotDeg = Math.round(angleDistance) === 0 ? 0 : rotDeg;


    TweenMax.to(item, tweenTime,  {x:xPos,z:zPos,ease:easeObj,autoAlpha:imgAlpha,rotationY:rotDeg});

  });
  minusVal > 0 ? curImgViewIndex-- : curImgViewIndex++;

  if(curImgViewIndex === targetImgViewIndex){
    clearInterval(curIntervalId);
  }


}

function rotate(){

  setTimeout(function(){
    $(".guaGuabox").css("display","block")

  },800)

  var minusVal = targetImgViewIndex - curImgViewIndex > 0 ? -0.6301 : 0.6301;

  var easeObj;
  var tweenTime;
  if(Math.abs(targetImgViewIndex - curImgViewIndex) === 1){
    easeObj = Quint.easeOut;
    tweenTime = 1;
  }else {
    easeObj = Linear.easeNone;
    tweenTime = 0.15;
  }

  $imgs.each(function(i, item){
    var pos = posArray[i];
    pos.angle = pos.angle + minusVal ;  //(0.6301*0.06);
    var angleDistance = pos.angle * 100;
    var zPos = - Math.abs(angleDistance);
    var xPos =  Math.sin (pos.angle) * radius;
    var imgAlpha = (Math.ceil(0.5 * totalImgToView) * imgMinus) * 100;

    imgAlpha = Math.abs(zPos) < imgAlpha ? 1 : 0;
    var rotDeg = Math.round(angleDistance) >= 0 ? -30 : 30;
    rotDeg = Math.round(angleDistance) === 0 ? 0 : rotDeg;


    TweenMax.to(item, tweenTime,  {x:xPos,z:zPos,ease:easeObj,autoAlpha:imgAlpha,rotationY:rotDeg});

  });
  minusVal > 0 ? curImgViewIndex-- : curImgViewIndex++;

  if(curImgViewIndex === targetImgViewIndex){
    clearInterval(curIntervalId);
  }


}

function showImgAt1(index){

  $(".guaGuabox").css("display","none")
  targetImgViewIndex = index;
  if(targetImgViewIndex === curImgViewIndex){
    return;
  }
  clearInterval(curIntervalId);
  curIntervalId = setInterval(function(){
    rotate1();
  },300);

  //update scrollbar

  //make(canvas[index],fl[index]);




}

function showImgAt(index){

  targetImgViewIndex = index;
  if(targetImgViewIndex === curImgViewIndex){
    return;
  }
  clearInterval(curIntervalId);
  curIntervalId = setInterval(function(){
    rotate();
  },500);
  
  //update scrollbar 
  if(!scrollbarDragging){
    var l = $imgs.length - 1;
    if(targetImgViewIndex > l){
      return;
    }
    var curScrollX = Math.abs(Math.round(targetImgViewIndex * (702 / l ) ) );

    var tweenTime = Math.abs((targetImgViewIndex - curImgViewIndex) * 0.2);
    TweenMax.to($('.scroller'),tweenTime,{x:curScrollX,ease:Sine.easeOut});
  }
  //make(canvas[index],fl[index]);
setTimeout(function(){
  $(".guaGuabox").css("display","none")
},100)



}

 
//CONTROLLER UPDATE

//just to do start up animation

showImgAt1(8);

//œ»ø¥“ª±È
setTimeout(function(){  showImgAt1(5)},800)




//----------------------- Dragging Utility ----------------------
Draggable.create('.scroller',{type:'x',bounds:{left:0,top:0,width:802,height:0},onDrag:function(){
     var curImgIndex = Math.abs(Math.round(this.x / (802/l)));
     
     targetImgViewIndex = curImgIndex;
  if(targetImgViewIndex === curImgViewIndex){
    return;
  }
  rotate();
  
},onDragStart:function(){
  scrollbarDragging = true;
},onDragEnd:function(e){
  scrollbarDragging = false;
}}); 




