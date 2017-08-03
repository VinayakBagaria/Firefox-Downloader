function updateTab(tabs)
{
	let myHeaders = new Headers();

	let myInit = { method: 'GET',
	               headers: myHeaders,
	               mode: 'cors',
	               cache: 'default' };

	let URL='https://www.saveitoffline.com/process/?url='+tabs[0].url+'&type=json';

	let myRequest = new Request(URL, myInit);
	
	fetch(myRequest).then(function(response) {
	  return response.json();
	}).then(function(data) {
		// get title parent h4 and make the title
		let h4=document.createElement('h4');
		h4.id='title';
		
		// if website doesnt contain a valid video file
		if(data['error'])
		{
			h4.textContent='No video link found';	
			document.getElementById('information').appendChild(h4);
			return;
		}
		// get title of video
		h4.textContent=data['title'];
		document.getElementById('information').appendChild(h4);
		// get all links of video
		let links=document.getElementById('links');
		// display links
		let x=0;
		// get all urls
		let urls=data['urls'];
		for(x=0;x<urls.length;x++)
		{
			let val=urls[x]
			
			// get label value, identifying type of video
			let label=val['label'];

			// if video word occurs in the label, then dont display further links
			let consider=label.indexOf('video');
			
			if(consider!=-1)
				return;
			
			// create the a tag			
			let a=document.createElement('a');
			let linkText=document.createTextNode(label);
			a.appendChild(linkText);
			a.title=linkText;
			a.href=val['id'];
			a.id='video'
			links.appendChild(a);

			//Only 360p video in the link
			if(label == '360p - mp4')
			{
				document.getElementById('vid').src=val['id'];
			}
		}

	});

}



let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then(updateTab);