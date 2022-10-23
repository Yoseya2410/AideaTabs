//这里的代码注入所有网页
window.onload = function () {
  /**等网页加载完后执行**/
  //检测编辑模式是否关闭，如果没有则继续开启编辑模式
  var altpg = window.localStorage.getItem("altpg");
  if (altpg == "1") {
    document.body.contentEditable = "true";
    document.designMode = "on";
    void 0;
  }

  /**快捷键功能*/
  document.onkeydown = onKeyDown;
  function onKeyDown() {
    //Alt+G 自由编辑
    var altpg = window.localStorage.getItem("altpg");
    if (window.event.altKey && window.event.keyCode === 71) {
      if (altpg == null || altpg == "null" || altpg == "") {
        var isbeauty = confirm("Do you want to start God mode?");
        if (isbeauty == true) {
          document.body.contentEditable = "true";
          document.designMode = "on";
          void 0;
          window.localStorage.setItem("altpg", "1");
        }
      } else {
        var isbeauty = confirm("Do you want to turn off God Mode?");
        if (isbeauty == true) {
          document.body.contentEditable = "false";
          void 0;
          window.localStorage.removeItem("altpg");
          altpg = null;
        }
      }
    }
  }
  

};
