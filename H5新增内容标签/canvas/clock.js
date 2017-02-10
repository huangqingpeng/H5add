function Clock(opt){
	this.config={
		canvas:null,
		width:300,
		height:300
	}
	for(var i in opt){
		this.config[i]=opt[i];
	}
	
	this.canvasEl=document.querySelector(this.config.canvas);
	this.contx=this.canvasEl.getContext("2d");
	var date=new Date();
	//date=date.getHours()
	if(date.getHours()>11){
		this.h=date.getHours()-12;//获取当前时间的小时
	}else{
		this.h=date.getHours()
	}
	//console.log(this.h);
	this.m=date.getMinutes();//获取当前时间的分钟
	//console.log(this.m);
	this.s=date.getSeconds();//获取当前时间的秒数
	
	
}


Clock.prototype={
	init:function(){//创建
		this.canvasEl.width=this.config.width;
		this.canvasEl.height=this.config.height;
		this.contx.translate(this.config.width/2,this.config.height/2);
		this.animate();
	},
	draw:function(){//画图，表盘
		var contx=this.contx;
		//圆的半径
		var r=this.config.width>this.config.height?(this.config.width)/2-10:(this.config.height)/2-10;                
	    contx.beginPath();
	    contx.fillStyle="#e5e5e5";
	    contx.strokeStyle="#666"
	    contx.arc(0,0,r,0,2*Math.PI);
	    contx.fill();
	     contx.stroke();
	     //中心点
	    contx.beginPath();
	    contx.fillStyle="#666";
	    contx.arc(0,0,5,0,2*Math.PI);
	    contx.fill();
	    this.r=r;
	    this.drawPart();//显示表盘刻度
	    this.drawText();//显示表盘文字
	    this.drawSwizard();//绘制指针
	},
	drawPart:function(){//表盘的刻度
		var degs=360/60;
		var deg=degs*Math.PI/180;
		var contx=this.contx;
		//contx.beginPath();
		for(var i=0;i<60;i++){
			contx.save();//存储
			contx.beginPath();
			//moveTo(Math.sin(i*deg)*(this.r+1),Math.cos(i*deg)*(this.r+1));
			contx.rotate(i*deg);
			contx.fillStyle="#000";
			if(i%5==0){
				contx.rect(0,-this.r+5,5,15);
			}else{
				contx.rect(0,-this.r+5,5,5);
			}
			
			contx.fill();
			contx.restore();//存储
		}
	},
	drawText:function(){//绘制表盘刻度文字
		var contx=this.contx;
		var deg=2*Math.PI/12;
		contx.save();
		contx.fillStyle="#333";
		contx.font="28px 微软雅黑";
		contx.textAlign="center";
		contx.textBaseline="middle";
		contx.beginPath();
		for(var i=12;i>0;i--){
			//计算圆弧上的坐标点
			var x=Math.sin(i*deg)*(this.r-40);
			var y=-Math.cos(i*deg)*(this.r-40);
			//绘制文字
			contx.fillText(i,x,y);
		}
		contx.restore();
	},
	drawSwizard:function(){//绘制指针
		var degc=360/60;
		var deg=degc*Math.PI/180;
		var contx=this.contx;
		contx.save();//存储
		contx.beginPath();
		contx.fillStyle="#900";
		contx.rotate(deg*this.s);//秒针旋转角度
	    contx.rect(-2,-this.r*0.8,1,this.r);//秒针
	    contx.fill();
	    contx.restore();//恢复原状
	    
	    contx.save();//存储
	    contx.beginPath();
		contx.fillStyle="#090";
	    contx.rotate(deg*this.m);//分针旋转角度
	    contx.rect(-2,-this.r*0.5,3,this.r*0.6);//分针
	    contx.fill();
	    contx.restore();//恢复原状
	    
	    contx.save();//存储
	    contx.beginPath();
		contx.fillStyle="#009";
		var deg=360/12*Math.PI/180;
	    contx.rotate(deg*this.h);//时针旋转角度
	    contx.rect(-2,-this.r*0.3,4,this.r*0.4);//时针
	    contx.fill();
	    contx.restore();//恢复原状
	},
	animate:function(){//运动
		var contx=this.contx;
		var that=this;
		setInterval(function(){
			contx.clearRect(-that.config.width/2,-that.config.height/2,that.config.width,that.config.height);
			that.draw();
			that.s++;
			if(that.s>59){//秒针
				that.s=0;
				that.m++;
				if(that.m>59){//分针
					that.m=0;
					that.h++;
					if(that.h>11){//时针
						that.h=that.h-12;
					}
				}
			}
		},1000)
		
	}
	
	
	
	
	
	
}























