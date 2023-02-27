setRewardView();
function setRewardView(){
	let spinnerDiv = document.createElement('div');
	spinnerDiv.id = 'load_spinner_div';
	spinnerDiv.setAttribute('style','height: 435px;display: none;justify-content: center;align-items: center;width: 100%;');
	let spinnerDot = document.createElement('p');
	spinnerDot.id = 'load_spinner_tips';
	spinnerDot.setAttribute('style','position: fixed;display: none;width: 100%;height: 35%;align-items: flex-end;justify-content: center;');
	spinnerDot.innerText = '等待付款中 Waiting for payment...';
	spinnerDiv.append(spinnerDot);
	let spinnerCnt = document.createElement('div');
	spinnerCnt.classList.add('mdui-spinner');
	spinnerDiv.append(spinnerCnt);
	document.body.appendChild(spinnerDiv);
	let panel = document.createElement('div');
	panel.id = 'reward_cont_div';
	panel.setAttribute('style','height: 435px;');
	let title = document.createElement('div');
	title.innerText = '赞助我们 Donate';
	title.classList.add('tie-dialog-bottom-title','mdui-p-t-2');
	let subtitle = document.createElement('p');
	subtitle.innerText = 'The currency is CNY, please pay attention to the exchange rate.';
	subtitle.setAttribute('style','text-align: center;font-size: 12px;opacity: .6;margin: 8px 0 8px 0;');
	let content = document.createElement('div');
	content.classList.add('tie-dialog-bottom-content', 'tie-dialog-bottom-action-content-fix');
	content.append(getRewardCont());
	content.style.display = 'block';
	panel.append(title);
	panel.append(subtitle);
	panel.append(content);
	document.body.appendChild(panel);
	let qrcode = document.createElement('div');
	qrcode.id = 'pay_qrcode_div';
	qrcode.setAttribute('style','padding: 30px 0px; display: none; flex-direction: column; align-items: center; margin: 10px 10px 0px;height: 435px;');
	let qrcodediv = document.createElement('div');
	qrcodediv.setAttribute('style','padding: 50px 30px 30px;');
	let qrcodeIcon = document.createElement('img');
	qrcodeIcon.id = 'pay_qrcode_icon';
	//qrcodeIcon.src= 'https://gw.alipayobjects.com/mdn/rms_9e4c39/afts/img/A*YjvJQLBrZbYAAAAAAAAAAAAAARQnAQ';
	qrcodeIcon.setAttribute('style','position: absolute;top: 40%;left: 50%;width: 42px;height: 42px;margin-left: -21px;margin-top: -21px;display: none;');
	qrcodediv.append(qrcodeIcon);
	let qrcodeimg = document.createElement('div');
	qrcodeimg.id = 'pay_qrcode_img';
	qrcodediv.append(qrcodeimg);
	qrcode.append(qrcodediv);
	let qrcodetle = document.createElement('div');
	qrcodetle.id = 'pay_qrcode_tle';
	qrcodetle.classList.add('tie-dialog-bottom-title');
	qrcodetle.innerHTML = '请打开手机扫码进行支付<br><span style="font-size: 15px;">Open mobile phone scanning code payment</span>';
	qrcodetle.setAttribute('style','text-align: center;');
	qrcode.append(qrcodetle);
	document.body.appendChild(qrcode);
	mdui.mutation();
}
function getRewardCont(){
	var rewardContent = document.createElement('div');
	//rewardContent.classList.add('tie-dialog-bottom-content');
	let form = document.createElement('div');
	form.classList.add('appreciate');
	form.append(setRewardFormItem('5.01',true));
	form.append(setRewardFormItem('6.66',false));
	form.append(setRewardFormItem('8.88',false));
	form.append(setRewardFormItem('23.30',false));
	form.append(setRewardFormItem('99.99',false));
	let cust_label = document.createElement('label');
	cust_label.classList.add('tie-button','cust-amount');
	let cust_input1 = document.createElement('input');
	cust_input1.setAttribute('name','reward_amount');
	cust_input1.setAttribute('type','radio');
	cust_input1.addEventListener('click', function(event) {
		rewardAmountChange(this, 1);
	});
	cust_label.append(cust_input1);
	let cust_span = document.createElement('span');
	cust_span.innerText = '其他/other';
	cust_label.append(cust_span);
	let cust_input2 = document.createElement('input');
	cust_input2.classList.add('tie-button');
	cust_input2.setAttribute('type','number');
	cust_input2.setAttribute('placeholder','0.00');
	cust_input2.setAttribute('style','width: 98%; border: 1px solid rgb(244, 67, 54); height: 95%; display: none;');
	cust_input2.addEventListener('blur', function(event) {
		checkRewardAmount(this);
	});
	cust_label.append(cust_input2);
	form.append(cust_label);
	let contact = document.createElement('div');
	contact.setAttribute('style','padding: 0 10px 10px');
	let _namenumber = document.createElement('div');
	_namenumber.setAttribute('style','display: flex;align-items: center;');
	let _namediv = document.createElement('div');
	_namediv.setAttribute('style','width: 25%;/*background-color: #f0f0f0;*/border-radius: 8px;max-height: 46px;line-height: 46px;margin-right: 11px;padding: 0 10px;border: 1px solid #cfcfcf;');
	let _nameinput = document.createElement('input');
	_nameinput.setAttribute('placeholder','名字/Name');
	_nameinput.setAttribute('style','width: 100%;border: 0px;outline: none;background: transparent;');
	_nameinput.setAttribute('type','text');
	_nameinput.setAttribute('maxlength',10);
	_nameinput.setAttribute('required',true);
	_namediv.append(_nameinput);
	let _numberdiv = document.createElement('div');
	_numberdiv.setAttribute('style','flex-grow:1;/*background-color: #f0f0f0;*/border-radius: 8px;max-height: 46px;line-height: 46px;padding: 0 10px;border: 1px solid #cfcfcf;');
	let _numberinput = document.createElement('input');
	_numberinput.setAttribute('placeholder','QQ或邮箱/Phone Number or Email');
	_numberinput.setAttribute('maxlength',20);
	_numberinput.setAttribute('type','text');
	_numberinput.setAttribute('style','width: 100%;border: 0px;outline: none;background: transparent;');
	_numberinput.setAttribute('required',true);
	_numberdiv.append(_numberinput);
	_namenumber.append(_namediv);
	_namenumber.append(_numberdiv);
	let _remarkdiv = document.createElement('div');
	_remarkdiv.setAttribute('style','/*background-color: #f0f0f0;*/border-radius: 8px;max-height: 70px;line-height: 70px;margin-top: 10px;padding: 10px;border: 1px solid #cfcfcf;');
	let _remarktextarea = document.createElement('textarea');
	_remarktextarea.setAttribute('placeholder','你想对我们说什么?(可选) Leave a message(optional)');
	_remarktextarea.setAttribute('maxlength',100);
	_remarktextarea.setAttribute('style','min-height: 70px;resize: none;border: 0px;outline: none;width: 100%;background: transparent;');
	_remarkdiv.append(_remarktextarea);
	contact.append(_namenumber);
	contact.append(_remarkdiv);
	let action = document.createElement('div');
	action.classList.add('reward-action','mdui-m-t-1');
	let wechatpay_btn = document.createElement('button');
	wechatpay_btn.classList.add('tie-button','tie-button-primary','action-button');
	wechatpay_btn.setAttribute('id', 'wechatpay_btn');
	wechatpay_btn.addEventListener('click', function(event) {
		sububmitReward(1, _nameinput.value, _numberinput.value, _remarktextarea.value);
	});
	let wechatpay_svg = document.createElement('div');
	wechatpay_svg.innerHTML = '<svg viewBox="0 0 59.93 17.66"><g><g id="画板"><g><path d="M78.33,26.66l.75,2,.22.7h0c.06-.2.13-.47.22-.71l.68-2h.66l-.94,2.44a5.23,5.23,0,0,1-1.17,2.14,1.74,1.74,0,0,1-.64.37l-.28-.49a1.75,1.75,0,0,0,.54-.3,2.06,2.06,0,0,0,.53-.7A.82.82,0,0,0,79,30a.58.58,0,0,0,0-.17l-1.26-3.15Zm-14.27-.05c1,0,1.24.71,1.24,1.39v1.26a5.16,5.16,0,0,0,0,.82h-.54l0-.43h0a1.24,1.24,0,0,1-1,.5.94.94,0,0,1-1-1c0-.82.7-1.27,2-1.26v-.07a.69.69,0,0,0-.74-.79,1.57,1.57,0,0,0-.78.21c-.06-.09-.21-.36-.21-.36A2,2,0,0,1,64.06,26.61Zm11.64,0c1,0,1.24.71,1.24,1.39v1.26a4.15,4.15,0,0,0,.06.82h-.54l0-.43h0a1.22,1.22,0,0,1-1,.5,1,1,0,0,1-1-1c0-.82.7-1.27,2-1.26v-.07a.69.69,0,0,0-.74-.79,1.6,1.6,0,0,0-.78.21c-.06-.09-.2-.36-.2-.36A2,2,0,0,1,75.7,26.61Zm-19-1.36a2.68,2.68,0,0,1,1.13.21s-.19.33-.27.45a2.49,2.49,0,0,0-.84-.14,1.77,1.77,0,0,0-1.86,2,1.73,1.73,0,0,0,1.83,1.91,2.61,2.61,0,0,0,.88-.15c0,.1.25.44.25.44a3.15,3.15,0,0,1-1.26.22,2.21,2.21,0,0,1-2.34-2.4A2.36,2.36,0,0,1,56.73,25.25Zm-4.61,1.33a1.45,1.45,0,0,1,1.41,1.6c0,.13,0,.23,0,.29h-2.4a1.1,1.1,0,0,0,1.17,1.19,2.23,2.23,0,0,0,.82-.13c0,.1.23.4.23.4a2.75,2.75,0,0,1-1.14.21,1.59,1.59,0,0,1-1.68-1.72A1.66,1.66,0,0,1,52.12,26.58Zm15.16-.88v1h.9v.48h-.9V29c0,.42.11.66.45.66h.13l.24.43a1.64,1.64,0,0,1-.53.08.81.81,0,0,1-.65-.26,1.3,1.3,0,0,1-.23-.89V27.14h-.54v-.48h.54v-1Zm4.65-.41a1.82,1.82,0,0,1,1.27.39,1.31,1.31,0,0,1,.4,1,1.42,1.42,0,0,1-.35,1,1.83,1.83,0,0,1-1.39.52,1.68,1.68,0,0,1-.47,0v1.91H70.8v-4.7A6.42,6.42,0,0,1,71.93,25.29Zm-26.88,0,.57,2.41c.14.6.27,1.19.35,1.65h0a14.65,14.65,0,0,1,.39-1.65L47,25.32h.64l.58,2.43c.13.56.26,1.13.33,1.63h0c.09-.52.23-1.05.38-1.65l.63-2.41h.62l-1.34,4.76h-.65l-.6-2.47a15,15,0,0,1-.31-1.54h0a15.18,15.18,0,0,1-.37,1.54l-.67,2.47h-.65l-1.2-4.76Zm14.37-.26v2.13h0a1.19,1.19,0,0,1,.45-.44,1.32,1.32,0,0,1,.63-.17c.46,0,1.2.28,1.2,1.46v2h-.64v-2c0-.56-.2-1-.79-1a.87.87,0,0,0-.82.62.67.67,0,0,0,0,.3v2.06h-.64v-5Zm3.85,4.05a.54.54,0,0,0,.58.59.85.85,0,0,0,.83-.57.64.64,0,0,0,0-.2v-.59C64,28.33,63.27,28.45,63.27,29.11Zm11.64,0a.55.55,0,0,0,.58.59.85.85,0,0,0,.83-.57.64.64,0,0,0,0-.2v-.59C75.68,28.33,74.91,28.45,74.91,29.11ZM52.07,27a1,1,0,0,0-1,1h1.82A.89.89,0,0,0,52.07,27ZM72,25.78a2.43,2.43,0,0,0-.58,0v1.85a2.3,2.3,0,0,0,.51.05c.74,0,1.19-.36,1.19-1S72.64,25.78,72,25.78ZM67.81,15.07V16.3h3.68V17H67.81v1.34h3a6.58,6.58,0,0,1-2.62,3.57A11.44,11.44,0,0,0,71.72,23l-.44.74a11.29,11.29,0,0,1-3.8-1.33,11.28,11.28,0,0,1-3.89,1.37c-.11-.17-.42-.72-.42-.72a11.49,11.49,0,0,0,3.62-1.1,6.68,6.68,0,0,1-2.68-3.58h3V16.94H63.27V16.3h3.84V15.07ZM45.94,17.46l.56.31c-.27.65-.52,1.09-.59,1.23v4.72h-.64V20a10,10,0,0,1-.69.88l-.36-.63A9.17,9.17,0,0,0,45.94,17.46Zm28.5-2.36.73.17,0,.06c-.3.8-.58,1.49-.83,2v6.36h-.69v-5A14,14,0,0,1,72.8,20l-.38-.69a15.18,15.18,0,0,0,2-4.12Zm-18.94,0,.66.17s-.42,1.37-.74,2.09v6.36h-.69v-5A8.63,8.63,0,0,1,54,20l-.37-.68A17.56,17.56,0,0,0,55.5,15.1Zm-4.56,0,.65.13,0,.06c-.13.51-.28,1-.44,1.54h1.94v.59h-.46a10.46,10.46,0,0,1-.92,4A6.64,6.64,0,0,0,53,23l-.37.65A9.78,9.78,0,0,1,51.34,22a7.82,7.82,0,0,1-1.47,1.67h0l-.35-.61A7.25,7.25,0,0,0,51,21.36a10.45,10.45,0,0,1-.65-2.7c-.12.2-.18.31-.29.48l-.37-.63a11.8,11.8,0,0,0,1.25-3.4h0Zm28.83.07v2H81v.7H79.77v4.43a1.28,1.28,0,0,1-1.28,1.28h-.91v-.75h.86a.53.53,0,0,0,.53-.53V17.85H75v-.7h4v-2Zm-18,5.45v3H56.7v-3ZM49.33,20.2v1.65l.61-.54.3.52L48.87,23s-.29-.5-.35-.59a1,1,0,0,0,.22-.63v-1H47.47c0,1.44-.06,2-1,2.69,0,0-.22-.4-.33-.57.81-.64.72-1.51.72-2.7Zm11.8,1H57.45v1.71h3.68ZM69.78,19H65.14a6.46,6.46,0,0,0,2.34,2.54A6.44,6.44,0,0,0,69.78,19Zm6.67-.06L77.75,21l-.68.37-1.23-2.09ZM52,17.37H50.92s-.11.29-.13.34a11.42,11.42,0,0,0,.59,2.91A10.77,10.77,0,0,0,52,17.37Zm9.89,1.76v.59H56.65v-.59Zm-12.23-.32v.58H46.71v-.58Zm12.23-1.07v.59H56.65v-.59ZM48.53,15.23v2.24h.64v-1.6h.64v2.19H46.66V15.87h.59v1.55h.69V15.23ZM46,15.06l.56.37A8.39,8.39,0,0,1,44.64,18l-.34-.59A8.94,8.94,0,0,0,46,15.06Zm13.28,0,.51,1.13h2.61v.64H56.17v-.64H59l-.37-.88Z" transform="translate(-21.07 -14)" style="fill:#fff;fill-rule:evenodd"></path><path id="Fill-29" d="M28.35,25.17a.6.6,0,0,1-.3.07.65.65,0,0,1-.58-.34l0-.09-1.83-4a.39.39,0,0,1,0-.14.34.34,0,0,1,.33-.34.32.32,0,0,1,.2.07l2.15,1.53a1,1,0,0,0,.55.16.93.93,0,0,0,.34-.06l10.11-4.5A10.7,10.7,0,0,0,31.08,14c-5.53,0-10,3.73-10,8.34a7.84,7.84,0,0,0,3.46,6.3.67.67,0,0,1,.28.55.78.78,0,0,1,0,.21c-.16.63-.43,1.64-.45,1.68a1,1,0,0,0-.05.25.33.33,0,0,0,.33.33.47.47,0,0,0,.2-.06L27,30.33a1.08,1.08,0,0,1,.53-.15.92.92,0,0,1,.29,0,11.64,11.64,0,0,0,3.27.46c5.53,0,10-3.73,10-8.34A7.23,7.23,0,0,0,40,18.48L28.42,25.13Z" transform="translate(-21.07 -14)" style="fill:#fff;fill-rule:evenodd"></path></g></g></g></svg>';
	wechatpay_btn.append(wechatpay_svg);
	action.append(wechatpay_btn);
	let alipay_btn = document.createElement('button');
	alipay_btn.classList.add('tie-button','tie-button-primary','action-button');
	alipay_btn.setAttribute('id', 'alipay_btn');
	alipay_btn.addEventListener('click', function(event) {
		sububmitReward(0, _nameinput.value, _numberinput.value, _remarktextarea.value);
	});
	let alipay_svg = document.createElement('div');
	alipay_svg.innerHTML = '<svg viewBox="0 0 55.59 19.63"><path d="M38.42,25.4a23.68,23.68,0,0,0,3.53.91v-9.8a3.16,3.16,0,0,0-3.2-3.14H25.2A3.16,3.16,0,0,0,22,16.51V29.87A3.14,3.14,0,0,0,25.14,33H38.49a3.14,3.14,0,0,0,3.14-3.13v-.13S36.52,27.62,34,26.38a8.32,8.32,0,0,1-6.28,3.41c-3.92,0-5.25-3.42-3.39-5.67a4,4,0,0,1,2.16-1.22c1.67-.4,4.33.26,6.82,1.08a14,14,0,0,0,1.1-2.69H26.75v-.64h4.11V19.07H26.12v-.63h4.74v-1.9a.32.32,0,0,1,.34-.32h1.88v2.22h4.75v.95H33.08v1.26H37a13.5,13.5,0,0,1-1.67,3.76C36.55,24.8,37.62,25.16,38.42,25.4Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M26.89,24.12a3.88,3.88,0,0,0-1.91.71c-1.51,1.31-.61,3.71,2.45,3.71a6.59,6.59,0,0,0,4.94-2.94C30.39,24.63,28.71,23.94,26.89,24.12Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M69.49,16.54h6V17.8h1.9V16.41h0a.52.52,0,0,0-.52-.5H73.61V15H71.39v1h-3.8v1.9h1.9Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M57.52,15l-2,4.75h1.63v5.7h1.59V17.8h-.6L59.37,15Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M77.59,25.4l-.67-2.28a.35.35,0,0,0-.34-.25H75l.47,1.58H73.61V21.29h3.8v-.64h-3.8V19.07h3.8v-.63h-9.5l-.32.63h4.12v1.58H67.59v.64h3.8v3.16h-3.8v.63h10v.32Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M62,18.67a.41.41,0,0,0-.37-.23H60.05l1.21,3.8h1.83Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M65.69,15H64.11v1.9H59.68v.64h4.43v6.83a5.89,5.89,0,0,0-.45.45h-.82v.63h2.23s.66-.34.62-.72V17.49h.63v-.64h-.63Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M54.58,18.44H51.13V17.17h4.11v-.63H51.13v-1.9H49.32v.15c-.2,0-.41.37-.41.37h0v1.38H44.8v.63h4.11v1.27H45.43v.63h6.86a6.62,6.62,0,0,1-2.2,3.06c-1.64-1.25-2.19-2.23-2.19-2.43H46.11A8.69,8.69,0,0,0,49,23a17.39,17.39,0,0,1-3.86,1.81v.92a20.43,20.43,0,0,0,5-2,18.7,18.7,0,0,0,5.14,2v-.79a21.56,21.56,0,0,1-4-1.89A8.4,8.4,0,0,0,54.58,18.44Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M48.93,30.78l.32.95h.9L48.4,27h-.68L46,31.73h.9l.33-.95Zm-.85-2.48.62,1.85H47.44Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M52.71,27v4.44h2.85v-.64h-1.9V27Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M58.09,27H59v4.44h-.95Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M64.12,27H62.21v4.44h.95V29.83h1a1.43,1.43,0,1,0,0-2.85Zm0,2.22h-.92V27.62h.92a.79.79,0,0,1,0,1.58Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M70.34,30.78l.32.95h.89L69.8,27h-.67l-1.75,4.75h.9l.33-.95Zm-.85-2.48.62,1.85H68.85Z" transform="translate(-22 -13.37)" style="fill:#fff"></path><path d="M75.91,27,75,29l-.89-2h-.87l1.29,2.75v1.69h1V29.73h-.08L76.77,27Z" transform="translate(-22 -13.37)" style="fill:#fff"></path></svg>';
	alipay_btn.append(alipay_svg);
	action.append(alipay_btn);
	let paypal_btn = document.createElement('button');
	paypal_btn.classList.add('tie-button','tie-button-primary','action-button');
	paypal_btn.setAttribute('id', 'paypal_btn');
	paypal_btn.addEventListener('click', function(event) {
		sububmitReward(2, _nameinput.value, _numberinput.value, _remarktextarea.value);
	});
	let paypal_svg = document.createElement('div');
	paypal_svg.innerHTML = '<svg viewBox="0 0 82.58 20"><path d="M72.49,16.49H68a.63.63,0,0,0-.62.53L65.48,28.7a.38.38,0,0,0,.38.44h2.32a.44.44,0,0,0,.44-.38l.53-3.37a.63.63,0,0,1,.63-.53h1.44c3,0,4.69-1.44,5.14-4.3a3.48,3.48,0,0,0-.57-2.92A4.22,4.22,0,0,0,72.49,16.49ZM73,20.62c-.24,1.58-1.45,1.58-2.62,1.58h-.66l.46-2.94a.38.38,0,0,1,.38-.32h.29c.8,0,1.55,0,1.94.45A1.48,1.48,0,0,1,73,20.62Z" transform="translate(-8.9 -12)" style="fill:#fff"></path><path d="M40.11,16.49H35.56a.63.63,0,0,0-.62.53L33.1,28.7a.38.38,0,0,0,.37.44h2.16a.64.64,0,0,0,.63-.54l.51-3.21a.62.62,0,0,1,.62-.53h1.44c3,0,4.7-1.44,5.15-4.3a3.48,3.48,0,0,0-.58-2.92A4.2,4.2,0,0,0,40.11,16.49Zm.47,4.13C40.34,22.2,39.13,22.2,38,22.2h-.67l.47-2.94a.38.38,0,0,1,.37-.32h.3c.79,0,1.54,0,1.93.45A1.51,1.51,0,0,1,40.58,20.62Z" transform="translate(-8.9 -12)" style="fill:#fff"></path><path d="M53.77,20.57H51.39a.29.29,0,0,0-.27.23l-.1.69-.16-.22a3.09,3.09,0,0,0-2.55-.9,5,5,0,0,0-4.83,4.35A4.1,4.1,0,0,0,44.29,28,3.37,3.37,0,0,0,47,29.14a4.15,4.15,0,0,0,3-1.24l-.12.73a.27.27,0,0,0,.26.31h2.08a.63.63,0,0,0,.62-.53L54,20.88A.27.27,0,0,0,53.77,20.57Zm-3.13,4.3A2.42,2.42,0,0,1,48.19,27a1.84,1.84,0,0,1-1.46-.59,1.83,1.83,0,0,1-.34-1.53,2.42,2.42,0,0,1,2.43-2.09,1.72,1.72,0,0,1,1.82,2.13Z" transform="translate(-8.9 -12)" style="fill:#fff"></path><path d="M86.16,20.57H83.78a.28.28,0,0,0-.27.23l-.11.69-.15-.22a3.1,3.1,0,0,0-2.55-.9,5,5,0,0,0-4.83,4.35,4.1,4.1,0,0,0,.8,3.32,3.39,3.39,0,0,0,2.73,1.1,4.14,4.14,0,0,0,3-1.24l-.11.73a.27.27,0,0,0,.26.31h2.07a.63.63,0,0,0,.62-.53l1.19-7.53A.27.27,0,0,0,86.16,20.57ZM83,24.87A2.43,2.43,0,0,1,80.57,27a1.69,1.69,0,0,1-1.8-2.12,2.44,2.44,0,0,1,2.44-2.09,1.85,1.85,0,0,1,1.45.59A1.91,1.91,0,0,1,83,24.87Z" transform="translate(-8.9 -12)" style="fill:#fff"></path><path d="M65.28,20.57h-2.2a.64.64,0,0,0-.52.28l-3,4.47L58.24,21a.63.63,0,0,0-.61-.45H55.47a.38.38,0,0,0-.36.51l2.42,7.1L55.25,31.4a.38.38,0,0,0,.31.6h2.2a.63.63,0,0,0,.52-.27L65.6,21.17A.39.39,0,0,0,65.28,20.57Z" transform="translate(-8.9 -12)" style="fill:#fff"></path><path d="M88.62,16.81l-1.87,11.9a.37.37,0,0,0,.37.43H89a.62.62,0,0,0,.62-.53l1.84-11.68a.38.38,0,0,0-.37-.44H89A.39.39,0,0,0,88.62,16.81Z" transform="translate(-8.9 -12)" style="fill:#fff"></path><path d="M24.19,17.09a4,4,0,0,0-.84-3.58C22.42,12.45,20.74,12,18.6,12H12.36a.88.88,0,0,0-.87.75L8.9,29.14a.54.54,0,0,0,.53.62h3.84L13,31.46a.47.47,0,0,0,.46.54h3.26a.77.77,0,0,0,.76-.65l0-.16.6-3.84,0-.21a.78.78,0,0,1,.77-.65h.49c3.14,0,5.6-1.28,6.32-5a4.25,4.25,0,0,0-.65-3.74,3,3,0,0,0-.89-.68h0" transform="translate(-8.9 -12)" style="fill:#fff;isolation:isolate;opacity:0.6800000071525574"></path><path d="M24.19,17.09a4,4,0,0,0-.84-3.58C22.42,12.45,20.74,12,18.6,12H12.36a.88.88,0,0,0-.87.75L8.9,29.14a.54.54,0,0,0,.53.62h3.83l1-6.18,0,.2a.9.9,0,0,1,.89-.76h1.82c3.59,0,6.4-1.46,7.22-5.67l.06-.37" transform="translate(-8.9 -12)" style="fill:#fff;isolation:isolate;opacity:0.699999988079071"></path><path d="M15.27,17.14a.79.79,0,0,1,.76-.65h4.89a10.18,10.18,0,0,1,1.62.12l.42.08.39.1.18.06a4.2,4.2,0,0,1,.68.28,4,4,0,0,0-.85-3.61C22.43,12.46,20.74,12,18.57,12H12.36a.88.88,0,0,0-.87.75L8.9,29.14a.54.54,0,0,0,.53.62h3.85l1-6.09Z" transform="translate(-8.9 -12)" style="fill:#fff"></path></svg>';
	paypal_btn.append(paypal_svg);
	action.append(paypal_btn);
	rewardContent.append(form);
	rewardContent.append(contact);
	rewardContent.append(action);
	return rewardContent;
};
function setRewardFormItem(value, check){
	var label = document.createElement('label');
	label.classList.add('tie-button');
	if (check) {
		label.classList.add('tie-button-primary');
	}
	label.innerHTML = '<input name="reward_amount" type="radio" value="' + value + '" ' + (check?'checked':'') + '/>￥' + value + '元';
	label.children[0].addEventListener('click', function(event) {
		rewardAmountChange(this, 0);
	});
	return label;
};
function rewardAmountChange(obj, type) {
	let primary = obj.parentElement.parentElement.querySelector('.tie-button-primary');
	if(!isEmpty(primary)){
		primary.classList.remove('tie-button-primary');
	}
	let cust_amount = obj.parentElement.parentElement.querySelector('.cust-amount');
	if(type == 1){
		obj.parentElement.classList.add('user-select-auto');
		if (cust_amount) {
			cust_amount.children[2].classList.add('user-select-auto');
			cust_amount.children[0].value = '';
			cust_amount.children[1].style.display = 'none';
			cust_amount.children[2].style.display = 'block';
		}
		return;
	}
	if (cust_amount) {
		cust_amount.children[0].value = '';
		cust_amount.children[2].value = '';
		cust_amount.children[2].style.display = 'none';
		cust_amount.children[1].style.display = 'block';
	}
	obj.parentElement.classList.add('tie-button-primary');
	obj.parentElement.classList.remove('user-select-auto');
};
var TRADE_NO;
var PAY_STATUS_CHECK_INTERVAL;
function sububmitReward(type, name, contact, remark){
	let amount = document.querySelector('input[type=radio][name=reward_amount]:checked').value;
	amount = Number(amount).toFixed(2);
	if(amount > 10000){
		showTips('金额不可超过1万元 No more than 10,000 CNY',1);
		return;
	}
	if(isEmpty(amount)){
		showTips('请填写赞助金额 Please fill in the amount',1);
		return;
	}
	if(amount < 5){
		showTips('金额不可小于5元 Not less than 5.00 CNY',1);
		return;
	}
	if(isEmpty(name)){
		showTips('请留下您的名字 Please fill in your name',1);
		return;
	}
	if(!isQQNumber(contact) && !isPhoneNumber(contact) && !isEmails(contact)){
		showTips('只能填手机/邮箱/QQ Can only fill in phone number or email',1);
		return;
	}
	console.log(type, amount, name, contact, remark);
	if(isEmails(contact)){
		contact = '&email=' + contact;
	}else if(isPhoneNumber(contact)){
		contact = '&number=' + contact;
	}else if(isQQNumber(contact)){
		contact = '&number=' + contact;
	}else{
		contact = '';
	}
	document.querySelector('#reward_cont_div').style.display = 'none';
	document.querySelector('#pay_qrcode_div').style.display = 'none';
	document.querySelector('#load_spinner_div').style.display = 'flex';
	sendHttpRequest('POST', 'https://api.aidepro.top/sponsor',
    'type=' + type + '&name=' + name + contact + '&remark=' + remark + '&amount=' + amount,
    false, function(data) {
      let code = data.code;
	  let msg = data.msg;
      if (code == 200) {
        let _data = data.data;
        TRADE_NO = _data.trade_no;
		let uri = _data.redirect_url;
		checkPayStatus();
		setTimeout(function(){
			stopInterval('订单已过期 order has expired',1);
		},300000);
		if(isPCUA() && type != 2){
			showQRCode(type, uri);
			setTimeout(function(){
				document.querySelector('#pay_qrcode_tle').innerText = '长时间未出结果,请检查是否交易成功并联系我们。<br><span style="font-size: 15px;">There is no result for a long time. Please check whether the transaction is successful and contact us</span>';
			},60000);
		}else{
			document.querySelector('#load_spinner_tips').style.display = 'flex';
			setTimeout(function(){
				document.querySelector('#load_spinner_tips').innerText = '长时间未出结果,请检查是否交易成功并联系我们 There is no result for a long time. Please check whether the transaction is successful and contact us';
			},60000);
			console.log('即将跳转支付',type,amount,isAIDEApp());
			if(isAIDEApp()){
				aide.gotoBrowaer(uri);
				return;
			}
			openNewWindow(uri, 0);
		}
      }else{
		  showTips(msg, 2);
	  }
    });
	
};
function checkRewardAmount(obj) {
    //obj.value = obj.value.replace(/[^1-9\.]/g,'');
    obj.value = Number(obj.value).toFixed(2);
	obj.parentElement.parentElement.querySelector('.cust-amount').children[0].value = obj.value;
};

function closeDialog() {
	if(isAIDEApp()){
		aide.finishActivity();
		return;
	}
	setTimeout(function(){
		window.top.location.reload();
	},2500);
	window.top.dismissRewardDialog();
}

function showQRCode(type, cont){
	console.log('显示二维码',cont);
	var mQrcode = new QRCode(document.getElementById('pay_qrcode_img'), {
		text: cont,
		width: 180,
		height: 180,
		colorDark : '#000000',
		colorLight : '#ffffff',
		correctLevel : QRCode.CorrectLevel.H
	});
	icon = 'https://gw.alipayobjects.com/mdn/rms_9e4c39/afts/img/A*YjvJQLBrZbYAAAAAAAAAAAAAARQnAQ';
	if(type == 1){
		icon = 'https://previewengine.zoho.com.cn/image/WD/7cehp1c5ffc25de8641c5b7be45d5b2864cf2';
	}
	document.querySelector('#pay_qrcode_icon').src = icon;
	if(type != 2){
		document.querySelector('#pay_qrcode_icon').style.display = 'block';
		document.querySelector('#pay_qrcode_tle').innerHTML = '请使用' + ((type == 1)?'微信':'支付宝') + '扫码进行打赏<br><span style="font-size: 15px;">Open mobile phone scanning code payment</span>';
	}
	document.querySelector('#reward_cont_div').style.display = 'none';
	document.querySelector('#pay_qrcode_div').style.display = 'flex';
	document.querySelector('#load_spinner_div').style.display = 'none';
}

function checkPayStatus(){
	PAY_STATUS_CHECK_INTERVAL = setInterval(function() {
		sendPayStatusReq(false);
	}, 1000);
}

var _document_hidden = false;

function sendPayStatusReq(show){
	sendHttpRequest('GET', 'https://api.aidepro.top/pay?trade_no=' + TRADE_NO,
    false, false,
	function(data) {
      	let code = data.code;
	  	let msg = data.msg;
      	if (code == 200) {
			showTips();
			window.top.showEggEfect();
			stopInterval('感谢您的支持，将化作我们更新的动力！Payment successful, thanks!',3);
			closeDialog();
		}else if (code == 204 || code == 204 || code == 203 || code == 204 || code == 205) {
			stopInterval(msg,1);
	  	}else{
			if(show){
				showTips('支付取消',1);
				stopInterval(msg,1);
			}
		}
		console.log('检查支付状态',code,msg);
	});
}

function stopInterval(msg,type){
	showTips(msg);
	clearInterval(PAY_STATUS_CHECK_INTERVAL);
	document.querySelector('#load_spinner_div').style.display = 'none';
	document.querySelector('#pay_qrcode_div').style.display = 'none';
	document.querySelector('#reward_cont_div').style.display = 'block';
}

document.addEventListener('visibilitychange',function() {
	if(document.hidden){
		console.log('已离开本页');
		_document_hidden = true;
	}else{
		console.log('已回到本页');
		if(_document_hidden && PAY_STATUS_CHECK_INTERVAL){
			//sendPayStatusReq(true);
			_document_hidden = false;
		}
	}
});