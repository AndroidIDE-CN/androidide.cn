var REWARD_DIALOG;
var VERIFY_CODE_SIGN;
var SUBMIT_FRIEND_LINK_DIALOG;
var SUBSCRIBE_EMAIL_DIALOG;
var GET_LINKS_INTERVAL;
var GET_BULLET_INTERVAL;
var GET_SPONSOR_INTERVAL;
var SEND_BUTTON_INTERVAL;
var LOGIN_ADMIN_DIALOG;
var ADMIN_VERSION_DIALOG;
var FULL_SCREEN_DIALOG_TITLE;
var FULL_SCREEN_DIALOG_SET_OTHER_BTN = false;

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
    _openLoadUrlDialog('历史版本 Historic Version', './version', 1);
  }
  document.querySelector('.u4ICaf>div>button').onclick = function(){
    _openLoadUrlDialog('历史版本 Historic Version', './version', 1);
  }
  document.querySelector('.kk2r5b>.IZOk1>.kuvzJc').onclick = function(){
    showAdminLoginDialog();
  }
  let _element2 = document.querySelectorAll('.KvNvKe');
  _element2[0].onclick = function(){
    _openLoadUrlDialog('用户协议 Use Agreement', './agreement/', 2);
  }
  _element2[1].onclick = function(){
    _openLoadUrlDialog('隐私政策 Privacy Policy', './agreement/privacy/', 2);
  }
  _element2[2].onclick = function(){
    _openLoadUrlDialog('免责声明 Disclaimer', './about/copyright/', 2);
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
	  document.querySelector('.PyyLUd>.mdui-card-menu').style.display = 'none';
	  document.querySelector('.fg1d2g>a.ulKokd').innerText = '管理版本';
	  document.querySelector('.fg1d2g>a.ulKokd').onclick = function(){
	    showVersionAdminDialog();
	  }
	  document.querySelector('.kk2r5b>.IZOk1').style.display = 'none';
	  document.querySelector('.u4ICaf>div>button').innerText = '管理版本';
	  document.querySelector('.u4ICaf>div>button').onclick = function(){
	    showVersionAdminDialog();
	  }
	  let _element3 = document.querySelectorAll('.KvNvKe>p');
	  _element3[0].innerText = '管理网站';
	  _element2[0].onclick = function(){
	    console.log('管理网站');
	  }
	  _element3[1].innerText = '管理赞助';
	  _element2[1].onclick = function(){
	    console.log('管理赞助');
	  }
	  _element3[2].innerText = '管理版本';
	  _element2[2].onclick = function(){
	    showVersionAdminDialog();
	  }
	  document.querySelector('#SubmitLink>p').innerText = '管理友链';
	  document.querySelector('#SubmitLink').onclick = function(){
	    console.log('管理友链');
	  }
	  document.querySelector('#Subscribe>p').innerText = '管理订阅';
	  document.querySelector('#Subscribe').onclick = function(){
	    console.log('管理订阅');
	  }
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
	  sendVerificeCode(document.querySelector('#subscribe_mail_dialog_email_input').value, 'https://api.aidepro.top/subscriber?action=verify', '', '#subscribe_mail_dialog_verificeCode_send_btn');
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
	sendVerificeCode(document.querySelector('#submit_friendlink_dialog_email_input').value, 'https://api.aidepro.top/links?action=verify', 'url=' + document.querySelector('#submit_friendlink_dialog_url_input').value + '&name=' + document.querySelector('#submit_friendlink_dialog_name_input').value + '&info=' + document.querySelector('#submit_friendlink_dialog_info_input').value, document.querySelector('#submit_friendlink_dialog_email_input').value, '#submit_friendlink_dialog_verificeCode_send_btn');
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
    false, function(success, data) {
      if (!success) {
        showToast('网络错误 Network Error');
        return;
      }
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
  sendHttpRequest('POST', 'https://api.aidepro.top/links',
    'url=' + link + '&name=' + name + '&info=' + info + '&email=' + email + '&code=' + verificeCode + '&sign=' + VERIFY_CODE_SIGN,
    false, function(success, data) {
      if (!success) {
        showToast('网络错误 Network Error');
        return;
      }
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
  sendHttpRequest('POST', 'https://api.aidepro.top/subscriber',
    'email=' + email + '&code=' + verificeCode + '&sign=' + VERIFY_CODE_SIGN,
    false, function(success, data) {
      if (!success) {
        showToast('网络错误 Network Error');
        return;
      }
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
	  sendVerificeCode(document.querySelector('#login_admin_dialog_email_input').value, 'https://api.aidepro.top/admin?action=verify', '', '#login_admin_dialog_verificeCode_send_btn');
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
  sendHttpRequest('POST', 'https://api.aidepro.top/admin',
    'email=' + email + '&code=' + verificeCode + '&sign=' + VERIFY_CODE_SIGN,
    false, function(success, data) {
      if (!success) {
        showToast('网络错误 Network Error');
        return;
      }
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
    'https://api.aidepro.top/web',
    false,
    false,
    function(success, data) {
      if (!success) {
        showToast('网络错误 Network Error');
        return;
      }
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
    function(success, data) {
      if (!success) {
        showToast('网络错误 Network Error');
        return;
      }
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
  sendHttpRequest('GET', (type == 1) ? 'https://api.aidepro.top/contact?type=numbers' : 'https://api.aidepro.top/contact', false,
    false,
    function(success, data) {
      if (!success) {
        showToast('网络错误 Network Error');
        return;
      }
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
		obj2[0].innerText = 'QQ群 Group (' + data.group + '/1000)';
	}
	obj2[1].innerText = 'QQ频道 Guild';
    if(data.guild){
		obj2[1].innerText = 'QQ频道 Guild (' + data.guild + '/5000)';
	}
	obj2[2].innerText = 'Telegram';
    if(data.telegram){
		obj2[2].innerText = 'Telegram (' + data.telegram + '/500)';
	}
  }
}


function getLinks() {
	console.log('开始加载友链');
	GET_LINKS_INTERVAL = setInterval(function() {
		GET_LINKS_PAGE = sessionStorage.getItem('GET_LINKS_PAGE');
		GET_LINKS_PAGE = isEmpty(GET_LINKS_PAGE)?0:parseInt(GET_LINKS_PAGE);
		GET_LINKS_PAGE += 1;
		sessionStorage.setItem('GET_LINKS_PAGE', GET_LINKS_PAGE);
		sendHttpRequest(
   	 	'GET', 'https://api.aidepro.top/links?page=' + GET_LINKS_PAGE + '&count=10',
    	  false, false,
    	  function(success, data) {
    	    if (!success) {
     	       showToast('网络错误 Network Error');
     	       return;
    	    }
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
			   if(GET_LINKS_COUNT >= data.total){
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
  document.querySelectorAll('.Uc6QCc>.VfPpkd-dgl2Hf-ppHlrf-sM5MNb')[1].innerHTML = '';
  let add_gthub = document.createElement('div');
  add_gthub.classList.add('VfPpkd-LgbsSe', 'VfPpkd-LgbsSe-OWXEXe-INsAgc', 'VfPpkd-LgbsSe-OWXEXe-dgl2Hf', 'Rj2Mlf', 'OLiIxf', 'PDpWxe', 'P62QJc', 'LQeN7', 'LMoCf');
  add_gthub.setAttribute('style','transform: scale(0) translateZ(0);transition: all .2s cubic-bezier(.4,0,.2,1),box-shadow .2s cubic-bezier(.4,0,1,1),transform .2s,-webkit-box-shadow .2s cubic-bezier(.4,0,1,1),-webkit-transform .2s;"');
  add_gthub.innerHTML = '<span class="VfPpkd-vQzf8d">Github</span><a class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb" target="_blank" href="https://github.com/AndroIDE-Pro"></a>';
  document.querySelectorAll('.Uc6QCc>.VfPpkd-dgl2Hf-ppHlrf-sM5MNb')[1].append(add_gthub);
  setTimeout(function(){
	 add_gthub.style.transform = 'scale(1) translateZ(0px)';
  },1000);
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
   	'POST', 'https://api.aidepro.top/links?action=check',
    	'url=' + url, false, function(success, _data) {
    	if (!success) {
     	    showToast('网络错误 Network Error');
     	    return;
    	}
		console.log(_data);
	});
}


function getSponsor() {
	console.log('开始加载赞助人员');
	GET_SPONSOR_INTERVAL = setInterval(function() {
		GET_SPONSOR_PAGE = sessionStorage.getItem('GET_SPONSOR_PAGE');
		GET_SPONSOR_PAGE = isEmpty(GET_SPONSOR_PAGE)?0:parseInt(GET_SPONSOR_PAGE);
		GET_SPONSOR_PAGE += 1;
		sessionStorage.setItem('GET_SPONSOR_PAGE', GET_SPONSOR_PAGE);
		sendHttpRequest(
   	 	'GET', 'https://api.aidepro.top/sponsor?page=' + GET_SPONSOR_PAGE + '&count=10',
    	  false, false,
    	  function(success, data) {
    	    if (!success) {
     	       showToast('网络错误 Network Error');
     	       return;
    	    }
    	    let code = data.code;
			let msg = data.msg;
     	    if (code == 200) {
     	       let _data = data.data;
			   GET_SPONSOR_COUNT = sessionStorage.getItem('GET_SPONSOR_COUNT');
			   GET_SPONSOR_COUNT = isEmpty(GET_SPONSOR_COUNT)?0:parseInt(GET_SPONSOR_COUNT);
			   GET_SPONSOR_COUNT = GET_SPONSOR_COUNT + _data.length;
			   sessionStorage.setItem('GET_SPONSOR_COUNT', GET_SPONSOR_COUNT);
			   console.log('赞助总数',data.total_people,'已获取',GET_SPONSOR_COUNT);
     	       document.querySelectorAll('.Uc6QCc>.VMq4uf')[0].innerText = '已有' + data.total_people + '人赞助 (' + data.total_people + ' people donated)';
			   setSponsor(_data);
			   if(GET_SPONSOR_COUNT >= data.total_people){
			   	console.log('赞助人员加载完毕');
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
  document.querySelectorAll('.Uc6QCc>.VfPpkd-dgl2Hf-ppHlrf-sM5MNb')[0].innerHTML = '';
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
   	 	'GET', 'https://api.aidepro.top/web/bullet?page=' + GET_BULLET_PAGE + '&count=10',
    	  false, false,
    	  function(success, data) {
    	    if (!success) {
     	       showToast('网络错误 Network Error');
     	       return;
    	    }
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
			   if(GET_BULLET_COUNT >= data.total){
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
	iframe.src = './donate/index.html';
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
		dismissDialog();
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

function dismissDialog() {
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

function showVersionAdminDialog(){
	ADMIN_VERSION_DIALOG = openFullScreenDialog(
		'管理版本',
		'<div id="admin_version_list_div" class="layout-root mdui-row-xs-1 mdui-row-sm-2 mdui-m-a-0"><div class="mdui-col mdui-p-l-1 mdui-p-r-1 mdui-p-t-2"><div class="mdui-card mdui-hoverable"><div class="mdui-card-menu"><button onclick="showVersionEditDialog(\'release\');" class="mdui-btn mdui-btn-icon mdui-btn-dense mdui-text-color-theme-icon"><i class="mdui-icon material-icons">edit</i></button></div><div class="mdui-card-primary mdui-p-t-2 mdui-p-b-0"><div class="mdui-typo-title mdui-valign"><span id="release_version_name"></span><div class="mdui-typo mdui-m-l-1"><p class="mdui-typo-subheading"><kbd class="mdui-color-pink">正式版</kbd></p></div></div><div id="release_version_update_time" class="mdui-card-primary-subtitle"></div></div><div id="release_version_update_log" class="mdui-card-content mdui-p-t-1 mdui-p-b-0" style="overflow: hidden;text-overflow: ellipsis;-webkit-line-clamp: 5;display: -webkit-box;-webkit-box-orient: vertical;"></div><div class="mdui-card-actions"><button onclick="showVersionEditDialog(\'release\');" class="mdui-btn mdui-color-theme-accent mdui-ripple mdui-float-right" style="display: none;">编辑</button></div></div></div><div class="mdui-col mdui-p-l-1 mdui-p-r-1 mdui-p-t-2"><div class="mdui-card mdui-hoverable"><div class="mdui-card-menu"><button onclick="showVersionEditDialog(\'beta\');" class="mdui-btn mdui-btn-icon mdui-btn-dense mdui-text-color-theme-icon"><i class="mdui-icon material-icons">edit</i></button></div><div class="mdui-card-primary mdui-p-t-2 mdui-p-b-0"><div class="mdui-typo-title mdui-valign"><span id="beta_version_name"></span><div class="mdui-typo mdui-m-l-1"><p class="mdui-typo-subheading"><kbd class="mdui-color-pink">测试版</kbd></p></div></div><div id="beta_version_update_time" class="mdui-card-primary-subtitle"></div></div><div id="beta_version_update_log" class="mdui-card-content mdui-p-t-1 mdui-p-b-0" style="overflow: hidden;text-overflow: ellipsis;-webkit-line-clamp: 5;display: -webkit-box;-webkit-box-orient: vertical;"></div><div class="mdui-card-actions"><button onclick="showVersionEditDialog(\'beta\');" class="mdui-btn mdui-color-theme-accent mdui-ripple mdui-float-right" style="display: none;">编辑</button></div></div></div></div><form class="mdui-p-x-3" id="admin_update_edit_form"></form>',
		'更新', function(){
			if(FULL_SCREEN_DIALOG_SET_OTHER_BTN){
				document.querySelector('#admin_version_list_div').style.display = 'block';
				document.querySelector('#admin_update_edit_form').style.display = 'none';
			}
		}, function(){
			showUpdateEditDialog();
	});
	setVersionAdminDialog();
}

function setVersionAdminDialog() {
	sendHttpRequest(
   		'GET', 'https://api.aidepro.top/version?action=admin',
    	false, false, function(success, data) {
    	if (!success) {
     	    showToast('网络错误 Network Error');
     	    return;
    	}
    	let code = data.code;
		let msg = data.msg;
     	if (code == 200) {
			let releaseVersionName = data.data.release.versionName;
			let releaseVersionCode = data.data.release.versionCode;
			let releaseUpdateLog = data.data.release.updateLog;
			let releaseDeveloper = data.data.release.developer;
			let releaseUpdateTime = data.data.release.updateTime;
			let betaVersionName = data.data.beta.versionName;
			let betaVersionCode = data.data.beta.versionCode;
			let betaUpdateLog = data.data.beta.updateLog;
			let betaDeveloper = data.data.beta.developer;
			let betaUpdateTime = data.data.beta.updateTime;
			document.querySelector('#release_version_name').innerText = releaseVersionName;
			document.querySelector('#release_version_update_time').innerText = releaseDeveloper + ' 发布于 ' + stampToDateText(releaseUpdateTime * 1000, 'Y-m-d H:i:s');
			document.querySelector('#release_version_update_log').innerText = releaseUpdateLog;
			document.querySelector('#beta_version_name').innerText = betaVersionName;
			document.querySelector('#beta_version_update_time').innerText = betaDeveloper + ' 发布于 ' + stampToDateText(betaUpdateTime * 1000, 'Y-m-d H:i:s');
			document.querySelector('#beta_version_update_log').innerText = betaUpdateLog;
			hideFullScreenDlgLoad();
			mdui.mutation();
			mdui.updateTextFields();
		} else {
			showToast(msg);
			ADMIN_VERSION_DIALOG.close();
		}
	});
}

function showUpdateEditDialog(){
	setFullScreenDialogTitle('更新版本');
	document.querySelector('#admin_version_list_div').style.display = 'none';
	document.querySelector('#admin_update_edit_form').style.display = 'block';
	showFullScreenDlgLoad();
	setFullScreenDlgBtn('发布', function(){
		submitUpdateVersion('', serializeParam('#admin_update_edit_form'));
	});
	sendHttpRequest(
   		'GET', 'https://api.aidepro.top/version/last?from=web&action=admin',
    	false, false, function(success, data) {
    	if (!success) {
     	    showToast('网络错误 Network Error');
     	    return;
    	}
    	let code = data.code;
		let msg = data.msg;
     	if (code == 200) {
			let targetVersion = data.data.versionCode;
			setUpdateEditDialog('', '', 1, targetVersion, '', '', false);
		} else {
			showToast(msg);
		}
	});
}

function showVersionEditDialog(type){
	setFullScreenDialogTitle('编辑版本');
	document.querySelector('#admin_version_list_div').style.display = 'none';
	document.querySelector('#admin_update_edit_form').style.display = 'block';
	showFullScreenDlgLoad();
	setFullScreenDlgBtn('提交', function(){
		submitUpdateVersion(type, serializeParam('#admin_update_edit_form'));
	});
	sendHttpRequest(
   		'GET', 'https://api.aidepro.top/version/last?from=web&action=admin&type=' + type,
    	false, false, function(success, data) {
    	if (!success) {
     	    showToast('网络错误 Network Error');
     	    return;
    	}
    	let code = data.code;
		let msg = data.msg;
     	if (code == 200) {
			let versionName = data.data.versionName;
			let versionCode = data.data.versionCode;
			let minVersion = data.data.minVersion;
			let targetVersion = data.data.targetVersion;
			let updateLog = data.data.updateLog;
			let debug = data.data.debug;
			let downloadLink = data.data.downloadUrl;
			setUpdateEditDialog(versionName, versionCode, minVersion, targetVersion, updateLog, downloadLink, (debug==1?true:false));
		} else {
			showToast(msg);
		}
	});
}

function setUpdateEditDialog(versionName, versionCode, minVersion, targetVersion, updateLog, downloadLink, debug) {
	document.querySelector('#mdui_full_dialog_cont>#admin_update_edit_form').innerHTML = '<div style="display: flex;align-items: center"><div class="mdui-textfield mdui-m-r-2" style="width:50%;"><label class="mdui-textfield-label">versionName</label><input class="mdui-textfield-input" type="text" name="version_name" value="' + versionName + '" required /><div class="mdui-textfield-error">版本名称不能为空</div><div class="mdui-textfield-helper">当前版本公开名称</div></div><div class="mdui-textfield" style="flex-grow:1;"><label class="mdui-textfield-label">versionCode</label><input class="mdui-textfield-input" type="number" name="version_code" value="' + versionCode + '" required /><div class="mdui-textfield-error">须为整数且不为空</div><div class="mdui-textfield-helper">当前版本内部代码</div></div></div><div style="display: flex;align-items: center"><div class="mdui-textfield mdui-m-r-2" style="width:50%;"><label class="mdui-textfield-label">minVersion</label><input class="mdui-textfield-input" type="number" name="min_version" value="' + minVersion + '" required /><div class="mdui-textfield-error">须为整数且不为空</div><div class="mdui-textfield-helper">该版本及以上会收到更新</div></div><div class="mdui-textfield" style="flex-grow:1;"><label class="mdui-textfield-label">targetVersion</label><input class="mdui-textfield-input" type="number" name="target_version" value="' + targetVersion + '" required /><div class="mdui-textfield-error">须为整数且不为空</div><div class="mdui-textfield-helper">该版本及以下会收到更新</div></div></div><div class="mdui-textfield"><label class="mdui-textfield-label">本次更新日志（建议中英文）</label><textarea class="mdui-textfield-input" style="min-height:150px;" type="text" name="update_log" maxlength="500" required>' + updateLog + '</textarea><div class="mdui-textfield-error">更新日志不能为空</div><div class="mdui-textfield-helper">最少10个字，不超过500字</div></div><div class="mdui-textfield"><label class="mdui-textfield-label">网盘链接（不支持文件夹）</label><input class="mdui-textfield-input" type="text" name="download_link" value="' + downloadLink + '" required /><div class="mdui-textfield-error">网盘链接不能为空</div><div class="mdui-textfield-helper">限Workdrive/天翼网盘/蓝奏云/123云盘</div></div><div class="mdui-p-a-1 mdui-float-right"><label class="mdui-switch"><span class="mdui-m-r-1">是否测试版</span><input name="debug" type="checkbox"' + (debug?' checked':'') + '/><i class="mdui-switch-icon"></i></label></div>';
	hideFullScreenDlgLoad();
	mdui.mutation();
	mdui.updateTextFields();
}

function submitUpdateVersion(type, data){
  console.log(data);
  if(isEmpty(data)){
	showToast('数据为空 data cannot be empty');
	return;
  }
  sendHttpRequest('POST', 'https://api.aidepro.top/version' + (isEmpty(type)?'':'?action=update&version=' + type),
    data, false, function(success, data) {
      if (!success) {
        showToast('网络错误 Network Error');
        return;
      }
      let code = data.code;
	  let msg = data.msg;
	  if (code == 200) {
		  showFullScreenDlgLoad();
		  returnFullScreenDlgBack();
		  document.querySelector('#admin_version_list_div').style.display = 'block';
		  document.querySelector('#admin_update_edit_form').style.display = 'none';
		  setVersionAdminDialog();
	  }
	  showToast(msg);
  });
}

function openFullScreenDialog(title, cont, btnStr, callback1, callback2) {
	FULL_SCREEN_DIALOG_TITLE = title;
	showFullScreenDlgLoad();
	let full_screen_dialog = new mdui.Dialog('#mdui_full_dialog', {
		history: false,
		modal: true
	});
	full_screen_dialog.open();
	document.querySelector('#mdui_full_dialog_tle').innerText = title;
	document.querySelector('#mdui_full_dialog_cont').innerHTML = cont;
	document.querySelector('#mdui_full_dialog_right_btn').innerText = btnStr;
	document.querySelector('#mdui_full_dialog_right_btn').style.display = 'block';
	mdui.mutation();
    full_screen_dialog.handleUpdate();
	document.querySelector('#mdui_full_dialog_left_btn').onclick = function(){
		if(FULL_SCREEN_DIALOG_SET_OTHER_BTN){
			if(callback1){
				callback1();
			}
			returnFullScreenDlgBack();
		}else{
			full_screen_dialog.close();
		}
	}
	document.querySelector('#mdui_full_dialog_right_btn').onclick = function(){
		if(callback2){
			callback2();
		}
	}
	return full_screen_dialog
}

function setFullScreenDialogTitle(title){
	document.querySelector('#mdui_full_dialog_tle').innerText = title;
}

function showFullScreenDlgLoad(){
	document.querySelector('#mdui_full_dialog_load_tle').style.display = 'block';
	document.querySelector('#mdui_full_dialog_load_cont').style.display = 'flex';
	document.querySelector('#mdui_full_dialog_tle').style.display = 'none';
	document.querySelector('#mdui_full_dialog_tle_input').style.display = 'none';
	document.querySelector('#mdui_full_dialog_right_btn').style.display = 'none';
	document.querySelector('#mdui_full_dialog_other_btn').style.display = 'none';
	document.querySelector('#mdui_full_dialog_cont').style.display = 'none';
}
	
function hideFullScreenDlgLoad(){
	document.querySelector('#mdui_full_dialog_load_tle').style.display = 'none';
	document.querySelector('#mdui_full_dialog_tle').style.display = 'block';
	//document.querySelector('#mdui_full_dialog_tle_input').style.display = 'block';
	if(FULL_SCREEN_DIALOG_SET_OTHER_BTN){
		document.querySelector('#mdui_full_dialog_other_btn').style.display = 'block';
	}else{
		document.querySelector('#mdui_full_dialog_right_btn').style.display = 'block';
	}
	document.querySelector('#mdui_full_dialog_cont').style.display = 'block';
	document.querySelector('#mdui_full_dialog_load_cont').style.display = 'none';
}

function setFullScreenDlgBtn(txt, callback){
	FULL_SCREEN_DIALOG_SET_OTHER_BTN = true;
	document.querySelector('#mdui_full_dialog_other_btn').innerText = txt;
	document.querySelector('#mdui_full_dialog_right_btn').style.display = 'none';
	document.querySelector('#mdui_full_dialog_other_btn').style.display = 'block';
	document.querySelector('#mdui_full_dialog_other_btn').onclick = function(){
		if(callback){
			callback();
		}
	}
}

function returnFullScreenDlgBack(){
	FULL_SCREEN_DIALOG_SET_OTHER_BTN = false;
	document.querySelector('#mdui_full_dialog_tle').innerText = FULL_SCREEN_DIALOG_TITLE;
	document.querySelector('#mdui_full_dialog_other_btn').style.display = 'none';
	document.querySelector('#mdui_full_dialog_right_btn').style.display = 'block';
	document.querySelector('#mdui_full_dialog_other_btn').onclick = null;
}