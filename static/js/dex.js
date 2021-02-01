
var orderMsg = {};
var orderType = "SELL";
var selectLookOrderType = "SELL";
var selectLookSymbol = "";
var orderId = '';
$(function(){
	listCommonToken(0)
	listDexOrder(0)
	$("body").on("click", ".orderTypeBtn", function() {
		$(".orderTypeBtn").removeClass("active");
		$(this).addClass("active");
		orderType = $(this).attr("data-type");
	})

})

function coinTypeShow(){
	$("#menuPhonePanel").addClass("active");
}
function coinTypeHide(){
	$("#menuPhonePanel").removeClass("active");
}

function dexEntrustShow() {
	// if(!getCookie("token")){
	// 	showMsg("请登录再挂单");
	// 	return
	// }
	var html = '';
	html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
	html += ' <div class="cdk-global-overlay-wrapper" style="justify-content: center; align-items: center;">';
	html += '   <div class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
	html += '     <div class="cdk-visually-hidden cdk-focus-trap-anchor"></div>';
	html += '     <div class="mat-dialog-container" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
	html += '         <div class="c-auth c-auth--dialog" style="padding-bottom: 0;">';
	html += '           <div class="c-auth__inner ">';
	html += '             <div class="c-authHeader c-authHeader--shadow ">';
	html += '               <h3 class="c-authHeader__title">挂单</h3>';
	html += '               <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
	html += '               data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
	html += '                 <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
	html += '               </button>';
	html += '             </div>';
	html += '             <div class="c-auth__content" style="padding-bottom:50px;">';
	html += '               <div class="c-authForm ">';
	html += '               <div id="getAssitAccountShow"></div>';

	// html += '               <p class="c-authInfo__text" style="color:#848484">钱包余额：<span style="color:#fff">' + $("#lootMoney").html() + '</span></p>';

	html += '                   <p class="c-authInfo__text" id="noPayMsg" style="border: 1px solid #e86359;padding: 15px;color: #e86359;">* 请认真填写并确认代币符号是否正确，如果对代币符号存在疑问，请联系客服进行协助。</p>';
	html += '                   <div>';

		html += '               <div style="flex: 1;margin-bottom: 20px;">';
		html += '                     <span class="orderTypeBtn active" data-type="SELL">出售</span>';
		html += '                     <span class="orderTypeBtn" data-type="BUY">收购</span>';
		html += '               </div>';

		// html += '               <p class="c-authInfo__text" style="color:#848484">目前绑定：<span style="color:#fff" id="bindAccountMsgShow"></span></p>';

	html += '                 <div class="ng-pristine ng-invalid ng-touched">';



	html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
	html += '                     <div class="mat-form-field-wrapper">';
	html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
	html += '                         <input type="text" id="tokenName" oninput="tokenTagShow()" placeholder="代币名称" value="'+ selectLookSymbol +'" style="background: none;border:0;height:100%;flex:1;font-size:20px;">';
	html += '                       </div>';
	html += '                       <div class="mat-form-field-subscript-wrapper">';
	html += '                         <div id="rechargeMsg" style="font-size: 18px;line-height: 50px;"';
	html += '                         style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
	html += '                         </div>';
	html += '                       </div>';
	html += '                     </div>';
	html += '                   </div>';

	html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
	html += '                     <div class="mat-form-field-wrapper">';
	html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
	html += '                         <input type="number" id="tokenPrice" placeholder="代币单价" oninput="tokenTotalPriceShow()" style="background: none;border:0;height:100%;flex:1;font-size:20px;">';
	html += '                         <span class="coinName tokenPriceTag">'+ (selectLookSymbol != '' ? 'IOST / ' + selectLookSymbol : '') +'</span>';
	html += '                       </div>';
	html += '                       <div class="mat-form-field-subscript-wrapper">';
	html += '                         <div id="rechargeMsg" style="font-size: 18px;line-height: 50px;"';
	html += '                         style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
	html += '                         </div>';
	html += '                       </div>';
	html += '                     </div>';
	html += '                   </div>';

	html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
	html += '                     <div class="mat-form-field-wrapper">';
	html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
	html += '                         <input type="number" id="tokenAmount" placeholder="代币数量" oninput="tokenTotalPriceShow()" style="background: none;border:0;height:100%;flex:1;font-size:20px;">';
	html += '                         <span class="coinName tokenNumTag">'+ selectLookSymbol +'</span>';
	html += '                       </div>';
	html += '                       <div class="mat-form-field-subscript-wrapper">';
	html += '                         <div id="rechargeMsg" style="font-size: 18px;line-height: 50px;"';
	html += '                         style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
	html += '                         </div>';
	html += '                       </div>';
	html += '                     </div>';
	html += '                   </div>';



	html += '               <p class="c-authInfo__text" style="color:#848484">总价：<span style="color:#fff" id="tokenTotalPriceShow"></span></p>';



	// else{
	html += '                     <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit" onclick="dexEntrustGo()">';
	html += '                       <span>挂单</span>';
	html += '                     </button>';
	// }
	html += '                   </div>';
	html += '                 </div>';
	html += '               </div>';
	html += '             </div>';
	html += '           </div>';
	html += '         </div>';
	html += '     </div>';
	html += '   </div>';
	html += ' </div>';



	$('#panelShow').html(html);

	setTimeout(function() {
		$('.cdk-overlay-container').show();
	}, 100)
}

function tokenTotalPriceShow(){
	var price = $("#tokenPrice").val() || 0;
	var num = $("#tokenAmount").val() || 0;

	// var price = 0;
	// var num = 0;
	// if($("#tokenPrice").val()){
	// 	price = Number($("#tokenPrice").val()).toFixed(4);
	// 	$("#tokenPrice").val(price)
	// }
	// if($("#tokenAmount").val()){
	// 	num = Number($("#tokenAmount").val()).toFixed(4);
	// 	$("#tokenAmount").val(num)
	// }
	var total = Number(price * num).toFixed(4)
	$('#tokenTotalPriceShow').html(total + " IOST");

}
function tokenTagShow(){
	var tokenSymbol = $("#tokenName").val();
	if(tokenSymbol == ''){
		$('.tokenPriceTag').html('');
	}else{
		$('.tokenPriceTag').html("IOST / " + tokenSymbol);
	}
	$('.tokenNumTag').html(tokenSymbol);
}




function dexEntrustGo(){
	var tokenSymbol = String($("#tokenName").val()).toLocaleLowerCase();
	var price = $("#tokenPrice").val();
	var num = $("#tokenAmount").val();

	if(tokenSymbol == ''){
		showMsg('请输入挂单的代币名称');
		return
	}
	if(num == ''){
		showMsg('请输入挂单的代币数量');
		return
	}else if(num <= 0){
		showMsg('请输入正确的挂单数值');
		return
	}
	if(price == ''){
		showMsg('请输入挂单的代币单价');
		return
	}else if(price <= 0){
		showMsg('请输入正确的挂单单价');
		return
	}

	
	if($("#tokenPrice").val()){
		price = Number($("#tokenPrice").val()).toFixed(4);
		$("#tokenPrice").val(price)
	}
	if($("#tokenAmount").val()){
		num = Number($("#tokenAmount").val()).toFixed(4);
		$("#tokenAmount").val(num)
	}
	dexEntrust(tokenSymbol, price, num, orderType)
}

function dexEntrust(tokenSymbol, price, num, orderType) {
	$("#showLoading").show();
	IWalletJS.enable().then((account) => {
		if (account) {
			var iost = IWalletJS.newIOST(IOST);
			var args = [tokenSymbol, price, num, orderType];
			var tx = iost.callABI(dexContractName, "entrust", args);
			// tx.addApprove('iost', '0.0001');
			iost.signAndSend(tx).on('pending', (pending) => {
				// alert("pending:"+JSON.stringify(pending));
				getTxReceipt(pending, function(data) {
					// iostLogin(account);
					console.log("数据：", data)
					$("#showLoading").hide();
				})
				// console.log(pending, 'pending')
			}).on('success', (result) => {
				if (iostSuccessStaus == true) {
					console.log("成功数据：", result)

					iostSuccessGo(result, function() {
						// iostLogin(account);

						console.log("成功数据2：", result)
						$("#loadingBox").hide();
						$("#showLoading").hide();
						iostPendingStaus = false;
						showMsg("挂单成功！");
						$('.cdk-overlay-container').hide()

					})

				}
				// alert("result:"+JSON.stringify(result));
				// iostLogin(account);
				// console.log(result,'result')
			}).on('failed', (failed) => {
				$("#showLoading").hide(); // console.log("failed:"+JSON.stringify(failed));
				// showMsg(JSON.stringify(failed));
			})
		} else {
			showMsg('not login')
		}
	})
}


function acceptEntrustTotalPriceShow(){
	var price = orderMsg.price;
	var num = $("#tokenAmount").val() || 0;
	var total = Number(price * num).toFixed(4)
	$('#tokenTotalPriceShow').html(total + " IOST");

}

function acceptEntrustShow(type,id,price,num,symbol){

	orderId = id;
	orderMsg.type = type;
	orderMsg.price = price;
	orderMsg.num = num;
	orderMsg.symbol = symbol;
	var title = '';
	var btnTxt = '';
	if(type == "BUY"){
		title = "出售代币";
		btnTxt = "确定出售";
	}else{
		title = "购买代币";
		btnTxt = "确定购买";
	}
	var html = '';
	html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
	html += ' <div class="cdk-global-overlay-wrapper" style="justify-content: center; align-items: center;">';
	html += '   <div class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
	html += '     <div class="cdk-visually-hidden cdk-focus-trap-anchor"></div>';
	html += '     <div class="mat-dialog-container" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
	html += '         <div class="c-auth c-auth--dialog" style="padding-bottom: 0;">';
	html += '           <div class="c-auth__inner ">';
	html += '             <div class="c-authHeader c-authHeader--shadow ">';
	html += '               <h3 class="c-authHeader__title">'+ title +'</h3>';
	html += '               <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
	html += '               data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
	html += '                 <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
	html += '               </button>';
	html += '             </div>';
	html += '             <div class="c-auth__content" style="padding-bottom:50px;">';
	html += '               <div class="c-authForm ">';
	html += '               <div id="getAssitAccountShow"></div>';

	html += '                 <div class="ng-pristine ng-invalid ng-touched">';

	html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
	html += '                     <div class="mat-form-field-wrapper">';
	html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
	html += '                         <input type="number" id="tokenAmount" placeholder="代币数量" oninput="acceptEntrustTotalPriceShow()" style="background: none;border:0;height:100%;flex:1;font-size:20px;">';
	html += '                         <span class="coinName">'+ symbol +'</span>';
	html += '                       </div>';
	html += '                       <div class="mat-form-field-subscript-wrapper">';
	html += '                         <div id="rechargeMsg" style="font-size: 18px;line-height: 50px;"';
	html += '                         style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
	html += '                         </div>';
	html += '                       </div>';
	html += '                     </div>';
	html += '                   </div>';


	html += '               <p class="c-authInfo__text" style="color:#848484">数量：<span style="color:#fff">'+ num + ' ' + symbol +'</span></p>';


	html += '               <p class="c-authInfo__text" style="color:#848484">单价：<span style="color:#fff">'+ price + ' IOST / ' + symbol +'</span></p>';

	html += '               <p class="c-authInfo__text" style="color:#848484">总价：<span style="color:#fff" id="tokenTotalPriceShow"></span></p>';


	html += '                     <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit" onclick="acceptEntrustOkShow()">';
	html += '                       <span>'+ btnTxt +'</span>';
	html += '                     </button>';

	html += '                   </div>';
	html += '                 </div>';
	html += '               </div>';
	html += '             </div>';
	html += '           </div>';
	html += '         </div>';
	html += '     </div>';
	html += '   </div>';
	html += ' </div>';



	$('#panelShow').html(html);

	setTimeout(function() {
		$('.cdk-overlay-container').show();
	}, 100)

}

function acceptEntrustOkShow(){

	var price = orderMsg.price;
	var num = $("#tokenAmount").val();
	var total = Number(price * num).toFixed(4)
	$('#tokenTotalPriceShow').html(total + " IOST");
	if(num > orderMsg.num){
		showMsg("代币数量已超过接单量")
		return
	}else if(num <= 0){
		showMsg("请输入正确的接单量")
		return
	}

	var type = orderMsg.type;
	if(type == "BUY"){
		$("#dexEntrustMsgTitle").html("出售代币");
		$("#buyShopMoneyShow").html("你确定出售 "+ num +" "+ orderMsg.symbol +" 获取 "+ total +" IOST吗？");
		$("#buyShopOkAction").html("出售确认");

	}else{
		$("#dexEntrustMsgTitle").html("购买代币");
		$("#buyShopMoneyShow").html("你确定花费 "+ total +" IOST 购买 "+ num +" "+ orderMsg.symbol +"吗？");
		$("#buyShopOkAction").html("购买确认");
	}
	$('#buyShopOkShow').show();
}

// function dexEntrustGo(){
// 	var tokenSymbol = String($("#tokenName").val()).toLocaleLowerCase();
// 	var price = $("#tokenPrice").val();
// 	var num = $("#tokenAmount").val();
// 	if(tokenSymbol == ''){
// 		showMsg('请输入挂单的代币名称');
// 		return
// 	}
// 	if(num == ''){
// 		showMsg('请输入挂单的代币数量');
// 		return
// 	}else if(num <= 0){
// 		showMsg('请输入正确的挂单数值');
// 		return
// 	}
// 	if(price == ''){
// 		showMsg('请输入挂单的代币单价');
// 		return
// 	}else if(price <= 0){
// 		showMsg('请输入正确的挂单单价');
// 		return
// 	}
// 	dexEntrust(tokenSymbol, price, num, orderType)
// }
function acceptEntrust() {
	$("#showLoading").show();
	IWalletJS.enable().then((account) => {
		if (account) {
			var iost = IWalletJS.newIOST(IOST);
			var num = String($("#tokenAmount").val());
			var id = orderId;
			var args = [id, num];
			var tx = iost.callABI(dexContractName, "acceptEntrust", args);
			// tx.addApprove('iost', '0.0001');
			iost.signAndSend(tx).on('pending', (pending) => {
				getTxReceipt(pending, function(data) {
					console.log("数据：", data)
					$("#showLoading").hide();
				})
			}).on('success', (result) => {
				if (iostSuccessStaus == true) {
					console.log("成功数据：", result)

					iostSuccessGo(result, function() {

						console.log("成功数据2：", result)
						$("#loadingBox").hide();
						$("#showLoading").hide();
						iostPendingStaus = false;
						showMsg("接单成功！");
						$('#buyShopOkShow').hide();
						$('.cdk-overlay-container').hide()

					})

				}
			}).on('failed', (failed) => {
				$("#showLoading").hide();
			})
		} else {
			showMsg('not login')
		}
	})
}


function cancelEntrust(id) {
	$("#showLoading").show();
	IWalletJS.enable().then((account) => {
		if (account) {
			var iost = IWalletJS.newIOST(IOST);
			var args = [id];
			var tx = iost.callABI(dexContractName, "cancelEntrust", args);
			// tx.addApprove('iost', '0.0001');
			iost.signAndSend(tx).on('pending', (pending) => {
				getTxReceipt(pending, function(data) {
					console.log("数据：", data)
					$("#showLoading").hide();
				})
			}).on('success', (result) => {
				if (iostSuccessStaus == true) {
					console.log("成功数据：", result)

					iostSuccessGo(result, function() {

						console.log("成功数据2：", result)
						$("#loadingBox").hide();
						$("#showLoading").hide();
						iostPendingStaus = false;
						showMsg("下架成功！");
						// $('.cdk-overlay-container').hide()

					})

				}
			}).on('failed', (failed) => {
				$("#showLoading").hide();
			})
		} else {
			showMsg('not login')
		}
	})
}

function listCommonToken(page) {

	$("#myItemLoadingShow").show();
	$.ajax({
		type: 'get',
		url: '/api/listCommonToken.do',
		data: {
			page: page,
			size: 100
		},
		dataType: 'json',
		success: function(data) {
			$("#myItemLoadingShow").hide();
			if (data.code == 200) {
				var selectToken = selectLookSymbol;
				var color = '#89d295';
				var iost = '<svg t="1584015159513" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1857" width="68" height="68">';
				iost += '<path d="M512.7 1022.5c-68.8 0-135.6-13.5-198.5-40.1-60.7-25.7-115.3-62.5-162.1-109.3C105.2 826.3 68.4 771.7 42.7 711c-26.6-62.9-40-129.7-40-198.5 0-68.8 13.5-135.6 40.1-198.5 25.7-60.7 62.5-115.3 109.3-162.1s101.3-83.7 162-109.4c62.9-26.6 129.7-40 198.6-40S648.3 16 711.2 42.6c60.7 25.7 115.3 62.5 162.1 109.3S956.9 253.3 982.6 314c26.6 62.9 40.1 129.7 40.1 198.5 0 68.8-13.5 135.6-40.1 198.5-25.7 60.7-62.5 115.3-109.3 162.1s-101.4 83.6-162.1 109.3c-62.9 26.6-129.7 40.1-198.5 40.1z m0-980c-259.2 0-470 210.8-470 470s210.8 470 470 470 470-210.8 470-470-210.9-470-470-470z" fill="'+ color +'" p-id="1858"></path>';
				iost += '<path d="M520.2 193.3l286.5 165-61.5 48-225-132-160.4 100.5 88.5 59 52.7-30.9 62.7 34.9-43.5 36 54 37.4 45-28.4 58.5 28.8-45 31.1 198 105-304.5 183-332.9-186v-85.5L512 746.7l177.7-99.9-106.5-65.1-43.5 30-65.9-40.5 38.2-24-62.4-40-32.5 24.8-70.8-41.2 34.5-21.5-169.5-91.5z" fill="'+ color +'" p-id="1859"></path>';
				iost += '</svg>';

				var html = '';
				var html2 = '';
				var obj = data.object;



				
				$.each(obj, function(i, n) {
					// html += '<span class="dexBtn ' + (i == 0 ? 'active' : '') + '">' + String(n).toLocaleUpperCase() + '</span>';

					// html2 += '<div class="item flex">';
					// html2 += '	<span class="coin">';
					// html2 += '		<img src="images/startIcon.png" alt="">';
					// html2 += String(n).toLocaleUpperCase();
					// html2 += '	</span>';
					// html2 += '	<span class="newPrice"></span>';
					// html2 += '</div>';
					var tokenSymbol = String(n.id).toLocaleLowerCase();

	                html += '  <div class="item flex '+ (tokenSymbol == selectToken ? 'active' : '') +'" onclick="listDexOrderSymbol(\''+ tokenSymbol +'\',this)">';
	                if(n.logoUrl != ''){
	                	html += '    <img src="'+ n.logoUrl +'" alt="" style="width:68px;height:68px;border-radius:50%;">';

	                }else{
	                	html += iost;
	                }
	                

	                html += '    <div class="content">';
	                html += '      <h3>' + String(n.name).toLocaleUpperCase() + '</h3>';
	                html += '      <ul class="clear">';

	                html += '			<li class="about">'+ n.info +'</li>';
	                html += '      </ul>';
	                html += '    </div>';
	                html += '  </div>';


				})




				$(".dexAdList").html(html);
				// $("#listCommonToken").html(html2);



			} else {
				alert(data.message);
			}
		},
		error: function(data) {
			if (data.status == 401) {
				alert(data.message);
			}
		}
	});
}

function listDexOrder(page) {
	$("#dexSelectOrderBox").show();
	$("#saleMarketLoadingShow").show();
	$(".c-exchangeTabs .NavItem").removeClass("active");
	$(".c-exchangeTabs .NavItem").eq(0).addClass("active");
	var selfData = {
			page: page,
			size: 10
	}
	if(selectLookSymbol){
		selfData.symbol = selectLookSymbol;
	}
	if(selectLookOrderType){
		selfData.orderType = selectLookOrderType;
	}
	$.ajax({
		type: 'get',
		url: '/api/listDexOrder.do',
		data: selfData,
		dataType: 'json',
		success: function(data) {
			$("#saleMarketLoadingShow").hide();
			var pc = IsPC();
			var title = '';
				title += '<div class="item flex">';
				if(pc){
					title += '	<span class="owner">广告方</span>';
				}
				title += '	<span class="num">数量</span>';
				title += '	<span class="price">单价</span>';
				if(pc){
					title += '	<span class="total">总值 ( USD )</span>';
				}
				title += '	<span class="action">交易</span>';
				title += '</div>';


			$(".rightBox .dexTitle").html(title);

			if (data.code == 200) {

				var html = '';
				var obj = data.object.content;
				
				
				if(obj == ''){
					$(".rightBox .dexTitle").html('<div class="с-exchangeNotification"><p>暂无挂单信息</p></div>');
					$(".rightBox .dexList").html('');
					$(".pagination").html('');
					return
				}

				$.each(obj, function(i, n) {
					var total = Number(n.price * n.amount).toFixed(4);
					html += '<div class="item flex">';

					if(pc){
						html += '	<span class="owner flex">';
						html += '		<div class="radius"></div>';
						html += '		<span class="name">' + n.fromUser + '</span>';
						html += '	</span>';
					}

					html += '	<span class="num">' + Number(n.amount).toFixed(4) + ' '+ String(n.symbol).toLocaleUpperCase() +'</span>';
					html += '	<span class="price" style="color: #0da88b;">' + Number(n.price).toFixed(4) + ' IOST</span>';
					
					if(pc){
						html += '	<span class="total">' + Number(n.totalAmountUSD).toFixed(6) + ' USD</span>';
					}

					if(n.orderType == 'BUY'){
						html += '	<span class="action" onclick="acceptEntrustShow(\''+ n.orderType +'\','+ n.orderId +','+ n.price +','+ n.amount +',\''+ n.symbol +'\')"><span class="blueBtn">出售</span></span>';
					}else{
						html += '	<span class="action" onclick="acceptEntrustShow(\''+ n.orderType +'\','+ n.orderId +','+ n.price +','+ n.amount +',\''+ n.symbol +'\')"><span class="blueBtn">购买</span></span>';
					}


					html += '</div>';



				})
				$(".rightBox .dexList").html(html);



				var html2 = '';
				var num = 5,startIndex, endIndex, total;
				total = data.object.totalPages;
				if (total < num) {

					num = total;

				}
				// console.log("page:",page,"total",total,)
				if (page > 5) {
					if (total <= page + 5) {
						startIndex = page - (num - (total - page));
						endIndex = startIndex + num;
					} else {
						startIndex = page - 5;
						endIndex = page + 5;
					}
				} else {
					startIndex = 0;
					num > 0 ? endIndex = num : endIndex = 1;
				}



				if (page == 0) {
					html2 += '<li class="disabled"><span>&lt;</span></li>';
					// html2 += '<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>';
				} else {
					html2 += '<li onclick="listDexOrder(' + (page - 1) + ')"><span>&lt;</span></li>';
					// html2 += '<li><a href="#" aria-label="Previous" onclick="tasksList(' + (page - 1) + ')"><span aria-hidden="true">«</span></a></li>';
				}
				for (var i = startIndex; i < endIndex; i++) {
					if (i == page) {
						html2 += '<li class="active" onclick="listDexOrder(' + i + ')"><span>' + (i + 1) + '</span></li>';
						// html2 += '<li class="active" onclick="tasksList(' + i + ')"><a href="#">' + (i + 1) + '</a></li>'
					} else {
						html2 += '<li onclick="listDexOrder(' + i + ')"><span>' + (i + 1) + '</span></li>';
						// html2 += '<li onclick="tasksList(' + i + ')"><a href="#">' + (i + 1) + '</a></li>'
					}
				}
				if (page == data.object.totalPages - 1) {
					html2 += '<li class="disabled"><span>&gt;</span></li>';
					// html2 += '<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">»</span></a></li>';
				} else {
					html2 += '<li onclick="listDexOrder(' + (page + 1) + ')"><span>&gt;</span></li>';
					// html2 += '<li><a href="#" aria-label="Previous" onclick="tasksList(' + (page + 1) + ')"><span aria-hidden="true">»</span></a></li>';
				}
				$(".pagination").html(html2);



			} else {
				alert(data.message);
			}
		},
		error: function(data) {
			if (data.status == 401) {
				alert(data.message);
			}
		}
	});
}

function listDexOrderType(type,self){
	selectLookOrderType = type;
	$(".dexSelectOrderBtn").removeClass("active");
	$(self).addClass("active");
	listDexOrder(0);
}
function listDexOrderSymbol(symbol,self){
	selectLookSymbol = symbol;
	$(".leftBox .dexAdList .item").removeClass("active");
	$(self).addClass("active");

	var html = '<b>已选代币：</b><em>'+ selectLookSymbol +'</em><span>X</span>';
	$(".selecrCoinTag").html(html).show();
	$("#coinNameShow").html(selectLookSymbol);

	listDexOrder(0);
	coinTypeHide();
}
function selecrCoinTag(){
	selectLookSymbol = '';
	$("#coinNameShow").html("全部代币");
	$(".leftBox .dexAdList .item").removeClass("active");
	$(".selecrCoinTag").html('').hide();
	listDexOrder(0);
	coinTypeHide();
}



function listMyDexOrder(page) {
	if (!getCookie("token")) {
		panelShow(0);
		showMsg("请登录再操作");
		return 
	}

	$("#dexSelectOrderBox").hide();
	$("#saleMarketLoadingShow").show();
	$(".c-exchangeTabs .NavItem").removeClass("active");
	$(".c-exchangeTabs .NavItem").eq(1).addClass("active");
	$.ajax({
		type: 'get',
		url: '/api/listMyDexOrder.do',
		data: {
			page: page,
			size: 10
		},
		headers: {
			'Authorization': "BASIC " + getCookie("token")
		},
		dataType: 'json',
		success: function(data) {
			$("#saleMarketLoadingShow").hide();

			var pc = IsPC();
			var title = '';
				title += '<div class="item flex">';
				if(pc){
					title += '	<span class="owner">广告方</span>';
				}
				title += '	<span class="num">数量</span>';
				title += '	<span class="price">单价</span>';
				if(pc){
					title += '	<span class="total">总值 ( USD )</span>';
				}
				title += '	<span class="action">交易</span>';
				title += '</div>';

				$(".rightBox .dexTitle").html(title);

			
			if (data.code == 200) {


				var html = '';
				var obj = data.object.content;
				if(obj == ''){
					$(".rightBox .dexTitle").html('<div class="с-exchangeNotification"><p>暂无挂单信息</p></div>');

					$(".rightBox .dexList").html('');
					$(".pagination").html('');
					return
				}
				$.each(obj, function(i, n) {

					var total = Number(n.price * n.amount).toFixed(4);
					html += '<div class="item flex">';
					if(pc){
						html += '	<span class="owner flex">';
						html += '		<div class="radius"></div>';
						html += '		<span class="name">' + n.fromUser + '</span>';
						html += '	</span>';
					}

					// html += '	<span class="orderNum">' + Number(n.amount).toFixed(4) + ' ' + String(n.symbol).toLocaleUpperCase() + '</span>';
					html += '	<span class="num">' + Number(n.amount).toFixed(4) + ' '+ String(n.symbol).toLocaleUpperCase() +'</span>';
					html += '	<span class="price" style="color: #0da88b;">' + Number(n.price).toFixed(4) + ' IOST</span>';
					
					if(pc){
						html += '	<span class="total">' + Number(n.totalAmountUSD).toFixed(6) + ' USD</span>';
					}

					if(n.orderType == "BUY"){

						html += '	<span class="action" onclick="cancelEntrust('+ n.orderId +')"><span class="blueBtn">购买下架</span></span>';
					
					}else{

						html += '	<span class="action" onclick="cancelEntrust('+ n.orderId +')"><span class="blueBtn">出售下架</span></span>';
					
					}


					html += '</div>';




					// html += '<div class="item flex">';
					// html += '	<span class="owner flex">';
					// html += '		<div class="radius"></div>';
					// html += '		<span class="name">' + n.fromUser + '</span>';
					// html += '	</span>';
					// html += '	<span class="num">' + n.amount + ' ' + String(n.symbol).toLocaleUpperCase() + '</span>';
					// html += '	<span class="price">' + n.price + ' IOST</span>';
					// html += '	<span class="action" onclick="cancelEntrust('+ n.orderId +')"><span class="blueBtn">下架</span></span>';
					// html += '</div>';

				})
				$(".rightBox .dexList").html(html);


				var html2 = '';
				var num = 5,startIndex, endIndex, total;
				total = data.object.totalPages;
				if (total < num) {

					num = total;

				}
				// console.log("page:",page,"total",total,)
				if (page > 5) {
					if (total <= page + 5) {
						startIndex = page - (num - (total - page));
						endIndex = startIndex + num;
					} else {
						startIndex = page - 5;
						endIndex = page + 5;
					}
				} else {
					startIndex = 0;
					num > 0 ? endIndex = num : endIndex = 1;
				}



				if (page == 0) {
					html2 += '<li class="disabled"><span>&lt;</span></li>';
					// html2 += '<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>';
				} else {
					html2 += '<li onclick="listMyDexOrder(' + (page - 1) + ')"><span>&lt;</span></li>';
					// html2 += '<li><a href="#" aria-label="Previous" onclick="tasksList(' + (page - 1) + ')"><span aria-hidden="true">«</span></a></li>';
				}
				for (var i = startIndex; i < endIndex; i++) {
					if (i == page) {
						html2 += '<li class="active" onclick="listMyDexOrder(' + i + ')"><span>' + (i + 1) + '</span></li>';
						// html2 += '<li class="active" onclick="tasksList(' + i + ')"><a href="#">' + (i + 1) + '</a></li>'
					} else {
						html2 += '<li onclick="listMyDexOrder(' + i + ')"><span>' + (i + 1) + '</span></li>';
						// html2 += '<li onclick="tasksList(' + i + ')"><a href="#">' + (i + 1) + '</a></li>'
					}
				}
				if (page == data.object.totalPages - 1) {
					html2 += '<li class="disabled"><span>&gt;</span></li>';
					// html2 += '<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">»</span></a></li>';
				} else {
					html2 += '<li onclick="listMyDexOrder(' + (page + 1) + ')"><span>&gt;</span></li>';
					// html2 += '<li><a href="#" aria-label="Previous" onclick="tasksList(' + (page + 1) + ')"><span aria-hidden="true">»</span></a></li>';
				}
				$(".pagination").html(html2);



			} else {
				alert(data.message);
			}
		},
		error: function(data) {
			if (data.status == 401) {
				alert(data.message);
			}
		}
	});
}


function listMyDexHistory(page) {
	if (!getCookie("token")) {
		panelShow(0);
		showMsg("请登录再操作");
		return 
	}

	$("#dexSelectOrderBox").hide();
	$("#saleMarketLoadingShow").show();
	$(".c-exchangeTabs .NavItem").removeClass("active");
	$(".c-exchangeTabs .NavItem").eq(2).addClass("active");
	$.ajax({
		type: 'get',
		url: '/api/listMyDexHistory.do',
		data: {
			page: page,
			size: 10
		},
		headers: {
			'Authorization': "BASIC " + getCookie("token")
		},
		dataType: 'json',
		success: function(data) {
			$("#saleMarketLoadingShow").hide();

			var pc = IsPC();
			var title = '';
			title += '<div class="item flex">';
			if(pc){
				title += '	<span class="owner">委托方</span>';
				title += '	<span class="owner">接受方</span>';
			}
			title += '	<span class="num" style="width:50px;flex:none;">方向</span>';
			title += '	<span class="price">成交价</span>';
			title += '	<span class="total" style="flex:1;">成交量</span>';
			title += '	<span class="action">成交时间</span>';
			title += '</div>';

			$(".rightBox .dexTitle").html(title);
			if (data.code == 200) {


				var html = '';
				var obj = data.object.content;

				if(obj == ''){
					$(".rightBox .dexTitle").html('<div class="с-exchangeNotification"><p>暂无成交记录</p></div>');
					$(".rightBox .dexList").html('');
					$(".pagination").html('');
					return
				}
				$.each(obj, function(i, n) {

					var total = Number(n.price * n.amount).toFixed(4);
					var tag = '';
					n.orderType == "SELL" ? tag = "卖出":tag = "买入";
					html += '<div class="item flex">';
					if(pc){
						html += '	<span class="owner flex">';
						html += '		<div class="radius"></div>';
						html += '		<span class="name">' + n.fromUser + '</span>';
						html += '	</span>';
						html += '	<span class="owner flex">';
						html += '		<div class="radius"></div>';
						html += '		<span class="name">' + n.toUser + '</span>';
						html += '	</span>';
					}
					html += '	<span class="num" style="width:50px;flex:none;">' + tag + '</span>';
					html += '	<span class="price" style="color: #0da88b;">'+ Number(n.price).toFixed(4) +' IOST</span>';
					html += '	<span class="total" style="flex:1;">' + Number(n.amount).toFixed(4) + ' '+ String(n.symbol).toLocaleUpperCase() +'</span>';

					if(pc){
						html += '	<span class="action">'+ new Date(n.createDate).Format('yyyy-MM-dd hh:mm:ss') +'</span>';
					}else{
						html += '	<span class="action">'+ new Date(n.createDate).Format('yy-MM-dd hh:mm') +'</span>';
					}
					

					html += '</div>';





				})
				$(".rightBox .dexList").html(html);



				var html2 = '';
				var num = 5,startIndex, endIndex, total;
				total = data.object.totalPages;
				if (total < num) {

					num = total;

				}
				// console.log("page:",page,"total",total,)
				if (page > 5) {
					if (total <= page + 5) {
						startIndex = page - (num - (total - page));
						endIndex = startIndex + num;
					} else {
						startIndex = page - 5;
						endIndex = page + 5;
					}
				} else {
					startIndex = 0;
					num > 0 ? endIndex = num : endIndex = 1;
				}



				if (page == 0) {
					html2 += '<li class="disabled"><span>&lt;</span></li>';
					// html2 += '<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>';
				} else {
					html2 += '<li onclick="listMyDexHistory(' + (page - 1) + ')"><span>&lt;</span></li>';
					// html2 += '<li><a href="#" aria-label="Previous" onclick="tasksList(' + (page - 1) + ')"><span aria-hidden="true">«</span></a></li>';
				}
				for (var i = startIndex; i < endIndex; i++) {
					if (i == page) {
						html2 += '<li class="active" onclick="listMyDexHistory(' + i + ')"><span>' + (i + 1) + '</span></li>';
						// html2 += '<li class="active" onclick="tasksList(' + i + ')"><a href="#">' + (i + 1) + '</a></li>'
					} else {
						html2 += '<li onclick="listMyDexHistory(' + i + ')"><span>' + (i + 1) + '</span></li>';
						// html2 += '<li onclick="tasksList(' + i + ')"><a href="#">' + (i + 1) + '</a></li>'
					}
				}
				if (page == data.object.totalPages - 1) {
					html2 += '<li class="disabled"><span>&gt;</span></li>';
					// html2 += '<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">»</span></a></li>';
				} else {
					html2 += '<li onclick="listMyDexHistory(' + (page + 1) + ')"><span>&gt;</span></li>';
					// html2 += '<li><a href="#" aria-label="Previous" onclick="tasksList(' + (page + 1) + ')"><span aria-hidden="true">»</span></a></li>';
				}
				$(".pagination").html(html2);


			} else {
				alert(data.message);
			}
		},
		error: function(data) {
			if (data.status == 401) {
				alert(data.message);
			}
		}
	});
}
