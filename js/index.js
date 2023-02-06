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
    _openLoadUrlDialog('历史版本', 'https://api.aidepro.top/version?type=html', 1);
  }
  document.querySelector('.u4ICaf>div>button').onclick = function(){
    _openLoadUrlDialog('历史版本', 'https://api.aidepro.top/version?type=html', 1);
  }
  let _element2 = document.querySelectorAll('.KvNvKe>.AU8vyc');
  _element2[0].onclick = function(){
    _openLoadUrlDialog('用户协议', './agreement/', 2);
  }
  _element2[1].onclick = function(){
    _openLoadUrlDialog('隐私政策', './agreement/privacy/', 2);
  }
  _element2[2].onclick = function(){
    _openLoadUrlDialog('免责声明', './about/copyright/', 2);
  }
  document.querySelector('.KvNvKe>.AJ34ce>.yVZQTb>a').onclick = function(){
    let _subscribe_mail_dialog_email_input = 'subscribe_mail_dialog_email_input';
    let _subscribe_mail_dialog_verificeCode_input = 'subscribe_mail_dialog_verificeCode_input';
    let _subscribe_mail_dialog_verificeCode_send_btn = 'subscribe_mail_dialog_verificeCode_send_btn';
    let _subscribeMailDlg = mdui.dialog({
      title: '订阅更新',
      content: `<div class="mdui-textfield mdui-textfield-floating-label"><label class="mdui-textfield-label">订阅邮箱</label><input id="${_subscribe_mail_dialog_email_input}" class="mdui-textfield-input" type="email" required/><div class="mdui-textfield-error">订阅邮箱不能为空</div><div class="mdui-textfield-helper">有更新会发送邮件至该邮箱</div></div><div class="mdui-textfield mdui-textfield-floating-label" style="margin-right: 116px;overflow: visible;"><label class="mdui-textfield-label">邮箱验证码</label><input id="${_subscribe_mail_dialog_verificeCode_input}" class="mdui-textfield-input" type="number" maxlength="6" required/><div class="mdui-textfield-error">邮箱验证码不能为空</div><div class="mdui-textfield-helper"></div><button class="mdui-btn" type="button" id="${_subscribe_mail_dialog_verificeCode_send_btn}" style="position: absolute;right: -116px;bottom: 29px;">发送验证码</button></div>`,
      buttons: [
        {
          text: '提交',
          close: false,
          onClick: function(inst){
            submitSubscribeEmail(document.querySelector('#' + _subscribe_mail_dialog_email_input).value, document.querySelector('#' + _subscribe_mail_dialog_verificeCode_input).value);
          }
        },
        {
          text: '取消'
        }
      ]
    });
    _subscribeMailDlg.$element[0].style.maxWidth = '448px';
    mdui.mutation();
    _subscribeMailDlg.handleUpdate();
    document.querySelector('#' + _subscribe_mail_dialog_verificeCode_send_btn).onclick = function(){
      sendSubscribeEmailverificeCode(document.querySelector('#' + _subscribe_mail_dialog_email_input).value);
    }
  }
}

function showSponsorDialog(){
  mdui.dialog({
    title: '赞助支持',
    content: `<div><div><div class="mdui-textfield mdui-textfield-floating-label"><i class="mdui-icon material-icons">thumb_up</i><label class="mdui-textfield-label">*赞助金额</label><input class="mdui-textfield-input" type="number" required/><div class="mdui-textfield-error">赞助金额不能为空</div><div class="mdui-textfield-helper">因平台限制，最低5元起，望理解。</div></div><div class="mdui-textfield mdui-textfield-floating-label"><i class="mdui-icon material-icons">person</i><label class="mdui-textfield-label">*手机或邮箱</label><input class="mdui-textfield-input" type="text" required/><div class="mdui-textfield-error">手机或邮箱不能为空</div><div class="mdui-textfield-helper">保留支付凭证，请务必提供真实信息</div></div><div class="mdui-textfield mdui-textfield-floating-label" style="margin-right: 116px;overflow: visible;"><i class="mdui-icon material-icons">textsms</i><label class="mdui-textfield-label">验证码</label><input class="mdui-textfield-input" type="number" required/><div class="mdui-textfield-error">验证码不能为空</div><div class="mdui-textfield-helper">请填写收到的验证码以验证真实性</div><button class="mdui-btn mdui-ripple mdui-color-pink" type="button" style="position: absolute;right: -116px;bottom: 29px;">发送验证码</button></div><div class="mdui-textfield mdui-textfield-floating-label"><i class="mdui-icon material-icons">people</i><label class="mdui-textfield-label">我们该怎么称呼您？</label><input class="mdui-textfield-input" type="number"/><div class="mdui-textfield-helper">选填，不过我们希望您能提供</div></div><div class="mdui-textfield mdui-textfield-floating-label"><i class="mdui-icon material-icons">info</i><label class="mdui-textfield-label">联系QQ</label><input class="mdui-textfield-input" type="number"/><div class="mdui-textfield-helper">选填，不过我们希望您能提供</div></div><div class="mdui-textfield mdui-textfield-floating-label"><i class="mdui-icon material-icons">face</i><label class="mdui-textfield-label">想对我们说些什么？</label><textarea class="mdui-textfield-input" maxlength="100"></textarea><div class="mdui-textfield-helper">选填，留言不能超过100字</div></div></div><div class="mdui-card-actions mdui-p-l-0 mdui-p-r-0"><button class="mdui-btn mdui-ripple mdui-float-right mdui-btn-raised mdui-color-green">微信支付</button><button class="mdui-btn mdui-ripple mdui-float-right mdui-btn-raised mdui-color-blue-accent">支付宝</button></div></div>`,
    buttons: []
  });
  mdui.mutation();
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
  let btnTxt = '确定';
  if(type == 1){
    btnTxt = '关闭';
  }else if(type == 2){
    btnTxt = '我知道了';
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
        document.title = name;
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
        document.querySelectorAll('.HcyOxe>.cswwxf>.VMq4uf')[1].innerText = 'V' + versionName + '更新日志';
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
    let obj = document.querySelectorAll('.o45e4d>c-wiz>section>div>.vfQhrf.BxIr0d>div>div>a>.pZ8Djf>.pSEeg');
    let _obj = document.querySelectorAll('.o45e4d>c-wiz>section>div>.vfQhrf.BxIr0d>div>div>a');
    obj[0].innerText = data.group[0];
    _obj[0].href = data.group[1];
    obj[1].innerText = data.guild[0];
    _obj[1].href = data.guild[1];
	obj[2].innerText = data.telegram[0];
    _obj[2].href = data.telegram[1];
  } else {
    let obj2 = document.querySelectorAll('.o45e4d>c-wiz>section>div>.vfQhrf.BxIr0d>div>div>a>.pZ8Djf>.xFVDSb');
    obj2[1].innerText = 'QQ群聊';
	if(data.group){
		obj2[1].innerText = 'QQ群聊（已有' + data.group + '人）';
	}
	obj2[2].innerText = 'QQ频道';
    if(data.guild){
		obj2[2].innerText = 'QQ频道（已有' + data.guild + '人）';
	}
  }
}

function getLinks() {
  ajax(
    'GET',
    'https://api.aidepro.top/links',
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
		<span class="VfPpkd-vQzf8d">申请友链</span>\
		<a class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb" target="_blank" href=""></a>\
		</div>';
  document.querySelectorAll('.Uc6QCc>div')[1].innerHTML = content;
}

function getSponsor() {
  ajax(
    'GET',
    'https://api.aidepro.top/sponsor',
    false,
    false,
    function(success, data) {
      if (!success) {
        return;
      }
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        document.querySelectorAll('.Uc6QCc>.VMq4uf')[0].innerText = '已有' + data.total_people + '人赞助';
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
    'https://api.aidepro.top/web/bullet',
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