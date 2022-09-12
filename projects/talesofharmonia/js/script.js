var overlay = document.getElementsByClassName("overlay")[0];
var overlayVisible = false;

$(window).on('load resize', function(){
    $('.page').height($(this).height());
});

$(document).ready(function() {
	        $('.menuLink').bigSlide({easyClose: true, menuWidth: '20em'});
	    });

let myElements = document.querySelectorAll(".mobile");

if (window.innerWidth < 800) {
   for (let i = 0; i < myElements.length; i++) {
      myElements[i].classList.add("display");
      myElements[i].style.display = "block";
   }
}
else {
   for (let i = 0; i < myElements.length; i++) {
      myElements[i].classList.remove("display");
      myElements[i].style.display = "none";
   }
}

function checkScreenHeight() {
   if (window.innerHeight < 580){
   alert("Screen height too low. You may not be able to view the website as intended.");
}
}

window.setInterval(checkScreenHeight, 5000);

$(".main").onepage_scroll({
   sectionContainer: ".display",     // sectionContainer accepts any kind of selector in case you don't want to use section
   easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
   animationTime: 700,             // AnimationTime let you define how long each section takes to animate
   pagination: false,                // You can either show or hide the pagination. Toggle true for show, false for hide.
   updateURL: true,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
   beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
   afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
   loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
   keyboard: false,                  // You can activate the keyboard controls
   responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                    // the browser's width is less than 600, the fallback will kick in.
   direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
});

function showOverlay() {
	if (!overlayVisible) {
      // if ($("div").hasClass("overlay")){
         //overlay.style.display = "block";
         $('.overlay').toggleClass("overlay-back");
         $('.overlay').toggleClass("overlay-forward");
      // }
      // else{
      //    $('.overlay-active').toggleClass("overlay");
      //    $('overlayID').removeClass("overlay-active");
      // }
		overlayVisible = true;
	}
	else{
		hideOverlay();
	}
}

// console.log(window.innerWidth);

function hideOverlay() {
	// overlay.style.display = "none";
   $('.overlay').toggleClass("overlay-back");
   $('.overlay').toggleClass("overlay-forward");
   //overlay.style.display = "none";
	overlayVisible = false;
}

function home() {
   $(".main").moveTo(1);
}


// var form = document.querySelector('.pageclip-form')
// Pageclip.form(form, {
//   onSubmit: function (event) { },
//   onResponse: function (error, response) { },
//   successTemplate: '<span id="send">Thank you for your inquiry! I will be in touch with you shortly.</span>'
// })