var ADMIN_VERSION_DIALOG;

init();

function init(){
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
	  let _element2 = document.querySelectorAll('.KvNvKe');
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

function showVersionAdminDialog(){
	ADMIN_VERSION_DIALOG = openFullScreenDialog(
		'管理版本',
		'<div id="admin_version_list_div" class="layout-root mdui-row-xs-1 mdui-row-sm-2 mdui-m-a-0 mdui-p-r-1"><div class="mdui-col mdui-p-l-2 mdui-p-t-2"><div class="mdui-card"><div class="mdui-card-menu"><button onclick="showVersionEditDialog(\'release\');" class="mdui-btn mdui-btn-icon mdui-text-color-theme-icon"><i class="mdui-icon material-icons">edit</i></button></div><div class="mdui-card-primary mdui-p-t-2 mdui-p-b-0"><div class="mdui-typo-title mdui-valign"><span id="release_version_name"></span><div class="mdui-typo mdui-m-l-1"><p class="mdui-typo-subheading" style="transform: scale(0.9);"><kbd class="mdui-color-pink">正式版</kbd></p></div></div><div id="release_version_update_time" class="mdui-card-primary-subtitle"></div></div><div id="release_version_update_log" class="mdui-card-content mdui-p-t-1 mdui-p-b-0" style="overflow: hidden;text-overflow: ellipsis;-webkit-line-clamp: 5;display: -webkit-box;-webkit-box-orient: vertical;"></div><div class="mdui-card-actions"><button onclick="showVersionEditDialog(\'release\');" class="mdui-btn mdui-color-theme-accent mdui-float-right" style="display: none;">编辑</button></div></div></div><div class="mdui-col mdui-p-l-2 mdui-p-t-2"><div class="mdui-card"><div class="mdui-card-menu"><button onclick="showVersionEditDialog(\'beta\');" class="mdui-btn mdui-btn-icon mdui-text-color-theme-icon"><i class="mdui-icon material-icons">edit</i></button></div><div class="mdui-card-primary mdui-p-t-2 mdui-p-b-0"><div class="mdui-typo-title mdui-valign"><span id="beta_version_name"></span><div class="mdui-typo mdui-m-l-1"><p class="mdui-typo-subheading" style="transform: scale(0.9);"><kbd class="mdui-color-pink">测试版</kbd></p></div></div><div id="beta_version_update_time" class="mdui-card-primary-subtitle"></div></div><div id="beta_version_update_log" class="mdui-card-content mdui-p-t-1 mdui-p-b-0" style="overflow: hidden;text-overflow: ellipsis;-webkit-line-clamp: 5;display: -webkit-box;-webkit-box-orient: vertical;"></div><div class="mdui-card-actions"><button onclick="showVersionEditDialog(\'beta\');" class="mdui-btn mdui-color-theme-accent mdui-float-right" style="display: none;">编辑</button></div></div></div></div><form class="mdui-p-x-3" id="admin_update_edit_form"></form>',
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
    	false, false, function(data) {
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
    	false, false, function(data) {
    	let code = data.code;
		let msg = data.msg;
     	if (code == 200) {
			let targetVersion = data.data.versionCode;
			setUpdateEditDialog('', '', 1, targetVersion, '', '', false);
		} else {
			showToast(msg);
			returnFullScreenDlgBack();
			document.querySelector('#admin_version_list_div').style.display = 'block';
			document.querySelector('#admin_update_edit_form').style.display = 'none';
			setVersionAdminDialog();
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
    	false, false, function(data) {
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
			returnFullScreenDlgBack();
			document.querySelector('#admin_version_list_div').style.display = 'block';
			document.querySelector('#admin_update_edit_form').style.display = 'none';
			setVersionAdminDialog();
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
    data, false, function(data) {
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