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
  },
  getSlaves : function(){

    obj.xhr.onreadystatechange = obj.appendSlave;
    obj.xhr.open("GET" , "http://127.0.0.1:5000/getSlaves");
    obj.xhr.send();
  },
  appendSlave : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status== 200){
    var data = JSON.parse(this.responseText);
    var elem = document.getElementById("slaves");
    elem.innerHTML+="<div class='col-md-4'><div class='card'><div class='header'><h5 class='title'>"+data["hostname"]+"</h5><button class='btn btn-info btn-fill pull-right' onclick='window.location.href='./system.html'> View </button></div><div class='content'><div class='footer'><hr><div class='stats'><i class='fa fa-clock-o'></i> Updated 3 minutes ago</div></div></div></div></div>"
  }
  }

}
//obj.getData("get");
