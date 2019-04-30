window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    document.getElementById("top_button").style.display = "block";
  } else {
    document.getElementById("top_button").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function externalLinks() { for(var c = document.getElementsByTagName("a"), a = 0;a < c.length;a++) { var b = c[a]; b.getAttribute("href") && b.hostname !== location.hostname && (b.target = "_blank") } } ; 
externalLinks();

var options = {
  strings: ["I AM HARDWORKING.", "I AM A GOOD LEADER.", "I AM A TEAM PLAYER.", "I AM ADAPTABLE.", "I AM CREATIVE.", "I AM A GOOD LISTENER.", "I AM GEET!"],
  typeSpeed: 80,
  backSpeed: 40,
  backDelay: 1000,
  loop: true,
  smartBackspace: true,
  startDelay: 1500
}

var typed = new Typed("#textrotation", options);

