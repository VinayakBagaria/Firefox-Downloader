let src = localStorage.getItem('video');

let videotag = document.getElementById('videotags');

var height = videotag.offsetHeight;
var width = videotag.offsetWidth;

console.log(height);
console.log(width);

videotag.src = src;

videotag.play();


setInterval(function(){
  console.log(videotag.offsetHeight)
  console.log(videotag.offsetWidth)
  console.log(videotag.offsetWidth == width)
  console.log(videotag.offsetHeight == height)
  if (videotag.offsetWidth == width && videotag.offsetHeight == height)
  {
    console.log('closed')
    window.close();
  }
}, 5000)
