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
  },
  getUtil : function(){
    obj.xhr.onreadystatechange = obj.cpuSlave;
    obj.xhr.open("GET" , "http://127.0.0.1:1234/stat");
    obj.xhr.send();
  },
  cpuSlave : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status== 200){
      var elem = document.getElementById("cpuStat");
      alert(parseInt(this.responseText));
      elem.setAttribute("class" , "c100 p"+parseInt(this.responseText)+" big orange");
      var elem1 = document.getElementById("cpuVal");
      elem1.innerHTML=parseInt(this.responseText);
    }
  },
  uploadApp : function(){
    obj.xhr.onreadystatechange = obj.uploadStatus;
    var app_name = document.getElementById("appName").value.trim();
    var app_cpu = document.getElementById("appCPU").value.trim();
    var app_ram = document.getElementById("appRAM").value.trim();
    var docker_image = document.getElementById("doc_image").value.trim();
    var app_command = document.getElementById("command").value.trim();
    var app_storage = document.getElementById("storage").value.trim();
    var app_json = {"name":app_name,"cpu":app_cpu,"ram":app_ram, "command":app_command,"docker_image":docker_image,"storage":"False"}
    var data = JSON.stringify(app_json);
    alert(data);
    obj.xhr.open("POST" , "http://127.0.0.1:5000/submit");
    obj.xhr.setRequestHeader("Content-type", "application/json");
    obj.xhr.send(data);
  },
  uploadStatus : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status== 200){
      alert("SUCCESS");
    }
  }

}
//obj.getData("get");
