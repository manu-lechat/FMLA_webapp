
// FICHE ////////////////////////////////////////////////////////////////////////////////////////////


function config_fiche(fiche_file, fiche_video, fiche_video_showpad, fiche_testimonial){

//	$('#fiche_produit_bg').click(function(){ alert("fiche_produit_bg click"); hideFiche(); });

	/* bt close */
	var bt_close = document.getElementById('fiche_produit_bt_close');
	var bt_share = document.getElementById('fiche_produit_bt_share');
	bt_close.onclick = function() { 
		fiche_out();
	}

	/* bt video */
	var bt_video = document.getElementById('fiche_produit_bt_video');	
	if(fiche_video!=""){ 

		bt_video.style.display = 'block';
		if(contexte_app=="showpad"){
			// construction du lien showpad pour ouverture de la vidéo Showpad avec parametre modal = 1
			bt_video.setAttribute("href", fiche_video_showpad+"?modal=1&toolbar=0");
		}else{
			bt_video.onclick = function() {  show_fiche_video(fiche_video); 	};	
		}

	}else{
		bt_video.style.display = 'none';
	}

	/* bt testimonial */
	var bt_testi = document.getElementById('fiche_produit_bt_testimonial');	
	if(fiche_testimonial=="yep"){ 
		bt_testi.style.display = 'block';
		bt_testi.onclick = function() {  show_fiche_testimonial(fiche_file); 	};		
	}else{
		bt_testi.style.display = 'none';
	}

	/* bt back */ 
	var bt_back = document.getElementById('fiche_produit_bt_back');
	bt_back.onclick = function() { 

		$('#fiche_temoignage').fadeOut();
		$('#fiche_video').fadeOut();
		document.getElementById('fiche_video').innerHTML ="";
		document.getElementById('fiche_temoignage').innerHTML ="";
		bt_back.style.display = 'none';
	};

	/* bt share*/
	if(contexte_app=="showpad"){
	//	$('#fiche_produit_bt_share').attr("href", "showpad://folder/458237/file/f4ce5abc0c822115e59c428e4c567b1d");
	}else{


	}
}



function fiche_in(fiche_file){

	$('#fiche_video').css("display","none");
	$('#fiche_temoignage').css("display","none");
	document.getElementById('fiche_produit_bt_back').style.display = 'none';
	//document.getElementById('fiche_produit_bt_share').style.display = 'none';
	document.getElementById('fiche_produit').innerHTML = '<img src="img/'+choosenLanguage+'/'+fiche_file+'.png">';
	
	$('#fiche_produit_bg').css("display","block");
	TweenLite.fromTo($("#fiche_produit_bg"), 0.5,  { opacity:"0" },{delay:0, opacity:"1", onComplete: function(){
		$('#fiche_container').css("display","block");
	}});
	
	resize_window();
}

function show_fiche_testimonial(fiche_file){

	console.log('show_fiche_testimonial('+fiche_file+')');
	document.getElementById('fiche_produit_bt_back').style.display = 'block';
	document.getElementById('fiche_temoignage').innerHTML = '<img src="img/'+choosenLanguage+'/'+fiche_file+'_testimonial.png">';
	$('#fiche_temoignage').fadeIn();
}

function show_fiche_video(videoFile){


	// show video area


	$('#fiche_video').fadeIn();
	document.getElementById('fiche_produit_bt_back').style.display = 'block';
	document.getElementById('fiche_produit_bt_share').style.display = 'none';
	
	var myVideoContainer='';
	myVideoContainer+='<div id="fiche_video_container" class="hidden" >';
	myVideoContainer+='<video id="videoclip" controls>';
	
	if(contexte_app=="online"){
		myVideoContainer+='<source src="'+url_videos_online+'/'+videoFile+'.webm" type="video/webm">';
		myVideoContainer+='<source  src="'+url_videos_online+'/'+videoFile+'.mp4" type="video/mp4">';
	}
	if(contexte_app=="local"){
		myVideoContainer+='<source src="'+url_videos_local+'/webm/'+videoFile+'.webm" type="video/webm">';
		myVideoContainer+='<source  src="'+url_videos_local+'/mp4/'+videoFile+'.mp4" type="video/mp4">';
	}
	if(contexte_app=="showpad"){
		// ça fonctionne pas
		//myVideoContainer+='<source  src="showpad://folder/458237/file/12adefca9dedca073910f1c2ac9774b1" type="video/mp4">';
		//myVideoContainer+='<source src="'+url_videos_online+'/'+videoFile+'.webm" type="video/webm">';
		//myVideoContainer+='<source  src="'+url_videos_online+'/'+videoFile+'.mp4" type="video/mp4">';
	}
	myVideoContainer+="<p>You navigator doesn't support HTML5 video!</p>";
	myVideoContainer+='</video>';
	myVideoContainer+='</div>';

	document.getElementById('fiche_video').innerHTML = myVideoContainer;

	var videoclip = document.getElementById("videoclip");
	videoclip.defaultMuted = true;
	videoclip.addEventListener('loadeddata', function() {
	   // Video is loaded and can be played
	   document.getElementById("fiche_video_container").className = "";
	}, false);


	videoclip.play();
	console.log('play video');
}


function fiche_out(ficheToShow){

	console.log('fiche_out()');
	document.getElementById('fiche_video').innerHTML ="";
	document.getElementById('fiche_container').style.display = 'none';
	TweenLite.fromTo($("#fiche_produit_bg"), 0.8,  { opacity:"1" },{delay:0.1, opacity:"0", onComplete: function(){

		document.getElementById('fiche_produit_bg').style.display = 'none';
		}});


	document.getElementById('fiche_produit_bt_back').style.display = 'none';
}
