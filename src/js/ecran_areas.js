

// AREAS SCREEN ////////////////////////////////////////////////////////////////////////////////////////////

function area_in(idSlide){

	show_ecran("ecran_areas");
	$("#ecran_areas .area_slide").css("display","block");
	contentSwiper.resizeFix();
	contentSwiper.swipeTo(idSlide,0);		
	oo_slider.onSlideChangeEnd();
	config_nav();
}


function config_nav(){

		document.getElementById('bt_home').onclick = function() {  main_goto_home(); };
	//	document.getElementById('bt_sample').onclick = function() {  main_goto_intro(); };
	//	document.getElementById('bt_decision').onclick = function() {  main_goto_intro(); };
		document.getElementById('areas_header_biomerieux').onclick = function() {  main_reset(); };
}


// SWIPPER ////////////////////////////////////////////////////////////////////////////////////////////


var obj_slider = function(){

	this.init = function(){ 

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
		    speed:1000, 
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
/*
	this.show_infoBulle = function(){
		
		TweenLite.to( '#info_bulle' , 2, { left:"500px" });
	}
*/
	this.onSlideChangeEnd = function(){
		onSlideChangeEnd();
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

	this.autoplay = function(){

		console.log('autoplay()');
		contentSwiper.startAutoplay();
	}
}




