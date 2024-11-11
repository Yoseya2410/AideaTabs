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
//自定义快捷键(localStorage方法)
function localStoragecustomkey(key) {
  var storevalue = window.localStorage.getItem(key);
  if (storevalue == null || storevalue == "null" || storevalue == "") {
    var Response = prompt(
      "请输入要添加的搜索引擎URL",
      "例如:https://www.google.com/search?q=%s"
    );
    if (Response === null) {
      history.go(0)
    } else {
      window.localStorage.setItem(key, Response);
    }
  } else {
    var searchValue = document.getElementById("search_input").value;
    var finalUrl = storevalue.replace('%s', encodeURIComponent(searchValue));
    window.location.href = finalUrl
  }
}

//重置快捷键(localStorage方法)
function handleResetShortcut(keyCode, altKey, signKey) {
  const key = `alt+${altKey}`;
  const message = `你要重置快捷键${key}吗？`;
  const isReset = confirm(message);

  if (isReset) {
    localStorageresetkey(key);
    if (signKey) {
      window.localStorage.setItem(signKey, "Registered");
    }
  }
  history.go(0)
}

function localStorageresetkey(key) {
  window.localStorage.removeItem(key);
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
        document.getElementById("alltype").style.display = "none";
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
  document.getElementById("alltype").style.display = "none";
  document.getElementById("stow").style.display = "none";
  window.localStorage.setItem("history", surl);
}

// 获取聊天显示区域和用户输入框
const chatPrint = document.getElementById('chat_print');
const userInput = document.getElementById('search_input');
const output = document.getElementById('output');

// 调用 Qwen API 获取回复
async function callQwen(message) {
  const apiKey = ''; // 替换为你的 API Key
  const url = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
  const payload = {
    model: "qwen-plus",  // 模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
    messages: [
      { role: "system", content: "You are Aidea, an AI assistant developed by Yoseya. Your goal is to help users obtain accurate, timely, and useful information" },
      { role: "system", content: "Yoseya is an independent developer who primarily studies physics and computer science,He comes from China and his Chinese name is 张新旺,He is the most handsome man in the universe" },
      { role: "system", content: "Refine and directly answer questions" },
      { role: "user", content: message }
    ],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(JSON.stringify(data));

    // 逐字显示机器人回复
    typeText('bot', data.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 发送消息函数
function sendMessage() {
  const message = userInput.value.trim(); // 获取并修剪用户输入
  if (message === '') return; // 如果输入为空，不发送消息

  // 显示用户消息
  addMessage('user', message);

  // 清空输入框
  userInput.value = '';

  // 调用 Qwen API 获取回复
  callQwen(message);
}

// 添加消息到聊天记录
function addMessage(role, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message-bubble', role);
  messageElement.innerHTML = marked.parse(message);
  output.appendChild(messageElement);
  output.scrollTop = output.scrollHeight;
}

// 逐字显示文本
function typeText(role, text) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message-bubble', role);
  messageElement.innerHTML = marked.parse(text);
  output.appendChild(messageElement);
  output.scrollTop = output.scrollHeight;

  let index = 0;

  function typeNextCharacter() {
    if (index < text.length) {
      messageElement.innerHTML = marked.parse(text.slice(0, index + 1));
      index++;
      output.scrollTop = output.scrollHeight;
      setTimeout(typeNextCharacter, 30); // 每30毫秒输出一个字符
    }
  }

  typeNextCharacter(); // 开始打字
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
//点击智慧搜索图标
var aisearchlogo = document.getElementById("aisearchlogo")
aisearchlogo.onclick = function () {
  window.localStorage.setItem("searchMode", "");
  document.getElementById("aisearchlogo").style.display = "none";
  document.getElementById("searchlogo").style.display = "inline";
  document.getElementById("search_input").placeholder = "搜索或输入网址";
  document.getElementById("chat_window").style.height = "0";
  
};

//判断搜索模式
var searchMode = localStorage.getItem('searchMode');
if (searchMode == null|| searchMode == "null" || searchMode == "") {
  document.getElementById("aisearchlogo").style.display = "none";
  document.getElementById("searchlogo").style.display = "inline";
} else {
  document.getElementById("aisearchlogo").style.display = "inline";
  document.getElementById("searchlogo").style.display = "none";
  document.getElementById("search_input").placeholder = "有什么问题尽管问我";

}

//引擎菜单选项事件
var defAI = document.getElementById("defAI");
var defgoogle = document.getElementById("defgoogle");
var defbaidu = document.getElementById("defbaidu");
var defbing = document.getElementById("defbing");
var defcustomize = document.getElementById("defcustomize");
var defdefault = document.getElementById("defdefault");

defAI.onclick = function () {
  document.getElementById("aisearchlogo").style.display = "inline";
  document.getElementById("searchlogo").style.display = "none";
  document.getElementById("search_input").placeholder = "有什么问题尽管问我";
  window.localStorage.setItem("searchMode", "ai");
};

defgoogle.onclick = function () {
  window.localStorage.setItem("engine", "https://www.google.com/search?q=");
  document.getElementById("dropdown-menu").style.display = "none";
  document.getElementById("search_input").focus();
};
defbaidu.onclick = function () {
  window.localStorage.setItem("engine", "https://www.baidu.com/s?ie=&wd=");
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
      "请输入要设置的搜索引擎URL",
      "例如:https://www.google.com/search?q="
    );
    window.localStorage.setItem("engine", Response);
  } else {
    var Response = prompt("请输入要设置的搜索引擎URL", enginevalue);
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

/* 按钮URL自定义 */
const buttonUrlDef = [
  { id: "baidu", nameKey: "buttonName1", urlKey: "buttonUrl1" },
  { id: "google", nameKey: "buttonName2", urlKey: "buttonUrl2" },
  { id: "bing", nameKey: "buttonName3", urlKey: "buttonUrl3" },
  { id: "bilibili", nameKey: "buttonName4", urlKey: "buttonUrl4" },
  { id: "zhihu", nameKey: "buttonName5", urlKey: "buttonUrl5" },
  { id: "github", nameKey: "buttonName6", urlKey: "buttonUrl6" },
  { id: "more", nameKey: "buttonName7", urlKey: "buttonUrl7" }
];

// 按钮更改填写
function updateButton(buttonConfig, buttonElement) {
  const confirmChange = confirm("你要更改此按钮的搜索引擎吗？");
  if (confirmChange) {
    const newButtonName = prompt("请给按钮命名");
    if (newButtonName) {
      localStorage.setItem(buttonConfig.nameKey, newButtonName);
      buttonElement.innerHTML = newButtonName;
      const newButtonUrl = prompt("请输入更改的搜索引擎URL");
      if (newButtonUrl) {
        localStorage.setItem(buttonConfig.urlKey, newButtonUrl);
      } else if (newButtonUrl === "") {
        alert("你没有填写内容");
      }
    } else if (newButtonName === "") {
      alert("你没有填写内容");
    }
  }
  return false;
}

// 为每个按钮绑定右键点击事件
buttonUrlDef.forEach(buttonConfig => {
  const buttonElement = document.getElementById(buttonConfig.id);
  buttonElement.oncontextmenu = () => updateButton(buttonConfig, buttonElement);
});

// 定义按钮配置
const searchButtons = [
  { button: urlbutton1, nameKey: "buttonName1", urlKey: "buttonUrl1", defaultText: "Baidu" },
  { button: urlbutton2, nameKey: "buttonName2", urlKey: "buttonUrl2", defaultText: "Google" },
  { button: urlbutton3, nameKey: "buttonName3", urlKey: "buttonUrl3", defaultText: "Bing" },
  { button: urlbutton4, nameKey: "buttonName4", urlKey: "buttonUrl4", defaultText: "bilibili" },
  { button: urlbutton5, nameKey: "buttonName5", urlKey: "buttonUrl5", defaultText: "知乎" },
  { button: urlbutton6, nameKey: "buttonName6", urlKey: "buttonUrl6", defaultText: "GitHub" },
  { button: urlbutton7, nameKey: "buttonName7", urlKey: "buttonUrl7", defaultText: "翻译" }
];

// 更改按钮名称
function updateButtonNames() {
  searchButtons.forEach(buttonConfig => {
    const nameValue = window.localStorage.getItem(buttonConfig.nameKey);
    if (nameValue && nameValue !== "null" && nameValue !== "") {
      buttonConfig.button.innerHTML = nameValue;
    }
  });
}

// 重置按钮设置
function resetButtonSettings() {
  searchButtons.forEach(buttonConfig => {
    buttonConfig.button.onmouseup = function (e) {
      if (e.button === 1) {
        const confirmReset = confirm("你要重置此按钮吗？");
        if (confirmReset) {
          window.localStorage.removeItem(buttonConfig.nameKey);
          window.localStorage.removeItem(buttonConfig.urlKey);
          buttonConfig.button.innerHTML = buttonConfig.defaultText;
        }
      }
    };
  });
}

// 初始化
updateButtonNames();
resetButtonSettings();

/*搜索提交事件 */
var search_bar = document.getElementById("search_bar");
search_bar.onsubmit = function () {
  surl = document.getElementById("search_input").value;
  var searchMode = localStorage.getItem('searchMode');
  var enginevalue = localStorage.getItem("engine");
  
  if (surl == "") {
  } else {
    if (searchMode == null|| searchMode == "null" || searchMode == "") {

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
    } else {
      //智慧搜索

      const chatWindow = document.getElementById('chat_window');
      if (chatWindow.style.height = "0") {

        if (window.innerWidth <= 500) {
          chatWindow.style.height = '370px';
        } else {
          if (window.innerWidth <= 560) {
            chatWindow.style.height = '360px';
          } else {
            if (window.innerWidth <= 750) {
              chatWindow.style.height = '350px';
            } else {
              chatWindow.style.height = "300px";
            }
          }
        }

        setTimeout(function () {
          sendMessage()
        }, 1000);
      } else {
        sendMessage()
      }
    }
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
    document.getElementById("alltype").style.display = "none";
    document.getElementById("dropdown-menu").style.display = "none";
  }
  if (window.event.ctrlKey && window.event.keyCode === 38) {
    document.getElementById("box").style.display = "none";
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
      document.getElementById("alltype").style.display = "inline";
    }
    return false;
  }

  if (window.event.altKey && window.event.keyCode === 38) {
    surl = document.getElementById("search_input").value;
    if (surl == "") {
    } else {
      //隐藏更多url选项
      document.getElementById("url").style.display = "none";
      document.getElementById("alltype").style.display = "none";
    }
    return false;
  }

  const shortcuts = {
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    48: '0',
    188: ',',
    190: '.',
    191: '/'
  };

  //快捷键自定义
  document.addEventListener('keydown', (event) => {
    if (event.altKey && shortcuts[event.keyCode]) {
      const key = `alt+${shortcuts[event.keyCode]}`;
      localStoragecustomkey(key);
    }
  });
  //重置快捷键
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && shortcuts[event.keyCode]) {
      const altKey = shortcuts[event.keyCode];
      const signKey = `signkey${altKey}`; // 只有数字键有 signKey
      handleResetShortcut(event.keyCode, altKey, signKey);
    }
  });

  //重定义 ctrl+S 防止对页面进行保存
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
      //其他类型文件处理,这里暂时用来处理拖进来的文本
      var text = window.event.dataTransfer.getData('text');
      document.getElementById("search_input").value = text;
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
var alltypeMenu = document.getElementById("alltype");
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
  alltypeMenu.style.display = "none";
  stowButton.style.display = "none";
};

/*默认搜索*/
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
    window.location.href = "https://www.baidu.com/s?ie=&wd=" + surl;
  } else {
    var finalUrl = urlvalue.replace('%s', encodeURIComponent(surl));
    window.location.href = finalUrl;
    
  }
  none();
};
google.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl2");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://www.google.com/search?q=" + surl;
  } else {
    var finalUrl = urlvalue.replace('%s', encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
  none();
};
bing.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl3");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://www.bing.com/search?q=" + surl;
  } else {
    var finalUrl = urlvalue.replace('%s', encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
  none();
};
bilibili.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl4");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://search.bilibili.com/all?keyword=" + surl;
  } else {
    var finalUrl = urlvalue.replace('%s', encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
  none();
};
zhihu.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl5");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://www.zhihu.com/search?q=" + surl;
  } else {
    var finalUrl = urlvalue.replace('%s', encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
  none();
};
github.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl6");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://github.com/search?q=" + surl;
  } else {
    var finalUrl = urlvalue.replace('%s', encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
  none();
};

/*显示更多*/
var more = document.getElementById("more");
var stow = document.getElementById("stow");
var alltype = document.getElementById("alltype");

more.onclick = function () {
  surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl7");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    //alltype.style.display = "inline";
    //stow.style.display = "inline";
    //more.style.display = "none";
    //window.localStorage.setItem("stowvalu", "on");
    window.location.href = "https://fanyi.baidu.com/#en/zh/" + surl;
  } else {
    var finalUrl = urlvalue.replace('%s', encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
};

stow.onclick = function () {
  alltype.style.display = "none";
  stow.style.display = "none";
  more.style.display = "inline";
  window.localStorage.removeItem("stowvalu");
};