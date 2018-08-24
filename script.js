// var isInViewport = function (element) {
//     var bounding = element.getBoundingClientRect();
//     return (
//         bounding.top >= 0 &&
//         bounding.left >= 0 &&
//         bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// };

// var hr = document.querySelectorAll('#music_hr');
// hr[1].style.animationName = "none";
// hr[1].style.width = "0";
// window.addEventListener('scroll', function (event) {
// if (isInViewport(hr[1])) {
//   hr[1].style.animationName = "grow";
//   hr[1].style.width = "70%";
// }
// }, false);



function externalLinks() { for(var c = document.getElementsByTagName("a"), a = 0;a < c.length;a++) { var b = c[a]; b.getAttribute("href") && b.hostname !== location.hostname && (b.target = "_blank") } } ; 
externalLinks();

var options = {
  strings: ["I AM A TEAM PLAYER.", "I AM A GOOD LEADER.", "I AM HARDWORKING.", "I AM ADAPTABLE.", "I AM CREATIVE.", "I AM A GOOD LISTENER.", "I AM GEET!"],
  typeSpeed: 80,
  backSpeed: 40,
  backDelay: 1000,
  loop: true,
  smartBackspace: true,
  startDelay: 1500
}


var typed = new Typed("#textrotation", options);




