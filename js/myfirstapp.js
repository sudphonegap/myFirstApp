
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 

    // Wait for Cordova to connect with the device
    //
   
    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        
        console.log('-------------------------------------');
        console.log(JSON.stringify(navigator.camera));
        console.log('-------------------------------------');
        
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
       var smallImage = document.getElementById('smallImage');

		//alert(imageData);
		//var img=$('<img />');
		// img[0].src=
      $('#photoCont').html('<img src="data:image/jpeg;base64,' + imageData+'" />');
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI 
       console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      console.log(destinationType);
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    // 
    function onFail(message) {
      alert('Failed because: ' + message);
    }
    
    
    
    var globJO={},
    	globV={};
    
    //function to make tab swap
    var tabSwap={
    	winWidth:0,
    	winHeight:0,
    	adjust:function(){
     		globJO.wrap.add(globJO.tabs).css({
    			width:tabSwap.winWidth+'px',
    			height:tabSwap.winHeight+'px'
    		});
    		globJO.tabWrap.css({width:(3*tabSwap.winWidth)+'px'});
    		
    		centerAlign(globJO.logo);
    	},
    	setFrameSize:function(){
    		var photo=jqOb('#photoCont'),
    			photoWidth=tabSwap.winWidth-100,
    			photoHeight=tabSwap.winHeight-100;
    		photo.css({
    			width:photoWidth+'px',
    			height:photoHeight+'px',
    			top:'50px',
    			left:'50px'
    		});
    		
    		
     		
    		jqOb('#left-border').css({
    			width:photoHeight+'px',
    			left:40-photoHeight/2+'px',
    			top:(40+photoHeight/2)+'px'
    		});

    		jqOb('#top-border').css({
    			width:photoWidth+'px',
    			left:50+'px',
    			top:30+'px'
    		});

    		jqOb('#bottom-border').css({
    			width:photoWidth+'px',
    			left:50+'px',
    			top:(50+photoHeight)+'px'
    		});

    		jqOb('#right-border').css({
    			width:photoHeight+'px',
    			left:(60-photoHeight/2+photoWidth)+'px',
    			
    			top:(40+photoHeight/2)+'px'
   			});

    		    		
    	}
    }

//function to center align a div
function centerAlign(elm){
	var height=elm.height(),
		width=elm.width();
	
	elm.css({
		top:'50%',
		left:'50%',
		"margin-left":-(width/2)+'px',
		"margin-top":-(height/2)+'px',
		
	})	
}

//function to get jquery objet
function jqOb(selector){
	if(!globJO[selector]){
		globJO[selector]=$(selector);
	}
	return globJO[selector];
}

$(document).ready(function(){
	//initialize objects
	globJO.wrap=$('#wrapper');
	globJO.tabs=$('.tabs');
	globJO.tabWrap=$('#tabWrap');
	globJO.logo=$('#logo');

	//initialize width and height
	var win=$(window),
		changeDim=function(){
			var winWidth=win.width(),
				prevWidth=tabSwap.winWidth==0?win.width():tabSwap.winWidth;
			tabSwap.winHeight=win.height();
			tabSwap.winWidth=win.width();
			tabSwap.adjust();
			globJO.tabWrap.css({'left':'-='+(tabSwap.winWidth-prevWidth)});
		}
	
	
	changeDim();
	//to change dimension on resize
	win.resize(changeDim);
	
	//to change the screen after three seconds
	setTimeout(function(){
		globJO.tabWrap.animate({left:-tabSwap.winWidth+'px'});
	},3000);
	
	
	$('#nameFrame').click(function(){
		//to add name
		var name=$('#name').val(),
			nameArry=[];
		for(var i=0; i<50; i++){
			nameArry.push(name);
		}
		
		jqOb('#top-border').add(jqOb('#left-border')).add(jqOb('#right-border')).add(jqOb('#bottom-border')).html(nameArry.join(' ~~ '));

		globJO.tabWrap.animate({left:-(2*tabSwap.winWidth)+'px'});
		
		//to adjust frame borders
		tabSwap.setFrameSize();
	});
	
	$('#capturePhoto').click(function(){
		alert('open');
		capturePhoto();
	});
	
;})
