/*
 * flipbook - jQuery plugin animating images like a flipbook
 *
 * Copyright (c) Marek Böttcher info(at)marexx(dot)net
 *
 *
 * Project home:
 *   http://www.marexx.net
 *
 * Version:  1.0
 *
 */

  (function ( $ ) {
 
    $.fn.flipbook = function( options ) {
 		
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            images: 20,  					/* Number of Images available, they have to be continuously numbered, starting with 0 */
            loader: false,					/* Should there be a loader */
            width: this.attr('width'),		/* Width of the container, if different than the .flipbook container */
            height: this.attr('height'),	/* Height of the container, if different than the .flipbook container */
            replaceVideoID: ''				/* If ID of an Element is set, this Element will be hidden, when flipbook is loaded */
        }, options );
 		
        _this = this;
        var imageSrc;
        var imgPath;
        var imgKind;
        var flipbookId;

        _this.css({
        	'display': 'none',
        	'left': 0,
        	'height': settings.height,
        	'width': settings.width,
        	'overflow': 'hidden',
        	'position': 'relative',
        	'top': 0,
        	'z-index': 0
        })


	    var flipbook = {
           init: function() { 
             var x = 0;

             //Hide Videoplayer if it should be replaced
             if(settings.replaceVideoID.length > 0){
             	$(settings.replaceVideoID).hide();
         	 }

             var target = null;
             var animating = [];

	           var imgs = _this.find('img');
	           _this.find('.flipbook-container').width(_this.width() * imgs.length);
	           $.each(imgs, function (ii, il) {
	               $(this).css('left', ii * $(this).attr('width') + 'px');
	           });
           },
           setImages: function(){
           	 if (settings.loader == true) {
           	  flipbook.setLoader(); 
           	 };
           			//Path to the first image, without number and without .jpg
           	        if(_this.attr('data-source') != undefined){
           		        imageSrc = _this.attr('data-source');
           		        if(imageSrc.indexOf('0.') > -1 ){
	           		        imgPath = imageSrc.split('0.')[0];
	           		        imgKind = imageSrc.split('0.')[1];
	           		        flipbookId = 'flipbook-'+imgPath.split('/')[imgPath.split('/').length-1];
	           		        _this.attr('id', flipbookId);
           		    	}else{
           		    		console.warn('flipbook.js:\ndata-source must have the "0." at the end.');
           		    		return false;
           		    	}
           	    	}else{
           	    		console.warn('flipbook.js:\nElement with the class "flipbook" must have the attribute "data-source" with the value like: "yourFirstImage_0.jpg" the "0." is mandatory');
           	    		return false;
           	    	}


           	_this.css('display','block');
           	_this.append('<div style="display: block;left: 0;position: absolute;" class="flipbook-container"></div>');

            var aniContainer = _this.find('.flipbook-container');
             
             for (var i = 0; i < settings.images; i++) {
                      aniContainer.append('<img style="float: left;" src="'+imgPath+i+'.'+imgKind+'" width="'+settings.width+'" height="'+settings.height+'"/>');
             }; 
             flipbook.init();  
           },
           setLoader: function(){
           	_this.append('<div id="'+flipbookId+'-loader" class="flipbook-loader" style="position: absolute; z-index:99"></div>');
   			var cl = new CanvasLoader(flipbookId+'-loader');
   			cl.setColor('#fffaff'); // default is '#000000'
   			cl.setShape('roundRect'); // default is 'oval'
   			cl.setDiameter(53); // default is 40
   			cl.setDensity(12); // default is 40
   			cl.setRange(0.9); // default is 1.3
   			cl.setSpeed(1); // default is 2
   			cl.setFPS(21); // default is 24
   			cl.show(); // Hidden by default
   			
   			
   			// This bit is only for positioning - not necessary
   			 var loaderObj = $("#canvasLoader");
   	  		loaderObj.css({
   	  			'position': 'absolute',
   	  			'top': 	(settings.height / 2) - 27,
   	  			'left': (settings.width / 2) - 27
   	  		});
   	  		
           },
           animation: function(_this){
             if (!_this.hasClass('animating')) {
                 var l = _this.find('.flipbook-container img').length;
                 var oldPos = parseInt(_this.find('.flipbook-container').css('left').split('px')[0]);
                 var lWidth = parseInt($(_this.find('.flipbook-container img')[0]).width());
                 var newPos = oldPos - lWidth;

                 if((newPos* -1) < _this.find('.flipbook-container').width() - lWidth ){
                     var x = newPos;
                 }else{
                     var x = 0;
                 }
                 _this.find('.flipbook-container').css('left', x + 'px');
             }      
           }
        }  

 		if($('.flipbook').length > 0){
        	flipbook.setImages(); 
    	}else{
    		console.warn('flipbook.js:\nNo element with the "flipbook" class found!');
    		return false;
    	}

        $(window).load(function() {
           //Fadeout Loader
           $('.flipbook-loader').fadeOut();

           //Start Flipbook Animation
           _this.each(function(index, el) {
           var int = setInterval(function(){flipbook.animation(_this)},1000 / 25);  
           });
        });

    };
}( jQuery ));

//Include the heartcode canvasloader
//http://heartcode-canvasloader.googlecode.com/files/heartcode-canvasloader-min-0.9.1.js
(function(w){var k=function(b,c){typeof c=="undefined"&&(c={});this.init(b,c)},a=k.prototype,o,p=["canvas","vml"],f=["oval","spiral","square","rect","roundRect"],x=/^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,v=navigator.appVersion.indexOf("MSIE")!==-1&&parseFloat(navigator.appVersion.split("MSIE")[1])===8?true:false,y=!!document.createElement("canvas").getContext,q=true,n=function(b,c,a){var b=document.createElement(b),d;for(d in a)b[d]=a[d];typeof c!=="undefined"&&c.appendChild(b);return b},m=function(b,
c){for(var a in c)b.style[a]=c[a];return b},t=function(b,c){for(var a in c)b.setAttribute(a,c[a]);return b},u=function(b,c,a,d){b.save();b.translate(c,a);b.rotate(d);b.translate(-c,-a);b.beginPath()};a.init=function(b,c){if(typeof c.safeVML==="boolean")q=c.safeVML;try{this.mum=document.getElementById(b)!==void 0?document.getElementById(b):document.body}catch(a){this.mum=document.body}c.id=typeof c.id!=="undefined"?c.id:"canvasLoader";this.cont=n("div",this.mum,{id:c.id});if(y)o=p[0],this.can=n("canvas",
this.cont),this.con=this.can.getContext("2d"),this.cCan=m(n("canvas",this.cont),{display:"none"}),this.cCon=this.cCan.getContext("2d");else{o=p[1];if(typeof k.vmlSheet==="undefined"){document.getElementsByTagName("head")[0].appendChild(n("style"));k.vmlSheet=document.styleSheets[document.styleSheets.length-1];var d=["group","oval","roundrect","fill"],e;for(e in d)k.vmlSheet.addRule(d[e],"behavior:url(#default#VML); position:absolute;")}this.vml=n("group",this.cont)}this.setColor(this.color);this.draw();
m(this.cont,{display:"none"})};a.cont={};a.can={};a.con={};a.cCan={};a.cCon={};a.timer={};a.activeId=0;a.diameter=40;a.setDiameter=function(b){this.diameter=Math.round(Math.abs(b));this.redraw()};a.getDiameter=function(){return this.diameter};a.cRGB={};a.color="#000000";a.setColor=function(b){this.color=x.test(b)?b:"#000000";this.cRGB=this.getRGB(this.color);this.redraw()};a.getColor=function(){return this.color};a.shape=f[0];a.setShape=function(b){for(var c in f)if(b===f[c]){this.shape=b;this.redraw();
break}};a.getShape=function(){return this.shape};a.density=40;a.setDensity=function(b){this.density=q&&o===p[1]?Math.round(Math.abs(b))<=40?Math.round(Math.abs(b)):40:Math.round(Math.abs(b));if(this.density>360)this.density=360;this.activeId=0;this.redraw()};a.getDensity=function(){return this.density};a.range=1.3;a.setRange=function(b){this.range=Math.abs(b);this.redraw()};a.getRange=function(){return this.range};a.speed=2;a.setSpeed=function(b){this.speed=Math.round(Math.abs(b))};a.getSpeed=function(){return this.speed};
a.fps=24;a.setFPS=function(b){this.fps=Math.round(Math.abs(b));this.reset()};a.getFPS=function(){return this.fps};a.getRGB=function(b){b=b.charAt(0)==="#"?b.substring(1,7):b;return{r:parseInt(b.substring(0,2),16),g:parseInt(b.substring(2,4),16),b:parseInt(b.substring(4,6),16)}};a.draw=function(){var b=0,c,a,d,e,h,k,j,r=this.density,s=Math.round(r*this.range),l,i,q=0;i=this.cCon;var g=this.diameter;if(o===p[0]){i.clearRect(0,0,1E3,1E3);t(this.can,{width:g,height:g});for(t(this.cCan,{width:g,height:g});b<
r;){l=b<=s?1-1/s*b:l=0;k=270-360/r*b;j=k/180*Math.PI;i.fillStyle="rgba("+this.cRGB.r+","+this.cRGB.g+","+this.cRGB.b+","+l.toString()+")";switch(this.shape){case f[0]:case f[1]:c=g*0.07;e=g*0.47+Math.cos(j)*(g*0.47-c)-g*0.47;h=g*0.47+Math.sin(j)*(g*0.47-c)-g*0.47;i.beginPath();this.shape===f[1]?i.arc(g*0.5+e,g*0.5+h,c*l,0,Math.PI*2,false):i.arc(g*0.5+e,g*0.5+h,c,0,Math.PI*2,false);break;case f[2]:c=g*0.12;e=Math.cos(j)*(g*0.47-c)+g*0.5;h=Math.sin(j)*(g*0.47-c)+g*0.5;u(i,e,h,j);i.fillRect(e,h-c*0.5,
c,c);break;case f[3]:case f[4]:a=g*0.3,d=a*0.27,e=Math.cos(j)*(d+(g-d)*0.13)+g*0.5,h=Math.sin(j)*(d+(g-d)*0.13)+g*0.5,u(i,e,h,j),this.shape===f[3]?i.fillRect(e,h-d*0.5,a,d):(c=d*0.55,i.moveTo(e+c,h-d*0.5),i.lineTo(e+a-c,h-d*0.5),i.quadraticCurveTo(e+a,h-d*0.5,e+a,h-d*0.5+c),i.lineTo(e+a,h-d*0.5+d-c),i.quadraticCurveTo(e+a,h-d*0.5+d,e+a-c,h-d*0.5+d),i.lineTo(e+c,h-d*0.5+d),i.quadraticCurveTo(e,h-d*0.5+d,e,h-d*0.5+d-c),i.lineTo(e,h-d*0.5+c),i.quadraticCurveTo(e,h-d*0.5,e+c,h-d*0.5))}i.closePath();i.fill();
i.restore();++b}}else{m(this.cont,{width:g,height:g});m(this.vml,{width:g,height:g});switch(this.shape){case f[0]:case f[1]:j="oval";c=140;break;case f[2]:j="roundrect";c=120;break;case f[3]:case f[4]:j="roundrect",c=300}a=d=c;e=500-d;for(h=-d*0.5;b<r;){l=b<=s?1-1/s*b:l=0;k=270-360/r*b;switch(this.shape){case f[1]:a=d=c*l;e=500-c*0.5-c*l*0.5;h=(c-c*l)*0.5;break;case f[0]:case f[2]:v&&(h=0,this.shape===f[2]&&(e=500-d*0.5));break;case f[3]:case f[4]:a=c*0.95,d=a*0.28,v?(e=0,h=500-d*0.5):(e=500-a,h=
-d*0.5),q=this.shape===f[4]?0.6:0}i=t(m(n("group",this.vml),{width:1E3,height:1E3,rotation:k}),{coordsize:"1000,1000",coordorigin:"-500,-500"});i=m(n(j,i,{stroked:false,arcSize:q}),{width:a,height:d,top:h,left:e});n("fill",i,{color:this.color,opacity:l});++b}}this.tick(true)};a.clean=function(){if(o===p[0])this.con.clearRect(0,0,1E3,1E3);else{var b=this.vml;if(b.hasChildNodes())for(;b.childNodes.length>=1;)b.removeChild(b.firstChild)}};a.redraw=function(){this.clean();this.draw()};a.reset=function(){typeof this.timer===
"number"&&(this.hide(),this.show())};a.tick=function(b){var a=this.con,f=this.diameter;b||(this.activeId+=360/this.density*this.speed);o===p[0]?(a.clearRect(0,0,f,f),u(a,f*0.5,f*0.5,this.activeId/180*Math.PI),a.drawImage(this.cCan,0,0,f,f),a.restore()):(this.activeId>=360&&(this.activeId-=360),m(this.vml,{rotation:this.activeId}))};a.show=function(){if(typeof this.timer!=="number"){var a=this;this.timer=self.setInterval(function(){a.tick()},Math.round(1E3/this.fps));m(this.cont,{display:"block"})}};
a.hide=function(){typeof this.timer==="number"&&(clearInterval(this.timer),delete this.timer,m(this.cont,{display:"none"}))};a.kill=function(){var a=this.cont;typeof this.timer==="number"&&this.hide();o===p[0]?(a.removeChild(this.can),a.removeChild(this.cCan)):a.removeChild(this.vml);for(var c in this)delete this[c]};w.CanvasLoader=k})(window);  
                   

