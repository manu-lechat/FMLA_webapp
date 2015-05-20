
var anim_intro = function(){

	var anim_intro;
	console.log('init anim_intro Obj');



	this.init = function(){ 
		// change image src en fonction de la langue choisie
		document.getElementById("visuB1").src = "img/"+choosenLanguage+"/intro_visu1.png";
		document.getElementById("visuC1").src = "img/"+choosenLanguage+"/visuel_triCycle.png";
		document.getElementById("visuC2").src = "img/"+choosenLanguage+"/visuel_triCycle_suite.png";	
	}


	function anim_intro_timeline(){

		// PARTIE TIMELINE /////////////////////////////
		// Timeline animation des textes / images

		console.log('anim_intro_timeline()');
		anim_intro = new TimelineMax( {onComplete:completeTimeline, paused: true });

		anim_intro.to("#txtA1", 2, {delay:1, opacity:"1" }, "phase1");
		anim_intro.to("#txtA2", 1, { opacity:"1", marginLeft:"50px", ease:Back.easeOut }, "phase1+=3");
		anim_intro.to("#txtA3", 1, { opacity:"1",marginRight:"50px", ease:Back.easeOut }, "phase1+=4");
		anim_intro.to("#txtA4", 1, { opacity:"1",marginLeft:"50px", ease:Back.easeOut} , "phase1+=5");
		
		anim_intro.to("#txtA4", 0.2, { delay:2, opacity:"0" });
		anim_intro.to("#txtA3", 0.2, { opacity:"0" });
		anim_intro.to("#txtA2", 0.2, { opacity:"0" });
		anim_intro.to("#txtA1", 0.2, { opacity:"0" }); 

		anim_intro.to("#txtB1", 0.8, {opacity:"1" }, "phase2");
		anim_intro.to("#txtB1A", 0.8, {opacity:"1" }, "phase2");
		anim_intro.to("#txtB1B", 0.8, {opacity:"1" }, "phase2");
		
		anim_intro.to("#txtB2", 1, { delay:1, opacity:"1", marginRight:"0" }, "phase3");
		anim_intro.to("#txtB2A", 0.5, { delay:0, opacity:"1", marginRight:"0" }, "phase3+=1");
		anim_intro.to("#txtB2B", 0.5, { delay:1, opacity:"1", marginLeft:"0" }, "phase3+=1.5");
		anim_intro.to("#visuB1", 0.5, { opacity:"1" }, "phase3");		
		
		anim_intro.to("#visuB1", 0.5, { delay:4, opacity:"0" });
		anim_intro.to("#txtB2", 0.5, { opacity:"0" }, "phase4");
		anim_intro.to("#txtB2A", 0.5, { opacity:"0" }, "phase4");
		anim_intro.to("#txtB2B", 0.5, { opacity:"0" }, "phase4");
		anim_intro.to("#txtB1A", 0.2, { opacity:"0" }, "phase4");
		anim_intro.to("#txtB1B", 0.2, { opacity:"0" }, "phase4");


		anim_intro.to("#txtC1", 0.5, {opacity:"1" });
		anim_intro.to("#txtC2", 0.5, {opacity:"1" });
		anim_intro.fromTo("#visuC1", 1, { scale:0.8},{opacity:"1", scale:1 });
		anim_intro.fromTo("#visuC2", 1, { scale:1.2 },{delay:1,  opacity:"1", scale:1 });

		anim_intro.to("#visuC2", 1, { delay:7, opacity:"0" });
		anim_intro.to("#visuC1", 1, { opacity:"0" });
		anim_intro.to("#txtC2", 0.5, { opacity:"0" });
		anim_intro.to("#txtC1", 0.5, { opacity:"0" , onComplete:function(){ the_end();	 } });


		anim_intro.autoRemoveChildren = true;
		anim_intro.delay(3);
	
		anim_intro.play();

		setTimeout(function () {$(".container_txt").css("display", "block" );}, 3000);

		function completeTimeline(){  }
	}
 
	function the_end(){ 
	 	 TweenLite.to('#ecran_intro_anim', 1, { opacity:"0", onComplete: function(){
			ecran_intro_out();
		} });		
	}

	this.skip = function(){ 
		anim_intro.stop();
	 	ecran_intro_out();
	}

	this.start = function(){ 

		console.log('anim.start()');
		var video_1 = document.getElementById("video_1"); 

		video_1.addEventListener('play', function() {
			document.getElementById('ecran_loader').style.display = "none";
			document.getElementById("video_1_container").className = "";
			TweenLite.to("#video_1_container", 2, { delay:1,opacity:"1" });
			TweenLite.to("#video_1", 2, {delay:1, opacity:"1" });

		}, false);

		video_1.play(); 
		anim_intro_timeline();
	}

	this.preload = function(){ 

		console.log("anim_intro.preload()");
		document.getElementById("video_1").pause();
	}
}
