

var goldType = 0;
var apiUrl = '/api/listGoldExchange.do';
$(function(){
	listCommonToken(0);
	// listDexOrder(0)
	listSupportGame();
	// getSupportGame();

 	$("body").on("click", ".rightBox .NavItem", function() {
    var has = $(".rightBox .NavItem").hasClass("c-exchangeMobileTabs--headerShow");
    if (!getCookie("token")) {
      showMsg("请登录再操作");    
      eosLogin()
      
      return 
    }
 	   $(".rightBox .NavItem").removeClass("active");
 	   $(this).addClass("active");
     // listCommonTokenSelect($(this).attr("data-num"))
})
})


function listGoldExchange(){
	$(".leftBox .sortList .sortBtn").removeClass("active");
	$(".sortList .sortBtn").eq(1).addClass("active");

	
	apiUrl = '/api/listGoldExchange.do';
	listCommonToken(0);
	goldType = 0;
}
function listLevelingOrder(){
	$(".leftBox .sortList .sortBtn").removeClass("active");
	$(".sortList .sortBtn").eq(2).addClass("active");
	apiUrl = '/api/listLevelingOrder.do'
	listCommonToken(0);
	goldType = 1;
}
function listRechargeOrder(){
	$(".leftBox .sortList .sortBtn").removeClass("active");
	$(".sortList .sortBtn").eq(3).addClass("active");
	apiUrl = '/api/listRechargeOrder.do'
	listCommonToken(0);
	goldType = 2;
}

function listCommonToken(page) {

	$("#myItemLoadingShow").show();
	$.ajax({
		type: 'get',
		url: apiUrl,
		data: {
			page: page,
			size: 100
		},
		dataType: 'json',
		success: function(data) {
			$("#myItemLoadingShow").hide();
			if (data.code == 200) {
				// var selectToken = selectLookSymbol;
				var color = '#89d295';
				var iost = '<svg t="1584015159513" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1857" width="68" height="68">';
				iost += '<path d="M512.7 1022.5c-68.8 0-135.6-13.5-198.5-40.1-60.7-25.7-115.3-62.5-162.1-109.3C105.2 826.3 68.4 771.7 42.7 711c-26.6-62.9-40-129.7-40-198.5 0-68.8 13.5-135.6 40.1-198.5 25.7-60.7 62.5-115.3 109.3-162.1s101.3-83.7 162-109.4c62.9-26.6 129.7-40 198.6-40S648.3 16 711.2 42.6c60.7 25.7 115.3 62.5 162.1 109.3S956.9 253.3 982.6 314c26.6 62.9 40.1 129.7 40.1 198.5 0 68.8-13.5 135.6-40.1 198.5-25.7 60.7-62.5 115.3-109.3 162.1s-101.4 83.6-162.1 109.3c-62.9 26.6-129.7 40.1-198.5 40.1z m0-980c-259.2 0-470 210.8-470 470s210.8 470 470 470 470-210.8 470-470-210.9-470-470-470z" fill="'+ color +'" p-id="1858"></path>';
				iost += '<path d="M520.2 193.3l286.5 165-61.5 48-225-132-160.4 100.5 88.5 59 52.7-30.9 62.7 34.9-43.5 36 54 37.4 45-28.4 58.5 28.8-45 31.1 198 105-304.5 183-332.9-186v-85.5L512 746.7l177.7-99.9-106.5-65.1-43.5 30-65.9-40.5 38.2-24-62.4-40-32.5 24.8-70.8-41.2 34.5-21.5-169.5-91.5z" fill="'+ color +'" p-id="1859"></path>';
				iost += '</svg>';

				var html = '';
				var html2 = '';
				var obj = data.object;

				showShopList(data,page);

				return
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

function showShopList(data,page){
	console.log(data)
	// var obj = 

	var num = 1;
	var html = '';
	var obj = data.object.content;
	console.log(obj)


	html += '<div class="searchMsgShowBox flex">'
	html += '  <h2>'+ obj[0].gameName +' 所有商品</h2>'
	html += '  <div class="flex" style="flex:1;">'
	html += '    <h3 style="flex:1;">共 <span class="green">'+ data.object.totalElements +'</span> 件商品</h3>'
	html += '    <ul class="sortList flex">'
	// html += '      <li class="sortBtn">按时间排序</li>'
	html += '      <li class="sortBtn active">按单价低到高排序</li>'
	// html += '      <li class="sortBtn">按价格高到低排序</li>'
	// html += '      <li class="sortBtn">按价格低到高排序</li>'
	html += '    </ul>'
	html += '  </div>'
	html += '</div>'

	if(IsPC()){


		html += '<div class="dexTitle">';
		html += '  <ul class="item flex" style="align-items: stretch;">';
		html += '    <li class="owner">商品标题</li>';
		html += '    <li class="price">价格</li>';
		html += '    <li class="num">库存</li>';
		html += '    <li class="guarant">保障</li>';
		html += '    <li class="action"></li>';
		html += '  </ul>';
		html += '</div>';

		html += '<div class="c-exchange__inventory">';
		html += '  <div class="c-assetList">';
		html += '    <div class="с-virtualscroll с-virtualscroll-placeholder--large">';
		html += '      <div class="dexList">';

		for (var j = 0; j < num; j++) {
			
			$.each(obj,function(i,n){

				var gameName = n.gameName;
				var platform = n.platform;
				var gameArea = n.gameArea;



				html += '        <ul class="item flex">';
				html += '          <li class="owner">';
				html += '            <div class="flex">';
				html += '              <img src="images/zhang.png" alt="">';
				html += '              <img src="images/tu.png" alt="">';

				html += '              <span class="name">'+ n.title +'</span>';
				html += '            </div>';
				html += '            <div class="flex">';
				html += '              卖家信用:';
				html += '              <img class="star" src="images/startIconSelect.png" alt="">';
				html += '              <img class="star" src="images/startIconSelect.png" alt="">';
				html += '              <img class="star" src="images/startIconSelect.png" alt="">';
				html += '              <span class="green" style="flex:1;">(近7天：100%成交)</span>';
				html += '            </div>';
				html += '            <div>商品类型:'+ n.shopName +'</div>';
				html += '            <div>游戏区服:'+ n.gameArea +'</div>';
				html += '          </li>';
				html += '          <li class="price">￥ '+ n.price +'</li>';



				html += '          <li class="num">有货</li>';
				html += '          <li class="guarant">';
				html += '            <div class="flex">';
				html += '              <img src="images/ji.png" alt="">';
				html += '              <span style="flex:1;">平台发货</span>';
				html += '            </div>';
				html += '            <div class="flex">';
				html += '              <img src="images/shiming.png" alt="">';
				html += '              <span style="flex:1;">已实人</span>';
				html += '            </div>';
				html += '          </li>';
				html += '          <li class="action flex">';
				html += '            <span style="flex: 1;"></span>';
				html += '            <span class="blueBtn" onclick="buyShopShow('+ n.id +')">立即购买</span>';
				html += '          </li>';
				html += '        </ul>';
			})

		}




		html += '      </div>';
		html += '    </div>';
		html += '  </div>';
		html += '</div>';



	}else{

		html += '<div class="c-exchange__inventory">';
		html += '  <div class="c-assetList">';
		html += '    <div class="с-virtualscroll с-virtualscroll-placeholder--large">';
		for (var j = 0; j < num; j++) {
			

			$.each(obj,function(i,n){

				html += '<div style="padding:12px 0px;border-bottom: 1px solid #2a2c2e;">';
				html += '	<div class="flex">';
				html += '		<img src="images/zhang.png" alt="">';
				html += '		<img src="images/tu.png" alt="">';
				html += '		<span class="name">'+ n.title +'</span>';
				html += '	</div>';
				html += '	<div class="flex">';
				html += '		卖家信用:<img class="star" src="images/startIconSelect.png" alt="">';
				html += '		<img class="star" src="images/startIconSelect.png" alt="">';
				html += '		<img class="star" src="images/startIconSelect.png" alt="">';
				html += '		<span class="green" style="flex:1;">(近7天：100%成交)</span>';
				html += '	</div>';
				html += '	<div>商品类型:'+ n.shopName +'</div>';
				html += '	<div>游戏区服:'+ n.gameArea +'</div>';
				html += '	<div class="action flex">';
				html += '		<span style="flex: 1;color: #89d295;font-size:20px;">￥ '+ n.price +'</span>';
				html += '		<span class="blueBtn2" onclick="buyShopShow('+ n.id +')">立即购买</span>';
				html += '	</div>';
				html += '</div>';

			})
		}
		html += '    </div>';
		html += '  </div>';
		html += '</div>';


	}


		var html2 = '';
		var num = 5,startIndex, endIndex, total;
		total = data.object.totalPages;
		if (total < num) {
			num = total;
		}
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
		} else {
			html2 += '<li onclick="listCommonToken(' + (page - 1) + ')"><span>&lt;</span></li>';
		}
		for (var i = startIndex; i < endIndex; i++) {
			if (i == page) {
				html2 += '<li class="active" onclick="listCommonToken(' + i + ')"><span>' + (i + 1) + '</span></li>';
			} else {
				html2 += '<li onclick="listCommonToken(' + i + ')"><span>' + (i + 1) + '</span></li>';
			}
		}
		if (page == data.object.totalPages - 1) {
			html2 += '<li class="disabled"><span>&gt;</span></li>';
		} else {
			html2 += '<li onclick="listCommonToken(' + (page + 1) + ')"><span>&gt;</span></li>';
		}



		html += '<div class="paginationBox">';
		html += '  <ul class="pagination">';

		html += html2;

		html += '  </ul>';
		html += '</div>';


	$(".rightBox .dexListBox").html(html);
}


function buyShopShowGo(obj){

	var title = '';
	var btnTxt = '确定购买';
	if(goldType == 0){
		title = "购买金币";
	}else if(goldType == 1){
		title = "购买代练";
	}else{
		title = "购买代充";
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

	// html += '				<p class="c-authInfo__text" id="noPayMsg" style="border: 1px solid #e86359;padding: 15px;color: #e86359;">* 所展示的商品供求信息由买卖双方自行提供，其真实性、准确性和合法性由信息发布人负责。</p>';



		// $.each(obj,function(i,n){
		// 	html += '<p class="c-authInfo__text" style="color:#848484">'+ i +'：<span style="color:#fff">'+ n +'</span></p>';
		// })
	if(goldType == 1){//代练

		html += '<p class="c-authInfo__text" style="color:#848484"><span style="color:#fff">'+ obj.title +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">所属游戏：<span style="color:#fff">'+ obj.gameName +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">服务器：<span style="color:#fff">'+ obj.gameArea +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">商品：<span style="color:#fff">'+ obj.shopName +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">价格：<span style="color:#fff">'+ obj.price +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">交货时间：<span style="color:#fff">'+ obj.deilveryTime +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">备注：<span style="color:#fff">'+ obj.comment +'</span></p>';


		html += '                 <div class="ng-pristine ng-invalid ng-touched">';

		// html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
		// html += '                     <div class="mat-form-field-wrapper">';
		// html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
		// html += '                         <input type="number" id="tokenAmount" placeholder="代币数量" oninput="acceptEntrustTotalPriceShow()" style="background: none;border:0;height:100%;flex:1;font-size:20px;">';
		// html += '                         <span class="coinName">ssss</span>';
		// html += '                       </div>';
		// html += '                     </div>';
		// html += '                   </div>';
	}else if(goldType == 2){

		html += '<p class="c-authInfo__text" style="color:#848484"><span style="color:#fff">'+ obj.title +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">所属游戏：<span style="color:#fff">'+ obj.gameName +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">服务器：<span style="color:#fff">'+ obj.gameArea +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">商品：<span style="color:#fff">'+ obj.shopName +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">价格：<span style="color:#fff">'+ obj.price +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">交货时间：<span style="color:#fff">'+ obj.deilveryTime +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">备注：<span style="color:#fff">'+ obj.comment +'</span></p>';


		html += '                 <div class="ng-pristine ng-invalid ng-touched">';

		// html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
		// html += '                     <div class="mat-form-field-wrapper">';
		// html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
		// html += '                         <input type="number" id="tokenAmount" placeholder="代币数量" oninput="acceptEntrustTotalPriceShow()" style="background: none;border:0;height:100%;flex:1;font-size:20px;">';
		// html += '                         <span class="coinName">ssss</span>';
		// html += '                       </div>';
		// html += '                     </div>';
		// html += '                   </div>';
	}else{

		html += '<p class="c-authInfo__text" style="color:#848484"><span style="color:#fff">'+ obj.title +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">所属游戏：<span style="color:#fff">'+ obj.gameName +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">服务器：<span style="color:#fff">'+ obj.gameArea +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">商品：<span style="color:#fff">'+ obj.shopName +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">金币数量：<span style="color:#fff">'+ obj.goldAmount +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">价格：<span style="color:#fff">'+ obj.price +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">交货时间：<span style="color:#fff">'+ obj.deilveryTime +'</span></p>';
		html += '<p class="c-authInfo__text" style="color:#848484">备注：<span style="color:#fff">'+ obj.comment +'</span></p>';


		html += '                 <div class="ng-pristine ng-invalid ng-touched">';

		html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
		html += '                     <div class="mat-form-field-wrapper">';
		html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
		html += '                         <input type="number" id="tokenAmount" placeholder="请输入购买金币数量" oninput="acceptEntrustTotalPriceShow()" style="background: none;border:0;height:100%;flex:1;font-size:20px;">';
		html += '                         <span class="coinName"></span>';
		html += '                       </div>';
		html += '                     </div>';
		html += '                   </div>';
	}



	html += '                     <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit" onclick="buyShopGoTO()">';
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


function buyShopShow(id) {

	var url = '/api/getGoldExchange.do';

	if(goldType == 0){
		url = '/api/getGoldExchange.do';
	}else if(goldType == 1){
		url = '/api/getLevelingOrder.do';
	}else if(goldType == 2){
		url = '/api/getRechargeOrder.do';
	}

	$("#myItemLoadingShow").show();
	$.ajax({
		type: 'get',
		url: url,
		data: {
			orderId: id
		},
		dataType: 'json',
		success: function(data) {
			$("#myItemLoadingShow").hide();
			if (data.code == 200) {


				buyShopShowGo(data.object);

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

function buyShopGoTO(){
	if(!getCookie("token")){
		panelShow(0);
	}
}
function listCommonTokenSelect(num){
	if(num > 0){

		if(!getCookie("token")){
			panelShow(0);
		}
	}else{
		listCommonToken(0);
	}
}


function listSupportGame() {

	var url = '/api/listSupportGame.do';


	$("#myItemLoadingShow").show();
	$.ajax({
		type: 'get',
		url: url,
		data: {
			// orderId: id
		},
		dataType: 'json',
		success: function(data) {
			$("#myItemLoadingShow").hide();
			if (data.code == 200) {


				var html = '';

				var obj = data.object;
				$.each(obj,function(i,n){
					var tagNum = n.supportType.split(",");

// name: "梦幻西游"
// supportType: "RECHARGE_PROXY,BOOSTING"
	                html += '    <div class="item flex">';
	                html += '      <img src="images/gameList_01.png" alt="">';
	                html += '      <div class="content">';
	                html += '        <h3>'+ n.name +'</h3>';
	                html += '        <ul class="clear">';
					$.each(tagNum,function(x,m){
						if(m == "RECHARGE_PROXY"){
							 html += '<li class="contentTag">代充</li>';
						}
						if(m == "BOOSTING"){
							 html += '<li class="contentTag">代练</li>';
						}
						if(m == "GOLD_EXCHANGE"){
							 html += '<li class="contentTag">金币</li>';
						}
					})
	                // html += '          <li class="contentTag">账号</li><li class="contentTag">道具</li><li class="contentTag">游戏币</li>';
	                // html += '          <li class="contentTag">首充号</li><li class="contentTag">代练</li><li class="contentTag">礼包</li>';

	                html += '        </ul>';
	                html += '      </div>';
	                html += '    </div>';

				})
                // html += '    <div class="item flex">';
                // html += '      <img src="images/gameList_01.png" alt="">';
                // html += '      <div class="content">';
                // html += '        <h3>暗黑终结者</h3>';
                // html += '        <ul class="clear">';
                // html += '          <li class="contentTag">账号</li><li class="contentTag">道具</li><li class="contentTag">游戏币</li>';
                // html += '          <li class="contentTag">首充号</li><li class="contentTag">代练</li><li class="contentTag">礼包</li>';
                // html += '        </ul>';
                // html += '      </div>';
                // html += '    </div>';
                // html += '    <div class="item flex">';
                // html += '      <img src="images/gameList_02.png" alt="">';
                // html += '      <div class="content">';
                // html += '        <h3>暗夜奇迹</h3>';
                // html += '        <ul class="clear">';
                // html += '          <li class="contentTag">账号</li><li class="contentTag">道具</li><li class="contentTag">游戏币</li>';
                // html += '          <li class="contentTag">首充号</li>';
                // html += '        </ul>';
                // html += '      </div>';
                // html += '    </div>';
                // html += '    <div class="item flex">';
                // html += '      <img src="images/gameList_03.png" alt="">';
                // html += '      <div class="content">';
                // html += '        <h3>奥特曼口袋版</h3>';
                // html += '        <ul class="clear">';
                // html += '          <li class="contentTag">账号</li><li class="contentTag">道具</li>';
                // html += '        </ul>';
                // html += '      </div>';
                // html += '    </div>';
                // html += '    <div class="item flex">';
                // html += '      <img src="images/gameList_04.png" alt="">';
                // html += '      <div class="content">';
                // html += '        <h3>暗夜荣耀</h3>';
                // html += '        <ul class="clear">';
                // html += '          <li class="contentTag">账号</li>';
                // html += '        </ul>';
                // html += '      </div>';
                // html += '    </div>';
                // html += '    <div class="item flex">';
                // html += '      <img src="images/gameList_05.png" alt="">';
                // html += '      <div class="content">';
                // html += '        <h3>Apex英雄</h3>';
                // html += '        <ul class="clear">';
                // html += '          <li class="contentTag">账号</li><li class="contentTag">道具</li><li class="contentTag">游戏币</li>';
                // html += '          <li class="contentTag">首充号</li>';
                // html += '        </ul>';
                // html += '      </div>';
                // html += '    </div>';

                $(".gameAdList").html(html);


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
function getSupportGame() {

	var url = '/api/getSupportGame.do';


	$("#myItemLoadingShow").show();
	$.ajax({
		type: 'get',
		url: url,
		data: {
			code: "JXQY3"
		},
		dataType: 'json',
		success: function(data) {
			$("#myItemLoadingShow").hide();
			if (data.code == 200) {



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


