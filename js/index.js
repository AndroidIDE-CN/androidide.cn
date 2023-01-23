getBullet();
getVersion();
getConfig();
getContact(0);
getSponsor();
getLinks();
getContact(1);
setLoading(false);

setInfo(localStorage.getItem('_InstallPackageSize') | 0, localStorage.getItem('_downloadCount') | 0, false, localStorage.getItem('_pageViewNum') | 0, localStorage.getItem('_launchCountNum') | 0, 0);

let _element = document.querySelectorAll('.u4ICaf>.VfPpkd-dgl2Hf-ppHlrf-sM5MNb>.VfPpkd-LgbsSe');
for (let i = 0; i < _element.length; i++) {
  _element[i].addEventListener('click', function() {
    ajax('GET', 'https://api.aidepro.top/files/apk', false, false, null);
  });
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
        document.querySelector('.u4ICaf.fg1d2g>div>a').href = downloadUrl;
        document.querySelector('.VAgTTd.LMcLV>div>div>div>a').href = downloadUrl;
        document.querySelectorAll('.HcyOxe>.cswwxf>.VMq4uf')[1].innerText = 'V' + versionName + '更新日志';
        document.querySelector('c-wiz>section>.SfzRHd').innerHTML = replaceNewline(updateLog);
      }
    });
}

function setInfo(pkgSize, downloads, updateTime, pageViews, launchCount, type) {
  let obj = document.querySelectorAll('.w7Iutd>.wVqUob>.ClM7O');
  var options = {
    useGrouping: false
  };
  if (type == 0) {
    options.duration = 10;
  }
  if (downloads) {
    let _downloadCount = new countUp.CountUp('_downloadCount', downloads, options);
    if (type == 0) {
      _downloadCount.start();
    } else {
      localStorage.setItem('_downloadCount', downloads);
      _downloadCount.update(downloads);
    }
  }
  if (pageViews) {
    let _pageViews = new countUp.CountUp('_pageViews', pageViews, options);
    if (type == 0) {
      _pageViews.start();
    } else {
      localStorage.setItem('_pageViewNum', pageViews);
      _pageViews.update(pageViews);
    }
  }
  if (launchCount) {
    let _launchCount = new countUp.CountUp('_launchCount', launchCount, options);
    if (type == 0) {
      _launchCount.start();
    } else {
      localStorage.setItem('_launchCountNum', launchCount);
      _launchCount.update(launchCount);
    }
  }
  if (pkgSize) {
    options.suffix = 'MB';
    options.decimalPlaces = 2;
    if (type == 0) {
      options.duration = 10;
    }
    let _pkgSize = new countUp.CountUp('_pkgSize', parseFloat(pkgSize), options);
    if (type == 0) {
      _pkgSize.start();
    } else {
      localStorage.setItem('_InstallPackageSize', parseFloat(pkgSize));
      _pkgSize.update(parseFloat(pkgSize));
    }
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
    obj[0].innerText = data.source[0];
    _obj[0].href = data.source[1];
    obj[1].innerText = data.group[0];
    _obj[1].href = data.group[1];
    obj[2].innerText = data.guild[0];
    _obj[2].href = data.guild[1];
  } else {
    let obj2 = document.querySelectorAll('.o45e4d>c-wiz>section>div>.vfQhrf.BxIr0d>div>div>a>.pZ8Djf>.xFVDSb');
    obj2[1].innerText = 'QQ群聊（已有' + data.group + '人）';
    obj2[2].innerText = 'QQ频道（已有' + data.guild + '人）';
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
    let myElement = div.querySelector('span');
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
  let div2 = document.createElement('div');
  div2.classList.add('VfPpkd-LgbsSe', 'VfPpkd-LgbsSe-OWXEXe-INsAgc', 'VfPpkd-LgbsSe-OWXEXe-dgl2Hf', 'Rj2Mlf', 'OLiIxf', 'PDpWxe', 'P62QJc', 'LQeN7', 'LMoCf');
  let content2 = '<span class="VfPpkd-vQzf8d">我要赞助</span>\
		<a class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb" target="_blank" href="https://afdian.net/order/create?plan_id=80adf53e829011edac0a52540025c377"></a>';
  div2.innerHTML = content2;
  document.querySelectorAll('.Uc6QCc>div')[0].append(div2);
}

function setLinks(data) {
  let content = '';
  for (var i = 0; i < data.length; i++) {
    content += '<div class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-INsAgc VfPpkd-LgbsSe-OWXEXe-dgl2Hf Rj2Mlf OLiIxf PDpWxe P62QJc LQeN7 LMoCf">\
		<span class="VfPpkd-vQzf8d">' + data[i].name + '</span>\
		<a class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb" target="_blank" href="' + data[i].url + '"></a>\
		</div>';
  }
  document.querySelectorAll('.Uc6QCc>div')[1].innerHTML = content;
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
    document.body.style.overflow = 'auto';
    document.querySelector('#console-splash-021280').style.opacity = 0;
    document.querySelector('#console-splash-021280').style.display = 'none';
  }, 300);
  //}
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