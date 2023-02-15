var DISABLE_GET_TEAM_DATA = false;
var GET_TEAM_LIST_PAGE = 0;
var TEAM_TOTAL_COUNT = 10;
var GET_TEAM_COUNT = 0;

getTeamList();

window.onscroll = function() {
	console.log(getScrollHeight(),getClientHeight(),getScrollTop());
	if ((getScrollHeight() - getClientHeight() - getScrollTop()) <= 0) {
		console.log('到达底部，开始获取新数据');
		if (!DISABLE_GET_TEAM_DATA && GET_TEAM_COUNT < TEAM_TOTAL_COUNT) {
		    getTeamList();
		}else if(GET_TEAM_COUNT >= TEAM_TOTAL_COUNT){
		    document.querySelector('#loaded').style.display = 'block';
		}
	};
};
	
function getTeamList(){
    console.log(GET_TEAM_COUNT,TEAM_TOTAL_COUNT);
	DISABLE_GET_TEAM_DATA = true;
	document.querySelector('#loading').style.display = 'block';
    GET_TEAM_LIST_PAGE += 1;
	sendHttpRequest('GET', 'https://api.aidepro.top/team?page=' + GET_TEAM_LIST_PAGE + '&count=10',
    false, false, function(success, data) {
      if (!success) {
	    showToast('网络错误');
        return;
      }
      let code = data.code;
	  let msg = data.msg;
	  TEAM_TOTAL_COUNT = data.total;
      if (code == 200) {
	    DISABLE_GET_TEAM_DATA = false;
		document.querySelector('#loading').style.display = 'none';
        let _data = data.data;
		if(!isEmpty(_data)){
			addVersionData(_data);
		}
      }else{
		  showToast(msg);
	  }
    });
}

function addVersionData(data){
	let length = data.length;
	console.log('插入数据',data,length);
	GET_TEAM_COUNT += length;
	for (var i = 0; i < length; i++) {
	  let avatar = data[i].avatar;
	  let name = data[i].name;
	  let email = data[i].email;
	  email = (isEmpty(email))?'':'<svg class="mdui-icon" style="width:16px;height:18px;margin-right:5px;"><path d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z" fill-rule="evenodd"></path></svg>' + email
	  let github = data[i].github;
	  github = (isEmpty(github))?'':'<svg class="mdui-icon" style="margin-left:18px;width:20px;height:20px;margin-right:5px;" viewBox="0 0 36 36"><path fill="#000000de" d="M18,1.4C9,1.4,1.7,8.7,1.7,17.7c0,7.2,4.7,13.3,11.1,15.5c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4c-0.2-0.4-0.7-2.1,0.2-4.3c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C34.3,8.7,27,1.4,18,1.4z"></path></svg>' + github
	  let info = data[i].info;
	  let qq = data[i].qq;
	  let list_item = document.createElement('li');
	  list_item.classList.add('mdui-list-item','mdui-ripple');
	  list_item.innerHTML = '<div class="mdui-list-item-avatar"><img src="' + avatar + '"/></div><div class="mdui-list-item-content"><div class="mdui-list-item-title mdui-list-item-one-line">' + name + '</div><div class="mdui-list-item-text mdui-list-item-one-line"><span>' + email + '</span><span>' + github + '</span></div></div>';
      document.querySelector('body>ul').appendChild(list_item);
    }
	mdui.mutation();
}