window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    document.getElementById("top_button").style.display = "block";
  } else {
    document.getElementById("top_button").style.display = "none";
  }
}

var modal = document.getElementById('designModal');

// get design elements
var grumble = document.getElementById('grumble');
var scanscript = document.getElementById('scanscript');
var pulse = document.getElementById('pulse');
var chestnotesBrochure = document.getElementById('chestnotesBrochure');
var chestnotesPoster = document.getElementById('flexposter1');
var council = document.getElementById('flexposter2');

var modalImg = document.getElementById("modalImg");
grumble.onclick = function(){
  modal.style.display = "block";
  modalImg.src = "Assets/GS.jpg";
}

scanscript.onclick = function(){
  modal.style.display = "block";
  modalImg.src = "Assets/ScanScript.jpg";
}

pulse.onclick = function(){
  modal.style.display = "block";
  modalImg.src = "Assets/Pulse_Concept.png";
}

chestnotesBrochure.onclick = function(){
  modal.style.display = "block";
  modalImg.src = "Assets/Chestnotes.jpg";
}

chestnotesPoster.onclick = function(){
  modal.style.display = "block";
  modalImg.src = "Assets/ChestnotesPoster.jpg";
  modalImg.style.width = "90%";
}

council.onclick = function(){
  modal.style.display = "block";
  modalImg.src = "Assets/iwantyou.jpg";
  modalImg.style.width = "90%";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() { 
  modal.style.display = "none";
}

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

