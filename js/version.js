var DISABLE_GET_VERSION_DATA = false;
var GET_VERSION_LIST_PAGE = 0;
var VERSION_TOTAL_COUNT = 10;
var GET_VERSION_COUNT = 0;

getVersionList();

window.onscroll = function() {
	console.log(getScrollHeight(),getClientHeight(),getScrollTop());
	if (getScrollTop() <= 0) {
		console.log('回到顶部');
	} else if ((getScrollHeight() - getClientHeight() - getScrollTop()) <= 10) {
		console.log('到达底部，开始获取新数据');
		if (!DISABLE_GET_VERSION_DATA && GET_VERSION_COUNT < VERSION_TOTAL_COUNT) {
		    getVersionList();
		}else if(GET_VERSION_COUNT >= VERSION_TOTAL_COUNT){
			console.log('所有数据均已加载');
		}
	};
};
	
function getVersionList(){
    console.log(GET_VERSION_COUNT,VERSION_TOTAL_COUNT);
	DISABLE_GET_VERSION_DATA = true;
	document.querySelector('#loading').style.display = 'block';
    GET_VERSION_LIST_PAGE += 1;
	sendHttpRequest('GET', 'https://api.aidepro.top/version?page=' + GET_VERSION_LIST_PAGE + '&count=12',
    false, false, function(success, data) {
      if (!success) {
	    showTips('网络错误 Network Error');
		if(isAIDEApp()){
		   aide.finish();
		}
        return;
      }
      let code = data.code;
	  let msg = data.msg;
	  VERSION_TOTAL_COUNT = data.total;
      if (code == 200) {
	    DISABLE_GET_VERSION_DATA = false;
		document.querySelector('#loading').style.display = 'none';
        let _data = data.data;
		if(!isEmpty(_data)){
			addVersionData(_data);
		}
      }else{
		  showTips(msg);
		  if(isAIDEApp()){
		     aide.finish();
		  }
	  }
    });
}

function addVersionData(data){
	let length = data.length;
	console.log('插入数据',data,length);
	GET_VERSION_COUNT += length;
	for (var i = 0; i < length; i++) {
	  let versionName = data[i].versionName;
	  let versionCode = data[i].versionCode;
	  let updateTime = data[i].updateTime;
	  updateTime = stampToDateText(updateTime * 1000, 'Y-m-d');
	  let updateLog = data[i].updateLog;
	  updateLog = replaceNewline(updateLog);
	  let collapse_item = document.createElement('li');
	  collapse_item.classList.add('mdui-collapse-item');
	  collapse_item.innerHTML = '<div class="mdui-collapse-item-header mdui-list-item"><div class="mdui-list-item-avatar"><img src="https://previewengine.zoho.com.cn/image/WD/o9yvm0ce51d6b80f346969f2b9fd21529a330"></div><div class="mdui-list-item-content"><div class="mdui-list-item-title">Ver' + versionName + '（' + versionCode + '）</div><div class="mdui-list-item-text mdui-list-item-one-line">更新时间(Update time)：' + updateTime + '</div></div><i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i></div><div class="mdui-collapse-item-body mdui-panel-item-body"><p class="mdui-text-color-theme-secondary"><b>更新日志(Update log)：</b><br><br>' + updateLog + '</p></div>';
      document.querySelector('body>ul').appendChild(collapse_item);
    }
	mdui.mutation();
}