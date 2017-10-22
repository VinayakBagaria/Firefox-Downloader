let url = localStorage.getItem('video');

let videotag = document.getElementById('videotags');

let height = videotag.offsetHeight;
let width = videotag.offsetWidth;

videotag.src = url;
videotag.play();


var timer = setInterval(function(){
  var x = browser.tabs.getCurrent();

  function onGot(tabInfo) {
    if(tabInfo['status'] == 'complete')
    {
      console.log(videotag.offsetHeight);
      if(videotag.offsetHeight == height && videotag.offsetWidth == width){
        var closing = browser.tabs.remove(tabInfo['id']);
        closing.then(function(){
          console.log('closed')
        }, function(){
          console.log('error closing');
        });
      }
      clearInterval(timer);
    }
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  x.then(onGot, onError);
}, 2000);
