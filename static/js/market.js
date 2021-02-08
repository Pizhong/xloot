var getSaleMarketPage = 0;

var myItemScrollPage = 0;
var Do_not_trigger2 = true;
var GENERATION;
// //下拉加载
// var range = 0; // 距下边界长度/单位px
// var totalheight = 0;
var Do_not_trigger = true ; //是否触发加载
var buyLootSymbol = "EOS";

listXLootMarketCategory();



$(document).ready(function() {
  getSaleMarket(0)
	//下拉加载
	
	
	var range = 40; // 距下边界长度/单位px
	var totalheight = 0;
	$('#getSaleMarketScroll').scroll(function() {
		var single_content = $('#getSaleMarketScroll').height();
		var srollPos = $('#getSaleMarketScroll').scrollTop(); // 滚动条距顶部距离(页面超出窗口的高度)
		var single_con_sh = $('#getSaleMarketScroll')[0].scrollHeight; // div的实际内容高度
		// console.log(single_content,srollPos,single_con_sh,single_con_sh - single_content - srollPos);
		totalheight = parseFloat(single_con_sh) - parseFloat(single_content) - parseFloat(srollPos);
		// console.log(srollPos,single_con_sh,totalheight,range)
		if (range >= totalheight) {
			if (Do_not_trigger) {
				Do_not_trigger = false;
				getSaleMarketPage++;
				getSaleMarket(getSaleMarketPage)
			}
		}
	});

	$('#myItemScroll').scroll(function() {
		var myItemScroll_content = $('#myItemScroll').height();
		var srollPos = $('#myItemScroll').scrollTop(); // 滚动条距顶部距离(页面超出窗口的高度)
		var single_con_sh = $('#myItemScroll')[0].scrollHeight; // div的实际内容高度
		// console.log(single_content,srollPos,single_con_sh,single_con_sh - single_content - srollPos);
		totalheight = parseFloat(single_con_sh) - parseFloat(myItemScroll_content) - parseFloat(srollPos);
		// console.log(single_con_sh,myItemScroll_content,srollPos,totalheight)
		if (range >= totalheight) {
			if (Do_not_trigger2) {
				Do_not_trigger2 = false;
				myItemScrollPage++;


				checkLogin(function() {
					if ($(".c-exchangeHeader__inner--user .NavItem").eq(0).hasClass("active") == true) {
						getMyItem(myItemScrollPage);
					} else {
						getMySaleItem(myItemScrollPage);
					}
				})
			}
		}
	});


	$("body").on("click", ".selectBoxShow", function() {
		var has = $(this).find(".selectBox").hasClass("active");

		if (has == true) {
			$(this).find(".selectBox").removeClass("active");
		} else {
			$(".selectBoxShow .selectBox").removeClass("active");
			$(this).find(".selectBox").addClass("active")

		}
		//$(".selectBoxShow .selectBox").removeClass("active");
		//$(this + " .selectBox").addClass("active");
	})

	$("body").on("click", ".orderTypeBtn", function() {
		$(".orderTypeBtn").removeClass("active");
		$(this).addClass("active");
		buyLootSymbol = $(this).attr("data-type");
		$(".buyLootSymbol").html(buyLootSymbol);
		$("#buyLootNum").val('');
	})

})

function Navtab2(num,self){
    $(".dexSelectOrderBtn").removeClass("active");
    $(self).addClass("active");
    
    if (num == "2") {
		$('#getSaleMarketScroll').animate({scrollTop:0},300);
		$(".c-exchange__side--user").hide();
		$(".c-exchange__side--market").show();
		getSaleMarket(0);
		getSaleMarketPage = 0;
    } else {
		$('#myItemScroll').animate({scrollTop:0},300);
		$('#getSaleMarketScroll').animate({scrollTop:0},300);
		$(".c-exchange__side--user").show();
		$(".c-exchange__side--market").hide();
		Navtab(Number(num));
    }

}


function getSaleMarket(page) {
	$("#saleMarketLoadingShow").show();
	// var url = '/api/xpet/getSaleMarket.do';
	var url = '/api/listDexOrder.do';
  var filters="price:"+$('#priceLow').val()+"-"+$('#priceHigh').val()+"|"+"level:"+$('#filter-level').val()+ "-" +$('#filter-level').val()+"|"+"quality:"+$('#qualityLow').val()+"-"+$('#qualityHigh').val()+"|"+"category:"+$('#filter-classify').val()+"-"+$('#filter-classify').val()+"|"+"asset:"+$('#filter-price-unit').val()+"-"+$('#filter-price-unit').val()
	console.log('filters',filters);
  var selfData = {}
  if($('#priceLow').val()!=undefined){
    selfData={
      page: page,
      size: 10,
      filter:filters
    }
    
  }
   else{
     selfData={
      page: page,
      size: 10,
     }
   }

	$.ajax({
		type: 'get',
		url: url,
		// data: {
		//       page: page,
		//       size: 100,
		//       game: 'xpet',
		//       lowPrice: $("#lowPrice").val() || 0,
		//       highPrice: $("#highPrice").val() || 0
		// },
		data: selfData,
		dataType: 'json',
		success: function(data) {
			if (data.code == 200) {
        var obj = data.object.content;
        console.log('obj',obj);
				$("#saleMarketLoadingShow").hide();

				// var obj = csgoData;

				var html = '';

				if (obj == '' || obj == undefined) {
					// if(page != 0){
					// 	showMsg("没有更多的商品了");
					// }
					Do_not_trigger = false;
					return
        }
        
				Do_not_trigger = true;
				$.each(obj, function(i, n) {
          console.log(obj,'!!!!!!!!!');
					// if (n.category == "PET") {
						// var msg = JSON.parse(n.meta);
						var imgClass = '';
            imgClass = 'skin';
            var imageUrl='../images/shovellv1.png'
            if(n.imageUrl){
              imageUrl=n.imageUrl
            }
						// console.log("msg:", msg);
            html += "<div class='c-asset item' style='' id='saleItemId_" + n.tokenId+ "' onclick='buyMsgShow(" + JSON.stringify(n) + ")'>";
						html += '    <div style="background: #2a2c2e;border-radius: 2px;width:100%;height:100%;font-size:14px;">';
						html += '      <div class="flex" style="line-height: 20px;padding:0 10px;">';
            html += '         <div style="flex:1">'
            html += '            <span style="color:#89d295;">评分：</span>'
            html += '            <span>'+n.quality +'</span>'
            html += '         </div>'
            html += '         <div>'
            html += '            <span style="color:#89d295;">LV.</span>'
            html += '            <span>'+n.level +'</span>'
            html += '         </div>'
            html += '      </div>';
            html += '      <div class="flex" style="height: 30px;">'
            html += '      <div style="margin-right:7px;">'
            html += '         <svg t="1584015159513" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1857" width="28" height="28">				<path d="M512.7 1022.5c-68.8 0-135.6-13.5-198.5-40.1-60.7-25.7-115.3-62.5-162.1-109.3C105.2 826.3 68.4 771.7 42.7 711c-26.6-62.9-40-129.7-40-198.5 0-68.8 13.5-135.6 40.1-198.5 25.7-60.7 62.5-115.3 109.3-162.1s101.3-83.7 162-109.4c62.9-26.6 129.7-40 198.6-40S648.3 16 711.2 42.6c60.7 25.7 115.3 62.5 162.1 109.3S956.9 253.3 982.6 314c26.6 62.9 40.1 129.7 40.1 198.5 0 68.8-13.5 135.6-40.1 198.5-25.7 60.7-62.5 115.3-109.3 162.1s-101.4 83.6-162.1 109.3c-62.9 26.6-129.7 40.1-198.5 40.1z m0-980c-259.2 0-470 210.8-470 470s210.8 470 470 470 470-210.8 470-470-210.9-470-470-470z" fill="#89d295" p-id="1858"></path>				<path d="M520.2 193.3l286.5 165-61.5 48-225-132-160.4 100.5 88.5 59 52.7-30.9 62.7 34.9-43.5 36 54 37.4 45-28.4 58.5 28.8-45 31.1 198 105-304.5 183-332.9-186v-85.5L512 746.7l177.7-99.9-106.5-65.1-43.5 30-65.9-40.5 38.2-24-62.4-40-32.5 24.8-70.8-41.2 34.5-21.5-169.5-91.5z" fill="#89d295" p-id="1859"></path>			</svg>'
           
            html += '      </div>'
            html += '          <span>'+ n.quantity+'</span>'
            html += '      </div>'
            html += '      <div style="color: rgba(0, 0, 0,0);text-align: center;position: relative;overflow: hidden;">';
            html += '        <img class="c-asset__img " style="height: 90px;max-height: 90px;" loading="auto" alt="" src="' + imageUrl + '">';
            html += '     </div>';
            html += '     <div class="flex">'
            html += '       <div class="shopAssetMsgBox" style="padding:5px 12px;">'+n.name+'</div>'
            html += '     </div>'
            html += '     <div class="flex" style="flex-wrap:wrap;font-size:14px;flex-wrap: wrap;border-top: 1px solid #000;line-height: 20px;margin-top: 8px;padding-top: 5px;">'
            html += '       <div class="shopMsgBox" style="color:#848484;">合约：<span>'+ n.contract +'</span></div>'
            html += '       <div class="shopMsgBox">卖家：<span>'+ n.owner +'</span></div>'
            html += '     </div>'
            html += '    </div>';
            html += '</div>';
				})

				if (page == 0) {
					$("#getSaleMarket").html(html);
				} else {
					$("#getSaleMarket").append(html);
				}

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


function getMyItem(page) {
	$("#myItemLoadingShow").show();
	// var url = '/api/xpet/getMyItem.do';
	var url = '/api/listMyAssets.do';
	$.ajax({
		type: 'get',
		url: url,
		data: {
			page: page,
			size: 10,
			categoryId: myGameType
			// category:myGameType
		},
		headers: {
			'Authorization': "BASIC " + getCookie("token")
		},
		dataType: 'json',
		success: function(data) {
			$("#myItemLoadingShow").hide();
			if (data.code == 200) {
				var html = '';
				if (!data.object) {
					$("#myItemMsg p").html('您的仓库中没有对应的物品 ');
					$("#myItem").html(html);
					$("#myItemMsg").show();
					return
				}
				var obj = data.object.content;

				if (obj == '' || obj == undefined) {

					// showMsg("没有更多的商品了");
					Do_not_trigger2 = false;
					if (page == 0) {
						$("#myItemMsg p").html('您的仓库中没有对应的物品 ');
						$("#myItem").html(html);
						$("#myItemMsg").show();
					}
					return
				}
				Do_not_trigger2 = true;
				if (obj == '') {
					$("#myItemMsg p").html('您的仓库中没有对应的物品 ');
					$("#myItemMsg").show();
					$("#myItem").html(html);
					return
				} else {
					$("#myItemMsg").hide();
				}
				$.each(obj, function(i, n) {

					// if (n.assetCode == "PET") {
						var msg = JSON.parse(n.meta);
						var imgClass = '';
						var gen = '';
                  if(n.category == "SKIN"){
                  imgClass = 'skin';
                  }
						// console.log("msg:", msg);
						html += '<div class="c-asset item" style="" id="myItemId_' + n.id + '" onclick="saleMsgShow(' + n.id + ',\'' + n.imageUrl + '\',' + n.nftContractId + ')">';
						html += '    <div style="background: #2a2c2e;border-radius: 2px;width:100%;height:100%;">';
						html += '      <div class="flex" style="line-height:72px;padding:0 10px;">';

						if (msg) {

							$.each(msg, function(x, y) {
								if (y.category == "SUMMARY") {

                                    switch(n.category){
                                          case "ITEM":
                                          case "SKIN":
												html += '        <div style="flex:1">';
												html += '          <span style="color:#89d295;font-weight: bolder;">等级:</span>';
												html += '          ' + getRareType(y.values.RARE) + '';
												html += '        </div>';
                                                break;
                                          case "TAILSMAN":
												html += '        <div style="flex:1">';
												html += '          <span style="color:#89d295;font-weight: bolder;">等级:</span>';
												html += '          ' + getRareType(y.values.RARE) + '';
												html += '        </div>';
												html += '        <div>';
												html += '          <span style="color:#89d295;font-weight: bolder;">LV.</span>';
												html += '          <span>' + y.values.LEVEL + '</span>';
												html += '        </div>';
                                                break;
                                          default:
                                                if(n.game == "IOST"){
													html += '        <div style="flex:1">';
													html += '          <span style="color:#89d295;font-weight: bolder;">类型:</span>';
													html += '          <span>' + n.category + '</span>';
													html += '        </div>';
                                                }else{
	                                                var score =  y.values.SCORE || '未知参数';
	                                                var level =  y.values.LEVEL || '未知参数';
													if(n.category == "PET"){
														gen = y.values.GENERATION;
													}
													html += '        <div style="flex:1">';
													html += '          <span style="color:#89d295;font-weight: bolder;">评分:</span>';
													html += '          <span>' + score + '</span>';
													html += '        </div>';
													html += '        <div>';
													html += '          <span style="color:#89d295;font-weight: bolder;">LV.</span>';
													html += '          <span>' + level + '</span>';
													html += '        </div>';
                                                }

                                    }

									// if(n.category == "SKIN"){
									// 	html += '        <div style="flex:1">';
									// 	html += '          <span style="color:#89d295;font-weight: bolder;">等级:</span>';
									// 	html += '          ' + getRareType(y.values.RARE) + '';
									// 	html += '        </div>';
									// }else{
									// 	if(n.category == "PET"){
									// 		gen = y.values.GENERATION;
									// 	}
										
									// 	html += '        <div style="flex:1">';
									// 	html += '          <span style="color:#89d295;font-weight: bolder;">评分:</span>';
									// 	html += '          <span>' + y.values.SCORE + '</span>';
									// 	html += '        </div>';
									// 	html += '        <div>';
									// 	html += '          <span style="color:#89d295;font-weight: bolder;">LV.</span>';
									// 	html += '          <span>' + y.values.LEVEL + '</span>';
									// 	html += '        </div>';
									// }

								}

							})
						}

						html += '      </div>';
						// html += '      <div class="flex" style="height: 39px;">';
						// html += '        <div style="margin-right:7px;">';
						// html += '          <svg t="1566445356488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2277" width="28" height="28">';
						// html += '            <path d="M942.427421 234.839536a17.254917 17.254917 0 1 0-28.988261 18.715833 475.626037 475.626037 0 0 1 76.013661 258.559181c0 263.229511-214.145024 477.386038-477.386038 477.386038s-477.386038-214.156527-477.386038-477.386038 214.145024-477.386038 477.386038-477.386039a475.683553 475.683553 0 0 1 166.659492 29.908523 17.254917 17.254917 0 0 0 12.055436-32.335714 511.964892 511.964892 0 1 0 251.64571 202.538216z" fill="#89d295" p-id="2278"></path>';
						// html += '            <path d="M796.059711 128.365195a482.807533 482.807533 0 0 1 34.969965 28.562639 17.254917 17.254917 0 1 0 23.064073-25.663813c-11.963409-10.755565-24.571002-21.050999-37.47768-30.621726a17.256067 17.256067 0 1 0-20.556358 27.7229zM385.496215 534.22385L261.088263 751.647308l242.144003 144.12457-117.736051-361.548028zM257.614273 707.187138l117.402456-205.172466-42.32056-129.964036-75.081896 335.136502zM621.370931 503.65964l-108.671467-191.736638-110.385456 192.898469 110.523495 339.381212 108.533428-340.543043zM689.332298 373.074428l-40.721605 127.755406 116.447684 205.460049-75.726079-333.215455zM638.223233 533.407117L522.868361 895.35776l239.072628-143.664439L638.223233 533.407117zM673.423264 340.336099L525.514115 130.263235v153.361703l106.232773 187.457419 41.676376-130.746258zM500.413963 282.865722V129.29696L348.708732 340.175053l43.125789 132.448743 108.579442-189.758074z" fill="#89d295" p-id="2279"></path>';
						// html += '          </svg>';
						// html += '        </div>';
						// html += '        <span>' + n.salePrice + '</span>';
						// html += '      </div>';
						html += '      <div style="color: rgba(0, 0, 0,0);text-align: center;position: relative;overflow: hidden;">';
						html += '        <img class="c-asset__img '+ imgClass +'" style="height: 95px;max-height: 95px;" loading="auto" alt="" src="' + n.imageUrl + '">';
						
						if(n.migrate == true){
							html += '     <div style="position:absolute;bottom:25px;right:8px;color: #E91E63;font-weight: bolder;border: 2px solid #E91E63;padding: 3px;">移</div>';
						}
						if(n.lock == true){
							html += '      	 <div style="position:absolute;bottom:25px;right:10px;">';
							html += '		 	<svg width="15" height="20" viewBox="0 0 9 12" xmlns="http://www.w3.org/2000/svg"><path d="M8.747 4.5h-.75V3.498A3.503 3.503 0 0 0 4.5 0 3.503 3.503 0 0 0 1 3.499v1H.25A.251.251 0 0 0 0 4.75V11C0 11.55.448 12 1 12h7c.55 0 1-.448 1-1V4.75a.255.255 0 0 0-.253-.25zm-3.5 5.22a.25.25 0 0 1-.064.194.246.246 0 0 1-.185.085h-1a.246.246 0 0 1-.186-.085.258.258 0 0 1-.063-.194l.157-1.418a.99.99 0 0 1-.41-.803 1.002 1.002 0 0 1 2.001 0 .983.983 0 0 1-.41.803l.16 1.418zm1.25-5.22H2.5V3.498a2 2 0 0 1 1.999-2c1.101 0 1.999.898 1.999 2v1z" fill="#848484"></path></svg>';
							html += '      	 </div>';
						}

						if (msg) {

							$.each(msg, function(x, y) {

								if(n.category == "PET"){
									
									if (y.category == "SUMMARY") {
										var string = '';
										// if(gen >= 2 && gen < 99 ){
										// 	html += '      	 <div style="position:absolute;bottom:42px;right:10px;">';
										// 	html += '		 	<svg width="15" height="20" viewBox="0 0 9 12" xmlns="http://www.w3.org/2000/svg"><path d="M8.747 4.5h-.75V3.498A3.503 3.503 0 0 0 4.5 0 3.503 3.503 0 0 0 1 3.499v1H.25A.251.251 0 0 0 0 4.75V11C0 11.55.448 12 1 12h7c.55 0 1-.448 1-1V4.75a.255.255 0 0 0-.253-.25zm-3.5 5.22a.25.25 0 0 1-.064.194.246.246 0 0 1-.185.085h-1a.246.246 0 0 1-.186-.085.258.258 0 0 1-.063-.194l.157-1.418a.99.99 0 0 1-.41-.803 1.002 1.002 0 0 1 2.001 0 .983.983 0 0 1-.41.803l.16 1.418zm1.25-5.22H2.5V3.498a2 2 0 0 1 1.999-2c1.101 0 1.999.898 1.999 2v1z" fill="#848484"></path></svg>';
										// 	html += '      	 </div>';
										// }
										if(gen == 99){
											string = 'X <span style="color:#89d295;font-weight: bolder;">代</span>';
										}else if(gen == 35){
											string = '<span style="color:#89d295;font-weight: bolder;">联名款</span>';
										}else{
											string = gen + '<span style="color:#89d295;font-weight: bolder;">代</span>';
										}
										html += '      	 <div style="color:#fff;position:absolute;bottom:5px;right:10px;">';
										html += '		 	<span>'+ string +'</span>';
										html += '      	 </div>';
									}
									if (y.category == "PROPERTY") {
										var LUCK = y.values.LUCK;
										var SEX = y.values.SEX;
										var VARIATION = y.values.VARIATION;
										if(VARIATION == "EVOLUTION"){
											html += '     <div style="position:absolute;bottom:55px;right:10px;color:#f29ded;font-weight: bolder;">变异</div>';
										}
										if(LUCK == "LUCKPET"){
											html += '		 <img style="position:absolute;bottom:13px;left:10px;z-index:1;" alt="" src="images/luck.png">';
										}
										// if(gen != 35){
											if(SEX == "BOY"){
												html += '      	 <div style="position:absolute;top:0;right:4px;">';
												html += '		 	<svg t="1585018899207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1904" width="24" height="24"><path d="M424.111301 818.825061c-59.328223 0-115.140367-23.107277-157.101038-65.081251-86.620823-86.620823-86.620823-227.581252 0-314.215378 41.960671-41.973974 97.771791-65.081251 157.101038-65.081251 59.355853 0 115.140367 23.12058 157.101037 65.081251 41.960671 41.973974 65.081251 97.771791 65.081251 157.11434s-23.12058 115.140367-65.081251 157.101038-97.745185 65.081251-157.101037 65.081251z m0-360.620268c-36.97103 0-71.733765 14.409175-97.881285 40.543392-53.957913 53.984518-53.957913 141.804656 0 195.775872 26.14752 26.14752 60.910255 40.543392 97.881285 40.543391s71.733765-14.395872 97.881284-40.543391c26.14752-26.14752 40.543392-60.910255 40.543392-97.881285s-14.395872-71.733765-40.543392-97.894587c-26.146497-26.14752-60.909232-40.543392-97.881284-40.543392z" fill="#75B9EB" p-id="1906"></path><path d="M551.602973 511.016603c-10.715039 0-21.430078-4.090155-29.609365-12.269442-16.358573-16.358573-16.358573-42.874483 0-59.219753L672.577209 288.943808h-42.833551c-23.12058 0-41.878806-18.744923-41.878806-41.878806s18.758226-41.878806 41.878806-41.878806h143.958716c16.931624 0 32.200376 10.210549 38.689161 25.847691 6.488785 15.650445 2.889817 33.67189-9.078773 45.641503L581.212338 498.747161c-8.179286 8.179286-18.894326 12.269441-29.609365 12.269442z" fill="#75B9EB" p-id="1907"></path><path d="M773.703397 288.943808h-143.958716c-23.12058 0-41.878806-18.744923-41.878806-41.878806s18.758226-41.878806 41.878806-41.878806h143.958716c23.12058 0 41.878806 18.744923 41.878806 41.878806s-18.758226 41.878806-41.878806 41.878806z" fill="#75B9EB" p-id="1908"></path><path d="M779.864724 439.050548c-23.12058 0-41.878806-18.744923-41.878806-41.878806V253.226329c0-23.133883 18.758226-41.878806 41.878806-41.878807s41.878806 18.744923 41.878806 41.878807v143.945413c0 23.133883-18.758226 41.878806-41.878806 41.878806z" fill="#75B9EB" p-id="1909"></path><path d="M779.864724 439.050548c-23.12058 0-41.878806-18.744923-41.878806-41.878806V253.226329c0-23.133883 18.758226-41.878806 41.878806-41.878807s41.878806 18.744923 41.878806 41.878807v143.945413c0 23.133883-18.758226 41.878806-41.878806 41.878806z" fill="#75B9EB" p-id="1910"></path></svg>';
												html += '      	 </div>';
											}else{
												html += '      	 <div style="position:absolute;top:0px;right:4px;">';
												html += '		 	<svg t="1585018755465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1715" width="24" height="24"></path><path d="M510.87948 578.902736c-123.673717 0-224.282113-100.607372-224.282113-224.282113s100.607372-224.282113 224.282113-224.282113 224.282113 100.607372 224.282112 224.282113-100.608396 224.282113-224.282112 224.282113z m0-364.80559c-77.486792 0-140.523477 63.036685-140.523477 140.523477s63.036685 140.523477 140.523477 140.523477 140.523477-63.036685 140.523477-140.523477-63.036685-140.523477-140.523477-140.523477z" fill="#FF3EC9" p-id="1717"></path><path d="M510.87948 896.635217c-23.12058 0-41.878806-18.744923-41.878806-41.878806V537.02393c0-23.133883 18.758226-41.878806 41.878806-41.878806s41.878806 18.744923 41.878806 41.878806v317.732481c0 23.133883-18.758226 41.878806-41.878806 41.878806z" fill="#FF3EC9" p-id="1718"></path><path d="M669.752884 737.762837H352.033705c-23.12058 0-41.878806-18.744923-41.878806-41.878806s18.758226-41.878806 41.878806-41.878807h317.719179c23.12058 0 41.878806 18.744923 41.878806 41.878807s-18.758226 41.878806-41.878806 41.878806z" fill="#FF3EC9" p-id="1719"></path></svg>';
												html += '      	 </div>';
											}
										// }
											
									}
								}

							})
						}
						html += '      </div>';
						html += '      <div class="flex"><div class="shopAssetMsgBox">' + n.name + '</div></div>';
						html += '    </div>';
						html += '</div>';


					// }
					//  else {
					// 	html += '<div class="c-asset" style="margin:0 3px 3px 0;" id="myItemId_' + n.id + '">';
					// 	html += '  <div style="width: 100%;" data-analytics-id="list_marketInventory">';
					// 	html += '    <div>';
					// 	html += '      <div class="c-asset__inner" style="margin-right:5px;">';
					// 	html += '        <div class="c-asset__header">';
					// 	html += '          <div class="c-asset__headerLeft">';
					// 	html += '            <div class="c-asset__headerLeftPrice">';
					// 	html += '              <div viewtype="market" _nghost-c23="">';
					// 	html += '                <strong class="c-asset__price c-asset__price--market">';
					// 	html += '                  <span class="c-asset__priceNumber">';
					// 	html += '                    <div>';
					// 	// html += '                      <span class="o-currencies--USD"></span>';
					// 	// html += '                      <span>5.94</span>';
					// 	html += '                    </div>';
					// 	html += '                  </span>';
					// 	html += '                </strong>';
					// 	html += '              </div>';
					// 	html += '            </div>';
					// 	html += '          </div>';
					// 	// html += '          <div class="c-asset__headerRight">';
					// 	// html += '            <div>';
					// 	// html += '              <button class="c-asset__action c-asset__action--info">';
					// 	// if(n.treasure){
					// 	//       html += '                  <img src="images/treasure.png" alt="" style="width:28px;">';
					// 	// }else{
					// 	//       // html += '                  <img src="images/i.png" alt="" style="border-radius:50%;">';
					// 	// }
					// 	// // html += '                <svg t="1566454102362" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18164" width="20" height="20"><path d="M512 0C229.23264 0 0 229.23264 0 512c0 282.76736 229.23264 512 512 512s512-229.23264 512-512C1024 229.23264 794.76736 0 512 0zM467.59936 186.20416c2.79552-6.25664 6.53312-11.73504 11.20256-16.40448 4.6592-4.6592 10.19904-8.3968 16.59904-11.20256s13.19936-4.1984 20.39808-4.1984c6.93248 0 13.52704 1.40288 19.80416 4.1984 6.25664 2.79552 11.73504 6.54336 16.40448 11.20256 4.6592 4.66944 8.3968 10.1376 11.20256 16.40448 2.79552 6.26688 4.1984 12.87168 4.1984 19.80416 0 7.19872-1.40288 13.99808-4.1984 20.39808s-6.54336 12.07296-11.20256 16.9984c-4.66944 4.93568-10.1376 8.79616-16.40448 11.60192-6.26688 2.79552-12.87168 4.1984-19.80416 4.1984-7.19872 0-13.99808-1.40288-20.39808-4.1984s-11.93984-6.656-16.59904-11.60192c-4.66944-4.92544-8.3968-10.5984-11.20256-16.9984s-4.1984-13.19936-4.1984-20.39808C463.40096 199.0656 464.80384 192.47104 467.59936 186.20416zM615.00416 767.20128 418.2016 767.20128l0-68.80256 59.19744 0L477.39904 421.60128l-59.99616 0 0-68.80256 135.19872 0 0 345.6 62.40256 0L615.00416 767.20128z" p-id="18165" fill="#35373a"></path></svg>';
					// 	// html += '              </button>';
					// 	// html += '            </div>';
					// 	// html += '          </div>';
					// 	html += '        </div>';
					// 	html += '        <div class="c-asset__figure" onclick="saleMsgShow(' + n.id + ',\'' + n.imageUrl + '\')">';
					// 	// html += '          <div style="color: rgb(136, 71, 255);">';
					// 	// html += '          <div class="u-game--dota2" style="color: rgb(136, 71, 255);">';


					// 	if (n.marketCategory == 3) {
					// 		html += '          <div class="u-game--dota2" style="color: rgba(0, 0, 0,0);">';
					// 		// html += '            <img class="c-asset__img" loading="auto" alt="Golden Seekling" src="' + n.imageUrl + '" style="height:124px;max-height:124px;">';
					// 	} else {
					// 		html += '          <div style="color: rgba(0, 0, 0,0);">';

					// 	}
					// 	html += '            <img class="c-asset__img" loading="auto" alt="Golden Seekling" src="' + n.imageUrl + '">';
					// 	html += '          </div>';
					// 	html += '        </div>';
					// 	html += '        <div class="c-asset__footer">';
					// 	html += '          <div class="c-asset__footerInner">';
					// 	html += '            <div class="c-asset__footerLeft">';
					// 	html += '              <div>';
					// 	html += '                <div class="o-assetBadge o-assetBadge--discount">';
					// 	if (n.itemCount > 1) {
					// 		html += '                  <font style="vertical-align: inherit;">' + n.name + '  x ' + n.itemCount + '</font>';
					// 	} else {
					// 		html += '                  <font style="vertical-align: inherit;">' + n.name + '</font>';
					// 	}
					// 	html += '                </div>';
					// 	html += '              </div>';
					// 	html += '            </div>';
					// 	html += '          </div>';
					// 	html += '        </div>';
					// 	html += '      </div>';
					// 	html += '    </div>';
					// 	html += '  </div>';
					// 	html += '</div>';
					// }

				})
				if (page == 0) {
					$("#myItem").html(html);
				} else {
					$("#myItem").append(html);
				}
				// $("#myItem").append(html);

			} else {
				alert(data.message);
			}
		},
		error: function(data) {
			$("#myItemLoadingShow").hide();
			if (data.status == 401) {
				alert(data.message);
			}
		}
	});
}



function getMySaleItem(page) {
	$("#myItemLoadingShow").show();
	// var url = '/api/xpet/getMySaleItem.do';
	var url = '/api/getSaleAssets.do';
	$.ajax({
		type: 'get',
		url: url,
		data: {
			page: page,
			size: 10,
			categoryId: myGameType
			// category:myGameType
		},
		headers: {
			'Authorization': "BASIC " + getCookie("token")
		},
		dataType: 'json',
		success: function(data) {
			$("#myItemLoadingShow").hide();
			if (data.code == 200) {
				var obj = data.object.content;
				var html = '';

				if (!data.object) {
					$("#myItemMsg p").html('您的仓库中没有对应的物品 ');
					$("#myItem").html(html);
					$("#myItemMsg").show();
					return
				}

				if (obj == '' || obj == undefined) {

					// showMsg("没有更多的商品了");
					Do_not_trigger2 = false;
					if (page == 0) {
						$("#myItemMsg p").html('您的仓库中没有对应的物品 ');
						$("#myItem").html(html);
						$("#myItemMsg").show();
					}
					return
				}
				Do_not_trigger2 = true;
				if (obj == '') {
					$("#myItemMsg p").html('您的仓库中没有对应的物品 ');
					$("#myItemMsg").show();
					$("#myItem").html(html);
					return
				} else {
					$("#myItemMsg").hide();
				}
				$.each(obj, function(i, n) {

					// if (n.assetCode == "PET") {
						var msg = JSON.parse(n.meta);
						var imgClass = '';
                  		if(n.category == "SKIN"){
                  			imgClass = 'skin';
                  		}
						console.log("msg:", msg);
						html += '<div class="c-asset item" style="" id="unsaleItemId_' + n.id + '" onclick="unsaleMsgShow(' + n.id + ',\'' + n.imageUrl + '\',' + n.nftContractId + ')">';
						html += '    <div style="background: #2a2c2e;border-radius: 2px;width:100%;height:100%;">';
						html += '      <div class="flex" style="line-height: 39px;padding:0 10px;">';

						if (msg) {

							$.each(msg, function(x, y) {
								if (y.category == "SUMMARY") {


                                    switch(n.category){
                                          case "ITEM":
                                          case "SKIN":
												html += '        <div style="flex:1">';
												html += '          <span style="color:#89d295;font-weight: bolder;">等级:</span>';
												html += '          ' + getRareType(y.values.RARE) + '';
												html += '        </div>';
                                                break;
                                          case "TAILSMAN":
												html += '        <div style="flex:1">';
												html += '          <span style="color:#89d295;font-weight: bolder;">等级:</span>';
												html += '          ' + getRareType(y.values.RARE) + '';
												html += '        </div>';
												html += '        <div>';
												html += '          <span style="color:#89d295;font-weight: bolder;">LV.</span>';
												html += '          <span>' + y.values.LEVEL + '</span>';
												html += '        </div>';
                                                break;
                                          default:
                                                if(n.game == "IOST"){
													html += '        <div style="flex:1">';
													html += '          <span style="color:#89d295;font-weight: bolder;">类型:</span>';
													html += '          <span>' + n.category + '</span>';
													html += '        </div>';
                                                }else{
	                                                var score =  y.values.SCORE || '未知参数';
	                                                var level =  y.values.LEVEL || '未知参数';
													html += '        <div style="flex:1">';
													html += '          <span style="color:#89d295;font-weight: bolder;">评分:</span>';
													html += '          <span>' + score + '</span>';
													html += '        </div>';
													html += '        <div>';
													html += '          <span style="color:#89d295;font-weight: bolder;">LV.</span>';
													html += '          <span>' + level + '</span>';
													html += '        </div>';
                                                }

                                    }

									// if(n.category == "SKIN"){
									// 	html += '        <div style="flex:1">';
									// 	html += '          <span style="color:#89d295;font-weight: bolder;">等级:</span>';
									// 	html += '          ' + getRareType(y.values.RARE) + '';
									// 	html += '        </div>';
									// }else{
									// 	html += '        <div style="flex:1">';
									// 	html += '          <span style="color:#89d295;font-weight: bolder;">评分:</span>';
									// 	html += '          <span>' + y.values.SCORE + '</span>';
									// 	html += '        </div>';
									// 	html += '        <div>';
									// 	html += '          <span style="color:#89d295;font-weight: bolder;">LV.</span>';
									// 	html += '          <span>' + y.values.LEVEL + '</span>';
									// 	html += '        </div>';
									// }
								}

							})
						}

						html += '      </div>';
						html += '      <div class="flex" style="height: 39px;">';
						html += '        <div style="margin-right:7px;">';
						if(n.assetType == "EOSNFT"){
							html += '          <svg t="1566445356488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2277" width="28" height="28">';
							html += '            <path d="M942.427421 234.839536a17.254917 17.254917 0 1 0-28.988261 18.715833 475.626037 475.626037 0 0 1 76.013661 258.559181c0 263.229511-214.145024 477.386038-477.386038 477.386038s-477.386038-214.156527-477.386038-477.386038 214.145024-477.386038 477.386038-477.386039a475.683553 475.683553 0 0 1 166.659492 29.908523 17.254917 17.254917 0 0 0 12.055436-32.335714 511.964892 511.964892 0 1 0 251.64571 202.538216z" fill="#89d295" p-id="2278"></path>';
							html += '            <path d="M796.059711 128.365195a482.807533 482.807533 0 0 1 34.969965 28.562639 17.254917 17.254917 0 1 0 23.064073-25.663813c-11.963409-10.755565-24.571002-21.050999-37.47768-30.621726a17.256067 17.256067 0 1 0-20.556358 27.7229zM385.496215 534.22385L261.088263 751.647308l242.144003 144.12457-117.736051-361.548028zM257.614273 707.187138l117.402456-205.172466-42.32056-129.964036-75.081896 335.136502zM621.370931 503.65964l-108.671467-191.736638-110.385456 192.898469 110.523495 339.381212 108.533428-340.543043zM689.332298 373.074428l-40.721605 127.755406 116.447684 205.460049-75.726079-333.215455zM638.223233 533.407117L522.868361 895.35776l239.072628-143.664439L638.223233 533.407117zM673.423264 340.336099L525.514115 130.263235v153.361703l106.232773 187.457419 41.676376-130.746258zM500.413963 282.865722V129.29696L348.708732 340.175053l43.125789 132.448743 108.579442-189.758074z" fill="#89d295" p-id="2279"></path>';
							html += '          </svg>';

						}else if(n.assetType == "IOSTNFT"){

							html += '			<svg t="1584015159513" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1857" width="28" height="28">';
							html += '				<path d="M512.7 1022.5c-68.8 0-135.6-13.5-198.5-40.1-60.7-25.7-115.3-62.5-162.1-109.3C105.2 826.3 68.4 771.7 42.7 711c-26.6-62.9-40-129.7-40-198.5 0-68.8 13.5-135.6 40.1-198.5 25.7-60.7 62.5-115.3 109.3-162.1s101.3-83.7 162-109.4c62.9-26.6 129.7-40 198.6-40S648.3 16 711.2 42.6c60.7 25.7 115.3 62.5 162.1 109.3S956.9 253.3 982.6 314c26.6 62.9 40.1 129.7 40.1 198.5 0 68.8-13.5 135.6-40.1 198.5-25.7 60.7-62.5 115.3-109.3 162.1s-101.4 83.6-162.1 109.3c-62.9 26.6-129.7 40.1-198.5 40.1z m0-980c-259.2 0-470 210.8-470 470s210.8 470 470 470 470-210.8 470-470-210.9-470-470-470z" fill="#89d295" p-id="1858"></path>';
							html += '				<path d="M520.2 193.3l286.5 165-61.5 48-225-132-160.4 100.5 88.5 59 52.7-30.9 62.7 34.9-43.5 36 54 37.4 45-28.4 58.5 28.8-45 31.1 198 105-304.5 183-332.9-186v-85.5L512 746.7l177.7-99.9-106.5-65.1-43.5 30-65.9-40.5 38.2-24-62.4-40-32.5 24.8-70.8-41.2 34.5-21.5-169.5-91.5z" fill="#89d295" p-id="1859"></path>';
							html += '			</svg>';

						}else{
							html += '￥ ';
						}


						html += '        </div>';
						html += '        <span>' + n.salePrice + '</span>';
						html += '    </div>';
						html += '      <div style="color: rgba(0, 0, 0,0);text-align: center;position: relative;overflow: hidden;">';
						html += '        <img class="c-asset__img '+ imgClass +'" style="height: 95px;max-height: 95px;" loading="auto" alt="Golden Seekling" src="' + n.imageUrl + '">';
						
						if(n.lock == true){
							html += '      	 <div style="position:absolute;bottom:25px;right:10px;">';
							html += '		 	<svg width="15" height="20" viewBox="0 0 9 12" xmlns="http://www.w3.org/2000/svg"><path d="M8.747 4.5h-.75V3.498A3.503 3.503 0 0 0 4.5 0 3.503 3.503 0 0 0 1 3.499v1H.25A.251.251 0 0 0 0 4.75V11C0 11.55.448 12 1 12h7c.55 0 1-.448 1-1V4.75a.255.255 0 0 0-.253-.25zm-3.5 5.22a.25.25 0 0 1-.064.194.246.246 0 0 1-.185.085h-1a.246.246 0 0 1-.186-.085.258.258 0 0 1-.063-.194l.157-1.418a.99.99 0 0 1-.41-.803 1.002 1.002 0 0 1 2.001 0 .983.983 0 0 1-.41.803l.16 1.418zm1.25-5.22H2.5V3.498a2 2 0 0 1 1.999-2c1.101 0 1.999.898 1.999 2v1z" fill="#848484"></path></svg>';
							html += '      	 </div>';
						}
						if (msg) {

							$.each(msg, function(x, y) {
								if(n.category == "PET"){
									if (y.category == "SUMMARY") {
										var gen = y.values.GENERATION;
										var string = '';
										// if(gen >= 2 && gen < 99 ){
										// 	html += '      	 <div style="position:absolute;bottom:42px;right:10px;">';
										// 	html += '		 	<svg width="15" height="20" viewBox="0 0 9 12" xmlns="http://www.w3.org/2000/svg"><path d="M8.747 4.5h-.75V3.498A3.503 3.503 0 0 0 4.5 0 3.503 3.503 0 0 0 1 3.499v1H.25A.251.251 0 0 0 0 4.75V11C0 11.55.448 12 1 12h7c.55 0 1-.448 1-1V4.75a.255.255 0 0 0-.253-.25zm-3.5 5.22a.25.25 0 0 1-.064.194.246.246 0 0 1-.185.085h-1a.246.246 0 0 1-.186-.085.258.258 0 0 1-.063-.194l.157-1.418a.99.99 0 0 1-.41-.803 1.002 1.002 0 0 1 2.001 0 .983.983 0 0 1-.41.803l.16 1.418zm1.25-5.22H2.5V3.498a2 2 0 0 1 1.999-2c1.101 0 1.999.898 1.999 2v1z" fill="#848484"></path></svg>';
										// 	html += '      	 </div>';
										// }
										if(gen == 99){
											string = 'X <span style="color:#89d295;font-weight: bolder;">代</span>';
										}else if(gen == 35){
											string = '<span style="color:#89d295;font-weight: bolder;">联名款</span>';
										}else{
											string = gen + '<span style="color:#89d295;font-weight: bolder;">代</span>';
										}
										html += '      	 <div style="color:#fff;position:absolute;bottom:5px;right:10px;">';
										html += '		 	<span>'+ string +'</span>';
										html += '      	 </div>';
									}
									if (y.category == "PROPERTY") {
										var LUCK = y.values.LUCK;
										var SEX = y.values.SEX;
										var VARIATION = y.values.VARIATION;
										if(VARIATION == "EVOLUTION"){
											html += '     <div style="position:absolute;bottom:55px;right:10px;color:#f29ded;font-weight: bolder;">变异</div>';
										}
										if(LUCK == "LUCKPET"){
											html += '		 <img style="position:absolute;bottom:13px;left:10px;z-index:1;" alt="" src="images/luck.png">';
										}
										if(SEX == "BOY"){
											html += '      	 <div style="position:absolute;top:0;right:4px;">';
											html += '		 	<svg t="1585018899207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1904" width="24" height="24"><path d="M424.111301 818.825061c-59.328223 0-115.140367-23.107277-157.101038-65.081251-86.620823-86.620823-86.620823-227.581252 0-314.215378 41.960671-41.973974 97.771791-65.081251 157.101038-65.081251 59.355853 0 115.140367 23.12058 157.101037 65.081251 41.960671 41.973974 65.081251 97.771791 65.081251 157.11434s-23.12058 115.140367-65.081251 157.101038-97.745185 65.081251-157.101037 65.081251z m0-360.620268c-36.97103 0-71.733765 14.409175-97.881285 40.543392-53.957913 53.984518-53.957913 141.804656 0 195.775872 26.14752 26.14752 60.910255 40.543392 97.881285 40.543391s71.733765-14.395872 97.881284-40.543391c26.14752-26.14752 40.543392-60.910255 40.543392-97.881285s-14.395872-71.733765-40.543392-97.894587c-26.146497-26.14752-60.909232-40.543392-97.881284-40.543392z" fill="#75B9EB" p-id="1906"></path><path d="M551.602973 511.016603c-10.715039 0-21.430078-4.090155-29.609365-12.269442-16.358573-16.358573-16.358573-42.874483 0-59.219753L672.577209 288.943808h-42.833551c-23.12058 0-41.878806-18.744923-41.878806-41.878806s18.758226-41.878806 41.878806-41.878806h143.958716c16.931624 0 32.200376 10.210549 38.689161 25.847691 6.488785 15.650445 2.889817 33.67189-9.078773 45.641503L581.212338 498.747161c-8.179286 8.179286-18.894326 12.269441-29.609365 12.269442z" fill="#75B9EB" p-id="1907"></path><path d="M773.703397 288.943808h-143.958716c-23.12058 0-41.878806-18.744923-41.878806-41.878806s18.758226-41.878806 41.878806-41.878806h143.958716c23.12058 0 41.878806 18.744923 41.878806 41.878806s-18.758226 41.878806-41.878806 41.878806z" fill="#75B9EB" p-id="1908"></path><path d="M779.864724 439.050548c-23.12058 0-41.878806-18.744923-41.878806-41.878806V253.226329c0-23.133883 18.758226-41.878806 41.878806-41.878807s41.878806 18.744923 41.878806 41.878807v143.945413c0 23.133883-18.758226 41.878806-41.878806 41.878806z" fill="#75B9EB" p-id="1909"></path><path d="M779.864724 439.050548c-23.12058 0-41.878806-18.744923-41.878806-41.878806V253.226329c0-23.133883 18.758226-41.878806 41.878806-41.878807s41.878806 18.744923 41.878806 41.878807v143.945413c0 23.133883-18.758226 41.878806-41.878806 41.878806z" fill="#75B9EB" p-id="1910"></path></svg>';
											html += '      	 </div>';
										}else{
											html += '      	 <div style="position:absolute;top:0px;right:4px;">';
											html += '		 	<svg t="1585018755465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1715" width="24" height="24"></path><path d="M510.87948 578.902736c-123.673717 0-224.282113-100.607372-224.282113-224.282113s100.607372-224.282113 224.282113-224.282113 224.282113 100.607372 224.282112 224.282113-100.608396 224.282113-224.282112 224.282113z m0-364.80559c-77.486792 0-140.523477 63.036685-140.523477 140.523477s63.036685 140.523477 140.523477 140.523477 140.523477-63.036685 140.523477-140.523477-63.036685-140.523477-140.523477-140.523477z" fill="#FF3EC9" p-id="1717"></path><path d="M510.87948 896.635217c-23.12058 0-41.878806-18.744923-41.878806-41.878806V537.02393c0-23.133883 18.758226-41.878806 41.878806-41.878806s41.878806 18.744923 41.878806 41.878806v317.732481c0 23.133883-18.758226 41.878806-41.878806 41.878806z" fill="#FF3EC9" p-id="1718"></path><path d="M669.752884 737.762837H352.033705c-23.12058 0-41.878806-18.744923-41.878806-41.878806s18.758226-41.878806 41.878806-41.878807h317.719179c23.12058 0 41.878806 18.744923 41.878806 41.878807s-18.758226 41.878806-41.878806 41.878806z" fill="#FF3EC9" p-id="1719"></path></svg>';
											html += '      	 </div>';
										}
									}

								}
							})
						}
						html += '      </div>';
						html += '      <div class="flex"><div class="shopAssetMsgBox">' + n.name + '</div></div>';
						html += '    </div>';
						html += '</div>';


					// } else {
					// 	html += '<div class="c-asset" style="margin:0 3px 3px 0;" id="unsaleItemId_' + n.id + '">';
					// 	html += '  <div style="width: 100%;" data-analytics-id="list_marketInventory">';
					// 	html += '    <div>';
					// 	html += '      <div class="c-asset__inner" style="margin-right:5px;">';
					// 	html += '        <div class="c-asset__header">';
					// 	// if (n.assetType == "EOSNFT") {
					// 		html += '          <div class="c-asset__headerLeft" style="max-width:100%;">';
					// 	// } else {
					// 	// 	html += '          <div class="c-asset__headerLeft">';

					// 	// }


					// 	html += '            <div class="c-asset__headerLeftPrice">';
					// 	html += '              <div viewtype="market" _nghost-c23="">';
					// 	html += '                <strong class="c-asset__price c-asset__price--market">';
					// 	html += '                  <span class="c-asset__priceNumber">';
					// 	html += '                    <div>';
					// 	// if (n.assetType == "EOSNFT") {
					// 		html += '                      <span>' + n.salePrice + '</span>';
					// 	// } else {
					// 	// 	html += '                      <span class="o-currencies--USD"></span>';
					// 	// 	html += '                      <span>' + n.price + '</span>';

					// 	// }

					// 	html += '                    </div>';
					// 	html += '                  </span>';
					// 	html += '                </strong>';
					// 	html += '              </div>';
					// 	html += '            </div>';
					// 	html += '          </div>';
					// 	// html += '          <div class="c-asset__headerRight">';
					// 	// html += '            <div>';
					// 	// html += '              <button class="c-asset__action c-asset__action--info">';
					// 	// if(n.treasure){
					// 	//       html += '                  <img src="images/treasure.png" alt="" style="width:28px;">';
					// 	// }else{
					// 	//       // html += '                  <img src="images/i.png" alt="" style="border-radius:50%;">';
					// 	// }
					// 	// // html += '                <svg t="1566454102362" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18164" width="20" height="20"><path d="M512 0C229.23264 0 0 229.23264 0 512c0 282.76736 229.23264 512 512 512s512-229.23264 512-512C1024 229.23264 794.76736 0 512 0zM467.59936 186.20416c2.79552-6.25664 6.53312-11.73504 11.20256-16.40448 4.6592-4.6592 10.19904-8.3968 16.59904-11.20256s13.19936-4.1984 20.39808-4.1984c6.93248 0 13.52704 1.40288 19.80416 4.1984 6.25664 2.79552 11.73504 6.54336 16.40448 11.20256 4.6592 4.66944 8.3968 10.1376 11.20256 16.40448 2.79552 6.26688 4.1984 12.87168 4.1984 19.80416 0 7.19872-1.40288 13.99808-4.1984 20.39808s-6.54336 12.07296-11.20256 16.9984c-4.66944 4.93568-10.1376 8.79616-16.40448 11.60192-6.26688 2.79552-12.87168 4.1984-19.80416 4.1984-7.19872 0-13.99808-1.40288-20.39808-4.1984s-11.93984-6.656-16.59904-11.60192c-4.66944-4.92544-8.3968-10.5984-11.20256-16.9984s-4.1984-13.19936-4.1984-20.39808C463.40096 199.0656 464.80384 192.47104 467.59936 186.20416zM615.00416 767.20128 418.2016 767.20128l0-68.80256 59.19744 0L477.39904 421.60128l-59.99616 0 0-68.80256 135.19872 0 0 345.6 62.40256 0L615.00416 767.20128z" p-id="18165" fill="#35373a"></path></svg>';
					// 	// html += '              </button>';
					// 	// html += '            </div>';
					// 	// html += '          </div>';
					// 	html += '        </div>';
					// 	html += '        <div class="c-asset__figure" onclick="unsaleMsgShow(' + n.id + ',\'' + n.imageUrl + '\')">';
					// 	// html += '          <div style="color: rgb(136, 71, 255);">';
					// 	// html += '          <div class="u-game--dota2" style="color: rgb(136, 71, 255);">';

					// 	if (n.marketCategory == 3) {
					// 		html += '          <div class="u-game--dota2" style="color: rgba(0, 0, 0,0);">';
					// 		// html += '            <img class="c-asset__img" loading="auto" alt="Golden Seekling" src="' + n.imageUrl + '" style="height:124px;max-height:124px;">';
					// 	} else {
					// 		html += '          <div style="color: rgba(0, 0, 0,0);">';
					// 	}
					// 	html += '            <img class="c-asset__img" loading="auto" alt="Golden Seekling" src="' + n.imageUrl + '">';
					// 	html += '          </div>';
					// 	html += '        </div>';
					// 	html += '        <div class="c-asset__footer">';
					// 	html += '          <div class="c-asset__footerInner">';
					// 	html += '            <div class="c-asset__footerLeft">';
					// 	html += '              <div>';
					// 	html += '                <div class="o-assetBadge o-assetBadge--discount">';
					// 	if (n.itemCount > 1) {
					// 		html += '                  <font style="vertical-align: inherit;">' + n.name + '  x ' + n.itemCount + '</font>';
					// 	} else {
					// 		html += '                  <font style="vertical-align: inherit;">' + n.name + '</font>';
					// 	}
					// 	html += '                </div>';
					// 	html += '              </div>';
					// 	html += '            </div>';
					// 	html += '          </div>';
					// 	html += '        </div>';
					// 	html += '      </div>';
					// 	html += '    </div>';
					// 	html += '  </div>';
					// 	html += '</div>';

					// }
				})
				if (page == 0) {
					$("#myItem").html(html);
				} else {
					$("#myItem").append(html);
				}
			} else {
				alert(data.message);
			}
		},
		error: function(data) {
			$("#myItemLoadingShow").hide();
			if (data.status == 401) {
				alert(data.message);
			}
		}
	});
}

function priceTypeSelect(self) {
	console.log($(self));
	$("#priceTagShow").html($(self).find('.selectTag').html());
	// $('.game-banners').hide();

}

function genTypeSelect(self) {
	console.log($(self));
	$("#genTagShow").html($(self).find('.selectTag').html());
	// $('.game-banners').hide();

}

function sexTypeSelect(self) {
	console.log($(self));
	$("#sexTagShow").html($(self).find('.selectTag').html());
	// $('.game-banners').hide();

}


function getRareType(name) {
  switch (name) {
    case "LEGEND":
      return '<span style="color:#f90">传说</span>';
      break;
    case "EPIC":
      return '<span style="color:#c86dff">史诗</span>';
      break;
    case "RARE":
      return '<span style="color:#38f">精良</span>';
      break;
    case "UNCOMMON":
      return '<span style="color:#67c863">稀有</span>';
      break;
    case "COMMON":
      return '<span style="color:#333">普通</span>';
      break;
    case "RUBISHU":
      return '<span style="color:#999">垃圾</span>';
      break;
  }
}

function getAttrType(name) {
  switch (name) {
    case "A":
      return '敏捷';
      break;
    case "S":
      return '力量';
      break;
    case "I":
      return '智力';
      break;
    case "V":
      return '耐力';
      break;
    case "AP":
      return '物理伤害';
      break;
    case "MAP":
      return '法术伤害';
      break;
    case "DEF":
      return '物理防御';
      break;
    case "MDEF":
      return '法术防御';
      break;
    case "HIT":
      return '命中';
      break;
    case "DODGE":
      return '闪避';
      break;
    case "CRI":
      return '物理爆击';
      break;
    case "MCRI":
      return '法术爆击';
      break;
    case "LUCK":
      return '幸运';
      break;
    case "SPEED":
      return '速度';
      break;
    case "MHIT":
      return '法术穿透';
      break;
    case "MDODGE":
      return '法术回避';
      break;
  }
}


function lootBuyShow() {
	buyLootSymbol = "EOS";
	var html = '';
	html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
	html += ' <div class="cdk-global-overlay-wrapper" style="justify-content: center; align-items: center;">';
	html += '   <div class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
	html += '     <div class="cdk-visually-hidden cdk-focus-trap-anchor"></div>';
	html += '     <div class="mat-dialog-container" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
	html += '         <div class="c-auth c-auth--dialog" style="padding-bottom: 0;">';
	html += '           <div class="c-auth__inner ">';
	html += '             <div class="c-authHeader c-authHeader--shadow ">';
	html += '               <h3 class="c-authHeader__title">众筹</h3>';
	html += '               <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
	html += '               data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
	html += '                 <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
	html += '               </button>';
	html += '             </div>';
	html += '             <div class="c-auth__content" style="padding-bottom:50px;">';
	html += '               <div class="c-authForm ">';

	// html += '               <p class="c-authInfo__text" style="color:#848484">钱包余额：<span style="color:#fff">' + $("#lootMoney").html() + '</span></p>';

	html += '                   <p class="c-authInfo__text" id="noPayMsg" style="border: 1px solid #e86359;padding: 15px;color: #e86359;">* 您正在参与LootGlobal众筹，请充分评估项目风险</p>';
	html += '                   <div>';

		html += '               <div style="flex: 1;margin-bottom: 20px;">';
		html += '                     <span class="orderTypeBtn active" data-type="EOS">EOS</span>';
		html += '                     <span class="orderTypeBtn" data-type="USDT">USDT</span>';
		html += '               </div>';

		// html += '               <p class="c-authInfo__text" style="color:#848484">目前绑定：<span style="color:#fff" id="bindAccountMsgShow"></span></p>';

	html += '                 <div class="ng-pristine ng-invalid ng-touched">';





	html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
	html += '                     <div class="mat-form-field-wrapper">';
	html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
	html += '                         <input type="number" id="buyLootNum" placeholder="众筹数量" style="background: none;border:0;height:100%;flex:1;font-size:20px;">';
	html += '                         <span class="buyLootSymbol">'+ buyLootSymbol +'</span>';
	html += '                       </div>';
	html += '                       <div class="mat-form-field-subscript-wrapper">';
	html += '                         <div id="rechargeMsg" style="font-size: 18px;line-height: 50px;"';
	html += '                         style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
	html += '                         </div>';
	html += '                       </div>';
	html += '                     </div>';
	html += '                   </div>';



	// else{
	html += '                     <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit" onclick="lootBuyShowGo()">';
	html += '                       <span>确定</span>';
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

function lootBuyShowGo(){

  checkScatter(function(name) {
	if ($("#buyLootNum").val() == '') {
		showMsg("请输入你要众筹的数量");
		return
	}
    var authorization;
    var contract = 'eosio.token';
    if(buyLootSymbol == "USDT"){
    	contract = 'tethertether';
    }
    var toUser = 'lootcrowfund';
    const account = name;
    const eos = loot.scatter.eos(network, Eos);
    var authorization = [{
		actor: account,
		permission: "active"
	}]
	var price = Number($("#buyLootNum").val()).toFixed(4) + " " + buyLootSymbol;

    eos.transaction({
      actions: [{
        account: contract,
        name: 'transfer',
        authorization: authorization,
        data: {
          from: account,
          to: toUser,
          quantity: price,
          memo: ''
        }
      }]
    }).then(res => {
      alert("您已成功参与LootGlobal众筹，loot通证将在众筹结束后7个工作日转至您的认购账户，如有疑问，请咨询官方客服。");
      $('.cdk-overlay-container').hide();
      
    }).catch(e => {
      $("#showLoading").hide();
      console.log("error:", e);
      eosErrorShow(e);
    });
  })
}
