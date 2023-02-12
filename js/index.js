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
let __countUpOptions = _countUpOptions;
__countUpOptions.suffix = 'MB';
__countUpOptions.decimalPlaces = 2;
var _InstallPkgSize = new countUp.CountUp('_pkgSize', parseFloat(localStorage.getItem('_InstallPkgSize') | 0), __countUpOptions);
 _InstallPkgSize.start();
initialization();
var REWARD_DIALOG;

function initialization(){
  let _element = document.querySelectorAll('.u4ICaf>.VfPpkd-dgl2Hf-ppHlrf-sM5MNb>.VfPpkd-LgbsSe');
  for (let i = 0; i < _element.length; i++) {
    _element[i].addEventListener('click', function() {
      //ajax('GET', 'https://api.aidepro.top/files/apk', false, false, null);
    });
  }
  getBullet();
  getVersion();
  getConfig();
  getContact(0);
  getSponsor();
  getLinks();
  getContact(1);
  setLoading(false);
  document.querySelector('.fg1d2g>a.ulKokd').onclick = function(){
    _openLoadUrlDialog('历史版本 Historic Version', 'https://api.aidepro.top/version?type=html', 1);
  }
  document.querySelector('.u4ICaf>div>button').onclick = function(){
    _openLoadUrlDialog('历史版本 Historic Version', 'https://api.aidepro.top/version?type=html', 1);
  }
  let _element2 = document.querySelectorAll('.KvNvKe>.AU8vyc');
  _element2[0].onclick = function(){
    _openLoadUrlDialog('用户协议 Use Agreement', './agreement/', 2);
  }
  _element2[1].onclick = function(){
    _openLoadUrlDialog('隐私政策 Privacy Policy', './agreement/privacy/', 2);
  }
  _element2[2].onclick = function(){
    _openLoadUrlDialog('免责声明 Disclaimer', './about/copyright/', 2);
  }
  document.querySelectorAll('.o45e4d>c-wiz>section>div>.vfQhrf.BxIr0d>div>div')[3].onclick = function(){
    openRewardDialog();
  }
  document.querySelector('.KvNvKe>.AJ34ce>.yVZQTb>a').onclick = function(){
    let _subscribeMailDlg = mdui.dialog({
      title: '订阅更新 Subscribe for updates',
      content: '<div class="mdui-textfield"><label class="mdui-textfield-label">订阅邮箱 Email</label><input id="subscribe_mail_dialog_email_input" class="mdui-textfield-input" type="email" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">有更新将发邮件提醒 Updates will be sent to this mailbox</div></div><div class="mdui-textfield" style="margin-right: 136px;overflow: visible;"><label class="mdui-textfield-label">验证码 Verifice Code</label><input id="subscribe_mail_dialog_verificeCode_input" class="mdui-textfield-input" type="number" maxlength="6" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper"></div><button class="mdui-btn" type="button" id="subscribe_mail_dialog_verificeCode_send_btn" style="position: absolute;right: -136px;bottom: 29px;padding: 0;"><div class="m-button"><p>发送验证码</p><p class="btn-english">Send verifice code</p></div></button></div>',
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
    _subscribeMailDlg.$element[0].style.maxWidth = '448px';
    mdui.mutation();
    _subscribeMailDlg.handleUpdate();
    document.querySelector('#subscribe_mail_dialog_verificeCode_send_btn').onclick = function(){
      sendSubscribeEmailverificeCode(document.querySelector('#subscribe_mail_dialog_email_input').value);
    }
  }
}

window.onload = function(event) {
   ajax('GET','https://api.aidepro.top/sync',false,false,null);
   
};

function showSubmitFriendLinkDialog(){
  let _submitFriendLinkDlg = mdui.dialog({
    title: '申请友链 Submit Link',
    content: '<div><div><div class="mdui-textfield"><i class="mdui-icon material-icons">link</i><label class="mdui-textfield-label">网站链接 Website Link</label><input id="submit_friendlink_dialog_url_input" class="mdui-textfield-input" type="text" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填/Required</div></div><div class="mdui-textfield"><i class="mdui-icon material-icons">help</i><label class="mdui-textfield-label">网站介绍 Website Introduction</label><textarea class="mdui-textfield-input" id="submit_friendlink_dialog_info_input" maxlength="50" required></textarea><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填，不超过50字/Required</div></div></div><div class="mdui-textfield"><i class="mdui-icon material-icons">email</i><label class="mdui-textfield-label">联系邮箱 Email</label><input id="submit_friendlink_dialog_email_input" class="mdui-textfield-input" type="email" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填/Required</div></div><div class="mdui-textfield" style="margin-right: 136px;overflow: visible;"><i class="mdui-icon material-icons">textsms</i><label class="mdui-textfield-label">验证码 Verifice Code</label><input class="mdui-textfield-input" id="submit_friendlink_dialog_code_input" type="number" required/><div class="mdui-textfield-error">不能为空 Can\'t be empty</div><div class="mdui-textfield-helper">必填/Required</div><button class="mdui-btn" type="button" style="position: absolute;right: -136px;bottom: 29px;padding: 0;"><div class="m-button"><p>发送验证码</p><p class="btn-english">Send verifice code</p></div></button></div></div>',
    buttons: [
        {
          text: '<div class="m-button"><p>提交</p><p class="btn-english">Submit</p></div>',
          close: false,
          onClick: function(inst){
			  let email = document.querySelector('#submit_friendlink_dialog_email_input').value;
			  console.log(email);
          }
        },
        {
          text: '<div class="m-button"><p>取消</p><p class="btn-english">Cancel</p></div>'
        }
      ]
  });
  _submitFriendLinkDlg.$element[0].style.maxWidth = '448px';
  mdui.mutation();
  _submitFriendLinkDlg.handleUpdate();
}

function sendSponsorVerificeCode(account){
  
}

function getPaymentUrl(amount, account, verificeCode, name, qq, remark){
  
}

function sendSubscribeEmailverificeCode(email){
  console.log(email);
}

function submitSubscribeEmail(email, verificeCode){
  console.log(email, verificeCode);
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
  ajax(
    'GET',
    'https://api.aidepro.top/web',
    false,
    false,
    function(success, data) {
      if (!success) {
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
        document.querySelector('.bARER>html-blob').innerHTML = replaceNewline(info);
      }
    });
}

function setScreenshot(data) {
  let content = '';
  for (var i = 0; i < data.length; i++) {
    content += '<div class="ULeU3b Utde2e">\
		<div class="Atcj9b">\
		<img src="' + data[i] + '" class="T75of B5GQxf">\
		</div>\
		</div>';
  }
  document.querySelector('.aoJE7e.qwPPwf').innerHTML = content;
}

function getVersion() {
  ajax(
    'GET',
    'https://api.aidepro.top/version/last',
    false,
    false,
    function(success, data) {
      if (!success) {
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
        let fileSize = _data.fileSize;
        let updateTime = _data.updateTime;
        setInfo(bytesToSize(fileSize), false, stampToDate(updateTime * 1000, 'Y-m-d', false), false, false, 1);
        //document.querySelector('.VAgTTd.LMcLV>div>div>div>a').innerText = '获取(' + bytesToSize(fileSize) + ')';
        document.querySelector('.fg1d2g>.u4ICaf>div>a').href = downloadUrl;
        document.querySelector('.VAgTTd.LMcLV>div>div>div>a').href = downloadUrl;
        document.querySelectorAll('.HcyOxe>.cswwxf>.VMq4uf')[1].innerText = 'Ver ' + versionName;
        document.querySelector('c-wiz>section>.SfzRHd').innerHTML = replaceNewline(updateLog);
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
  if (pkgSize) {
    localStorage.setItem('_InstallPkgSize', parseFloat(pkgSize));
    _InstallPkgSize.update(parseFloat(pkgSize));
  }
  if (updateTime) {
    obj[1].innerText = updateTime;
  }
}

function getContact(type) {
  ajax('GET', (type == 1) ? 'https://api.aidepro.top/contact?type=numbers' : 'https://api.aidepro.top/contact', false,
    false,
    function(success, data) {
      if (!success) {
        return;
      }
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        setContact(type, _data);
      }
    });
}

function setContact(type, data) {
  if (type == 0) {
    let obj = document.querySelectorAll('.o45e4d>c-wiz>section>div>.vfQhrf.BxIr0d>div>div>a>div>.pSEeg');
    let _obj = document.querySelectorAll('.o45e4d>c-wiz>section>div>.vfQhrf.BxIr0d>div>div>a');
    obj[0].innerText = data.group[0];
    _obj[0].href = data.group[1];
    obj[1].innerText = data.guild[0];
    _obj[1].href = data.guild[1];
	obj[2].innerText = data.telegram[0];
    _obj[2].href = data.telegram[1];
  } else {
    let obj2 = document.querySelectorAll('.o45e4d>c-wiz>section>div>.vfQhrf.BxIr0d>div>div>a>div>.xFVDSb');
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
  ajax(
    'GET',
    'https://api.aidepro.top/links?page=1&count=10',
    false,
    false,
    function(success, data) {
      if (!success) {
        return;
      }
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        setLinks(_data);
      }
    });
}

function setLinks(data) {
  let content = '<div class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-INsAgc VfPpkd-LgbsSe-OWXEXe-dgl2Hf Rj2Mlf OLiIxf PDpWxe P62QJc LQeN7 LMoCf">\
		<span class="VfPpkd-vQzf8d">Github</span>\
		<a class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb" target="_blank" href="https://github.com/AndroIDE-Pro"></a>\
		</div>';
  for (var i = 0; i < data.length; i++) {
    content += '<div class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-INsAgc VfPpkd-LgbsSe-OWXEXe-dgl2Hf Rj2Mlf OLiIxf PDpWxe P62QJc LQeN7 LMoCf">\
		<span class="VfPpkd-vQzf8d">' + data[i].name + '</span>\
		<a class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb" target="_blank" href="' + data[i].url + '"></a>\
		</div>';
  }
  content += '<div class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-INsAgc VfPpkd-LgbsSe-OWXEXe-dgl2Hf Rj2Mlf OLiIxf PDpWxe P62QJc LQeN7 LMoCf">\
		<span class="VfPpkd-vQzf8d">申请友链 Submit Link</span>\
		<a class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb" onclick="showSubmitFriendLinkDialog();"></a>\
		</div>';
  document.querySelectorAll('.Uc6QCc>div')[1].innerHTML = content;
}

function getSponsor() {
  ajax(
    'GET',
    'https://api.aidepro.top/sponsor?page=1&count=10',
    false,
    false,
    function(success, data) {
      if (!success) {
        return;
      }
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        document.querySelectorAll('.Uc6QCc>.VMq4uf')[0].innerText = '已有' + data.total_people + '人赞助 (' + data.total_people + ' people donated)';
        setSponsor(_data);
      }
    });
}

function setSponsor(data) {
  document.querySelectorAll('.Uc6QCc>div')[0].innerHTML = '';
  for (var i = 0; i < data.length; i++) {
    let div = document.createElement('div');
    div.classList.add('VfPpkd-LgbsSe', 'VfPpkd-LgbsSe-OWXEXe-INsAgc', 'VfPpkd-LgbsSe-OWXEXe-dgl2Hf', 'Rj2Mlf', 'OLiIxf', 'PDpWxe', 'P62QJc', 'LQeN7', 'LMoCf');
    let content = '<img src="' + data[i].avatar + '" class="abYEib" style="margin-left: -16px;margin-right: 8px;">\
		<span class="VfPpkd-vQzf8d">' + data[i].name + '</span>\
      <canvas style="position:absolute;pointer-events:none;"></canvas>';
    div.innerHTML = content;
    document.querySelectorAll('.Uc6QCc>div')[0].append(div);
    div.addEventListener('click', function(event) {
      let x = event.clientX;
      let y = event.clientY;
      let myCanvas = div.querySelector('canvas');
      let myConfetti = confetti.create(myCanvas, {
        useWorker: true
      });
      myConfetti({
        startVelocity: 10,
        spread: 180
      });
    });
  }
}

function getBullet() {
  ajax(
    'GET',
    'https://api.aidepro.top/web/bullet?page=1&count=10',
    false,
    false,
    function(success, data) {
      if (!success) {
        return;
      }
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        setBullet(_data);
      }
    });
}

function setBullet(data) {
  var danmuObj = $MDM({
    locate: '.PyyLUd',
    curtain: 'transparent',
    speed: 10,
    avatar: 'https://previewengine.zoho.com.cn/image/WD/o9yvm0ce51d6b80f346969f2b9fd21529a330',
    pool: data,
    maxPoolDelay: 5,
    minPoolDelay: 0
  });
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
	panel.setAttribute('style','height: 444px;');
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