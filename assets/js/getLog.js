var obj = {
  xhr : new XMLHttpRequest() ,
  slaveSync : null,
  appSync : null,
  slaveCpuSync : null,
  slaveHost : [] ,
  getAppName : function(){
    obj.xhr.onreadystatechange = obj.appList;
    obj.xhr.open("GET" , "http://127.0.0.1:5000/status");
    obj.xhr.send();
  },
  appList : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status == 200){
      var data = JSON.parse(this.responseText);
      var app_list = Object.keys(data);
      addApps(app_list);
      appSync = setInterval(obj.getAppName, 10000);
    }
  },
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
      if(obj.slaveHost.indexOf(data["hostname"]) == -1){
          var elem = document.getElementById("slaves");
          elem.innerHTML+="<div class='col-md-4'><div class='card'><div class='header'><h5 class='title' id ='slave_host_name'>"+data["hostname"]+"</h5><button class='btn btn-info btn-fill pull-right' onclick='loadSlave()'> View </button></div><div class='content'><div class='footer'><hr><div class='stats'>CPU : "+data["cpus"]+"</div><hr><div class='stats'>Memory : "+data["mem"]+"</div></div></div></div></div>"
          obj.slaveHost.push(data["hostname"]);
      }
      obj.slaveSync = setInterval(obj.getSlaves , 10000);
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
      //alert(parseInt(this.responseText));
      elem.setAttribute("class" , "c100 p"+parseInt(this.responseText)+" big orange");
      var elem1 = document.getElementById("cpuVal");
      elem1.innerHTML=parseInt(this.responseText);
      slaveCpuSync = setInterval(obj.getUtil, 10000);
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
  },
  appDetails : function(name){
    obj.xhr.onreadystatechange = obj.updatePage;
    obj.xhr.open("GET", "REST END POINT?appName="+name);
    obj.xhr.send();
  },
  updatePage : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status == 200){
      var data = JSON.stringify(this.responseText);
      document.getElementById("appName").value = data["app_name"];
      document.getElementById("hostname").value = data["hostname"];
      document.getElementById("ip").value = data["ip"];
      document.getElementById("name").value = data["app_name"];
      document.getElementById("cpu").value = data["cpu"];
      document.getElementById("ram").value = data["ram"];
      document.getElementById("command").value = data["command"];
      document.getElementById("doc_img").value = data["docker_image"];
      obj.getAppUtils(data["app_name"]);
    }
  },
  getAppUtils : function(name){
    obj.xhr.onreadystatechange = obj.updateAppUtil;
    obj.xhr.open("GET","REST END POINT?appName="+name);
    obj.xhr.send();
  },
  updateAppUtil : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status == 200){
      var data = JSON.stringify(this.responseText);
      var elem1 = document.getElementById("cpuStat");
      var elem2 = document.getElementById("memStat");
      var elem3 = document.getElementById("iostat");

      elem1.setAttribute("class" , "c100 p"+parseInt(data["cpu"])+" big orange");
      var elem11 = document.getElementById("cpuVal");
      elem11.innerHTML = parseInt(data["cpu"]);

      elem2.setAttribute("class" , "c100 p"+parseInt(data["mem"])+" big orange");
      var elem22 = document.getElementById("memVal");
      elem22.innerHTML = parseInt(data["mem"]);

      elem3.setAttribute("class" , "c100 p"+parseInt(data["io"])+" big orange");
      var elem33 = document.getElementById("ioVal");
      elem33.innerHTML = parseInt(data["io"]);

    }
  }

};

function loadSlave(name){
  var elem = document.getElementById("slave_host_name");
  alert(elem.innerHTML);
  createCookie('slave_host',elem.innerHTML,7);
  window.location.href = "./system.html";
}

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function updateSlavePage(){
  var host = readCookie('slave_host');
  alert(host);
  var elem = document.getElementById("slaveName");
  elem.innerHTML = host;
  obj.getUtil();
}

//obj.getData("get");
/*
var app_count=0;
function addApps(appList){
  var list = appList ;
  var counter = appList.length;
  if(counter > app_count){
    var elem = document.getElementById("slaves");
    for(var j =app_count;j<counter;j++){
      var div = document.createElement('div');
      div.name = "app";
      div.class = "col-md-12";
      div.innerHTML = "<div class='card'><div class='header'><button class='btn btn-info btn-fill pull-right' onclick=''> View </button>                                <h5 class='title' name='apps'>"+list[j]+"</h5></div><div class='content'><hr><div class='stats'><i class='fa fa-clock-o'></i> Launched 3 hours ago
                                </div></div></div></div>";
      elem.appendChild(div);
    }
  }
}
var app_clicked;
function loadPage(appName){
  app_clicked = appName;
  window.location.href="app.html";

}
function appPage(){
  appDetails = obj.appDetails();
  //document.getElementById("app_name").value =
}
*/
