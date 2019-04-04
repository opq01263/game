var healValue = 3;
var scoreValue = 0;
var arySpeed = ["veryveryslow", "veryslow", "slow", "normal", "fast", "veryfast", "veryveryfast"];
var heal = document.querySelector('.heal');
var score = document.querySelector('.score');
var canvas = document.querySelector('.canvas');
var body = document.querySelector('body');
//set用法"function()"
var time = window.setInterval(update,3000);
//產生、繪製物件
function update(){
    //金幣物件
    var randomGold = Math.floor((Math.random() * 5) +1);//隨機產生1~5之間的數
    for(var i=0;i<randomGold;i++){
        var randomSpeed = Math.floor((Math.random() * 7));//隨機產生0~4之間的數
        var randomTop = Math.floor((Math.random() * 90) +5);//隨機產生5~95之間的數
        var div = document.createElement('div');
        div.className = "gold"+" "+arySpeed[randomSpeed];
        div.setAttribute('style',"top: "+randomTop+"%");
        div.addEventListener('mouseover',getGold,false);
        div.addEventListener("animationend",function(){
            removeElement(this);
        },false);
        canvas.appendChild(div);
    }
    //障礙物件
    var randomObj = Math.floor((Math.random() * 10) + 5);//隨機產生5~14之間的數
    for(var i=0;i<randomObj;i++){
        var randomSpeed = Math.floor((Math.random() * 7));//隨機產生0~4之間的數
        var randomTop = Math.floor((Math.random() * 90) +5);//隨機產生5~95之間的數
        var div = document.createElement('div');
        div.className = "obj"+" "+arySpeed[randomSpeed];
        div.setAttribute('style',"top: "+randomTop+"%");
        div.addEventListener('mouseover',crash,false);
        div.addEventListener("animationend",function(){
            removeElement(this);
        },false);
        canvas.appendChild(div);
    }
}
//碰到障礙
function crash(){
    this.removeEventListener('mouseover',crash,false);
    this.classList.add("green");
    //檢查生命值
    if(healValue==0){
        window.clearInterval(time);
        //清除畫面、初始化
        healValue = 3;
        scoreValue = 0;
        setTimeout(function(){
            if(confirm("GG 再玩一次?")){
                canvas.innerHTML = "";
                heal.innerHTML = '<i class="icon-heart">菱</i><i class="icon-heart">菱</i><i class="icon-heart">菱</i>';
                score.innerHTML = "Score : "+scoreValue;
                update();
                time = window.setInterval(update,3000);
            }else{
                canvas.innerHTML = "";
            }
        },100);
    }else{
        healValue = healValue-1;
        var str = "";
        for(i=0;i<healValue;i++){
            str += '<i class="icon-heart">菱</i>' ;
        }
        heal.innerHTML = str;
    }
}
//碰到金幣
function getGold(){
    scoreValue = scoreValue + 1;
    score.innerHTML = "Score : "+scoreValue;
    removeElement(this);
}
//移除自身物件
function removeElement(_element){
    var _parentElement = _element.parentNode;
    if(_parentElement){
    _parentElement.removeChild(_element);
    }
}
 
//初始化
heal.innerHTML = '<i class="icon-heart">菱</i><i class="icon-heart">菱</i><i class="icon-heart">菱</i>';
score.innerHTML = "Score : "+scoreValue;
update();
