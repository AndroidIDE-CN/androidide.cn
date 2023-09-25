var DISABLE_GET_SPONSOR_DATA = false;
var GET_SPONSOR_LIST_PAGE = 0;
var SPONSOR_TOTAL_COUNT = 10;
var GET_SPONSOR_COUNT = 0;

openNewWindow("alipays://platformapi/startapp?appId=20000067&url=https%3A%2F%2Frender.alipay.com%2Fp%2Fc%2Falipay-red-qrcode%2Fshared.html%3Fchannel%3Dsearch_pwd%26shareId%3D2088922979051363%26token%3D11w10168wtvdub3qcponufb%26campStr%3DkPPFvOxaCL3f85TiKss2wsBZgIjulHjG%26sign%3DqsiVOoa7TuphryWxyBdONXsMTnE3jiIBvWeUs3yV1sw%3D%26chInfo%3Dalipay_friend%26c_stype%3Dsearch_pwd%26shareBizType%3Dmrfx", 0);

getSponsorList();
showEggEfect();

window.onscroll = function() {
	console.log(getScrollHeight(),getClientHeight(),getScrollTop());
	if (getScrollTop() <= 0) {
		console.log('回到顶部');
	} else if ((getScrollHeight() - getClientHeight() - getScrollTop()) <= 10) {
		console.log('到达底部，开始获取新数据');
		if (!DISABLE_GET_SPONSOR_DATA && GET_SPONSOR_COUNT < SPONSOR_TOTAL_COUNT) {
		    getSponsorList();
		}else if(GET_SPONSOR_COUNT >= SPONSOR_TOTAL_COUNT){
			console.log('所有数据均已加载');
		}
	}
};
	
function getSponsorList(){
    console.log(GET_SPONSOR_COUNT,SPONSOR_TOTAL_COUNT);
	DISABLE_GET_SPONSOR_DATA = true;
	document.querySelector('#loading').style.display = 'block';
    GET_SPONSOR_LIST_PAGE += 1;
	sendHttpRequest('GET', 'https://api.aidepro.top/thanks?page=' + GET_SPONSOR_LIST_PAGE + '&count=15',
    false, false, function(data) {
      let code = data.code;
	  let msg = data.msg;
	  let total_people = data.total_people;
	  let total_amount = data.total_amount;
	  var _countUpOptions = {
 	    useGrouping: false,
	    duration: 3
	  };
	  SPONSOR_TOTAL_COUNT = total_people - 1;
      if (code == 200) {
	    DISABLE_GET_SPONSOR_DATA = false;
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
	GET_SPONSOR_COUNT += length;
	for (var i = 0; i < length; i++) {
	  let avatar = data[i].avatar;
	  let name = data[i].name;
	  let amount = data[i].amount;
	  let remark = data[i].remark;
	  let time = data[i].time;
	  time = stampToDateText(time * 1000, 'Y-m-d');
	  let list_item = document.createElement('li');
	  list_item.classList.add('mdui-list-item','mdui-ripple');
	  list_item.innerHTML = '<div class="mdui-list-item-avatar"><img src="' + avatar + '"/></div><div class="mdui-list-item-content"><div class="mdui-list-item-title mdui-list-item-one-line">' + name + '</div><div class="mdui-list-item-text mdui-list-item-one-line"><span class="' + (isEmpty(amount)?'':'mdui-text-color-red ') + 'mdui-float-left">' + (isEmpty(amount)?remark:'赞助'+ amount + '元 Donated ¥' + amount) + '</span>' + (isEmpty(amount)?'':'<span class="mdui-float-right">' + time + '</span>') + '</div></div>';
      document.querySelector('#list_view').appendChild(list_item);
    }
	document.querySelector('#list_view').style.display = 'block';
	mdui.mutation();
}
