setRewardView();
function setRewardView(){
	let panel = document.createElement('div');
	let title = document.createElement('div');
	title.innerText = 'Donate 赞助我们';
	title.classList.add('tie-dialog-bottom-title','mdui-p-t-2');
	let subtitle = document.createElement('p');
	subtitle.innerText = 'The amount is in RMB, and the unit is Yuan.';
	subtitle.setAttribute('style','text-align: center;font-size: 12px;opacity: .6;margin: 8px 0 8px 0;');
	let content = document.createElement('div');
	content.classList.add('tie-dialog-bottom-content', 'tie-dialog-bottom-action-content-fix');
	content.append(getRewardCont());
	content.style.display = 'block';
	panel.append(title);
	panel.append(subtitle);
	panel.append(content);
	document.body.appendChild(panel);
}
function getRewardCont(){
	var rewardContent = document.createElement('div');
	//rewardContent.classList.add('tie-dialog-bottom-content');
	let form = document.createElement('form');
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
	_namediv.setAttribute('style','width: 31%;background-color: #f0f0f0;border-radius: 8px;max-height: 46px;line-height: 46px;margin-right: 11px;padding: 0 10px;');
	let _nameinput = document.createElement('input');
	_nameinput.setAttribute('placeholder','名字/Name');
	_nameinput.setAttribute('style','width: 100%;border: 0px;outline: none;background: transparent;');
	_nameinput.setAttribute('type','text');
	_nameinput.setAttribute('maxlength',10);
	_nameinput.setAttribute('required',true);
	_namediv.append(_nameinput);
	let _numberdiv = document.createElement('div');
	_numberdiv.setAttribute('style','flex-grow:1;background-color: #f0f0f0;border-radius: 8px;max-height: 46px;line-height: 46px;padding: 0 10px;');
	let _numberinput = document.createElement('input');
	_numberinput.setAttribute('placeholder','QQ/邮箱/手机 Phone Number/Email');
	_numberinput.setAttribute('maxlength',20);
	_numberinput.setAttribute('type','text');
	_numberinput.setAttribute('style','width: 100%;border: 0px;outline: none;background: transparent;');
	_numberinput.setAttribute('required',true);
	_numberdiv.append(_numberinput);
	_namenumber.append(_namediv);
	_namenumber.append(_numberdiv);
	let _remarkdiv = document.createElement('div');
	_remarkdiv.setAttribute('style','background-color: #f0f0f0;border-radius: 8px;max-height: 70px;line-height: 70px;margin-top: 10px;padding: 10px;');
	let _remarktextarea = document.createElement('textarea');
	_remarktextarea.setAttribute('placeholder','你想对我们说什么?(可选) Leave a message(optional)');
	_remarktextarea.setAttribute('maxlength',100);
	_remarktextarea.setAttribute('style','min-height: 70px;resize: none;border: 0px;outline: none;width: 100%;background: transparent;');
	_remarkdiv.append(_remarktextarea);
	contact.append(_namenumber);
	contact.append(_remarkdiv);
	let action = document.createElement('div');
	action.classList.add('reward-action');
	let wechatpay_btn = document.createElement('button');
	wechatpay_btn.classList.add('tie-button','tie-button-primary','action-button');
	wechatpay_btn.setAttribute('id', 'wechatpay_btn');
	wechatpay_btn.innerText = '微信支付 WeChatPay';
	action.append(wechatpay_btn);
	wechatpay_btn.addEventListener('click', function(event) {
		sububmitReward(0);
	});
	let alipay_btn = document.createElement('button');
	alipay_btn.classList.add('tie-button','tie-button-primary','action-button');
	alipay_btn.setAttribute('id', 'alipay_btn');
	alipay_btn.innerText = '支付宝 AliPay';
	action.append(alipay_btn);
	alipay_btn.addEventListener('click', function(event) {
		sububmitReward(1);
	});
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
	}else{
		if (cust_amount) {
			cust_amount.children[0].value = '';
			cust_amount.children[2].value = '';
			cust_amount.children[2].style.display = 'none';
			cust_amount.children[1].style.display = 'block';
		}
		obj.parentElement.classList.add('tie-button-primary');
		obj.parentElement.classList.remove('user-select-auto');
	}
};
function sububmitReward(type){
	let amount = document.querySelector('input[type=radio][name=reward_amount]:checked').value;
	amount = Number(amount).toFixed(2);
	if(amount > 10000){
		console.log('打赏金额最高1万元哦~');
	}else if(isEmpty(amount) || amount < 5){
		console.log('打赏金额不可小于5元哦~');
	}else{
		console.log(amount);
	}
};
function checkRewardAmount(obj) {
    //obj.value = obj.value.replace(/[^1-9\.]/g,'');
    obj.value = Number(obj.value).toFixed(2);
	obj.parentElement.parentElement.querySelector('.cust-amount').children[0].value = obj.value;
};