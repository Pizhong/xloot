

$(function () {
      if(getCookie("token")){
            getSteamInfo();
            if(getURLPara("openid.identity")){
                  var steamId = String(getURLPara("openid.identity")).split('/id/')[1];
                  setSteamInfo({steamId:steamId},function () {
                        showMsg("设置成功");
                        //steamId   appKey   stemUrl  steamNick
                  })
            }
      }else{
            showMsg(get_lan("noLoginShow"));
            panelShow(0);
      }
})




function getSteamInfo() {
      var url = '/api/getSteamInfo.do';
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
                        if(!obj){
                              console.log("no msg")
                              return
                        }
                        if(obj.steamId){
                              $("#SteamIDShow strong").html(obj.steamId);
                              $("#SteamIDInput").val(obj.steamId);

                              $("#SteamIDShow").show();
                              $("#SteamIDShow2").hide();
                        }else{
                              $("#SteamIDShow").hide();
                              $("#SteamIDShow2").show();
                        }

                        if(obj.appKey){
                              // $("#APIKeyShow strong").html(obj.appKey);
                              $("#APIKeyInput").val(obj.appKey);
                              $("#APIKeyShow").show();
                              $("#APIKeyShow2").hide();
                        }else{
                              $("#APIKeyShow").hide();
                              $("#APIKeyShow2").show();
                        }

                        if(obj.steamUrl){
                              $("#stemUrlShow strong").html(obj.steamUrl);
                              $("#stemUrlInput").val(obj.steamUrl);
                              $("#stemUrlShow").show();
                              $("#stemUrlShow2").hide();
                        }else{
                              $("#stemUrlShow").hide();
                              $("#stemUrlShow2").show();
                        }

                        if(obj.steamNick){
                              $("#nicknameShow strong").html(obj.steamNick);
                              $("#nicknameInput").val(obj.steamNick);
                              $("#nicknameShow").show();
                              $("#nicknameShow2").hide();
                        }else{
                              $("#nicknameShow").hide();
                              $("#nicknameShow2").show();
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



function setSteamInfo(selfData,fun) {
      var url = '/api/setSteamInfo.do';
      $.ajax({
            type: 'post',
            url: url,
            data: selfData,
            headers: {
                  'Authorization': "BASIC " + getCookie("token")
            },
            dataType: 'json',
            success: function(data) {
                  if (data.code == 200) {
                        var obj = data.object;

                        var html = '';
                        if (obj) {
                              fun();
                              getSteamInfo();
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





function nicknameShowFun() {

      $("#nicknameShow").hide();
      $("#nicknameShow2").show();

}
function nicknameShowFun2() {
      if($("#nicknameInput").val() == ''){
            showMsg("请输入昵称");
            return
      }
      $("#nicknameShow2").hide();
      $("#nicknameShow").show();
      setSteamInfo({steamNick:$("#nicknameInput").val()},function () {
            showMsg("昵称设置成功");
            //stemId   appKey   stemUrl  stemNick
      })
}



function SteamIDShowFun() {

      $("#SteamIDShow").hide();
      $("#SteamIDShow2").show();

}
function SteamIDShowFun2() {
      if($("#SteamIDInput").val() == ''){
            showMsg("请输入Steam ID");
            return
      }
      $("#SteamIDShow2").hide();
      $("#SteamIDShow").show();
      setSteamInfo({steamId:$("#SteamIDInput").val()},function () {
            showMsg("SteamID设置成功");
            //stemId   appKey   stemUrl  stemNick
      })

}


function APIKeyShowFun() {

      $("#APIKeyShow").hide();
      $("#APIKeyShow2").show();

}
function APIKeyShowFun2() {
      if($("#APIKeyInput").val() == ''){
            showMsg("请输入API key");
            return
      }
      $("#APIKeyShow2").hide();
      $("#APIKeyShow").show();
      setSteamInfo({appKey:$("#APIKeyInput").val()},function () {
            showMsg("APIKey设置成功");
            
      })

}

function stemUrlShowFun() {

      $("#stemUrlShow").hide();
      $("#stemUrlShow2").show();

}
function stemUrlShowFun2() {
      if($("#stemUrlInput").val() == ''){
            showMsg("请输入交易链接");
            return
      }
      $("#stemUrlShow2").hide();
      $("#stemUrlShow").show();
      setSteamInfo({steamUrl:$("#stemUrlInput").val()},function () {
            showMsg("交易链接设置成功");
            //stemId   appKey   stemUrl  stemNick
      })

}


function updatePass(this_but){
    if(!$("#oldpass").val()){
        alert('请输入原密码!');
        return false;
    }
    if(!$("#newpass").val()){
        alert('请输入新密码!');
        return false;
    }
    if($("#newpass").val() != $("#newpass2").val()){
        alert('密码不一致!');
        return false;
    }

      $.ajax({
            type: 'PUT',
            url: '/api/customers.do',
            dataType: 'json',
            headers: {
            'Authorization': "BASIC " + getCookie("token")
        },
        data: {
            oldPassword: $("#oldpass").val(),
            newPassword: $("#newpass").val()
        },
        success: function (data) {
            
            if (data.code == 200) {
                  alert('密码修改' + data.message);
                  $('.cdk-overlay-container').hide();
                  // setTimeout(function(){window.location.href = "index.html"}, 2000);
            }else{
                  alert(data.message);
            }
        },
        error: function (data) {
            //判断token是否有效
            if (data.status == 401) {
                  alert(data.message);
            }
        }
      });
}


function setPasswordShow() {
      var html = '';


      html += '<div class="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>';
      html += '<div class="cdk-global-overlay-wrapper" style="justify-content: center; align-items: center;">';
      html += '  <div class="cdk-overlay-pane" style="max-width: 80vw; pointer-events: auto; position: static;">';
      html += '    <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div>';
      html += '    <mat-dialog-container class="mat-dialog-container ng-tns-c30-29-dialogContainer" style="transform:none;0:transform;transform:none;webkit-transform:none;">';
      html += '      <change-password-dialog>';
      html += '        <div class="c-dialog c-dialog--profile">';
      html += '          <div class="c-dialogHeader c-dialogHeader--center">';
      html += '            <h4 class="c-dialogHeader__title" translate="">修改密码</h4>';
      html += '            <button class="c-dialogHeader__close" mat-dialog-close="" type="button" data-analytics-id="logIn_close" onclick="$(\'.cdk-overlay-container\').hide()">';
      html += '              <img src="images/close.png" alt="" class="mat-icon notranslate material-icons mat-icon-no-color">';
      html += '            </button>';
      html += '          </div>';
      html += '          <form class="c-dialogProfile ng-untouched ng-pristine ng-invalid"';
      html += '          novalidate="" style="">';
      html += '            <div class="c-dialogProfile__field">';
      html += '              <dm-input-password ngdefaultcontrol="" class="ng-untouched ng-pristine ng-invalid">';
      html += '                <mat-form-field appearance="fill" class="mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
      html += '                  <div class="mat-form-field-wrapper">';
      html += '                    <div class="mat-form-field-flex">';
      html += '                      <div class="mat-form-field-infix" style="border-top-width: 0px;padding-top: 0px;">';
      html += '                        <input type="password" placeholder="请输入旧密码" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="8" id="oldpass">';
      html += '                      </div>';
      html += '                    </div>';
      html += '                    <div class="mat-form-field-underline">';
      html += '                      <span class="mat-form-field-ripple"></span>';
      html += '                    </div>';
      html += '                    <div class="mat-form-field-subscript-wrapper">';
      html += '                      <div class="mat-form-field-hint-wrapper" style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
      html += '                        <div class="mat-form-field-hint-spacer">';
      html += '                        </div>';
      html += '                      </div>';
      html += '                    </div>';
      html += '                  </div>';
      html += '                </mat-form-field>';
      html += '              </dm-input-password>';
      html += '            </div>';
      html += '            <div class="c-dialogProfile__field">';
      html += '              <dm-input-password ngdefaultcontrol="" class="ng-untouched ng-pristine ng-invalid">';
      html += '                <mat-form-field appearance="fill" class="mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
      html += '                  <div class="mat-form-field-wrapper">';
      html += '                    <div class="mat-form-field-flex">';
      html += '                      <div class="mat-form-field-infix" style="border-top-width: 0px;padding-top: 0px;">';
      html += '                        <input type="password" placeholder="请输入新密码" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="8" id="newpass">';
      html += '                      </div>';
      html += '                    </div>';
      html += '                    <div class="mat-form-field-underline">';
      html += '                      <span class="mat-form-field-ripple"></span>';
      html += '                    </div>';
      html += '                    <div class="mat-form-field-subscript-wrapper">';
      html += '                      <div class="mat-form-field-hint-wrapper" style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
      html += '                        <div class="mat-form-field-hint-spacer"></div>';
      html += '                      </div>';
      html += '                    </div>';
      html += '                  </div>';
      html += '                </mat-form-field>';
      html += '              </dm-input-password>';
      html += '            </div>';
      html += '            <div class="c-dialogProfile__field">';
      html += '              <mat-form-field appearance="fill" class="mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float mat-form-field-has-label mat-form-field-hide-placeholder ng-untouched ng-pristine ng-invalid">';
      html += '                <div class="mat-form-field-wrapper">';
      html += '                  <div class="mat-form-field-flex">';
      html += '                    <div class="mat-form-field-infix" style="border-top-width: 0px;padding-top: 0px;">';
      html += '                      <input type="password" placeholder="重输一次新密码" style="background: none;border:0;height:100%;width:100%;font-size:20px;" maxlength="8" id="newpass2">';
      html += '                    </div>';
      html += '                  </div>';
      html += '                  <div class="mat-form-field-underline">';
      html += '                    <span class="mat-form-field-ripple">';
      html += '                    </span>';
      html += '                  </div>';
      html += '                  <div class="mat-form-field-subscript-wrapper">';
      html += '                    <div class="mat-form-field-hint-wrapper" style="opacity:1;transform:translateY(0%);0:opacity;1:transform;opacity:1;transform:translateY(0%);webkit-opacity:1;webkit-transform:translateY(0%);">';
      html += '                      <div class="mat-form-field-hint-spacer"></div>';
      html += '                    </div>';
      html += '                  </div>';
      html += '                </div>';
      html += '              </mat-form-field>';
      html += '            </div>';
      html += '            <div class="c-dialogProfile__button o-dmButton o-dmButton--green mat-ripple" onclick="updatePass(this)" style="line-height: 48px;">';
      html += '                保存';
      html += '            </div>';
      html += '          </form>';
      html += '        </div>';
      html += '      </change-password-dialog>';
      html += '    </mat-dialog-container>';
      html += '    <div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true">';
      html += '    </div>';
      html += '  </div>';
      html += '</div>';
      $("#panelShow").html(html).show();

}


function bindMySteamMsg(){
      var url = '/api/steamAuth.do';
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

                        var html = '';
                        if (obj) {
                              window.open(obj);
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
