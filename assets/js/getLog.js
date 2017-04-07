var obj = {
  xhr : new XMLHttpRequest() ,
  getID : function(url){
    obj.xhr.onreadystatechange = obj.display;
    obj.xhr.open("GET" , "http://127.0.0.1:5000/status");
    obj.xhr.send();
  },
  getlog : function(taskID){
    obj.xhr.onreadystatechange = obj.displaylog;
    obj.xhr.open("GET" , "http://127.0.0.1:5000/appData?appID="+taskID);
    obj.xhr.send();
  },
  displaylog : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status == 200)
    {
      alert("Got log");
      var elem = document.getElementById("log");
      elem.value="";
      elem.value= this.responseText;
    }
  },
  display : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status== 200)
		{
			alert("got data");
      alert(this.responseText);
      var data = JSON.parse(this.responseText);
      //for each(var a in data){
        alert(data);
        alert(Object.keys(data));
        taskID = Object.keys(data["cassandraseed"]);
        alert(taskID);
        obj.getlog(taskID);
      //}
			//document.getElementById("mydat").innerHTML += this.responseText;
			//scrollamt += 100;
		}
  },
  queryDNS : function(appID){
    obj.xhr.onreadystatechange = obj.display;
    obj.xhr.open("GET" , "http://10.10.1.71:8123/v1/hosts/"+appID+".MyMesosDockerExample.mesos")
    obj.xhr.send();
  }
}
//obj.getData("get");
