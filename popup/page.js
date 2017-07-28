function updateTab(tabs)
{
	var myHeaders = new Headers();

	var myInit = { method: 'GET',
	               headers: myHeaders,
	               mode: 'cors',
	               cache: 'default' };

	var URL="https://www.saveitoffline.com/process/?url="+tabs[0].url+"&type=json";

	var myRequest = new Request(URL, myInit);
	
	fetch(myRequest).then(function(response) {
	  return response.json();
	}).then(function(data) {
		document.getElementById("title").innerHTML=data['title'];
		document.getElementById("icon").src=data['thumbnail'];
		var links=document.getElementById("links");
		let x=0;
		console.log(data['urls']);
		while(1>0)
		{
			let val=data['urls'][x]
			let label=val['label'];
			console.log(label);
			let consider=label.indexOf("video");
			console.log(consider);
			
			if(consider!=-1)
				break;
			else
			{
				let a=document.createElement('a');
				let linkText=document.createTextNode(label);
				a.appendChild(linkText);
				a.title=linkText;
				a.href=val['id'];
				links.appendChild(a);
				x+=1	
			}
		}

	});

}



var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then(updateTab);


