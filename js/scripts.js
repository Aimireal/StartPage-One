// Load the feeds
$('#tweakers').FeedEk( {
	FeedUrl : 'https://tweakers.net/feeds/nieuws.xml',
	MaxCount : 40,
	ShowDesc : false,
	ShowPubDate : false,
	TitleLinkTarget:'_self',
	DescCharacterLimit:1,
});
$('#nos').FeedEk( {
	FeedUrl : 'http://feeds.nos.nl/nosjournaal',
	MaxCount : 40,
	ShowDesc : false,
	ShowPubDate : false,
	TitleLinkTarget:'_self',
});
$('#nu').FeedEk( {
	FeedUrl : 'http://www.nu.nl/rss/Algemeen',
	MaxCount : 40,
	ShowDesc : false,
	ShowPubDate : false,
	TitleLinkTarget:'_self',
});
$('#prequelDate').FeedEk( {
	FeedUrl: 'http://www.prequeladventure.com/feed/',
	MaxCount : 1,
	ShowDesc : false,
	ShowPubDate : true,
	DateFormat: 'YYYY/MM/DD',
});
$("#whatifDate").FeedEk( {
    FeedUrl : 'http://what-if.xkcd.com/feed.atom',
	MaxCount : 1,
	ShowDesc : false,
	ShowPubDate : true,
	DateFormat: 'YYYY/MM/DD',
});
$('#xkcdDate').FeedEk( {
    FeedUrl : 'http://xkcd.com/rss.xml',
	MaxCount : 1,
	ShowDesc : false,
	ShowPubDate : true,
	DateFormat: 'YYYY/MM/DD',
});

function populateTodo() {
    	// Populate todo box
	var todo = localStorage.getItem("todo"); 
	document.getElementById('todobox').innerHTML = todo;
}

// Determine current date
var date = new Date();
var day = date.getDay();
var currentmonth = parseInt(date.getMonth()+1,10);
var currentdate = date.getDate();

function updateDate() {
    date = new Date();
    day = date.getDay();
    currentmonth = parseInt(date.getMonth()+1,10);
    currentdate = date.getDate();
}

// I'm so not going to refactor this.
$(window).load(function(){
    populateTodo();
    updateDate();
	
	// Display Prequel after an update
    var prequelDate_raw = document.querySelector('#prequelDate').querySelector('.itemDate').innerHTML;
	var prequelRegex = prequelDate_raw.match(/(\d+)/g);
    var prequelYear = parseInt(prequelRegex[0], 10);
	var prequelMonth = parseInt(prequelRegex[1], 10);
	var prequelDay = parseInt(prequelRegex[2], 10);
    //window.alert("Prequel\nDay: " + prequelDay + "\nMonth: " + prequelMonth);
    
    var xkcdDate_raw = document.querySelector('#xkcdDate').querySelector('.itemDate').innerHTML;
	var xkcdRegex = xkcdDate_raw.match(/(\d+)/g);
    var xkcdYear = parseInt(xkcdRegex[0], 10);
	var xkcdMonth = parseInt(xkcdRegex[1], 10);
	var xkcdDay = parseInt(xkcdRegex[2], 10);
    //window.alert("XKCD\nDay: " + xkcdDay + "\nMonth: " + xkcdMonth);    
    
    var whatifDate_raw = document.querySelector('#whatifDate').querySelector('.itemDate').innerHTML;
	var whatifRegex = whatifDate_raw.match(/(\d+)/g);
    var whatifYear = parseInt(whatifRegex[0], 10);
	var whatifMonth = parseInt(whatifRegex[1], 10);
	var whatifDay = parseInt(whatifRegex[2], 10);
    //window.alert("What If\nDay: " + whatifDay + "\nMonth: " + whatifMonth);
    
	if ((prequelMonth == currentmonth) && (currentdate >= prequelDay) && (currentdate <= prequelDay+2)) {
		document.getElementById("prequelContainer").style.display="inline";
		$('#prequel').FeedEk( {
			FeedUrl: 'http://ftr.fivefilters.org/makefulltextfeed.php?url=http://www.prequeladventure.com/feed/', // I am a terrible person.
			MaxCount : 1,
			ShowDesc : true,
			ShowPubDate : false,
			TitleLinkTarget:'_self',
		});
		
		//Point fetched images to absolute address instead of relative, broken address
		// $(document).ready(function () {
		// 	var itemContentPresent = false;
		// 	function checkForItemContent() {
		// 		itemContentPresent = ($('.itemContent').length > 0) ? true : false;
		// 		if (itemContentPresent) {
		// 			$('#prequel').find('img').each(function() {
		// 				var newSrc = 'http://www.prequeladventure.com' + $(this).attr('src');
		// 				$(this).attr('src', newSrc);
		// 			});
		// 			window.clearInterval(doCheck); 
		// 		}
		// 	}
		// 	var doCheck = window.setInterval(checkForItemContent, 250);
		// });
	}
	
	// Change NOS links from desktop to mobile
	/*$("a[href^='http://feeds.nos.nl']").each(function() { 
		this.href = this.href.replace(/^http:\/\/feeds\.nos\.nl\/(.*)\//, "http://m.nos.nl/artikel/");
	});*/

	// XKCD content, WhatIf content
	if (currentmonth == xkcdMonth && currentdate == xkcdDay) {
		$('#xkcd').FeedEk( {
			FeedUrl : 'https://xkcd.com/rss.xml',
			MaxCount : 1,
			ShowPubDate : false,
			TitleLinkTarget:'_self',
		});
		document.getElementById("xkcdContainer").style.display="inline";
	}
	if (currentmonth == whatifMonth && currentdate <= whatifDay) {
		$("#whatif").FeedEk( {
			FeedUrl : 'http://what-if.xkcd.com/feed.atom',
			MaxCount : 1,
			ShowPubDate : false,
			TitleLinkTarget:'_self',
			ShowDesc : false,
			ShowEnc : true
		});
		document.getElementById("whatifContainer").style.display="inline";
		$(document).ready(function () {
			var itemContentPresent = false;
			function checkForItemContent() {
				itemContentPresent = ($('.itemContent').length > 0) ? true : false;
				if (itemContentPresent) {
					$('#whatif').find('img').each(function() {
						var newSrc = 'http://what-if.xkcd.com' + $(this).attr('src');
						$(this).attr('src', newSrc);
					});
					window.clearInterval(doCheck); 
				}
			}
			var doCheck = window.setInterval(checkForItemContent, 250);
		});
	}
});

// Header title/weather panel switching
var wide = window.matchMedia( "screen and (min-width: 840px)" );
function toggleVisibility(id1, id2) {
	var hide = document.getElementById(id1);
	var show = document.getElementById(id2);
	hide.style.height = '0px';
	hide.style.overflow = 'hidden';
    
	if (wide.matches){
		show.style.height = '130px';
	}
	else {
		show.style.height = '80px';
	}
}

// Only load weather on click
function loadWeather() {
	$.simpleWeather({
		woeid: '729028', // Eindhoven, The Netherlands
		unit: 'c',
		success: function(weather) {
			html = '<p>'+weather.city+'<br />';
			html += weather.temp+'&deg;'+weather.units.temp+'<br />';
			html += weather.currently+'</p>';
			$("#weather").html(html);
		},
		error: function(error) {
			$("#weather").html('<p>'+error+'</p>');
		}
	});
	
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			loadWeatherPos(position.coords.latitude+','+position.coords.longitude);
		});
        
        function loadWeatherPos(location, woeid) {
            $.simpleWeather({
                location: location,
                woeid: woeid,
                unit: 'c',
                success: function(weather) {
                    html = '<p>'+weather.city+'<br />';
                    html += weather.temp+'&deg;'+weather.units.temp+'<br />';
                    html += weather.currently+'</p>';
                    $("#weather2").html(html);
                },
                error: function(error) {
                $("#weather2").html('<p>'+error+'</p>');
                }
            });
        }
	}
}

var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
$('.searchContainer').bind(mousewheelevt, function(e){

    var evt = window.event || e //equalize event object     
    evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
    var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

	var search_0 = document.getElementById("search_0");
	var search_1 = document.getElementById("search_1");
	var search_2 = document.getElementById("search_2");

	// p sure this aint optimal
    if(delta > 0) {
		// Scroll up
		prevSearch();
    }
    else{
		// Scroll down
		nextSearch();
    }   
});

function prevSearch() {
	if ($(".search_0").height() != 0) {
		$(".search_0").removeClass("searchView");
		$("#dot_0").removeClass("current");

		$(".search_2").addClass("searchView");
		$("#dot_2").addClass("current");
		$(".search_2_i").focus();
		return;
	}
	if ($(".search_1").height() != 0) {
		$(".search_1").removeClass("searchView");
		$("#dot_1").removeClass("current");

		$(".search_0").addClass("searchView");
		$("#dot_0").addClass("current");
		$(".search_0_i").focus();
		return;
	}
	if ($(".search_2").height() != 0) {
		$(".search_2").removeClass("searchView");
		$("#dot_2").removeClass("current");

		$(".search_1").addClass("searchView");
		$("#dot_1").addClass("current");
		$(".search_1_i").focus();
		return;
	}
}
function nextSearch() {
	if ($(".search_0").height() != 0) {
		$(".search_0").removeClass("searchView");
		$("#dot_0").removeClass("current");

		$(".search_1").addClass("searchView");
		$("#dot_1").addClass("current");
		$(".search_1_i").focus();
		return;
	}
	if ($(".search_1").height() != 0) {
		$(".search_1").removeClass("searchView");
		$("#dot_1").removeClass("current");

		$(".search_2").addClass("searchView");
		$("#dot_2").addClass("current");
		$(".search_2_i").focus();
		return;
	}
	if ($(".search_2").height() != 0) {
		$(".search_2").removeClass("searchView");
		$("#dot_2").removeClass("current");

		$(".search_0").addClass("searchView");
		$("#dot_0").addClass("current");
		$(".search_0_i").focus();
		return;
	}
}

function selectSearch(searchNr) {
	switch (searchNr) {
		case 0:
			$(".search_0").addClass("searchView");
			$("#dot_0").addClass("current");

			$(".search_1").removeClass("searchView");
			$(".search_2").removeClass("searchView");
			$("#dot_1").removeClass("current");
			$("#dot_2").removeClass("current");
			//$(".search_0_i").focus();
			break;
		case 1:
			$(".search_1").addClass("searchView");
			$("#dot_1").addClass("current");

			$(".search_0").removeClass("searchView");
			$(".search_2").removeClass("searchView");
			$("#dot_0").removeClass("current");
			$("#dot_2").removeClass("current");
			//$(".search_1_i").focus();
			break;
		case 2:
			$(".search_2").addClass("searchView");
			$("#dot_2").addClass("current");

			$(".search_1").removeClass("searchView");
			$(".search_0").removeClass("searchView");
			$("#dot_1").removeClass("current");
			$("#dot_0").removeClass("current");
			//$(".search_2_i").focus();
			break;
	}
}

$('.searchContainer').on( 'mousewheel DOMMouseScroll', function ( e ) {
    var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;

    this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
    e.preventDefault();
});

// Blur the background, works on Gecko and WebKit browsers.
function toggleBlur(){
	if ( getCookie('blur') != 'true' ) {
		document.cookie='blur=true';
	} else {
		document.cookie='blur=false';
	}
	location.reload();
	// window.alert(getCookie('blur'));
}
if (getCookie('blur') == 'true') {
	document.getElementById('bg').style.filter = 'url(img/blur.svg#blur)';
	document.getElementById('bg').style.WebkitFilter = 'url(img/blur.svg#blur)';
}

// JavaScript cookie parsing
function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}

// Saves text from Todo to JS cookie
function saveTodo(){
	var todotext=document.getElementById('todobox').value;
	localStorage.setItem("todo", todotext);				
}

// http://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
function getAverageRGB(imgEl) {
    
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;
        
    if (!context) {
        return defaultRGB;
    }
    
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
    height = height / 10;
    
    context.drawImage(imgEl, 0, 0);
        
    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        //alert('Does not work.');
        return defaultRGB;
    }
    
    length = data.data.length;
    
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
    
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    
    return rgb;
}
