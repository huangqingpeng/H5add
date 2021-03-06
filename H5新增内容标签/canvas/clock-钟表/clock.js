function Clock(opt){
	this.config={
		target:"",
		width:500,
		height:500
	}
	for(var i in opt){
		this.config[i]=opt[i];
	}
	this.mycanvas=document.querySelector(this.config.target);
	this.contx=this.mycanvas.getContext("2d");
	this.init();
}

Clock.prototype={
	init:function(){
		this.mycanvas.width=this.config.width;
		this.mycanvas.height=this.config.height;
		this.action();
	},
	//绘制表盘
	drewDail:function(h,m,s){
		var contx=this.contx;
		var r=this.config.width>this.config.height?this.config.height/2-20:this.config.width/2-20;
		//保存当前绘制环境状态
		contx.save();
		contx.beginPath();
		contx.strokeStyle="#666";
		contx.fillStyle="#eee";
		contx.translate(this.config.width/2,this.config.height/2);
		//画圆盘
		contx.arc(0,0,r,0,2*Math.PI);
		contx.stroke();
		contx.fill();
		
		this.r=r;
		this.drewDot();
		this.drewText();
		this.drewWizard("h",h);
		this.drewWizard("m",m);
		this.drewWizard("s",s);
		contx.restore();
		
	},
	//时间点
	drewDot:function(){
		var contx=this.contx;
		var deg=2*Math.PI/60;
		contx.save();
		contx.beginPath();
		contx.fillStyle="#000";
		for(var i=0;i<60;i++){
			
			if(i%5==0){
				contx.rect(0,-this.r+5,5,15);
			}else{
				contx.rect(0,-this.r+5,5,5);
			}
			contx.rotate(deg);
		}
		contx.fill();
		contx.restore();
	},
	//文字绘制
	drewText:function(){
		var contx=this.contx;
		var deg=2*Math.PI/12;
		contx.save();
		contx.fillStyle="#000";
		contx.font="28px 微软雅黑";
		contx.textAlign="center";
		contx.textBaseline="middle";
		contx.beginPath();
		for(var i=1;i<13;i++){
			//计算圆弧上的坐标点
			var x=Math.sin(i*deg)*(this.r-40);
			var y=-Math.cos(i*deg)*(this.r-40);
			//绘制文字
			contx.fillText(i,x,y);
		}
		contx.restore();
	},
	//绘制指针
	drewWizard:function(w_class,time){
		var contx=this.contx;
		var degh=2*Math.PI/12;
		var degm=2*Math.PI/60;
		contx.save();
		contx.beginPath();
		contx.fillStyle="#000";
		if(w_class=="h"){
			contx.rotate(time*degh);
			contx.rect(-3,-this.r/2.5,6,this.r/2);
		}else if(w_class=="m"){
			contx.rotate(time*degm);
			contx.rect(-2,-this.r/1.8,4,this.r/1.5);
		}else if(w_class=="s"){
			contx.fillStyle="#f00";
			contx.rotate(time*degm);
			contx.rect(-1,-this.r/1.5,2,this.r/1.2);
		}
		contx.fill();
		contx.restore();
	},
	//动画
	action:function(){
		var contx=this.contx;
		var that=this;
		setInterval(function(){
			var thisdata=new Date();
			var h=thisdata.getHours();
			var m=thisdata.getMinutes();
			var s=thisdata.getSeconds();
			contx.clearRect(0,0,that.config.width,that.config.height);
			if(h>=12){
				h-=12;
			}
			if(h==24){
				h=0;
			}
			that.drewDail(h,m,s);
		},1000);
	}
}
