
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
			area_html += '<a href="#" class="transition_puce bold" fiche_video="'+JsonArray.areas[i].items[j].fiche_video+'"  fiche_video_showpad="'+JsonArray.areas[i].items[j].fiche_video_showpad+'"  fiche_testimonial="'+JsonArray.areas[i].items[j].fiche_testimonial+'" fiche_file="'+JsonArray.areas[i].items[j].fiche_file+'" style="left:'+JsonArray.areas[i].items[j].puce_x+'%; top:'+JsonArray.areas[i].items[j].puce_y+'%">';
			area_html += '<p>'+JsonArray.areas[i].items[j].puce_name+'</p>';
			area_html += '<div></div>';
			area_html += '</a>';
			}
		if(i==8){ 	
			// pour le seul qui est en Gif, une petite exception
			area_html += '<img src="img/'+choosenLanguage+'/area9.gif">'; 

		}	
		else{ 		area_html += '<img src="img/'+choosenLanguage+'/area'+JsonArray.areas[i].area_num+'.jpg">'; }



		// area_html += 		' <video width="320" height="240">';
		// area_html += 		'	  <source src="media/area1.mp4" type="video/mp4">';
		// area_html += 		'	  <source src="movie.ogg" type="video/ogg">';
		// area_html += 		'	Your browser does not support the video tag.';
		// area_html += 		'</video> ';


		
		area_html += 	'</div>';
 		area_html += '</div>';
 		document.getElementById('swiper_area_container').innerHTML += area_html;
	};
	console.log("useJsonDatas DONE");
	inject_jSon();

}


function inject_jSon(){

	// vars
	console.log("inject_jSon_vars()");
	url_videos_online = JsonArray.url_videos_online;
	url_videos_showpad = JsonArray.url_videos_showpad;
	url_videos_local = JsonArray.url_videos_local;
	url_fiches_showpad = JsonArray.url_fiches_showpad;

	// texts
	$('.json_txtA1').html(JsonArray.txtA1);
	$('.json_txtA2').html(JsonArray.txtA2);
	$('.json_txtA3').html(JsonArray.txtA3);
	$('.json_txtA4').html(JsonArray.txtA4);
	$('.json_txtB1A').html(JsonArray.txtB1A);
	$('.json_txtB1B').html(JsonArray.txtB1B);
	$('.json_txtB2A').html(JsonArray.txtB2A);
	$('.json_txtB2B').html(JsonArray.txtB2B);
	$('.json_txtC1').html(JsonArray.txtC1);
	$('.json_txtC2').html(JsonArray.txtC2);
	$('.json_txtH1A').html(JsonArray.txtH1A);
	$('.json_txtH1B').html(JsonArray.txtH1B);
	$('.json_txtH2A').html(JsonArray.txtH2A);
	$('.json_txtH2B').html(JsonArray.txtH2B);
	$('.json_txtFnav0').html(JsonArray.txtFnav0);
	$('.json_txtFnav1').html(JsonArray.txtFnav1);
	$('.json_txtFnav2').html(JsonArray.txtFnav2);
	$('.json_txtFnav3').html(JsonArray.txtFnav3);
	$('.json_txtFnav4').html(JsonArray.txtFnav4);
	$('.json_txtFnav5').html(JsonArray.txtFnav5);
	$('.json_txtFnav6').html(JsonArray.txtFnav6);
	$('.json_txtFnav7').html(JsonArray.txtFnav7);
	$('.json_txtFnav8').html(JsonArray.txtFnav8);
	$('.json_txtFbA1').html(JsonArray.txtFbA1);
	$('.json_txtFbA2').html(JsonArray.txtFbA2);
	$('.json_txtFbB1').html(JsonArray.txtFbB1);
	$('.json_txtFbB2').html(JsonArray.txtFbB2);
	$('.json_txtBtVideo').html(JsonArray.txtBtVideo);
	$('.json_txtBtTesti').html(JsonArray.txtBtTesti);

	$('#home_a9').html(JsonArray.areas[8].title);
	$('#home_a10').html(JsonArray.areas[9].title);
	
	console.log("inject_jSon_txt DONE");
	jsonEngine_end();
}
