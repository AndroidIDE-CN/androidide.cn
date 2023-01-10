;
/**
 * author: stack dev
 * github: https://github.com/Uyukisan
 * blog: https://stackblog.cf
 */
(function(window) {
  "use strict";

  var defaultSetting = {
    color: '#000000',
    curtain: 'transparent',
    top: 8,
    speed: 8,
    danmu: '我是一条弹幕',
    // avatar: './img/avatar.jpg',
    // locate: '#AwesomeMyukiDanMu',
    href: '#',
    // id: '#',
    pool: [],
    maxPoolDelay: 5,
    minPoolDelay: 1,
    // maxDanMuWidth: 250,
  };
  Object.freeze(defaultSetting);
  var MyukiDanMu = function(option, undefined) {
    return new MyukiDanMu.fn.init(option, undefined);
  };
  MyukiDanMu.prototype = MyukiDanMu.fn = {
    constructor: MyukiDanMu,

    init: function(option, undefined) {
      let newSetting = {};
      typeof option == 'string' ? newSetting.danmu = option.toString() : newSetting = option;
      this._setting = extend({}, defaultSetting, newSetting);
      let newDanMuBox = document.createElement('div');
      addClass('myuki-danmu_box', newDanMuBox);
      addClass('cover', newDanMuBox);
      newDanMuBox.style.background = this._setting.curtain;
      if (this._setting.curtain.match(/url\(.*?\)/)) {
        newDanMuBox.style.backgroundSize = 'cover';
      }
      this._danmubox = newDanMuBox;
      if (this._setting.locate) {
        if (document.querySelectorAll(this._setting.locate).length > 0) {
          document.querySelectorAll(this._setting.locate)[0].appendChild(newDanMuBox);

        } else {
          alert('MyukiDanmu报错：\n没有找到定位元素：' + this._setting.locate + '\n请在页面中添加该定位元素');
        }
      } else {
        let awesomeDanMu = document.createElement('div');
        awesomeDanMu.setAttribute('id', 'AwesomeMyukiDanMu');
        awesomeDanMu.appendChild(newDanMuBox);
        document.body.prepend(awesomeDanMu);
      }
      !this._setting.maxDanMuWidth ? this._setting.maxDanMuWidth = this._getDanMuBoxInfo()._trackLength * 2 : '';
      if (this._setting.pool.length > 0) {
        this.shotPool();
      }
      return this;
    },

    getSetting: function() {
      return this._setting;
    },

    _getDanMuBoxInfo: function() {
      let _tracks = parseInt(this._danmubox.offsetHeight / 44);
      let _trackLength = this._danmubox.getBoundingClientRect().width;
      let _trackWidth = this._danmubox.offsetHeight / _tracks;
      return {
        _tracks,
        _trackLength,
        _trackWidth
      }
    },

    help: function() {
      /*console.log('%c⛄️欢迎使用Myuki DanMu👏',
        'font-size:14px;border:20px solid #1e90ff;border-radius:10px;background:white;color:black;'
      );
      console.log('\n使用方法：https://www.jq22.com/mem1320295，https://stackblog.cf/posts/24447/\n');*/

    },
    _addoneMyukiDanMu: function(oneoption) {
      let onesetting = this.getSetting();
      onesetting = extend({}, onesetting, oneoption);
      let newDanMu = document.createElement('a');
      addClass('myuki-danmu_item', newDanMu);

      if (onesetting.avatar) {
        let newAvatar = document.createElement('div');
        addClass('avatar', newAvatar);
        let newImg = document.createElement('img');
        newImg.setAttribute('src', onesetting.avatar);
        newAvatar.appendChild(newImg);
        newDanMu.appendChild(newAvatar);
      }
      if (onesetting.id) {
        newDanMu.setAttribute('id', onesetting.id);
      }
      let newContent = document.createElement('div');
      addClass('content', newContent);
      newContent.innerText = onesetting.danmu.trim() == '' ? defaultSetting.danmu : onesetting.danmu
        .trim();
      newContent.style.color = onesetting.color;
      newDanMu.appendChild(newContent);
      newDanMu.setAttribute('href', onesetting.href);
      let box = this._getDanMuBoxInfo();
      newDanMu.style.top = Math.floor(Math.random() * box._tracks) * box._trackWidth + onesetting
        .top + 'px';
      newDanMu.style.transition = `transform ${onesetting.speed}s linear,box-shadow .3s ease`;
      // newDanMu.style.transform = `translateX(-20px)`;
      let remainTime = onesetting.speed;
      let _this = this;
      newDanMu.onmouseover = function() {
        remainTime = ((newDanMu.getBoundingClientRect().left + newDanMu.getBoundingClientRect().width - _this._danmubox.getBoundingClientRect().left) / (box._trackLength + newDanMu.getBoundingClientRect().width)) * onesetting.speed;
        newDanMu.style.transform = `translateX(${-(_this._danmubox.getBoundingClientRect().right - newDanMu.getBoundingClientRect().left)}px`;
        newDanMu.style.boxShadow = '0px 0px 8px ' + onesetting.color;

      }
      newDanMu.onmouseout = function() {
        newDanMu.style.transition = `transform ${remainTime}s linear,box-shadow .3s ease`;
        newDanMu.style.transform = `translateX(${-(box._trackLength + newDanMu.getBoundingClientRect().width)}px)`;

        newDanMu.style.boxShadow = 'none';

      }
      newDanMu.addEventListener('transitionend', () => {
        if (newDanMu.getBoundingClientRect().right <= this._danmubox.getBoundingClientRect().left) {
          newDanMu.remove();

        }
      })
      this._danmubox.appendChild(newDanMu);
      if (onesetting.maxDanMuWidth) {
        newContent.getBoundingClientRect().width > onesetting.maxDanMuWidth ? newContent.style.width = onesetting.maxDanMuWidth + 'px' : '';
      }
      return newDanMu;
    },
    shot: function(option) {
      let doOption = {};
      let box = this._getDanMuBoxInfo();
      typeof option == 'string' ? doOption.danmu = option.toString() : doOption = option;
      let danmu = this._addoneMyukiDanMu(doOption);
      danmu.style.transform = `translateX(${-(box._trackLength + danmu.getBoundingClientRect().width)}px)`;
    },
    shotPool: function(pool) {
      let POOL = [];
      !pool || pool.length <= 0 ? POOL = this._setting.pool : POOL = pool;
      if (typeof pool == 'string') {
        return false;
      }
      let timer1;
      let _this = this; //便于在定时器中访问正确的this
      if (POOL.length > 0) {
        let delay = randomNum(this._setting.minPoolDelay, this._setting.maxPoolDelay);
        timer1 = setInterval(shotPool, delay * 1000);
        return true;
      } else {
        return false;
      }

      function shotPool() {
        if (POOL.length > 0) {
          _this.shot(POOL.shift())
          // console.log('还剩' + POOL.length + '条弹幕未发送。');
        } else if (POOL.length <= 0) {
          clearInterval(timer1);
        }
      }
    }
  }

  function extend() {
    var length = arguments.length;
    var target = arguments[0] || {};
    if (typeof target != "object" && typeof target != "function") {
      target = {};
    }
    if (length == 1) {
      target = this;
      i--;
    }
    for (var i = 1; i < length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  function hasClass(cla, element) {
    if (element.className.trim().length === 0) return false;
    let allClass = element.className.trim().split(" ");
    return allClass.indexOf(cla) > -1;
  }

  function addClass(cla, element) {
    if (!hasClass(cla, element)) {
      if (element.setAttribute) {
        let newClass = element.getAttribute("class") ? element.getAttribute("class") + " " + cla : cla;
        element.setAttribute("class", newClass);
      } else {
        element.className = element.className + " " + cla;
      }

    }
  }

  function removeClass(cla, element) {
    let classList = element.getAttribute('class').split(' ');
    for (let i = 0; i < classList.length; i++) {
      if (classList[i] == cla) {
        classList.splice(i, 1);
      }
    }

    element.setAttribute('class', classList.join(' '));

  }

  function randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  }
  MyukiDanMu.fn.init.prototype = MyukiDanMu.fn;
  window.MyukiDanMu = MyukiDanMu;
  window.$MDM = MyukiDanMu;
  return this;
})(window);
