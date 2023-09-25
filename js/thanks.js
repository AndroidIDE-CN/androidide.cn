var DISABLE_GET_SPONSOR_DATA = false;
var GET_SPONSOR_LIST_PAGE = 0;
var SPONSOR_TOTAL_COUNT = 10;
var GET_SPONSOR_COUNT = 0;

openNewWindow("https://render.alipay.com/p/s/i/?scheme=alipays%3A%2F%2Fplatformapi%2Fstartapp%3FappId%3D20000067%26url%3Dhttps%253A%252F%252Frender.alipay.com%252Fp%252Fc%252Falipay-red-qrcode%252Fshared.html%253Fchannel%253Dsearch_pwd%2526shareId%253D2088922979051363%2526token%253D11w10168wtvdub3qcponufb%2526campStr%253DkPPFvOxaCL3f85TiKss2wsBZgIjulHjG%2526sign%253DqsiVOoa7TuphryWxyBdONXsMTnE3jiIBvWeUs3yV1sw%253D%2526chInfo%253Dalipay_friend%2526c_stype%253Dsearch_pwd%2526shareBizType%253Dmrfx", 0);

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
