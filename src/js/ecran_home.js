// HOME CREEN ////////////////////////////////////////////////////////////////////////////////////////////

var ecran_home = function() {


	this.init = function() {

		console.log('ecran_home.init() ');
		// init Visuels en fonction de la langue choisie
		$('#home_a1').css("background-image", "url('img/" + choosenLanguage + "/area1_home.png')");
		$('#home_a2').css("background-image", "url('img/" + choosenLanguage + "/area2_home.png')");
		$('#home_a3').css("background-image", "url('img/" + choosenLanguage + "/area3_home.png')");
		$('#home_a4').css("background-image", "url('img/" + choosenLanguage + "/area4_home.png')");
		$('#home_a5').css("background-image", "url('img/" + choosenLanguage + "/area5_home.png')");
		$('#home_a6').css("background-image", "url('img/" + choosenLanguage + "/area6_home.png')");
		$('#home_a7').css("background-image", "url('img/" + choosenLanguage + "/area7_home.png')");
		$('#home_a8').css("background-image", "url('img/" + choosenLanguage + "/area8_home.png')");
		$('#home_a9').css("background-image", "url('img/" + choosenLanguage + "/area9_home.png')");
		$('#home_a10').css("background-image", "url('img/" + choosenLanguage + "/area10_home.png')");
		config_nav();
		home_in();
	}

	function config_nav() {

		document.getElementById('areas_header_biomerieux').onclick = function() {
			main_reset();
		};
	}

	function home_in() {

		console.log('ecran_home.home_in()');
		// redim home
		$("#home_middle").css("width", Math.round($("#home_middle").height() * 1.9) + "px");
		$("#ecran_home #home_middle a.resize").css("width", Math.round($("#ecran_home #home_middle a").height() * 1.4) + "px");

		// bg
		TweenLite.fromTo('#ecran_home', 2, {
			opacity: "0"
		}, {
			opacity: "1"
		});
		// areas items
		var home_items = document.querySelectorAll('#home_middle a');
		for (var i = 0; i < home_items.length; i++) {
			home_items[i].style.opacity = 1;
		}
		// anim header
		TweenLite.to('#header_biomerieux', 0.5,{ delay:1, top:"0px", opacity:"1" });
		TweenLite.to('#txtH1A', 0.5,{  delay:2.5, marginLeft:"0px", opacity:"1" });
		TweenLite.to('#txtH1B', 0.5, {  delay:3, marginLeft:"0.2em", opacity:"1" });
		TweenLite.to('#txtH2A', 0.5, {  delay:3.5, marginLeft:"0px", opacity:"1"});
		TweenLite.to('#txtH2B', 0.5, {  delay:4, marginLeft:"0.2em", opacity:"1"});
		TweenLite.to('#bt_play', 0.5, {  delay:4, top:"0px", opacity:"1" });
	}

	this.home_out = function() {

		console.log('home_out()');
		var home_content = document.querySelectorAll('#home_middle a');
		for (var i = 0; i < home_content.length; i++) {
			home_content[i].style.opacity = 0;
		}
	}

}