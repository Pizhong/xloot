var imgUrl, shopPrice, itemId, phone, KYC, nftContractId;
var payOver = true;
var paymentType = 'PAYPAL';
var rechargeType = 'pay_wxpay';
var itemMsg = {};
var orderMsg = {};
var USDRMBRate = 0;
var myGameType = 1;
var gameType = 1;
var marketCategory = {};
var activitySaleData = {};
var activityId = '61PINGANCHARM';
var nftSaletype = 0;
var dexListType = 'priceHigh';
var dexListData = {};
var dexPage = 0;
var dexSize = 6;
var objMsg={}
var salePrice=0
$(function() {
      // if (location.hostname == "www.xloot_dex.io") {
            $("#footerMsg").html("掠宝（" + location.origin + "）游戏资产交易平台 版权所有 ©2019-2020");
      // } else {
      //       $("#footerMsg").html("深圳市萌布玩数码科技有限公司版权所有 ©2019-2020 ");
      // }
      if(location.href.indexOf("xloot.io") == -1){
            $(".goldLink").show();
      }
      var nftcontract = getCookie("nftcontract") || nftContractName
      console.log('nftcontract',nftcontract);
      $("#mat-select-0 #nftcontractMore").html(nftcontract);
})
function init() {
     
      var html = '';
      html += '<div>';
      html += '      <div class="c-navigationAuth">';
      html += '            <div class="c-navigationAuth__authBtn c-navigationAuth__authBtn--signUp" translate="" data-analytics-id="signUp_authTabButtonSignUp" onclick="panelShow(4)" style="display:none;" id="my-wallet">' + get_lan("myWallet") + '</div>';
      html += '            <div class="c-navigationAuth__authBtn c-navigationAuth__authBtn--logIn" translate="" data-analytics-id="logIn_authTabButtonLogIn" onclick="eosLogin()"  id="my-login">'+ get_lan("login") +'</div>';
      html += '      </div>';
      html += '</div>';
      $("#panelMsg").html(html);
      $("#phonePanelMsg").html(html);
      loginPanel();
      if(!getCookie('account')){
        $('#panelMsg #my-login').show()
        $('#phonePanelMsg #my-login').show()
        $('#panelMsg #my-wallet').hide()
        $('#phonePanelMsg #my-wallet').hide()
        $('#intPanel').show()
      }
      else{
        $('#panelMsg #my-login').hide()
        $('#phonePanelMsg #my-login').hide()
        $('#panelMsg #my-wallet').show()
        $('#phonePanelMsg #my-wallet').show()
        $('#intPanel').hide()
      }

      getDexListData()
      getContractsList();

}

function loginPanel() {
      var html2 = '';
      html2 += '<div class="c-auth__inner">';
      html2 += '    <div class="c-auth__header">';
      html2 += '      <div class="c-authHeader">';
      html2 += '        <div class="c-authHeader__tabs mat-radio-group ng-untouched ng-pristine ng-valid"';
      html2 += '        role="radiogroup">';
      html2 += '          <div class="c-authHeader__tab mat-radio-button mat-accent mat-radio-checked"';
      html2 += '          data-analytics-id="logIn_authTabButtonLogIn" tabindex="-1" id="mat-radio-3" onclick="panelShow(0)">';
      html2 += '            <label class="mat-radio-label" for="mat-radio-3-input">';
      html2 += '              <div class="mat-radio-container">';
      html2 += '                <div class="mat-radio-outer-circle"></div>';
      html2 += '                <div class="mat-radio-inner-circle"></div>';
      html2 += '                <div class="mat-radio-ripple mat-ripple" mat-ripple="">';
      html2 += '                  <div class="mat-ripple-element mat-radio-persistent-ripple"></div>';
      html2 += '                </div>';
      html2 += '                <input class="mat-radio-input cdk-visually-hidden" type="radio" id="mat-radio-3-input"';
      html2 += '                tabindex="0" name="mat-radio-group-0">';
      html2 += '              </div>';
      html2 += '              <div class="mat-radio-label-content">';
      html2 += '                <span style="display:none">&nbsp;</span>';
      html2 += '                <mat-icon class="c-authHeader__tabIcon mat-icon notranslate material-icons mat-icon-no-color"';
      html2 += '                role="img" aria-hidden="true">';
      html2 += '                  <!-- account_circle -->';
      html2 += '                </mat-icon>';
      html2 += '                <span translate="">';
      html2 += '                  <font style="vertical-align: inherit;">';
      html2 += '                    <font style="vertical-align: inherit;">' + get_lan("login") + '</font>';
      html2 += '                  </font>';
      html2 += '                </span>';
      html2 += '              </div>';
      html2 += '            </label>';
      html2 += '          </div>';
      // html2 += '          <div class="c-authHeader__tab mat-radio-button mat-accent"';
      // html2 += '          data-analytics-id="signUp_authTabButtonSignUp" tabindex="-1" id="mat-radio-2"onclick="panelShow(1)">';
      // html2 += '            <label class="mat-radio-label" for="mat-radio-2-input">';
      // html2 += '              <div class="mat-radio-container">';
      // html2 += '                <div class="mat-radio-outer-circle"></div>';
      // html2 += '                <div class="mat-radio-inner-circle"></div>';
      // html2 += '                <div class="mat-radio-ripple mat-ripple" mat-ripple="">';
      // html2 += '                  <div class="mat-ripple-element mat-radio-persistent-ripple"></div>';
      // html2 += '                </div>';
      // html2 += '                <input class="mat-radio-input cdk-visually-hidden" type="radio" id="mat-radio-2-input"';
      // html2 += '                tabindex="0" name="mat-radio-group-0">';
      // html2 += '              </div>';
      // html2 += '              <div class="mat-radio-label-content">';
      // html2 += '                <span style="display:none">&nbsp;</span>';
      // html2 += '                <mat-icon class="c-authHeader__tabIcon mat-icon notranslate material-icons mat-icon-no-color"';
      // html2 += '                role="img" aria-hidden="true">';
      // html2 += '                  <!-- account_box -->';
      // html2 += '                </mat-icon>';
      // html2 += '                <span translate="">';
      // html2 += '                  <font style="vertical-align: inherit;">';
      // html2 += '                    <font style="vertical-align: inherit;">' + get_lan("signUp") + '</font>';
      // html2 += '                  </font>';
      // html2 += '                </span>';
      // html2 += '              </div>';
      // html2 += '            </label>';
      // html2 += '          </div>';
      html2 += '        </div>';
      html2 += '      </div>';
      html2 += '    </div>';
      html2 += '    <div class="c-auth__content">';
      html2 += '      <div>';
      html2 += '        <div class="c-authInfo">';
      html2 += '          <p class="c-authInfo__text" translate="">';
      html2 += '            <font style="vertical-align: inherit;">';
      html2 += '              <font style="vertical-align: inherit;">';
      html2 += '                ' + get_lan("msg") + '';
      html2 += '              </font>';
      html2 += '            </font>';
      html2 += '          </p>';
      html2 += '          <ul class="c-authInfo__list">';
      html2 += '            <li class="c-authInfo__item">';
      html2 += '              <span class="c-authInfo__icon">';
      html2 += '                <i class="o-icon o-icon-buy" inlinesvg="icon-buy.svg">';
      html2 += '                  <svg width="18" height="17" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">';
      html2 += '                    <path d="M5.893 14.72c-1.048 0-1.905.828-1.905 1.84s.857 1.84 1.905 1.84c1.049 0 1.906-.828 1.906-1.84s-.857-1.84-1.906-1.84zM.176 0v1.84h1.906l3.43 6.992-1.334 2.208c-.095.276-.19.644-.19.92 0 1.012.857 1.84 1.905 1.84H17.33v-1.84H6.275c-.096 0-.191-.092-.191-.184v-.092l.858-1.564h7.051c.763 0 1.335-.368 1.62-.92l3.431-5.98c.19-.184.19-.276.19-.46 0-.552-.38-.92-.952-.92H4.178L3.32 0H.176zm15.247 14.72c-1.048 0-1.906.828-1.906 1.84s.858 1.84 1.906 1.84 1.906-.828 1.906-1.84-.858-1.84-1.906-1.84z">';
      html2 += '                    </path>';
      html2 += '                  </svg>';
      html2 += '                </i>';
      html2 += '              </span>';
      html2 += '              <span translate="">';
      html2 += '                <font style="vertical-align: inherit;">';
      html2 += '                  <font style="vertical-align: inherit;">' + get_lan("buy") + '</font>';
      html2 += '                </font>';
      html2 += '              </span>';
      html2 += '            </li>';
      html2 += '            <li class="c-authInfo__item">';
      html2 += '              <span class="c-authInfo__icon">';
      html2 += '                <i class="o-icon o-icon-instant" inlinesvg="icon-instant.svg">';
      html2 += '                  <svg width="9" height="15" viewBox="0 0 9 15" xmlns="http://www.w3.org/2000/svg">';
      html2 += '                    <path d="M5.031.533L.858 8.615h3.577v5.595l4.173-8.082H5.031V.533z">';
      html2 += '                    </path>';
      html2 += '                  </svg>';
      html2 += '                </i>';
      html2 += '              </span>';
      html2 += '              <span translate="">';
      html2 += '                <font style="vertical-align: inherit;">';
      html2 += '                  <font style="vertical-align: inherit;">' + get_lan("sell") + '</font>';
      html2 += '                </font>';
      html2 += '              </span>';
      html2 += '            </li>';
      // html2 +='            <li class="c-authInfo__item">';
      // html2 +='              <span class="c-authInfo__icon">';
      // html2 +='                <i class="o-icon o-icon-exchange" inlinesvg="icon-exchange.svg">';
      // html2 +='                  <svg width="14" height="24" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg">';
      // html2 +='                    <path d="M8.353 12l-.995 1.057 3.939 4.193H2v1.5h9.296l-3.938 4.192L8.353 24 14 18l-5.647-6zM5.647 0l.995 1.058L2.704 5.25H12v1.5H2.704l3.938 4.193L5.647 12 0 6l5.647-6z">';
      // html2 +='                    </path>';
      // html2 +='                  </svg>';
      // html2 +='                </i>';
      // html2 +='              </span>';
      // html2 +='              <span translate="">';
      // html2 +='                <font style="vertical-align: inherit;">';
      // html2 +='                  <font style="vertical-align: inherit;">'+ get_lan("exchange") +'</font>';
      // html2 +='                </font>';
      // html2 +='              </span>';
      // html2 +='            </li>';
      html2 += '          </ul>';
      html2 += '          <p class="c-authInfo__text" translate="">';
      html2 += '            <font style="vertical-align: inherit;">';
      html2 += '              <font style="vertical-align: inherit;">' + get_lan("msg2") + '</font>';
      html2 += '            </font>';
      html2 += '          </p>';
      html2 += '        </div>';
      html2 += '      </div>';
      html2 += '      <div>';



      html2 += '<div class="c-authFooter">';
      html2 += '      <button class="o-dmButton o-dmButton--blue mat-ripple flex" style="flex:1;" onclick="eosLogin()">';
      html2 += '            <i class="o-dmButton__icon o-icon o-icon-steam" style="height:28px;">';
      html2 += '         <svg t="1566445356488" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2277" width="32" height="32"><path d="M942.427421 234.839536a17.254917 17.254917 0 1 0-28.988261 18.715833 475.626037 475.626037 0 0 1 76.013661 258.559181c0 263.229511-214.145024 477.386038-477.386038 477.386038s-477.386038-214.156527-477.386038-477.386038 214.145024-477.386038 477.386038-477.386039a475.683553 475.683553 0 0 1 166.659492 29.908523 17.254917 17.254917 0 0 0 12.055436-32.335714 511.964892 511.964892 0 1 0 251.64571 202.538216z" fill="#ffffff" p-id="2278"></path><path d="M796.059711 128.365195a482.807533 482.807533 0 0 1 34.969965 28.562639 17.254917 17.254917 0 1 0 23.064073-25.663813c-11.963409-10.755565-24.571002-21.050999-37.47768-30.621726a17.256067 17.256067 0 1 0-20.556358 27.7229zM385.496215 534.22385L261.088263 751.647308l242.144003 144.12457-117.736051-361.548028zM257.614273 707.187138l117.402456-205.172466-42.32056-129.964036-75.081896 335.136502zM621.370931 503.65964l-108.671467-191.736638-110.385456 192.898469 110.523495 339.381212 108.533428-340.543043zM689.332298 373.074428l-40.721605 127.755406 116.447684 205.460049-75.726079-333.215455zM638.223233 533.407117L522.868361 895.35776l239.072628-143.664439L638.223233 533.407117zM673.423264 340.336099L525.514115 130.263235v153.361703l106.232773 187.457419 41.676376-130.746258zM500.413963 282.865722V129.29696L348.708732 340.175053l43.125789 132.448743 108.579442-189.758074z" fill="#ffffff" p-id="2279"></path></svg>';

      html2 += '            </i>';
      html2 += '            <span class="o-dmButton__text">' + get_lan("login3") + '</span>';
      html2 += '      </button>';
      // html2 += '      <span class="c-authFooter__or" style="margin:0 10px;">' + get_lan("msg3") + '</span>';



      // html2 += '      <button class="c-authFooter__button o-dmButton o-dmButton--round o-dmButton--blue mat-ripple" onclick="eosLogin()">';
      // html2 += '         <svg t="1566445356488" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2277" width="32" height="32"><path d="M942.427421 234.839536a17.254917 17.254917 0 1 0-28.988261 18.715833 475.626037 475.626037 0 0 1 76.013661 258.559181c0 263.229511-214.145024 477.386038-477.386038 477.386038s-477.386038-214.156527-477.386038-477.386038 214.145024-477.386038 477.386038-477.386039a475.683553 475.683553 0 0 1 166.659492 29.908523 17.254917 17.254917 0 0 0 12.055436-32.335714 511.964892 511.964892 0 1 0 251.64571 202.538216z" fill="#ffffff" p-id="2278"></path><path d="M796.059711 128.365195a482.807533 482.807533 0 0 1 34.969965 28.562639 17.254917 17.254917 0 1 0 23.064073-25.663813c-11.963409-10.755565-24.571002-21.050999-37.47768-30.621726a17.256067 17.256067 0 1 0-20.556358 27.7229zM385.496215 534.22385L261.088263 751.647308l242.144003 144.12457-117.736051-361.548028zM257.614273 707.187138l117.402456-205.172466-42.32056-129.964036-75.081896 335.136502zM621.370931 503.65964l-108.671467-191.736638-110.385456 192.898469 110.523495 339.381212 108.533428-340.543043zM689.332298 373.074428l-40.721605 127.755406 116.447684 205.460049-75.726079-333.215455zM638.223233 533.407117L522.868361 895.35776l239.072628-143.664439L638.223233 533.407117zM673.423264 340.336099L525.514115 130.263235v153.361703l106.232773 187.457419 41.676376-130.746258zM500.413963 282.865722V129.29696L348.708732 340.175053l43.125789 132.448743 108.579442-189.758074z" fill="#ffffff" p-id="2279"></path></svg>';
      // html2 += '      </button>';


      // html2 += ' <button class="c-authFooter__button o-dmButton o-dmButton--round o-dmButton--blue mat-ripple" onclick="iostLoginShow()">';
      // html2 += '    <svg t="1583745735750" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1871" width="32" height="32"><path d="M512.7 1022.5c-68.8 0-135.6-13.5-198.5-40.1-60.7-25.7-115.3-62.5-162.1-109.3C105.2 826.3 68.4 771.7 42.7 711c-26.6-62.9-40-129.7-40-198.5 0-68.8 13.5-135.6 40.1-198.5 25.7-60.7 62.5-115.3 109.3-162.1s101.3-83.7 162-109.4c62.9-26.6 129.7-40 198.6-40S648.3 16 711.2 42.6c60.7 25.7 115.3 62.5 162.1 109.3S956.9 253.3 982.6 314c26.6 62.9 40.1 129.7 40.1 198.5 0 68.8-13.5 135.6-40.1 198.5-25.7 60.7-62.5 115.3-109.3 162.1s-101.4 83.6-162.1 109.3c-62.9 26.6-129.7 40.1-198.5 40.1z m0-980c-259.2 0-470 210.8-470 470s210.8 470 470 470 470-210.8 470-470-210.9-470-470-470z" fill="#ffffff" p-id="1872"></path><path d="M520.2 193.3l286.5 165-61.5 48-225-132-160.4 100.5 88.5 59 52.7-30.9 62.7 34.9-43.5 36 54 37.4 45-28.4 58.5 28.8-45 31.1 198 105-304.5 183-332.9-186v-85.5L512 746.7l177.7-99.9-106.5-65.1-43.5 30-65.9-40.5 38.2-24-62.4-40-32.5 24.8-70.8-41.2 34.5-21.5-169.5-91.5z" fill="#ffffff" p-id="1873"></path></svg>';
      // html2 += ' </button>';

      // html2 +='        <div class="c-authFooter">';
      // html2 +='          <div class="c-authFooter__button c-authFooter__button--fluid">';
      // html2 +='            <a class="o-dmButton mat-ripple o-dmButton--blue" matripple="" rel="nofollow noopener"';
      // html2 +='            data-analytics-id="logIn_actionVendorSteam" href="javascript:;" onclick="panelShow(0)">';
      // html2 +='              <i class="o-dmButton__icon o-icon o-icon-steam">';
      // html2 +='                <svg t="1566290510060" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6676" width="128" height="128"><path d="M735.9 128l0.1 0.1v767.8l-0.1 0.1H288.1l-0.1-0.1V128.1l0.1-0.1h447.8m0.1-64H288c-35.2 0-64 28.8-64 64v768c0 35.2 28.8 64 64 64h448c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z" p-id="6677" fill="#ffffff"></path><path d="M800 704H224v64h576v-64zM576 800H448c-17.6 0-32 14.4-32 32s14.4 32 32 32h128c17.6 0 32-14.4 32-32s-14.4-32-32-32z" p-id="6678" fill="#ffffff"></path></svg>';
      // html2 +='              </i>';
      // html2 +='              <span class="o-dmButton__text">';
      // html2 +='                <font style="vertical-align: inherit;">';
      // html2 +='                  <font style="vertical-align: inherit;">使用'+ get_lan("login2") +'</font>';
      // html2 +='                </font>';
      // html2 +='              </span>';
      // html2 +='            </a>';
      // html2 +='          </div>';
      // html2 +='          <span class="c-authFooter__or" translate="">';
      // html2 +='            <font style="vertical-align: inherit;">';
      // html2 +='              <font style="vertical-align: inherit;">或者</font>';
      // html2 +='            </font>';
      // html2 +='          </span>';
      // html2 +='          <button class="c-authFooter__button o-dmButton o-dmButton--round o-dmButton--blue mat-ripple"';
      // html2 +='          matripple="" data-analytics-id="logIn_actionVendorEmail">EOS</button>';
      // html2 +='        </div>';

      html2 += '      </div>';
      html2 += '    </div>';
      html2 += '  </div>';
      $("#intPanel").html(html2).show();
}


function panelShow(type) {
      $('#panelShow').html(getHtml(type));

      setTimeout(function() {
            $('.cdk-overlay-container').show();
      }, 100)

}

function buyMsgShow(obj) {
      objMsg=obj
      // console.log(objMsg,'///////');
      panelShow("buy");
      // var url = '/api/getItem.do';
      // $.ajax({
      //       type: 'get',
      //       url: url,
      //       data:{
      //             itemId:id
      //       },
      //       headers: {
      //             'Authorization': "BASIC " + getCookie("token")
      //       },
      //       dataType: 'json',
      //       success: function(data) {
      //             if (data.code == 200) {
      //                   var obj = data.object;
      //                   if (obj) {
      //                         itemMsg = obj;
      //                         panelShow("buy");
      //                   }

      //             } else {
      //                   alert(data.message);
      //             }
      //       },
      //       error: function(data) {
      //             if (data.status == 401) {
      //                   alert(data.message);
      //             }
      //       }
      // });


}

function getItem(type) {
      // var url = '/api/getItem.do';

      var url = '';
      var selfData;
      var categoryId;
      if (type == "buy") {
            categoryId = gameType;
      } else {
            categoryId = myGameType;
      }
      // if (itemMsg.assetType == 'EOSNFT') {
      url = '/api/getLootAsset.do';
      selfData = {
            assetId: itemId,
            categoryId: categoryId,
            contractId: nftContractId
      };
      // } else {
      //       url = '/api/getXLootItemMarket.do';
      //       selfData = {
      //             itemId: itemId
      //       };
      // }

      $.ajax({
            type: 'get',
            url: url,
            data: selfData,
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object;
                        if (obj) {
                              itemMsg = obj;

                              if (itemMsg.category == 'PET') {

                                    var petMsg = JSON.parse(itemMsg.meta);
                                    $.each(petMsg, function(i, n) {
                                          if (n.category == "SUMMARY") {
                                                GENERATION = n.values.GENERATION;
                                          }
                                    })
                                    $("#petPayMsg").show();

                              }else{
                                    $("#petPayMsg").hide();
                              }

                              panelShow(type);

                              // if (itemMsg.assetType == 'EOSNFT') {
                              getlistXLootItemRecentSale(itemMsg.assetCode);
                              // }else{
                              //       getlistXLootItemRecentSale(itemMsg.itemCode);
                              // }

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


function getlistXLootItemRecentSale(itemCode) {
      var url = '/api/listXLootItemRecentSale.do';

      $.ajax({
            type: 'get',
            url: url,
            data: {
                  itemCode: itemCode
            },
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object;
                        var html = '';
                        html += '             <tr class="c-assetPreview__row--header">';
                        html += '               <td class="c-assetPreview__cell">';
                        html += '                 日期';
                        html += '               </td>';
                        html += '               <td class="c-assetPreview__cell">';
                        html += '                 成交价';
                        html += '               </td>';
                        html += '             </tr>';


                        if (obj && obj != '') {


                              $.each(obj, function(i, n) {


                                    html += '             <tr class="c-assetPreview__row">';
                                    html += '               <td class="c-assetPreview__cell">';
                                    html += '                 ' + new Date(n.createDate).Format('yyyy-MM-dd hh:mm') + '';
                                    html += '               </td>';
                                    html += '               <td class="c-assetPreview__cell">';
                                    html += '                 ' + n.price + ' ' + getCurrencyNameShow(n.currency) + '';
                                    html += '               </td>';
                                    html += '             </tr>';
                              })


                        } else {
                              html += '             <tr class="c-assetPreview__row">';
                              html += '               <td class="c-assetPreview__cell">';
                              html += '                 --';
                              html += '               </td>';
                              html += '               <td class="c-assetPreview__cell">';
                              html += '                 无';
                              html += '               </td>';
                              html += '             </tr>';
                        }
                        $("#saleLastList").html(html);

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


function saleMsgShow(obj) {
      // imgUrl = imgs;
      // itemId = id;
      // nftContractId = contractId;
      objMsg=obj
      console.log(obj);
      panelShow("sale");
      // panelShow("sale");
}


function unsaleMsgShow(obj,price) {
      objMsg=obj
      salePrice=price
      panelShow("unsale");
}


function getMyShop() {
      var obj = [1, 2, 3, 5, 6];
      var html = '';
      $.each(obj, function(i, n) {
            html += '<div class="c-asset" style="margin:0 3px 3px 0;">';
            html += '  <div style="width: 100%;" data-analytics-id="list_marketInventory">';
            html += '    <div>';
            html += '      <div class="c-asset__inner c-asset__inner--sm">';
            html += '        <div class="c-asset__header">';
            html += '          <div class="c-asset__headerLeft">';
            html += '            <div class="c-asset__headerLeftPrice">';
            html += '              <div viewtype="market" _nghost-c23="">';
            html += '                <strong class="c-asset__price c-asset__price--market">';
            html += '                  <span class="c-asset__priceNumber">';
            html += '                    <div>';
            html += '                      <span class="o-currencies--USD"></span>';
            html += '                      <span>5.94</span>';
            html += '                    </div>';
            html += '                  </span>';
            html += '                </strong>';
            html += '              </div>';
            html += '            </div>';
            html += '          </div>';
            // html += '          <div class="c-asset__headerRight">';
            // html += '            <div>';
            // html += '              <button class="c-asset__action c-asset__action--info">';
            //                   if(n.treasure){
            //                         html += '                  <img src="images/treasure.png" alt="" style="width:28px;">';
            //                   }else{
            //                         // html += '                  <img src="images/i.png" alt="">';
            //                   }
            // // html += '                <svg t="1566454102362" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18164" width="20" height="20"><path d="M512 0C229.23264 0 0 229.23264 0 512c0 282.76736 229.23264 512 512 512s512-229.23264 512-512C1024 229.23264 794.76736 0 512 0zM467.59936 186.20416c2.79552-6.25664 6.53312-11.73504 11.20256-16.40448 4.6592-4.6592 10.19904-8.3968 16.59904-11.20256s13.19936-4.1984 20.39808-4.1984c6.93248 0 13.52704 1.40288 19.80416 4.1984 6.25664 2.79552 11.73504 6.54336 16.40448 11.20256 4.6592 4.66944 8.3968 10.1376 11.20256 16.40448 2.79552 6.26688 4.1984 12.87168 4.1984 19.80416 0 7.19872-1.40288 13.99808-4.1984 20.39808s-6.54336 12.07296-11.20256 16.9984c-4.66944 4.93568-10.1376 8.79616-16.40448 11.60192-6.26688 2.79552-12.87168 4.1984-19.80416 4.1984-7.19872 0-13.99808-1.40288-20.39808-4.1984s-11.93984-6.656-16.59904-11.60192c-4.66944-4.92544-8.3968-10.5984-11.20256-16.9984s-4.1984-13.19936-4.1984-20.39808C463.40096 199.0656 464.80384 192.47104 467.59936 186.20416zM615.00416 767.20128 418.2016 767.20128l0-68.80256 59.19744 0L477.39904 421.60128l-59.99616 0 0-68.80256 135.19872 0 0 345.6 62.40256 0L615.00416 767.20128z" p-id="18165" fill="#35373a"></path></svg>';
            // html += '              </button>';
            // html += '            </div>';
            // html += '          </div>';
            html += '        </div>';
            html += '        <div class="c-asset__figure">';
            // html += '          <div class="u-game--dota2" style="color: rgb(136, 71, 255);">';
            html += '          <div class="" style="color: rgb(136, 71, 255);">';
            html += '            <img _ngcontent-c21="" class="c-asset__img" loading="auto" alt="Golden Seekling" src="images/gameImgs.png">';
            html += '          </div>';
            html += '        </div>';
            html += '        <div class="c-asset__footer">';
            html += '          <div class="c-asset__footerInner">';
            html += '            <div class="c-asset__footerLeft">';
            html += '              <div>';
            html += '                <div class="o-assetBadge o-assetBadge--discount">';
            html += '                  <font style="vertical-align: inherit;">' + n.name + '</font>';
            html += '                </div>';
            html += '              </div>';
            html += '            </div>';
            html += '          </div>';
            html += '        </div>';
            html += '      </div>';
            html += '    </div>';
            html += '  </div>';
            html += '</div>';
      })
      $("#getMyShop").html(html);
}

function getHtml(type) {
      // type
      // 0 login 1 sign up 2 
      var html = '';
      switch (type) {
            case 0:
            case "0":

                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '      <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '        <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '          <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer"';
                  html += '          tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '            <div>';
                  html += '              <div class="c-auth c-auth--dialog">';



                  html += '<div class="c-auth__inner">';
                  html += '  <div class="c-authHeader c-authHeader--shadow">';
                  html += '    <h3 class="c-authHeader__title">';
                  html += '      <span>' + get_lan("login2") + '</span>';
                  html += '    </h3>';
                  html += '    <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '    data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '      <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '    </button>';
                  html += '  </div>';



                  html += '  <div class="c-auth__content" style="padding-bottom: 0;">';
                  html += '    <div class="c-authForm">';
                  html += '      <div novalidate="" class="ng-pristine ng-invalid ng-touched">';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-24 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label ng-pristine ng-invalid mat-form-field-invalid ng-touched mat-form-field-hide-placeholder">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '              <input type="text" id="user_no" placeholder="' + get_lan("phone") + '" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="11">';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-24">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="ng-tns-c11-24 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <mat-error class="mat-error" role="alert" id="mat-error-4"></mat-error>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-25 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '              <input type="password" id="user_password" placeholder="' + get_lan("loginPW") + '" style="background: none;border:0;height:100%;width:100%;font-size:20px;" minlength="8" maxlength="8">';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-25">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="mat-form-field-hint-wrapper ng-tns-c11-25 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <div class="mat-form-field-hint-spacer"></div>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';



                  // html += '        <div class="c-authForm__additional">';
                  // html += '          <div class="c-authForm__checkbox mat-checkbox mat-accent ng-untouched ng-pristine ng-valid"';
                  // html += '          formcontrolname="rememberMe" id="mat-checkbox-9">';
                  // html += '            <label class="mat-checkbox-layout" for="mat-checkbox-9-input">';

                  // // html += '             <div class="mat-checkbox-inner-container">';
                  // // html += '                <input class="mat-checkbox-input cdk-visually-hidden" type="checkbox"';
                  // // html += '                id="mat-checkbox-9-input" tabindex="0" aria-checked="false">';
                  // // html += '                <div class="mat-checkbox-ripple mat-ripple" matripple="">';
                  // // html += '                  <div class="mat-ripple-element mat-checkbox-persistent-ripple">';
                  // // html += '                  </div>';
                  // // html += '                </div>';
                  // // html += '                <div class="mat-checkbox-frame"></div>';
                  // // html += '                <div class="mat-checkbox-background">';
                  // // html += '                  <svg xml:space="preserve" class="mat-checkbox-checkmark" focusable="false"';
                  // // html += '                  version="1.1" viewBox="0 0 24 24"><path class="mat-checkbox-checkmark-path" d="M4.1,12.7 9,17.6 20.3,6.3"';
                  // // html += '                    fill="none" stroke="white"></path></svg>';
                  // // html += '                  <div class="mat-checkbox-mixedmark"></div>';
                  // // html += '                </div>';
                  // // html += '              </div>';
                  // // html += '              <span class="mat-checkbox-label">';
                  // // html += '                <span style="display:none">&nbsp;</span>';
                  // // html += '                <span>Keep me logged in</span>';
                  // // html += '              </span>';

                  // html += '            </label>';
                  // html += '          </div>';
                  // html += '          <button class="c-authForm__additionalLink" translate="" type="button"';
                  // html += '          data-analytics-id="logIn_forgetPassword">忘记密码?</button>';
                  // html += '        </div>';



                  html += '<div>';
                  html += '  <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple"';
                  html += '  matripple="" type="submit" data-analytics-id="logIn_logInWithEmail" onclick="login()">';
                  html += '    <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566290510060" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6676" width="128" height="128">';
                  html += '      <path d="M735.9 128l0.1 0.1v767.8l-0.1 0.1H288.1l-0.1-0.1V128.1l0.1-0.1h447.8m0.1-64H288c-35.2 0-64 28.8-64 64v768c0 35.2 28.8 64 64 64h448c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z"';
                  html += '      p-id="6677" fill="#ffffff"></path>';
                  html += '      <path d="M800 704H224v64h576v-64zM576 800H448c-17.6 0-32 14.4-32 32s14.4 32 32 32h128c17.6 0 32-14.4 32-32s-14.4-32-32-32z"';
                  html += '      p-id="6678" fill="#ffffff"></path>';
                  html += '    </svg>';
                  html += '    &nbsp;';
                  html += '    <span>' + get_lan("login2") + '</span>';
                  html += '  </button>';
                  html += '</div>';

                  html += '<div onclick="panelShow(\'forget\')" style="line-height:52px;text-align:center;cursor: pointer;">';
                  html += '  <div>忘记密码？</div>';
                  html += '</div>';

                  html += '<div style="margin-top:0px;padding-top:0px;">';
                  html += '  <div style="text-align: center;color:#757575;line-height:56px;">' + get_lan("msg4") + '</div>';
                  html += '  <div class="flex">';
                  html += '    <div onclick="eosLogin()" style="cursor: pointer;margin:0 8px;">';
                  html += '      <svg t="1566445356488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2277" width="48" height="48"><path d="M942.427421 234.839536a17.254917 17.254917 0 1 0-28.988261 18.715833 475.626037 475.626037 0 0 1 76.013661 258.559181c0 263.229511-214.145024 477.386038-477.386038 477.386038s-477.386038-214.156527-477.386038-477.386038 214.145024-477.386038 477.386038-477.386039a475.683553 475.683553 0 0 1 166.659492 29.908523 17.254917 17.254917 0 0 0 12.055436-32.335714 511.964892 511.964892 0 1 0 251.64571 202.538216z" fill="#4daef8" p-id="2278"></path><path d="M796.059711 128.365195a482.807533 482.807533 0 0 1 34.969965 28.562639 17.254917 17.254917 0 1 0 23.064073-25.663813c-11.963409-10.755565-24.571002-21.050999-37.47768-30.621726a17.256067 17.256067 0 1 0-20.556358 27.7229zM385.496215 534.22385L261.088263 751.647308l242.144003 144.12457-117.736051-361.548028zM257.614273 707.187138l117.402456-205.172466-42.32056-129.964036-75.081896 335.136502zM621.370931 503.65964l-108.671467-191.736638-110.385456 192.898469 110.523495 339.381212 108.533428-340.543043zM689.332298 373.074428l-40.721605 127.755406 116.447684 205.460049-75.726079-333.215455zM638.223233 533.407117L522.868361 895.35776l239.072628-143.664439L638.223233 533.407117zM673.423264 340.336099L525.514115 130.263235v153.361703l106.232773 187.457419 41.676376-130.746258zM500.413963 282.865722V129.29696L348.708732 340.175053l43.125789 132.448743 108.579442-189.758074z" fill="#4daef8" p-id="2279"></path></svg>';
                  html += '    </div>';
                  html += '    <div onclick="iostLoginShow()" style="cursor: pointer;margin:0 8px;">';
                  html += '      <svg t="1583745735750" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1871" width="48" height="48"><path d="M512.7 1022.5c-68.8 0-135.6-13.5-198.5-40.1-60.7-25.7-115.3-62.5-162.1-109.3C105.2 826.3 68.4 771.7 42.7 711c-26.6-62.9-40-129.7-40-198.5 0-68.8 13.5-135.6 40.1-198.5 25.7-60.7 62.5-115.3 109.3-162.1s101.3-83.7 162-109.4c62.9-26.6 129.7-40 198.6-40S648.3 16 711.2 42.6c60.7 25.7 115.3 62.5 162.1 109.3S956.9 253.3 982.6 314c26.6 62.9 40.1 129.7 40.1 198.5 0 68.8-13.5 135.6-40.1 198.5-25.7 60.7-62.5 115.3-109.3 162.1s-101.4 83.6-162.1 109.3c-62.9 26.6-129.7 40.1-198.5 40.1z m0-980c-259.2 0-470 210.8-470 470s210.8 470 470 470 470-210.8 470-470-210.9-470-470-470z" fill="#4daef8" p-id="1872"></path><path d="M520.2 193.3l286.5 165-61.5 48-225-132-160.4 100.5 88.5 59 52.7-30.9 62.7 34.9-43.5 36 54 37.4 45-28.4 58.5 28.8-45 31.1 198 105-304.5 183-332.9-186v-85.5L512 746.7l177.7-99.9-106.5-65.1-43.5 30-65.9-40.5 38.2-24-62.4-40-32.5 24.8-70.8-41.2 34.5-21.5-169.5-91.5z" fill="#4daef8" p-id="1873"></path></svg>';
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';



                  // html += '        <div class="c-authFooter">';
                  // // html += '          <div data-analytics-id="logIn_backButton" onclick="panelShow(0)">';
                  // // html += '            <button class="c-authFooter__button c-authFooter__button--back o-dmButton mat-ripple"';
                  // // html += '            matripple="" type="button">';
                  // // html += '              <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566283291358" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1455" width="128" height="128"><path d="M959.296 455.808H276.928l320.64-313.152-78.656-77.568-452.928 446.656 453.824 446.976 77.184-76.864L277.12 564.096h682.176V455.808z" p-id="1456" fill="#ffffff"></path></svg>';
                  // // html += '            </button>';
                  // // html += '          </div>';
                  // html += '          <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple"';
                  // html += '          matripple="" type="submit" data-analytics-id="logIn_logInWithEmail" onclick="login()">';
                  // html += '            <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566290510060" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6676" width="128" height="128"><path d="M735.9 128l0.1 0.1v767.8l-0.1 0.1H288.1l-0.1-0.1V128.1l0.1-0.1h447.8m0.1-64H288c-35.2 0-64 28.8-64 64v768c0 35.2 28.8 64 64 64h448c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z" p-id="6677" fill="#ffffff"></path><path d="M800 704H224v64h576v-64zM576 800H448c-17.6 0-32 14.4-32 32s14.4 32 32 32h128c17.6 0 32-14.4 32-32s-14.4-32-32-32z" p-id="6678" fill="#ffffff"></path></svg>';
                  // html += '            &nbsp;<span>'+ get_lan("login2") +'</span>';
                  // html += '          </button>';
                  // html += '        </div>';



                  html += '      </div>';
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';



                  html += '</div></div></div></div></div>';
                  return html;
                  break;
            case 1:
            case "1":
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '      <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '        <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '          <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer"';
                  html += '          tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '            <div>';
                  html += '              <div class="c-auth c-auth--dialog">';



                  html += '<div class="c-auth__inner">';
                  html += '  <div class="c-authHeader c-authHeader--shadow">';
                  html += '    <h3 class="c-authHeader__title">';
                  html += '      <span>' + get_lan("signUp2") + '</span>';
                  html += '    </h3>';
                  html += '    <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '    data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '      <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '    </button>';
                  html += '  </div>';
                  html += '  <div class="c-auth__content">';
                  html += '    <div class="c-authForm">';
                  html += '      <div novalidate="" class="ng-pristine ng-invalid ng-touched">';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-24 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label ng-pristine ng-invalid mat-form-field-invalid ng-touched mat-form-field-hide-placeholder">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '              <input type="text" id="telNumber" placeholder="' + get_lan("phone") + '" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="11">';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-24">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="ng-tns-c11-24 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <mat-error class="mat-error" role="alert" id="mat-error-4"></mat-error>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-25 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '               <div class="flex">'
                  html += '                     <div class="mat-form-field-flex flex" style="padding-top: 0;padding-right:0;">';
                  html += '                       <input type="text" id="smscode" placeholder="' + get_lan("code") + '" style="background: none;border:0;height:100%;width:200px;font-size:20px;" maxlength="8">';
                  html += '                       <div style="width:20px;height:100%;background:#2a2c2e;"></div>';
                  html += '                       <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail" id="getCode" onclick="getCode()" style="min-width:92px;">&nbsp;<span>' + get_lan("getCode") + '</span></button>';
                  html += '                     </div>';
                  html += '               </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-25">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="mat-form-field-hint-wrapper ng-tns-c11-25 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <div class="mat-form-field-hint-spacer"></div>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-25 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '              <input type="password" id="nps" placeholder="' + get_lan("loginPW") + '" style="background: none;border:0;height:100%;width:100%;font-size:20px;" minlength="8" maxlength="8">';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-25">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="mat-form-field-hint-wrapper ng-tns-c11-25 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <div class="mat-form-field-hint-spacer"></div>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-25 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '              <input type="password" id="nps2" placeholder="' + get_lan("loginPWA") + '" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="8">';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-25">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="mat-form-field-hint-wrapper ng-tns-c11-25 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <div class="mat-form-field-hint-spacer"></div>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';
                  html += '        <div class="c-authFooter">';
                  // html += '          <div data-analytics-id="logIn_backButton" onclick="panelShow(1)">';
                  // html += '            <button class="c-authFooter__button c-authFooter__button--back o-dmButton mat-ripple"';
                  // html += '            matripple="" type="button">';
                  // html += '              <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566283291358" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1455" width="128" height="128"><path d="M959.296 455.808H276.928l320.64-313.152-78.656-77.568-452.928 446.656 453.824 446.976 77.184-76.864L277.12 564.096h682.176V455.808z" p-id="1456" fill="#ffffff"></path></svg>';
                  // html += '            </button>';
                  // html += '          </div>';
                  html += '          <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple"';
                  html += '          matripple="" type="submit" data-analytics-id="logIn_logInWithEmail" onclick="register(this)">';
                  html += '            <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566290510060" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6676" width="128" height="128"><path d="M735.9 128l0.1 0.1v767.8l-0.1 0.1H288.1l-0.1-0.1V128.1l0.1-0.1h447.8m0.1-64H288c-35.2 0-64 28.8-64 64v768c0 35.2 28.8 64 64 64h448c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z" p-id="6677" fill="#ffffff"></path><path d="M800 704H224v64h576v-64zM576 800H448c-17.6 0-32 14.4-32 32s14.4 32 32 32h128c17.6 0 32-14.4 32-32s-14.4-32-32-32z" p-id="6678" fill="#ffffff"></path></svg>';
                  html += '            &nbsp;<span>' + get_lan("signUp2") + '</span>';
                  html += '          </button>';
                  html += '        </div>';



                  html += '      </div>';
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';


                  html += '            <div onclick="panelShow(\'forget\')" style="line-height:52px;text-align:center;cursor: pointer;">';
                  html += '              <div>忘记密码？</div>';
                  html += '            </div>';

                  html += '<div class="loginType" style="padding-top:0px;">';
                  html += '  <div style="text-align: center;color:#757575;line-height:56px;">' + get_lan("msg4") + '</div>';
                  html += '  <div class="flex">';
                  html += '    <div onclick="eosLogin()" style="cursor: pointer;margin:0 8px;">';
                  html += '      <svg t="1566445356488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2277" width="48" height="48"><path d="M942.427421 234.839536a17.254917 17.254917 0 1 0-28.988261 18.715833 475.626037 475.626037 0 0 1 76.013661 258.559181c0 263.229511-214.145024 477.386038-477.386038 477.386038s-477.386038-214.156527-477.386038-477.386038 214.145024-477.386038 477.386038-477.386039a475.683553 475.683553 0 0 1 166.659492 29.908523 17.254917 17.254917 0 0 0 12.055436-32.335714 511.964892 511.964892 0 1 0 251.64571 202.538216z" fill="#4daef8" p-id="2278"></path><path d="M796.059711 128.365195a482.807533 482.807533 0 0 1 34.969965 28.562639 17.254917 17.254917 0 1 0 23.064073-25.663813c-11.963409-10.755565-24.571002-21.050999-37.47768-30.621726a17.256067 17.256067 0 1 0-20.556358 27.7229zM385.496215 534.22385L261.088263 751.647308l242.144003 144.12457-117.736051-361.548028zM257.614273 707.187138l117.402456-205.172466-42.32056-129.964036-75.081896 335.136502zM621.370931 503.65964l-108.671467-191.736638-110.385456 192.898469 110.523495 339.381212 108.533428-340.543043zM689.332298 373.074428l-40.721605 127.755406 116.447684 205.460049-75.726079-333.215455zM638.223233 533.407117L522.868361 895.35776l239.072628-143.664439L638.223233 533.407117zM673.423264 340.336099L525.514115 130.263235v153.361703l106.232773 187.457419 41.676376-130.746258zM500.413963 282.865722V129.29696L348.708732 340.175053l43.125789 132.448743 108.579442-189.758074z" fill="#4daef8" p-id="2279"></path></svg>';
                  html += '    </div>';
                  html += '    <div onclick="iostLoginShow()" style="cursor: pointer;margin:0 8px;">';
                  html += '      <svg t="1583745735750" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1871" width="48" height="48"><path d="M512.7 1022.5c-68.8 0-135.6-13.5-198.5-40.1-60.7-25.7-115.3-62.5-162.1-109.3C105.2 826.3 68.4 771.7 42.7 711c-26.6-62.9-40-129.7-40-198.5 0-68.8 13.5-135.6 40.1-198.5 25.7-60.7 62.5-115.3 109.3-162.1s101.3-83.7 162-109.4c62.9-26.6 129.7-40 198.6-40S648.3 16 711.2 42.6c60.7 25.7 115.3 62.5 162.1 109.3S956.9 253.3 982.6 314c26.6 62.9 40.1 129.7 40.1 198.5 0 68.8-13.5 135.6-40.1 198.5-25.7 60.7-62.5 115.3-109.3 162.1s-101.4 83.6-162.1 109.3c-62.9 26.6-129.7 40.1-198.5 40.1z m0-980c-259.2 0-470 210.8-470 470s210.8 470 470 470 470-210.8 470-470-210.9-470-470-470z" fill="#4daef8" p-id="1872"></path><path d="M520.2 193.3l286.5 165-61.5 48-225-132-160.4 100.5 88.5 59 52.7-30.9 62.7 34.9-43.5 36 54 37.4 45-28.4 58.5 28.8-45 31.1 198 105-304.5 183-332.9-186v-85.5L512 746.7l177.7-99.9-106.5-65.1-43.5 30-65.9-40.5 38.2-24-62.4-40-32.5 24.8-70.8-41.2 34.5-21.5-169.5-91.5z" fill="#4daef8" p-id="1873"></path></svg>';
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';

                  html += '</div></div></div></div></div>';
                  return html;
                  break;
            case 2:
            case "2":

                  html += '<div class="cdk-overlay-backdrop cdk-overlay-transparent-backdrop cdk-overlay-backdrop-showing" onclick="$(\'.cdk-overlay-container\').hide()"></div>';
                  html += '  <div class="cdk-overlay-connected-position-bounding-box" dir="ltr" style="top: 48px; right: 16px; height: 921px; width: 1425px; align-items: flex-end; justify-content: flex-start;">';
                  html += '    <div id="cdk-overlay-43" class="cdk-overlay-pane" style="pointer-events: auto; position: static;">';
                  html += '      <div class="mat-menu-panel ng-trigger ng-trigger-transformMenu ng-tns-c5-266 mat-menu-before mat-menu-below c-dropdown__list mat-elevation-z4" role="menu" tabindex="-1" style="transform-origin:right top;0:transform-origin;transform-origin:right top;webkit-transform-origin:right top;">';
                  html += '        <div class="mat-menu-content">';
                  html += '          <div>';



                  // html += '            <button class="c-dropdown__item mat-menu-item" onclick="panelShow(3)">';
                  // html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-language.svg">';
                  // html += '                <img src="images/lan.png" alt="" style="height:24px;">';
                  // html += '              </i>';
                  // html += '              ' + get_lan("language") + '';
                  // html += '              <div class="mat-menu-ripple mat-ripple" matripple=""></div>';
                  // html += '            </button>';



                  // html += '            <a class="c-dropdown__item mat-menu-item" href="assets/FAQ.pdf" mat-menu-item="" target="_blank">';
                  // html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-faq.svg">';
                  // html += '                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">';
                  // html += '                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11.5903 11.8514C11.3619 12.1977 11.2477 12.6356 11.2477 13.1653H13.4972C13.4972 12.8394 13.5816 12.5644 13.7505 12.3403C13.9193 12.106 14.1875 11.8208 14.5549 11.4847C14.8628 11.1995 15.1111 10.95 15.2998 10.7361C15.4984 10.512 15.6623 10.2421 15.7914 9.92639C15.9305 9.61065 16 9.24398 16 8.82639C16 7.94028 15.6524 7.24768 14.9572 6.74861C14.2719 6.24954 13.3582 6 12.216 6C11.2427 6 10.3985 6.17824 9.68343 6.53472C8.97827 6.8912 8.41713 7.39537 8 8.04722L9.80261 9.13195C10.0509 8.77546 10.3538 8.50046 10.7114 8.30694C11.0788 8.10324 11.496 8.00139 11.9628 8.00139C12.4494 8.00139 12.8367 8.11343 13.1248 8.3375C13.4227 8.55139 13.5717 8.84676 13.5717 9.22361C13.5717 9.48843 13.4922 9.72778 13.3333 9.94167C13.1844 10.1454 12.946 10.4 12.6182 10.7056C12.1713 11.1231 11.8287 11.5051 11.5903 11.8514ZM11.352 16.6028C11.63 16.8676 11.9727 17 12.3799 17C12.7871 17 13.1248 16.8676 13.3929 16.6028C13.671 16.3278 13.8101 15.9968 13.8101 15.6097C13.8101 15.2227 13.676 14.9019 13.4078 14.6472C13.1397 14.3824 12.797 14.25 12.3799 14.25C11.9628 14.25 11.6201 14.3824 11.352 14.6472C11.0838 14.9019 10.9497 15.2227 10.9497 15.6097C10.9497 15.9968 11.0838 16.3278 11.352 16.6028Z">';
                  // html += '                  </path>';
                  // html += '                </svg>';
                  // html += '              </i>';
                  // html += '              FAQ';
                  // html += '            </a>';
                  if (getCookie("token") || getCookie('account')) {
                        // html += '            <a class="c-dropdown__item mat-menu-item" onclick="getMyKYC()">';
                        // html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-logout.svg">';
                        // html += '                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">';
                        // html += '                     <path d="M12 1C5.92525 1 1 5.92525 1 12C1 18.0747 5.92525 23 12 23C18.0747 23 23 18.0747 23 12C23 5.92525 18.0747 1 12 1ZM12 6.5C14.0222 6.5 15.6667 8.1445 15.6667 10.1667V11.0833C16.1727 11.0833 16.5833 11.494 16.5833 12V15.6667C16.5833 16.1727 16.1727 16.5833 15.6667 16.5833H8.33333C7.82733 16.5833 7.41667 16.1727 7.41667 15.6667V12C7.41667 11.494 7.82733 11.0833 8.33333 11.0833V10.1667C8.33333 8.1445 9.97783 6.5 12 6.5ZM12 8.33333C10.9889 8.33333 10.1667 9.15558 10.1667 10.1667V11.0833H13.8333V10.1667C13.8333 9.15558 13.0111 8.33333 12 8.33333Z"></path>';
                        // html += '                </svg>';
                        // html += '              </i>';
                        // html += '              ' + get_lan("KYC") + '';
                        // html += '            </a>';


                        // html += '<a class="c-dropdown__item mat-menu-item" href="balance.html">';
                        // html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-terms-of-use.svg">';
                        // html += '                <img src="images/wallet.png" alt="" style="height:24px;">';
                        // html += '              </i>';
                        // html += '              钱包';
                        // html += '</a>';

                        // html += '<a class="c-dropdown__item mat-menu-item ng-star-inserted" href="user.html">';
                        // html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-terms-of-use.svg">';
                        // html += '                <img src="images/setUp.png" alt="" style="height:24px;">';
                        // html += '              </i>';
                        // html += '              设置';
                        // html += '</a>';

                        html += '            <div class="c-dropdown__item mat-menu-item" onclick="panelShow(\'Deposit\')">';
                        html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-terms-of-use.svg">';
                        html += '                <img src="images/wallet.png" alt="" style="height:24px;">';
                        html += '              </i>';
                        html += '              充值';
                        html += '            </div>';
                        html += '            <div class="c-dropdown__item mat-menu-item" onclick="panelShow(\'WithdrawCoin\')">';
                        html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-logout.svg">';
                        html += '                <img src="images/withdraw.png" alt="" style="height:24px;">';
                        html += '              </i>';
                        html += '              提现';
                        html += '            </div>';

                        html += '            <div class="c-dropdown__item mat-menu-item" onclick="getBankFlowLog(0)">';
                        html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-logout.svg">';
                        html += '                <img src="images/Detail.png" alt="" style="height:24px;">';
                        html += '              </i>';
                        html += '              银行流水';
                        html += '            </div>';
                        html += '            <div class="c-dropdown__item mat-menu-item" onclick="getItemExchangeLog(0)">';
                        html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-logout.svg">';
                        html += '                <img src="images/record.png" alt="" style="height:24px;">';
                        html += '              </i>';
                        html += '              ' + get_lan("transactionRecord") + '';
                        html += '            </div>';

                        // html += '            <div class="c-dropdown__item mat-menu-item" onclick="getRechargeOrder(0)">';
                        // html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-logout.svg">';
                        // html += '                <img src="images/rechargeList.png" alt="" style="height:24px;">';
                        // html += '              </i>';
                        // html += '              ' + get_lan("rechargeRecord") + '';
                        // html += '            </div>';
                        // html += '            <div class="c-dropdown__item mat-menu-item" onclick="getWithdrawalOrder(0)">';
                        // html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-logout.svg">';
                        // html += '                <img src="images/withdrawList.png" alt="" style="height:24px;">';
                        // html += '              </i>';
                        // html += '              ' + get_lan("withdrawalRecord") + '';
                        // html += '            </div>';

                        if (getCookie("customerType") == "PC" || getCookie("customerType") == "WE_CHAT") {
                              html += '            <div class="c-dropdown__item mat-menu-item" onclick="panelShow(\'bindAccount\')">';
                              html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-logout.svg">';
                              html += '                <img src="images/account.png" alt="" style="height:24px;">';
                              html += '              </i>';
                              html += '              ' + get_lan("bindAccount") + '';
                              html += '            </div>';

                        }
                        html += '            <div class="c-dropdown__item mat-menu-item" onclick="panelShow(\'about\')">';
                        html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-logout.svg">';
                        html += '                <img src="images/aboutUs.png" alt="" style="height:24px;">';
                        html += '              </i>';
                        html += '              ' + get_lan("about") + '';
                        html += '            </div>';

                        html += '            <div class="c-dropdown__item mat-menu-item" onclick="exit()">';
                        html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-logout.svg">';
                        html += '                <img src="images/exit.png" alt="" style="height:24px;">';
                        html += '              </i>';
                        html += '              ' + get_lan("logOut") + '';
                        html += '            </div>';

                        html += '            <div class="c-dropdown__item mat-menu-item" onclick="window.location.href=\'../index.html\'">';
                        html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-logout.svg">';
                        html += '                <img src="images/exit.png" alt="" style="height:24px;">';
                        html += '              </i>';
                        html += '              ' + get_lan("index") + '';
                        html += '            </div>';

                        html += '            <div class="c-dropdown__item mat-menu-item" onclick="panelShow(\'nodePanel\')">';
                        html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-logout.svg">';
                        html += '                <img src="images/exit.png" alt="" style="height:24px;">';
                        html += '              </i>';
                        html += '              ' + get_lan("node") + '';
                        html += '            </div>';
                  } else {
                        html += '            <button class="c-dropdown__item mat-menu-item" onclick="panelShow(\'forget\')">';
                        html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-language.svg">';
                        html += '                <img src="images/forget.png" alt="" style="height:24px;">';
                        html += '              </i>';
                        html += '              忘记密码';
                        html += '              <div class="mat-menu-ripple mat-ripple" matripple=""></div>';
                        html += '            </button>';

                  }


                  html += '          </div>';
                  html += '        </div>';
                  html += '      </div>';
                  html += '    </div>';
                  html += '  </div>';
                  return html;

                  break;
            case 3:
            case "3":
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-transparent-backdrop cdk-overlay-backdrop-showing" onclick="$(\'.cdk-overlay-container\').hide()"></div>';
                  html += '  <div class="cdk-overlay-connected-position-bounding-box" dir="ltr" style="top: 48px; right: 16px; height: 921px; width: 1425px; align-items: flex-end; justify-content: flex-start;">';
                  html += '    <div id="cdk-overlay-43" class="cdk-overlay-pane" style="pointer-events: auto; position: static;">';
                  html += '      <div class="mat-menu-panel mat-menu-before mat-menu-below c-dropdown__list mat-elevation-z4" style="transform-origin:right top;webkit-transform-origin:right top;margin-right:' + $(".c-navigationControls").width() + 'px">';
                  html += '        <div class="mat-menu-content">';
                  html += '          <div>';

                  html += '            <button class="c-dropdown__item mat-menu-item " onclick="setLanguage(\'cn\')">';
                  html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-language.svg">';
                  html += '                <img src="images/lan.png" alt="" style="height:24px;">';
                  html += '              </i>';
                  html += '              ' + get_lan("Chinese") + '';
                  html += '              <div class="mat-menu-ripple mat-ripple"></div>';
                  html += '            </button>';
                  // html += '            <button class="c-dropdown__item mat-menu-item" onclick="setLanguage(\'hk\')">';
                  // html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-language.svg">';
                  // html += '                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">';
                  // html += '                  <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.35 18.92 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16V16ZM8.03 8H5.08C6.04 6.34 7.57 5.07 9.41 4.44C8.81 5.55 8.35 6.75 8.03 8V8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM14.34 14H9.66C9.57 13.34 9.5 12.68 9.5 12C9.5 11.32 9.57 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56V19.56ZM16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36Z">';
                  // html += '                  </path>';
                  // html += '                </svg>';
                  // html += '              </i>';
                  // html += '              '+ get_lan("ChineseHK") +'';
                  // html += '              <div class="mat-menu-ripple mat-ripple"></div>';
                  // html += '            </button>';
                  html += '            <button class="c-dropdown__item mat-menu-item" onclick="setLanguage(\'en\')">';
                  html += '              <i class="c-dropdown__icon o-icon" inlinesvg="icon-language.svg">';
                  html += '                <img src="images/lan.png" alt="" style="height:24px;">';
                  html += '              </i>';
                  html += '              ' + get_lan("English") + '';
                  html += '              <div class="mat-menu-ripple mat-ripple"></div>';
                  html += '            </button>';

                  html += '          </div>';
                  html += '        </div>';
                  html += '      </div>';
                  html += '    </div>';
                  html += '  </div>';
                  return html;

                  break;
                  // case "sale":
                  // case "unsale":
                  //       var title = '';
                  //       if (type == 'sale') {
                  //             title = '上架物品';
                  //       } else if (type == 'unsale') {
                  //             title = '下架物品';
                  //       }
                  //       html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  //       html += '<div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  //       html += '  <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  //       html += '    <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  //       html += '    <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer" tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  //       html += '      <div>';
                  //       html += '        <div class="c-auth c-auth--dialog">';
                  //       html += '          <div class="c-auth__inner">';
                  //       html += '            <div class="c-authHeader c-authHeader--shadow">';
                  //       html += '              <h3 class="c-authHeader__title"><span>' + title + '</span></h3>';
                  //       html += '              <button class="c-dialogHeader__close" mat-dialog-close="" type="button" data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  //       html += '                <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  //       html += '              </button>';
                  //       html += '            </div>';



                  //       html += '            <div class="c-auth__content" style="padding-bottom: 0;">';
                  //       html += '              <div class="c-authForm">';
                  //       html += '                <div novalidate="" class="ng-pristine ng-invalid ng-touched">';
                  //       html += '                  <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-24 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label ng-pristine ng-invalid mat-form-field-invalid ng-touched mat-form-field-hide-placeholder">';
                  //       html += '                    <div class="mat-form-field-wrapper">';
                  //       html += '                      <div style="text-align: center;padding: 10px 0;"><img src="' + imgUrl + '" alt="" style="width:68%;"></div>';
                  //       if (type == 'sale') {
                  //             html += '                      <div class="mat-form-field-flex" style="padding-top: 0;">';
                  //             html += '                        <input type="text" id="lootNum" placeholder="请输入上架金额" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="11">';
                  //             html += '                        <span style="padding-left: 15px;">LOOT</span>';
                  //             html += '                      </div>';
                  //       }


                  //       html += '                      <div class="mat-form-field-underline ng-tns-c11-24">';
                  //       html += '                        <span class="mat-form-field-ripple"></span>';
                  //       html += '                      </div>';
                  //       html += '                      <div class="mat-form-field-subscript-wrapper">';
                  //       html += '                        <div class="ng-tns-c11-24 ng-trigger ng-trigger-transitionMessages"';
                  //       html += '                        style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  //       html += '                          <mat-error class="mat-error" role="alert" id="mat-error-4"></mat-error>';
                  //       html += '                        </div>';
                  //       html += '                      </div>';
                  //       html += '                    </div>';
                  //       html += '                  </div>';
                  //       if (type == 'sale') {
                  //             html += '                  <div onclick="saleGo()">';
                  //             html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                  //             html += '                    <svg t="1566885363220" class="mat-icon notranslate material-icons mat-icon-no-color" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2873" width="32" height="32"><path d="M207.977931 224.750345l63.770483 387.001379c9.463172 0.494345 18.996966 1.377103 28.495448 1.377104 180.082759 0.070621 360.236138 0.070621 540.354207 0 36.687448 0 45.479724-10.840276 50.846897-47.492414 13.135448-89.935448 28.460138-179.553103 43.04331-269.27669 2.295172-14.230069 6.426483-28.177655 8.015448-42.443034 2.471724-22.457379-11.581793-28.848552-30.861241-28.848552l-140.958897-0.105931h-33.82731l13.170758-54.448552c63.134897 0 124.433655-1.588966 185.661794 0.494345 52.082759 1.730207 73.092414 46.150621 66.030344 92.513103-17.302069 112.993103-35.239724 225.880276-53.106758 338.802759-6.426483 40.536276-43.926069 69.067034-91.171311 69.102345-180.118069 0.141241-360.236138 0.105931-540.354206 0.105931H278.528c5.014069 25.423448 6.355862 48.128 14.795034 67.795862 3.495724 8.262621 21.857103 14.124138 33.544828 14.265379 144.843034 0.918069 289.721379 0.600276 434.599724 0.600276 41.101241 0 82.237793-0.529655 123.339035 0.353104 11.369931 0.211862 24.011034 2.118621 33.474207 7.768275 6.814897 4.06069 13.029517 15.713103 12.570482 23.587311-0.459034 7.556414-8.403862 17.054897-15.642482 21.256827-7.768276 4.519724-18.46731 5.190621-27.895173 5.190621-186.968276 0.176552-373.936552 0.211862-560.904827-0.211862-59.42731-0.141241-82.802759-22.598621-92.513104-81.284414-26.765241-162.78069-54.978207-325.278897-81.849379-488.024276-9.922207-60.027586-17.690483-120.302345-26.871173-183.260689-24.964414 0-47.315862 0.776828-69.561379-0.211862C35.098483 58.473931 13.382621 52.753655 14.441931 27.895172 15.32469 5.579034 34.392276-0.176552 55.366621 1.024c17.584552 0.98869 35.275034 0.141241 52.894896 0.176552 42.160552 0 73.551448 29.095724 77.259035 70.514758 1.377103 15.430621 4.802207 30.72 6.991448 46.115311 2.118621 15.148138 3.884138 30.366897 6.073379 47.527724h214.828138l13.876966 59.392H207.977931z" fill="#ffffff" p-id="2874"></path><path d="M609.103448 195.901793v208.295724c0 7.838897 0.176552 15.677793-0.105931 23.51669-0.741517 20.126897-11.122759 36.228414-30.649379 36.263724-20.374069 0.070621-29.025103-16.948966-29.025104-37.075862 0.03531-67.513379-0.03531-135.062069-0.07062-202.610759v-30.967172c-13.488552 12.958897-20.833103 25.035034-31.143724 28.601379-11.828966 4.06069-28.813241 4.766897-38.523587-1.235862-5.437793-3.354483-5.826207-27.365517 0.353104-34.957241 25.035034-30.649379 51.694345-60.663172 81.814069-86.157242 8.15669-6.850207 35.063172-2.259862 45.585655 6.461794 25.282207 21.009655 45.267862 48.16331 68.64331 71.609379 14.406621 14.477241 21.751172 29.943172 6.002759 45.373793-16.489931 16.172138-32.556138 6.708966-44.526345-8.686345-6.532414-8.403862-10.981517-18.46731-16.384-27.789241l-11.970207 9.357241M253.316414 923.012414c0-36.652138 31.390897-68.678621 67.442758-68.890483 36.369655-0.211862 67.866483 30.366897 67.442759 65.50069-0.529655 42.160552-28.177655 69.561379-68.325517 70.196965-30.013793 0.423724-70.973793-34.992552-66.56-66.807172M838.62069 989.501793c-35.310345 0.388414-67.195586-30.225655-67.654621-64.935724-0.564966-38.700138 30.825931-71.150345 68.113655-70.444138 35.486897 0.706207 65.324138 29.484138 66.136276 63.805793 0.918069 41.595586-26.518069 71.115034-66.56 71.574069" fill="#ffffff" p-id="2875"></path></svg>';
                  //             html += '                      &nbsp;&nbsp;&nbsp;<span>上架</span>';
                  //             html += '                    </button>';
                  //             html += '                  </div>';
                  //       } else if (type == 'unsale') {
                  //             html += '                  <div onclick="unsaleGo()">';
                  //             html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                  //             html += '                    <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566885351029" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2110" width="32" height="32"><path d="M709.12 883.2a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM320 883.2a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM949.243 268.954l15.293-61.169h-171.52v61.44h92.724L802.227 590.08H342.441l-54.18-320.855H409.6v-61.44H277.883l-11.812-69.97h0.169L256 76.375H58.88v61.44h144.876L312.32 780.703v3.937h517.12l20.48-61.44H364.923l-12.104-71.68H849.92v-0.768l99.38-381.783z" fill="#ffffff" p-id="2111"></path><path d="M751.078 355.999L621.583 531.738h-55.5l-129.495-175.74h55.495l78.454 106.466V198.743h46.254v264.192l78.792-106.936z" fill="#ffffff" p-id="2112"></path></svg>';
                  //             html += '                      &nbsp;&nbsp;&nbsp;<span>下架</span>';
                  //             html += '                    </button>';
                  //             html += '                  </div>';
                  //       }
                  //       html += '                </div>';
                  //       html += '              </div>';
                  //       html += '            </div>';
                  //       html += '          </div>';
                  //       html += '        </div>';
                  //       html += '      </div>';
                  //       html += '    </div>';
                  //       html += '  </div>';
                  //       html += '</div>';
                  //       return html;
                  //       break;
            case "4":
            case  4 :
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '      <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '        <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '          <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer"';
                  html += '          tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '            <div>';
                  html += '              <div class="c-auth c-auth--dialog">';



                  html += '<div class="c-auth__inner">';
                  html += '  <div class="c-authHeader c-authHeader--shadow">';
                  html += '    <h3 class="c-authHeader__title">';
                  html += '      <span>' + get_lan("myWallet") + '</span>&nbsp;&nbsp;&nbsp;&nbsp;';
                  html += '      <span>' + '('+getCookie('account') +')'+ '</span>';
                  html += '    </h3>';
                  html += '    <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '    data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '      <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '    </button>';
                  html += '  </div>';
                  html += '  <div class="c-auth__content">';
                  html += '  <div class="flex">';
                  html += '    <div onclick="eosLogin()" style="cursor: pointer;margin:0 8px;">';
                  html += '      <svg t="1566445356488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2277" width="48" height="48"><path d="M942.427421 234.839536a17.254917 17.254917 0 1 0-28.988261 18.715833 475.626037 475.626037 0 0 1 76.013661 258.559181c0 263.229511-214.145024 477.386038-477.386038 477.386038s-477.386038-214.156527-477.386038-477.386038 214.145024-477.386038 477.386038-477.386039a475.683553 475.683553 0 0 1 166.659492 29.908523 17.254917 17.254917 0 0 0 12.055436-32.335714 511.964892 511.964892 0 1 0 251.64571 202.538216z" fill="#4daef8" p-id="2278"></path><path d="M796.059711 128.365195a482.807533 482.807533 0 0 1 34.969965 28.562639 17.254917 17.254917 0 1 0 23.064073-25.663813c-11.963409-10.755565-24.571002-21.050999-37.47768-30.621726a17.256067 17.256067 0 1 0-20.556358 27.7229zM385.496215 534.22385L261.088263 751.647308l242.144003 144.12457-117.736051-361.548028zM257.614273 707.187138l117.402456-205.172466-42.32056-129.964036-75.081896 335.136502zM621.370931 503.65964l-108.671467-191.736638-110.385456 192.898469 110.523495 339.381212 108.533428-340.543043zM689.332298 373.074428l-40.721605 127.755406 116.447684 205.460049-75.726079-333.215455zM638.223233 533.407117L522.868361 895.35776l239.072628-143.664439L638.223233 533.407117zM673.423264 340.336099L525.514115 130.263235v153.361703l106.232773 187.457419 41.676376-130.746258zM500.413963 282.865722V129.29696L348.708732 340.175053l43.125789 132.448743 108.579442-189.758074z" fill="#4daef8" p-id="2279"></path></svg>';
                  html += '    </div>';
                  html += '    <span>'+getCookie('eos')+'</span>'
                  html += '   </div>'
                  html += '  </div>'

                  html += '</div></div></div></div></div>';
                  return html;
                  break;
                case 5:
                case "5":
        
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-transparent-backdrop cdk-overlay-backdrop-showing" onclick="$(\'.cdk-overlay-container\').hide()"></div>';
                          html += '  <div class="cdk-overlay-connected-position-bounding-box" dir="ltr" style="top: 159px; right: 113px; height: 921px; width: 1425px; align-items: flex-end; justify-content: flex-start;">';
                          html += '    <div id="cdk-overlay-43" class="cdk-overlay-pane" style="pointer-events: auto; position: static;">';
                          html += '      <div class="mat-menu-panel ng-trigger ng-trigger-transformMenu ng-tns-c5-266 mat-menu-before mat-menu-below c-dropdown__list mat-elevation-z4" role="menu" tabindex="-1" style="transform-origin:right top;0:transform-origin;transform-origin:right top;webkit-transform-origin:right top;">';
                          html += '        <div class="mat-menu-content" style="width:137px;">';
                          html += '          <div>';
        
    
                          html += '                  <div appearance="fill" class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-invalid mat-form-field-hide-placeholder">';

                          html += '                    <div class="mat-form-field-wrapper" style="padding:10px;">';
                       
                          html += '                      <p>等级</p>'
                          html += '                        <select id="filter-level" class="filter-select">'
                          html += '                          <option value="1">1</option>'
                          html += '                          <option value="2">2</option>'
                          html += '                          <option value="3">3</option>'
                          html += '                          <option value="4">4</option>'
                          html += '                          <option value="5">5</option>'
                          html += '                        </select>'
                          html += '                      <p>分类</p>'
                          html += '                        <select id="filter-classify" class="filter-select">'
                          html += '                          <option value="SHOVEL">SHOVEL</option>'
                          html += '                          <option value="SHOVEL">SHOVEL</option>'
                          html += '                          <option value="SHOVEL">SHOVEL</option>'
                          html += '                        </select>'
                          html += '                      <p>价格标的</p>'
                          html += '                        <select id="filter-price-unit" class="filter-select">'
                          html += '                          <option value="EOS">EOS</option>'
                          html += '                          <option value="LOOT">LOOT</option>'
                          html += '                          <option value="EOS">3</option>'
                          html += '                          <option value="LOOT">4</option>'
                          html += '                        </select>'

                          html += '                      <p>价格范围</p>'
                          html += '                       <input type="text" class="filter-input" id="priceLow" />'
                          html += '                       <div class="toline"></div>'
                          html += '                       <input type="text" class="filter-input" id="priceHigh" />'


                          html += '                      <p>质量</p>'
                          html += '                       <input type="text" class="filter-input" id="qualityLow" />'
                          html += '                       <div class="toline"></div>'
                          html += '                       <input type="text" class="filter-input" id="qualityHigh" />'


                          html += '                       <button style="margin-top:20px;" class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit" onclick="getSaleMarket(0)"><span>应用</span></button>'
                          html += '                       <button style="margin-top:20px;" class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit"><span>重置</span></button>'
                          
                          html += '                    </div>';
      
                         
      
                          html += '                  </div>';


                          html += '</form>'
        
                          html += '            </div>';
                          html += '          </div>';
                          html += '        </div>';
                          html += '      </div>';
                          html += '    </div>';
                          html += '  </div>';
                          return html;
        
                          break;
            case "myContract":
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '      <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '        <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '          <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer"';
                  html += '          tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '            <div>';
                  html += '              <div class="c-auth c-auth--dialog">';



                  html += '<div class="c-auth__inner">';
                  html += '  <div class="c-authHeader c-authHeader--shadow">';
                  html += '    <h3 class="c-authHeader__title">';
                  html += '      <span>' + get_lan("selectContract") + '</span>&nbsp;&nbsp;&nbsp;&nbsp;';
                  html += '    </h3>';
                  html += '    <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '    data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '      <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '    </button>';
                  html += '  </div>';
                  html += '  <div class="c-auth__content">';
                  html += '  <div>';
                  html += '<div class="iptSearch">';
                  html += '  <div class="el-input--suffix flex">';
                  html += '    <input type="text" autocomplete="off" placeholder="请输入您的NFT资产合约名" id="userInputContractBox" class="el-input__inner">';
                  html += '    <div class="joinUserInputBtn flex" onclick="selectContract(\'select\',\'\')">';
                  html += '      选择';
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';
                  html += '      <div class="scroll" style="height:405px">';

                  html += '        <div class="item flex" onclick="selectContract(-1,\'\')">';
                  html += '          <div class="flex">';
                  // html += '            <img src="imgs/'+ n.nftcontract +'.png" alt="" class="coinImg">';
                  html += '            <div style="min-width:128px;">';
                  html += '              <div class="coin">全部</div>';
                  // html += '              <div class="contractTip">'+ n.protocol +'</div>';
                  html += '            </div>';
                  // html += '            <div style="flex:1;padding-left:20px;font-size: 20px;">（数量：'+ n.tokencount +'）</div>';
                  html += '          </div>';
                  html += '          <div style="flex:1;"></div>';
                  html += '        </div>';
              
                  $.each(nftcontract,function(i,n){
              
                    var imgsTag = 'png';
                    if(n.nftcontract == 'tennispocket'){
                      imgsTag = 'jpg';
                    }
              
                    html += '        <div class="item flex" onclick="selectContract('+ n.mid +',\''+ n.nftcontract +'\')">';
                    html += '          <div class="flex">';
                    html += '            <img src="images/'+ n.nftcontract +'.'+ imgsTag +'?v='+ new Date().getTime() +'" alt="" class="coinImg">';
                    html += '            <div style="min-width:128px;">';
                    html += '              <div class="coin">'+ n.nftcontract +'</div>';
                    html += '              <div class="contractTip">'+ n.protocol +'</div>';
                    html += '            </div>';
                    // html += '            <div style="flex:1;padding-left:20px;font-size: 20px;">（数量：'+ n.tokencount +'）</div>';
                    html += '          </div>';
                    html += '          <div style="flex:1;"></div>';
                    html += '        </div>';
                  })
              
                    // html += '        <div class="item flex" onclick="selectContract(2,\'xlootndxbow1\')">';
                    // html += '          <div class="flex">';
                    // html += '            <img src="imgs/xlootndxbow1.png" alt="" class="coinImg">';
                    // html += '            <div style="min-width:128px;">';
                    // html += '              <div class="coin">xlootndxbow1</div>';
                    // html += '              <div class="contractTip">UCAT</div>';
                    // html += '            </div>';
                    // // html += '            <div style="flex:1;padding-left:20px;font-size: 20px;">（数量：'+ n.tokencount +'）</div>';
                    // html += '          </div>';
                    // html += '          <div style="flex:1;"></div>';
                    // html += '        </div>';
              
              
              
                  html += '      </div>';
              
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';
                  html += '   </div>'
                  html += '  </div>'

                  html += '</div></div></div></div></div>';
                  return html;
                  break;
            case "unsaleConfirm":
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '      <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '        <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '          <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer"';
                  html += '          tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '            <div>';
                  html += '              <div class="c-auth c-auth--dialog">';



                  html += '<div class="c-auth__inner">';
                  html += '  <div class="c-authHeader c-authHeader--shadow">';
                  html += '    <h3 class="c-authHeader__title">';
                  html += '      <span>' + get_lan("unsaleConfirm") + '</span>&nbsp;&nbsp;&nbsp;&nbsp;';
                  html += '    </h3>';
                  html += '    <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '    data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '      <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '    </button>';
                  html += '  </div>';
                  html += '  <div class="c-auth__content">';
                  html += '  <div class="flex">';
                  html += '  <p>你确定下架此物品？</p>'
                  html += '                  <div style="width:100px;" onclick="unsaleNftOk()">';
                  html += '                    <button style="" class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail" >';
                  html += '                     <span>确定</span>';
                  html += '                    </button>';
                  html += '                  </div>';
                  html += '   </div>'
                  html += '  </div>'

                  html += '</div></div></div></div></div>';
                  return html;
                  break;  
            case "nodePanel":
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '      <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '        <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '          <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer"';
                  html += '          tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '            <div>';
                  html += '              <div class="c-auth c-auth--dialog">';



                  html += '<div class="c-auth__inner">';
                  html += '  <div class="c-authHeader c-authHeader--shadow">';
                  html += '    <h3 class="c-authHeader__title">';
                  html += '      <span>' + get_lan("selectNode") + '</span>&nbsp;&nbsp;&nbsp;&nbsp;';
                  html += '    </h3>';
                  html += '    <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '    data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '      <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '    </button>';
                  html += '  </div>';
                  html += '  <div class="c-auth__content">';
                  html += '  <div class="flex">';
                  html += '      <div class="nodeSet">';


                  $.each(API_ENDPOINTS2,function(i,n){
                    var active = '';
                    var index = getCookie("nodeIndex") || nodeIndex;
                    console.log(i,i == 0, i == "0")
                    if(i == index){
                      active = 'act';
                    }

                    html += '        <div class="nodeList" onclick="selectionNode('+ i +')">';
                    html += '          <div class="icon '+ active +'">';
                    html += '            <span>节点'+ (i + 1) +'：</span>';
                    html += '            <span>https://'+ n +'</span>';
                    html += '          </div>';
                    html += '        </div>';


                  })


                  html += '        <div class="btn" onclick="setNode()">确认</div>';
                  html += '      </div>';
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';
                  html += '   </div>'
                  html += '  </div>'

                  html += '</div></div></div></div></div>';
                  return html;
                  break;  
            
            case "forget":
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '      <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '        <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '          <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer"';
                  html += '          tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '            <div>';
                  html += '              <div class="c-auth c-auth--dialog">';



                  html += '<div class="c-auth__inner">';
                  html += '  <div class="c-authHeader c-authHeader--shadow">';
                  html += '    <h3 class="c-authHeader__title">';
                  html += '      <span>忘记密码</span>';
                  html += '    </h3>';
                  html += '    <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '    data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '      <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '    </button>';
                  html += '  </div>';
                  html += '  <div class="c-auth__content">';
                  html += '    <div class="c-authForm">';
                  html += '      <div novalidate="" class="ng-pristine ng-invalid ng-touched">';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-24 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label ng-pristine ng-invalid mat-form-field-invalid ng-touched mat-form-field-hide-placeholder">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '              <input type="text" id="telNumber" placeholder="' + get_lan("phone") + '" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="11">';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-24">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="ng-tns-c11-24 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <mat-error class="mat-error" role="alert" id="mat-error-4"></mat-error>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-25 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '               <div class="flex">'
                  html += '                     <div class="mat-form-field-flex flex" style="padding-top: 0;padding-right:0;">';
                  html += '                       <input type="text" id="smscode" placeholder="' + get_lan("code") + '" style="background: none;border:0;height:100%;width:200px;font-size:20px;" maxlength="8">';
                  html += '                       <div style="width:20px;height:100%;background:#2a2c2e;"></div>';
                  html += '                       <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail" id="getCode" onclick="getCode3()" style="min-width:92px;">&nbsp;<span>' + get_lan("getCode") + '</span></button>';
                  html += '                     </div>';
                  html += '               </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-25">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="mat-form-field-hint-wrapper ng-tns-c11-25 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <div class="mat-form-field-hint-spacer"></div>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-25 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '              <input type="password" id="newpass" placeholder="请输入新密码" style="background: none;border:0;height:100%;width:100%;font-size:20px;" minlength="8" maxlength="8">';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-25">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="mat-form-field-hint-wrapper ng-tns-c11-25 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <div class="mat-form-field-hint-spacer"></div>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-25 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '              <input type="password" id="newpass2" placeholder="请再次输入新密码" style="background: none;border:0;height:100%;width:100%;font-size:20px;" minlength="8" maxlength="8">';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-25">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="mat-form-field-hint-wrapper ng-tns-c11-25 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <div class="mat-form-field-hint-spacer"></div>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';
                  html += '        <div class="c-authFooter">';
                  html += '          <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple"';
                  html += '          matripple="" type="submit" onclick="updatePass(this)">';
                  html += '            <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566290510060" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6676" width="128" height="128"><path d="M735.9 128l0.1 0.1v767.8l-0.1 0.1H288.1l-0.1-0.1V128.1l0.1-0.1h447.8m0.1-64H288c-35.2 0-64 28.8-64 64v768c0 35.2 28.8 64 64 64h448c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z" p-id="6677" fill="#ffffff"></path><path d="M800 704H224v64h576v-64zM576 800H448c-17.6 0-32 14.4-32 32s14.4 32 32 32h128c17.6 0 32-14.4 32-32s-14.4-32-32-32z" p-id="6678" fill="#ffffff"></path></svg>';
                  html += '            &nbsp;<span>确定</span>';
                  html += '          </button>';
                  html += '        </div>';
                  html += '      </div>';
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';



                  html += '</div></div></div></div></div>';
                  return html;
                  break;
            case "sale":
            case "unsale":
            case "buy":
                  var title = '';
                  var imgClass = 'skinDetail';
                  if (type == 'sale') {
                        title = '上架物品';
                  } else if (type == 'unsale') {
                        title = '下架物品';
                  } else if (type == 'buy') {
                        title = '购买物品';
                  }
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '  <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '    <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '      <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '      <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer" tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '        <div>';
                  html += '          <div class="c-auth c-auth--dialog">';
                  html += '            <div class="c-auth__inner">';


                  html += '              <div class="c-authHeader c-authHeader--shadow">';
                  html += '                <h3 class="c-authHeader__title"><span>' + title + '</span></h3>';
                  html += '                <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '                data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '                  <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '                </button>';
                  html += '              </div>';


                  html += '<div class="c-dialog__body c-dialog__body--preview" scrollspy="">';
                  html += '<div class="spiedSection" id="itemsDetails">';
                  html += '  <div class="c-assetPreview">';
                  html += '    <div class="c-assetPreview__inner">';
                  html += '      <div class="c-assetPreview__figure c-assetPreview__figure--dota2-skins">';

                  html += '       <div style="flex:1;">';
                  html += '         <div class="flex" style="position: relative;">';
                  html += '          <img class="c-assetPreview__img ' + imgClass + '" src="' + objMsg.imageUrl + '" alt="">';
                  html += '         </div>';
                  if (type == 'sale') {
                    
                          // html += '                  <div appearance="fill"  style="margin-top:30px;" class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-invalid mat-form-field-hide-placeholder">';

                          // html += '                    <div class="mat-form-field-wrapper" style="margin: 0 auto;">';
                          // html += '                      <div class="mat-form-field-flex" style="padding-top: 0;">';
                          // html += '                        <input type="text" id="lootOnsaleNum" placeholder="请输入上架数量" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="6">';
                          // html += '                        <span style="padding-left: 15px;">个</span>';
                          // html += '                      </div>';
                          // html += '                    </div>';
                          // html += '                  </div>';
                    
                    html += '                  <div appearance="fill" style="margin-top:30px;" class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-invalid mat-form-field-hide-placeholder">';

                    html += '                    <div class="mat-form-field-wrapper" style="margin: 0 auto;">';
                    html += '                      <div class="mat-form-field-flex" style="padding-top: 0;">';
                    html += '                        <input type="text" id="lootNum" placeholder="请输入出售金额" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="11">';

                    html += '                        <span style="padding-left: 15px;"></span>';
                    html += '                        <select id="select-coin">'
                    html += '                          <option value="EOS">EOS</option>'
                    html += '                          <option value="LOOT">LOOT</option>'
                    html += '                          <option value="TIME">TIME</option>'
                    html += '                          <option value="USDT">USDT</option>'

                    html += '                        </select>'
                    html += '                      </div>';
                    html += '                    </div>';



                    html += '                  </div>';

                    if (getCookie("customerType") != "PC") {
                                      html += '               <div class="flex" style="margin:0 auto;width:100%;">';
                                      html += '                  <div style="margin:0 auto;flex:1;" onclick="transferAssetShow()">';
                                      html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                                      html += '                    <svg t="1584364466165" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1673" width="24" height="24"><path d="M725.333333 377.2672V443.733333H298.666667v-68.266666h330.837333L554.666667 296.891733l47.104-49.493333 121.856 128h1.706666v1.800533zM298.666667 646.7328V580.266667h426.666666v68.266666H394.496L469.333333 727.108267l-47.104 49.493333-121.856-128H298.666667v-1.800533z" fill="#ffffff" p-id="1674"></path><path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 68.266667a443.733333 443.733333 0 1 0 443.733333 443.733333A443.733333 443.733333 0 0 0 512 68.266667z" fill="#ffffff" p-id="1675"></path></svg>';
                                      html += '                      &nbsp;&nbsp;&nbsp;<span>转账</span>';
                                      html += '                    </button>';
                                      html += '                  </div>';
                                      html += '                  <div style="margin:0 auto;margin-left: 10px;flex:1;" onclick="saleNftOk()">';
                                      html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                                      html += '                    <svg t="1566885363220" class="mat-icon notranslate material-icons mat-icon-no-color" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2873" width="32" height="32"><path d="M207.977931 224.750345l63.770483 387.001379c9.463172 0.494345 18.996966 1.377103 28.495448 1.377104 180.082759 0.070621 360.236138 0.070621 540.354207 0 36.687448 0 45.479724-10.840276 50.846897-47.492414 13.135448-89.935448 28.460138-179.553103 43.04331-269.27669 2.295172-14.230069 6.426483-28.177655 8.015448-42.443034 2.471724-22.457379-11.581793-28.848552-30.861241-28.848552l-140.958897-0.105931h-33.82731l13.170758-54.448552c63.134897 0 124.433655-1.588966 185.661794 0.494345 52.082759 1.730207 73.092414 46.150621 66.030344 92.513103-17.302069 112.993103-35.239724 225.880276-53.106758 338.802759-6.426483 40.536276-43.926069 69.067034-91.171311 69.102345-180.118069 0.141241-360.236138 0.105931-540.354206 0.105931H278.528c5.014069 25.423448 6.355862 48.128 14.795034 67.795862 3.495724 8.262621 21.857103 14.124138 33.544828 14.265379 144.843034 0.918069 289.721379 0.600276 434.599724 0.600276 41.101241 0 82.237793-0.529655 123.339035 0.353104 11.369931 0.211862 24.011034 2.118621 33.474207 7.768275 6.814897 4.06069 13.029517 15.713103 12.570482 23.587311-0.459034 7.556414-8.403862 17.054897-15.642482 21.256827-7.768276 4.519724-18.46731 5.190621-27.895173 5.190621-186.968276 0.176552-373.936552 0.211862-560.904827-0.211862-59.42731-0.141241-82.802759-22.598621-92.513104-81.284414-26.765241-162.78069-54.978207-325.278897-81.849379-488.024276-9.922207-60.027586-17.690483-120.302345-26.871173-183.260689-24.964414 0-47.315862 0.776828-69.561379-0.211862C35.098483 58.473931 13.382621 52.753655 14.441931 27.895172 15.32469 5.579034 34.392276-0.176552 55.366621 1.024c17.584552 0.98869 35.275034 0.141241 52.894896 0.176552 42.160552 0 73.551448 29.095724 77.259035 70.514758 1.377103 15.430621 4.802207 30.72 6.991448 46.115311 2.118621 15.148138 3.884138 30.366897 6.073379 47.527724h214.828138l13.876966 59.392H207.977931z" fill="#ffffff" p-id="2874"></path><path d="M609.103448 195.901793v208.295724c0 7.838897 0.176552 15.677793-0.105931 23.51669-0.741517 20.126897-11.122759 36.228414-30.649379 36.263724-20.374069 0.070621-29.025103-16.948966-29.025104-37.075862 0.03531-67.513379-0.03531-135.062069-0.07062-202.610759v-30.967172c-13.488552 12.958897-20.833103 25.035034-31.143724 28.601379-11.828966 4.06069-28.813241 4.766897-38.523587-1.235862-5.437793-3.354483-5.826207-27.365517 0.353104-34.957241 25.035034-30.649379 51.694345-60.663172 81.814069-86.157242 8.15669-6.850207 35.063172-2.259862 45.585655 6.461794 25.282207 21.009655 45.267862 48.16331 68.64331 71.609379 14.406621 14.477241 21.751172 29.943172 6.002759 45.373793-16.489931 16.172138-32.556138 6.708966-44.526345-8.686345-6.532414-8.403862-10.981517-18.46731-16.384-27.789241l-11.970207 9.357241M253.316414 923.012414c0-36.652138 31.390897-68.678621 67.442758-68.890483 36.369655-0.211862 67.866483 30.366897 67.442759 65.50069-0.529655 42.160552-28.177655 69.561379-68.325517 70.196965-30.013793 0.423724-70.973793-34.992552-66.56-66.807172M838.62069 989.501793c-35.310345 0.388414-67.195586-30.225655-67.654621-64.935724-0.564966-38.700138 30.825931-71.150345 68.113655-70.444138 35.486897 0.706207 65.324138 29.484138 66.136276 63.805793 0.918069 41.595586-26.518069 71.115034-66.56 71.574069" fill="#ffffff" p-id="2875"></path></svg>';
                                      html += '                      &nbsp;&nbsp;&nbsp;<span>出售</span>';
                                      html += '                    </button>';
                                      html += '                  </div>';
                                      html += '               </div>';

                          
                    }else{
                          html += '               <div class="flex" style="margin:10px auto 0;width:100%;">';
                          html += '                  <div style="margin: 0 auto;flex:1;" onclick="saleNftOk()">';
                          html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                          html += '                    <svg t="1566885363220" class="mat-icon notranslate material-icons mat-icon-no-color" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2873" width="32" height="32"><path d="M207.977931 224.750345l63.770483 387.001379c9.463172 0.494345 18.996966 1.377103 28.495448 1.377104 180.082759 0.070621 360.236138 0.070621 540.354207 0 36.687448 0 45.479724-10.840276 50.846897-47.492414 13.135448-89.935448 28.460138-179.553103 43.04331-269.27669 2.295172-14.230069 6.426483-28.177655 8.015448-42.443034 2.471724-22.457379-11.581793-28.848552-30.861241-28.848552l-140.958897-0.105931h-33.82731l13.170758-54.448552c63.134897 0 124.433655-1.588966 185.661794 0.494345 52.082759 1.730207 73.092414 46.150621 66.030344 92.513103-17.302069 112.993103-35.239724 225.880276-53.106758 338.802759-6.426483 40.536276-43.926069 69.067034-91.171311 69.102345-180.118069 0.141241-360.236138 0.105931-540.354206 0.105931H278.528c5.014069 25.423448 6.355862 48.128 14.795034 67.795862 3.495724 8.262621 21.857103 14.124138 33.544828 14.265379 144.843034 0.918069 289.721379 0.600276 434.599724 0.600276 41.101241 0 82.237793-0.529655 123.339035 0.353104 11.369931 0.211862 24.011034 2.118621 33.474207 7.768275 6.814897 4.06069 13.029517 15.713103 12.570482 23.587311-0.459034 7.556414-8.403862 17.054897-15.642482 21.256827-7.768276 4.519724-18.46731 5.190621-27.895173 5.190621-186.968276 0.176552-373.936552 0.211862-560.904827-0.211862-59.42731-0.141241-82.802759-22.598621-92.513104-81.284414-26.765241-162.78069-54.978207-325.278897-81.849379-488.024276-9.922207-60.027586-17.690483-120.302345-26.871173-183.260689-24.964414 0-47.315862 0.776828-69.561379-0.211862C35.098483 58.473931 13.382621 52.753655 14.441931 27.895172 15.32469 5.579034 34.392276-0.176552 55.366621 1.024c17.584552 0.98869 35.275034 0.141241 52.894896 0.176552 42.160552 0 73.551448 29.095724 77.259035 70.514758 1.377103 15.430621 4.802207 30.72 6.991448 46.115311 2.118621 15.148138 3.884138 30.366897 6.073379 47.527724h214.828138l13.876966 59.392H207.977931z" fill="#ffffff" p-id="2874"></path><path d="M609.103448 195.901793v208.295724c0 7.838897 0.176552 15.677793-0.105931 23.51669-0.741517 20.126897-11.122759 36.228414-30.649379 36.263724-20.374069 0.070621-29.025103-16.948966-29.025104-37.075862 0.03531-67.513379-0.03531-135.062069-0.07062-202.610759v-30.967172c-13.488552 12.958897-20.833103 25.035034-31.143724 28.601379-11.828966 4.06069-28.813241 4.766897-38.523587-1.235862-5.437793-3.354483-5.826207-27.365517 0.353104-34.957241 25.035034-30.649379 51.694345-60.663172 81.814069-86.157242 8.15669-6.850207 35.063172-2.259862 45.585655 6.461794 25.282207 21.009655 45.267862 48.16331 68.64331 71.609379 14.406621 14.477241 21.751172 29.943172 6.002759 45.373793-16.489931 16.172138-32.556138 6.708966-44.526345-8.686345-6.532414-8.403862-10.981517-18.46731-16.384-27.789241l-11.970207 9.357241M253.316414 923.012414c0-36.652138 31.390897-68.678621 67.442758-68.890483 36.369655-0.211862 67.866483 30.366897 67.442759 65.50069-0.529655 42.160552-28.177655 69.561379-68.325517 70.196965-30.013793 0.423724-70.973793-34.992552-66.56-66.807172M838.62069 989.501793c-35.310345 0.388414-67.195586-30.225655-67.654621-64.935724-0.564966-38.700138 30.825931-71.150345 68.113655-70.444138 35.486897 0.706207 65.324138 29.484138 66.136276 63.805793 0.918069 41.595586-26.518069 71.115034-66.56 71.574069" fill="#ffffff" p-id="2875"></path></svg>';
                          html += '                      &nbsp;&nbsp;&nbsp;<span>出售</span>';
                          html += '                    </button>';
                          html += '                  </div>';
                          html += '               </div>';
                    }
              } else if (type == 'unsale') {
                    html += '                  <div style="margin: 0 auto;" onclick="panelShow(\'unsaleConfirm\')">';
                    html += '                    <button style="margin-top:30px;" class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                    html += '                    <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566885351029" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2110" width="32" height="32"><path d="M709.12 883.2a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM320 883.2a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM949.243 268.954l15.293-61.169h-171.52v61.44h92.724L802.227 590.08H342.441l-54.18-320.855H409.6v-61.44H277.883l-11.812-69.97h0.169L256 76.375H58.88v61.44h144.876L312.32 780.703v3.937h517.12l20.48-61.44H364.923l-12.104-71.68H849.92v-0.768l99.38-381.783z" fill="#ffffff" p-id="2111"></path><path d="M751.078 355.999L621.583 531.738h-55.5l-129.495-175.74h55.495l78.454 106.466V198.743h46.254v264.192l78.792-106.936z" fill="#ffffff" p-id="2112"></path></svg>';
                    html += '                      &nbsp;&nbsp;&nbsp;<span>下架</span>';
                    html += '                    </button>';
                    html += '                  </div>';
              } else if (type == 'buy') {
                    html += '                    <div style="margin: 0 auto;" onclick="buyGoShow()">';
                    html += '                      <button style="margin-top:30px;" class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit">';
                    html += '                      <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566887889666" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3003" width="32" height="32"><path d="M443.6 755.001c-2.7-3.961-5.76-7.561-9.36-11.161-7.2-7.2-15.3-12.599-24.119-16.199-9.54-3.6-19.44-5.401-29.52-5.401-2.34 0-4.86 0.18-7.561 0.54-2.7 0.361-5.22 0.54-7.561 0.9-2.34 0.361-4.681 0.9-7.2 1.801-2.34 0.9-4.86 1.62-7.2 2.16-3.060 1.26-5.94 2.7-9.001 4.5l-7.2 5.401c-3.060 1.801-5.58 3.961-8.1 6.3-3.6 3.6-6.66 7.38-9.36 11.161-2.7 3.961-4.86 7.92-6.66 12.060-3.6 9.54-5.401 19.26-5.401 29.159s1.801 19.26 5.401 28.26c3.6 8.279 9.001 16.38 16.201 24.119 7.2 6.48 15.3 11.881 24.121 16.201 9.001 3.6 18.72 5.401 29.52 5.401 10.080 0 19.799-1.98 29.159-5.76 9.18-3.959 17.46-9.18 24.66-15.66 7.2-7.74 12.601-15.84 16.201-24.121 4.14-9.001 6.3-18.361 6.3-28.26s-2.16-19.62-6.3-29.161c-2.16-4.32-4.5-8.46-7.020-12.24zM907.46 290.060c-1.801-3.060-4.14-5.58-7.2-8.1-3.060-2.34-6.48-4.5-10.8-6.3-8.279-4.14-20.34-6.3-35.82-6.3h-554.759l-4.5-30.42-3.6-23.22v-4.32c-1.26-6.48-2.16-10.98-2.7-13.5l-4.5-14.4c-1.26-4.679-3.6-9.9-7.2-15.12-2.34-2.34-4.86-4.5-7.561-6.3s-5.58-3.6-8.46-5.401c-6.48-3.060-15.12-4.5-25.92-4.5h-82.26c-5.94 0-11.34 0.9-16.199 2.7s-9.18 4.14-13.5 7.2c-7.2 7.2-10.8 16.201-10.8 26.82 0 2.34 0.18 5.040 0.361 8.1 0.361 3.060 0.72 5.94 1.44 9.001 0.54 3.060 1.62 5.94 3.060 9.001 1.44 3.060 2.88 6.3 3.959 9.9 4.14 5.399 9.001 10.080 14.4 14.4 4.86 3.6 11.34 5.401 19.62 5.401h60.841l34.919 179.82 13.5 68.94 11.7 61.74 9.001 45.719 4.5 23.22c1.26 5.94 3.239 14.58 6.3 25.92 1.801 4.86 3.78 9.18 5.76 13.5 2.16 4.14 4.32 8.1 6.66 11.7 4.679 7.74 10.8 14.039 17.82 18.72 2.34 1.801 4.86 3.060 7.561 3.961 2.7 0.9 5.76 1.62 9.001 2.16 3.239 0.54 6.66 0.9 10.26 0.9h424.98c15.481 0 25.74-3.961 30.42-11.7 5.399-7.74 8.1-16.921 8.1-27.719 0-22.14-13.14-33.12-39.42-33.12h-407.7l-12.599-71.639h425.881c15.479 0 28.62-4.14 39.42-12.601 5.401-4.14 10.26-9.9 14.759-17.46 4.5-7.38 8.46-16.201 12.060-26.46 1.801-5.399 6.48-19.44 14.4-42.119l18.72-52.74 17.1-49.14 10.8-29.52c0.54-1.801 1.079-3.6 1.44-5.401s0.54-3.78 0.9-5.76c0.361-2.16 0.54-4.32 0.54-6.66 0.361-6.66-1.079-12.96-4.679-18.9zM771.561 745.639c-6.48-7.2-14.58-12.601-24.121-16.201-4.681-1.801-9.719-3.060-14.759-3.961-5.040-0.9-10.080-1.44-14.761-1.44-3.6 0-7.020 0.18-10.26 0.54-3.241 0.361-6.48 0.9-9.9 1.801-3.239 0.9-6.48 1.98-9.36 3.060-4.14 1.801-8.279 3.961-12.601 6.66-4.14 2.7-7.74 5.76-10.8 9.36-7.2 7.2-12.601 14.94-16.201 23.22-2.34 4.679-3.961 9.54-4.86 14.4-0.9 4.679-1.44 9.54-1.44 14.4 0 10.080 2.16 19.62 6.3 28.62 3.6 8.279 9.001 16.38 16.201 24.121 5.94 5.94 13.68 10.98 23.22 15.12 9.001 4.14 18.72 6.3 29.52 6.3s20.521-2.16 29.52-6.3c9.54-3.6 17.639-8.64 24.121-15.12 7.2-7.74 12.78-15.84 16.921-24.121 1.801-4.14 3.060-8.82 3.959-13.86s1.44-10.080 1.44-14.759c0-10.080-1.801-19.62-5.401-28.62-3.959-8.46-9.721-16.201-16.74-23.22z" fill="#ffffff" p-id="3004"></path><path d="M545.66 499.94l118.8-133.92-19.44-21.42-101.161 87.84-47.34-36.359-18.54 21.239 67.68 82.62z" fill="#ffffff" p-id="3005"></path></svg>';
                    html += '                        &nbsp;&nbsp;&nbsp;<span>购买</span>';
                    html += '                      </button>';
                    html += '                    </div>';
              }

                  html += '       </div>';
                  
                  html += '     </div>';
                  html += '   </div>';
                  html += '    <div class="c-assetPreview__inner">';
                  if(type == 'buy'){
                    html += '      <h3 class="c-assetPreview__title">';
                  html += '        ' + objMsg.name + '&nbsp';
                  html += '      </h3>';
                  }
                  else{
                  html += '      <h3 class="c-assetPreview__title">';
                  html += '        ' + objMsg.title + '&nbsp';
                  html += '      </h3>'; 
                  }
                  html += '        <div class="c-assetPreviewParam">';
                  html += '          <strong class="c-assetPreviewParam__label">';
                  html += '            编号:';
                  html += '          </strong>';
                  html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                  html += '            ' + objMsg.id + '';
                  html += '          </span>';
                  html += '        </div>';
                  html += '        <div class="c-assetPreviewParam">';
                  html += '          <strong class="c-assetPreviewParam__label">';
                  html += '            等级:';
                  html += '          </strong>';
                  html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                  html += '            ' + objMsg.level+ '';
                  html += '          </span>';
                  html += '        </div>';
                  html += '        <div class="c-assetPreviewParam">';
                  html += '          <strong class="c-assetPreviewParam__label">';
                  html += '            评分:';
                  html += '          </strong>';
                  html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                  html += '            ' + objMsg.quality + '';
                  html += '          </span>';
                  html += '        </div>';
                  html += '      <asset-trade-lock>';
                  html += '      </asset-trade-lock>';
                  html += '      <asset-params>';
                  html += '        <div class="c-assetPreviewParam">';
                  html += '          <strong class="c-assetPreviewParam__label">';
                  html += '            货主:';
                  html += '          </strong>';
                  html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                  html += '            ' + objMsg.owner + '';
                  html += '          </span>';
                  html += '        </div>';
                  if(type == 'unsale'){
                  html += '      <div class="c-assetPreviewParam">'
                  html += '        <strong class="c-assetPreviewParam__label">'
                  html += '         售价'
                  html += '        </strong>'
                  html += '         <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                  html += '            ' + salePrice + '';
                  html += '          </span>';
                  html += '        </div>';

                  }
                  if(type == 'buy'){
                    html += '      <div class="c-assetPreviewParam">'
                    html += '        <strong class="c-assetPreviewParam__label">'
                    html += '         售价'
                    html += '        </strong>'
                    html += '         <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                    html += '            ' + objMsg.quantity + '';
                    html += '          </span>';
                    html += '        </div>';
  
                  }
                  html += '      </asset-params>';
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';
                  html += ' </div>';


                  
                  html += ' <div class="spiedSection" id="salesHistory">';
                  html += ' <div class="msgline"></div>';
                  html += '       <asset-sales-history>';
                  html += '         <last-sales>';
                  html += '           <p class="c-assetPreview__title">';
                  html += '             最近交易';
                  html += '           </p>';
                  html += '           <table class="c-assetPreview__table" id="saleLastList">';
                  html += '<tr class="c-assetPreview__row--header">               <td class="c-assetPreview__cell">                 日期               </td>               <td class="c-assetPreview__cell">                 成交价               </td>             </tr>'
                  html += '<tr class="c-assetPreview__row">               <td class="c-assetPreview__cell">                 --               </td>               <td class="c-assetPreview__cell">                 -               </td>             </tr>'
    
                  html += '           </table>';
                  html += '         </last-sales>';
                  html += '       </asset-sales-history>';
                  html += '     </div>';
                  html += '</div>';


            
              html += '            </div>';
              html += '          </div>';
              html += '        </div>';
              html += '      </div>';
              html += '    </div>';
              html += '</div>';
                  return html;
                  break;
            case "sale1":
            case "unsale1":
            case "buy1":
                  var title = '';
                  if (type == 'sale') {
                        title = '上架物品';
                  } else if (type == 'unsale') {
                        title = '下架物品';
                  } else if (type == 'buy') {
                        title = '购买物品';
                  }
                  var obj = '';
                  if (itemMsg.itemProp) {
                        obj = JSON.parse(itemMsg.itemProp);
                  }
                  var html2 = '';
                  var html3 = '';
                  var string = itemMsg.owner;
                  var nickname = string;
                  var imgClass = '';
                  var gen = '';
                  if (itemMsg.category == "SKIN") {
                        imgClass = 'skinDetail';
                  }
                  if (string.length > 12) {
                        nickname = string.substring(0, 3) + "***" + string.substring(string.length - 7, string.length);
                  }
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '  <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '    <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '      <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '      <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer" tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '        <div>';
                  html += '          <div class="c-auth c-auth--dialog">';
                  html += '            <div class="c-auth__inner">';


                  html += '              <div class="c-authHeader c-authHeader--shadow">';
                  html += '                <h3 class="c-authHeader__title"><span>' + title + '</span></h3>';
                  html += '                <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '                data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '                  <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '                </button>';
                  html += '              </div>';



                  // html += '<div class="c-dialog__body c-dialog__body--preview">';
                  // html += '  <div class="c-assetPreview">';
                  // html += '    <div class="c-assetPreview__inner">';
                  // html += '      <div class="c-assetPreview__figure c-assetPreview__figure--csgo-skins">';
                  // html += '        <div class="u-game--csGo" style="color: rgb(176, 195, 217);position: relative;">';
                  // html += '          <img class="c-assetPreview__img" src="' + itemMsg.imageUrl + '" alt="Gamma 2 Case">';
                  // if(itemMsg.treasure){
                  //       html += '          <img src="images/treasure.png" alt="" style="width:36px;position: absolute;top:-18px;right:-18px;">';
                  // }
                  // html += '        </div>';
                  // html += '      </div>';
                  // html += '      <asset-action-button>';
                  // html += '        <div class="c-assetPreviewButtons">';



                  // html += '        </div>';
                  // html += '      </asset-action-button>';
                  // html += '    </div>';
                  // html += '    <div class="c-assetPreview__inner">';

                  // html += '      <h3 class="c-assetPreview__title" style="color:#3799c6;">';


                  // html += '    ' + itemMsg.name + '&nbsp;';

                  // if(itemMsg.promotionLevel){

                  //       html += '<b style="font-weight: bolder;"> +' + itemMsg.promotionLevel + '</b>';
                  // }
                  // html += '        <asset-mine-badge></asset-mine-badge>';
                  // html += '      </h3>';
                  // html += '      <h3 class="c-assetPreview__title" style="color:#8dd294;">货主：' + nickname + '</h3>';

                  // html += '        <div class="c-assetPreviewParam">';

                  // html += '          <strong class="c-assetPreview__title" style="color:#e5e519;">等级：';
                  // html += '               <span id="itemLevel">';
                  // if (itemMsg.itemCategory == "TAILSMANS") {
                  //       html += '~';
                  // } else {
                  //       html += itemMsg.itemLevel;
                  // }

                  // html += '               </span>';
                  // html += '          </strong>';

                  // html += '        </div>';

                  // html += '        <div class="c-assetPreviewParam">';
                  // html += '          <strong class="c-assetPreview__title" style="color:#e5e519;">数量：';
                  // html += '               <span id="itemLevel">';
                  // html += itemMsg.itemCount;
                  // html += '               </span>';
                  // html += '          </strong>';
                  // html += '        </div>';

                  // if (type == 'unsale' || type == 'buy') {
                  //       html += '      <asset-card-price>';
                  //       html += '        <div class="c-assetPreviewParam c-assetPreviewParam--market">';
                  //       // html += '          <strong class="c-assetPreviewParam__label">价格:</strong>';
                  //       html += '          <div class="c-assetPreviewParam__value">';
                  //       html += '            <asset-price-icon></asset-price-icon>';
                  //       html += '            <span class="c-assetPreviewParam__number c-assetPreview__title">';
                  //       html += '              <dm-currency-icon>';
                  //       html += '                <span class="o-currencies--USD"></span>';
                  //       html += '              </dm-currency-icon>' + itemMsg.price + '';
                  //       html += '            </span>';
                  //       html += '            <asset-discount-badge class=""></asset-discount-badge>';
                  //       html += '          </div>';
                  //       html += '        </div>';
                  //       html += '      </asset-card-price>';
                  // }

                  // if (obj) {
                  //       html += '      <asset-trade-lock>';
                  //       html += '        <div class="c-assetPreviewParam">';
                  //       html += '          <strong class="c-assetPreview__title" style="color:#e5e519;">基础属性:</strong>';
                  //       // html += '          <p class="c-assetPreviewParam__value">';c-assetPreview__title
                  //       html += '          <p style="line-height: 1.5;">';
                  //       for (i in obj) {
                  //             var data = getItemMsg(i);
                  //             if (data) {
                  //                   if (data.type == 0 && obj[i] > 0) {
                  //                         html += data.name + "：" + obj[i] + "  </br>";
                  //                   }
                  //                   if (data.type == 1 && obj[i] > 0) {
                  //                         html2 += data.name + "：" + obj[i] + "  </br>";
                  //                   }
                  //             } else if (i == "propSPECIAL") {
                  //                   // console.log("sjksjkjkjskk")
                  //                   var obj2 = obj[i];
                  //                   // console.log("obj2",obj2)
                  //                   for (j in obj2) {
                  //                         var data2 = getItemMsg(j);
                  //                         html3 += "[" + data2.name + "] " + data2.msg + " " + obj2[j].activeRate + " " + data2.msg2 + " " + obj2[j].effectRate + " " + data2.msg3;
                  //                   }
                  //                   // console.log("html3",html3)
                  //             }
                  //             // console.log(name,obj[i]);
                  //       }
                  //       html += '          </p>';
                  //       html += '          <p style="color:#1fcf3b;line-height: 1.5;">';
                  //       html += html2;
                  //       html += '          </p>';
                  //       html += '        </div>';
                  //       html += '      </asset-trade-lock>';
                  //       if (html3) {
                  //             html += '      <asset-trade-lock>';
                  //             html += '        <div class="c-assetPreviewParam">';
                  //             html += '          <strong class="c-assetPreview__title" style="color:#e5e519;line-height: 1.5;">特效：</strong>';
                  //             html += '          <p class="c-assetPreview__title" style="color:#dc7f0e;">';
                  //             html += html3;
                  //             html += '          </p>';
                  //             html += '        </div>';
                  //             html += '      </asset-trade-lock>';

                  //       }
                  // }


                  // if (itemMsg.itemCategory == "TAILSMANS") {
                  //       html += '        <div class="c-assetPreviewParam">';
                  //       html += '          <strong class="c-assetPreview__title" style="color:#e5e519;">七星属性：</strong>';
                  //       html += '          <p id="itemOtherMsg" class="c-assetPreview__title" style="line-height: 1.5;"></p>';
                  //       html += '        </div>';
                  // }



                  // html += '      <asset-params>';
                  // html += '        <div class="c-assetPreviewParam">';
                  // html += '               <span id="itemInfo" class="c-assetPreview__title">';
                  // if (itemMsg.itemCategory == "TAILSMANS") {
                  //       html += '~';
                  //       getXPetTailsman(itemMsg.itemId);
                  // } else {
                  //       html += itemMsg.info;
                  // }

                  // html += '               </span>';

                  // html += '        </div>';
                  // html += '      </asset-params>';

                  // html += '      <asset-quality-chart></asset-quality-chart>';
                  // html += '    </div>';
                  // html += '  </div>';
                  // html += '</div>';

                  html += '<div class="c-dialog__body c-dialog__body--preview" scrollspy="">';
                  html += '<div class="spiedSection" id="itemsDetails">';
                  html += '  <div class="c-assetPreview">';
                  html += '    <div class="c-assetPreview__inner">';
                  html += '      <div class="c-assetPreview__figure c-assetPreview__figure--dota2-skins">';

                  html += '<div style="flex:1;">';

                  if (itemMsg.marketCategory == 3) {
                        html += '        <div class="u-game--dota2" style="color: rgb(228, 174, 57);">';
                  } else {
                        html += '        <div class="flex" style="color: rgb(228, 174, 57);margin-bottom: 18px;">';
                  }


                  html += '         <div class="flex" style="position: relative;">';

                  html += '          <img class="c-assetPreview__img ' + imgClass + '" src="' + itemMsg.imageUrl + '" alt="">';


                  if (itemMsg.category == 'PET') {
                        html += '          <div style="width:80px;">';
                        html += '          </div>';

                        var petMsg = JSON.parse(itemMsg.meta);
                        $.each(petMsg, function(i, n) {
                              if (n.category == "SUMMARY") {
                                    html += '          <div style="position:absolute;bottom:10px;right:10px;">';
                                    html += '             <div class="shopWordMsgBox">';
                                    html += '               <span style="color:#89d295;font-size:19px;margin-right:5px;">Lv.</span>' + n.values.LEVEL + '';
                                    html += '             </div>';
                                    html += '          </div>';
                                    if (n.values.GENERATION) {
                                          gen = n.values.GENERATION;
                                          console.log(gen);
                                    }
                              }

                              if (n.category == "PROPERTY") {
                                    var LUCK = n.values.LUCK;
                                    var SEX = n.values.SEX;
                                    var VARIATION = n.values.VARIATION;
                                    if (VARIATION == "EVOLUTION") {
                                          html += '     <div style="position:absolute;bottom:95px;right:10px;color:#f29ded;font-weight: bolder;">变异</div>';
                                    }
                                    if (LUCK == "LUCKPET") {
                                          html += '          <img style="position:absolute;bottom:13px;left:-12px;z-index:1;" alt="" src="images/luck.png">';
                                    }
                                    // if(gen != 35){
                                    if (SEX == "BOY") {
                                          html += '          <div style="position:absolute;bottom:120px;right:4px;">';
                                          html += '               <svg t="1585018899207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1904" width="24" height="24"><path d="M424.111301 818.825061c-59.328223 0-115.140367-23.107277-157.101038-65.081251-86.620823-86.620823-86.620823-227.581252 0-314.215378 41.960671-41.973974 97.771791-65.081251 157.101038-65.081251 59.355853 0 115.140367 23.12058 157.101037 65.081251 41.960671 41.973974 65.081251 97.771791 65.081251 157.11434s-23.12058 115.140367-65.081251 157.101038-97.745185 65.081251-157.101037 65.081251z m0-360.620268c-36.97103 0-71.733765 14.409175-97.881285 40.543392-53.957913 53.984518-53.957913 141.804656 0 195.775872 26.14752 26.14752 60.910255 40.543392 97.881285 40.543391s71.733765-14.395872 97.881284-40.543391c26.14752-26.14752 40.543392-60.910255 40.543392-97.881285s-14.395872-71.733765-40.543392-97.894587c-26.146497-26.14752-60.909232-40.543392-97.881284-40.543392z" fill="#75B9EB" p-id="1906"></path><path d="M551.602973 511.016603c-10.715039 0-21.430078-4.090155-29.609365-12.269442-16.358573-16.358573-16.358573-42.874483 0-59.219753L672.577209 288.943808h-42.833551c-23.12058 0-41.878806-18.744923-41.878806-41.878806s18.758226-41.878806 41.878806-41.878806h143.958716c16.931624 0 32.200376 10.210549 38.689161 25.847691 6.488785 15.650445 2.889817 33.67189-9.078773 45.641503L581.212338 498.747161c-8.179286 8.179286-18.894326 12.269441-29.609365 12.269442z" fill="#75B9EB" p-id="1907"></path><path d="M773.703397 288.943808h-143.958716c-23.12058 0-41.878806-18.744923-41.878806-41.878806s18.758226-41.878806 41.878806-41.878806h143.958716c23.12058 0 41.878806 18.744923 41.878806 41.878806s-18.758226 41.878806-41.878806 41.878806z" fill="#75B9EB" p-id="1908"></path><path d="M779.864724 439.050548c-23.12058 0-41.878806-18.744923-41.878806-41.878806V253.226329c0-23.133883 18.758226-41.878806 41.878806-41.878807s41.878806 18.744923 41.878806 41.878807v143.945413c0 23.133883-18.758226 41.878806-41.878806 41.878806z" fill="#75B9EB" p-id="1909"></path><path d="M779.864724 439.050548c-23.12058 0-41.878806-18.744923-41.878806-41.878806V253.226329c0-23.133883 18.758226-41.878806 41.878806-41.878807s41.878806 18.744923 41.878806 41.878807v143.945413c0 23.133883-18.758226 41.878806-41.878806 41.878806z" fill="#75B9EB" p-id="1910"></path></svg>';
                                          html += '          </div>';
                                    } else {
                                          html += '          <div style="position:absolute;bottom:120px;right:4px;">';
                                          html += '               <svg t="1585018755465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1715" width="24" height="24"></path><path d="M510.87948 578.902736c-123.673717 0-224.282113-100.607372-224.282113-224.282113s100.607372-224.282113 224.282113-224.282113 224.282113 100.607372 224.282112 224.282113-100.608396 224.282113-224.282112 224.282113z m0-364.80559c-77.486792 0-140.523477 63.036685-140.523477 140.523477s63.036685 140.523477 140.523477 140.523477 140.523477-63.036685 140.523477-140.523477-63.036685-140.523477-140.523477-140.523477z" fill="#FF3EC9" p-id="1717"></path><path d="M510.87948 896.635217c-23.12058 0-41.878806-18.744923-41.878806-41.878806V537.02393c0-23.133883 18.758226-41.878806 41.878806-41.878806s41.878806 18.744923 41.878806 41.878806v317.732481c0 23.133883-18.758226 41.878806-41.878806 41.878806z" fill="#FF3EC9" p-id="1718"></path><path d="M669.752884 737.762837H352.033705c-23.12058 0-41.878806-18.744923-41.878806-41.878806s18.758226-41.878806 41.878806-41.878807h317.719179c23.12058 0 41.878806 18.744923 41.878806 41.878807s-18.758226 41.878806-41.878806 41.878806z" fill="#FF3EC9" p-id="1719"></path></svg>';
                                          html += '          </div>';
                                    }
                                    // }

                              }

                        })


                  }
                  // switch(itemMsg.game){
                  //       case "IOST":
                  //             html += '          <div style="width:80px;">';
                  //             html += '          </div>';
                  //             break;
                  //       default:

                  // }
                  if(itemMsg.category == 'ITEM' || itemMsg.game == "IOST" || itemMsg.category == "WORLD"){

                        html += '          <div style="width:36px;">';
                        html += '          </div>';
                  }
                  if(itemMsg.category == 'TAILSMAN'){

                        var petMsg = JSON.parse(itemMsg.meta);
                        $.each(petMsg, function(i, n) {
                              if (n.category == "SUMMARY") {
                                    html += '          <div style="position:absolute;bottom:10px;right:10px;">';
                                    html += '             <div class="shopWordMsgBox">';
                                    html += '               <span style="color:#89d295;font-size:19px;margin-right:5px;">Lv.</span>' + n.values.LEVEL + '';
                                    html += '             </div>';
                                    html += '          </div>';
                              }
                        })
                        html += '          <div style="width:80px;">';
                        html += '          </div>';
                  }
                  if (itemMsg.migrate == true) {
                        html += '     <div style="position:absolute;bottom:60px;right:8px;color: #E91E63;font-weight: bolder;border: 2px solid #E91E63;padding: 3px;">移</div>';
                  }
                  if (itemMsg.lock == true) {
                        html += '          <div style="position:absolute;bottom:60px;right:10px;">';
                        html += '               <svg width="15" height="20" viewBox="0 0 9 12" xmlns="http://www.w3.org/2000/svg"><path d="M8.747 4.5h-.75V3.498A3.503 3.503 0 0 0 4.5 0 3.503 3.503 0 0 0 1 3.499v1H.25A.251.251 0 0 0 0 4.75V11C0 11.55.448 12 1 12h7c.55 0 1-.448 1-1V4.75a.255.255 0 0 0-.253-.25zm-3.5 5.22a.25.25 0 0 1-.064.194.246.246 0 0 1-.185.085h-1a.246.246 0 0 1-.186-.085.258.258 0 0 1-.063-.194l.157-1.418a.99.99 0 0 1-.41-.803 1.002 1.002 0 0 1 2.001 0 .983.983 0 0 1-.41.803l.16 1.418zm1.25-5.22H2.5V3.498a2 2 0 0 1 1.999-2c1.101 0 1.999.898 1.999 2v1z" fill="#848484"></path></svg>';
                        html += '          </div>';
                  }
                  html += '         </div>';
                  html += '        </div>';

                  //price show
                  if (type != 'sale') { 
                        html += '   <div class="flex" style="margin-bottom:18px;">';
                        html += '         <div class="shopWordMsgBox flex">';

                        html += '               <div style="margin-right:7px;">';

                        if (itemMsg.assetType == "EOSNFT") {
                              html += '          <svg t="1566445356488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2277" width="28" height="28">';
                              html += '            <path d="M942.427421 234.839536a17.254917 17.254917 0 1 0-28.988261 18.715833 475.626037 475.626037 0 0 1 76.013661 258.559181c0 263.229511-214.145024 477.386038-477.386038 477.386038s-477.386038-214.156527-477.386038-477.386038 214.145024-477.386038 477.386038-477.386039a475.683553 475.683553 0 0 1 166.659492 29.908523 17.254917 17.254917 0 0 0 12.055436-32.335714 511.964892 511.964892 0 1 0 251.64571 202.538216z" fill="#89d295" p-id="2278"></path>';
                              html += '            <path d="M796.059711 128.365195a482.807533 482.807533 0 0 1 34.969965 28.562639 17.254917 17.254917 0 1 0 23.064073-25.663813c-11.963409-10.755565-24.571002-21.050999-37.47768-30.621726a17.256067 17.256067 0 1 0-20.556358 27.7229zM385.496215 534.22385L261.088263 751.647308l242.144003 144.12457-117.736051-361.548028zM257.614273 707.187138l117.402456-205.172466-42.32056-129.964036-75.081896 335.136502zM621.370931 503.65964l-108.671467-191.736638-110.385456 192.898469 110.523495 339.381212 108.533428-340.543043zM689.332298 373.074428l-40.721605 127.755406 116.447684 205.460049-75.726079-333.215455zM638.223233 533.407117L522.868361 895.35776l239.072628-143.664439L638.223233 533.407117zM673.423264 340.336099L525.514115 130.263235v153.361703l106.232773 187.457419 41.676376-130.746258zM500.413963 282.865722V129.29696L348.708732 340.175053l43.125789 132.448743 108.579442-189.758074z" fill="#89d295" p-id="2279"></path>';
                              html += '          </svg>';

                        } else if (itemMsg.assetType == "IOSTNFT") {

                              html += '          <svg t="1584015159513" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1857" width="28" height="28">';
                              html += '                <path d="M512.7 1022.5c-68.8 0-135.6-13.5-198.5-40.1-60.7-25.7-115.3-62.5-162.1-109.3C105.2 826.3 68.4 771.7 42.7 711c-26.6-62.9-40-129.7-40-198.5 0-68.8 13.5-135.6 40.1-198.5 25.7-60.7 62.5-115.3 109.3-162.1s101.3-83.7 162-109.4c62.9-26.6 129.7-40 198.6-40S648.3 16 711.2 42.6c60.7 25.7 115.3 62.5 162.1 109.3S956.9 253.3 982.6 314c26.6 62.9 40.1 129.7 40.1 198.5 0 68.8-13.5 135.6-40.1 198.5-25.7 60.7-62.5 115.3-109.3 162.1s-101.4 83.6-162.1 109.3c-62.9 26.6-129.7 40.1-198.5 40.1z m0-980c-259.2 0-470 210.8-470 470s210.8 470 470 470 470-210.8 470-470-210.9-470-470-470z" fill="#89d295" p-id="1858"></path>';
                              html += '                <path d="M520.2 193.3l286.5 165-61.5 48-225-132-160.4 100.5 88.5 59 52.7-30.9 62.7 34.9-43.5 36 54 37.4 45-28.4 58.5 28.8-45 31.1 198 105-304.5 183-332.9-186v-85.5L512 746.7l177.7-99.9-106.5-65.1-43.5 30-65.9-40.5 38.2-24-62.4-40-32.5 24.8-70.8-41.2 34.5-21.5-169.5-91.5z" fill="#89d295" p-id="1859"></path>';
                              html += '          </svg>';

                        } else {
                              html += '<span class="o-currencies--USD"></span>';
                        }


                        html += '               </div>';
                        html += '               <span>' + itemMsg.salePrice + '</span>';



                        html += '         </div>';
                        html += '   </div>';

                  }

                  //button show
                  if (type == 'sale') {
                        var string = '';
                        if (getCookie("customerType") == "EOS") {
                              string = 'EOS';
                        } else if (getCookie("customerType") == "IOST") {
                              string = 'IOST';
                        } else {
                              switch (itemMsg.assetType) {
                                    case "IOSTNFT":
                                          string = 'IOST';
                                          break;
                                    case "EOSNFT":
                                          string = 'EOS';
                                          break;
                                    default:
                                          string = '￥';

                              }

                        }
                        if (itemMsg.itemCount > 1) {
                              html += '                  <div appearance="fill" class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-invalid mat-form-field-hide-placeholder">';

                              html += '                    <div class="mat-form-field-wrapper" style="margin: 0 auto;width: 400px;">';
                              html += '                      <div class="mat-form-field-flex" style="padding-top: 0;">';
                              html += '                        <input type="text" id="lootOnsaleNum" placeholder="请输入上架数量" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="6">';
                              html += '                        <span style="padding-left: 15px;">个</span>';
                              html += '                      </div>';
                              html += '                    </div>';
                              html += '                  </div>';
                        }
                        html += '                  <div appearance="fill" class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-invalid mat-form-field-hide-placeholder">';

                        html += '                    <div class="mat-form-field-wrapper" style="margin: 0 auto;">';
                        html += '                      <div class="mat-form-field-flex" style="padding-top: 0;">';
                        html += '                        <input type="text" id="lootNum" placeholder="请输入出售金额" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="11">';

                        html += '                        <span style="padding-left: 15px;">' + string + '</span>';

                        html += '                      </div>';
                        html += '                    </div>';



                        html += '                  </div>';

                        if (getCookie("customerType") != "PC") {
                              switch(itemMsg.game){
                                    case "XPET":
                                          html += '               <div class="flex" style="margin:0 auto;width:100%;">';
                                          html += '                  <div style="margin:0 auto;flex:1;" onclick="transferAssetShow()">';
                                          html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                                          html += '                    <svg t="1584364466165" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1673" width="24" height="24"><path d="M725.333333 377.2672V443.733333H298.666667v-68.266666h330.837333L554.666667 296.891733l47.104-49.493333 121.856 128h1.706666v1.800533zM298.666667 646.7328V580.266667h426.666666v68.266666H394.496L469.333333 727.108267l-47.104 49.493333-121.856-128H298.666667v-1.800533z" fill="#ffffff" p-id="1674"></path><path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 68.266667a443.733333 443.733333 0 1 0 443.733333 443.733333A443.733333 443.733333 0 0 0 512 68.266667z" fill="#ffffff" p-id="1675"></path></svg>';
                                          html += '                      &nbsp;&nbsp;&nbsp;<span>转账</span>';
                                          html += '                    </button>';
                                          html += '                  </div>';
                                          html += '                  <div style="margin:0 auto;margin-left: 10px;flex:1;" onclick="migrateAssetShow()">';
                                          html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                                          html += '                    <svg t="1584364466165" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1673" width="24" height="24"><path d="M725.333333 377.2672V443.733333H298.666667v-68.266666h330.837333L554.666667 296.891733l47.104-49.493333 121.856 128h1.706666v1.800533zM298.666667 646.7328V580.266667h426.666666v68.266666H394.496L469.333333 727.108267l-47.104 49.493333-121.856-128H298.666667v-1.800533z" fill="#ffffff" p-id="1674"></path><path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 68.266667a443.733333 443.733333 0 1 0 443.733333 443.733333A443.733333 443.733333 0 0 0 512 68.266667z" fill="#ffffff" p-id="1675"></path></svg>';
                                          html += '                      &nbsp;&nbsp;&nbsp;<span>转链</span>';
                                          html += '                    </button>';
                                          html += '                  </div>';
                                          html += '               </div>';
                                          html += '               <div class="flex" style="margin:10px auto 0;width:100%;">';
                                          html += '                  <div style="margin: 0 auto;flex:1;" onclick="saleGo()">';
                                          html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                                          html += '                    <svg t="1566885363220" class="mat-icon notranslate material-icons mat-icon-no-color" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2873" width="32" height="32"><path d="M207.977931 224.750345l63.770483 387.001379c9.463172 0.494345 18.996966 1.377103 28.495448 1.377104 180.082759 0.070621 360.236138 0.070621 540.354207 0 36.687448 0 45.479724-10.840276 50.846897-47.492414 13.135448-89.935448 28.460138-179.553103 43.04331-269.27669 2.295172-14.230069 6.426483-28.177655 8.015448-42.443034 2.471724-22.457379-11.581793-28.848552-30.861241-28.848552l-140.958897-0.105931h-33.82731l13.170758-54.448552c63.134897 0 124.433655-1.588966 185.661794 0.494345 52.082759 1.730207 73.092414 46.150621 66.030344 92.513103-17.302069 112.993103-35.239724 225.880276-53.106758 338.802759-6.426483 40.536276-43.926069 69.067034-91.171311 69.102345-180.118069 0.141241-360.236138 0.105931-540.354206 0.105931H278.528c5.014069 25.423448 6.355862 48.128 14.795034 67.795862 3.495724 8.262621 21.857103 14.124138 33.544828 14.265379 144.843034 0.918069 289.721379 0.600276 434.599724 0.600276 41.101241 0 82.237793-0.529655 123.339035 0.353104 11.369931 0.211862 24.011034 2.118621 33.474207 7.768275 6.814897 4.06069 13.029517 15.713103 12.570482 23.587311-0.459034 7.556414-8.403862 17.054897-15.642482 21.256827-7.768276 4.519724-18.46731 5.190621-27.895173 5.190621-186.968276 0.176552-373.936552 0.211862-560.904827-0.211862-59.42731-0.141241-82.802759-22.598621-92.513104-81.284414-26.765241-162.78069-54.978207-325.278897-81.849379-488.024276-9.922207-60.027586-17.690483-120.302345-26.871173-183.260689-24.964414 0-47.315862 0.776828-69.561379-0.211862C35.098483 58.473931 13.382621 52.753655 14.441931 27.895172 15.32469 5.579034 34.392276-0.176552 55.366621 1.024c17.584552 0.98869 35.275034 0.141241 52.894896 0.176552 42.160552 0 73.551448 29.095724 77.259035 70.514758 1.377103 15.430621 4.802207 30.72 6.991448 46.115311 2.118621 15.148138 3.884138 30.366897 6.073379 47.527724h214.828138l13.876966 59.392H207.977931z" fill="#ffffff" p-id="2874"></path><path d="M609.103448 195.901793v208.295724c0 7.838897 0.176552 15.677793-0.105931 23.51669-0.741517 20.126897-11.122759 36.228414-30.649379 36.263724-20.374069 0.070621-29.025103-16.948966-29.025104-37.075862 0.03531-67.513379-0.03531-135.062069-0.07062-202.610759v-30.967172c-13.488552 12.958897-20.833103 25.035034-31.143724 28.601379-11.828966 4.06069-28.813241 4.766897-38.523587-1.235862-5.437793-3.354483-5.826207-27.365517 0.353104-34.957241 25.035034-30.649379 51.694345-60.663172 81.814069-86.157242 8.15669-6.850207 35.063172-2.259862 45.585655 6.461794 25.282207 21.009655 45.267862 48.16331 68.64331 71.609379 14.406621 14.477241 21.751172 29.943172 6.002759 45.373793-16.489931 16.172138-32.556138 6.708966-44.526345-8.686345-6.532414-8.403862-10.981517-18.46731-16.384-27.789241l-11.970207 9.357241M253.316414 923.012414c0-36.652138 31.390897-68.678621 67.442758-68.890483 36.369655-0.211862 67.866483 30.366897 67.442759 65.50069-0.529655 42.160552-28.177655 69.561379-68.325517 70.196965-30.013793 0.423724-70.973793-34.992552-66.56-66.807172M838.62069 989.501793c-35.310345 0.388414-67.195586-30.225655-67.654621-64.935724-0.564966-38.700138 30.825931-71.150345 68.113655-70.444138 35.486897 0.706207 65.324138 29.484138 66.136276 63.805793 0.918069 41.595586-26.518069 71.115034-66.56 71.574069" fill="#ffffff" p-id="2875"></path></svg>';
                                          html += '                      &nbsp;&nbsp;&nbsp;<span>出售</span>';
                                          html += '                    </button>';
                                          html += '                  </div>';
                                          html += '               </div>';
                                          break;
                                    default:
                                          html += '               <div class="flex" style="margin:0 auto;width:100%;">';
                                          html += '                  <div style="margin:0 auto;flex:1;" onclick="transferAssetShow()">';
                                          html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                                          html += '                    <svg t="1584364466165" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1673" width="24" height="24"><path d="M725.333333 377.2672V443.733333H298.666667v-68.266666h330.837333L554.666667 296.891733l47.104-49.493333 121.856 128h1.706666v1.800533zM298.666667 646.7328V580.266667h426.666666v68.266666H394.496L469.333333 727.108267l-47.104 49.493333-121.856-128H298.666667v-1.800533z" fill="#ffffff" p-id="1674"></path><path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 68.266667a443.733333 443.733333 0 1 0 443.733333 443.733333A443.733333 443.733333 0 0 0 512 68.266667z" fill="#ffffff" p-id="1675"></path></svg>';
                                          html += '                      &nbsp;&nbsp;&nbsp;<span>转账</span>';
                                          html += '                    </button>';
                                          html += '                  </div>';
                                          html += '                  <div style="margin:0 auto;margin-left: 10px;flex:1;" onclick="saleGo()">';
                                          html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                                          html += '                    <svg t="1566885363220" class="mat-icon notranslate material-icons mat-icon-no-color" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2873" width="32" height="32"><path d="M207.977931 224.750345l63.770483 387.001379c9.463172 0.494345 18.996966 1.377103 28.495448 1.377104 180.082759 0.070621 360.236138 0.070621 540.354207 0 36.687448 0 45.479724-10.840276 50.846897-47.492414 13.135448-89.935448 28.460138-179.553103 43.04331-269.27669 2.295172-14.230069 6.426483-28.177655 8.015448-42.443034 2.471724-22.457379-11.581793-28.848552-30.861241-28.848552l-140.958897-0.105931h-33.82731l13.170758-54.448552c63.134897 0 124.433655-1.588966 185.661794 0.494345 52.082759 1.730207 73.092414 46.150621 66.030344 92.513103-17.302069 112.993103-35.239724 225.880276-53.106758 338.802759-6.426483 40.536276-43.926069 69.067034-91.171311 69.102345-180.118069 0.141241-360.236138 0.105931-540.354206 0.105931H278.528c5.014069 25.423448 6.355862 48.128 14.795034 67.795862 3.495724 8.262621 21.857103 14.124138 33.544828 14.265379 144.843034 0.918069 289.721379 0.600276 434.599724 0.600276 41.101241 0 82.237793-0.529655 123.339035 0.353104 11.369931 0.211862 24.011034 2.118621 33.474207 7.768275 6.814897 4.06069 13.029517 15.713103 12.570482 23.587311-0.459034 7.556414-8.403862 17.054897-15.642482 21.256827-7.768276 4.519724-18.46731 5.190621-27.895173 5.190621-186.968276 0.176552-373.936552 0.211862-560.904827-0.211862-59.42731-0.141241-82.802759-22.598621-92.513104-81.284414-26.765241-162.78069-54.978207-325.278897-81.849379-488.024276-9.922207-60.027586-17.690483-120.302345-26.871173-183.260689-24.964414 0-47.315862 0.776828-69.561379-0.211862C35.098483 58.473931 13.382621 52.753655 14.441931 27.895172 15.32469 5.579034 34.392276-0.176552 55.366621 1.024c17.584552 0.98869 35.275034 0.141241 52.894896 0.176552 42.160552 0 73.551448 29.095724 77.259035 70.514758 1.377103 15.430621 4.802207 30.72 6.991448 46.115311 2.118621 15.148138 3.884138 30.366897 6.073379 47.527724h214.828138l13.876966 59.392H207.977931z" fill="#ffffff" p-id="2874"></path><path d="M609.103448 195.901793v208.295724c0 7.838897 0.176552 15.677793-0.105931 23.51669-0.741517 20.126897-11.122759 36.228414-30.649379 36.263724-20.374069 0.070621-29.025103-16.948966-29.025104-37.075862 0.03531-67.513379-0.03531-135.062069-0.07062-202.610759v-30.967172c-13.488552 12.958897-20.833103 25.035034-31.143724 28.601379-11.828966 4.06069-28.813241 4.766897-38.523587-1.235862-5.437793-3.354483-5.826207-27.365517 0.353104-34.957241 25.035034-30.649379 51.694345-60.663172 81.814069-86.157242 8.15669-6.850207 35.063172-2.259862 45.585655 6.461794 25.282207 21.009655 45.267862 48.16331 68.64331 71.609379 14.406621 14.477241 21.751172 29.943172 6.002759 45.373793-16.489931 16.172138-32.556138 6.708966-44.526345-8.686345-6.532414-8.403862-10.981517-18.46731-16.384-27.789241l-11.970207 9.357241M253.316414 923.012414c0-36.652138 31.390897-68.678621 67.442758-68.890483 36.369655-0.211862 67.866483 30.366897 67.442759 65.50069-0.529655 42.160552-28.177655 69.561379-68.325517 70.196965-30.013793 0.423724-70.973793-34.992552-66.56-66.807172M838.62069 989.501793c-35.310345 0.388414-67.195586-30.225655-67.654621-64.935724-0.564966-38.700138 30.825931-71.150345 68.113655-70.444138 35.486897 0.706207 65.324138 29.484138 66.136276 63.805793 0.918069 41.595586-26.518069 71.115034-66.56 71.574069" fill="#ffffff" p-id="2875"></path></svg>';
                                          html += '                      &nbsp;&nbsp;&nbsp;<span>出售</span>';
                                          html += '                    </button>';
                                          html += '                  </div>';
                                          html += '               </div>';

                              }
                        }else{
                              html += '               <div class="flex" style="margin:10px auto 0;width:100%;">';
                              html += '                  <div style="margin: 0 auto;flex:1;" onclick="saleGo()">';
                              html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                              html += '                    <svg t="1566885363220" class="mat-icon notranslate material-icons mat-icon-no-color" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2873" width="32" height="32"><path d="M207.977931 224.750345l63.770483 387.001379c9.463172 0.494345 18.996966 1.377103 28.495448 1.377104 180.082759 0.070621 360.236138 0.070621 540.354207 0 36.687448 0 45.479724-10.840276 50.846897-47.492414 13.135448-89.935448 28.460138-179.553103 43.04331-269.27669 2.295172-14.230069 6.426483-28.177655 8.015448-42.443034 2.471724-22.457379-11.581793-28.848552-30.861241-28.848552l-140.958897-0.105931h-33.82731l13.170758-54.448552c63.134897 0 124.433655-1.588966 185.661794 0.494345 52.082759 1.730207 73.092414 46.150621 66.030344 92.513103-17.302069 112.993103-35.239724 225.880276-53.106758 338.802759-6.426483 40.536276-43.926069 69.067034-91.171311 69.102345-180.118069 0.141241-360.236138 0.105931-540.354206 0.105931H278.528c5.014069 25.423448 6.355862 48.128 14.795034 67.795862 3.495724 8.262621 21.857103 14.124138 33.544828 14.265379 144.843034 0.918069 289.721379 0.600276 434.599724 0.600276 41.101241 0 82.237793-0.529655 123.339035 0.353104 11.369931 0.211862 24.011034 2.118621 33.474207 7.768275 6.814897 4.06069 13.029517 15.713103 12.570482 23.587311-0.459034 7.556414-8.403862 17.054897-15.642482 21.256827-7.768276 4.519724-18.46731 5.190621-27.895173 5.190621-186.968276 0.176552-373.936552 0.211862-560.904827-0.211862-59.42731-0.141241-82.802759-22.598621-92.513104-81.284414-26.765241-162.78069-54.978207-325.278897-81.849379-488.024276-9.922207-60.027586-17.690483-120.302345-26.871173-183.260689-24.964414 0-47.315862 0.776828-69.561379-0.211862C35.098483 58.473931 13.382621 52.753655 14.441931 27.895172 15.32469 5.579034 34.392276-0.176552 55.366621 1.024c17.584552 0.98869 35.275034 0.141241 52.894896 0.176552 42.160552 0 73.551448 29.095724 77.259035 70.514758 1.377103 15.430621 4.802207 30.72 6.991448 46.115311 2.118621 15.148138 3.884138 30.366897 6.073379 47.527724h214.828138l13.876966 59.392H207.977931z" fill="#ffffff" p-id="2874"></path><path d="M609.103448 195.901793v208.295724c0 7.838897 0.176552 15.677793-0.105931 23.51669-0.741517 20.126897-11.122759 36.228414-30.649379 36.263724-20.374069 0.070621-29.025103-16.948966-29.025104-37.075862 0.03531-67.513379-0.03531-135.062069-0.07062-202.610759v-30.967172c-13.488552 12.958897-20.833103 25.035034-31.143724 28.601379-11.828966 4.06069-28.813241 4.766897-38.523587-1.235862-5.437793-3.354483-5.826207-27.365517 0.353104-34.957241 25.035034-30.649379 51.694345-60.663172 81.814069-86.157242 8.15669-6.850207 35.063172-2.259862 45.585655 6.461794 25.282207 21.009655 45.267862 48.16331 68.64331 71.609379 14.406621 14.477241 21.751172 29.943172 6.002759 45.373793-16.489931 16.172138-32.556138 6.708966-44.526345-8.686345-6.532414-8.403862-10.981517-18.46731-16.384-27.789241l-11.970207 9.357241M253.316414 923.012414c0-36.652138 31.390897-68.678621 67.442758-68.890483 36.369655-0.211862 67.866483 30.366897 67.442759 65.50069-0.529655 42.160552-28.177655 69.561379-68.325517 70.196965-30.013793 0.423724-70.973793-34.992552-66.56-66.807172M838.62069 989.501793c-35.310345 0.388414-67.195586-30.225655-67.654621-64.935724-0.564966-38.700138 30.825931-71.150345 68.113655-70.444138 35.486897 0.706207 65.324138 29.484138 66.136276 63.805793 0.918069 41.595586-26.518069 71.115034-66.56 71.574069" fill="#ffffff" p-id="2875"></path></svg>';
                              html += '                      &nbsp;&nbsp;&nbsp;<span>出售</span>';
                              html += '                    </button>';
                              html += '                  </div>';
                              html += '               </div>';
                        }
                  } else if (type == 'unsale') {
                        html += '                  <div style="margin: 0 auto;" onclick="unsaleGo()">';
                        html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                        html += '                    <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566885351029" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2110" width="32" height="32"><path d="M709.12 883.2a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM320 883.2a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM949.243 268.954l15.293-61.169h-171.52v61.44h92.724L802.227 590.08H342.441l-54.18-320.855H409.6v-61.44H277.883l-11.812-69.97h0.169L256 76.375H58.88v61.44h144.876L312.32 780.703v3.937h517.12l20.48-61.44H364.923l-12.104-71.68H849.92v-0.768l99.38-381.783z" fill="#ffffff" p-id="2111"></path><path d="M751.078 355.999L621.583 531.738h-55.5l-129.495-175.74h55.495l78.454 106.466V198.743h46.254v264.192l78.792-106.936z" fill="#ffffff" p-id="2112"></path></svg>';
                        html += '                      &nbsp;&nbsp;&nbsp;<span>下架</span>';
                        html += '                    </button>';
                        html += '                  </div>';
                  } else if (type == 'buy') {
                        html += '                    <div style="margin: 0 auto;" onclick="buyGoShow()">';
                        html += '                      <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit">';
                        html += '                      <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566887889666" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3003" width="32" height="32"><path d="M443.6 755.001c-2.7-3.961-5.76-7.561-9.36-11.161-7.2-7.2-15.3-12.599-24.119-16.199-9.54-3.6-19.44-5.401-29.52-5.401-2.34 0-4.86 0.18-7.561 0.54-2.7 0.361-5.22 0.54-7.561 0.9-2.34 0.361-4.681 0.9-7.2 1.801-2.34 0.9-4.86 1.62-7.2 2.16-3.060 1.26-5.94 2.7-9.001 4.5l-7.2 5.401c-3.060 1.801-5.58 3.961-8.1 6.3-3.6 3.6-6.66 7.38-9.36 11.161-2.7 3.961-4.86 7.92-6.66 12.060-3.6 9.54-5.401 19.26-5.401 29.159s1.801 19.26 5.401 28.26c3.6 8.279 9.001 16.38 16.201 24.119 7.2 6.48 15.3 11.881 24.121 16.201 9.001 3.6 18.72 5.401 29.52 5.401 10.080 0 19.799-1.98 29.159-5.76 9.18-3.959 17.46-9.18 24.66-15.66 7.2-7.74 12.601-15.84 16.201-24.121 4.14-9.001 6.3-18.361 6.3-28.26s-2.16-19.62-6.3-29.161c-2.16-4.32-4.5-8.46-7.020-12.24zM907.46 290.060c-1.801-3.060-4.14-5.58-7.2-8.1-3.060-2.34-6.48-4.5-10.8-6.3-8.279-4.14-20.34-6.3-35.82-6.3h-554.759l-4.5-30.42-3.6-23.22v-4.32c-1.26-6.48-2.16-10.98-2.7-13.5l-4.5-14.4c-1.26-4.679-3.6-9.9-7.2-15.12-2.34-2.34-4.86-4.5-7.561-6.3s-5.58-3.6-8.46-5.401c-6.48-3.060-15.12-4.5-25.92-4.5h-82.26c-5.94 0-11.34 0.9-16.199 2.7s-9.18 4.14-13.5 7.2c-7.2 7.2-10.8 16.201-10.8 26.82 0 2.34 0.18 5.040 0.361 8.1 0.361 3.060 0.72 5.94 1.44 9.001 0.54 3.060 1.62 5.94 3.060 9.001 1.44 3.060 2.88 6.3 3.959 9.9 4.14 5.399 9.001 10.080 14.4 14.4 4.86 3.6 11.34 5.401 19.62 5.401h60.841l34.919 179.82 13.5 68.94 11.7 61.74 9.001 45.719 4.5 23.22c1.26 5.94 3.239 14.58 6.3 25.92 1.801 4.86 3.78 9.18 5.76 13.5 2.16 4.14 4.32 8.1 6.66 11.7 4.679 7.74 10.8 14.039 17.82 18.72 2.34 1.801 4.86 3.060 7.561 3.961 2.7 0.9 5.76 1.62 9.001 2.16 3.239 0.54 6.66 0.9 10.26 0.9h424.98c15.481 0 25.74-3.961 30.42-11.7 5.399-7.74 8.1-16.921 8.1-27.719 0-22.14-13.14-33.12-39.42-33.12h-407.7l-12.599-71.639h425.881c15.479 0 28.62-4.14 39.42-12.601 5.401-4.14 10.26-9.9 14.759-17.46 4.5-7.38 8.46-16.201 12.060-26.46 1.801-5.399 6.48-19.44 14.4-42.119l18.72-52.74 17.1-49.14 10.8-29.52c0.54-1.801 1.079-3.6 1.44-5.401s0.54-3.78 0.9-5.76c0.361-2.16 0.54-4.32 0.54-6.66 0.361-6.66-1.079-12.96-4.679-18.9zM771.561 745.639c-6.48-7.2-14.58-12.601-24.121-16.201-4.681-1.801-9.719-3.060-14.759-3.961-5.040-0.9-10.080-1.44-14.761-1.44-3.6 0-7.020 0.18-10.26 0.54-3.241 0.361-6.48 0.9-9.9 1.801-3.239 0.9-6.48 1.98-9.36 3.060-4.14 1.801-8.279 3.961-12.601 6.66-4.14 2.7-7.74 5.76-10.8 9.36-7.2 7.2-12.601 14.94-16.201 23.22-2.34 4.679-3.961 9.54-4.86 14.4-0.9 4.679-1.44 9.54-1.44 14.4 0 10.080 2.16 19.62 6.3 28.62 3.6 8.279 9.001 16.38 16.201 24.121 5.94 5.94 13.68 10.98 23.22 15.12 9.001 4.14 18.72 6.3 29.52 6.3s20.521-2.16 29.52-6.3c9.54-3.6 17.639-8.64 24.121-15.12 7.2-7.74 12.78-15.84 16.921-24.121 1.801-4.14 3.060-8.82 3.959-13.86s1.44-10.080 1.44-14.759c0-10.080-1.801-19.62-5.401-28.62-3.959-8.46-9.721-16.201-16.74-23.22z" fill="#ffffff" p-id="3004"></path><path d="M545.66 499.94l118.8-133.92-19.44-21.42-101.161 87.84-47.34-36.359-18.54 21.239 67.68 82.62z" fill="#ffffff" p-id="3005"></path></svg>';
                        html += '                        &nbsp;&nbsp;&nbsp;<span>购买</span>';
                        html += '                      </button>';
                        html += '                    </div>';
                  }



                  html += '        </div>';
                  html += '      </div>';

                  // html += '      <asset-action-button>';
                  // html += '        <div class="c-assetPreviewButtons">';
                  // html += '          <div class="c-assetPreviewButtons__item">';
                  // html += '            <a class="c-assetPreviewButtons__button mat-flat-button" >';
                  // html += '              <span class="mat-button-wrapper">';
                  // html += '                View at Steam';
                  // html += '              </span>';
                  // html += '              <div class="mat-button-ripple mat-ripple" matripple="">';
                  // html += '              </div>';
                  // html += '              <div class="mat-button-focus-overlay">';
                  // html += '              </div>';
                  // html += '            </a>';
                  // html += '          </div>';
                  // html += '        </div>';
                  // html += '      </asset-action-button>';
                  html += '    </div>';
                  html += '    <div class="c-assetPreview__inner">';
                  html += '      <h3 class="c-assetPreview__title">';
                  html += '        ' + itemMsg.name + '&nbsp';
                  html += '      </h3>';
                  if (itemMsg.meta) {
                        $.each(JSON.parse(itemMsg.meta), function(i, n) {
                              if (n.category == "SUMMARY") {
                                    if (n.values.SN) {
                                          html += '        <div class="c-assetPreviewParam">';
                                          html += '          <strong class="c-assetPreviewParam__label">';
                                          html += '            编号:';
                                          html += '          </strong>';
                                          html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                                          html += '            ' + n.values.SN + '';
                                          html += '          </span>';
                                          html += '        </div>';

                                    }
                                    switch(itemMsg.category){
                                          case "ITEM":
                                          case "SKIN":
                                                html += '        <div class="c-assetPreviewParam">';
                                                html += '          <strong class="c-assetPreviewParam__label">';
                                                html += '            等级:';
                                                html += '          </strong>';
                                                html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                                                html += '            ' + getRareType(n.values.RARE) + '';
                                                html += '          </span>';
                                                html += '        </div>';
                                                break;
                                          case "TAILSMAN":
                                                // html += '        <div class="c-assetPreviewParam">';
                                                // html += '          <strong class="c-assetPreviewParam__label">';
                                                // html += '            等级:';
                                                // html += '          </strong>';
                                                // html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                                                // html += '            ' + getRareType(n.values.RARE) + '';
                                                // html += '          </span>';
                                                // html += '        </div>';
                                                break;


                                          default:
                                                if(itemMsg.game == "IOST"){
                                                      html += '        <div class="c-assetPreviewParam">';
                                                      html += '          <strong class="c-assetPreviewParam__label">';
                                                      html += '            类型:';
                                                      html += '          </strong>';
                                                      html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                                                      html += '            ' + itemMsg.category + '';
                                                      html += '          </span>';
                                                      html += '        </div>';
                                                }else{
                                                      var score =  n.values.SCORE || '未知参数';
                                                      html += '        <div class="c-assetPreviewParam">';
                                                      html += '          <strong class="c-assetPreviewParam__label">';
                                                      html += '            评分:';
                                                      html += '          </strong>';
                                                      html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                                                      html += '            ' + score + '';
                                                      html += '          </span>';
                                                      html += '        </div>';
                                                }
                                                      

                                    }
                              }
                        })
                  }

                  var metaMsg = JSON.parse(itemMsg.meta);
                  if (itemMsg.category == 'PET') {
                        var ext = 0;
                        if (itemMsg.ext) {
                              ext = Number(itemMsg.ext);
                        }
                        // html += '        <div class="c-assetPreviewParam">';
                        // html += '          <strong class="c-assetPreviewParam__label">';
                        // html += '            金丹:';
                        // html += '          </strong>';
                        // html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                        // html += '            ' + ext + '';
                        // html += '          </span>';
                        // html += '        </div>';
                  }
                  if (itemMsg.category == "TAILSMAN") {
                        $.each(metaMsg, function(i, n) {
                              if (n.category == "SUMMARY") {
                                    html += '        <div class="c-assetPreviewParam">';
                                    html += '          <strong class="c-assetPreviewParam__label">';
                                    html += '            属性:';
                                    html += '          </strong>';
                                    html += '          <span style="white-space:normal;" class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                                    html += '            ' + n.values.INFO + '';
                                    html += '          </span>';
                                    html += '        </div>';

                              }
                              if (n.category == "DESC") {
                                    html += '        <div class="c-assetPreviewParam">';
                                    html += '          <strong class="c-assetPreviewParam__label">';
                                    html += '            详细:';
                                    html += '          </strong>';
                                    $.each(n.values.INFO, function(x, y) {
                                          html += '          <span style="white-space:normal;display: block;" class="c-assetPreviewParam__value">';
                                          html += '            ' + y + '';


                                          // for (var a = 0; a < y.split('/n').length; a++) {
                                          //       console.log(y.split('/n')[a]);
                                          //       html += '            ' + y.split('/n')[a] + '<br/>2233<br/>&nbsp;';
                                          // }
                                          html += '          </span>';
                                          console.log(y);
                                    })
                                          // html += '          <span style="white-space:normal;display: block;" class="c-assetPreviewParam__value">';
                                          // html += '            ggg';
                                          // html += '          </span>';
                                          // html += '          <span style="white-space:normal;display: block;" class="c-assetPreviewParam__value">';
                                          // html += '            &nbsp;&nbsp;等等';
                                          // html += '          </span>';
                                    
                                    html += '        </div>';

                              }
                        })

                  }
                  if (itemMsg.category != "WORLD" && itemMsg.category != "TAILSMAN" && itemMsg.game != "IOST") {
                        html += '        <div class="c-assetPreviewParam">';
                        html += '          <strong class="c-assetPreviewParam__label">';
                        html += '            属性:';
                        html += '          </strong>';
                        console.log("ext", itemMsg.meta);
                        $.each(metaMsg, function(i, n) {
                              if (n.category == "ATTR") {
                                    console.log(n);
                                    switch(itemMsg.category){
                                          case "SKIN":
                                          case "ITEM":
                                                html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                                                $.each(n.values, function(k, v) {
                                                      html += '            ' + getAttrType(k) + ' + ' + v + '';

                                                })
                                                html += '          </span>';
                                                break;
                                          case "PET":
                                                html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                                                html += '            力量：' + n.values.S + '（' + n.values.GS + '）';
                                                html += '          </span>';
                                                html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                                                html += '            敏捷：' + n.values.A + '（' + n.values.GA + '）';
                                                html += '          </span>';
                                                html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                                                html += '            智力：' + n.values.I + '（' + n.values.GI + '）';
                                                html += '          </span>';
                                                html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                                                html += '            耐力：' + n.values.V + '（' + n.values.GV + '）';
                                                html += '          </span>';
                                                break;
                                          default:
                                                html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                                                $.each(n.values, function(k, v) {
                                                      html += '            ' + getAttrType(k) + ' + ' + v + '';

                                                })
                                                html += '          </span>';

                                    }

                              }
                        })

                        html += '        </div>';

                  }



                  // html += '      <asset-card-price viewtype="suggested">';
                  // html += '        <div class="c-assetPreviewParam c-assetPreviewParam--suggested">';
                  // html += '          <strong class="c-assetPreviewParam__label">';
                  // html += '            建议价格:';
                  // html += '          </strong>';
                  // html += '          <div class="c-assetPreviewParam__value">';
                  // html += '            <span class="c-assetPreviewParam__number">';
                  // html += '              <dm-currency-icon>';
                  // html += '                <span class="o-currencies--USD">';
                  // html += '                </span>';
                  // html += '              </dm-currency-icon>';
                  // html += '              9999.99';
                  // html += '            </span>';
                  // html += '          </div>';
                  // html += '        </div>';
                  // html += '      </asset-card-price>';
                  html += '      <asset-trade-lock>';
                  html += '      </asset-trade-lock>';
                  html += '      <asset-params>';
                  html += '        <div class="c-assetPreviewParam">';
                  html += '          <strong class="c-assetPreviewParam__label">';
                  html += '            货主:';
                  html += '          </strong>';
                  html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--hero">';
                  html += '            ' + nickname + '';
                  html += '          </span>';
                  html += '        </div>';


                  // html += '        <div class="" style="margin-top:20px">';



                  // html += '        </div>';



                  // html += '        <div class="c-assetPreviewParam">';
                  // html += '          <strong class="c-assetPreviewParam__label">';
                  // html += '            Rarity:';
                  // html += '          </strong>';
                  // html += '          <span class="c-assetPreviewParam__value c-assetPreviewParam__value--rarity">';
                  // html += '            Immortal';
                  // html += '          </span>';
                  // html += '        </div>';
                  html += '      </asset-params>';
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';

                  if (itemMsg.category == 'PET') {
                        var petMsg = JSON.parse(itemMsg.meta);
                        html += '<div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
                        html += '   <div class="msgline"></div>';
                        html += '   <p class="c-assetPreview__title" style="padding:10px 0;">属性</p>';
                        html += '   <div class="mat-form-field-wrapper flex" style="justify-content: flex-start;flex-wrap: wrap;">';

                        html += '     <div class="attrBox">';
                        html += '       <div class="type">名称</div>';
                        html += '       <div class="header">' + itemMsg.name + '</div>';
                        // html += '       <div class="sub">775712中的1</div>';
                        html += '     </div>';
                        $.each(petMsg, function(i, n) {
                              if (n.category == "SUMMARY") {
                                    if (n.values.GENERATION != 35) {
                                          html += '     <div class="attrBox">';
                                          html += '       <div class="type">代数</div>';
                                          if (n.values.GENERATION == 99) {
                                                html += '       <div class="header">X</div>';
                                          } else {
                                                html += '       <div class="header">' + n.values.GENERATION + '</div>';
                                          }

                                          html += '     </div>';
                                    }


                              }
                              if (n.category == "PROPERTY") {
                                    html += '     <div class="attrBox">';
                                    html += '       <div class="type">种族</div>';
                                    html += '       <div class="header">' + getRace(n.values.RACE) + '</div>';
                                    html += '     </div>';
                                    if (gen != 35) {
                                          html += '     <div class="attrBox">';
                                          html += '       <div class="type">性别</div>';
                                          html += '       <div class="header">' + (n.values.SEX == "GIRL" ? "雌性" : "雄性") + '</div>';
                                          html += '     </div>';

                                    }

                                    html += '     <div class="attrBox">';
                                    html += '       <div class="type">幸运宠</div>';
                                    html += '       <div class="header">' + (n.values.LUCK == "LUCKPET" ? "是" : "否") + '</div>';
                                    html += '     </div>';
                                    html += '     <div class="attrBox">';
                                    html += '       <div class="type">恢复速度</div>';
                                    html += '       <div class="header">' + getSpeed(n.values.SPEED) + '</div>';
                                    html += '     </div>';

                              }
                        })

                        html += '     <div style="flex:1"></div>';
                        html += '   </div>';
                        html += ' </div>';
                        html += ' <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
                        html += '   <div class="msgline"></div>';
                        html += '   <p class="c-assetPreview__title" style="padding:10px 0;">技能</p>';
                        html += '   <div class="mat-form-field-wrapper flex" style="justify-content: flex-start;flex-wrap: wrap;">';
                        html += '     <div class="flex skillImgsBox">';
                        for (var j = 0; j < petMsg.length; j++) {
                              if (petMsg[j].category == "SKILL") {
                                    $.each(petMsg[j].values.SKILL, function(i, n) {
                                          html += '       <img src="https://xpet.io/images/skill/' + n + '.jpg" alt="' + n + '" style="">';
                                    })

                              }

                        }
                        html += '     </div>';
                        html += '     <div style="flex:1"></div>';
                        html += '   </div>';
                        html += ' </div>';

                  }



                  // imgs box end

                  html += ' <div class="spiedSection" id="salesHistory">';
                  html += ' <div class="msgline"></div>';
                  html += '       <asset-sales-history>';
                  // html += '         <div class="c-assetPreview__titleBlock">';
                  // html += '           <p class="c-assetPreview__title">';
                  // html += '             Sales History';
                  // html += '           </p>';
                  // html += '           <sales-range-selector>';
                  // html += '             <button class="c-assetPreviewHistory__date c-assetPreviewHistory__date--active">';
                  // html += '               7D';
                  // html += '             </button>';
                  // html += '             <button class="c-assetPreviewHistory__date">';
                  // html += '               1M';
                  // html += '             </button>';
                  // html += '             <button class="c-assetPreviewHistory__date">';
                  // html += '               6M';
                  // html += '             </button>';
                  // html += '             <button class="c-assetPreviewHistory__date">';
                  // html += '               1Y';
                  // html += '             </button>';
                  // html += '           </sales-range-selector>';
                  // html += '         </div>';
                  // html += '         <sales-chart>';
                  // html += '           <div class="sales-chart">';
                  // html += '             <div class="chartjs-size-monitor">';
                  // html += '               <div class="chartjs-size-monitor-expand">';
                  // html += '                 <div class="">';
                  // html += '                 </div>';
                  // html += '               </div>';
                  // html += '               <div class="chartjs-size-monitor-shrink">';
                  // html += '                 <div class="">';
                  // html += '                 </div>';
                  // html += '               </div>';
                  // html += '             </div>';
                  // html += '             <canvas basechart="" class="chartjs-render-monitor" style="display: block; width: 547px; height: 273px;"';
                  // html += '             width="547" height="273">';
                  // html += '             </canvas>';
                  // html += '             <div class="chartInfo">';
                  // html += '             </div>';
                  // html += '             <div id="chartjs-tooltip" class="center" style="opacity: 0; min-width: 85px; position: absolute; left: 130.987px; top: 8.11781px; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 12px; font-style: normal; padding: 6px; pointer-events: none; z-index: 9999;">';
                  // html += '               <div>';
                  // html += '                 <p class="price">';
                  // html += '                   $116.26';
                  // html += '                 </p>';
                  // html += '                 <p>';
                  // html += '                   4 Feb 2020';
                  // html += '                 </p>';
                  // html += '                 <p>';
                  // html += '                   4 items';
                  // html += '                 </p>';
                  // html += '               </div>';
                  // html += '             </div>';
                  // html += '           </div>';
                  // html += '         </sales-chart>';
                  html += '         <last-sales>';
                  html += '           <p class="c-assetPreview__title">';
                  html += '             最近交易';
                  html += '           </p>';
                  html += '           <table class="c-assetPreview__table" id="saleLastList">';



                  html += '           </table>';
                  html += '         </last-sales>';
                  html += '       </asset-sales-history>';
                  html += '     </div>';
                  html += '</div>';


                  // html += '<div class="c-authForm" style="padding-top:20px;">';
                  // html += '                  <div class="ng-pristine">';

                  // if (type == 'sale') {
                  //       html += '                  <div style="margin: 0 auto;width: 400px;" onclick="saleGo()">';
                  //       html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                  //       html += '                    <svg t="1566885363220" class="mat-icon notranslate material-icons mat-icon-no-color" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2873" width="32" height="32"><path d="M207.977931 224.750345l63.770483 387.001379c9.463172 0.494345 18.996966 1.377103 28.495448 1.377104 180.082759 0.070621 360.236138 0.070621 540.354207 0 36.687448 0 45.479724-10.840276 50.846897-47.492414 13.135448-89.935448 28.460138-179.553103 43.04331-269.27669 2.295172-14.230069 6.426483-28.177655 8.015448-42.443034 2.471724-22.457379-11.581793-28.848552-30.861241-28.848552l-140.958897-0.105931h-33.82731l13.170758-54.448552c63.134897 0 124.433655-1.588966 185.661794 0.494345 52.082759 1.730207 73.092414 46.150621 66.030344 92.513103-17.302069 112.993103-35.239724 225.880276-53.106758 338.802759-6.426483 40.536276-43.926069 69.067034-91.171311 69.102345-180.118069 0.141241-360.236138 0.105931-540.354206 0.105931H278.528c5.014069 25.423448 6.355862 48.128 14.795034 67.795862 3.495724 8.262621 21.857103 14.124138 33.544828 14.265379 144.843034 0.918069 289.721379 0.600276 434.599724 0.600276 41.101241 0 82.237793-0.529655 123.339035 0.353104 11.369931 0.211862 24.011034 2.118621 33.474207 7.768275 6.814897 4.06069 13.029517 15.713103 12.570482 23.587311-0.459034 7.556414-8.403862 17.054897-15.642482 21.256827-7.768276 4.519724-18.46731 5.190621-27.895173 5.190621-186.968276 0.176552-373.936552 0.211862-560.904827-0.211862-59.42731-0.141241-82.802759-22.598621-92.513104-81.284414-26.765241-162.78069-54.978207-325.278897-81.849379-488.024276-9.922207-60.027586-17.690483-120.302345-26.871173-183.260689-24.964414 0-47.315862 0.776828-69.561379-0.211862C35.098483 58.473931 13.382621 52.753655 14.441931 27.895172 15.32469 5.579034 34.392276-0.176552 55.366621 1.024c17.584552 0.98869 35.275034 0.141241 52.894896 0.176552 42.160552 0 73.551448 29.095724 77.259035 70.514758 1.377103 15.430621 4.802207 30.72 6.991448 46.115311 2.118621 15.148138 3.884138 30.366897 6.073379 47.527724h214.828138l13.876966 59.392H207.977931z" fill="#ffffff" p-id="2874"></path><path d="M609.103448 195.901793v208.295724c0 7.838897 0.176552 15.677793-0.105931 23.51669-0.741517 20.126897-11.122759 36.228414-30.649379 36.263724-20.374069 0.070621-29.025103-16.948966-29.025104-37.075862 0.03531-67.513379-0.03531-135.062069-0.07062-202.610759v-30.967172c-13.488552 12.958897-20.833103 25.035034-31.143724 28.601379-11.828966 4.06069-28.813241 4.766897-38.523587-1.235862-5.437793-3.354483-5.826207-27.365517 0.353104-34.957241 25.035034-30.649379 51.694345-60.663172 81.814069-86.157242 8.15669-6.850207 35.063172-2.259862 45.585655 6.461794 25.282207 21.009655 45.267862 48.16331 68.64331 71.609379 14.406621 14.477241 21.751172 29.943172 6.002759 45.373793-16.489931 16.172138-32.556138 6.708966-44.526345-8.686345-6.532414-8.403862-10.981517-18.46731-16.384-27.789241l-11.970207 9.357241M253.316414 923.012414c0-36.652138 31.390897-68.678621 67.442758-68.890483 36.369655-0.211862 67.866483 30.366897 67.442759 65.50069-0.529655 42.160552-28.177655 69.561379-68.325517 70.196965-30.013793 0.423724-70.973793-34.992552-66.56-66.807172M838.62069 989.501793c-35.310345 0.388414-67.195586-30.225655-67.654621-64.935724-0.564966-38.700138 30.825931-71.150345 68.113655-70.444138 35.486897 0.706207 65.324138 29.484138 66.136276 63.805793 0.918069 41.595586-26.518069 71.115034-66.56 71.574069" fill="#ffffff" p-id="2875"></path></svg>';
                  //       html += '                      &nbsp;&nbsp;&nbsp;<span>上架</span>';
                  //       html += '                    </button>';
                  //       html += '                  </div>';
                  // } else if (type == 'unsale') {
                  //       html += '                  <div style="margin: 0 auto;width: 400px;" onclick="unsaleGo()">';
                  //       html += '                    <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail">';
                  //       html += '                    <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566885351029" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2110" width="32" height="32"><path d="M709.12 883.2a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM320 883.2a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM949.243 268.954l15.293-61.169h-171.52v61.44h92.724L802.227 590.08H342.441l-54.18-320.855H409.6v-61.44H277.883l-11.812-69.97h0.169L256 76.375H58.88v61.44h144.876L312.32 780.703v3.937h517.12l20.48-61.44H364.923l-12.104-71.68H849.92v-0.768l99.38-381.783z" fill="#ffffff" p-id="2111"></path><path d="M751.078 355.999L621.583 531.738h-55.5l-129.495-175.74h55.495l78.454 106.466V198.743h46.254v264.192l78.792-106.936z" fill="#ffffff" p-id="2112"></path></svg>';
                  //       html += '                      &nbsp;&nbsp;&nbsp;<span>下架</span>';
                  //       html += '                    </button>';
                  //       html += '                  </div>';
                  // } else if (type == 'buy') {
                  //       html += '                    <div style="margin: 0 auto;width: 400px;" onclick="buyGo()">';
                  //       html += '                      <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit">';
                  //       html += '                      <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566887889666" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3003" width="32" height="32"><path d="M443.6 755.001c-2.7-3.961-5.76-7.561-9.36-11.161-7.2-7.2-15.3-12.599-24.119-16.199-9.54-3.6-19.44-5.401-29.52-5.401-2.34 0-4.86 0.18-7.561 0.54-2.7 0.361-5.22 0.54-7.561 0.9-2.34 0.361-4.681 0.9-7.2 1.801-2.34 0.9-4.86 1.62-7.2 2.16-3.060 1.26-5.94 2.7-9.001 4.5l-7.2 5.401c-3.060 1.801-5.58 3.961-8.1 6.3-3.6 3.6-6.66 7.38-9.36 11.161-2.7 3.961-4.86 7.92-6.66 12.060-3.6 9.54-5.401 19.26-5.401 29.159s1.801 19.26 5.401 28.26c3.6 8.279 9.001 16.38 16.201 24.119 7.2 6.48 15.3 11.881 24.121 16.201 9.001 3.6 18.72 5.401 29.52 5.401 10.080 0 19.799-1.98 29.159-5.76 9.18-3.959 17.46-9.18 24.66-15.66 7.2-7.74 12.601-15.84 16.201-24.121 4.14-9.001 6.3-18.361 6.3-28.26s-2.16-19.62-6.3-29.161c-2.16-4.32-4.5-8.46-7.020-12.24zM907.46 290.060c-1.801-3.060-4.14-5.58-7.2-8.1-3.060-2.34-6.48-4.5-10.8-6.3-8.279-4.14-20.34-6.3-35.82-6.3h-554.759l-4.5-30.42-3.6-23.22v-4.32c-1.26-6.48-2.16-10.98-2.7-13.5l-4.5-14.4c-1.26-4.679-3.6-9.9-7.2-15.12-2.34-2.34-4.86-4.5-7.561-6.3s-5.58-3.6-8.46-5.401c-6.48-3.060-15.12-4.5-25.92-4.5h-82.26c-5.94 0-11.34 0.9-16.199 2.7s-9.18 4.14-13.5 7.2c-7.2 7.2-10.8 16.201-10.8 26.82 0 2.34 0.18 5.040 0.361 8.1 0.361 3.060 0.72 5.94 1.44 9.001 0.54 3.060 1.62 5.94 3.060 9.001 1.44 3.060 2.88 6.3 3.959 9.9 4.14 5.399 9.001 10.080 14.4 14.4 4.86 3.6 11.34 5.401 19.62 5.401h60.841l34.919 179.82 13.5 68.94 11.7 61.74 9.001 45.719 4.5 23.22c1.26 5.94 3.239 14.58 6.3 25.92 1.801 4.86 3.78 9.18 5.76 13.5 2.16 4.14 4.32 8.1 6.66 11.7 4.679 7.74 10.8 14.039 17.82 18.72 2.34 1.801 4.86 3.060 7.561 3.961 2.7 0.9 5.76 1.62 9.001 2.16 3.239 0.54 6.66 0.9 10.26 0.9h424.98c15.481 0 25.74-3.961 30.42-11.7 5.399-7.74 8.1-16.921 8.1-27.719 0-22.14-13.14-33.12-39.42-33.12h-407.7l-12.599-71.639h425.881c15.479 0 28.62-4.14 39.42-12.601 5.401-4.14 10.26-9.9 14.759-17.46 4.5-7.38 8.46-16.201 12.060-26.46 1.801-5.399 6.48-19.44 14.4-42.119l18.72-52.74 17.1-49.14 10.8-29.52c0.54-1.801 1.079-3.6 1.44-5.401s0.54-3.78 0.9-5.76c0.361-2.16 0.54-4.32 0.54-6.66 0.361-6.66-1.079-12.96-4.679-18.9zM771.561 745.639c-6.48-7.2-14.58-12.601-24.121-16.201-4.681-1.801-9.719-3.060-14.759-3.961-5.040-0.9-10.080-1.44-14.761-1.44-3.6 0-7.020 0.18-10.26 0.54-3.241 0.361-6.48 0.9-9.9 1.801-3.239 0.9-6.48 1.98-9.36 3.060-4.14 1.801-8.279 3.961-12.601 6.66-4.14 2.7-7.74 5.76-10.8 9.36-7.2 7.2-12.601 14.94-16.201 23.22-2.34 4.679-3.961 9.54-4.86 14.4-0.9 4.679-1.44 9.54-1.44 14.4 0 10.080 2.16 19.62 6.3 28.62 3.6 8.279 9.001 16.38 16.201 24.121 5.94 5.94 13.68 10.98 23.22 15.12 9.001 4.14 18.72 6.3 29.52 6.3s20.521-2.16 29.52-6.3c9.54-3.6 17.639-8.64 24.121-15.12 7.2-7.74 12.78-15.84 16.921-24.121 1.801-4.14 3.060-8.82 3.959-13.86s1.44-10.080 1.44-14.759c0-10.080-1.801-19.62-5.401-28.62-3.959-8.46-9.721-16.201-16.74-23.22z" fill="#ffffff" p-id="3004"></path><path d="M545.66 499.94l118.8-133.92-19.44-21.42-101.161 87.84-47.34-36.359-18.54 21.239 67.68 82.62z" fill="#ffffff" p-id="3005"></path></svg>';
                  //       html += '                        &nbsp;&nbsp;&nbsp;<span>购买</span>';
                  //       html += '                      </button>';
                  //       html += '                    </div>';
                  // }



                  // html += '                  </div>';
                  // html += '                </div>';



                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';
                  html += '      </div>';
                  html += '    </div>';
                  html += '</div>';



                  return html;
                  break;
            case "recharge":


                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += ' <div class="cdk-global-overlay-wrapper" style="justify-content: center; align-items: center;">';
                  html += '   <div class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '     <div class="cdk-visually-hidden cdk-focus-trap-anchor"></div>';
                  html += '     <div class="mat-dialog-container" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '         <div class="c-auth c-auth--dialog">';
                  html += '           <div class="c-auth__inner ">';
                  html += '             <div class="c-authHeader c-authHeader--shadow ">';
                  html += '               <h3 class="c-authHeader__title">充值</h3>';
                  html += '               <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '               data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '                 <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '               </button>';
                  html += '             </div>';
                  html += '             <div class="c-auth__content" style="padding-bottom: 0;">';
                  html += '               <div class="c-authForm ">';
                  // html += '               <p class="c-authInfo__text">' + get_lan("msg6") + ' ' + KYC.realName + '（' + KYC.telNumber + '），' + get_lan("msg7") + '<br></p>';
                  html += '               <p class="c-authInfo__text">' + get_lan("msg6") + ' ，' + get_lan("msg7") + '<br></p>';
                  html += '                 <div class="ng-pristine ng-invalid ng-touched">';
                  html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
                  html += '                     <div class="mat-form-field-wrapper">';
                  html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '                         <input type="text" id="rechargeNum" placeholder="充值金额" style="background: none;border:0;height:100%;width:100%;font-size:20px;"';
                  html += '                         maxlength="4" minlength="3" oninput="returnRechargeMsg()">';
                  html += '                         <span>元</span>';
                  html += '                       </div>';
                  html += '                       <div class="mat-form-field-subscript-wrapper">';
                  html += '                         <div id="rechargeMsg" style="font-size: 18px;line-height: 50px;"';
                  html += '                         style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                         </div>';
                  html += '                       </div>';
                  html += '                     </div>';
                  html += '                   </div>';
                  html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
                  html += '                     <div class="mat-form-field-wrapper flex" style="justify-content: flex-start;flex-wrap: wrap;">';
                  html += '                       <div class="flex payImg active" style="margin:0 10px 10px 0;" data="1" onclick="paySelect(this)">';
                  html += '                         <img src="images/pay02.png" alt="">';
                  html += '                       </div>';
                  html += '                       <div class="flex payImg" style="margin:0 10px 10px 0;" data="2" onclick="paySelect(this)">';
                  html += '                         <img src="images/pay03.png" alt="">';
                  html += '                       </div>';
                  html += '                       <div class="flex payImg" style="margin:0 10px 10px 0;" data="0" onclick="paySelect(this)">';
                  html += '                         <img src="images/pay01.png" alt="">';
                  html += '                       </div>';
                  html += '                       <div class="flex payImg" style="margin:0 10px 10px 0;" data="3" onclick="paySelect(this)">';
                  html += '                         <img src="images/pay04.png" alt="">';
                  html += '                       </div>';
                  html += '                       <div class="flex payImg" style="margin:0 10px 10px 0;" data="4" onclick="paySelect(this)">';
                  html += '                         <img src="images/pay05.png" alt="">';
                  html += '                       </div>';
                  html += '                       <div style="flex:1"></div>';
                  html += '                     </div>';
                  html += '                   </div>';
                  html += '                   <p class="c-authInfo__text" id="noPayMsg" style="border: 1px solid #e86359;padding: 15px;color: #e86359;display:none;">' + get_lan("msg8") + '</p></p>';
                  html += '                   <div>';
                  html += '                     <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit" onclick="checkRechargeType()">';
                  html += '                       <span>立即充值</span>';
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



                  return html;
                  break;

            case "KYC":
                  var tel = phone || '';
                  var realName = '';
                  if (KYC) {
                        tel = KYC.telNumber;
                        realName = KYC.realName;
                  }
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '      <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '        <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '          <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer"';
                  html += '          tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '            <div>';
                  html += '              <div class="c-auth c-auth--dialog">';



                  html += '<div class="c-auth__inner">';
                  html += '  <div class="c-authHeader c-authHeader--shadow">';
                  html += '    <h3 class="c-authHeader__title">';
                  html += '      <span>' + get_lan("KYC") + '</span>';
                  html += '    </h3>';
                  html += '    <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '    data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '      <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '    </button>';
                  html += '  </div>';
                  html += '  <div class="c-auth__content">';
                  html += '    <div class="c-authForm">';
                  html += '      <p class="c-authInfo__text">' + get_lan("msg5") + '</p>';
                  html += '      <div novalidate="" class="ng-pristine ng-invalid ng-touched">';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-24 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label ng-pristine ng-invalid mat-form-field-invalid ng-touched mat-form-field-hide-placeholder">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  if (tel) {
                        html += '              <input type="text" id="telNumber" disabled style="background: none;border:0;height:100%;width:100%;font-size:20px;" value="' + tel + '">';
                  } else {
                        html += '              <input type="text" id="telNumber" placeholder="' + get_lan("phone") + '" value="' + tel + '" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="11">';
                  }
                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-24">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="ng-tns-c11-24 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <mat-error class="mat-error" role="alert" id="mat-error-4"></mat-error>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';

                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-25 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '               <div class="flex">'
                  html += '                     <div class="mat-form-field-flex" style="padding-top: 0;padding-right:0;">';
                  html += '                       <input type="text" id="smscode" placeholder="' + get_lan("code") + '" style="background: none;border:0;height:100%;width:55%;font-size:20px;" maxlength="8">';
                  html += '                        <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail" id="getCode" onclick="getCode2()" style="min-width:92px;">&nbsp;<span>' + get_lan("getCode") + '</span></button>';
                  html += '                     </div>';
                  html += '               </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-25">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="mat-form-field-hint-wrapper ng-tns-c11-25 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <div class="mat-form-field-hint-spacer"></div>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';


                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-25 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '              <input type="text" id="name" placeholder="' + get_lan("name") + '" style="background: none;border:0;height:100%;width:100%;font-size:20px;" value="' + realName + '">';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-25">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="mat-form-field-hint-wrapper ng-tns-c11-25 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <div class="mat-form-field-hint-spacer"></div>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';

                  html += '        <div class="c-authFooter">';
                  html += '          <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple"';
                  html += '          matripple="" type="submit" data-analytics-id="logIn_logInWithEmail" onclick="KYCSubmit()">';
                  // html += '            <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566290510060" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6676" width="128" height="128"><path d="M735.9 128l0.1 0.1v767.8l-0.1 0.1H288.1l-0.1-0.1V128.1l0.1-0.1h447.8m0.1-64H288c-35.2 0-64 28.8-64 64v768c0 35.2 28.8 64 64 64h448c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z" p-id="6677" fill="#ffffff"></path><path d="M800 704H224v64h576v-64zM576 800H448c-17.6 0-32 14.4-32 32s14.4 32 32 32h128c17.6 0 32-14.4 32-32s-14.4-32-32-32z" p-id="6678" fill="#ffffff"></path></svg>&nbsp;';
                  html += '            <span>' + get_lan("submit") + '</span>';
                  html += '          </button>';
                  html += '        </div>';
                  html += '      </div>';
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';


                  html += '</div></div></div></div></div>';
                  return html;
                  break;
            case "withdraw":
                  var tel = phone || '';
                  var realName = '';
                  var account = '';
                  if (KYC) {
                        tel = KYC.telNumber;
                        realName = KYC.realName;
                  }
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '      <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '        <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '          <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer"';
                  html += '          tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '            <div>';
                  html += '              <div class="c-auth c-auth--dialog">';



                  html += '<div class="c-auth__inner">';
                  html += '  <div class="c-authHeader c-authHeader--shadow">';
                  html += '    <h3 class="c-authHeader__title">';
                  html += '      <span>' + get_lan("withdraw") + '</span>';
                  html += '    </h3>';
                  html += '    <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '    data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '      <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '    </button>';
                  html += '  </div>';
                  html += '  <div class="c-auth__content">';
                  html += '    <div class="c-authForm">';

                  // html += '         <p class="c-authInfo__text" style="border: 1px solid #dfe647; padding: 15px; color:#dfe647;">国庆期间暂停提现，10月9号恢复服务，望知悉</p>';
                  html += '         <p class="c-authInfo__text" id="oldWithdrawal" style="border: 1px solid #dfe647; padding: 15px; color:#dfe647;display:none;">' + get_lan("msg9") + '</p>';

                  // html += '               <p class="c-authInfo__text">' + get_lan("msg6") + ' ' + KYC.realName + '（' + KYC.telNumber + '）</p>';
                  html += '               <p class="c-authInfo__text">' + get_lan("msg6") + ' </p>';



                  html += '      <div novalidate="" class="ng-pristine ng-invalid ng-touched">';

                  html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
                  html += '                     <div class="mat-form-field-wrapper">';
                  html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '                         <input type="text" id="withdrawNum" placeholder="提现金额" style="background: none;border:0;height:100%;width:100%;font-size:20px;"';
                  html += '                         maxlength="4" minlength="3">';
                  html += '                         <span class="o-currencies--USD"></span>';
                  html += '                       </div>';
                  html += '                       <div class="mat-form-field-subscript-wrapper">';
                  html += '                         <div class="ng-tns-c11-24 ng-trigger ng-trigger-transitionMessages "';
                  html += '                         style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                         </div>';
                  html += '                       </div>';
                  html += '                     </div>';
                  html += '                   </div>';


                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-24 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label ng-pristine ng-invalid mat-form-field-invalid ng-touched mat-form-field-hide-placeholder">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  if (tel) {
                        html += '              <input type="text" id="telNumber" disabled style="background: none;border:0;height:100%;width:100%;font-size:20px;" value="' + tel + '">';
                  } else {
                        html += '              <input type="text" id="telNumber" style="background: none;border:0;height:100%;width:100%;font-size:20px;" placeholder="请输入你的手机号">';
                  }

                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-24">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="ng-tns-c11-24 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <mat-error class="mat-error" role="alert" id="mat-error-4"></mat-error>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';

                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-25 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '               <div class="flex">'
                  html += '                     <div class="mat-form-field-flex" style="padding-top: 0;padding-right:0;">';
                  html += '                       <input type="text" id="smscode" placeholder="' + get_lan("code") + '" style="background: none;border:0;height:100%;width:55%;font-size:20px;" maxlength="8">';
                  html += '                        <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail" id="getCode" onclick="getCode2()" style="min-width:92px;">&nbsp;<span>' + get_lan("getCode") + '</span></button>';
                  html += '                     </div>';
                  html += '               </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-25">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="mat-form-field-hint-wrapper ng-tns-c11-25 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <div class="mat-form-field-hint-spacer"></div>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';


                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-25 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '              <input type="text" id="account" placeholder="' + get_lan("input9") + '" style="background: none;border:0;height:100%;width:100%;font-size:20px;" value="' + account + '">';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-25">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="mat-form-field-hint-wrapper ng-tns-c11-25 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <div class="mat-form-field-hint-spacer"></div>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';

                  html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
                  html += '                     <div class="mat-form-field-wrapper flex" style="justify-content: flex-start;flex-wrap: wrap;">';
                  html += '                       <div class="flex payImg active" style="margin:0 10px 10px 0;" data="PAYPAL" onclick="extractSelect(this)">';
                  html += '                         <img src="images/pay04.png" alt="">';
                  html += '                       </div>';
                  html += '                       <div class="flex payImg" style="margin:0 10px 10px 0;" data="SKRILL" onclick="extractSelect(this)">';
                  html += '                         <img src="images/pay05.png" alt="">';
                  html += '                       </div>';
                  html += '                       <div style="flex:1"></div>';
                  html += '                     </div>';
                  html += '                   </div>';

                  html += '        <div class="c-authFooter">';
                  html += '          <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple"';
                  html += '           type="submit"  onclick="withdrawSubmit()" id="withdrawalBtn">';
                  // html += '            <svg class="mat-icon notranslate material-icons mat-icon-no-color" t="1566290510060" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6676" width="128" height="128"><path d="M735.9 128l0.1 0.1v767.8l-0.1 0.1H288.1l-0.1-0.1V128.1l0.1-0.1h447.8m0.1-64H288c-35.2 0-64 28.8-64 64v768c0 35.2 28.8 64 64 64h448c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z" p-id="6677" fill="#ffffff"></path><path d="M800 704H224v64h576v-64zM576 800H448c-17.6 0-32 14.4-32 32s14.4 32 32 32h128c17.6 0 32-14.4 32-32s-14.4-32-32-32z" p-id="6678" fill="#ffffff"></path></svg>&nbsp;';
                  html += '            <span>' + get_lan("submit") + '</span>';
                  html += '          </button>';
                  html += '        </div>';
                  html += '      </div>';
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';


                  html += '</div></div></div></div></div>';
                  return html;
                  break;
            case "about":
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '      <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '        <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '          <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer"';
                  html += '          tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '            <div>';
                  html += '              <div class="c-auth c-auth--dialog">';



                  html += '<div class="c-auth__inner">';
                  html += '  <div class="c-authHeader c-authHeader--shadow">';
                  html += '    <h3 class="c-authHeader__title">';
                  html += '      <span>' + get_lan("about") + '</span>';
                  html += '    </h3>';
                  html += '    <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '    data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '      <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '    </button>';
                  html += '  </div>';
                  html += '  <div class="c-auth__content">';
                  html += '    <div class="c-authForm">';
                  html += '      <p class="c-authInfo__text">' + get_lan("msg10") + '</p>';


                  html += '    </div>';

                  html += '  </div>';
                  html += '</div>';


                  html += '</div></div></div></div></div>';
                  return html;
                  break;
            case "myGame":
                  var top = $(".mat-form-field-wrapper").eq(0).offset().top + 52;
                  var left = $(".mat-form-field-wrapper").eq(0).offset().left;

                  html += '<div class="cdk-overlay-backdrop cdk-overlay-transparent-backdrop cdk-overlay-backdrop-showing" onclick="$(\'#panelShow\').hide();"></div>';
                  html += '<div class="cdk-overlay-connected-position-bounding-box" dir="ltr" style="top: 0px; left: 0px; height: 100%; width: 100%;">';
                  html += '  <div class="cdk-overlay-pane" style="min-width: 108px; pointer-events: auto; font-size: 16px; top: '+ top +'px; left: '+ left +'px;">';
                  html += '    <div class="mat-select-panel-wrap">';
                  html += '      <div class=" mat-select-panel mat-primary" style="margin: 0;font-size:16px;transform-origin:50% 10px 0px;opacity:1;min-width:calc(100% + 32px);transform:scaleY(1);0:font-size;1:transform-origin;2:opacity;3:min-width;4:transform;font-size:16px;opacity:1;transform:scaleY(1);transform-origin:50% 10px 0px;webkit-opacity:1;webkit-transform:scaleY(1);webkit-transform-origin:50% 10px 0px;">';

                  // html += '        <div class="mat-option mat-selected mat-active">';
                  // html += '          <span class="mat-option-text" onclick="MyGameTextShow(this,0)"><font>'+ get_lan("gameName") +'</font></span>';
                  // html += '        </div>';
                  // html += '        <div class="mat-option">';
                  // html += '          <span class="mat-option-text" onclick="MyGameTextShow(this,1)"><font>'+ get_lan("gameName2") +'</font></span>';
                  // html += '        </div>';
                  // html += '        <div class="mat-option">';
                  // html += '          <span class="mat-option-text" onclick="MyGameTextShow(this,2)"><font>'+ get_lan("gameName3") +'</font></span>';
                  // html += '        </div>';
                  // html += '        <div class="mat-option">';
                  // html += '          <span class="mat-option-text" onclick="MyGameTextShow(this,3)"><font>'+ get_lan("gameName4") +'</font></span>';
                  // html += '        </div>';

                  for (var i = marketCategory.length - 1; i > -1; i--) {

                        // if(marketCategory[i].name != "XPET"){

                        html += '        <div class="mat-option">';
                        html += '          <span class="mat-option-text" onclick="MyGameTextShow(this,' + marketCategory[i].id + ')"><font>' + marketCategory[i].name + '</font></span>';
                        html += '        </div>';

                        // }

                  }
                  // $.each(marketCategory,function (i,n) {
                  //       if(n.name != "XPET"){
                  //             html += '        <div class="mat-option">';
                  //             html += '          <span class="mat-option-text" onclick="MyGameTextShow(this,'+ n.id +')"><font>'+ n.name +'</font></span>';
                  //             html += '        </div>';   
                  //       }

                  // })


                  html += '      </div>';
                  html += '    </div>';
                  html += '  </div>';
                  html += '</div>';
                  return html;
                  break;
            case "Deposit":


                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += ' <div class="cdk-global-overlay-wrapper" style="justify-content: center; align-items: center;">';
                  html += '   <div class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '     <div class="cdk-visually-hidden cdk-focus-trap-anchor"></div>';
                  html += '     <div class="mat-dialog-container" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '         <div class="c-auth c-auth--dialog" style="padding-bottom: 0;">';
                  html += '           <div class="c-auth__inner ">';
                  html += '             <div class="c-authHeader c-authHeader--shadow ">';
                  html += '               <h3 class="c-authHeader__title">充值</h3>';
                  html += '               <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '               data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '                 <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '               </button>';
                  html += '             </div>';
                  html += '             <div class="c-auth__content" style="padding-bottom: 0;padding-top:0;">';
                  html += '               <div class="c-authForm ">';
                  html += '               <div id="getAssitAccountShow"></div>';
                  // html += '               <p class="c-authInfo__text">' + get_lan("msg6") + ' ' + KYC.realName + '（' + KYC.telNumber + '），' + get_lan("msg7") + '<br></p>';
                  html += '               <p class="c-authInfo__text" style="color:#848484">银行余额：<span style="color:#fff">' + $("#lootMoney").html() + '</span></p>';
                  html += '                 <div class="ng-pristine ng-invalid ng-touched">';


                  if (getCookie("customerType") != "PC") {
                        html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
                        html += '                     <div class="mat-form-field-wrapper">';
                        html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
                        html += '                         <input type="text" id="prepareRechargeAmount" placeholder="充值数量" style="background: none;border:0;height:100%;width:100%;font-size:20px;">';

                        switch (getCookie("customerType")) {
                              case "EOS":
                                    html += '                         <span>EOS</span>';
                                    break;
                              case "IOST":
                                    html += '                         <span>IOST</span>';
                                    break;
                              default:
                                    html += '                         <span class="coinName">元</span>';
                        }


                        html += '                       </div>';
                        html += '                       <div class="mat-form-field-subscript-wrapper">';
                        html += '                         <div id="rechargeMsg" style="font-size: 18px;line-height: 50px;"';
                        html += '                         style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                        html += '                         </div>';
                        html += '                       </div>';
                        html += '                     </div>';
                        html += '                   </div>';
                        html += '                   <p class="c-authInfo__text" id="noPayMsg" style="border: 1px solid #e86359;padding: 15px;color: #e86359;display:none;">' + get_lan("msg8") + '</p></p>';
                  }
                  html += '                   <div>';
                  if (getCookie("customerType") == "PC") {
                        // html += '                     <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit" onclick="prepareRecharge()" disabled>';
                        // html += '                       <span>立即充值</span>';
                        // html += '                     </button>';
                        html += '                     <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit" onclick="rechargeByAssitAccount()">';
                        html += '                       <span>链上余额 (<span class="moneyAll"></span>) 全部充值到银行</span>';
                        html += '                     </button>';
                        getAssitAccount();
                  } else {
                        html += '                     <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit" onclick="prepareRecharge()">';
                        html += '                       <span>立即充值</span>';
                        html += '                     </button>';
                  }
                  html += '                   </div>';
                  html += '                 </div>';
                  html += '               </div>';
                  html += '             </div>';
                  html += '           </div>';
                  html += '         </div>';
                  html += '     </div>';
                  html += '   </div>';
                  html += ' </div>';



                  return html;
                  break;
            case "WithdrawCoin":


                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += ' <div class="cdk-global-overlay-wrapper" style="justify-content: center; align-items: center;">';
                  html += '   <div class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '     <div class="cdk-visually-hidden cdk-focus-trap-anchor"></div>';
                  html += '     <div class="mat-dialog-container" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '         <div class="c-auth c-auth--dialog" style="padding-bottom: 0;">';
                  html += '           <div class="c-auth__inner ">';
                  html += '             <div class="c-authHeader c-authHeader--shadow ">';
                  html += '               <h3 class="c-authHeader__title">提现</h3>';
                  html += '               <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '               data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '                 <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '               </button>';
                  html += '             </div>';
                  html += '             <div class="c-auth__content" style="padding-bottom:50px;">';
                  html += '               <div class="c-authForm ">';
                  html += '               <div id="getAssitAccountShow"></div>';

                  html += '               <p class="c-authInfo__text" style="color:#848484">银行余额：<span style="color:#fff">' + $("#lootMoney").html() + '</span></p>';
                  // html += '               <p class="c-authInfo__text">' + get_lan("msg6") + ' ' + KYC.realName + '（' + KYC.telNumber + '），' + get_lan("msg7") + '<br></p>';

                  if (getCookie("customerType") == "PC") {
                        html += '               <div style="flex: 1;margin-bottom: 20px;" id="bindAccountBtnGround">';
                        html += '                     <span class="bindAccountBtn active" data-target="IOST">IOST</span>';
                        // html += '                     <span class="bindAccountBtn" data-target="EOS">EOS</span>';
                        html += '               </div>';

                        html += '               <p class="c-authInfo__text" style="color:#848484">目前绑定：<span style="color:#fff" id="bindAccountMsgShow"></span></p>';


                  }
                  html += '                 <div class="ng-pristine ng-invalid ng-touched">';
                  html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
                  html += '                     <div class="mat-form-field-wrapper">';
                  html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '                         <input type="text" id="withdrawMoneyAmount" placeholder="提现数量" style="background: none;border:0;height:100%;width:100%;font-size:20px;">';

                  switch (getCookie("customerType")) {
                        case "EOS":
                              html += '                         <span class="coinName">EOS</span>';
                              break;
                        case "IOST":
                              html += '                         <span class="coinName">IOST</span>';
                              break;
                        default:
                              html += '                         <span class="coinName"></span>';
                  }


                  html += '                       </div>';
                  html += '                       <div class="mat-form-field-subscript-wrapper">';
                  html += '                         <div id="rechargeMsg" style="font-size: 18px;line-height: 50px;"';
                  html += '                         style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                         </div>';
                  html += '                       </div>';
                  html += '                     </div>';
                  html += '                   </div>';
                  html += '                   <p class="c-authInfo__text" id="noPayMsg" style="border: 1px solid #e86359;padding: 15px;color: #e86359;display:none;">' + get_lan("msg8") + '</p></p>';
                  html += '                   <div>';
                  if (getCookie("customerType") == "PC") {
                        // html += '                     <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit" onclick="getEosMapBonus2()" disabled>';
                        // html += '                       <span>提取</span>';
                        // html += '                     </button>';
                        bindTarget = "IOST";
                        listMyAccountMapping();
                        // getAssitAccount();
                  }
                  // else{
                  html += '                     <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit" onclick="getEosMapBonus2()">';
                  html += '                       <span>提取</span>';
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



                  return html;
                  break;
            case "bindAccount":


                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += ' <div class="cdk-global-overlay-wrapper" style="justify-content: center; align-items: center;">';
                  html += '   <div class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '     <div class="cdk-visually-hidden cdk-focus-trap-anchor"></div>';
                  html += '     <div class="mat-dialog-container" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '         <div class="c-auth c-auth--dialog" style="padding-bottom: 0;">';
                  html += '           <div class="c-auth__inner ">';
                  html += '             <div class="c-authHeader c-authHeader--shadow ">';
                  html += '               <h3 class="c-authHeader__title">' + get_lan("bindAccount") + '</h3>';
                  html += '               <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  html += '               data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  html += '                 <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  html += '               </button>';
                  html += '             </div>';
                  html += '             <div class="c-auth__content" style="padding-bottom:50px;">';
                  html += '               <div class="c-authForm ">';



                  html += '      <div novalidate="" class="ng-pristine ng-invalid ng-touched">';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-24 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label ng-pristine ng-invalid mat-form-field-invalid ng-touched mat-form-field-hide-placeholder">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '            <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '              <input type="text" id="telNumber" placeholder="' + get_lan("phone") + '" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="11">';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-24">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="ng-tns-c11-24 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <mat-error class="mat-error" role="alert" id="mat-error-4"></mat-error>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';
                  html += '        <div appearance="fill" class="c-authForm__field mat-form-field ng-tns-c11-25 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
                  html += '          <div class="mat-form-field-wrapper">';
                  html += '               <div class="flex">'
                  html += '                     <div class="mat-form-field-flex flex" style="padding-top: 0;padding-right:0;">';
                  html += '                       <input type="text" id="smscode" placeholder="' + get_lan("code") + '" style="background: none;border:0;height:100%;width:200px;font-size:20px;" maxlength="8">';
                  html += '                       <div style="width:20px;height:100%;background:#2a2c2e;"></div>';
                  html += '                       <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" matripple="" type="submit" data-analytics-id="logIn_logInWithEmail" id="getCode" onclick="getCode2()" style="min-width:92px;">&nbsp;<span>' + get_lan("getCode") + '</span></button>';
                  html += '                     </div>';
                  html += '               </div>';
                  html += '            <div class="mat-form-field-underline ng-tns-c11-25">';
                  html += '              <span class="mat-form-field-ripple"></span>';
                  html += '            </div>';
                  html += '            <div class="mat-form-field-subscript-wrapper">';
                  html += '              <div class="mat-form-field-hint-wrapper ng-tns-c11-25 ng-trigger ng-trigger-transitionMessages"';
                  html += '              style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                <div class="mat-form-field-hint-spacer"></div>';
                  html += '              </div>';
                  html += '            </div>';
                  html += '          </div>';
                  html += '        </div>';

                  html += '               <div id="getAssitAccountShow"></div>';

                  html += '               <div style="flex: 1;margin-bottom: 20px;" id="bindAccountBtnGround">';
                  html += '                     <span class="bindAccountBtn active" data-target="IOST">IOST</span>';
                  // html += '                     <span class="bindAccountBtn" data-target="EOS">EOS</span>';
                  html += '               </div>';

                  html += '               <p class="c-authInfo__text" style="color:#848484">目前绑定：<span style="color:#fff" id="bindAccountMsgShow"></span></p>';
                  html += '                 <div class="ng-pristine ng-invalid ng-touched">';
                  html += '                   <div class="c-authForm__field mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label  mat-form-field-invalid mat-form-field-hide-placeholder">';
                  html += '                     <div class="mat-form-field-wrapper">';
                  html += '                       <div class="mat-form-field-flex" style="padding-top: 0;">';
                  html += '                         <input type="text" id="bindAmountName" placeholder="绑定账号" style="background: none;border:0;height:100%;width:100%;font-size:20px;">';
                  html += '                       </div>';
                  html += '                       <div class="mat-form-field-subscript-wrapper">';
                  html += '                         <div id="rechargeMsg" style="font-size: 18px;line-height: 50px;"';
                  html += '                         style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
                  html += '                         </div>';
                  html += '                       </div>';
                  html += '                     </div>';
                  html += '                   </div>';
                  html += '                   <p class="c-authInfo__text" id="noPayMsg" style="border: 1px solid #e86359;padding: 15px;color: #e86359;display:none;">' + get_lan("msg8") + '</p></p>';
                  html += '                   <div>';

                  html += '                     <button class="c-authFooter__button c-authFooter__button--fluid o-dmButton o-dmButton--blue mat-ripple" type="submit" onclick="bindAccount()">';
                  html += '                       <span>绑定账号</span>';
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

                  bindTarget = "IOST";
                  listMyAccountMapping();


                  return html;
                  break;

            case "buyActivity":


                  var style = 'transform: scale(0.7);';
                  if (IsPC()) {
                        style = '';
                  }
                  html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  html += '<div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  html += '    <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  html += '        <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  html += '        <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer" tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  html += '            <div>';
                  html += '                <div class="c-auth c-auth--dialog" style="padding:0;">';
                  html += '                    <div class="c-auth__inner">';
                  html += '                        <div class="c-authHeader c-authHeader--shadow">';
                  html += '                            <h3 class="c-authHeader__title">';
                  html += '                                <span>购买物品</span>';
                  html += '                            </h3><button class="c-dialogHeader__close" mat-dialog-close="" type="button" data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()"><img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color"></button>';
                  html += '                        </div>';
                  html += '                        <div class="c-dialog__body c-dialog__body--preview" style="padding:0;overflow-x: hidden;">';
                  html += '                          <div class="flex" style="background: #303334;position: relative;height:100%;">';
                  html += '                            <img src="images/phoneTop.png" alt="" style="width:100%;position: absolute;top:0;">';
                  html += '                            <img src="images/phoneBottom.png" alt="" style="width:100%;position: absolute;bottom:0;">';
                  html += '                            <div style="position: relative;' + style + '">';
                  html += '                              <img src="images/phoneBG.png" alt="" style="">';
                  html += '                              <div style="position: absolute;top:445px;width: 100%;text-align: center;">';
                  html += '                                剩余：' + (activitySaleData.maxCount - activitySaleData.saleCount);
                  html += '                              </div>';
                  html += '                              <div style="position: absolute;top:580px;width: 100%;text-align: center;">';
                  html += '                                注：6.1平安符最高有65%几率免除一次致死的直接攻击（每3回合只会触发一次）';
                  html += '                              </div>';
                  html += '                              <div style="position: absolute;top:620px;font-size: 36px;color:#feec8d;text-align: center;width: 100%;">';
                  html += '                                ' + activitySaleData.eosPrice + ' / ' + activitySaleData.iostPrice;
                  html += '                              </div>';
                  html += '                              <div style="position: absolute;top:666px;width: 100%;text-align: center;font-size:18px;">';
                  html += '                                购买后请到《怪兽世界》游戏内使用阴阳镜锻造法宝';
                  html += '                              </div>';
                  html += '                              <div onclick="buyActivityShow()" style="position: absolute;top: 692px;width: 315px;height: 50px;left: 24%;"></div>';
                  html += '                          </div>';
                  html += '                        </div>';
                  html += '                    </div>';
                  html += '                </div>';
                  html += '            </div>';
                  html += '        </div>';
                  html += '    </div>';
                  html += '</div>';



                  // html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
                  // html += '      <div class="cdk-global-overlay-wrapper" dir="ltr" style="justify-content: center; align-items: center;">';
                  // html += '        <div id="cdk-overlay-8" class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
                  // html += '          <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
                  // html += '          <div aria-modal="true" class="mat-dialog-container ng-tns-c27-23 ng-trigger ng-trigger-dialogContainer"';
                  // html += '          tabindex="-1" id="mat-dialog-5" role="dialog" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
                  // html += '            <div>';
                  // html += '              <div class="c-auth c-auth--dialog">';



                  // html += '<div class="c-auth__inner">';
                  // html += '  <div class="c-authHeader c-authHeader--shadow">';
                  // html += '    <h3 class="c-authHeader__title">';
                  // html += '      <span>购买物品</span>';
                  // html += '    </h3>';
                  // html += '    <button class="c-dialogHeader__close" mat-dialog-close="" type="button"';
                  // html += '    data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
                  // html += '      <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
                  // html += '    </button>';
                  // html += '  </div>';
                  // html += '  <div class="c-auth__content">';
                  // html += '    <div class="c-authForm">';
                  // html += '      <p class="c-authInfo__text">' + get_lan("msg10") + '</p>';


                  // html += '    </div>';

                  // html += '  </div>';
                  // html += '</div>';


                  // html += '</div></div></div></div></div>';
                  return html;
                  break;



      }
}

function MyGameTextShow(self, num) {
      $("#MyGame").html($(self).children().html());
      $('#panelShow').hide();
      myGameType = num;
      refresh();
}

function gameTypeShow(self, num) {
      // $('.game-banners').show();
      // $('.game-banners').toggle();
      $(".game-banners").slideToggle("slow");
}

function gameTypeSelect(self, num) {
      $("#gameNameShow").html($(self).find('.game-banners__title').html());
      $(".game-banners").slideToggle("slow");
      // $('.game-banners').hide();
      gameType = num;
      getSaleMarket(0);

}



function Navtab(type) {
      $(".c-exchangeHeader__inner--user .NavItem").removeClass("active");
      $(".c-exchangeHeader__inner--user .NavItem").eq(type).addClass("active");
      if (getCookie("account")) {
            switch (type) {
                  case 0:
                        // getMyItem(0);
                        getUserNft();
                        break;
                  case 1:
                        // getMySaleItem(0);
                        getTotalmarket()
                        break;

            }
            myItemScrollPage = 0;
      }
}

function paySelect(self) {
      $(".payImg").removeClass("active");
      $(self).addClass("active");
      var num = $(".payImg.active").attr("data");
      switch (num) {
            case "0":
                  rechargeType = "PAYPAL";
                  payOver = false;
                  $("#noPayMsg").show();
                  break;

            case "1":
            case "2":
                  // if (num == "0") {
                  //       rechargeType = "PAYPAL";
                  // } else 
                  if (num == "1") {
                        rechargeType = "pay_wxpay";
                  } else if (num == "2") {
                        rechargeType = "pay_alipay";
                  }
                  payOver = true;
                  $("#noPayMsg").hide();
                  break;
            case "3":
            case "4":
                  payOver = false;
                  $("#noPayMsg").show();
                  break;

      }
}

function extractSelect(self) {
      $(".payImg").removeClass("active");
      $(self).addClass("active");
      paymentType = $(".payImg.active").attr("data");
      getPayment();
}

function checkRechargeType() {
      if (rechargeType == "PAYPAL") {
            card138PayGo();
      } else {
            m168PayGo();
      }

}

function m168PayGo() {
      if (payOver == false) {
            showMsg(get_lan("msg8"));
            return
      }
      if ($("#rechargeNum").val() == '') {
            showMsg("请输入充值金额")
            return
      } else {
            if ($("#rechargeNum").val() < 50) {
                  showMsg("充值金额不能小于50")
                  return
            }
            if ($("#rechargeNum").val() > 5000) {
                  showMsg("充值金额不能大于5000")
                  return
            }
      }
      var url = '/api/m168Pay.do';
      $.ajax({
            type: 'POST',
            url: url,
            data: {
                  amount: $("#rechargeNum").val(),
                  payType: rechargeType
            },
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object;

                        $("#form_amount").val(Number(obj.amount).toFixed(2));
                        $("#form_mem_id").val(obj.mem_id);
                        $("#form_method").val(obj.method);
                        $("#form_notify_url").val(obj.notify_url);
                        $("#form_order_no").val(obj.order_no);
                        $("#form_pay_token").val(obj.pay_token);
                        $("#form_return_url").val(obj.return_url);
                        $("#form_serial_no").val(obj.serial_no);
                        $("#form_sign").val(obj.sign);
                        $("#form_subject").val(obj.subject);
                        $("#formAction").click();
                        // var string = '';
                        // var i = 0;
                        // for (var name in obj) {
                        //       if (i == 0) {
                        //             string += '?' + name + "=" + obj[name];
                        //       } else {
                        //             string += '&' + name + "=" + obj[name];
                        //       }
                        //       i++;
                        // }
                        // window.location.href = "http://paysys.pay138.net/pay" + encodeURI(string);
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

function card138PayGo() {
      if (payOver == false) {
            showMsg(get_lan("msg8"));
            return
      }
      if ($("#rechargeNum").val() == '') {
            showMsg("请输入充值金额")
            return
      } else {
            if ($("#rechargeNum").val() < 100) {
                  showMsg("充值金额不能小于100")
                  return
            }
            if ($("#rechargeNum").val() > 5000) {
                  showMsg("充值金额不能大于5000")
                  return
            }

      }
      var url = '/api/card138Pay.do';
      $.ajax({
            type: 'POST',
            url: url,
            data: {
                  amount: $("#rechargeNum").val()
            },
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object;
                        var string = '';
                        var i = 0;
                        for (var name in obj) {
                              if (i == 0) {
                                    string += '?' + name + "=" + obj[name];
                              } else {
                                    string += '&' + name + "=" + obj[name];
                              }
                              i++;
                        }
                        window.location.href = "http://paysys.pay138.net/pay" + encodeURI(string);
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

function getUSDRMBRate() {
      var url = '/api/getUSDRMBRate.do';
      $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object;
                        if (obj) {
                              USDRMBRate = obj;
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

function getKYC(type) {
      if (getCookie("token")) {
            // var url = '/api/KYC.do';
            // $.ajax({
            //       type: 'get',
            //       url: url,
            //       headers: {
            //             'Authorization': "BASIC " + getCookie("token")
            //       },
            //       dataType: 'json',
            //       success: function(data) {
            //             if (data.code == 200) {
            //                   var obj = data.object;
            //                   if (obj) {
            //                      KYC = obj;
            //                         // if (type == 0) {
            //                         //       getUSDRMBRate();
            //                         //       panelShow('recharge');
            //                         // } else {
            //                         //       panelShow('withdraw');
            //                         //       getPayment();
            //                         //       getWithdrawal();
            //                         // }
            //                   } else {
            //                         KYC = '';
            //                         // if (getCookie("customerType") == "EOS") {
            //                         //       panelShow('KYC');
            //                         // } else {
            //                         //       getTelnumber();
            //                         // }

            //                   }

            if (type == 0) {
                  getUSDRMBRate();
                  panelShow('recharge');
            } else {

                  getTelnumber();

            }


            //             } else {
            //                   alert(data.message);
            //             }
            //       },
            //       error: function(data) {
            //             if (data.status == 401) {
            //                   alert(data.message);
            //             }
            //       }
            // });

      } else {
            showMsg(get_lan("noLoginShow"));
            panelShow(0);
      }
}

function getMyKYC() {
      if (getCookie("token")) {
            //       var url = '/api/KYC.do';
            //       $.ajax({
            //             type: 'get',
            //             url: url,
            //             headers: {
            //                   'Authorization': "BASIC " + getCookie("token")
            //             },
            //             dataType: 'json',
            //             success: function(data) {
            //                   if (data.code == 200) {
            //                         var obj = data.object;
            //                         if (obj) {
            //                               KYC = obj;
            //                               panelShow('KYC');
            //                         } else {
            //                               KYC = '';
            getTelnumber();
            //                   }
            //             } else {
            //                   alert(data.message);
            //             }
            //       },
            //       error: function(data) {
            //             if (data.status == 401) {
            //                   alert(data.message);
            //             }
            //       }
            // });

      } else {
            showMsg(get_lan("noLoginShow"));
            panelShow(0);
      }
}

function getPayment() {
      if (getCookie("token")) {
            var url = '/api/getPayment.do';
            $.ajax({
                  type: 'get',
                  url: url,
                  data: {
                        paymentType: paymentType
                  },
                  headers: {
                        'Authorization': "BASIC " + getCookie("token")
                  },
                  dataType: 'json',
                  success: function(data) {
                        if (data.code == 200) {
                              var obj = data.object;
                              if (obj) {
                                    $("#account").val(obj.account);
                              } else {
                                    $("#account").val('');
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

      } else {
            showMsg(get_lan("noLoginShow"));
            panelShow(0);
      }
}

function getTelnumber() {
      var url = '/api/telnumber.do';
      $.ajax({
            type: 'get',
            url: url,
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object;
                        phone = obj;
                        // panelShow('withdraw');
                        getPayment();
                        getWithdrawal();
                        // panelShow('KYC');
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


function getWithdrawal() {
      var url = '/api/withdrawal.do';
      $.ajax({
            type: 'get',
            url: url,
            data: {
                  paymentType: paymentType
            },
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object;
                        if (obj) {
                              $("#withdrawalBtn").attr("disabled", "true");
                              $("#withdrawNum").val(obj.amount).attr("disabled", "true");
                              $("#getCode").attr("disabled", "true");
                              $("#account").attr("disabled", "true");
                              $(".payImg").attr("onclick", "").removeClass("active");
                              if (obj.paymentType == "PAYPAL") {
                                    $(".payImg").eq(0).addClass("active");
                              } else {
                                    $(".payImg").eq(1).addClass("active");
                              }
                              orderMsg = obj;
                              getLootPay();
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

function getLootPay() {
      // var url = '/api/getLootPay.do';
      var url = '/api/getLootWithdrawal.do';
      $.ajax({
            type: 'get',
            url: url,
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object;
                        if (obj) {
                              $("#oldWithdrawal").show();
                        } else {
                              var html = '';
                              html += '您的提现请求已提交，请转入' + Number(orderMsg.amount).toFixed(4) + 'LOOT以完成提现过程，24小时内不转入LOOT将会被取消。';
                              $("#oldWithdrawal").html(html).show();
                              withdrawalLootGo(Number(orderMsg.amount).toFixed(4) + ' LOOT', orderMsg.sn)
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



function getXPetTailsman(id) {
      var url = '/api/getXPetTailsman.do';
      $.ajax({
            type: 'get',
            url: url,
            data: {
                  itemId: id
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object;
                        if (obj) {
                              $("#itemInfo").html(obj.info);
                              $("#itemLevel").html(obj.level);
                              var html = '';
                              for (var i = 0; i < Math.floor(obj.level / 10); i++) {
                                    html += obj.attrInfo[i] + '</br>';
                              }
                              $("#itemOtherMsg").html(html || '无');
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

function withdrawalLootGo(price, serial) {

      if (getCookie("customerType") == 'EOS') {
            checkScatter(function(name) {
                  withdrawalLootDo(name);
            })

            function withdrawalLootDo(name) {

                  const account = name;
                  const scatter = getScatter();
                  const eos = loot.scatter.eos(network, Eos);
                  const memo = "WITHDRAWAL-" + price + "-" + serial;
                  console.log("memo:", memo);
                  eos.transaction({
                        actions: [{
                              account: lootcontractName,
                              name: 'transfer',
                              authorization: [{
                                    actor: account, //发件人
                                    permission: "active"
                              }],
                              data: {
                                    from: account, //发件人
                                    to: 'xlootcounter', //收件人
                                    quantity: price, //发送资产
                                    memo: memo
                              }
                        }]
                  }).then(res => {
                        showMsg("转账成功！请等待客服处理");
                        $('.cdk-overlay-container').hide();

                  }).catch(e => {
                        console.log("error:", e);
                        eosErrorShow(e);
                  });
            }
      }
}


function getItemExchangeLog(page) {
      // var url = '/api/getItemExchangeLog.do';
      var url = 'api/listDexLog.do';

      $.ajax({
            type: 'get',
            url: url,
            data: {
                owner:getCookie('account')
            },
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object.content;
                        var html = '',
                              html2 = '';
                        var itemHeight = document.body.clientHeight;
                        var headerHeight = $(".c-exchangeHeader__inner--market").height();
                        itemHeight = itemHeight - headerHeight;
                        if (document.body.clientHeight == 0) {
                              $('.listPanelShow').addClass('active');
                        } else {
                              $('.listPanelShow').css("height", itemHeight + "px").addClass('active');
                        }

                        $('#listPanelTitle').html(get_lan("transactionRecord"));

                        if (obj == '') {

                              html = '<div class="flex" style="padding:15px;"><div>“暂无记录”</div></div>'
                              $("#myListPanel").html(html);
                              $(".listPanelShow .Pagination-pages").html(html2);
                              return

                        } else {
                              html += '<table border="1"> ';
                              html += '   <tbody>';
                              html += '    <tr> ';


                              html += '     <td align="center">合约/NFTID</td> ';
                              html += '     <td align="center" style="word-break: break-all;">发起人</td>';
                              // html += '     <td align="center">买家</td> ';
                              html += '     <td align="center">接收人</td> ';
                              // html += '     <td align="center">类型</td> ';
                              html += '     <td align="center">动作</td>';
                              html += '     <td align="center">金额</td>';

                              html += '     <td align="center">时间</td> ';

                              html += '    </tr>';
                              $.each(obj, function(i, n) {
                                    var fromUser = n.buyer;
                                    var toUser = n.toAcc;
                                    var price=n.memo.split('-')
                                    console.log(price,'price');
                                    if (String(fromUser).length > 12) {
                                          fromUser = fromUser.slice(0, 5) + "***" + fromUser.slice(-8)
                                    }
                                    if (String(toUser).length > 12) {
                                          toUser = toUser.slice(0, 5) + "***" + toUser.slice(-8)
                                    }
                                    html += '<tr> ';
                                    html += ' <td align="center">' + n.contract + '</td> ';
                                    html += ' <td align="center" style="color:#4cafff">' + n.fromAcc + '</td> ';

                                    // html += ' <td align="center">' + fromUser + '</td> ';
                                    html += ' <td align="center">' + toUser + '</td> ';
                                    // html += ' <td align="center">' + n.category + '</td> ';
                                    html += ' <td align="center">' + n.act + '</td> ';
                                    html += ' <td align="center">' + price[3] + '</td> ';

                                    html += ' <td align="center">' + new Date(n.lastModifyDate).Format("yyyy/MM/dd hh:mm:ss") + '</td> ';

                                    html += '</tr>';


                              })

                              html += '   </tbody> ';
                              html += '</table>';
                        }


                        $("#myListPanel").html(html);

                        var num = 10,
                              startIndex, endIndex, total;
                        total = data.object.totalPages;
                        if (total < num) {
                              num = total;
                        }

                        if (page > 5) {
                              if (total <= num) {
                                    startIndex = page - (num - (total - page));
                                    endIndex = startIndex + total;
                              } else {
                                    startIndex = page - 5;
                                    endIndex = page + 5;
                              }
                        } else {
                              startIndex = 0;
                              endIndex = num;
                        }
                        for (var i = startIndex; i < endIndex; i++) {
                              if (i == page) {
                                    html2 += '<button class="Pagination-page Pagination-page--active" onclick="getItemExchangeLog(' + i + ')">' + (i + 1) + '</button>';
                              } else {
                                    html2 += '<button class="Pagination-page" onclick="getItemExchangeLog(' + i + ')">' + (i + 1) + '</button>';
                              }
                        }
                        // html2 += '<div>';
                        // if (page == 0) {
                        //       html2 += '  <button class="Pagination-button Pagination-button--disabled">';
                        // } else {
                        //       html2 += '  <button class="Pagination-button" onclick="getItemExchangeLog(' + (page - 1) + ')">';
                        // }
                        // html2 += '      ' + get_lan("previous") + '';
                        // html2 += '  </button>';

                        // if (page == data.object.totalPages - 1 || data.object.totalPages == 0) {
                        //       html2 += '  <button class="Pagination-button Pagination-button--disabled">';
                        // } else {
                        //       html2 += '  <button class="Pagination-button" onclick="getItemExchangeLog(' + (page + 1) + ')">';
                        // }
                        // html2 += '      ' + get_lan("next") + '';
                        // html2 += '  </button>';
                        // html2 += '</div>'
                        $(".listPanelShow .Pagination-pages").html(html2);
                  }

            },
            error: function(data) {
                  if (data.status == 401) {
                        alert(data.message);
                  }
            }
      });
}


function getBankFlowLog(page) {
      // var url = '/api/getItemExchangeLog.do';
      var url, selfData;

      if (getCookie("customerType") == "EOS") {
            url = '/api/listKingdomTaxlog.do';
            selfData = {
                  "page": page,
                  "size": "10"
            };
      } else {
            url = '/api/listPlayerFundLog.do';
            selfData = {
                  "fundType": "IOST",
                  "page": page,
                  "size": "10"
            };
      }

      $.ajax({
            type: 'get',
            url: url,
            data: selfData,
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object.content;
                        var html = '',
                              html2 = '';
                        var itemHeight = document.body.clientHeight;
                        var headerHeight = $(".c-exchangeHeader__inner--market").height();
                        itemHeight = itemHeight - headerHeight;
                        if (document.body.clientHeight == 0) {
                              $('.listPanelShow').addClass('active');
                        } else {
                              $('.listPanelShow').css("height", itemHeight + "px").addClass('active');
                        }
                        $('#listPanelTitle').html(get_lan("银行流水"));

                        if (obj == '') {

                              html = '<div class="flex" style="padding:15px;"><div>“暂无记录”</div></div>'
                              $("#myListPanel").html(html);
                              $(".listPanelShow .Pagination-pages").html(html2);
                              return

                        } else {
                              html += '<table border="1"> ';
                              html += '   <tbody>';
                              html += '    <tr> ';

                              if (getCookie("customerType") == "EOS") {

                                    html += '     <td align="center" style="word-break: break-all;">EOS</td> ';
                                    // html += '     <td align="center" style="word-break: break-all;">XPC</td>';
                                    html += '     <td align="center">类型</td> ';
                                    html += '     <td align="center">备注</td> ';
                                    html += '     <td align="center">时间</td> ';
                              } else {
                                    html += '     <td align="center">目前余额</td> ';
                                    html += '     <td align="center">之前余额</td> ';
                                    html += '     <td align="center">收入</td> ';
                                    html += '     <td align="center">支出</td> ';
                                    html += '     <td align="center">时间</td> ';
                              }

                              html += '    </tr>';
                              $.each(obj, function(i, n) {
                                    html += '<tr> ';

                                    if (getCookie("customerType") == "EOS") {
                                          html += ' <td align="center" style="color:#4cafff">' + Number(n.amountEOS).toFixed(4) + '</td> ';
                                          // html += ' <td align="center" style="color:#4cafff">' +  Number(n.amountXPC).toFixed(4) + '</td> ';
                                          html += ' <td align="center">' + getTaxType(n.taxType) + '</td> ';
                                          html += ' <td align="center">' + n.memo + '</td> ';
                                          html += ' <td align="center">' + new Date(n.createDate).Format("yyyy/MM/dd hh:mm:ss") + '</td> ';

                                    } else {
                                          html += ' <td align="center" style="">' + Number(n.afterChange).toFixed(4) + '</td> ';
                                          html += ' <td align="center" style="">' + Number(n.beforeChange).toFixed(4) + '</td> ';
                                          html += ' <td align="center" style="">' + Number(n.income).toFixed(4) + '</td> ';
                                          html += ' <td align="center" style="">' + Number(n.outcome).toFixed(4) + '</td> ';
                                          html += ' <td align="center">' + new Date(n.createDate).Format("yyyy/MM/dd hh:mm:ss") + '</td> ';
                                    }
                                    html += '</tr>';


                              })

                              html += '   </tbody> ';
                              html += '</table>';
                        }


                        $("#myListPanel").html(html);

                        var num = 10,
                              startIndex, endIndex, total;
                        total = data.object.totalPages;
                        if (total < num) {
                              num = total;
                        }

                        if (page > 5) {
                              if (total <= num) {
                                    startIndex = page - (num - (total - page));
                                    endIndex = startIndex + total;
                              } else {
                                    startIndex = page - 5;
                                    endIndex = page + 5;
                              }
                        } else {
                              startIndex = 0;
                              endIndex = num;
                        }
                        for (var i = startIndex; i < endIndex; i++) {
                              if (i == page) {
                                    html2 += '<button class="Pagination-page Pagination-page--active" onclick="getBankFlowLog(' + i + ')">' + (i + 1) + '</button>';
                              } else {
                                    html2 += '<button class="Pagination-page" onclick="getBankFlowLog(' + i + ')">' + (i + 1) + '</button>';
                              }
                        }
                        // html2 += '<div>';
                        // if (page == 0) {
                        //       html2 += '  <button class="Pagination-button Pagination-button--disabled">';
                        // } else {
                        //       html2 += '  <button class="Pagination-button" onclick="getBankFlowLog(' + (page - 1) + ')">';
                        // }
                        // html2 += '      ' + get_lan("previous") + '';
                        // html2 += '  </button>';

                        // if (page == data.object.totalPages - 1 || data.object.totalPages == 0) {
                        //       html2 += '  <button class="Pagination-button Pagination-button--disabled">';
                        // } else {
                        //       html2 += '  <button class="Pagination-button" onclick="getBankFlowLog(' + (page + 1) + ')">';
                        // }
                        // html2 += '      ' + get_lan("next") + '';
                        // html2 += '  </button>';
                        // html2 += '</div>'
                        $(".listPanelShow .Pagination-pages").html(html2);
                  }

            },
            error: function(data) {
                  if (data.status == 401) {
                        alert(data.message);
                  }
            }
      });
}

function getRechargeOrder(page) {
      var url = '/api/getRechargeOrder.do';
      $.ajax({
            type: 'get',
            url: url,
            data: {
                  page: page,
                  size: 10
            },
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object.content;
                        var html = '',
                              html2 = '';

                        var itemHeight = document.body.clientHeight;
                        var headerHeight = $(".c-exchangeHeader__inner--market").height();
                        itemHeight = itemHeight - headerHeight;
                        $('.listPanelShow').css("height", itemHeight + "px").addClass('active');
                        $('#listPanelTitle').html(get_lan("rechargeRecord"));


                        if (obj == '') {
                              html = '<div class="flex" style="padding:15px;"><div>“暂无记录”</div></div>'
                              $("#myListPanel").html(html);
                              $(".listPanelShow .Pagination-pages").html(html2);
                              return

                        } else {
                              html += '<table border="1"> ';
                              html += '   <tbody>';
                              html += '    <tr> ';
                              html += '     <td align="center">物品ID</td> ';
                              html += '     <td align="center">名称</td> ';
                              html += '     <td align="center">数量</td>';
                              html += '     <td align="center" style="word-break: break-all;">价格</td>';
                              html += '     <td align="center">买家</td> ';
                              html += '     <td align="center">卖家</td> ';
                              html += '     <td align="center">时间</td> ';
                              html += '    </tr>';
                              $.each(obj, function(i, n) {
                                    var fromUser = n.fromUser;
                                    var toUser = n.toUser;

                                    if (String(fromUser).length > 12) {
                                          fromUser = fromUser.slice(0, 5) + "***" + fromUser.slice(-8)
                                    }
                                    if (String(toUser).length > 12) {
                                          toUser = toUser.slice(0, 5) + "***" + toUser.slice(-8)
                                    }
                                    html += '<tr> ';
                                    html += ' <td align="center">' + n.itemId + '</td> ';
                                    html += ' <td align="center">' + n.name + '</td> ';
                                    html += ' <td align="center">' + n.itemCount + '</td> ';


                                    html += ' <td align="center" style="color:#4cafff">' + n.quantity + '</td> ';
                                    html += ' <td align="center">' + fromUser + '</td> ';
                                    html += ' <td align="center">' + toUser + '</td> ';
                                    html += ' <td align="center">' + new Date(n.createDate).Format("yyyy/MM/dd hh:mm:ss") + '</td> ';

                                    html += '</tr>';


                              })

                              html += '   </tbody> ';
                              html += '</table>';
                        }


                        $("#myListPanel").html(html);

                        var num = 10,
                              startIndex, endIndex, total;
                        total = data.object.totalPages;
                        if (total < num) {
                              num = total;
                        }
                        if (page > 5) {
                              if (total <= page + 5) {
                                    startIndex = page - (num - (total - page));
                                    endIndex = startIndex + 10;
                              } else {
                                    startIndex = page - 5;
                                    endIndex = page + 5;
                              }
                        } else {
                              startIndex = 0;
                              endIndex = num;
                        }
                        for (var i = startIndex; i < endIndex; i++) {
                              if (i == page) {
                                    html2 += '<button class="Pagination-page Pagination-page--active" onclick="getRechargeOrder(' + i + ')">' + (i + 1) + '</button>';
                              } else {
                                    html2 += '<button class="Pagination-page" onclick="getRechargeOrder(' + i + ')">' + (i + 1) + '</button>';
                              }
                        }
                        $(".listPanelShow .Pagination-pages").html(html2);
                  }

            },
            error: function(data) {
                  if (data.status == 401) {
                        alert(data.message);
                  }
            }
      });
}

function getWithdrawalOrder(page) {
      var url = '/api/getWithdrawalOrder.do';
      $.ajax({
            type: 'get',
            url: url,
            data: {
                  page: page,
                  size: 10
            },
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object.content;
                        var html = '',
                              html2 = '';

                        var itemHeight = document.body.clientHeight;
                        var headerHeight = $(".c-exchangeHeader__inner--market").height();
                        itemHeight = itemHeight - headerHeight;
                        $('.listPanelShow').css("height", itemHeight + "px").addClass('active');
                        $('#listPanelTitle').html(get_lan("withdrawalRecord"));


                        if (obj == '') {
                              html = '<div class="flex" style="padding:15px;"><div>“暂无记录”</div></div>'
                              $("#myListPanel").html(html);
                              $(".listPanelShow .Pagination-pages").html(html2);
                              return

                        } else {
                              html += '<table border="1"> ';
                              html += '   <tbody>';
                              html += '    <tr> ';



                              html += '     <td align="center">流水号</td> ';
                              html += '     <td align="center" style="word-break: break-all;">金额</td>';
                              html += '     <td align="center">支付类型</td> ';
                              html += '     <td align="center">创建时间</td> ';
                              html += '     <td align="center" style="width:168px;">备注</td>';
                              html += '    </tr>';
                              $.each(obj, function(i, n) {
                                    var fromUser = n.fromUser;
                                    var toUser = n.toUser;

                                    if (String(fromUser).length > 12) {
                                          fromUser = fromUser.slice(0, 5) + "***" + fromUser.slice(-8)
                                    }
                                    if (String(toUser).length > 12) {
                                          toUser = toUser.slice(0, 5) + "***" + toUser.slice(-8)
                                    }
                                    html += '<tr> ';
                                    html += ' <td align="center">' + n.sn + '</td> ';
                                    html += ' <td align="center" style="color:#4cafff">$ ' + n.amount + '</td> ';
                                    html += ' <td align="center">' + n.paymentType + '</td> ';


                                    html += ' <td align="center">' + new Date(n.createDate).Format("yyyy/MM/dd hh:mm:ss") + '</td> ';
                                    html += ' <td align="center" style="width:168px;">' + n.note + '</td> ';

                                    html += '</tr>';


                              })

                              html += '   </tbody> ';
                              html += '</table>';
                        }


                        $("#myListPanel").html(html);

                        var num = 10,
                              startIndex, endIndex, total;
                        total = data.object.totalPages;
                        if (total < num) {
                              num = total;
                        }
                        if (page > 5) {
                              if (total <= page + 5) {
                                    startIndex = page - (num - (total - page));
                                    endIndex = startIndex + 10;
                              } else {
                                    startIndex = page - 5;
                                    endIndex = page + 5;
                              }
                        } else {
                              startIndex = 0;
                              endIndex = num;
                        }
                        for (var i = startIndex; i < endIndex; i++) {
                              if (i == page) {
                                    html2 += '<button class="Pagination-page Pagination-page--active" onclick="getWithdrawalOrder(' + i + ')">' + (i + 1) + '</button>';
                              } else {
                                    html2 += '<button class="Pagination-page" onclick="getWithdrawalOrder(' + i + ')">' + (i + 1) + '</button>';
                              }
                        }
                        $(".listPanelShow .Pagination-pages").html(html2);
                  }

            },
            error: function(data) {
                  if (data.status == 401) {
                        alert(data.message);
                  }
            }
      });
}

function returnRechargeMsg() {
      var num = Number($("#rechargeNum").val());
      var result = Number(num / USDRMBRate).toFixed(2);
      var html = "今天的汇率为 " + USDRMBRate + "，充值 ￥ " + Number(num).toFixed(2) + "  = $ " + result;
      $("#rechargeMsg").html(html);
}

function refresh() {
      checkLogin(function() {
                  if(!getCookie('account')){
                    eosLogin()
                  
            } else {
                  // getMySaleItem(0);
                  // window.location.reload()

            }
      })

}

function checkLogin(fun) {
      if (getCookie("account")) {
            fun();
      } else {
            showMsg(get_lan("noLoginShow"));
            panelShow(0);
      }
}

var gameIndex = 0;

function showGameMsg() {
      switch (gameIndex) {
            case 0:
                  $("#aboutGameShow").show();
                  break;
            case 1:

                  break;
            default:
                  $("#aboutGameShow").show();

      }
}

function listXLootMarketCategory() {
      var url = '/api/listXLootMarketCategory.do';
      $.ajax({
            type: 'get',
            url: url,
            data: {
                  // itemId: id
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object.content;
                        marketCategory = obj;
                        var html = '';
                        for (var i = obj.length - 1; i > -1; i--) {

                              // if(obj[i].name != "XPET"){
                              html += '<div class="game-banners__container swiper-slide swiper-slide-active" style="margin-right: 4px;" onclick="gameTypeSelect(this,' + obj[i].id + ')">';
                              html += '    <div class="game-banners__inner game-banners--Game">';
                              // html += '        <img class="game-banners__logo" src="domove/imgs/gameLogo_07.jpg" alt="XPET">';
                              html += '        <img class="game-banners__bg" src="' + obj[i].imageUrl + '" alt="' + obj[i].name + '">';

                              // html += '        <span style="position">'+ obj[i].name +'</span>';
                              html += '        <div class="game-banners__title" style="padding:3px;background:rgba(0,0,0,0.3)">' + obj[i].name + '</div>';
                              html += '    </div>';
                              html += '</div>';
                              // }

                              if (i == obj.length - 1) {
                                    myGameType = obj[i].id;
                                    gameType = obj[i].id;

                                    getSaleMarket(getSaleMarketPage);
                                    $("#MyGame").html(obj[i].name);
                                    $("#gameNameShow").html(obj[i].name);

                                    if (getCookie("token")) {
                                          getMyItem(0);
                                    }
                              }
                              // console.log(i,obj[i])
                        }

                        var style = 'color:fff7bd;padding:3px 10px;background:rgba(0,0,0,0.3);left:50%;margin-left:-50px;width:100px;text-align:center;'
                        // html += '<div class="game-banners__container swiper-slide swiper-slide-active" style="margin-right: 4px;" onclick="buyActivityMsgShow()">';
                        // html += '    <div class="game-banners__inner game-banners--Game">';
                        // html += '        <img class="game-banners__bg" src="images/saleBG.jpg" alt="">';
                        // html += '        <div class="game-banners__title" style="' + style + '">剩余：<span id="activitySaleNum">--</span></div>';
                        // html += '    </div>';
                        // html += '</div>';

                        // html += '<div class="game-banners__container swiper-slide swiper-slide-active" style="margin-right: 4px;" onclick="lootBuyShow()">';
                        // html += '    <div class="game-banners__inner game-banners--Game">';
                        // html += '        <img class="game-banners__bg" src="images/lootSaleBG.jpg" alt="">';
                        // // html += '        <div class="game-banners__title" style="' + style + '">剩余：<span id="activitySaleNum">--</span></div>';
                        // html += '    </div>';
                        // html += '</div>';




                        // $.each(obj,function (i,n) {
                        //       if(n.name != "XPET"){
                        //             html += '<div class="game-banners__container swiper-slide swiper-slide-active" style="margin-right: 4px;" onclick="gameTypeSelect(this,'+ n.id +')">';
                        //             html += '    <div class="game-banners__inner game-banners--Game">';
                        //             // html += '        <img class="game-banners__logo" src="domove/imgs/gameLogo_07.jpg" alt="XPET">';
                        //             html += '        <img class="game-banners__bg" src="'+ n.imageUrl +'" alt="'+ n.name +'">';

                        //             // html += '        <span style="position">'+ n.name +'</span>';
                        //             html += '        <div class="game-banners__title" style="padding:3px;background:rgba(0,0,0,0.3)">'+ n.name +'</div>';
                        //             html += '    </div>';
                        //             html += '</div>';
                        //       }
                        // })
                        $("#lootMarketCategory").html(html);
                        // $(function() {
                        //       getActivitySale();
                        // })
                        if (obj) {
                              // $("#itemInfo").html(obj.info);
                              // $("#itemLevel").html(obj.level);
                              // var html = '';
                              // for (var i = 0; i < Math.floor(obj.level / 10); i++) {
                              //       html += obj.attrInfo[i] + '</br>';
                              // }
                              // $("#itemOtherMsg").html(html || '无');
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


function getActivitySale() {
      var url = '/api/getActivitySale.do';
      $.ajax({
            type: 'get',
            url: url,
            data: {
                  activityId: activityId
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object;

                        activitySaleData = obj;
                        $("#activitySaleNum").html(obj.maxCount - obj.saleCount);

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


function buyActivityMsgShow() {
      panelShow("buyActivity");
      // getItem("buyActivity");
}


function buyActivityTag(selfData, fun) {

      var url = '/api/buyActivityTag.do';
      $.ajax({
            type: 'get',
            url: url,
            data: selfData,
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  $("#showLoading").hide();
                  if (data.code == 200) {
                        fun(data);
                  } else {
                        alert(data.message);
                  }
            },
            error: function(data) {
                  $("#showLoading").hide();
                  if (data.status == 401) {
                        alert(data.message);
                  }
            }
      });

}

function buyActivityTagGo() {
      checkLogin(function() {
            var price = activitySaleData.iostPrice;
            if (getCookie('customerType') == 'EOS') {
                  price = activitySaleData.eosPrice;
            }
            price = String(price).split(' ')[0];
            bankMoney = Number(String($("#lootMoney").html()).split(' ')[0]);
            // if (getCookie("customerType") == 'EOS') {

            //       if (itemMsg.assetType == "EOSNFT") {
            //             bankMoney = Number(String($("#lootMoney").html()).split(' ')[0]);
            //       } else {
            //             bankMoney = 0;
            //       }
            // } else {
            //       if (itemMsg.assetType == "IOSTNFT") {
            //             bankMoney = Number(String($("#lootMoney").html()).split(' ')[0]);
            //       } else {
            //             bankMoney = 0;
            //       }
            // }
            var selfData = {
                  activityId: activityId
            }

            buyActivityTag(selfData, function(data) {
                  $("#showLoading").show();
                  var obj = data.object;

                  if (obj.autoComplete == true) {

                        $("#showLoading").hide();
                        showMsg("购买成功！");
                        $('.cdk-overlay-container').hide();
                        $("#buyShopOkShow").hide();
                        // $('#saleItemId_' + itemId).remove();
                        getLootNum();
                        getActivitySale();

                  } else {
                        // if (bankMoney < price) {
                        if (getCookie("customerType") == "EOS" || getCookie("customerType") == "IOST") {

                              if (obj.chainType == "EOS") {


                                    checkScatter(function(name) {


                                          buyActivityTagDo(name);

                                          function buyActivityTagDo(name) {

                                                $("#showLoading").show();
                                                prepareResource(function(cpuName) {
                                                      var authorization;
                                                      const eos = loot.scatter.eos(network, Eos);
                                                      const account = name;
                                                      if (cpuName == '') {
                                                            authorization = [{
                                                                  actor: account,
                                                                  permission: "active"
                                                            }]
                                                      } else {
                                                            authorization = [{
                                                                  actor: cpuName,
                                                                  permission: "active"
                                                            }, {
                                                                  actor: account,
                                                                  permission: "active"
                                                            }]
                                                      }

                                                      eos.transaction({
                                                            actions: [{
                                                                  account: obj.contract,
                                                                  name: obj.functionName,
                                                                  authorization: authorization,
                                                                  data: obj.params
                                                            }]
                                                      }).then(res => {
                                                            $("#showLoading").hide();
                                                            showMsg("购买成功！");
                                                            $('.cdk-overlay-container').hide();
                                                            $("#buyShopOkShow").hide();
                                                            recycleResource();
                                                            getActivitySale();
                                                            // $('#saleItemId_' + itemId).remove();


                                                            // setTimeout(function () {
                                                            //   if($(".c-exchangeHeader__inner--user .NavItem").eq(0).hasClass("active") == true){
                                                            //     getMyItem(0);
                                                            //   }else{
                                                            //     getMySaleItem(0); 
                                                            //   }
                                                            //   getSaleMarket(0);
                                                            // },1000)

                                                      }).catch(e => {
                                                            $("#showLoading").hide();
                                                            console.log("error:", e);
                                                            eosErrorShow(e);
                                                      });
                                                })


                                          }

                                    })
                              } else if (obj.chainType == "IOST") {


                                    checkIWallet(function(name) {


                                          buyActivityTagDo(name);

                                          function buyActivityTagDo(name) {

                                                $("#showLoading").show();

                                                var price = obj.params.price;
                                                var sn = Number(obj.params.sn);

                                                var iost = IWalletJS.newIOST(IOST);
                                                var tx = iost.callABI(obj.contract, obj.functionName, [sn,price]);
                                                tx.addApprove('iost', price);
                                                iost.signAndSend(tx).on('pending', (pending) => {
                                                      getTxReceipt(pending, function(data) {

                                                            $("#showLoading").hide();
                                                            showMsg("购买成功！");
                                                            $('.cdk-overlay-container').hide();
                                                            $("#buyShopOkShow").hide();
                                                            getActivitySale();
                                                            // $('#saleItemId_' + itemId).remove();

                                                      })
                                                }).on('success', (result) => {
                                                      if (iostSuccessStaus == true) {

                                                            iostSuccessGo(result, function() {
                                                                  $("#showLoading").hide();
                                                                  showMsg("购买成功！");
                                                                  $('.cdk-overlay-container').hide();
                                                                  $("#buyShopOkShow").hide();
                                                                  getActivitySale();
                                                                  // $('#saleItemId_' + itemId).remove();
                                                                  iostPendingStaus = false;


                                                            })

                                                      }
                                                }).on('failed', (failed) => {
                                                      $("#showLoading").hide()
                                                })



                                          }

                                    });

                              } else {

                              }
                        } else {

                              showMsg("余额不足");
                              $("#showLoading").hide();
                        }
                        // }
                  }
            })



      })
}

function buyActivityShow() {
      var price = activitySaleData.iostPrice;
      if (getCookie('customerType') == 'EOS') {
            price = activitySaleData.eosPrice;
      }
      $("#buyShopMoneyShow").html(price);
      $("#buyShopOkShow").show();
      $("#buyShopOkAction").attr('onclick','buyActivityTagGo()');
}

function selectionNode(num){
  $(".nodeList .icon").removeClass('act');
  $(".nodeList .icon").eq(num).addClass('act');
  nodeIndex = num;
}

function setNode(){
  setCookie('nodeIndex',nodeIndex);
  // network = ScatterJS.Network.fromJson({
  //   blockchain: 'eos',
  //   host: get_random_api2(),
  //   // host: 'nodes.eos42.io',https://mainnet.eoscannon.io
  //   protocol: 'https',
  //   port: 443,
  //   chainId: chainId
  // })
  window.location.reload();
}


function selectSortType(self,num){
  dexListType = num;
  getDexListData();
  $(".selectTypeBtn .selectBox").html($(self).html());
}


function getDexListData() {
  var loadHtml = '<div class="flex"><div style="padding:30px;background: rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius: 10px;"><img src="imgs/loading.gif" alt=""><br><div style="margin-top:13px;">加载中...</div></div></div>'
  $(".list").html(loadHtml);
  // var api = get_random_api();
  var api = 'https://' + get_random_api2();
  dexPage = 0;
  var limit = 1000;
  var selfData = {};
  var nftcontract = getCookie("nftcontract") || 'xlootshovel1';
  if(nftSaletype == 0){
    // dexListType
  }else{
    
  }

  // dexListType = 3;
  switch (String(dexListType)) {
    case 'idLow':
      //price Positive  价格正序

      selfData = {
        json: true,
        code: nftcontract,
        scope: getCookie("account"),
        table: 'tokens',
        index_position: 1,
        key_type:'i64',
        lower_bound: '',
        limit: limit,
        reverse: false,
        show_payer: false,
      }
      break;

    case 'levelHigh':

      //price Reverse  价格反序
      selfData = {
        json: true,
        code: nftcontract,
        scope: getCookie("account"),
        table: 'tokens',
        index_position: 3,
        key_type:'i64',
        lower_bound: '',
        limit: limit,
        reverse: true,
        show_payer: false,
      }
      
      break;
    case 'levelLow':

      //price Reverse  价格反序
      selfData = {
        json: true,
        code: nftcontract,
        scope: getCookie("account"),
        table: 'tokens',
        index_position: 3,
        key_type:'i64',
        lower_bound: '',
        limit: limit,
        reverse: false,
        show_payer: false,
      }
      
      break;

    case 'sale':
      //合约价格  价格正序
      selfData = {
        json: true,
        code: dexContractName,
        scope: getCookie("account"),
        table: 'accmarkets',
        // index_position: 3,
        lower_bound: '',
        // key_type: 'i64',
        limit: limit,
        reverse: true,
        show_payer: false,
      }
      break;
    case 'idHigh':
    default:
      //我的资产
      selfData = {
        json: true,
        code: nftcontract,
        scope: getCookie("account"),
        table: 'tokens',
        index_position: 1,
        key_type:'i64',
        lower_bound: '',
        limit: limit,
        reverse: true,
        show_payer: false,
      }

      break;
  }

  $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData),
    function(data, status) {
      console.log(data,'data');
      dexListData.content = [];
      dexListData.more = data["more"];
      dexListData.next_key = data["next_key"];
      for (x in data["rows"]) {
        var obj = data["rows"][x];
        dexListData.content[x] = obj;
        // console.log("priceShow:",obj.price);
      }
      dexListData.totalElements = data["rows"].length;
      dexListData.size = dexSize;
      dexListData.totalPages = Math.ceil(data["rows"].length / dexSize);
      // console.log("dexMsg:",dexListData);
      getMarketList(dexPage);
    }, "json");
}

function getMarketList(page) {
  dexPage = page;
  console.log(page,'page');
  var data = dexListData;

  var obj = dexListData.content;
  console.log(obj,'-------------');
  var html = '';
  var html2 = '';
  var loadHtml = '<div class="flex"><div style="padding:30px;background: rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius: 10px;"><img src="imgs/loading.gif" alt=""><br><div style="margin-top:13px;">加载中...</div></div></div>'
  $(".list").html(loadHtml);
  $.each(obj, function(i, n) {

    if (i >= dexPage * dexSize && ((dexPage + 1) * dexSize) > i) {
        

      if(nftSaletype == 1){
        console.log("shjjj:", i, dexPage * dexSize, ((dexPage + 1) * dexSize))
        var tokenid = n.id;
        var nftcontract = getCookie("nftcontract") || 'xlootshovel1';
        console.log(n,'///////');
        
        // html += "<div class='c-asset item' style='' id='myItemId_" + tokenid + "' >";
        // html += '   <div style="background: #2a2c2e;border-radius: 2px;width:100%;height:100%;">';
        // html += '     <div class="flex" style="line-height:17px;padding:0 10px;">';
        // html += '      <div style="color: rgba(0, 0, 0,0);text-align: center;position: relative;overflow: hidden;">';
        // // html += '      <div class="price">售价：'+ n.price +'</div>';
        // html += '      <div class="title">---</div>';
        // html += '      <div class="nftcontract">合约：' + nftcontract + '</div>';
        // html += '      <div class="valueBox">面值：<span class="value">--</span></div>';
        // html += '      <div class="owner">拥有者：' + n.owner + '</div>'
        // html += '      </div>';
				// html += '     </div>';
				// html += '    </div>';
				// html += '</div>';


        // html += '<a id="nft_' + tokenid + '" href="nftAssets.html?tokenid=' + tokenid + '&nftcontract=' + nftcontract + '&type=1&owner=' + n.owner + '">';
        // html += '  <div class="item">';
        // html += '    <div class="nftImgs"></div>';
        // html += '    <div class="parvalue flex">售价：' + getUniteSalePriceShow(n.price) + '</div>';

        // html += '    <div class="itemMsg">';
        // html += '      <div class="title">--</div>';
        // html += '      <div class="nftcontract">合约：' + n.nftcontract + '</div>';
        // html += '      <div class="valueBox">面值：<span class="value">--</span></div>';
        // html += '      <div class="owner">拥有者：' + n.owner + '</div>';

        // html += '    </div>';
        // html += '  </div>';
        // html += '</a>';
        getNftMsg(n);
      }else{

        var tokenid = n.id;
        var nftcontract = getCookie("nftcontract") || 'xlootshovel1';
        
        html += "<div class='c-asset item' style='' id='myItemId_" + tokenid + "' onclick='saleMsgShow(" + JSON.stringify(n) + ")'>";
        html += '   <div style="background: #2a2c2e;border-radius: 2px;width:100%;height:100%;">';
        html += '     <div class="flex" style="line-height:18px;padding:0 10px;">';
        html += '      <div style="color: rgba(0, 0, 0,0);text-align: center;position: relative;overflow: hidden;">';
        html += '        <img class="c-asset__img '+ 'skin' +'" style="height: 153px;max-height: 153px;width:156px;" loading="auto" alt="" src="' + n.imageUrl + '">';
        html += '      <div class="title">'+ n.title +' ( 品质：'+ n.quality +' )</div>';
        html += '      <div class="nftcontract">合约：' + nftcontract + '</div>';
        html += '      <div class="valueBox">面值：<span class="value">'+n.parvalue+'</span></div>';
        html += '      <div class="owner">拥有者：' + n.owner + '</div>'
        html += '      </div>';
				html += '     </div>';
				html += '    </div>';
				html += '</div>';
        

        // html += '<a id="nft_' + tokenid + '" href="nftAssets.html?tokenid=' + tokenid + '&nftcontract=' + nftcontract + '&type=0&owner=' + n.owner + '">';
        // html += '  <div class="item">';
        // html += '    <div class="nftImgs"><img src="'+ n.imageUrl +'?v='+ new Date().getTime() +'"></div>';
        // // html += '    <div class="parvalue flex">售价：' + getUniteSalePriceShow(n.price) + '</div>';

        // html += '    <div class="itemMsg">';
        // html += '      <div class="title">'+ n.title +' ( 品质：'+ n.quality +' )</div>';
        // html += '      <div class="nftcontract">合约：' + nftcontract + '</div>';
        // html += '      <div class="valueBox">面值：<span class="value">'+ n.parvalue +'</span></div>';
        // html += '      <div class="owner">拥有者：' + n.owner + '</div>';

        // html += '    </div>';
        // html += '  </div>';
        // html += '</a>';
      }
      
    }


  })

  $("#myItem").html(html);
  if(obj == ''){
    $("#myItem").html('<div class="flex" style="height:150px;font-size: 20px;">没有对应的资产</div>');
    $(".Pagination").html('');
    return
  }
  html2 += '<div class="Pagination-pages">';
  var num = 10,
    startIndex, endIndex, total;
  total = dexListData.totalPages;
  if (total < num) {
    num = total;
  }
  if (page > 5) {
    if (total <= page + 5) {
      startIndex = page - (num - (total - page));
      endIndex = startIndex + 10;
    } else {
      startIndex = page - 5;
      endIndex = page + 5;
    }
  } else {
    startIndex = 0;
    endIndex = num;
  }
  for (var i = startIndex; i < endIndex; i++) {
    if (i == page) {
      html2 += '<div class="Pagination-page active" onclick="getMarketList(' + i + ')">' + (i + 1) + '</div>';
    } else {
      html2 += '<div class="Pagination-page" onclick="getMarketList(' + i + ')">' + (i + 1) + '</div>';
    }
  }
  html2 += '</div>';
  html2 += '<div>';
  if (page == 0) {
    html2 += '  <div class="Pagination-button disabled">';
  } else {
    html2 += '  <div class="Pagination-button" onclick="getMarketList(' + (page - 1) + ')">';
  }
  html2 += '      上一页';
  html2 += '  </div>';

  if (page == total - 1 || total == 0) {
    html2 += '  <div class="Pagination-button disabled">';
  } else {
    html2 += '  <div class="Pagination-button" onclick="getMarketList(' + (page + 1) + ')">';
  }
  html2 += '      下一页';
  html2 += '  </div>';
  html2 += '</div>'
  $(".Pagination").html(html2);

}

function getNftMsg(obj) {
  console.log(obj,'....................');
  var contract = obj.nftcontract;
  var tokenid = obj.tokenid;
  var api = get_random_api();
  var scope = obj.nftcontract;
  var price = obj.price


  var selfData = {
    json: true, // Get the response as json
    code: contract, // Contract that we target
    scope: dexContractName, // Account that owns the data
    table: 'tokens', // Table name
    index_position: 1,          // Table secondary index
    lower_bound: tokenid, // Table primary key value
    key_type:'i64',
    limit: 1, // Here we limit to 1 to get only the single row with primary key equal to 'testacc'
    reverse: false, // Optional: Get reversed data
    show_payer: false,
  }

  $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData),
    function(data, status) {
      for (x in data["rows"]) {
        var obj = data["rows"][x];
        console.log(obj,'obj');
        var tokenid = obj.id;
        var nftcontract = obj.owner;
        // var parvalueHtml = '<div class="parvalue flex"><img src="imgs/' + getTokenImgs(String(obj.parvalue).split(' ')[1]) + '"> ' + String(obj.parvalue).split(' ')[0] + '</div>';

        var parvalueHtml = '<div class="parvalue flex">面值：' + obj.parvalue + '</div>';


        var html = '';
        html += "<div class='c-asset item' style='' id='myItemId_" + tokenid + "' onclick='unsaleMsgShow(" + JSON.stringify(obj) + ",\""+ price+"\")'>";
        html += '   <div style="background: #2a2c2e;border-radius: 2px;width:100%;height:100%;">';
        html += '     <div class="flex" style="line-height:18px;padding:0 10px;">';
        html += '      <div style="color: rgba(0, 0, 0,0);text-align: center;position: relative;overflow: hidden;">';
        html += '        <img class="c-asset__img '+ 'skin' +'" style="height: 153px;max-height: 153px;width:156px;" loading="auto" alt="" src="' + obj.imageUrl + '">';
        html += '      <div class="price">售价：'+ price+'</div>'
        html += '      <div class="title">'+ obj.title +' ( 品质：'+ obj.quality +' )</div>';
        html += '      <div class="nftcontract">合约：' + nftcontract + '</div>';
        html += '      <div class="valueBox">面值：<span class="value">'+obj.parvalue+'</span></div>';
        html += '      <div class="owner">拥有者：' + obj.owner + '</div>'
        html += '      </div>';
				html += '     </div>';
				html += '    </div>';
				html += '</div>';
        if(html !=''){
          $("#myItem").append(html);
        }
        if(obj == ''){
          $("#myItem").html('<div class="flex" style="height:150px;font-size: 20px;">没有对应的资产</div>');
          $(".Pagination").html('');
          return
        }



        // $('.nftMenu .nftName').html("合约："+getURLPara("nftcontract"));
        // $('.nftMenu .name').html("名称："+obj.title);
        
        // $('.curPriceBox .curPrice').html(obj.owner);



      }
    }, "json");


}





function selectContract(num,contractData){
  // if(num == 0){
  //   // nftContractName = "xlootshovel1";
  //   setCookie("nftcontract",'xlootshovel1');
  //   $.each(nftcontract,function(i,n){
  //     if("xlootshovel1" == n.nftcontract){
  //       setCookie("scope",n.mid);
  //     }
  //   })
    
  // }else if(num == 1){
  //   setCookie("nftcontract",'xpetartnftcc');
  //   $.each(nftcontract,function(i,n){
  //     if("xpetartnftcc" == n.nftcontract){
  //       setCookie("scope",n.mid);
  //     }
  //   })
  //   // nftContractName = "xpetartnftcc";
  // }else if(num == 2){
  //   setCookie("nftcontract",'xpetartnftcc');
  //   $.each(nftcontract,function(i,n){
  //     if("xpetartnftcc" == n.nftcontract){
  //       setCookie("scope",n.mid);
  //     }
  //   })
  //   // nftContractName = "xpetartnftcc";
  // }else if(num == -1){
  //   setCookie("scope",'');
  //   setCookie("nftcontract",'');

  // }else{
  //   if($("#userInputContractBox").val() == ''){
  //     showMsg("请输入您的NFT资产合约名");
  //     return
  //   }
  //   setCookie("nftcontract",$("#userInputContractBox").val())

  // }

  if(num >= 0){
    setCookie("nftcontract",contractData);
    setCookie("scope",'');
    $.each(nftcontract,function(i,n){
      if(contractData == n.nftcontract){
        setCookie("scope",n.mid);
      }
    })
  }else if(num == -1){
    setCookie("scope",'');
    setCookie("nftcontract",'');
  }else{
    if($("#userInputContractBox").val() == ''){
      showMsg("请输入您的NFT资产合约名");
      return
    }
    setCookie("scope",$("#userInputContractBox").val());
    setCookie("nftcontract",$("#userInputContractBox").val());
  }


  $('#contractBox').hide();
  window.location.reload();
}

function getUserNft() {
  if(!getCookie("account")){
    showMsg("请登录");
    return
  }
  myNftListloading = true;
  
  mySaleNftMore = true;
  nftSaletype = 0;
  dexListType = '';
  getDexListData();
  return
}

function getTotalmarket() {
  console.log('出售中');
  if(!getCookie("account")){
    showMsg("请登录");
    return
  }
  mySaleNftListloading = true;
  myNftMore = true;
  nftSaletype = 1;
  dexListType = 'sale';
  
  getDexListData();
  return
}


function transferOk() {
  if($("#transferAmount").val() == ''){
    showMsg("请输入转账账号");
    return
  }
  var toUser = $("#transferAmount").val();
  var toMemo = $("#transferMemo").val();
  console.log(toUser);
  console.log(nftcontract);
  // var contract = '';
  // $.each(payCoin,function(i,n){
  //   if(selectCoin == n.coin){
  //     contract = n.contract;
  //   }
  // })
  // quantity = Number(num).toFixed(4) + " LOOT";
  checkScatter(function(user) {
    // $("#showLoading").show();
    var authorization;
    const eos = loot.scatter.eos(network, Eos);
    const account = user.name;
    authorization = [{
      actor: account,
      permission: user.authority
    }]


    eos.transaction({
      actions: [{
        account: getCookie('nftcontract'),
        name: 'transfer',
        authorization: authorization,
        data: {
          id: objMsg.id,
          from: account,
          to: toUser,
          memo: toMemo
        }
      }]
    }).then(res => {
      showMsg("转账成功！");
      $("#showLoading").hide();
      $('.cdk-overlay-container').hide();
      $('#transferAssetOKShow').hide();
      setTimeout(function() {
        getMyItem(0);
      }, 10000)
    }).catch(e => {
      $("#showLoading").hide();
      eosErrorShow(e);
    });
  })
}

function saleNftOk() {
  if($("#lootNum").val() == ''){
    showMsg("请输入出售金额");
    return
  }
  
  var toUser = saleContractName;
  var contract = '';
  var num = 4;
  var memo = '';
  var selectCoin=$('#select-coin').val()
  memo = 'SALE-'+ Number($("#lootNum").val()).toFixed(num) +' '+ selectCoin +'-UCAT'

  // quantity = Number(num).toFixed(4) + " LOOT";
  checkScatter(function(user) {
    // $("#showLoading").show();
    var authorization;
    const eos = loot.scatter.eos(network, Eos);
    const account = user.name;
    authorization = [{
      actor: account,
      permission: user.authority
    }]


    eos.transaction({
      actions: [{
        account: getCookie("nftcontract"),
        name: 'transfer',
        authorization: authorization,
        data: {
          id: objMsg.id,
          from: account,
          to: toUser,
          memo: memo
        }
      }]
    }).then(res => {
      showMsg("上架成功！");
      $("#showLoading").hide();
      $('.cdk-overlay-container').hide();
      $('#transferAssetOKShow').hide();
      setTimeout(()=>{
        window.location.reload()
        Navtab(1)
      },500)
      
      // setTimeout(()=>{
      //   window.location.reload()
      // },1000)
    }).catch(e => {
      $("#showLoading").hide();
      eosErrorShow(e);
    });
  })
}


function unsaleNftOk() {
  // if($("#saleNum").val() == ''){
  //   showMsg("请输入出售金额");
  //   return
  // }
  // var toUser = saleContractName;
  // var contract = '';
  // var num = 4;
  // var memo = '';
  // $.each(payCoin,function(i,n){
  //   if(selectCoin == n.coin){
  //     contract = n.contract;
  //     num = n.num;
  //   }
  // })

  // quantity = Number(num).toFixed(4) + " LOOT";
  checkScatter(function(user) {
    // $("#showLoading").show();
    var authorization;
    const eos = loot.scatter.eos(network, Eos);
    const account = user.name;
    authorization = [{
      actor: account,
      permission: user.authority
    }]


    eos.transaction({
      actions: [{
        account: dexContractName,
        name: 'unsale',
        authorization: authorization,
        data: {
          tokenid: objMsg.id,
          nftcontract: getCookie("nftcontract")
        }
      }]
    }).then(res => {
      showMsg("下架成功！");
      // $('#unsaleBox').hide();
    $('.cdk-overlay-container').hide();
    setTimeout(()=>{
      window.location.reload()
      Navtab(0)
    },500)
    
    
    }).catch(e => {

      eosErrorShow(e);
    });
  })
}


function buyNftOk() {
  console.log(objMsg,'?????');
  var toUser = dexContractName;
  var contract = '';
  var num = 4;
  var memo = 'BUY-'+ objMsg.contract+'-'+objMsg.tokenId;


  // var nftCoin = String(nftSalePrice).split(' ')[1];
  // var selectCoin = '';
  var selfContract = 'eosio.token';



  // $.each(payCoin,function(i,n){
  //   if(nftCoin == n.coin){
  //     selfContract = n.contract;
  //     num = n.num;
  //   }
  // })


  quantity = objMsg.quantity;
  
  // quantity = '1.0000 EOS';


  checkScatter(function(user) {
    // $("#showLoading").show();
    var authorization;
    const eos = loot.scatter.eos(network, Eos);
    const account = user.name;
    authorization = [{
      actor: account,
      permission: user.authority
    }]


    eos.transaction({
      actions: [{
        account: selfContract,
        name: 'transfer',
        authorization: authorization,
        data: {
          from: account,
          to: toUser,
          quantity: quantity,
          memo: memo
        }
      }]
    }).then(res => {
      showMsg("购买成功！");
      // $('#buyNftBox').hide()
    }).catch(e => {

      eosErrorShow(e);
    });
  })
}
function getListOrder(page) {
	$("#saleMarketLoadingShow").show();
	// var url = '/api/xpet/getSaleMarket.do';
	var url = '/api/listDexOrder.do';
  var filters="price:"+$('#priceLow').val()+"-"+$('#priceHigh').val()+"|"+"level:"+$('#filter-level').val()+ "-" +$('#filter-level').val()+"|"+"quality:"+$('#qualityLow').val()+"-"+$('#qualityHigh').val()+"|"+"category:"+$('#filter-classify').val()+"-"+$('#filter-classify').val()+"|"+"asset:"+$('#filter-price-unit').val()+"-"+$('#filter-price-unit').val()
	// console.log('filters',filters);
  var selfData = {
    page: page,
    size: 10,
    filter:filters
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
						html += '    <div style="background: #2a2c2e;border-radius: 2px;width:100%;height:100%;">';
						html += '      <div class="flex" style="line-height: 18px;padding:0 10px;">';
            html += '      <div style="color: rgba(0, 0, 0,0);text-align: center;position: relative;overflow: hidden;">';
            html += '        <img class="c-asset__img '+ 'skin' +'" style="height: 153px;max-height: 153px;width:156px;" loading="auto" alt="" src="' + imageUrl + '">';
            html += '      <div class="price">售价：'+ n.quantity+'</div>'
            html += '      <div class="title">'+ n.name +' ( 品质：'+ n.quality +' )</div>';
            html += '      <div class="nftcontract">合约：' + n.contract + '</div>';
            html += '      <div class="valueBox">面值：<span class="value">'+n.parValue+'</span></div>';
            html += '      <div class="owner">拥有者：' + n.owner + '</div>'
            html += '      </div>';
            html += '     </div>';
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

