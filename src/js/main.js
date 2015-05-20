"use strict";


var contexte_app = "showpad"; // showpad / online // ou local
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
var oo_ecran_welcome;
var oo_ecran_intro;
var oo_ecran_home;
var oo_slider;
var info_bulle = document.getElementById('info_bulle')
var url_videos_online = "defined in jSon file";
var url_videos_showpad = "defined in jSon file";
var url_videos_local = "defined in jSon file";
var url_fiches_showpad = "defined in jSon file";

// Main init

function initMain() {

	console.log("init main");
	resize_window();
	window.addEventListener("resize", resize_window);
	oo_ecran_welcome = new obj_ecran_welcome();
	oo_ecran_intro = new anim_intro();
	oo_ecran_home = new ecran_home();
	oo_slider = new obj_slider();
	doNextStep();
}

function doNextStep() {

	currentStep++;
	console.log('doNextStep' + currentStep);
	switch (currentStep) {
		case 1:
			// Step 1 -> 	Affichage de l'ecran d'accueil + préchargement de l'intro
			//				le step 2 sera appelé au click sur bienvenue 
			oo_ecran_welcome.init();
			show_ecran('ecran_welcome');
			oo_ecran_intro.preload();
			break;
		case 2:
			oo_slider.init();
			config_all();
			intro_anim_in();
			oo_ecran_intro.init();
			break;
	}
}



function ecran_welcome_end() {

	// apres l'ecran welcome, 
	// on a identifié la langue, on charge donc le Json
	// en fon de process on récupérera jsonEngine_end();
	get_json();
}



function jsonEngine_end() {

	doNextStep();
}



function intro_anim_in() {

	console.log('intro_anim_in()');
	show_ecran('ecran_intro_anim');
	oo_ecran_intro.start();
}


function ecran_intro_out() {

	show_ecran("ecran_home");
	oo_ecran_home.init();
	document.getElementById('ecran_intro_anim').innerHTML = "";
}

function main_goto_home() {

	show_ecran("ecran_home");
	oo_ecran_home.init();
}

function main_goto_intro() {

	show_ecran('ecran_intro_anim');
	oo_ecran_intro.start();
}



// CONFIG CLICS ////////////////////////////////////////////////////////////////////////////////////////////



function config_all() {


	console.log('config_all()');

	/* intro  */ ////////////////////////////////////////////////////
	document.getElementById('bt_skip').onclick = function() {
		oo_ecran_intro.skip();
	};

	/* home  */ ////////////////////////////////////////////////////
	document.getElementById('header_biomerieux').onclick = function() {
		main_reset();
	};
	var liens_home = document.querySelectorAll('#home_middle a');
	for (var i = 0; i < liens_home.length; i++) {
		liens_home[i].onclick = function() {
			console.log(this+' lien home clicked ');
			area_in(this.getAttribute('slideToShow'));
			resize_window();
			oo_ecran_home.home_out();
			oo_slider.onSlideChangeEnd();
		};
	}

	document.getElementById('bt_play').onclick = function() {
		
		console.log(this+' bt_play clicked ');
		area_in(0);
		resize_window();
		oo_ecran_home.home_out();
		oo_slider.onSlideChangeEnd();
		oo_slider.autoplay();
	};

	/* area screen  */ ////////////////////////////////////////////////////
	var swiper_link = document.querySelectorAll('a.swiper_link');
	for (var i = 0; i < swiper_link.length; i++) {
		swiper_link[i].onclick = function() {
			contentSwiper.stopAutoplay();
			contentSwiper.swipeTo(this.getAttribute('slideToShow'), 1000);
		};
	}
	for (var i = 0; i < swiper_link.length; i++) {
		swiper_link[i].onmouseover = function() {
			console.log(this.getAttribute('alt'));
		};
	}

	// puces
	var area_puces = document.querySelectorAll('.area_slide a');
	for (var i = 0; i < area_puces.length; i++) {
		area_puces[i].onclick = function() {
			config_fiche(this.getAttribute("fiche_file"), this.getAttribute("fiche_video"), this.getAttribute("fiche_video_showpad"), this.getAttribute("fiche_testimonial"));
			fiche_in(this.getAttribute("fiche_file"));
		};
	}

	/* config done, play */
	doNextStep();
}


// Screen switch
function show_ecran(id) {

	console.log('show_ecran : ' + id);
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
	// border_bottom.style.display = "block";

	switch (id) {
		case "ecran_welcome":
			ecran_welcome.style.display = 'block';
			TweenLite.fromTo(ecran_welcome, 1, {
				opacity: "0"
			}, {
				opacity: "1"
			});
			break;
		case "ecran_intro_anim":
			border_bottom.style.display = "none";
			ecran_intro_anim.style.display = "block";
			break;
		case "ecran_home":
			ecran_home.style.display = "block";
			TweenLite.fromTo(ecran_home, 1, {
				opacity: "0"
			}, {
				opacity: "1"
			});

			break;
		case "ecran_areas":
			ecran_areas.style.display = "block";
			TweenLite.fromTo(ecran_areas, 1, {
				opacity: "0"
			}, {
				opacity: "1"
			});
			break;
	}
}



// resize
function resize_window() {
	var body = document.body,
		html = document.documentElement;

	var dysplay_height = Math.max(body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight, html.offsetHeight);
	var dysplay_width = Math.max(body.scrollWidth, body.offsetWidth,
		html.clientWidth, html.scrollWidth, html.offsetWidth);

	console.log("main.resize_window() : " + dysplay_width + "/" + dysplay_height);

	if (dysplay_width < dysplay_height) {
		$('#ecran_loader').css("display", "block");
	} else {
		$('#ecran_loader').css("display", "none");
	}
	var fixedHeight = Math.min(
	 	$(window).height(), // This is smaller on Desktop
	 	window.innerHeight || Infinity // This is smaller on iOS7
	 );
	$('body').height(fixedHeight);
	$('html').height(fixedHeight);
	
	$(".redim_169").css("width", Math.round($(this).height() * 1.5) + "px");
	$(".swipper_middle").css("width", Math.round($(".swipper_middle").height() * 1.6) + "px");
}

function resize_window_bak() {



	// calage de la vidéo d'intro pour fixer le bug Ios7
	//$("#video_1").css("min-width",   Math.round( dysplay_width  )+"px"  );
	//$("#video_1").css("min-height",   Math.round( dysplay_height  )+"px"  );

	// var fixedHeight = Math.min(
	// 	$(window).height(), // This is smaller on Desktop
	// 	window.innerHeight || Infinity // This is smaller on iOS7
	// );
	//$('body').height(fixedHeight);
	//$('html').height(fixedHeight);

	//$("#fiche_produit").css("width",  Math.round( $("#fiche_produit").height()*2 )+"px"  );
	//$("#fiche_container").css("width",  Math.round( $("#fiche_container").height()*1.77777 )+"px"  );

}

function main_reset() {
	window.location.reload();
}

// init
$(document).ready(function() {
	initMain();
});