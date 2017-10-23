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


let urls = localStorage.getItem('urls');

console.log(urls[0]['label']);

let links = document.getElementById('links');

let x = 0;

for(x = 0; x<urls.length; x++)
{
  let val = urls[x]

  // get label value, identifying type of video
  let label = val['label'];

  // if video word occurs in the label, then dont display further links
  let consider = label.indexOf('video');

  if(consider != -1)
    break;

  // create the a tag
  let a = document.createElement('a');
  let linkText = document.createTextNode(label);
  a.appendChild(linkText);
  a.title = linkText;
  a.href = val['id'];
  a.id = 'video';
  links.appendChild(a);

  //Only 360p video in the link
  if(label == '360p - mp4')
  {
    console.log('hello');
    localStorage.setItem('video', val['id']);
    browser.tabs.create({url: 'video.html'});
  }
}
