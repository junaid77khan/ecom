var VJR_BANNER=VJR_BANNER||{init:function(t){var o;if("no"!==VJR_BANNER.getCookie("need")&&/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&t.title&&t.days&&t.image_url&&t.appid&&(t.ios_appid||t.android_packagage_name)&&(navigator.userAgent.includes("Android")?t.android_packagage_name&&(o="https://play.google.com/store/apps/details?id="+t.android_packagage_name):(navigator.userAgent.includes("iPhone")||navigator.userAgent.includes("iPad")||navigator.userAgent.includes("iPod"))&&t.ios_appid&&(o="https://apps.apple.com/us/app/id"+t.ios_appid),t.button_text||(t.button_text="INSTALL"),o&&0===window.location.pathname.localeCompare("/"))){var e=document.createElement("style");e.type="text/css",e.innerText='.smartbanner{left:0;top:0;width:100%;font-family:"Helvetica Neue",helvetica,arial,sans-serif;background:#fff;overflow:hidden;margin-bottom:10px;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:none}.smartbanner-container{height:120px;margin:0 auto}.smartbanner-close{position:absolute;left:7px;top:32px;display:block;font-family:ArialRoundedMTBold,Arial;font-size:15px;text-align:center;text-decoration:none;border-radius:14px;-webkit-font-smoothing:subpixel-antialiased;border:0;width:17px;height:17px;line-height:17px;color:#b1b1b3;background:#efefef}.smartbanner-close:active,.smartbanner-close:hover{color:#333}.smartbanner-icon{box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22);border-radius:10px;position:absolute;left:40px;top:40px;display:block;width:70px;height:70px;background-color:#fff;background-size:cover;background-image:url('+t.image_url+")}.smartbanner-info{position:absolute;left:130px;top:25%;width:44%;font-size:12px;line-height:1.2em;font-weight:700;color:#999}.smartbanner-title{font-size:15px;line-height:17px;color:#000;font-weight:700}.smartbanner-button{margin-left:5%;margin-right:5%;position:absolute;right:0;top:70%;padding:0 10px;width:90%;height:25px;font-size:10px;line-height:0px;text-align:center;font-weight:700;color:"+t.text_color+"!important;background-color:"+t.button_color+"!important;text-decoration:none;border-radius:0}.smartbanner-button-text{margin-top:12.5px;text-align:center;display:block;padding:0 5px}a.link{cursor:help;text-decoration:underline}[data-ml-modal]{position:fixed;top:0;bottom:0;left:0;right:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:999;width:0;height:0;opacity:0}[data-ml-modal]:target{width:auto;height:auto;opacity:1;-webkit-transition:opacity 1s ease;transition:opacity 1s ease}[data-ml-modal]:target .modal-overlay{position:fixed;top:0;bottom:0;left:0;right:0;cursor:pointer;background-color:#000;background-color:rgba(0,0,0,.7);z-index:1}[data-ml-modal] .modal-dialog{position:relative;width:100%;max-width:660px;max-height:70%;margin:0;overflow-x:hidden;overflow-y:auto;z-index:2}.modal-dialog-lg{max-width:100%!important}[data-ml-modal] .modal-dialog>h3{background-color:#fff;font-size:24px;font-weight:400;margin:0;padding:.8em 56px .8em 27px}[data-ml-modal] .modal-content{background:#fff;padding:23px 27px;height:30%;border:0px !important;}[data-ml-modal] .modal-close{padding:6px;position:absolute;top:13px;right:0px;color:#000;background-color:#FFF;border-radius:50%;height:50px;width:50px;font-size:20px;line-height:37px;text-align:center;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}[data-ml-modal] .modal-close:hover{background-color:#FFF;color:#000;cursor:pointer}[data-ml-modal] p:first-child,[data-ml-modal] p:last-child{margin:0;font-size:10px;color:grey;margin-bottom:5px}@media (max-width:767px){[data-ml-modal] .modal-dialog{margin:0 auto}}*,:after,:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}a{text-decoration:none;outline:0}.center{text-align:center!important}.btn{display:inline-block;margin-bottom:0;font-weight:400;text-align:center;vertical-align:middle;touch-action:manipulation;cursor:pointer;background-image:none;border:2px solid transparent;white-space:normal;padding:3px 14px;font-size:18px;border-radius:3px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.btn-default{border-color:#0085a6}a.btn-default:hover{background-color:#0085a6;color:#fff}pre{overflow:auto;font-size:1em}",document.head.appendChild(e),document.addEventListener("DOMContentLoaded",function(){var e=document.createElement("div");e.innerHTML='<div data-ml-modal id="modal-12" style="z-index:999999999999999999999999;"><a href="#!" class="modal-overlay"></a><div class="modal-dialog modal-dialog-lg"><div class = "smartbanner" id = "smartabanner" style = "z-index:999999999999999999;" ><div class="modal-content"><div class = "smartbanner-container" ><a href="#!" onclick="return VJR_BANNER.setCookie(\'need\',\'no\','+t.days+')" class="modal-close">&times;</a><span class="smartbanner-icon"></span ><div class = "smartbanner-info" ><div class = "smartbanner-title" >'+t.title+"</div><div>"+t.sub_title+'</div ></div><a href="'+o+'" target="_blank" class="smartbanner-button"><span class="smartbanner-button-text">'+t.button_text+'</span ></a></div ></div><p class="center">Scroll down to continue in browser</p></div></div></div>',document.body.appendChild(e)}),setTimeout(function(){location.href="/#modal-12",window.onscroll=function(){(document.body.scrollTop>250||document.documentElement.scrollTop>250)&&(location.href="/#!")}},5e3)}},setCookie:function(t,o,e){var a=new Date;a.setTime(a.getTime()+24*e*60*60*1e3);var n="expires="+a.toUTCString();document.cookie=t+"="+o+";"+n+";path=/"},getCookie:function(t){for(var o=t+"=",e=document.cookie.split(";"),a=0;a<e.length;a++){for(var n=e[a];" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(o))return n.substring(o.length,n.length)}return""}};