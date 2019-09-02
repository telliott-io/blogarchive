var TagGraph = function(name) {

	var scaling = 0;

	var mouse_x = -1;
	var mouse_y = -1;
	var clickUrl = null;
	var doneScaling = 0;
	
	var mouseMoved = false;
	
	var tagList = [];
    var max_tagLength = 0;
    var imageStore = [];
        
	var MAX_HEIGHT;
	var MAX_WIDTH;

	var bar_height;
	var sq_size;

	var graphName = name;

	var tag_map = [];

	var me = this;
	
	this.mapTag = function(tag,value){
		tag_map[tag] = value;
	}
	
	this.ev_mousemove = function(ev) {
  		var x, y;
  		
  		mouseMoved = true;

	  	// Get the mouse position relative to the canvas element.
  		if (ev.layerX || ev.layerX == 0) { // Firefox
    		x = ev.layerX;
    		y = ev.layerY;
  		} else if (ev.offsetX || ev.offsetX == 0) { // Opera
    		x = ev.offsetX;
    		y = ev.offsetY;
  		}
  
		mouse_x = x;
 		mouse_y = y;

	}

	this.ev_click = function(ev){
		if(clickUrl != null){
			location.href = clickUrl;
		}
	}

	this.doRender = function(){
    
    if(scaling == 1 && !mouseMoved){
    	return;
    }
    
    mouseMoved = false;
    
    var graph = document.getElementById(graphName);
    var ctx = graph.getContext('2d');
 
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0,0,graph.width,graph.height); // clear canvas

    for(var imgName in imageStore){
        if(!imageStore[imgName].complete){
            ctx.save();
	        ctx.fillStyle = "Black";
    	    ctx.fillText("Loading...", 10, 10);
    	    ctx.restore();
            return;
        }
    }
    
	scaling += 0.05;
    if(scaling > 1) {
    	scaling = 1;
    }

    clickUrl = null;
    
    var pos_x = 0;
    var pos_y = 0;

    for ( var tagNum in tagList ){

        var tag = tagList[tagNum].tag;
        var theTag = tag_map[tag];
        
        var width = sq_size*theTag.length*scaling;

		if(scaling >= 1){
		
        	if(mouse_y >= pos_y && mouse_y <= pos_y + bar_height){
				var imgList = [];       
           
				for (var image_num in theTag){
								
					var img = theTag[image_num];
					var data = img[0];
					var info = img[1];
				
					var imgDraw = {};
		    	    imgDraw.tag = tag;
			        imgDraw.tagLen = theTag.length;
        		
					imgDraw.xp = pos_x + (image_num*sq_size*scaling);
					imgDraw.yp = pos_y;
					imgDraw.w = sq_size*scaling;
					imgDraw.h = bar_height;
					imgDraw.url = info.urls.url[0]._content;
				
					var middle_x = imgDraw.xp + imgDraw.w/2;
					var dist = Math.abs(middle_x - mouse_x);
					var full = width;
				
					var rat = (full - dist)/full;
				
					if(75*rat > imgDraw.w){
						imgDraw.w = 75*rat;
						imgDraw.h = 75*rat;
					}
					if(imgDraw.w > 75){
						imgDraw.w = 75;
						imgDraw.h = 75;
					}
				
					
					imgDraw.xp -= (imgDraw.w - sq_size*scaling)/2;
					imgDraw.yp -= (imgDraw.h - bar_height)/2;
					
					if(imgDraw.xp < 0){
						imgDraw.xp = 0;
					}
					if(imgDraw.yp < 0){
						imgDraw.yp = 0;
					}
					
					if(imgDraw.xp + imgDraw.w > MAX_WIDTH){
						imgDraw.xp = MAX_WIDTH - imgDraw.w;
					}
					if(imgDraw.yp+imgDraw.h > MAX_HEIGHT){
						imgDraw.yp = MAX_HEIGHT - imgDraw.h;
					}
     			
     				imgDraw.img = imageStore[data.url_sq];
     			
     				imgList.push(imgDraw);
     			     			
				}
			
				var sortByWidth = function(a,b){
			   		return b.w - a.w;
   				}
   				
		  		imgList.sort(sortByWidth);
			
				for(var i in imgList){
					var im = imgList[i];
					if(i == 0 && im.w > sq_size){
						clickUrl = im.url;
					}
					ctx.drawImage(im.img,im.xp,im.yp,im.w,im.h);
				}
		
        }
    	}
    	
    	pos_y += bar_height;
    }
    
    pos_x = 0;
    pos_y = 0;
    
    for ( var tagNum in tagList ){

		var tag = tagList[tagNum].tag;
        var theTag = tag_map[tag];
        
        var width = sq_size*theTag.length*scaling;
       
        if(scaling >= 1){
            var text = tag + " (" + theTag.length + ") ";
            
            ctx.save();
            
            var fontHeight = Math.floor(bar_height * 0.7);
            
            ctx.font = fontHeight + "px sans-serif";
	        ctx.fillStyle = "Black";
    	    
    	    var textMet = ctx.measureText(text);
    	    var textW = textMet.width;
    	    
    	    if((textW + width + pos_x + 5) >= MAX_WIDTH){
    	    	ctx.fillText(text, pos_x + width - 5 - textW, pos_y+fontHeight);
    	    } else {
    	    	ctx.fillText(text, pos_x + width + 5, pos_y+fontHeight);
    	    }
    	    ctx.restore();
        }
        
        ctx.save();
        ctx.fillStyle = 'rgb(100,100,255)';
	  	ctx.strokeStyle = 'rgb(0,0,0)';
	  	ctx.lineWidth = 1;
	  	ctx.fillRect(pos_x,pos_y,width,bar_height);
		ctx.strokeRect(pos_x,pos_y,width,bar_height);
        ctx.restore();
        
        pos_y += bar_height;
    }
}

 this.init = function(mW,mH) {

    document.write('<canvas id="' + graphName + '" width="' + mW + '" height="' + mH + '" style="position: relative;border: 1px solid"></canvas>');

	// Determine maximum size for each thumbnail
	for ( var tag in tag_map ){
		var theTag = tag_map[tag];
		if(theTag.length > max_tagLength){
			max_tagLength = theTag.length;
		}
		
		for (var image_num in theTag){
			var img = theTag[image_num];
			var data = img[0];
            
            var url = data.url_sq;
            
            imageStore[url] = new Image();
            imageStore[url].src = url;
		}
		
        var tagContent = {};
        tagContent.tag = tag;
        tagContent.tagLen = theTag.length;
        tagList.push(tagContent);
	}
	
   var sortBySize = function(a,b){ 
       if(a.tagLen != b.tagLen){
	   		return b.tagLen - a.tagLen;
       } else {
       		a.tag.localeCompare(b.tag);
       }	
   }
   tagList.sort(sortBySize);
	
		var canvas = document.getElementById(graphName);
	
		doneScaling = 0;
		
			MAX_HEIGHT = canvas.height;
	MAX_WIDTH = canvas.width;

	bar_height = MAX_HEIGHT / tagList.length;
	bar_height = Math.floor(bar_height);

	sq_size = bar_height;
    
	if(max_tagLength*sq_size > MAX_WIDTH){
		sq_size = Math.floor(MAX_WIDTH/max_tagLength);
	}

	MAX_HEIGHT = bar_height * tagList.length;
	MAX_WIDTH = sq_size * max_tagLength;
	
	if(canvas.height > MAX_HEIGHT){
		canvas.height = MAX_HEIGHT;
	}

		// Attach the mousedown, mousemove and mouseup event listeners.
  		canvas.addEventListener('mousemove', me.ev_mousemove, false);
  		canvas.addEventListener('mouseup',   me.ev_click, false);
  		setInterval(me.doRender,50);
  		
	}

}