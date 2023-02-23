var DISABLE_GET_SPONSOR_DATA = false;
var GET_SPONSOR_LIST_PAGE = 0;
var SPONSOR_TOTAL_COUNT = 10;
var GET_SPONSOR_COUNT = 0;

getSponsorList();
document.querySelector('#this_now_time').innerText = stampToDateText(new Date().getTime(), "Y-m-d H:i");
showEggEfect();

let list = document.querySelector('#list_cont');
list.onscroll = function() {
	console.log(list.scrollHeight,list.scrollTop,list.clientHeight);
	if (list.scrollTop <= 0) {
		console.log('回到顶部');
	} else if (list.scrollHeight - list.scrollTop - list.clientHeight <= 10) {
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
	sendHttpRequest('GET', 'https://api.aidepro.top/sponsor?page=' + GET_SPONSOR_LIST_PAGE + '&count=10',
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
	  let total_people = data.total_people;
	  var _countUpOptions = {
 	    useGrouping: false,
	    duration: 3
	  };
	  new countUp.CountUp('_total_people', total_people, _countUpOptions).start();
 	  let total_amount = data.total_amount;
	  //new countUp.CountUp('_total_amount', total_amount, _countUpOptions).start();
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
	  let time = data[i].time;
	  time = stampToDateText(time * 1000, 'Y-m-d');
	  let list_item = document.createElement('li');
	  list_item.classList.add('mdui-list-item','mdui-ripple');
	  list_item.innerHTML = '<div class="mdui-list-item-avatar"><img src="' + avatar + '"/></div><div class="mdui-list-item-content"><div class="mdui-list-item-title mdui-list-item-one-line">' + name + '</div><div class="mdui-list-item-text mdui-list-item-one-line"><span class="mdui-typo-body-2 mdui-text-color-red mdui-float-left">赞助 ¥' + amount + '</span><span class="mdui-float-right">' + time + '</span> </div></div>';
      document.querySelector('#list_view').appendChild(list_item);
    }
	mdui.mutation();
}