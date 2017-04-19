var obj = {
  xhr : new XMLHttpRequest() ,
  slaveSync : null,
  appSync : null,
  slaveCpuSync : null,
  slaveHost : [] ,
  apps : [] ,
  appUtilSync : null,
  getAppName : function(){
    obj.xhr.onreadystatechange = obj.appList;
    obj.xhr.open("GET" , "http://10.10.1.71:5000/status",true);
    obj.xhr.send();
  },
  getUpdateApps : function(){
    obj.xhr.onreadystatechange = obj.syncApp;
    obj.xhr.open("GET" , "http://10.10.1.71:5000/status",true);
    obj.xhr.send();
  },
  syncApp : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status == 200){
      var data = JSON.parse(this.responseText);
      var app_list = Object.keys(data);
      var elem = document.getElementById("apps");
      for(var j =0;j<obj.apps.length;j++){
        if(app_list.indexOf(obj.apps[j])== -1){
          var elem1 = document.getElementById("j"+str(j));
          elem1.parentNode.removeChild(elem1);
        }
      }
    }
    setTimeout(getUpdateApps , 10000);
  },
  appList : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status == 200){
      var data = JSON.parse(this.responseText);
      var app_list = Object.keys(data);
      alert(app_list);
      //addApps(app_list);
      var elem = document.getElementById("apps");
      for(var j =0;j<app_list.length;j++){
        alert("gg"+app_list[j]);
        if(obj.apps.indexOf(app_list[j]) == -1){
            alert("Inside"+app_list[j]);
            var taskid = Object.values(data[app_list[j]])[0];
            //alert(taskid);
            //elem.innerHTML += "<div class='col-md-12' id = 'j'"+j.toString()+"><div class='card'><div class='header'><button class='btn btn-info btn-fill pull-right' onclick='loadApp()'> View </button><h5 class='title' id = 'app_name'>"+app_list[j]+"  "+taskid+"</h5></div><div class='content'><hr><div class='stats'><i class='fa fa-clock-o'></i> Launched 3 hours ago</div></div></div></div>";
            //createCookie('app_name',app_list[j],7);
            var outterDiv = document.createElement("div");
            outterDiv.setAttribute("class" , "col-md-12");
            outterDiv.setAttribute("id" , "j");
            var innerDiv = document.createElement("div");
            innerDiv.setAttribute("class" , "card");
            var innerDiv1 = document.createElement("div");
            innerDiv1.setAttribute("class" , "header");
            var button = document.createElement("button");
            button.setAttribute("class" , "btn btn-info btn-fill pull-right");
            alert(app_list[j]);
            button.setAttribute("id" , app_list[j]);
            button.addEventListener("click",function(){ alert(this.id);loadApp(this.id);});
            button.innerHTML="View";
            var text = document.createElement("h5");
            text.setAttribute("class" ,"title");
            text.innerHTML = app_list[j]+"    "+taskid;
            innerDiv1.appendChild(button);
            innerDiv1.appendChild(text);
            innerDiv.appendChild(innerDiv1);
            outterDiv.appendChild(innerDiv);
            elem.appendChild(outterDiv);
            obj.apps.push(app_list[j]);
            // TODO write an onclicklistener and pass the app Name
        }
      }
      appSync = setTimeout(obj.getAppName, 10000);
    }
  },
  getID : function(url){
    obj.xhr.onreadystatechange = obj.display;
    obj.xhr.open("GET" , "http://10.10.1.71:5000/status");
    obj.xhr.send();
  },
  getlog : function(taskID){
    obj.xhr.onreadystatechange = obj.displaylog;
    obj.xhr.open("GET" , "http://10.10.1.71:5000/appData?appID="+taskID,false);
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
        //alert(data);
        //alert(Object.keys(data));
        taskID = Object.keys(data[readCookie('app_name')]);
        alert(taskID);
        obj.getlog(taskID);
      //}
			//document.getElementById("mydat").innerHTML += this.responseText;
			//scrollamt += 100;
		}
  },
  queryDNS : function(appID){
    obj.xhr.onreadystatechange = obj.displayIP;
    obj.xhr.open("GET" , "http://10.10.1.71:5000/dnsQuery?appID="+appID);
    obj.xhr.send();
  },
  displayIP:function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status == 200){
      alert(this.responseText);
      var elem = document.getElementById("ip");
      elem.innerHTML = this.responseText;
      createCookie('app_ip',this.responseText,7);
      alert(readCookie('app_ip'));

      obj.getLatency(readCookie('app_ip'));
    }
  },
  getSlaves : function(){

    obj.xhr.onreadystatechange = obj.appendSlave;
    obj.xhr.open("GET" , "http://10.10.1.71:5000/getSlaves",true);
    obj.xhr.send();
    //obj.getAppName();
  },
  appendSlave : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status== 200){
      var data = JSON.parse(this.responseText);
      for(var j=0;j<data.length;j++){
      alert(data[j]);
      alert(data[j]["hostname"]);
      if(obj.slaveHost.indexOf(data[j]["hostname"]) == -1){
          var elem = document.getElementById("slaves");
          //elem.innerHTML+="<div class='col-md-4'><div class='card'><div class='header'><h5 class='title' id ='slave_host_name'>"+data[j]["hostname"]+"</h5><button class='btn btn-info btn-fill pull-right' onclick='loadSlave()'> View </button></div><div class='content'><div class='footer'><hr><div class='stats'>CPU : "+data[j]["cpus"]+"</div><hr><div class='stats'>Memory : "+data[j]["mem"]+"</div></div></div></div></div>"
       
            var outterDiv = document.createElement("div");
            outterDiv.setAttribute("class" , "col-md-4");
            outterDiv.setAttribute("id" , "j");
            var innerDiv = document.createElement("div");
            innerDiv.setAttribute("class" , "card");
            var innerDiv1 = document.createElement("div");
            innerDiv1.setAttribute("class" , "header");
            var button = document.createElement("button");
            button.setAttribute("class" , "btn btn-info btn-fill pull-right");
            //alert(app_list[j]);
            button.setAttribute("id" , data[j]["hostname"]+"@"+data[j]["ip"]);
            button.addEventListener("click",function(){ alert(this.id);loadSlave(this.id);});
            button.innerHTML="View";
            var text = document.createElement("h5");
            text.setAttribute("class" ,"title");
            text.innerHTML = data[j]["hostname"];
            var divContent = document.createElement("div");
            divContent.setAttribute("class" , "content");
            var divfoot = document.createElement("div");
            divfoot.setAttribute("class" , "footer");
            var divstat1 = document.createElement("div");
            divstat1.setAttribute("class" , "stats");
            divstat1.innerHTML = data[j]["cpus"];
            var hr = document.createElement("hr");
            var divstat2 = document.createElement("div");
            divstat2.setAttribute("class" , "stats");
            divstat2.innerHTML = data[j]["mem"];
            divfoot.appendChild(divstat1);
            divfoot.appendChild(hr);
            divfoot.appendChild(divstat2);
            divContent.appendChild(divfoot);
            innerDiv1.appendChild(button);
            innerDiv1.appendChild(text);
            innerDiv.appendChild(innerDiv1);
            innerDiv.appendChild(divContent);
            outterDiv.appendChild(innerDiv);
            elem.appendChild(outterDiv);
          obj.slaveHost.push(data["hostname"]);
      }
      }
      obj.getAppName();
    }
    //obj.slaveSync = setTimeout(obj.getSlaves , 50000);

  },
  getUtil : function(host){
    obj.xhr.onreadystatechange = obj.cpuSlave;
    obj.xhr.open("GET" , "http://10.10.1.71:1234/stat?system="+host);
    obj.xhr.send();
  },
  cpuSlave : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status== 200){
      var elem = document.getElementById("cpuStat");
      //alert(parseInt(this.responseText));
      elem.setAttribute("class" , "c100 p"+parseInt(this.responseText)+" big orange");
      var elem1 = document.getElementById("cpuVal");
      elem1.innerHTML=parseInt(this.responseText);
      var ip = readCookie('slave_ip');
      slaveCpuSync = setTimeout(function(){ obj.getUtil(readCookie('slave_ip'));}, 10000);
      obj.getMem();

    }
  },
  getLatency : function(host){
    obj.xhr.onreadystatechange = obj.latency;
    obj.xhr.open("GET" , "http://10.10.1.71:1234/throughput?ip="+host,true);
    obj.xhr.send();
    var lat = setTimeout(function(){ obj.getLatency(readCookie('app_ip'));}, 4000);
  },
  latency : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status== 200){
      //var elem = document.getElementById("cpuStat");
      //alert(parseFloat(this.responseText));
      var data  = JSON.parse(this.responseText);
      //elem.setAttribute("class" , "c100 p"+parseInt(this.responseText)+" big orange");
      var elem1 = document.getElementById("throughputVal");
      //alert(data);
      //alert(data[0]["values"]);
      elem1.innerHTML=parseInt(data[0]["values"]);
      var ip = readCookie('app_ip');
      //obj.getMem();
    }
  },
  getMem :function(){
    obj.xhr.onreadystatechange = obj.memSlave;
    obj.xhr.open("GET" , "http://10.10.1.71:1234/memory?ip="+readCookie('slave_ip'));
    obj.xhr.send();
  },
  memSlave : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status == 200){
      var elem = document.getElementById("memStat");
      alert(this.responseText);
      elem.setAttribute("class" , "c100 p"+parseInt(this.responseText)+" big orange");
      var elem1 = document.getElementById("memVal");
      elem1.innerHTML=parseInt(this.responseText);
      setTimeout(obj.getMem,40000);
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
    obj.xhr.open("POST" , "http://10.10.1.71:5000/submit");
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
    obj.xhr.open("GET", "http://10.10.1.71:5000/appDetails?appName="+name);
    obj.xhr.send();
  },
  updatePage : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status == 200){
      var data = JSON.parse(this.responseText);
      obj.queryDNS(data["name"]);
      alert("UpdatePAege :"+data["name"]);
      document.getElementById("appName").innerHTML = data["name"];
      //document.getElementById("hostname").value = data["hostname"];
      //document.getElementById("ip").value = data["ip"];
      document.getElementById("name").innerHTML = data["name"];
      document.getElementById("cpu").innerHTML = data["cpu"];
      document.getElementById("ram").innerHTML = data["ram"];
      document.getElementById("command").innerHTML = data["command"];
      document.getElementById("doc_img").innerHTML = data["docker_image"];
      //obj.getAppUtils(data["name"]);

      appUtilSync = setTimeout(function(){ obj.getAppUtils(readCookie('app_name'))} , 3000);
    }
  },
  getAppUtils : function(name){
    obj.xhr.onreadystatechange = obj.updateAppUtil;
    //alert(name);
    obj.xhr.open("GET","http://10.10.1.71:5000/appCPUUtil?appName="+name,true);
    obj.xhr.send();
  },
  updateAppUtil : function(){
    if(obj.xhr.readyState == 4 && obj.xhr.status == 200){
      var data = this.responseText;
      var elem1 = document.getElementById("cpuStat");
      //var elem2 = document.getElementById("memStat");
      //var elem3 = document.getElementById("iostat");

      elem1.setAttribute("class" , "c100 p"+parseInt(data)+" big orange");
      var elem11 = document.getElementById("cpuVal");
      elem11.innerHTML = parseInt(data);

      //elem2.setAttribute("class" , "c100 p"+parseInt(data["mem"])+" big orange");
      //var elem22 = document.getElementById("memVal");
      //elem22.innerHTML = parseInt(data["mem"]);

      //elem3.setAttribute("class" , "c100 p"+parseInt(data["io"])+" big orange");
      //var elem33 = document.getElementById("ioVal");
      //elem33.innerHTML = parseInt(data["io"]);
      appUtilSync = setTimeout(function(){ obj.getAppUtils(readCookie('app_name'))} , 5000);
    }
  }

};

function loadSlave(name){
  //var elem = document.getElementById("slave_host_name");
  alert(name);
  var res = name.split("@");

  createCookie('slave_host',res[0],7);
  createCookie('slave_ip',res[1],7);
  window.location.href = "./system.html";
}

function loadApp(name){
  alert(name);
  createCookie('app_name',name,7);
  window.location.href = "./app.html";
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
  var ip = readCookie('slave_ip');
  alert(ip);
  var elem = document.getElementById("slaveName");
  elem.innerHTML = host;
  obj.getUtil(ip);
}

function updateAppPage(){
  var app_name = readCookie('app_name');
  alert(app_name);
  var elem = document.getElementById("appName");
  elem.innerHTML = app_name;
  obj.appDetails(app_name);
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
