var VERIFY_CODE_SIGN;
var GET_LINKS_INTERVAL;
var GET_BULLET_INTERVAL;
var GET_SPONSOR_INTERVAL;
var SEND_BUTTON_INTERVAL;



var SUBMIT_FRIEND_LINK_DIALOG;
var SUBSCRIBE_EMAIL_DIALOG;
var REWARD_DIALOG;
var LOGIN_ADMIN_DIALOG;

var _countUpOptions = {
  useGrouping: false,
  duration: 10
};

var _downloadCount = new countUp.CountUp('_downloadCount', localStorage.getItem('_downloadCount') | 0, _countUpOptions);
 _downloadCount.start();
var _pageViews = new countUp.CountUp('_pageViews', localStorage.getItem('_pageViewNum') | 0, _countUpOptions);
 _pageViews.start();
var _launchCount = new countUp.CountUp('_launchCount', localStorage.getItem('_launchCountNum') | 0, _countUpOptions);
 _launchCount.start();
/*let __countUpOptions = _countUpOptions;
__countUpOptions.suffix = 'MB';
__countUpOptions.decimalPlaces = 2;
var _InstallPkgSize = new countUp.CountUp('_pkgSize', parseFloat(localStorage.getItem('_InstallPkgSize') | 0), __countUpOptions);
 _InstallPkgSize.start();*/

var MyukiDanMuObj = $MDM({
    locate: '#bullet_div',
    curtain: 'transparent',
    speed: 10,
    pool: [],
    maxPoolDelay: 8,
    minPoolDelay: 4
});
var ViewerJS = new Viewer(document.getElementById('screenshot'),
{
	button: false,
    rotatable: false,
    scalable: false,
    title: false,
    navbar: 2,
    toolbar: {
		prev: 1,
		next: 1
	},
	transition: false
});
initialization();

function initialization(){
  sessionStorage.setItem('GET_LINKS_PAGE', 0);
  sessionStorage.setItem('GET_LINKS_COUNT', 0);
  sessionStorage.setItem('GET_SPONSOR_PAGE', 0);
  sessionStorage.setItem('GET_SPONSOR_COUNT', 0);
  sessionStorage.setItem('GET_BULLET_PAGE', 0);
  sessionStorage.setItem('GET_BULLET_COUNT', 0);
  getBullet();
  getVersion();
  getConfig();
  getContact(0);
  getSponsor();
  getLinks();
  getContact(1);
  setLoading(false);
  document.querySelector('.PyyLUd>.mdui-card-menu>a').onclick = function(){
    showAdminLoginDialog();
  }
  document.querySelector('.fg1d2g>a.ulKokd').onclick = function(){
    _openLoadUrlDialog('历史版本 Historic Version', './version?from=web', 1);
  }
  document.querySelector('.u4ICaf>div>button').onclick = function(){
    _openLoadUrlDialog('历史版本 Historic Version', './version?from=web', 1);
  }
  document.querySelector('.kk2r5b>.IZOk1>.kuvzJc').onclick = function(){
    showAdminLoginDialog();
  }
  let _element2 = document.querySelectorAll('.KvNvKe');
  _element2[0].onclick = function(){
    _openLoadUrlDialog('用户协议 Use Agreement', './agreement?from=web', 2);
  }
  _element2[1].onclick = function(){
    _openLoadUrlDialog('隐私政策 Privacy Policy', './agreement/privacy?from=web', 2);
  }
  _element2[2].onclick = function(){
    _openLoadUrlDialog('免责声明 Disclaimer', './about/copyright?from=web', 2);
  }
  document.querySelectorAll('.o45e4d>.HcyOxe>.vfQhrf.BxIr0d>.Usd1Ac.VVmwY')[3].onclick = function(){
    openRewardDialog();
  }
  document.querySelector('#SubmitLink').onclick = function(){
    showSubmitFriendLinkDialog();
  }
  document.querySelector('#Subscribe').onclick = function(){
    showSubmitSubscribeEmailDialog();
  }
  if (!isEmpty(getCookies('aidepro_apiKey'))) {
	  loadJavaScriptSrc('./js/admin.js'); 
  }
}

function showSubmitSubscribeEmailDialog(){
	SUBSCRIBE_EMAIL_DIALOG = mdui.dialog({
      title: '订阅更新 Subscribe for updates',
      content: '当有新的版本更新时，将会发送邮件至该邮箱。</br>When there is a new version update, an email will be sent to the mailbox<div class="mdui-textfield"><label class="mdui-textfield-label">订阅邮箱 Email</label><input id="subscribe_mail_dialog_email_input" class="mdui-textfield-input" type="email" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填/Required</div></div><div class="mdui-textfield" style="margin-right: 136px;overflow: visible;"><label class="mdui-textfield-label">验证码 Verifice Code</label><input id="subscribe_mail_dialog_verificeCode_input" class="mdui-textfield-input" type="text" maxlength="6" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填/Required</div><button class="mdui-btn send-verify-code-button" type="button" id="subscribe_mail_dialog_verificeCode_send_btn" style="position: absolute;right: -136px;bottom: 29px;padding: 0;"><div class="m-button"><p>发送验证码</p><p class="btn-english">Send verifice code</p></div></button></div>',
      buttons: [
        {
          text: '<div class="m-button"><p>提交</p><p class="btn-english">Submit</p></div>',
          close: false,
          onClick: function(inst){
            submitSubscribeEmail(document.querySelector('#subscribe_mail_dialog_email_input').value, document.querySelector('#subscribe_mail_dialog_verificeCode_input').value);
          }
        },
        {
          text: '<div class="m-button"><p>取消</p><p class="btn-english">Cancel</p></div>'
        }
      ]
    });
    SUBSCRIBE_EMAIL_DIALOG.$element[0].style.maxWidth = '448px';
    mdui.mutation();
    SUBSCRIBE_EMAIL_DIALOG.handleUpdate();
    document.querySelector('#subscribe_mail_dialog_verificeCode_send_btn').onclick = function(){
	  sendVerificeCode(document.querySelector('#subscribe_mail_dialog_email_input').value, 'https://api.aidepro.top/subscriber?from=web&action=verify', '', '#subscribe_mail_dialog_verificeCode_send_btn');
    }
}

function switchSendButtonStatus(selector, time){
	clearInterval(SEND_BUTTON_INTERVAL);
	document.querySelector(selector).disabled = true;
	if (time > 0) {
		SEND_BUTTON_INTERVAL = setInterval(function() {
			time--;
			if (time <= 1) {
				document.querySelector(selector).disabled = false;
				document.querySelector(selector).innerHTML = '<div class="m-button"><p>重发验证码</p><p class="btn-english">Send verifice code</p></div>';
				clearInterval(SEND_BUTTON_INTERVAL);
			} else {
				document.querySelector(selector).innerHTML = '<div class="m-button"><p>' + time + '秒后再试</p><p class="btn-english">wait ' + time + ' seconds</p></div>';
			}
		},1000);
	};
}

document.body.addEventListener('close.mdui.dialog', function() {
	clearInterval(SEND_BUTTON_INTERVAL);
});

function showSubmitFriendLinkDialog(){
  SUBMIT_FRIEND_LINK_DIALOG = mdui.dialog({
    title: '申请友链 Submit Link',
    content: '申请友链须先在贵站添加本站链接后，再提交申请。</br>Please make sure that the site already has a link to this site.<div><div><div class="mdui-textfield"><i class="mdui-icon material-icons">link</i><label class="mdui-textfield-label">网站链接 Website Link</label><input id="submit_friendlink_dialog_url_input" class="mdui-textfield-input" type="text" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填/Required</div></div><div class="mdui-textfield"><i class="mdui-icon material-icons">language</i><label class="mdui-textfield-label">网站名称 Website Name</label><input id="submit_friendlink_dialog_name_input" class="mdui-textfield-input" type="text" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填/Required</div></div><div class="mdui-textfield"><i class="mdui-icon material-icons">help</i><label class="mdui-textfield-label">网站介绍 Website Introduction</label><textarea class="mdui-textfield-input" id="submit_friendlink_dialog_info_input" maxlength="50" required></textarea><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填，不超过50字/Required</div></div></div><div class="mdui-textfield"><i class="mdui-icon material-icons">email</i><label class="mdui-textfield-label">联系邮箱 Email</label><input id="submit_friendlink_dialog_email_input" class="mdui-textfield-input" type="email" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填/Required</div></div><div class="mdui-textfield" style="margin-right: 136px;overflow: visible;"><i class="mdui-icon material-icons">textsms</i><label class="mdui-textfield-label">验证码 Verifice Code</label><input class="mdui-textfield-input" id="submit_friendlink_dialog_code_input" type="text" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填/Required</div><button class="mdui-btn send-verify-code-button" type="button" style="position: absolute;right: -136px;bottom: 29px;padding: 0;" id="submit_friendlink_dialog_verificeCode_send_btn"><div class="m-button"><p>发送验证码</p><p class="btn-english">Send verifice code</p></div></button></div></div>',
    buttons: [
        {
          text: '<div class="m-button"><p>提交</p><p class="btn-english">Submit</p></div>',
          close: false,
          onClick: function(inst){
			  submitFriendLink(document.querySelector('#submit_friendlink_dialog_url_input').value, document.querySelector('#submit_friendlink_dialog_name_input').value, document.querySelector('#submit_friendlink_dialog_info_input').value, document.querySelector('#submit_friendlink_dialog_email_input').value, document.querySelector('#submit_friendlink_dialog_code_input').value);
          }
        },
        {
          text: '<div class="m-button"><p>取消</p><p class="btn-english">Cancel</p></div>'
        }
      ]
  });
  SUBMIT_FRIEND_LINK_DIALOG.$element[0].style.maxWidth = '448px';
  mdui.mutation();
  SUBMIT_FRIEND_LINK_DIALOG.handleUpdate();
  document.querySelector('#submit_friendlink_dialog_verificeCode_send_btn').onclick = function(){
	sendVerificeCode(document.querySelector('#submit_friendlink_dialog_email_input').value, 'https://api.aidepro.top/links?from=web&action=verify', 'url=' + document.querySelector('#submit_friendlink_dialog_url_input').value + '&name=' + document.querySelector('#submit_friendlink_dialog_name_input').value + '&info=' + document.querySelector('#submit_friendlink_dialog_info_input').value, document.querySelector('#submit_friendlink_dialog_email_input').value, '#submit_friendlink_dialog_verificeCode_send_btn');
  }
}

function sendVerificeCode(email, url, data, selector){
  console.log(email);
  if(isEmpty(email)){
	showToast('请填写邮箱 please enter your email');
	return;
  }
  if(!isEmails(email)){
	showToast('请填写正确邮箱 email address is incorrect');
	return;
  }
  function _switchSendButtonStatus(){
	  switchSendButtonStatus(selector, 300);
  }
  VERIFY_CODE_SIGN = '';
  data = isEmpty(data)?'':'&' + data;
  sendHttpRequest('POST', url,
    'email=' + email + data,
    false, function(data) {
      let code = data.code;
	  let msg = data.msg;
      if (code == 200) {
        let _data = data.data;
        VERIFY_CODE_SIGN = _data.sign;
		_switchSendButtonStatus();
      }
	  showToast(msg);
  });
}

function submitFriendLink(link, name, info, email, verificeCode){
  console.log(link, info, email, verificeCode);
  if(isEmpty(VERIFY_CODE_SIGN)){
	showToast('请先获取验证码 Please get verification code');
	return;
  }
  if(isEmpty(link)){
	showToast('链接不能为空 link cannot be empty');
	return;
  }
  if(isEmpty(name)){
	showToast('名称不能为空 name cannot be empty');
	return;
  }
  if(!isWebsitelink(link)){
	showToast('请填写正确的链接 incorrect link');
	return;
  }
  if(isEmpty(info)){
	showToast('介绍不能为空 Introduction cannot be empty');
	return;
  }
  if(isEmpty(email)){
	showToast('邮箱不能为空 Email can not be empty');
	return;
  }
  if(!isEmails(email)){
	showToast('请填写正确邮箱 email address is incorrect');
	return;
  }
  if(isEmpty(verificeCode)){
	showToast('验证码不能为空 Verification code cannot be empty');
	return;
  }
  sendHttpRequest('POST', 'https://api.aidepro.top/links?from=web',
    'url=' + link + '&name=' + name + '&info=' + info + '&email=' + email + '&code=' + verificeCode + '&sign=' + VERIFY_CODE_SIGN,
    false, function(data) {
      let code = data.code;
	  let msg = data.msg;
	  if (code == 200) {
		  VERIFY_CODE_SIGN = '';
		  clearInterval(SEND_BUTTON_INTERVAL);
		  SUBMIT_FRIEND_LINK_DIALOG.close();
		  setTimeout(function(){
			location.reload()
		  },2500);
	  }
	  showToast(msg);
  });
}

function submitSubscribeEmail(email, verificeCode){
  console.log(email, verificeCode);
  if(isEmpty(VERIFY_CODE_SIGN)){
	showToast('请先获取验证码 Please get verification code');
	return;
  }
  if(isEmpty(email)){
	showToast('邮箱不能为空 Email can not be empty');
	return;
  }
  if(!isEmails(email)){
	showToast('请填写正确邮箱 email address is incorrect');
	return;
  }
  if(isEmpty(verificeCode)){
	showToast('验证码不能为空 Verification code cannot be empty');
	return;
  }
  sendHttpRequest('POST', 'https://api.aidepro.top/subscriber?from=web',
    'email=' + email + '&code=' + verificeCode + '&sign=' + VERIFY_CODE_SIGN,
    false, function(data) {
      let code = data.code;
	  let msg = data.msg;
	  if (code == 200) {
		  VERIFY_CODE_SIGN = '';
		  clearInterval(SEND_BUTTON_INTERVAL);
		  SUBSCRIBE_EMAIL_DIALOG.close();
	  }
	  showToast(msg);
  });
}

function showAdminLoginDialog(){
	LOGIN_ADMIN_DIALOG = mdui.dialog({
      title: '登录后台 login management',
      content: '<div class="mdui-textfield"><label class="mdui-textfield-label">邮箱 Email</label><input id="login_admin_dialog_email_input" class="mdui-textfield-input" type="email" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填/Required</div></div><div class="mdui-textfield" style="margin-right: 136px;overflow: visible;"><label class="mdui-textfield-label">验证码 Verifice Code</label><input id="login_admin_dialog_verificeCode_input" class="mdui-textfield-input" type="text" maxlength="6" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填/Required</div><button class="mdui-btn send-verify-code-button" type="button" id="login_admin_dialog_verificeCode_send_btn" style="position: absolute;right: -136px;bottom: 29px;padding: 0;"><div class="m-button"><p>发送验证码</p><p class="btn-english">Send verifice code</p></div></button></div>',
      buttons: [
        {
          text: '<div class="m-button"><p>登录</p><p class="btn-english">Login</p></div>',
          close: false,
          onClick: function(inst){
            loginAdmin(document.querySelector('#login_admin_dialog_email_input').value, document.querySelector('#login_admin_dialog_verificeCode_input').value);
          }
        },
        {
          text: '<div class="m-button"><p>关闭</p><p class="btn-english">Close</p></div>'
        }
      ]
    });
    LOGIN_ADMIN_DIALOG.$element[0].style.maxWidth = '448px';
    mdui.mutation();
    LOGIN_ADMIN_DIALOG.handleUpdate();
    document.querySelector('#login_admin_dialog_verificeCode_send_btn').onclick = function(){
	  sendVerificeCode(document.querySelector('#login_admin_dialog_email_input').value, 'https://api.aidepro.top/admin?from=web&action=verify', '', '#login_admin_dialog_verificeCode_send_btn');
    }
}

function loginAdmin(email, verificeCode){
  console.log(email, verificeCode);
  if(isEmpty(VERIFY_CODE_SIGN)){
	showToast('请先获取验证码 Please get verification code');
	return;
  }
  if(isEmpty(email)){
	showToast('邮箱不能为空 Email can not be empty');
	return;
  }
  if(!isEmails(email)){
	showToast('请填写正确邮箱 email address is incorrect');
	return;
  }
  if(isEmpty(verificeCode)){
	showToast('验证码不能为空 Verification code cannot be empty');
	return;
  }
  sendHttpRequest('POST', 'https://api.aidepro.top/admin?from=web',
    'email=' + email + '&code=' + verificeCode + '&sign=' + VERIFY_CODE_SIGN,
    false, function(data) {
      let code = data.code;
	  let msg = data.msg;
	  if (code == 200) {
		  let key = data.data.key;
		  VERIFY_CODE_SIGN = '';
		  clearInterval(SEND_BUTTON_INTERVAL);
		  setCookies('aidepro_apiKey', key, 0, 'aidepro.top');
		  LOGIN_ADMIN_DIALOG.close();
		  setTimeout(function(){
			location.reload()
		  },2500);
	  }
	  showToast(msg);
  });
}

function _openLoadUrlDialog(title, url, type){
  let btnTxt = '<div class="m-button"><p>确定</p><p class="btn-english">OK</p></div>';
  if(type == 1){
    btnTxt = '<div class="m-button"><p>关闭</p><p class="btn-english">Close</p></div>';
  }else if(type == 2){
    btnTxt = '<div class="m-button"><p>我知道了</p><p class="btn-english">I clearly understand</p></div>';
  }
  showLoadUrlDialog(
    title,
    url,
    [
      {
        text: btnTxt
      }
    ]
  );
}

function getConfig() {
  sendHttpRequest(
    'GET',
    'https://api.aidepro.top/web?from=web',
    false,
    false,
    function(data) {
      //setLoading(false);
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        let icon = _data.icon;
        let name = _data.name;
        let desc = _data.desc;
        let cover = _data.cover;
        let screenshot = _data.screenshot;
        let info = _data.info;
        let down = _data.downloads;
        let views = _data.pageviews;
        let starts = _data.launchcount;
        document.querySelector('link[rel="shortcut icon"]').src = icon;
        //document.title = name;
        document.querySelector('.oiEt0d').src = cover;
        document.querySelector('.T75of.cN0oRe.fFmL2e').src = icon;
        document.querySelector('.T75of.QhHVZd').src = icon;
        //document.querySelector('.Fd93Bb.ynrBgc.xwcR9d').innerText = name;
        document.querySelector('.Vbfug.auoIOc').innerText = name.replace('AIDE', '');
        document.querySelector('.ulKokd').innerText = desc;
        setInfo(false, down, false, views, starts, 1);
        setScreenshot(screenshot);
        document.querySelectorAll('.HcyOxe>.SfzRHd.bARER')[0].innerHTML = replaceNewline(info);
      }else{
		  showToast(data.msg);
	  }
    });
}

function setScreenshot(data) {
  let selector = document.querySelectorAll('.aoJE7e>img');
  for (var i = 0; i < selector.length; i++) {
    selector.src = data[i];
  }
}

function getVersion() {
  sendHttpRequest(
    'GET',
    'https://api.aidepro.top/version/last?from=web&type=release',
    false,
    false,
    function(data) {
      //setLoading(false);
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        let versionCode = _data.versionCode;
        let versionName = _data.versionName;
        let minVersion = _data.minVersion;
        let targetVersion = _data.targetVersion;
        let updateLog = _data.updateLog;
        let downloadUrl = _data.downloadUrl;
        //let fileSize = _data.fileSize;
        let updateTime = _data.updateTime;
        setInfo(0, false, stampToDateText(updateTime * 1000, 'Y-m-d'), false, false, 1);
        //document.querySelector('.VAgTTd.LMcLV>div>div>div>a').innerText = '获取(' + bytesToSize(fileSize) + ')';
        document.querySelector('.fg1d2g>.u4ICaf>div>a').href = downloadUrl;
        document.querySelector('.VAgTTd.LMcLV>div>div>div>a').href = downloadUrl;
        document.querySelectorAll('.HcyOxe>.cswwxf.VMq4uf')[1].innerText = 'Ver ' + versionName;
        document.querySelectorAll('.HcyOxe>.SfzRHd.bARER')[1].innerHTML = replaceNewline(updateLog);
      }else{
		  showToast(data.msg);
	  }
    });
}

function setInfo(pkgSize, downloads, updateTime, pageViews, launchCount, type) {
  let obj = document.querySelectorAll('.w7Iutd>.wVqUob>.ClM7O');
  if (downloads) {
    localStorage.setItem('_downloadCount', downloads);
    _downloadCount.update(downloads);
  }
  if (pageViews) {
    localStorage.setItem('_pageViewNum', pageViews);
    _pageViews.update(pageViews);
  }
  if (launchCount) {
    localStorage.setItem('_launchCountNum', launchCount);
    _launchCount.update(launchCount);
  }
  /*if (pkgSize) {
    localStorage.setItem('_InstallPkgSize', parseFloat(pkgSize));
    _InstallPkgSize.update(parseFloat(pkgSize));
  }*/
  if (updateTime) {
    document.querySelector('.HcyOxe>div>.xg1aie').innerText = updateTime;
  }
}

function getContact(type) {
  sendHttpRequest('GET', (type == 1) ? 'https://api.aidepro.top/contact?from=web&type=numbers' : 'https://api.aidepro.top/contact?from=web', false,
    false,
    function(data) {
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        setContact(type, _data);
      }else{
		  showToast(data.msg);
	  }
    });
}

function setContact(type, data) {
  if (type == 0) {
    let obj = document.querySelectorAll('.o45e4d>.HcyOxe>.vfQhrf.BxIr0d>.Usd1Ac.VVmwY>a>div>div.pSEeg');
    let _obj = document.querySelectorAll('.o45e4d>.HcyOxe>.vfQhrf.BxIr0d>.Usd1Ac.VVmwY>a');
    obj[0].innerText = data.group[0];
    _obj[0].href = data.group[1];
    obj[1].innerText = data.guild[0];
    _obj[1].href = data.guild[1];
	obj[2].innerText = data.telegram[0];
    _obj[2].href = data.telegram[1];
  } else {
    let obj2 = document.querySelectorAll('.o45e4d>.HcyOxe>.vfQhrf.BxIr0d>.Usd1Ac.VVmwY>a>div>div.xFVDSb');
    obj2[0].innerText = 'QQ群 Group';
	if(data.group){
		obj2[0].innerText = 'QQ群 Group (' + data.group + '/2000)';
	}
	obj2[1].innerText = 'QQ频道 Guild';
    if(data.guild){
		obj2[1].innerText = 'QQ频道 Guild (' + data.guild + '/5000)';
	}
	obj2[2].innerText = 'Telegram';
    if(data.telegram){
		obj2[2].innerText = 'Telegram (' + data.telegram + '/5000)';
	}
  }
}


function getLinks() {
	console.log('开始加载友链');
	document.querySelectorAll('.Uc6QCc>.VfPpkd-dgl2Hf-ppHlrf-sM5MNb')[1].innerHTML = '';
	GET_LINKS_INTERVAL = setInterval(function() {
		GET_LINKS_PAGE = sessionStorage.getItem('GET_LINKS_PAGE');
		GET_LINKS_PAGE = isEmpty(GET_LINKS_PAGE)?0:parseInt(GET_LINKS_PAGE);
		GET_LINKS_PAGE += 1;
		sessionStorage.setItem('GET_LINKS_PAGE', GET_LINKS_PAGE);
		sendHttpRequest(
   	 	'GET', 'https://api.aidepro.top/links?from=web&page=' + GET_LINKS_PAGE + '&count=10',
    	  false, false,
    	  function(data) {
    	    let code = data.code;
			let msg = data.msg;
     	    if (code == 200) {
     	       let _data = data.data;
			   GET_LINKS_COUNT = sessionStorage.getItem('GET_LINKS_COUNT');
			   GET_LINKS_COUNT = isEmpty(GET_LINKS_COUNT)?0:parseInt(GET_LINKS_COUNT);
			   GET_LINKS_COUNT = GET_LINKS_COUNT + _data.length;
			   sessionStorage.setItem('GET_LINKS_COUNT', GET_LINKS_COUNT);
			   console.log('友链总数',data.total,'已获取',GET_LINKS_COUNT);
			   setLinks(_data);
			   if(isEmpty(_data) || GET_LINKS_COUNT >= data.total){
				   console.log('友链加载完毕');
				   sessionStorage.setItem('GET_LINKS_PAGE', 0);
				   sessionStorage.setItem('GET_LINKS_COUNT', 0);
				   clearInterval(GET_LINKS_INTERVAL);
				   return;
			   }    
    	    }else{
		        showToast(data.msg);
	        }
    	});
	}, 1000);
}

function setLinks(data) {
  let add_gthub = document.createElement('div');
  add_gthub.classList.add('VfPpkd-LgbsSe', 'VfPpkd-LgbsSe-OWXEXe-INsAgc', 'VfPpkd-LgbsSe-OWXEXe-dgl2Hf', 'Rj2Mlf', 'OLiIxf', 'PDpWxe', 'P62QJc', 'LQeN7', 'LMoCf');
  add_gthub.setAttribute('style','transform: scale(0) translateZ(0);transition: all .2s cubic-bezier(.4,0,.2,1),box-shadow .2s cubic-bezier(.4,0,1,1),transform .2s,-webkit-box-shadow .2s cubic-bezier(.4,0,1,1),-webkit-transform .2s;"');
  add_gthub.innerHTML = '<span class="VfPpkd-vQzf8d">Github</span><a class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb" target="_blank" href="https://github.com/AndroIDE-Pro"></a>';
  document.querySelectorAll('.Uc6QCc>.VfPpkd-dgl2Hf-ppHlrf-sM5MNb')[1].append(add_gthub);
  setTimeout(function(){
	 add_gthub.style.transform = 'scale(1) translateZ(0px)';
  },1000);
  if(isEmpty(data)){
	return;
  }
  for (var i = 0; i < data.length; i++) {
	  let url = data[i].url;
    let links_item = document.createElement('div');
	links_item.classList.add('VfPpkd-LgbsSe', 'VfPpkd-LgbsSe-OWXEXe-INsAgc', 'VfPpkd-LgbsSe-OWXEXe-dgl2Hf', 'Rj2Mlf', 'OLiIxf', 'PDpWxe', 'P62QJc', 'LQeN7', 'LMoCf');
	links_item.setAttribute('style','transform: scale(0) translateZ(0);transition: all .2s cubic-bezier(.4,0,.2,1),box-shadow .2s cubic-bezier(.4,0,1,1),transform .2s,-webkit-box-shadow .2s cubic-bezier(.4,0,1,1),-webkit-transform .2s;"');
    links_item.innerHTML = '<span class="VfPpkd-vQzf8d">' + data[i].name + '</span><a class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb" target="_blank" href="' + url + '"></a>';
    document.querySelectorAll('.Uc6QCc>.VfPpkd-dgl2Hf-ppHlrf-sM5MNb')[1].append(links_item);
	setTimeout(function(){
		links_item.style.transform = 'scale(1) translateZ(0px)';
	},1000);
	checkLinks(url);
  }
  /*let add_links = document.createElement('div');
  add_links.classList.add('VfPpkd-LgbsSe', 'VfPpkd-LgbsSe-OWXEXe-INsAgc', 'VfPpkd-LgbsSe-OWXEXe-dgl2Hf', 'Rj2Mlf', 'OLiIxf', 'PDpWxe', 'P62QJc', 'LQeN7', 'LMoCf');
  add_links.setAttribute('style','transform: scale(0) translateZ(0);transition: all .2s cubic-bezier(.4,0,.2,1),box-shadow .2s cubic-bezier(.4,0,1,1),transform .2s,-webkit-box-shadow .2s cubic-bezier(.4,0,1,1),-webkit-transform .2s;"');
  add_links.innerHTML = '<span class="VfPpkd-vQzf8d">申请友链 Submit Link</span><a class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb" onclick="showSubmitFriendLinkDialog();"></a>';
  document.querySelectorAll('.Uc6QCc>.VfPpkd-dgl2Hf-ppHlrf-sM5MNb')[1].append(add_links);
  setTimeout(function(){
	 add_links.style.transform = 'scale(1) translateZ(0px)';
  },1000);*/
}

function checkLinks(url) {
	sendHttpRequest(
   	'POST', 'https://api.aidepro.top/links?from=web&action=check',
    	'url=' + url, false, function(data) {
		console.log(data);
	});
}


function getSponsor() {
	console.log('开始加载感谢人员');
	document.querySelectorAll('.Uc6QCc>.VfPpkd-dgl2Hf-ppHlrf-sM5MNb')[0].innerHTML = '';
	GET_SPONSOR_INTERVAL = setInterval(function() {
		GET_SPONSOR_PAGE = sessionStorage.getItem('GET_SPONSOR_PAGE');
		GET_SPONSOR_PAGE = isEmpty(GET_SPONSOR_PAGE)?0:parseInt(GET_SPONSOR_PAGE);
		GET_SPONSOR_PAGE += 1;
		sessionStorage.setItem('GET_SPONSOR_PAGE', GET_SPONSOR_PAGE);
		sendHttpRequest(
   	 	'GET', 'https://api.aidepro.top/thanks?from=web&page=' + GET_SPONSOR_PAGE + '&count=10',
    	  false, false,
    	  function(data) {
    	    let code = data.code;
			let msg = data.msg;
     	    if (code == 200) {
     	       let _data = data.data;
			   GET_SPONSOR_COUNT = sessionStorage.getItem('GET_SPONSOR_COUNT');
			   GET_SPONSOR_COUNT = isEmpty(GET_SPONSOR_COUNT)?0:parseInt(GET_SPONSOR_COUNT);
			   GET_SPONSOR_COUNT = GET_SPONSOR_COUNT + _data.length;
			   sessionStorage.setItem('GET_SPONSOR_COUNT', GET_SPONSOR_COUNT);
			   console.log('感谢总数',data.total_people,'已获取',GET_SPONSOR_COUNT);
			   setSponsor(_data);
			   if(isEmpty(_data) || GET_SPONSOR_COUNT >= data.total_people){
			   	console.log('感谢人员加载完毕');
				sessionStorage.setItem('GET_SPONSOR_PAGE', 0);
				sessionStorage.setItem('GET_SPONSOR_COUNT', 0);
			   	clearInterval(GET_SPONSOR_INTERVAL);
			   	return;
			   }
    	    }else{
		       showToast(data.msg);
	        }
    	});
	}, 1000);
}

function setSponsor(data) {
  if(isEmpty(data)){
	return;
  }
  for (var i = 0; i < data.length; i++) {
    let sponsor_item = document.createElement('div');
	sponsor_item.classList.add('VfPpkd-LgbsSe', 'VfPpkd-LgbsSe-OWXEXe-INsAgc', 'VfPpkd-LgbsSe-OWXEXe-dgl2Hf', 'Rj2Mlf', 'OLiIxf', 'PDpWxe', 'P62QJc', 'LQeN7', 'LMoCf');
	sponsor_item.setAttribute('style','transform: scale(0) translateZ(0);transition: all .2s cubic-bezier(.4,0,.2,1),box-shadow .2s cubic-bezier(.4,0,1,1),transform .2s,-webkit-box-shadow .2s cubic-bezier(.4,0,1,1),-webkit-transform .2s;"');
    sponsor_item.innerHTML = '<img src="' + data[i].avatar + '" class="abYEib" style="margin-left: -16px;margin-right: 8px;"><span class="VfPpkd-vQzf8d">' + data[i].name + '</span><canvas style="position:absolute;pointer-events:none;"></canvas>';
    document.querySelectorAll('.Uc6QCc>.VfPpkd-dgl2Hf-ppHlrf-sM5MNb')[0].append(sponsor_item);
    sponsor_item.addEventListener('click', function(event) {
      let x = event.clientX;
      let y = event.clientY;
      let myCanvas = sponsor_item.querySelector('canvas');
      let myConfetti = confetti.create(myCanvas, {
        useWorker: true
      });
      myConfetti({
        startVelocity: 10,
        spread: 180
      });
    });
	setTimeout(function(){
		sponsor_item.style.transform = 'scale(1) translateZ(0px)';
	},1000);
  }
}


function getBullet() {
	console.log('开始加载弹幕');
	GET_BULLET_INTERVAL = setInterval(function() {
		GET_BULLET_PAGE = sessionStorage.getItem('GET_BULLET_PAGE');
		GET_BULLET_PAGE = isEmpty(GET_BULLET_PAGE)?0:parseInt(GET_BULLET_PAGE);
		GET_BULLET_PAGE += 1;
		sessionStorage.setItem('GET_BULLET_PAGE', GET_BULLET_PAGE);
		sendHttpRequest(
   	 	'GET', 'https://api.aidepro.top/web/bullet?from=web&page=' + GET_BULLET_PAGE + '&count=10',
    	  false, false,
    	  function(data) {
    	    let code = data.code;
			let msg = data.msg;
     	    if (code == 200) {
     	       let _data = data.data;
			   GET_BULLET_COUNT = sessionStorage.getItem('GET_BULLET_COUNT');
			   GET_BULLET_COUNT = isEmpty(GET_BULLET_COUNT)?0:parseInt(GET_BULLET_COUNT);
			   GET_BULLET_COUNT = GET_BULLET_COUNT + _data.length;
			   sessionStorage.setItem('GET_BULLET_COUNT', GET_BULLET_COUNT);
			   console.log('弹幕总数',data.total,'已获取',GET_BULLET_COUNT);
     	       setBullet(_data);
			   if(isEmpty(_data) || GET_BULLET_COUNT >= data.total){
			   	   console.log('弹幕加载完毕');
				   sessionStorage.setItem('GET_BULLET_PAGE', 0);
				   sessionStorage.setItem('GET_BULLET_COUNT', 0);
			   	   clearInterval(GET_BULLET_INTERVAL);
				   return;
			   }
    	    }else{
		       showToast(data.msg);
	        }
    	});
	}, 1000);
}

function setBullet(data) {
  if(isEmpty(data)){
	return;
  }
  MyukiDanMuObj.shotPool(data);
}

function setLoading(str) {
  /*let value = parseFloat(document.querySelector('.first-indicator').style.transform.split('(')[1].split(')')[0]);
  value = value ? value : 0;
  value += 0.2;
  document.querySelector('.loading-message').innerText = str;*/
  document.querySelector('.first-indicator').style.transform = 'scaleX(1)';
  //if (value >= 1) {
  //getBullet();
  setTimeout(function() {
    document.body.style.overflow = '';
    document.querySelector('#console-splash-021280').style.opacity = 0;
    document.querySelector('#console-splash-021280').style.display = 'none';
  }, 300);
  //}
}

function openRewardDialog(){
	let panel = document.createElement('div');
	panel.classList.add('tie-dialog-bottom-panel');
	panel.setAttribute('style','height: 455px;');
	let spinnerDiv = document.createElement('div');
	spinnerDiv.setAttribute('style','height: 100%;display: flex;justify-content: center;align-items: center;width: 100%;');
	let spinnerCnt = document.createElement('div');
	spinnerCnt.classList.add('mdui-spinner');
	spinnerDiv.append(spinnerCnt);
	let iframe = document.createElement('iframe');
	iframe.classList.add('tie-dialog-bottom-content');
	iframe.id = 'reward_dialog_iframe_id';
	iframe.src = './donate?from=web';
	iframe.setAttribute('frameborder',0);
	iframe.setAttribute('seamless',true);
	iframe.setAttribute('align','middle');
	iframe.setAttribute('marginwidth','0px');
	iframe.setAttribute('marginheight','0px');
	iframe.setAttribute('width','100%');
	iframe.setAttribute('height','100%');
	iframe.setAttribute('style','display: none;width: 100%;min-height: 100%;display: block;margin: 0;border-top-left-radius: 10px;border-top-right-radius: 10px;');
	let mask = document.createElement('div');
	mask.classList.add('tie-dialog-bottom-mask');
	REWARD_DIALOG = document.createElement('div');
	REWARD_DIALOG.classList.add('tie-dialog-bottom', 'dialog-show');
	panel.append(spinnerDiv);
	panel.append(iframe);
	REWARD_DIALOG.append(mask);
	REWARD_DIALOG.append(panel);
	mask.addEventListener('click', function(event) {
		dismissRewardDialog();
	});
	panel.classList.add('swipe-up');
	mask.classList.add('fade-in');
	iframe.style.display = 'block';
	REWARD_DIALOG.style.display = 'block';
	document.body.appendChild(REWARD_DIALOG);
	document.body.classList.add('open-dialog');
	mdui.mutation();
	iframe.onload = function(){
      spinnerDiv.style.display = 'none';
      iframe.style.display = 'block';
    };
};

function dismissRewardDialog() {
	let panel = REWARD_DIALOG.children[1];
	let mask = REWARD_DIALOG.children[0];
	let content = REWARD_DIALOG.children[1].children[2];
	panel.classList.add('swipe-down');
	mask.classList.add('fade-out');
	setTimeout(function() {
		REWARD_DIALOG.parentNode.removeChild(REWARD_DIALOG);
		REWARD_DIALOG.classList.remove('dialog-show');
	}, 200);
	document.body.classList.remove('open-dialog');
}