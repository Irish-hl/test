function Tank(){
	this.X=0;
	this.Y=0;
	//左39 上0 右117 下78 空格32
	this.direct=0;
	this.speed=5;
}

//采用prototype添加方法，节省堆中的空间
Tank.prototype =
{
	move: function(event){
		//左37 上38 右39 下40
		//alert(event.keyCode);
		switch(event.keyCode){
			//alert(event.keyCode);
		case 37:
			if(this.X>=5)this.X-=this.speed;
			this.direct=39;
			//alert(event.keyCode);
			break;
		case 38:
			if(this.Y>=5)this.Y-=this.speed;
			this.direct=0;
			break;
		case 39:
			if(this.X<=460)this.X+=this.speed;
			this.direct=117;
			break;
		case 40:
			if(this.Y<=460)this.Y+=this.speed;
			this.direct=78;
			break;
	
   }
   document.getElementById('tank').style.background='url(image/tank.png) 0px '+this.direct+'px';
	document.getElementById('tank').style.left=this.X+'px';
	document.getElementById('tank').style.top=this.Y+'px';	
	},//千万别忘了逗号！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
	attack: function(event){
		var left;
		var top;
		var width='20px';
		var height='10px';
		var flag=false;//无炮弹
		var speed=10;
		var dir=this.direct;
		var shot=document.createElement("div");
		shot.style.backgroundColor='black';
		shot.style.position='absolute';
		switch(this.direct){
			case 39:if(this.X!=0){
					left=this.X-20;//left
					top=this.Y+15;
					flag=true;
					speed=-10;
					}break;
			case 0:if(this.Y!=0){
					left=this.X+15;//top
					top=this.Y-20;
					width='10px';
					height='20px';
					flag=true;
					speed=-10;}break;
			case 117:if(this.X!=465){
					left=this.X+40;//right
					top=this.Y+15;
					flag=true;}break;
			case 78:if(this.Y!=465){
					left=this.X+15;//bottom
					top=this.Y+40;
					width='10px';
					height='20px';
					flag=true;}break;
		}
		//alert(this.X+" "+this.Y);
		shot.style.left=left+'px';
		shot.style.top=top+'px';
		shot.style.width=width;
		shot.style.height=height;
		
		if(flag==true){
		shot.style.left=left+5+'px';
		shot.style.top=top+5+'px';
		shot.style.zIndex=1;
		var timer=null;
		clearInterval(timer); //作用见要点①
		//alert(this.direct);
		timer=setInterval(function(){
		document.body.appendChild(shot);
		if(shot.offsetLeft>=480||shot.offsetTop>=480){ //判断对象边距 到达指定位移则关闭定时器
		clearInterval(timer);
		document.body.removeChild(shot);
		}else{
			//alert(this.direct);//输出undefined!!!!!!!!!!!
		if(dir==39||dir==117)shot.style.left=shot.offsetLeft+speed+'px';
		else shot.style.top=shot.offsetTop+speed+'px';
		if(shot.offsetLeft>=barrier.X&&shot.offsetTop>=barrier.Y)
			{
				alert("撞墙啦!Gameover!");
				clearInterval(timer);
				document.body.removeChild(shot);
			}
		}
		},50);
	}
	}
}

//障碍物
function Barrier(){
	this.X=Math.round(Math.random()*460);
	this.Y=Math.round(Math.random()*460);
	this.create=function(){
		var bar=document.createElement("div");
		bar.style.position='absolute';
		bar.style.width='39px';
		bar.style.height='39px';
		//alert(this.X+" "+this.Y);
		bar.style.left=this.X+'px';
		bar.style.top=this.Y+'px';
		bar.style.backgroundImage="url('image/barrier.png')";
		document.body.appendChild(bar);
	}
}
var tank=new Tank();
var barrier=new Barrier();
barrier.create();

function doSomething(event){	
	if(event.keyCode==32) 
		tank.attack(event);
		else tank.move(event);
}



