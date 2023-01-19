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
    callback(true, JSON.parse(this.responseText));
  };
  mXMLHttpRequest.onerror = function() {
    callback(false, '');
  };
}

function getX(obj){
  return obj.offsetLeft + (obj.offsetParent ? getX(obj.offsetParent) : obj.x ? obj.x : 0);  
}          

function getY(obj){ 
  return (obj.offsetParent ? obj.offsetTop + getY(obj.offsetParent) : obj.y ? obj.y : 0);  
}  