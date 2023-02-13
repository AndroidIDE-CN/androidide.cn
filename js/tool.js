function bytesToSize(a) {
  if (a === 0) return "0 B";
  var b = 1024,
    c = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    d = Math.floor(Math.log(a) / Math.log(b));
  return (a / Math.pow(b, d)).toPrecision(5) + " " + c[d];
}

function submitForm(url){
    var form = document.createElement('form');
    form.action = url;
    form.method = 'GET';
	document.body.appendChild(form);
	form.submit();
}

function loadIframe(url){
    var iframe = document.createElement('iframe');
	iframe.setAttribute('frameborder', 0);
	iframe.setAttribute('width', 0);
	iframe.setAttribute('height', 0);
	iframe.src = url;
	document.body.appendChild(iframe);
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
function isEmpty(a) {
    return (
      a == "" ||
      a == "undefined" ||
      a == undefined ||
      a == "null" ||
      a == false ||
      a == 0 ||
      a == null ||
      a == "NaN" ||
      a == NaN ||
      a.length == 0
    );
}
function isPCUA() {
    var a = navigator.userAgent;
    var b = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var c = true;
    for (var i = 0; i < b.length; i++) {
      if (a.indexOf(b[i]) > 0) {
        c = false;
        break;
      }
    }
    if (window.screen.width < 599) {
      c = false;
    }
    return c;
}
function isIOSUA() {
    return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}
function isQQUA() {
    return /\sQQ\/\d/i.test(window.navigator.userAgent);
}
function isWeChatUA() {
    return /micromessenger/i.test(
      window.navigator.userAgent.match(/MicroMessenger/i)
    );
}
function isAlipayUA() {
    return /AlipayClient/i.test(window.navigator.userAgent);
}
function isQQNumber(a) {
    return /^[1-9][0-9]{4,9}$/gim.test(a);
}
function isPhoneNumber(a) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/.test(
      a
    );
}
function isEmails(a) {
    return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
      a
    );
}
function getTimeStamp() {
    return parseInt(Date.parse(new Date()).toString().substr(0, 10));
}
function dateToStamp(a) {
    return parseInt(new Date(a).getTime() / 1000);
}
function stampToDate(a, b) {
	b = b || 'Y-m-d';
    var c = function(d) {
        if (d < 10) {
            return'0' + d;
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
function formatTimeStamp(a) {
    var b = Tool.getTimeStamp() - parseInt(a);
    var c = "";
    if (b < 5) {
      c = "刚刚";
	} else if (b < 60) {
      c = b + "秒前";
	} else if (b < 3600) {
      c = Math.ceil(b / 60) + "分钟前";
    } else if (b < 86400) {
      c = Math.ceil(b / 3600) + "小时前";
	} else if (b < 604800) {
	  let _day = Math.ceil(b / 86400);
	  if (_day < 2) {
	  	c = "昨天";
	  } else if (_day <= 3){
		c = "前天";
	  } else {
		c = _day + "天前";
	  }
	} else if (b < 2592000) {
      c = Math.ceil(b / 604800) + "周前";
    } else if (b < 31536000) {
      c = Math.ceil(b / 2592000) + "个月前";
    } else {
	  c = Tool.stampToDate(new Date().getTime(), "Y-m-d").replace(new Date().getFullYear() + "-", "" );
	}
    return c;
}
function getParam(a, b) {
	 if(Tool.isEmpty(a)){
		a = location.href;
	 }
    return new URL(a).searchParams.get(b);
}
function parseUrlQuery(a) {
    if (a.substring(0, 1) == "?") {
      a = a.split("?")[1];
    }
    let b = a.split("#")[0].split("&");
    const c = {};
    b.forEach(function (d) {
      let [e, f = ""] = d.split("=");
      c[e] = f;
    });
    return c;
}
function buildUrlQuery(a) {
    return new URLSearchParams(Object.entries(a)).toString();
}
function isEquals(a, b) {
    return a == b || a.length == b.length;
}
function isContains(a, b) {
    return a.indexOf(b) != -1;
}
static openQQClient(a, b) {
    if (b) {
      Tool.openUrl("mqq://card/show_pslcard?src_type=internal&source=sharecard&version=1&uin=" + a + "&type=group",0);
    } else {
      if(Tool.isPC()) {
		  Tool.locaUrl("tencent://message/?uin=" + a, true, 0);
	  } else {
		  Tool.openUrl("mqq://card/show_pslcard?src_type=internal&source=sharecard&version=1&uin=" + a,0);
	  }
    }
}
function openSendEmails(a) {
    Tool.openUrl("mailto:" + a, 0);
}
function isWebsitelink(a) {
    var myreg =
      /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
    return myreg.test(a);
}