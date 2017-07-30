function updateTab(tabs)
{
	var myHeaders = new Headers();

	var myInit = { method: 'GET',
	               headers: myHeaders };

	var URL="https://www.saveitoffline.com/process/?url="+tabs[0].url+"&type=json";

	var myRequest = new Request(URL, myInit);
	
	fetch(myRequest).then(function(response) {
	  return response.json();
	}).then(function(data) {
		document.getElementById("title").innerHTML=data['title'];
		let imgLink=data['thumbnail'];

		if(imgLink.indexOf("https")==-1)
			document.getElementById("icon").src="https:"+imgLink;
		else
			document.getElementById("icon").src=imgLink;

		var links=document.getElementById("links");
		let x=0;
		while(1>0)
		{
			let val=data['urls'][x]
			let label=val['label'];
			console.log(val['id']);
			let consider=label.indexOf("video");
			
			if(consider!=-1)
				break;
			else
			{
				let a=document.createElement('a');
				a.setAttribute("href",val['id']);
				a.innerHTML=val['label'];
				links.appendChild(a);
				x+=1	
			}
		}

	});

}


document.getElementsByTagName("a").onclick = function(e){
	alert(e.href+" - "+this.href);
}

var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then(updateTab);


