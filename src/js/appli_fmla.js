var main_width = 1920;
var main_height = 1080;
var rapport_proportions_1 = 1.9; 
var rapport_proportions_2 = 1.6; 
var currentSlide = 0;
var currentStep = 0;
var choosenLanguage = "en";
var contentSwiper;
var myTween;
var timer1;
var JsonArray;
var myAnim;
// Main init

function initMain(){

	console.log("init main");
	resize_window();
	window.addEventListener("resize", resize_window);
	myAnim = new anim_intro();
	doNextStep();
}

function doNextStep(){

	currentStep++;
	switch(currentStep){
		case 1: 
			doNextStep();	
		break;	
		case 2: 			
			get_json();		
		break;	
		case 3:
			init_swipper();	 
		break;	
		case 4: 	
			config_all();
		break;	
		case 5: 	
			welcome_in();	
			//area_in();
		break;
	}
}


// CONFIG CLICS ////////////////////////////////////////////////////////////////////////////////////////////


function config_all(){


	console.log('config_all()');
	/* welcome  */////////////////////////////////////////////////////
	document.getElementById('welcome_container').onclick = function() {  welcome_out(); };

	/* intro  */////////////////////////////////////////////////////
	document.getElementById('bt_skip').onclick = function() {  myAnim.skip(); };
	
	/* home  */////////////////////////////////////////////////////
	document.getElementById('header_biomerieux').onclick = function() {  main_reset();	};
	var liens_home = document.querySelectorAll('#home_middle a');
	for (var i = 0; i < liens_home.length; i++) {
		liens_home[i].onclick = function() { 
			area_in( this.getAttribute('slideToShow')); 
			resize_window();
			home_out(); 
			onSlideChangeEnd();
		};
	}	

	document.getElementById('bt_play').onclick = function() { 
		area_in(0); 
		resize_window();
		home_out(); 
		onSlideChangeEnd();
		autoplay();
	};

	document.getElementById('home_a9').innerHTML = JsonArray.areas[8].title;
	document.getElementById('home_a10').innerHTML = JsonArray.areas[9].title;


	/* area screen  */////////////////////////////////////////////////////
	var swiper_link = document.querySelectorAll('a.swiper_link');
	for (var i = 0; i < swiper_link.length; i++) {
		swiper_link[i].onclick = function() { 			
			contentSwiper.swipeTo( this.getAttribute('slideToShow'), 1000); 
			
		};
	}	
	document.getElementById('bt_home').onclick = function() {  home_in(); };

	// puces
	var area_puces = document.querySelectorAll('.area_slide a');
	for (var i = 0; i < area_puces.length; i++) {
		area_puces[i].onclick = function() { 		
			config_fiche(  this.getAttribute("fiche_file")  ,  this.getAttribute("fiche_video")  ,  this.getAttribute("fiche_testimonial")  );
			fiche_in(  this.getAttribute("fiche_file") );
		};
	}	

	/* loading de la vidéo d'intro */ 
	myAnim.preload();

	/* config done, play */
	doNextStep();
}


// INTRO SCREEN ////////////////////////////////////////////////////////////////////////////////////////////


function welcome_in(){

	console.log('welcome_in()');
	show_ecran('ecran_welcome');
	var welcome_item = document.querySelectorAll('#ecran_welcome img');
	for (var i = 0; i < welcome_item.length; i++) {
		welcome_item[i].style.opacity = 1;
	}
	timer1 = setTimeout(function(){welcome_out()},3000)
}	

function welcome_out(){

	clearTimeout(timer1);
	console.log('welcome_out()');
	var welcome_item = document.querySelectorAll('#ecran_welcome img');
	for (var i = 0; i < welcome_item.length; i++) {
		welcome_item[i].style.opacity = 0;
	}
	timer1 = setTimeout(function(){intro_anim_in()},3000)
	
}	

// intro_anim

function intro_anim_in(){

	console.log('intro_anim_in()');
	show_ecran('ecran_intro_anim');
	myAnim.start();

}


var anim_intro = function(){

	var anim_intro;
	console.log('init anim_intro Obj');
	// PARTIE TIMELINE /////////////////////////////
	// Timeline animation des textes / images

	function anim_intro_timeline(){

		console.log('anim_intro_timeline()');
		anim_intro = new TimelineLite( {onComplete:completeTimeline, paused: true });

		anim_intro.fromTo("#txt1", 0.8, { opacity:"0", marginTop:"20px" },{opacity:"1", marginTop:"0", ease:Back.easeOut });
		anim_intro.fromTo("#txt2", 0.5, { opacity:"0", marginTop:"20px" },{ delay:1, opacity:"1", marginTop:"0", ease:Back.easeOut });
		anim_intro.fromTo("#txt3", 0.5, { opacity:"0", marginTop:"20px" },{opacity:"1", marginTop:"0", ease:Back.easeOut });
		anim_intro.to("#txt3", 0.5, { delay:6, opacity:"0" });
		anim_intro.to("#txt2", 0.5, { opacity:"0" });
		anim_intro.to("#txt1", 0.5, { opacity:"0" }); 
		anim_intro.fromTo("#visu1", 0.5, { opacity:"0" },{  delay:1, opacity:"1" });
		anim_intro.fromTo("#txt4", 0.5, { opacity:"0" },{  opacity:"1", onComplete:function(){ play_video2(); } });
		anim_intro.to("#txt4", 0.1, { delay:3, opacity:"0" });
		anim_intro.fromTo("#txt5", 0.5, { opacity:"0" },{ opacity:"1" });
		anim_intro.to("#txt5", 0.5, {  delay:3, opacity:"0" });
		anim_intro.to("#visu1", 0.5, { opacity:"0" });

		anim_intro.autoRemoveChildren = true;
		anim_intro.delay(4);
		anim_intro.play();

		function completeTimeline(){ the_end(); }
	}
 
	// PARTIE VIDEO /////////////////////////////
 	// Injection de la balise video 1 - chargement - lancement onloaded de la 2
	
	function anim_intro_video1(){

		console.log('anim_intro_video1()');
		var videoContent='';
		videoContent+='<div id="video_1_container" class="hidden" >';
		videoContent+='<video id="video_1">';
		videoContent+='<source src="media/ecran_intro_anim.mp4" type="video/webm">';
		videoContent+='<source  src="media/ecran_intro_anim.mp4" type="video/mp4">';
		videoContent+="<p>You navigator doesn't support HTML5 video!</p>";
		videoContent+='</video>';
		videoContent+='</div>';

		document.getElementById('intro_anim_video_1').innerHTML = videoContent;
		var video_1 = document.getElementById("video_1");
		video_1.addEventListener('play', function() {
		   document.getElementById('ecran_loader').style.display = "none";
		   document.getElementById("video_1_container").className = "";
		   TweenLite.fromTo('#video_1_container', 2, { opacity:"0" },{ opacity:"1" });
		   anim_intro_timeline();
		   anim_intro_video2();

		}, false);

		console.log('preload video');
	}

	function anim_intro_video2(){

		console.log('anim_intro_video2()');
		var videoContent='';
		videoContent+='<div id="video_2_container" class="hidden" >';
		videoContent+='<video id="video_2">';
		videoContent+='<source src="media/introFin.mp4" type="video/webm">';
		videoContent+='<source  src="media/introFin.mp4" type="video/mp4">';
		videoContent+="<p>You navigator doesn't support HTML5 video!</p>";
		videoContent+='</video>';
		videoContent+='</div>';

		document.getElementById('intro_anim_video_2').innerHTML = videoContent;
		var video_2 = document.getElementById("video_2");

		video_2.addEventListener('play', function() {
		   document.getElementById("video_2_container").className = "";
		   TweenLite.fromTo("#video_2_container", 1, { opacity:"0" },{ opacity:"1", onComplete: function(){
				document.getElementById('intro_anim_video_1').innerHTML = "";
			} });
		}, false);
	}

	function play_video2(){
		document.getElementById("video_2").play();
	}

	function the_end(){ 
	 	 TweenLite.to('#ecran_intro_anim', 3, { opacity:"0", onComplete: function(){
			document.getElementById('ecran_intro_anim').innerHTML = "";
			home_in();
		} });		
	}
	this.skip = function(){ 
		anim_intro.stop();
		TweenLite.to('#ecran_intro_anim', 3, { opacity:"0"});	
		TweenLite.to('#video_1_container', 3, { opacity:"0"});	
		TweenLite.to('#video_2_container', 3, { opacity:"0", onComplete: function(){
			document.getElementById('ecran_intro_anim').innerHTML = "";
			home_in();
		} });	
	}
	this.start = function(){ 
		//video_1.addEventListener('canplay', function() {
			video_1.play();
		//}, false);
		console.log('play video');	
	}
	this.preload = function(){ 
		anim_intro_video1();
	}
}




// HOME CREEN ////////////////////////////////////////////////////////////////////////////////////////////


function home_in(){

	console.log('affiche_home()');	
	show_ecran("ecran_home");	
	resize_window();
	// bg
	TweenLite.fromTo('#ecran_home', 2, { opacity:"0" },{ opacity:"1" });	
	// areas items
	var home_items = document.querySelectorAll('#home_middle a');
	for (var i = 0; i < home_items.length; i++) {
		//TweenLite.fromTo(home_items[i], 1,  { opacity:"0" },{delay:0.2+i/10, opacity:"1"});
	 	home_items[i].style.opacity = 1;
	}
	// anim header
	TweenLite.fromTo('#header_biomerieux', 0.5, { opacity:"0" },{  delay:2.5, opacity:"1", ease:Strong.easeOut });
	// anim footer
	//TweenLite.fromTo('#ecran_home footer', 0.5, { bottom:"-10em" },{  delay:2, bottom:"-5", ease:Strong.easeOut });
}

function home_out(){

	console.log('home_out()');
	var home_content = document.querySelectorAll('#home_middle a');
	for (var i = 0; i < home_content.length; i++) {
	 	home_content[i].style.opacity = 0;
	}
}

// AREAS SCREEN ////////////////////////////////////////////////////////////////////////////////////////////

function area_in(idSlide){

	show_ecran("ecran_areas");
	$("#ecran_areas .area_slide").css("display","block");
	contentSwiper.resizeFix();
	contentSwiper.swipeTo(idSlide,0);
}

// SWIPPER ////////////////////////////////////////////////////////////////////////////////////////////


function init_swipper(){

	console.log('funcion init_areas');

	 // init_swipper
	contentSwiper = $('.swiper-container').swiper({
	    // options here:
	    mode:'horizontal',
	    grabCursor:'true',
	    resistance:'50%',
	    autoplay:'4000',
	    loop:'true',
	    keyboardControl:'true',
	   // autoplay:1000,
	    speed:1200, 
	    onSlideChangeStart: function(){
	    	onSlideChangeStart();
	    	console.log('start');
		},
		onSlideChangeEnd: function(){
			onSlideChangeEnd();
		}
	  });
	contentSwiper.stopAutoplay();
	resize_window();
	// next 
	doNextStep();
}

function onSlideChangeEnd(){

	console.log("onSlideChangeEnd()");
	// puces
	var tl = new TimelineLite();
	tl.pause();
	$(".swiper-slide-active a").each(function() {	
		tl.fromTo(this, 0.3, { opacity:"0", marginTop:"40px" },{opacity:"1", marginTop:"0", ease:Back.easeOut });
		});
	tl.delay(1);
	tl.play();

	//titres
	$('.swiper-slide-active .bannier_txt').addClass("active");
	$('.swiper-slide-active h1').addClass("active");
	$('.swiper-slide-active h2').addClass("active");
}

function onSlideChangeStart(){

	console.log("onSlideChangeStart()");
	//titres
	$('.swiper-slide-active .bannier_txt').removeClass("active");
	$('.area_container h1').removeClass("active");
	$('.area_container h2').removeClass("active");
	// puces	
	$(".area_slide a").css("opacity","0");	
	// footer links
	$('.swiper_link_active').removeClass('swiper_link_active');
	$('.swiper_link').eq(contentSwiper.activeIndex-1).addClass('swiper_link_active');
}

function autoplay(){

	console.log('autoplay()');
	contentSwiper.startAutoplay();
}

// FICHE ////////////////////////////////////////////////////////////////////////////////////////////


function config_fiche(fiche_file, fiche_video, fiche_testimonial){

//	$('#fiche_produit_bg').click(function(){ alert("fiche_produit_bg click"); hideFiche(); });

	/* bt close */
	var bt_close = document.getElementById('fiche_produit_bt_close');
	bt_close.onclick = function() { 
		fiche_out();
	}

	/* bt video */
	var bt_video = document.getElementById('fiche_produit_bt_video');	
	if(fiche_video=="yep"){ 
		bt_video.style.display = 'block';
		bt_video.onclick = function() {  show_fiche_video(fiche_file); 	};		
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
	//$('#fiche_produit_bt_share').attr("href", 'img/'+choosenLanguage+'/'+fiche_file+'.png');
	$('#fiche_produit_bt_share').attr("href", 'showpad://folder/445729/'+fiche_file+'.png');

}



function fiche_in(fiche_file){

	$('#fiche_video').css("display","none");
	$('#fiche_temoignage').css("display","none");
	document.getElementById('fiche_produit_bt_back').style.display = 'none';
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
	
	var myVideoContainer='';
	myVideoContainer+='<div id="fiche_video_container" class="hidden" >';
	myVideoContainer+='<video id="videoclip" controls>';
	myVideoContainer+='<source src="http://www.e-lechat.com/localhost/videos_fmla_webapp/'+videoFile+'.webm" type="video/webm">';
	myVideoContainer+='<source  src="http://www.e-lechat.com/localhost/videos_fmla_webapp/'+videoFile+'.mp4" type="video/mp4">';
	myVideoContainer+="<p>You navigator doesn't support HTML5 video!</p>";
	myVideoContainer+='</video>';
	myVideoContainer+='</div>';

	document.getElementById('fiche_video').innerHTML = myVideoContainer;

	var videoclip = document.getElementById("videoclip");
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



// DATA ////////////////////////////////////////////////////////////////////////////////////////////


function get_json(){

	/* get Json depending choosen language */

	var urlJson = "data/fmla_"+choosenLanguage+".json";
	$.getJSON(urlJson, function(data) {
		useJsonDatas(data);
	});
}

function useJsonDatas(arr) {
	JsonArray = arr;

	// insertion in swiper_area_container
	var area_html = "";
	for (var i = 0;  i <= JsonArray.areas.length - 1; i++) {
	
		area_html = "";
		area_html += '<div class="swiper-slide area_slide"> ';
		area_html += 	'<section class="bannier_txt">';
		area_html += 	'<h1>'+JsonArray.areas[i].title+'</h1>';
		area_html += 	'<h2>'+JsonArray.areas[i].subtitle+'</h2>';
		area_html += 	'</section>';
		area_html += 	'<div class="swipper_middle">';
			
			// insertion des puces
			for (var j = 0;  j <= JsonArray.areas[i].items.length - 1; j++) {
			area_html += '<a href="#" class="transition_puce bold" fiche_video="'+JsonArray.areas[i].items[j].fiche_video+'" fiche_testimonial="'+JsonArray.areas[i].items[j].fiche_testimonial+'" fiche_file="'+JsonArray.areas[i].items[j].fiche_file+'" style="left:'+JsonArray.areas[i].items[j].puce_x+'%; top:'+JsonArray.areas[i].items[j].puce_y+'%">';
			area_html += '<p>'+JsonArray.areas[i].items[j].puce_name+'</p>';
			area_html += '<div></div>';
			area_html += '</a>';
			}
		area_html += '<img src="img/area'+JsonArray.areas[i].area_num+'.jpg">';


		// area_html += 		' <video width="320" height="240">';
		// area_html += 		'	  <source src="media/area1.mp4" type="video/mp4">';
		// area_html += 		'	  <source src="movie.ogg" type="video/ogg">';
		// area_html += 		'	Your browser does not support the video tag.';
		// area_html += 		'</video> ';


		
		area_html += 	'</div>';
 		area_html += '</div>';
 		document.getElementById('swiper_area_container').innerHTML += area_html;
	};
	doNextStep();
}


// Screen switch
function show_ecran(id){

	 var ecran_intro_anim = document.getElementById('ecran_intro_anim');
	 var ecran_password = document.getElementById('ecran_password');
	 var ecran_home = document.getElementById('ecran_home');
	var ecran_welcome = document.getElementById('ecran_welcome');
	var fiche_container = document.getElementById('fiche_container');
	 var fiche_produit_bg = document.getElementById('fiche_produit_bg');
	 var ecran_areas = document.getElementById('ecran_areas');
	 var border_bottom = document.getElementById('border_bottom');

	 ecran_intro_anim.style.display = "none";
	 ecran_password.style.display = "none";
	 ecran_home.style.display = "none";
	 ecran_welcome.style.display = "none";
	 fiche_container.style.display = "none";
	 fiche_produit_bg.style.display = "none";
	 ecran_areas.style.display = "none";
	 border_bottom.style.display = "block";

	 console.log('show_ecran : '+id);
	 switch(id){
	 	case "ecran_welcome": 
	 		ecran_welcome.style.display = 'block';
	 		TweenLite.fromTo(ecran_welcome, 1, { opacity:"0" },{  opacity:"1" });
	 	break;
	 	case "ecran_intro_anim": 
	 		border_bottom.style.display = "none";
	 		ecran_intro_anim.style.display = "block";
	 	break;
	 	case "ecran_home": 				
	 		ecran_home.style.display = "block";
	 		TweenLite.fromTo(ecran_home, 1, { opacity:"0" },{  opacity:"1" });

	 	break;
	 	case "ecran_areas": 
	 		ecran_areas.style.display = "block";
	 		TweenLite.fromTo(ecran_areas, 1, { opacity:"0" },{  opacity:"1" });
	 	break;
	 }		
}





// verfi password

function verif_password(){


	if(document.getElementById('password_field').value=="fmla"){ alert("Web-app FMLA / Work in progress"); intro_in();}
	else{  document.getElementById('password_field').value==""; }
}




// resize
function resize_window(){


var body = document.body,
    html = document.documentElement;

var dysplay_height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
var dysplay_width = Math.max( body.scrollWidth, body.offsetWidth, 
                       html.clientWidth, html.scrollWidth, html.offsetWidth );


console.log(dysplay_width+"/"+dysplay_height);
        
    var fixedHeight = Math.min(
        $(window).height(), // This is smaller on Desktop
        window.innerHeight || Infinity // This is smaller on iOS7
    );
    $('body').height(fixedHeight);
    $('html').height(fixedHeight);

	if(dysplay_width<dysplay_height){ $('#ecran_loader').css("display","block"); }
	else{ 
		$('#ecran_loader').css("display","none");
		 }


	console.log("resize_window");
	/* home pahe */
	$("#home_middle").css("width",  Math.round( $("#home_middle" ).height()*1.9)+"px"  );
	$("#ecran_home #home_middle a.resize").css("width",  Math.round( $("#ecran_home #home_middle a").height()*1.6 )+"px"  );
	
	$(".redim_169").css("width",   Math.round( $(this).height()*1.5)+"px"  );
	$(".swipper_middle").css("width",   Math.round( $(".swipper_middle").height()*1.6)+"px"  );
	//$("#fiche_produit").css("width",  Math.round( $("#fiche_produit").height()*2 )+"px"  );
	//$("#fiche_container").css("width",  Math.round( $("#fiche_container").height()*1.77777 )+"px"  );

}

function main_reset(){
	window.location.reload();
}

// init
$( document ).ready(function() { 	initMain(); });







