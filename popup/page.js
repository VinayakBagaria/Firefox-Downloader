function updateTab(tabs)
{
	let myHeaders = new Headers();

	let myInit = { method: 'GET',
	               headers: myHeaders,
	               mode: 'cors',
	               cache: 'default' };

	let URL = 'https://www.saveitoffline.com/process/?url='+tabs[0].url+'&type=json';

	let myRequest = new Request(URL, myInit);

	fetch(myRequest).then(function(response) {
	  return response.json();
	}).then(function(data) {
		// get title parent h4 and make the title
		let h4 = document.createElement('h4');
		h4.id = 'title';

		// if website doesnt contain a valid video file
		if(data['error'])
		{
			h4.textContent = 'No video link found';
			document.getElementById('information').appendChild(h4);
			return;
		}
		// get title of video
		h4.textContent = data['title'];
		document.getElementById('information').appendChild(h4);
		localStorage.setItem('title', data['title'])

		// get all urls
		let urls = data['urls'];

		for(x = 0; x<urls.length; x++)
		{
			let val = urls[x]

			// get label value, identifying type of video
			let label = val['label'];

			// if video word occurs in the label, then dont display further links
			let consider = label.indexOf('video');

			if(consider != -1)
				return;

			//Only 360p video in the link
			if(label == '360p - mp4')
			{
				localStorage.setItem('urls', JSON.stringify(urls));
				localStorage.setItem('video', val['id']);
				browser.tabs.create({url: 'video.html'});
			}
		}
	});
}

let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then(updateTab);
