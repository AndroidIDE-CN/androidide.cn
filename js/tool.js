function bytesToSize(a) {
  if (a === 0) return "0 B";
  var b = 1024,
    c = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    d = Math.floor(Math.log(a) / Math.log(b));
  return (a / Math.pow(b, d)).toPrecision(5) + " " + c[d];
}

function stampToDate(a, b) {
  b = b || 'Y-m-d';
  var c = function(d) {
    if (d < 10) {
      return '0' + d;
    }
    return d;
  };
  var e = a ? new Date(a) : new Date();
  var f = e.getFullYear();
  var g = c(e.getMonth() + 1);
  var h = c(e.getDate());
  var i = c(e.getHours());
  var j = c(e.getMinutes());
  var k = c(e.getSeconds());
  return b.replace(/Y|m|d|H|i|s/ig,
    function(l) {
      return ({
        Y: f,
        m: g,
        d: h,
        H: i,
        i: j,
        s: k
      })[l];
    });
}

function replaceNewline(a) {
  a = a.replace(/(\r\n|\n|\r)/g, "<br/>");
  a = a.replace(/(\\r\\n|\\n|\\r)/g, "<br/>");
  return a;
}

function ajax(type, url, data, head, callback) {
  let mXMLHttpRequest = new XMLHttpRequest();
  mXMLHttpRequest.open(type, url, true);
  if (head) {
    for (var i in head) {
      mXMLHttpRequest.setRequestHeader(i, head[i]);
    }
  } else {
    mXMLHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  };
  mXMLHttpRequest.send(data);
  mXMLHttpRequest.onloadend = function() {
    if(callback){
      callback(true, JSON.parse(this.responseText));
    }
  };
  mXMLHttpRequest.onerror = function() {
    if(callback){
      callback(false, '');
    }
  };
}

function getX(obj){
  return obj.offsetLeft + (obj.offsetParent ? getX(obj.offsetParent) : obj.x ? obj.x : 0);  
}          

function getY(obj){ 
  return (obj.offsetParent ? obj.offsetTop + getY(obj.offsetParent) : obj.y ? obj.y : 0);  
}

function randomID(count){
  let arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  let rand = '';
  for(var i = 0;i < count; i++){
    rand += arr[Math.floor(Math.random() * 36)];
  }
  return rand;
}

function showLoadUrlDialog(_title, _url, _buttons){
  let _spinner_randomID = randomID(16);
  let _iframe_randomID = randomID(16);
  let _loadUrlDialog = mdui.dialog({
      title: _title,
      content: `<div id="${_spinner_randomID}" style="height: 100%;display: flex;justify-content: center;/* align-content: center; */align-items: center;width: 100%;"><div class="mdui-spinner"></div></div><iframe id="${_iframe_randomID}" frameborder="0" seamless align="middle" marginwidth="0px" marginheight="0px" width="100%" height="100%" src="${_url}" style="display: none;width: 100%;height: 100vh;"></iframe>`,
      buttons: _buttons
    });
    mdui.mutation();
    let _version_list_dialog_spinner = document.querySelector('#' + _spinner_randomID);
    let _version_list_dialog_iframe = document.querySelector('#' + _iframe_randomID);
    _version_list_dialog_iframe.onload = function(){
      _version_list_dialog_spinner.style.display = 'none';
      _version_list_dialog_iframe.style.display = 'block';
      _loadUrlDialog.handleUpdate();
      _version_list_dialog_iframe.style.height = '-webkit-fill-available';
    };
}