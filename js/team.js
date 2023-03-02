var DISABLE_GET_TEAM_DATA = false;
var GET_TEAM_LIST_PAGE = 0;
var TEAM_TOTAL_COUNT = 10;
var GET_TEAM_COUNT = 0;

getTeamList();

window.onscroll = function() {
	console.log(getScrollHeight(),getClientHeight(),getScrollTop());
	if (getScrollTop() <= 0) {
		console.log('回到顶部');
	} else if ((getScrollHeight() - getClientHeight() - getScrollTop()) <= 10) {
		console.log('到达底部，开始获取新数据');
		if (!DISABLE_GET_TEAM_DATA && GET_TEAM_COUNT < TEAM_TOTAL_COUNT) {
		    getTeamList();
		}else if(GET_TEAM_COUNT >= TEAM_TOTAL_COUNT){
			console.log('所有数据均已加载');
		    document.querySelector('#loaded').style.display = 'block';
		}
	};
};
	
function getTeamList(){
    console.log(GET_TEAM_COUNT,TEAM_TOTAL_COUNT);
	DISABLE_GET_TEAM_DATA = true;
	document.querySelector('#loading').style.display = 'block';
    GET_TEAM_LIST_PAGE += 1;
	sendHttpRequest('GET', 'https://api.aidepro.top/team?page=' + GET_TEAM_LIST_PAGE + '&count=12',
    false, false, function(data) {
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
	GET_TEAM_COUNT += length;
	for (var i = 0; i < length; i++) {
	  let avatar = data[i].avatar;
	  let name = data[i].name;
	  let email = data[i].email;
	  email = (isEmpty(email))?'':'<span style="opacity: .54;font-size: 10px;margin-left: 3px;">(' + email + ')</span>';
	  let github = data[i].github;
	  github = (isEmpty(github))?'':'<span class="mdui-float-right" style="opacity: .54;font-size: 10px;"><svg class="mdui-icon" style="width: 16px; height: 18px; margin-right: 3px; transform: scale(0.8);" viewBox="0 0 36 36"><path fill="#000000de" d="M18,1.4C9,1.4,1.7,8.7,1.7,17.7c0,7.2,4.7,13.3,11.1,15.5c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4c-0.2-0.4-0.7-2.1,0.2-4.3c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C34.3,8.7,27,1.4,18,1.4z"></path></svg>' + github + '</span>'; 
	  let info = data[i].info;
	  let qq = data[i].qq;
	  let type = data[i].type;
	  let list_item = document.createElement('li');
	  list_item.classList.add('mdui-list-item','mdui-ripple');
	  list_item.innerHTML = '<div class="mdui-list-item-avatar"><img src="' + avatar + '"/></div><div class="mdui-list-item-content"><div class="mdui-list-item-title mdui-list-item-one-line">' + name + email + github + '</div><div class="mdui-list-item-text mdui-list-item-one-line"><span style="font-size: 10px;">' + info + '</span></div></div>';
      if(type == 'memorial'){
		  document.querySelector('#memorial_people').appendChild(list_item);
	  }else{
		 document.querySelector('#default_people').appendChild(list_item); 
	  }
    }
	mdui.mutation();
}