function Plate(opt){
	this.config={
		width:300,
	    height:300,
	    canvas:null
	}
	for(var i in opt){
		this.config[i]=opt[i];
	}
	this.oPlant=document.querySelector(this.config.canvas);
	this.contx=this.oPlant.getContext("2d");
}
Plate.prototype={
	init:function(){//创建
		this.oPlant.width=this.config.width;
		this.oPlant.height=this.config.height;
		this.contx.translate(this.config.width/2,this.config.height/2);
		this.draw("#ea3e00",0);//外圆
		this.draw("#fff",18);//外圆
		
		this.draw("#eee",26);//内圆
		this.drawS();
	},
	draw:function(color,r){//绘图
		var contx=this.contx;
		//半径
		this.r=this.config.width>this.config.height?this.config.width/2-10:this.config.height/2-10;    
		//圆
		contx.beginPath();
		contx.fillStyle=color;
		contx.arc(0,0,this.r-r,0,2*Math.PI);
		contx.fill();
		//圆环上的三角形
		
		
		
		
//		this.data=[{
//			        x:w+this.r*Math.cos(1/3*Math.PI),
//			        y:h-this.r*Math.sin(1/3*Math.PI)
//		          },
//		          {
//		          	x
//		          }
//		          ]
//	    for(var i=0;i<this.data.length;i++){
//		    contx.beginPath();
//		    contx.moveTo(w,h);
//			contx.lineTo(,);
//			contx.lineTo(w+this.r*Math.cos(1/3*Math.PI),h+this.r*Math.sin(1/3*Math.PI));
//			contx.strokeStyle="#fff";
//			contx.stroke();
//			contx.fillStyle="#fff";
//			contx.fill();
//		}
	},
	drawS:function(){//画外圆环上三角形
		var contx=this.contx;
		var w=this.config.width/2;
		var h=this.config.height/2;
		var r=this.r;
		console.log(w+","+h+","+r);
		contx.beginPath();
	    contx.moveTo(w,h);
		contx.lineTo(w-r*Math.cos(1/3*Math.PI),h-r*Math.sin(1/3*Math.PI));
		contx.lineTo(w+r*Math.cos(1/3*Math.PI),w+r*Math.sin(1/3*Math.PI));
		contx.closePath();
		contx.strokeStyle="blue";
		contx.stroke();
		contx.fillStyle="blue";
		contx.fill();
	
	
	    contx.beginPath();
	    //contx.moveTo(w,h);
		contx.lineTo(w+r*Math.cos(1/3*Math.PI),h+r*Math.sin(1/3*Math.PI));
		contx.lineTo(10,h);
		//contx.closePath();
		contx.fillStyle="#fff";
		contx.fill();
	
	    contx.beginPath();
	    //contx.moveTo(w,h);
		contx.lineTo(10,h);
		contx.lineTo(w-r*Math.cos(1/3*Math.PI),h-r*Math.sin(1/3*Math.PI));
		//contx.closePath();
		contx.fillStyle="#fff";
		contx.fill();
	}
	
	
}























