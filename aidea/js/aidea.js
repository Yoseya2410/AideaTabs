surl = document.getElementById("search_input").value;
/*定位到搜索框 */
document.getElementById("search_input").focus();
//判断用户代理是否为移动端
try {
  var urlhash = window.location.hash;
  if (!urlhash.match("fromapp")) {
    if (navigator.userAgent.match(/(iPhone|Android)/i)) {
      var UAvalue = "1"; //如果为移动端则赋值为"1"
    }
  }
} catch (err) { }

//禁用右键
window.onload = function () {
  //去掉默认的contextmenu事件，否则会和右键事件同时出现。
  document.oncontextmenu = function (e) {
    e.preventDefault();
  };
  document.onmousedown = function (e) {
    if (e.button == 2) {
      //点击右键事件
    } else if (e.button == 1) {
      //点击滚轮事件
    }
  };
};

/*运行JavaScript*/
function runjs(scriptText) {
  //获取head的标签
  var head = document.getElementsByTagName("head")[0];
  //创建script标签
  var script = document.createElement("script");
  //属性赋值
  script.type = "text/javascript";
  //下面为必要操作 否则将不能使用script标签中的内容
  script.onload = script.onreadystatechange = function () {
    if (
      !this.readyState ||
      this.readyState === "loaded" ||
      this.readyState === "complete"
    ) {
      script.onload = script.onreadystatechange = null;
    }
  };
  //添加src属性值
  script.innerText = scriptText;
  head.appendChild(script);
}
//设置Cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
//读取Cookie
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
//自定义快捷键(cookie方法/已弃用)
function cookiecustomkey(keyname) {
  var user = getCookie(keyname);
  if (user != "") {
    window.location.href = user + document.getElementById("search_input").value;
  } else {
    user = prompt(
      "请输入要添加的搜索引擎URL",
      "例如:https://www.google.com/search?q="
    );
    if (user != "" && user != null) {
      setCookie(keyname, user, 3650);
    }
  }
}
//重置快捷键(cookie方法/已弃用)
function cookieresetkey(keyname) {
  var user = getCookie(keyname);
  setCookie(keyname, user, 0);
}

//自定义快捷键(localStorage方法)
function localStoragecustomkey(key) {
  var storevalue = window.localStorage.getItem(key);
  if (storevalue == null || storevalue == "null" || storevalue == "") {
    var Response = prompt(
      "请输入要添加的搜索引擎URL",
      "例如:https://www.google.com/search?q="
    );
    window.localStorage.setItem(key, Response);
  } else {
    window.location.href =
      storevalue + document.getElementById("search_input").value;
  }
}

//重置快捷键(localStorage方法)
function localStorageresetkey(key) {
  window.localStorage.removeItem(key);
}

//执行脚本快捷键
function localStorageruncode(key) {
  var storevalue = window.localStorage.getItem(key);
  if (storevalue == null || storevalue == "null" || storevalue == "") {
    var Response2 = prompt("请输入要添加的脚本代码", "");
    window.localStorage.setItem(key, Response2);
  } else {
    runjs(storevalue);
  }
}
/*搜索功能*/
function fastseek() {
  surl = document.getElementById("search_input").value;
  if (surl == "") {
  } else {
    document.getElementById("url").style.display = "inline";
    document.getElementById("box").style.display = "none";
  }
  return false;
}
//判断是否为URL
function IsURL(strUrl) {
  var regular =
    /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|top|xyz|wang|pub|xin|tech|ink|pro|museu|red|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+, #.!\/~%\$]*)?)$/i;
  if (regular.test(strUrl)) {
    return true;
  } else {
    return false;
  }
}
//判断是否为邮箱
function isEmail(str) {
  var re =
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if (re.test(str)) {
    return true;
  } else {
    return false;
  }
}
/*判断当前协议是否为http或https*/
function ishttp() {
  protocol = document.location.protocol;
  if (protocol == "http:" || protocol == "https") {
    return true;
  } else {
    return false;
  }
}

//搜索逻辑
function search() {
  surl = document.getElementById("search_input").value;
  document.getElementById("dropdown-menu").style.display = "none";
  if (surl == "/index") {
  } else {
    if (surl == "/notion") {
    } else {
      if (IsURL(surl)) {
        fastseek();
        document.getElementById("more").style.display = "none";
        document.getElementById("visit").style.display = "inline";
        document.getElementById("stow").style.display = "none";
        
      } else {
        if (isEmail(surl)) {
          window.location.href = "mailto:" + surl;
        } else {
          fastseek();
          document.getElementById("visit").style.display = "none";
          var stowvalu = window.localStorage.getItem(stowvalu);
          if (stowvalu == null || stowvalu == "null" || stowvalu == "") {
            document.getElementById("more").style.display = "inline";
          } else {
          }
        }
      }
    }
  }
}

/*此函数方便控件隐藏*/
function none() {
  document.getElementById("url").style.display = "none";
  document.getElementById("visit").style.display = "none";
  document.getElementById("stow").style.display = "none";
  window.localStorage.setItem("history", surl);
}

/*引擎切换*/
var searchlogo = document.getElementById("searchlogo");
var dromenu = document.getElementById("dropdown-menu");
var timenull = null;
//鼠标离开搜索引擎菜单后自动关闭菜单
dromenu.onmouseover = dromenu.onmouseover = function () {
  if (timenull) clearTimeout(timenull);
  dromenu.style.display = "block";
  dromenu.onmouseout = dromenu.onmouseout = function () {
    dromenu.style.display = "none";
  };
};
//点击搜索图标显示搜索引擎菜单
searchlogo.onclick = function () {
  none();
  document.getElementById("dropdown-menu").style.display = "inline";
  document.getElementById("more").style.display = "inline";
  document.getElementById("box").style.display = "none";
};

//引擎菜单选项事件
var defgoogle = document.getElementById("defgoogle");
var defbaidu = document.getElementById("defbaidu");
var defbing = document.getElementById("defbing");
var defcustomize = document.getElementById("defcustomize");
var defdefault = document.getElementById("defdefault");

defgoogle.onclick = function () {
  window.localStorage.setItem("engine", "https://www.google.com/search?q=");
  document.getElementById("dropdown-menu").style.display = "none";
  document.getElementById("search_input").focus();
};
defbaidu.onclick = function () {
  window.localStorage.setItem("engine", "https://yandex.com/search/?text=");
  document.getElementById("dropdown-menu").style.display = "none";
  document.getElementById("search_input").focus();
};
defbing.onclick = function () {
  window.localStorage.setItem("engine", "https://www.bing.com/search?q=");
  document.getElementById("dropdown-menu").style.display = "none";
  document.getElementById("search_input").focus();
};
defcustomize.onclick = function () {
  var enginevalue = window.localStorage.getItem("engine");
  if (enginevalue == null || enginevalue == "null" || enginevalue == "") {
    var Response = prompt(
      "Please enter the search engine URL to set",
      "for instance,https://www.google.com/search?q="
    );
    window.localStorage.setItem("engine", Response);
  } else {
    var Response = prompt("Please enter the search engine URL to set", enginevalue);
    if (Response) {
      window.localStorage.setItem("engine", Response);
    } else {
    }
  }
  document.getElementById("dropdown-menu").style.display = "none";
  document.getElementById("search_input").focus();
};
defdefault.onclick = function () {
  window.localStorage.removeItem("engine");
  document.getElementById("dropdown-menu").style.display = "none";
  document.getElementById("search_input").focus();
};

/*按钮URL自定义*/
var urlbutton1 = document.getElementById("baidu");
var urlbutton2 = document.getElementById("google");
var urlbutton3 = document.getElementById("bing");
var urlbutton4 = document.getElementById("bilibili");
var urlbutton5 = document.getElementById("zhihu");
var urlbutton6 = document.getElementById("github");
var urlbutton7 = document.getElementById("more");

//按钮更改填写
urlbutton1.oncontextmenu = function () {
  var beauty = confirm("Do you want to change the search engine for this button");
  if (beauty) {
    var buttoname = prompt("Please name the button");
    if (buttoname) {
      window.localStorage.setItem("buttonName1", buttoname);
      var namevalue = window.localStorage.getItem("buttonName1");
      urlbutton1.innerHTML = namevalue;
      var buttonurl = prompt("Please enter the changed search engine URL");
      if (buttonurl) {
        window.localStorage.setItem("buttonUrl1", buttonurl);
      } else if (buttonurl === "") {
        alert("You didn't fill in the content");
      } else {
      }
    } else if (buttoname === "") {
      alert("You didn't fill in the content");
    } else {
    }
  } else {
  }
  return false;
};
urlbutton2.oncontextmenu = function () {
  var beauty = confirm("Do you want to change the search engine for this button");
  if (beauty) {
    var buttoname = prompt("Please name the button");
    if (buttoname) {
      window.localStorage.setItem("buttonName2", buttoname);
      var namevalue = window.localStorage.getItem("buttonName2");
      urlbutton2.innerHTML = namevalue;
      var buttonurl = prompt("Please enter the changed search engine URL");
      if (buttonurl) {
        window.localStorage.setItem("buttonUrl2", buttonurl);
      } else if (buttonurl === "") {
        alert("You didn't fill in the content");
      } else {
      }
    } else if (buttoname === "") {
      alert("You didn't fill in the content");
    } else {
    }
  } else {
  }
  return false;
};
urlbutton3.oncontextmenu = function () {
  var beauty = confirm("Do you want to change the search engine for this button");
  if (beauty) {
    var buttoname = prompt("Please name the button");
    if (buttoname) {
      window.localStorage.setItem("buttonName3", buttoname);
      var namevalue = window.localStorage.getItem("buttonName3");
      urlbutton3.innerHTML = namevalue;
      var buttonurl = prompt("Please enter the changed search engine URL");
      if (buttonurl) {
        window.localStorage.setItem("buttonUrl3", buttonurl);
      } else if (buttonurl === "") {
        alert("You didn't fill in the content");
      } else {
      }
    } else if (buttoname === "") {
      alert("You didn't fill in the content");
    } else {
    }
  } else {
  }
  return false;
};

urlbutton4.oncontextmenu = function () {
  var beauty = confirm("Do you want to change the search engine for this button");
  if (beauty) {
    var buttoname = prompt("Please name the button");
    if (buttoname) {
      window.localStorage.setItem("buttonName4", buttoname);
      var namevalue = window.localStorage.getItem("buttonName4");
      urlbutton4.innerHTML = namevalue;
      var buttonurl = prompt("Please enter the changed search engine URL");
      if (buttonurl) {
        window.localStorage.setItem("buttonUrl4", buttonurl);
      } else if (buttonurl === "") {
        alert("You didn't fill in the content");
      } else {
      }
    } else if (buttoname === "") {
      alert("You didn't fill in the content");
    } else {
    }
  } else {
  }
  return false;
};

urlbutton5.oncontextmenu = function () {
  var beauty = confirm("Do you want to change the search engine for this button");
  if (beauty) {
    var buttoname = prompt("Please name the button");
    if (buttoname) {
      window.localStorage.setItem("buttonName5", buttoname);
      var namevalue = window.localStorage.getItem("buttonName5");
      urlbutton5.innerHTML = namevalue;
      var buttonurl = prompt("Please enter the changed search engine URL");
      if (buttonurl) {
        window.localStorage.setItem("buttonUrl5", buttonurl);
      } else if (buttonurl === "") {
        alert("You didn't fill in the content");
      } else {
      }
    } else if (buttoname === "") {
      alert("You didn't fill in the content");
    } else {
    }
  } else {
  }
  return false;
};
urlbutton6.oncontextmenu = function () {
  var beauty = confirm("Do you want to change the search engine for this button");
  if (beauty) {
    var buttoname = prompt("Please name the button");
    if (buttoname) {
      window.localStorage.setItem("buttonName6", buttoname);
      var namevalue = window.localStorage.getItem("buttonName6");
      urlbutton6.innerHTML = namevalue;
      var buttonurl = prompt("Please enter the changed search engine URL");
      if (buttonurl) {
        window.localStorage.setItem("buttonUrl6", buttonurl);
      } else if (buttonurl === "") {
        alert("You didn't fill in the content");
      } else {
      }
    } else if (buttoname === "") {
      alert("You didn't fill in the content");
    } else {
    }
  } else {
  }
  return false;
};
urlbutton7.oncontextmenu = function () {
  var beauty = confirm("Do you want to change the search engine for this button");
  if (beauty) {
    var buttoname = prompt("Please name the button");
    if (buttoname) {
      window.localStorage.setItem("buttonName7", buttoname);
      var namevalue = window.localStorage.getItem("buttonName7");
      urlbutton7.innerHTML = namevalue;
      var buttonurl = prompt("Please enter the changed search engine URL");
      if (buttonurl) {
        window.localStorage.setItem("buttonUrl7", buttonurl);
      } else if (buttonurl === "") {
        alert("You didn't fill in the content");
      } else {
      }
    } else if (buttoname === "") {
      alert("You didn't fill in the content");
    } else {
    }
  } else {
  }
  return false;
};

//更改按钮名称
var namevalue1 = window.localStorage.getItem("buttonName1");
var namevalue2 = window.localStorage.getItem("buttonName2");
var namevalue3 = window.localStorage.getItem("buttonName3");
var namevalue4 = window.localStorage.getItem("buttonName4");
var namevalue5 = window.localStorage.getItem("buttonName5");
var namevalue6 = window.localStorage.getItem("buttonName6");
var namevalue7 = window.localStorage.getItem("buttonName7");

if (namevalue1 == null || namevalue1 == "null" || namevalue1 == "") {
} else {
  urlbutton1.innerHTML = namevalue1;
}
if (namevalue2 == null || namevalue2 == "null" || namevalue2 == "") {
} else {
  urlbutton2.innerHTML = namevalue2;
}
if (namevalue3 == null || namevalue3 == "null" || namevalue3 == "") {
} else {
  urlbutton3.innerHTML = namevalue3;
}
if (namevalue4 == null || namevalue4 == "null" || namevalue4 == "") {
} else {
  urlbutton4.innerHTML = namevalue4;
}
if (namevalue5 == null || namevalue5 == "null" || namevalue5 == "") {
} else {
  urlbutton5.innerHTML = namevalue5;
}
if (namevalue6 == null || namevalue6 == "null" || namevalue6 == "") {
} else {
  urlbutton6.innerHTML = namevalue6;
}
if (namevalue7 == null || namevalue7 == "null" || namevalue7 == "") {
} else {
  urlbutton7.innerHTML = namevalue7;
}

//重置按钮设置
urlbutton1.onmouseup = function (e) {
  if (e.button == 1) {
    var clearbeauty1 = confirm("Do you want to reset this button?");
    if (clearbeauty1) {
      window.localStorage.removeItem("buttonName1");
      window.localStorage.removeItem("buttonUrl1");
      urlbutton1.innerHTML = "Yahoo";
    } else {
    }
  }
};
urlbutton2.onmouseup = function (e) {
  if (e.button == 1) {
    var clearbeauty2 = confirm("Do you want to reset this button?");
    if (clearbeauty2) {
      window.localStorage.removeItem("buttonName2");
      window.localStorage.removeItem("buttonUrl2");
      urlbutton2.innerHTML = "Google";
    } else {
    }
  }
};
urlbutton3.onmouseup = function (e) {
  if (e.button == 1) {
    var clearbeauty3 = confirm("Do you want to reset this button?");
    if (clearbeauty3) {
      window.localStorage.removeItem("buttonName3");
      window.localStorage.removeItem("buttonUrl3");
      urlbutton3.innerHTML = "Bing";
    } else {
    }
  }
};
urlbutton4.onmouseup = function (e) {
  if (e.button == 1) {
    var clearbeauty4 = confirm("Do you want to reset this button?");
    if (clearbeauty4) {
      window.localStorage.removeItem("buttonName4");
      window.localStorage.removeItem("buttonUrl4");
      urlbutton4.innerHTML = "Youtube";
    } else {
    }
  }
};
urlbutton5.onmouseup = function (e) {
  if (e.button == 1) {
    var clearbeauty5 = confirm("Do you want to reset this button?");
    if (clearbeauty5) {
      window.localStorage.removeItem("buttonName5");
      window.localStorage.removeItem("buttonUrl5");
      urlbutton5.innerHTML = "Wikipedia";
    } else {
    }
  }
};
urlbutton6.onmouseup = function (e) {
  if (e.button == 1) {
    var clearbeauty6 = confirm("Do you want to reset this button?");
    if (clearbeauty6) {
      window.localStorage.removeItem("buttonName6");
      window.localStorage.removeItem("buttonUrl6");
      urlbutton6.innerHTML = "GitHub";
    } else {
    }
  }
};

urlbutton7.onmouseup = function (e) {
  if (e.button == 1) {
    var clearbeauty7 = confirm("Do you want to reset this button?");
    if (clearbeauty7) {
      window.localStorage.removeItem("buttonName7");
      window.localStorage.removeItem("buttonUrl7");
      urlbutton7.innerHTML = "Translate";
    } else {
    }
  }
};

/*搜索提交事件 */
var search_bar = document.getElementById("search_bar");
search_bar.onsubmit = function () {
  surl = document.getElementById("search_input").value;
  var enginevalue = window.localStorage.getItem("engine");
  if (surl == "") {
  } else {
    if (enginevalue == null || enginevalue == "null" || enginevalue == "") {
      search();
      if (UAvalue == "1") {
        document.getElementById("more").style.display = "none";
      }
    } else {
      window.localStorage.setItem("history", surl);
      if (IsURL(surl)) {
        if (surl.indexOf("https://") > -1) {
          window.location.href = surl;
        } else {
          if (surl.indexOf("http://") > -1) {
            window.location.href = surl;
          } else {
            if (surl.indexOf("ftp://") > -1) {
              window.location.href = surl;
            } else {
              window.location.href = "http://" + surl;
            }
          }
        }
      } else {
        if (isEmail(surl)) {
          window.location.href = "mailto:" + surl;
        } else {
          window.location.href =
            enginevalue + document.getElementById("search_input").value;
        }
      }
      return false;
    }
    return false;
  }
  return false;
};

/*快捷键功能*/
document.onkeydown = onKeyDown;
function onKeyDown() {
  if (window.event.ctrlKey && window.event.keyCode === 40) {
    document.getElementById("box").style.display = "inline";
    document.getElementById("url").style.display = "none";
    document.getElementById("stow").style.display = "none";
    document.getElementById("dropdown-menu").style.display = "none";
  }
  if (window.event.ctrlKey && window.event.keyCode === 38) {
    document.getElementById("box").style.display = "none";
  }
  if (window.event.ctrlKey && window.event.keyCode === 32) {
    runjs(document.getElementById("search_input").value);
  }
  if (window.event.altKey && window.event.keyCode === 72) {
    var historyvalue = window.localStorage.getItem("history");
    if (historyvalue == null || historyvalue == "null" || historyvalue == "") {
    } else {
      document.getElementById("search_input").value = historyvalue;
    }
    return false;
  }
  if (window.event.altKey && window.event.keyCode === 67) {
    if (searchlogo == null) {
      document.getElementById("dropdown-menu").style.display = "inline";
      none();
      searchlogo = 1;
    } else {
      document.getElementById("dropdown-menu").style.display = "none";
      searchlogo = null;
    }
  }
  if (window.event.keyCode === 46) {
    document.getElementById("search_input").value = "";
    document.getElementById("url").style.display = "none";
  }
  if (window.event.altKey && window.event.keyCode === 188) {
    localStorageruncode("alt+,");
  }
  if (window.event.altKey && window.event.keyCode === 190) {
    localStorageruncode("alt+.");
  }
  if (window.event.altKey && window.event.keyCode === 191) {
    localStorageruncode("alt+/");
  }
  if (window.event.altKey && window.event.keyCode === 40) {
    surl = document.getElementById("search_input").value;
    document.getElementById("dropdown-menu").style.display = "none";
    document.getElementById("visit").style.display = "none";
    document.getElementById("more").style.display = "none";
    document.getElementById("stow").style.display = "inline";
    if (surl == "") {
    } else {
      //显示更多url选项
      document.getElementById("url").style.display = "inline";
      
    }
    return false;
  }

  if (window.event.altKey && window.event.keyCode === 38) {
    surl = document.getElementById("search_input").value;
    if (surl == "") {
    } else {
      //隐藏更多url选项
      document.getElementById("url").style.display = "none";
    }
    return false;
  }

  //快捷键自定义
  if (window.event.altKey && window.event.keyCode === 51) {
    surl = document.getElementById("search_input").value;
    var signkey1 = window.localStorage.getItem("signkey1");
    if (signkey1 == null || signkey1 == "null" || signkey1 == "") {
      if (surl == "") {
        window.location.href = "http://yahoo.com";
      } else {
        window.location.href = "http://yahoo.com/search?p=" + surl;
      }
    } else {
      var altkey1 = window.localStorage.getItem("alt+1");
      if (altkey1 == null || altkey1 == "null" || altkey1 == "") {
        localStoragecustomkey("alt+1");
        if (surl == "") {
          window.location.href = "http://yahoo.com";
        } else {
          localStoragecustomkey("alt+1");
        }
      }
    }
  }

  if (window.event.altKey && window.event.keyCode === 49) {
    surl = document.getElementById("search_input").value;
    var signkey2 = window.localStorage.getItem("signkey2");
    if (signkey2 == null || signkey2 == "null" || signkey2 == "") {
      if (surl == "") {
        window.location.href = "https://www.google.com/";
      } else {
        window.location.href = "https://www.google.com/search?q=" + surl;
      }
    } else {
      var altkey2 = window.localStorage.getItem("alt+2");
      if (altkey2 == null || altkey2 == "null" || altkey2 == "") {
        localStoragecustomkey("alt+2");
      } else {
        if (surl == "") {
          window.location.href = "https://www.google.com/";
        } else {
          localStoragecustomkey("alt+2");
        }
      }
    }
  }

  if (window.event.altKey && window.event.keyCode === 50) {
    surl = document.getElementById("search_input").value;
    var signkey3 = window.localStorage.getItem("signkey3");
    if (signkey3 == null || signkey3 == "null" || signkey3 == "") {
      if (surl == "") {
      } else {
        window.location.href = "https://www.bing.com/search?q=" + surl;
      }
    } else {
      var altkey3 = window.localStorage.getItem("alt+3");
      if (altkey3 == null || altkey3 == "null" || altkey3 == "") {
        localStoragecustomkey("alt+3");
      } else {
        if (surl == "") {
        } else {
          localStoragecustomkey("alt+3");
        }
      }
    }
  }

  if (window.event.altKey && window.event.keyCode === 52) {
    surl = document.getElementById("search_input").value;
    var signkey4 = window.localStorage.getItem("signkey4");
    if (signkey4 == null || signkey4 == "null" || signkey4 == "") {
      if (surl == "") {
        window.location.href = "https://www.youtube.com";
      } else {
        window.location.href =
          "https://www.youtube.com/results?search_query=" + surl;
      }
    } else {
      var altkey4 = window.localStorage.getItem("alt+4");
      if (altkey4 == null || altkey4 == "null" || altkey4 == "") {
        localStoragecustomkey("alt+4");
      } else {
        if (surl == "") {
          window.location.href = "https://www.youtube.com";
        } else {
          localStoragecustomkey("alt+4");
        }
      }
    }
  }

  if (window.event.altKey && window.event.keyCode === 53) {
    surl = document.getElementById("search_input").value;
    var signkey5 = window.localStorage.getItem("signkey5");
    if (signkey5 == null || signkey5 == "null" || signkey5 == "") {
      if (surl == "") {
        window.location.href = "https://en.wikipedia.org";
      } else {
        window.location.href = "https://en.wikipedia.org/w/index.php?search=" + surl;
      }
    } else {
      var altkey5 = window.localStorage.getItem("alt+5");
      if (altkey5 == null || altkey5 == "null" || altkey5 == "") {
        localStoragecustomkey("alt+5");
      } else {
        if (surl == "") {
          window.location.href = "https://en.wikipedia.org";
        } else {
          localStoragecustomkey("alt+5");
        }
      }
    }
  }

  if (window.event.altKey && window.event.keyCode === 54) {
    surl = document.getElementById("search_input").value;
    var signkey6 = window.localStorage.getItem("signkey6");
    if (signkey6 == null || signkey6 == "null" || signkey6 == "") {
      if (surl == "") {
        window.location.href = "https://github.com";
      } else {
        window.location.href = "https://github.com/search?q=" + surl;
      }
    } else {
      var altkey6 = window.localStorage.getItem("alt+6");
      if (altkey6 == null || altkey6 == "null" || altkey6 == "") {
        localStoragecustomkey("alt+6");
      } else {
        if (surl == "") {
          window.location.href = "https://github.com";
        } else {
          localStoragecustomkey("alt+6");
        }
      }
    }
  }

  if (window.event.altKey && window.event.keyCode === 55) {
    localStoragecustomkey("alt+7");
  }

  if (window.event.altKey && window.event.keyCode === 56) {
    localStoragecustomkey("alt+8");
  }

  if (window.event.altKey && window.event.keyCode === 57) {
    localStoragecustomkey("alt+9");
  }

  if (window.event.altKey && window.event.keyCode === 48) {
    localStoragecustomkey("alt+0");
  }
  //重置快捷键
  if (window.event.ctrlKey && window.event.keyCode === 49) {
    var isbeauty = confirm("你要重置快捷键Alt+1吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+1");
      window.localStorage.setItem("signkey1", "Registered");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  if (window.event.ctrlKey && window.event.keyCode === 50) {
    var isbeauty = confirm("你要重置快捷键Alt+2吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+2");
      window.localStorage.setItem("signkey2", "Registered");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  if (window.event.ctrlKey && window.event.keyCode === 51) {
    var isbeauty = confirm("你要重新设置快捷键Alt+3吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+3");
      window.localStorage.setItem("signkey3", "Registered");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  if (window.event.ctrlKey && window.event.keyCode === 52) {
    var isbeauty = confirm("你要重置快捷键Alt+4吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+4");
      window.localStorage.setItem("signkey4", "Registered");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  if (window.event.ctrlKey && window.event.keyCode === 53) {
    var isbeauty = confirm("你要重置快捷键Alt+5吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+5");
      window.localStorage.setItem("signkey5", "Registered");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  if (window.event.ctrlKey && window.event.keyCode === 54) {
    var isbeauty = confirm("你要重置快捷键Alt+6吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+6");
      window.localStorage.setItem("signkey6", "Registered");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  if (window.event.ctrlKey && window.event.keyCode === 55) {
    var isbeauty = confirm("你要重置快捷键Alt+7吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+7");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  if (window.event.ctrlKey && window.event.keyCode === 56) {
    var isbeauty = confirm("你要重置快捷键Alt+8吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+8");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  if (window.event.ctrlKey && window.event.keyCode === 57) {
    var isbeauty = confirm("你要重置快捷键Alt+9吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+9");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  if (window.event.ctrlKey && window.event.keyCode === 48) {
    var isbeauty = confirm("你要重置快捷键Alt+0吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+0");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  if (window.event.ctrlKey && window.event.keyCode === 188) {
    var isbeauty = confirm("你要重置快捷键Alt+<吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+,");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  if (window.event.ctrlKey && window.event.keyCode === 190) {
    var isbeauty = confirm("你要重置快捷键Alt+>吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+.");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  if (window.event.ctrlKey && window.event.keyCode === 191) {
    var isbeauty = confirm("你要重置快捷键Alt+/吗？");
    if (isbeauty == true) {
      localStorageresetkey("alt+/");
    } else {
      if (isbeauty == false) {
      }
    }
  }
  //ctrl+S
  if (window.event.ctrlKey && window.event.keyCode === 83) {
    return false;
  }
}

/*搜索框转换功能*/
//文件转换base64
function base64(file) {
  if (file) {
    if (/image/.test(file.type) || /text/.test(file.type)) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        document.getElementById("search_input").value = reader.result;
      };
    } else {
      //其他类型文件处理
    }
  }
}
//点击事件替代(右键点击)
var targetArea = document.getElementById("targetArea");
targetArea.oncontextmenu = function () {
  file1.click();
  return false; //阻止浏览器的默认的行为
};
//控件选中
file1.onchange = function () {
  var file = file1.files[0];
  base64(file);
};
//兼容事件处理程序
function addEvent(target, type, handler) {
  if (target.addEventListener) {
    target.addEventListener(type, handler, false);
  } else {
    target.attachEvent("on" + type, function (event) {
      return handler.call(target, event);
    });
  }
}
//兼容阻止默认事件
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
}
addEvent(document, "dragover", preventDefault);
addEvent(document, "drop", preventDefault);
addEvent(targetArea, "dragenter", preventDefault);
addEvent(targetArea, "dragover", preventDefault);
addEvent(targetArea, "dragleave", preventDefault);
addEvent(targetArea, "drop", preventDefault);
targetArea.ondragenter = function (e) {
  //拖动到目标位置事件
};
targetArea.ondragleave = function (e) {
  //离开目标位置事件
};
//拖拽选中
targetArea.ondrop = function (e) {
  e = e || window.event;
  var file = e.dataTransfer.files[0];
  base64(file);
};

/*图标自定义*/
document.getElementById("logo").onmouseup = function (e) {
  if (e.button == 1) {
    var isbeauty = confirm("你要恢复默认标志吗？");
    if (isbeauty == true) {
      window.localStorage.removeItem("logo");
      location.reload();
    } else {
    }
  }
};

var logo = document.getElementById("logo");
var logosetlogo = window.localStorage.getItem("logo");
//刷新或启动时更换图标事件
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
if (systemTheme.matches) {
  if (logosetlogo == null || logosetlogo == "null" || logosetlogo == "") {
    logo.src = "aidea/img/darklogo2.png";
  } else {
    logo.src = logosetlogo;
  }
} else {
  if (logosetlogo == null || logosetlogo == "null" || logosetlogo == "") {
    logo.src = "aidea/img/logo.png";
  } else {
    logo.src = logosetlogo;
  }
}
//更改模式时更换图标事件
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches) {
      if (logosetlogo == null || logosetlogo == "null" || logosetlogo == "") {
        logo.src = "aidea/img/darklogo2.png";
      } else {
        logo.src = logosetlogo;
      }
    } else {
      if (logosetlogo == null || logosetlogo == "null" || logosetlogo == "") {
        logo.src = "aidea/img/logo.png";
      } else {
        logo.src = logosetlogo;
      }
    }
    location.reload();
  });

function setlogo(file) {
  if (file) {
    if (/image/.test(file.type)) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        window.localStorage.setItem("logo", reader.result);
        var logo = document.getElementById("logo");
        var logosetlogo = window.localStorage.getItem("logo");
        logo.src = logosetlogo;
      };
    } else {
      alert("请选择图片格式文件");
    }
  }
}
//点击事件替代(右键点击)
var logoArea = document.getElementById("logo");
logoArea.oncontextmenu = function () {
  logofile.click();
  return false; //阻止浏览器的默认的行为
};
//控件选中
logofile.onchange = function () {
  var file = logofile.files[0];
  setlogo(file);
};
addEvent(logoArea, "dragenter", preventDefault);
addEvent(logoArea, "dragover", preventDefault);
addEvent(logoArea, "dragleave", preventDefault);
addEvent(logoArea, "drop", preventDefault);
logoArea.ondragenter = function (e) {
  //拖动到目标位置事件
};
logoArea.ondragleave = function (e) {
  //离开目标位置事件
};
//拖拽选中
logoArea.ondrop = function (e) {
  e = e || window.event;
  var file = e.dataTransfer.files[0];
  setlogo(file);
};

//点击菜单外的位置隐藏菜单
var dropdownMenu = document.getElementById("dropdown-menu");

var urlMenu = document.getElementById("url");

var stowButton = document.getElementById("stow");
window.onclick = function (event) {
  if (event.target.id == "dropdown-menu" || event.target.id == "searchlogo") {
    //点击到这些元素所执行的事件
    return; //如果点击了这些元素则在这里结束，不再隐藏菜单
  }
  dropdownMenu.style.display = "none";

  if (
    event.target.id == "url" ||
    event.target.id == "search_input" ||
    event.target.id == "more" ||
    event.target.id == "stow"
  ) {
    return;
  }
  urlMenu.style.display = "none";
  stowButton.style.display = "none";
};

/*URL跳转搜索*/
var visit = document.getElementById("visit");
var baidu = document.getElementById("baidu");
var google = document.getElementById("google");
var bing = document.getElementById("bing");
var bilibili = document.getElementById("bilibili");
var zhihu = document.getElementById("zhihu");
var github = document.getElementById("github");

visit.onclick = function () {
  none();
  if (surl.indexOf("https://") > -1) {
    window.location.href = surl;
  } else {
    if (surl.indexOf("http://") > -1) {
      window.location.href = surl;
    } else {
      if (surl.indexOf("ftp://") > -1) {
        window.location.href = surl;
      } else {
        window.location.href = "http://" + surl;
      }
    }
  }
};
baidu.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl1");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "http://yahoo.com/search?p=" + surl;
  } else {
    window.location.href =
      urlvalue + document.getElementById("search_input").value;
  }
  none();
};
google.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl2");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://www.google.com/search?q=" + surl;
  } else {
    window.location.href =
      urlvalue + document.getElementById("search_input").value;
  }
  none();
};
bing.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl3");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://www.bing.com/search?q=" + surl;
  } else {
    window.location.href =
      urlvalue + document.getElementById("search_input").value;
  }
  none();
};
bilibili.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl4");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://search.bilibili.com/all?keyword=" + surl;
  } else {
    window.location.href =
      urlvalue + document.getElementById("search_input").value;
  }
  none();
};
zhihu.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl5");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://www.zhihu.com/search?q=" + surl;
  } else {
    window.location.href =
      urlvalue + document.getElementById("search_input").value;
  }
  none();
};
github.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl6");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://github.com/search?q=" + surl;
  } else {
    window.location.href =
      urlvalue + document.getElementById("search_input").value;
  }
  none();
};

/*显示更多*/
var more = document.getElementById("more");
var stow = document.getElementById("stow");


more.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl7");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
  //stow.style.display = "inline";
  //more.style.display = "none";
  //window.localStorage.setItem("stowvalu", "on");
  window.location.href = "https://translate.google.com/?text=" + surl;
  /*
  var beauty = confirm("Do you want to change the search engine for this button");
  if (beauty) {
    var buttoname = prompt("Please name the button");
    if (buttoname) {
      window.localStorage.setItem("buttonName7", buttoname);
      var namevalue = window.localStorage.getItem("buttonName7");
      urlbutton7.innerHTML = namevalue;
      var buttonurl = prompt("Please enter the changed search engine URL");
      if (buttonurl) {
        window.localStorage.setItem("buttonUrl7", buttonurl);
      } else if (buttonurl === "") {
        alert("You didn't fill in the content");
      } else {
      }
    } else if (buttoname === "") {
      alert("You didn't fill in the content");
    } else {
    }
  } else {
  }
  return false;
*/
  } else {
    window.location.href =
      urlvalue + document.getElementById("search_input").value;
  }
};

stow.onclick = function () {

  stow.style.display = "none";
  more.style.display = "inline";
  window.localStorage.removeItem("stowvalu");
};
