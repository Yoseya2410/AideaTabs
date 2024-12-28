// 页面刷新事件
window.addEventListener('beforeunload', function () {
  this.sessionStorage.clear() //页面刷新时清除所有sessionStorage记录
});

//定位到搜索框
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

// 检查是否为深色模式
function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

//从字符串中提取域名
function extractDomain(url) {
  const domainRegex = /https?:\/\/(www\.)?([^\/]+)/;
  const match = url.match(domainRegex);
  return match ? match[2] : null;
}

// 判断当前运行环境是否为浏览器扩展
function chromeExtension() {
  if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
    return true
  } else {
    return false
  }
}

//从字符串中提取一级域名
function extractPrimaryDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.split(".").reverse();
    if (parts.length > 1) {
      return `${parts[1]}.${parts[0]}`;
    }
    return hostname;
  } catch (e) {
    return null;
  }
}

// Dialog 弹窗
//dialog1.open() 打开弹窗  dialog1.close()关闭弹窗
class Dialog {
  constructor(modalElement, options = {}) {
    this.dialog = modalElement;
    this.options = {
      closeOnOutsideClick: true,
      ...options,
    };

    this.closeButton = this.dialog.querySelector(".close");
    this.init(); // 初始化弹窗
  }

  // 初始化弹窗
  init() {
    this.closeButton.addEventListener("click", () => this.close()); // 绑定关闭按钮点击事件
    if (this.options.closeOnOutsideClick) {
      window.addEventListener("click", this.handleOutsideClick.bind(this)); // 绑定点击外部关闭事件
    }
  }

  // 处理点击外部关闭弹窗
  handleOutsideClick(event) {
    if (event.target === this.dialog) {
      this.close(); // 关闭弹窗
    }
  }

  // 打开弹窗
  open() {
    this.dialog.classList.add("show");
  }

  // 关闭弹窗
  close() {
    this.dialog.classList.remove("show");
    this.dialog.addEventListener(
      "transitionend",
      this.handleTransitionEnd.bind(this)
    ); // 监听过渡结束事件
  }

  // 处理过渡结束事件
  handleTransitionEnd(event) {
    if (!this.dialog.classList.contains("show")) {
      // 如果弹窗已关闭
      // 移除样式保证弹窗二次使用
      this.dialog.style.removeProperty("visibility");
      this.dialog.style.removeProperty("opacity");
      this.dialog.style.removeProperty("backdrop-filter");
    }
    this.dialog.removeEventListener(
      "transitionend",
      this.handleTransitionEnd.bind(this)
    ); // 移除过渡结束事件监听器
  }
}

// 注册 Dialog 弹窗
const dialog1 = new Dialog(document.getElementById("dialog1"));
//const dialog2 = new Dialog(document.getElementById('dialog2'));

// 读取markdown文件并以HTML显示
function importMarkdownFile(id, file) {
  if (chromeExtension()) {
    var markdownFile = chrome.runtime.getURL(file);
  } else {
    var markdownFile = file;
  }
  fetch(markdownFile)
    .then(response => response.text())
    .then(markdownText => {
      const htmlContent = marked.parse(markdownText);
      document.getElementById(id).innerHTML = htmlContent;
    })
    .catch(error => console.error('Error reading the file:', error));
}

// 将markdown文件内容显示在页面
importMarkdownFile('userManual', 'README.md');

//自定义快捷键(localStorage方法)
function localStoragecustomkey(key) {
  var storevalue = window.localStorage.getItem(key);
  if (storevalue == null || storevalue == "null" || storevalue == "") {
    var Response = prompt(
      "请输入要添加的搜索引擎URL",
      "例如:https://www.google.com/search?q=%s"
    );
    if (Response === null) {
      history.go(0);
    } else {
      window.localStorage.setItem(key, Response);
    }
  } else {
    // 快捷键搜索事件
    const searchInput = document.getElementById("search_input");
    if (searchInput.value.trim()) {
      // 当搜索框有内容
      var searchValue = document.getElementById("search_input").value;
      var finalUrl = storevalue.replace("%s", encodeURIComponent(searchValue));
      window.location.href = finalUrl;
    } else {
      // 当搜索框无内容
      var finalUrl = extractPrimaryDomain(storevalue);
      window.location.href = "http://" + finalUrl;
      //console.log(finalUrl);
    }
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
  history.go(0);
}

function localStorageresetkey(key) {
  window.localStorage.removeItem(key);
}

/*搜索功能*/
function fastseek() {
  const surl = document.getElementById("search_input").value;
  if (surl == "") {
  } else {
    document.getElementById("url").style.display = "inline";
    closeConfigItems()
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

/* 将对话框中的 Latex 公式转换为 HTML */
function latex2html_chat() {
  function renderMathInElementf(x) {
    renderMathInElement(x, {
      delimiters: [
        { left: '[ ', right: ' ]', display: true },
        { left: '\[', right: '\]', display: true },
        { left: '\\\[', right: '\\\]', display: true },
        { left: '\\(', right: '\\)', display: false },
        { left: '\( ', right: ' \)', display: false },
        { left: ' \(', right: ')', display: false },
      ]
    });
  }
  var chatWindow = document.getElementById('chat_window');
  if (chatWindow) {
    var paragraphs = chatWindow.querySelectorAll('p');
    paragraphs.forEach(function (x) {
      renderMathInElementf(x)
    });
  }
  var listItems = chatWindow.querySelectorAll('li');
  listItems.forEach(function (x) {
    renderMathInElementf(x)
  });
}

/* 加载动画（机器输出前的思考）*/
// 开始思考
function reflect_on() {
  const aisearchlogo = document.getElementById('aisearchlogo');
  const search_input = document.getElementById("search_input");
  const configItems = document.getElementById("configItems");
  aisearchlogo.src = 'aidea/img/loader.svg';
  aisearchlogo.title = '正在思考...';
  aisearchlogo.style.pointerEvents = 'none';
  configItems.style.pointerEvents = 'none';
  aisearchlogo.classList.add('rotate');
  search_input.disabled = true; // 禁用输入框
  search_input.placeholder = "正在思考...";

}
// 结束思考
function reflect_off() {
  const aisearchlogo = document.getElementById('aisearchlogo');
  const search_input = document.getElementById("search_input");
  const searchswitch = document.getElementById("searchswitch");
  aisearchlogo.src = 'aidea/img/stop.svg';
  aisearchlogo.title = '停止输出';

  aisearchlogo.style.pointerEvents = '';
  aisearchlogo.classList.remove('rotate');
  search_input.placeholder = "正在输出...";
  sessionStorage.setItem('printStatus', 'ture');
  searchswitch.style.padding = "3px"
  searchswitch.style.marginRight = "10px"

  if (isDarkMode()) {
    searchswitch.style.background = "#155488"
    aisearchlogo.style.filter = "invert(18%) sepia(23%) saturate(3066%) hue-rotate(182deg) brightness(99%) contrast(88%)"
  } else {
    searchswitch.style.background = "#d7eeff"
    aisearchlogo.style.filter = "invert(43%) sepia(42%) saturate(3321%) hue-rotate(190deg) brightness(100%) contrast(101%)"
  }
}
// 输出结束
function print_off() {
  const aisearchlogo = document.getElementById('aisearchlogo');
  const search_input = document.getElementById("search_input");
  const searchswitch = document.getElementById("searchswitch");
  const configItems = document.getElementById("configItems");
  aisearchlogo.src = 'aidea/img/AI.svg';
  aisearchlogo.title = '退出智慧搜索';
  aisearchlogo.style.filter = ""
  search_input.disabled = false; // 解除输入框禁用
  search_input.placeholder = "有什么问题尽管问我";
  searchswitch.style.background = ""
  searchswitch.style.padding = ""
  searchswitch.style.marginRight = ""
  configItems.style.pointerEvents = '';
  sessionStorage.removeItem('printStatus');
}

// 展开对话框
function chatWindowUnfold() {
  const chatWindow = document.getElementById("chat_window");
  /*对话框大小适配屏幕*/
  if (window.innerWidth <= 500) {
    chatWindow.style.height = "370px";
  } else {
    if (window.innerWidth <= 560) {
      chatWindow.style.height = "360px";
    } else {
      if (window.innerWidth <= 750) {
        chatWindow.style.height = "350px";
      } else {
        chatWindow.style.height = "300px";
      }
    }
  }
}

// 折叠对话框
function chatWindowFold() {
  document.getElementById("chat_window").style.height = "0";
}

// 退出智慧搜索
function exit_AIsearch() {
  chatWindowFold()
  window.localStorage.setItem("searchMode", "");
  document.getElementById("aisearchlogo").style.display = "none";
  document.getElementById("searchlogo").style.display = "inline";
  document.getElementById("search_input").placeholder = "搜索或输入网址";
  document.getElementById("searchTool_unfold").style.display = "none";
  document.getElementById("search_bar").style.height = ''
  document.getElementById('searchtool_list').style.display = 'none';
  document.querySelector('#searchTool_unfold img').classList.remove('rotated');
  // 检查输入框是否有内容
  if (document.getElementById('search_input').value.trim() !== '') {
    document.getElementById("search_submit").style.display = "";
  } else {
    document.getElementById("search_submit").style.display = "none";
  }
}

//打开下拉工具栏
function openConfigItems() {
  const configItems = document.getElementById("configItems");
  const configItems_img = configItems.querySelector("img");
  document.getElementById("box").style.display = "inline";
  document.getElementById("url").style.display = "none";
  document.getElementById("stow").style.display = "none";
  document.getElementById("alltype").style.display = "none";
  document.getElementById("dropdown-menu").style.display = "none";
  sessionStorage.setItem('configItems', 'true');
  configItems_img.style.opacity = 1
  configItems_img.src = "aidea/img/car-fan_filled.svg"
  if (isDarkMode()) {
    configItems_img.style.filter = "invert(25%) sepia(27%) saturate(3587%) hue-rotate(185deg) brightness(88%) contrast(87%)"
    configItems.style.backgroundColor = "#2a2c2d80"
  } else {
    configItems_img.style.filter = "invert(51%) sepia(35%) saturate(2608%) hue-rotate(190deg) brightness(99%) contrast(105%)"
    configItems.style.backgroundColor = "#dddddd80"
  }
}

// 关闭下拉工具栏
function closeConfigItems() {
  const configItems = document.getElementById("configItems");
  const configItems_img = configItems.querySelector("img");
  document.getElementById("box").style.display = "none";
  sessionStorage.removeItem('configItems');
  configItems_img.style.filter = ""
  configItems_img.src = "aidea/img/car-fan.svg"
  configItems_img.style.opacity = ""
  configItems.style.backgroundColor = ""
}

// configItems 点击事件，打开或关闭下拉工具栏
document.getElementById("configItems").addEventListener('click', function () {
  if (sessionStorage.getItem('configItems') == "true") {
    closeConfigItems()
    if (sessionStorage.getItem("chatOn") == 'true' && localStorage.getItem("searchMode") == "ai") {
      chatWindowUnfold()
    }
  } else {

    if (sessionStorage.getItem("chatOn") == 'true' && localStorage.getItem("searchMode") == "ai" && document.getElementById("chat_window").style.height != "0px") {
      chatWindowFold()
      setTimeout(function () {
        openConfigItems();
      }, 1000);
    } else {
      openConfigItems();
    }

  }

});

/* 点击页面其他位置隐藏下拉工具栏
document.addEventListener('click', function (event) {
  const box = document.getElementById("box");
  const configItems = document.getElementById("configItems");
  const tagShows = document.querySelectorAll(".tag-show");
  let isInsideTagShow = false;
  tagShows.forEach(tagShow => {
    if (tagShow.contains(event.target)) {
      isInsideTagShow = true;
    }
  });

  if (!isInsideTagShow && event.target !== configItems && !configItems.contains(event.target)) {
    closeConfigItems()
  }
});
*/

//搜索逻辑
function search() {
  const surl = document.getElementById("search_input").value;
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
  const surl = document.getElementById("search_input")
  document.getElementById("url").style.display = "none";
  document.getElementById("visit").style.display = "none";
  document.getElementById("alltype").style.display = "none";
  document.getElementById("stow").style.display = "none";
  window.localStorage.setItem("history", surl);
}

// 与 popup 页面通信
if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'showInstructions') {
      dialog1.open()
    }
  });
}

// 内测邀请码
if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
  chrome.storage.local.get("testKey", (result) => {
    if (result && result.testKey) {
      const testkey = result.testKey;
      localStorage.setItem("testKey", testkey);
      //console.log(testkey);
    } else {
      //console.log("testKey not found");
    }
  });
  /*用于清除内测邀请码*/
  chrome.storage.local.clear(() => {
    //console.log("All data in chrome.storage.local has been cleared.");
  });
}
const Aikey = localStorage.getItem("testKey") + "8c4602cc99cd";

// 智慧搜索
const def_interface = localStorage.getItem("def_interface");
const def_modelType = localStorage.getItem("def_modelType");
const apikey0 = localStorage.getItem("apikey0");
const apikey1 = localStorage.getItem("apikey1");
const apikey2 = localStorage.getItem("apikey2");
const apikey3 = localStorage.getItem("apikey3");

var aidea_search = JSON.parse(localStorage.getItem("set3"));
var qwen_search = JSON.parse(localStorage.getItem("set4"));

const def_temperature = parseFloat(
  localStorage.getItem("SeekBardef_temperature")
);
const Aidea_temperature = parseFloat(
  localStorage.getItem("SeekBarAidea_temperature")
);
const Moonshot_temperature = parseFloat(
  localStorage.getItem("SeekBarMoonshot_temperature")
);
const Qwen_temperature = parseFloat(
  localStorage.getItem("SeekBarQwen_temperature")
);
const OpenAI_temperature = parseFloat(
  localStorage.getItem("SeekBarOpenAI_temperature")
);

// 提示词
var setPromptIdentity = localStorage.getItem("setPromptIdentity");
var setPromptWork = localStorage.getItem("setPromptWork");
var setPromptTone = localStorage.getItem("setPromptTone");
var prompt_identity = setPromptIdentity || "You are Aidea, an AI assistant developed by Yoseya";
var prompt_work = setPromptWork || "Your goal is to help users obtain accurate, timely, and useful information";
var prompt_tone = setPromptTone || "Refine and directly answer questions";

// 初始化历史对话记录
var messageslist = [
  {
    role: "system",
    content: [
      prompt_identity,
      prompt_work,
      prompt_tone,
    ].join("\n"),
  },
];

// 配置大模型
var config = {
  apis: {
    AideaIntelligence: {
      apiKey: Aikey,
      url: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      model: "qwen-plus-latest",
      enable_search: aidea_search,
      temperature: Aidea_temperature,
    },
    defmodel: {
      apiKey: apikey0,
      url: def_interface,
      model: def_modelType,
      temperature: def_temperature,
    },
    qwen: {
      apiKey: apikey1,
      url: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      model: "qwen-plus",
      enable_search: qwen_search,
      temperature: Qwen_temperature,
    },
    moonshot: {
      apiKey: apikey2,
      url: "https://api.moonshot.cn/v1/chat/completions",
      model: "moonshot-v1-auto",
      temperature: Moonshot_temperature,
    },
    openai: {
      apiKey: apikey3,
      url: "https://api.openai.com/v1/chat/completions",
      model: "gpt-4o-mini",
      temperature: OpenAI_temperature,
    },


  },
};

// 获取聊天显示区域和用户输入框
const chatPrint = document.getElementById("chat_print");
const userInput = document.getElementById("search_input");
const output = document.getElementById("output");

// 初始化累积计数器
function initializeTokenCounters() {
  if (!localStorage.getItem("totalPromptTokens")) {
    localStorage.setItem("totalPromptTokens", 0);
  }
  if (!localStorage.getItem("totalCompletionTokens")) {
    localStorage.setItem("totalCompletionTokens", 0);
  }
}

// 创建 API 调用器
function createApiCaller(apiConfig) {
  return async function callApi(message) {
    let payload = {
      model: apiConfig.model,
      messages: messageslist,
      enable_search: apiConfig.enable_search,
      //moonshot temperature
      temperature: apiConfig.temperature,
      parameters: {
        //qwen temperature
        temperature: apiConfig.temperature,
      },
    };

    try {
      const response = await fetch(apiConfig.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiConfig.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        reflect_off()
        //console.log("报错，结束思考");
        const errorMessage = await response.text();
        const modelclassExist = localStorage.getItem("modelclass");
        if (modelclassExist) {
          if (response.status === 401) {
            if (modelclassExist == "Aidea") {
              typeText(
                "bot",
                `😅 当前 Aidea Intelligence 还处于内测阶段，如果你是内测用户请添加邀请码。如果您没有收到邀请，先试试第三方模型🤖吧！`
                , "error");
            } else {
              typeText(
                "bot",
                `🤔 你的密钥出现了问题，请按照我说的一步一步进行排查：

**1. 请检查你的 API 密钥是否填写**:

😒你不会是忘记填写 API 密钥了吧？使用第三方模型是需要填写密钥的！如果没有密钥就去平台申请。若你使用的是 Aidea Intelligence，请联系工程师 Yoseya，他会帮你解决这个问题。

**2. 请检查你的 API 密钥是否正确**:

🥱怎么会有人连 API 密钥都能填错，我想这个人应该不会是你吧。

**3. 请检查你的 API 密钥是否失效**:

😴如果前两步都没有问题，那就是你的 API 密钥失效了，去供应商那里看看吧，我先休息了。`
                , "error");
            }
          } else if (response.status === 429) {
            const error_429 = localStorage.getItem("error_429");
            if (error_429) {
              if (error_429 == "1") {
                typeText("bot", `😵‍💫用脑过度了，让我休息一会。`);
                localStorage.setItem("error_429", "2");
              } else if (error_429 == "2") {
                typeText("bot", `😡不是说了吗？休息一会！你问什么问？`);
                localStorage.setItem("error_429", "3");
              } else if (error_429 == "3") {
                localStorage.setItem("error_429", "true");
                typeText(
                  "bot",
                  `😵拒绝请求: ${response.status} ${response.statusText}
 
 拒绝请求有以下几种可能：
 
 **1. 当前并发请求过多，节点限流中，请稍后重试**：
 
 😤 都说了休息一会，你不听，现在消停了吧！
 
 **2. 资源已耗尽，账户里没钱了**：
 
 😱 快！快！快！快去充钱！`
                  , "error");
              } else {
                typeText(
                  "bot",
                  `😵拒绝请求: ${response.status} ${response.statusText}`
                );
              }
            } else {
              typeText("bot", `😵‍💫用脑过度了，让我休息一会。`, "error");
              localStorage.setItem("error_429", "1");
            }
          } else {
            console.error(
              `HTTP error! status: ${response.status}, message: ${errorMessage}`
            );
            typeText(
              "bot",
              `😵请求失败: ${response.status} ${response.statusText}`
            );
          }
        } else {
          typeText(
            "bot",
            `你好，欢迎使用 Aidea 智慧搜索！👏

现在，你需要在 扩展 ——> AideaTabs 中进行设置，选择你使用的模型，告诉我你的偏好。让我们在网络中开启新的旅途！🗺️`
          );
        }

        return;
      }

      localStorage.removeItem("error_429");

      const data = await response.json();
      //用于调试智慧搜索API响应
      //console.log(JSON.stringify(data));
      reflect_off()
      //console.log("结束思考");
      // 获取 tokens 数量
      const promptTokens = data.usage.prompt_tokens;
      const completionTokens = data.usage.completion_tokens;
      const modelBilling = localStorage.getItem("modelclass");

      // 累积 tokens 数量
      let totalPromptTokens = parseInt(
        localStorage.getItem("totalPromptTokens")
      );
      let totalCompletionTokens = parseInt(
        localStorage.getItem("totalCompletionTokens")
      );
      //当使用 Aidea Intelligence 时累积 tokens
      if (modelBilling == "Aidea") {
        totalPromptTokens += promptTokens;
        totalCompletionTokens += completionTokens;
      }
      // 保存到 localStorage
      localStorage.setItem("totalPromptTokens", totalPromptTokens);
      localStorage.setItem("totalCompletionTokens", totalCompletionTokens);

      // 控制台输出累积的 tokens 数
      //console.log(`Total Prompt Tokens: ${totalPromptTokens}\nTotal Completion Tokens: ${totalCompletionTokens}`);

      // 逐字显示机器人回复
      typeText("bot", data.choices[0].message.content);

      //记忆开关，若开关关闭，机器人将无法知道它自己说了什么
      if (localStorage.getItem("set2")) {
        // 将机器人回复添加到历史对话记录
        messageslist.push(data.choices[0].message);
        //console.log("已开启记忆")
      } else {
        //console.log("关闭记忆")
      }
    } catch (error) {
      //console.error('Error:', error);

      typeText("bot", "😵请求失败，请检查网络连接。</br>如果网络正常，请[提交错误信息](mailto:yoseya2410@outlook.com?subject=AideaTabs报错)</br>错误信息：" + error, "error");
    }
  };
}

/*对话框输出函数说明：
addMessage() 直接在对话框输出
typeText() 在对话框逐字输出
*/

// 创建API调用器实例
const apiCallers = {
  defmodel: createApiCaller(config.apis.defmodel),
  Aidea: createApiCaller(config.apis.AideaIntelligence),
  Qwen: createApiCaller(config.apis.qwen),
  Moonshot: createApiCaller(config.apis.moonshot),
  OpenAI: createApiCaller(config.apis.openai),

};

// 发送消息函数
function sendMessage() {
  const message = userInput.value.trim(); // 获取并修剪用户输入
  if (message === "") return; // 如果输入为空，不发送消息

  // 显示用户消息
  addMessage("user", message);

  // 将用户消息添加到历史对话记录
  messageslist.push({ role: "user", content: message });

  // 清空输入框
  userInput.value = "";

  // 根据选择调用相应的API
  const selectedApi = localStorage.getItem("modelclass");
  if (selectedApi) {
    apiCallers[selectedApi](message);
    reflect_on()
    //console.log("开始思考");
    /*用于标记是否开启AI对话（开启对话后，当切换至智慧搜索时对话框自动展开）*/
    if (sessionStorage.getItem("chatOn") !== 'true') {
      sessionStorage.setItem('chatOn', 'true');
    }
  } else {
    typeText(
      "bot",
      `你好，欢迎使用 Aidea 智慧搜索！👏

现在，你需要在 扩展 → AideaTabs 中进行设置，选择你使用的模型，告诉我你的偏好。让我们在网络中开启新的旅途！🗺️`
    );
  }
}

// 添加消息到聊天记录
function addMessage(role, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message-bubble", role);
  messageElement.innerHTML = marked.parse(message);
  output.appendChild(messageElement);
  output.scrollTop = output.scrollHeight;
}

// 逐字显示文本
function typeText(role, text, state = "chat") {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message-bubble", role);
  messageElement.innerHTML = marked.parse(text);
  output.appendChild(messageElement);
  output.scrollTop = output.scrollHeight;

  let index = 0;
  let isNearBottom = true; // 标记是否接近底部
  let isPaused = false; // 标记是否暂停

  // 监听滚动事件
  output.addEventListener('scroll', () => {
    // 判断是否接近底部（允许一定误差范围）
    const scrollThreshold = 24; // 误差范围
    isNearBottom = output.scrollTop + output.clientHeight + scrollThreshold >= output.scrollHeight;
  });

  function typeNextCharacter() {
    if (isPaused) {
      return; // 停止输出
    }

    if (index < text.length) {
      messageElement.innerHTML = marked.parse(text.slice(0, index + 1));
      index++;

      // 只有在接近底部的情况下才自动滚动到底部
      if (isNearBottom) {
        output.scrollTop = output.scrollHeight;
      }

      // 机器人说话换气（模仿人说话的状态）
      const currentChar = text[index - 1];
      let delay;
      if (currentChar.match(/[.。!！？?]/)) {
        delay = 700; // 如果是 .。!！？?，延迟700毫秒
      } else if (currentChar.match(/[、，,：:]/)) {
        delay = 450; // 如果是 、，,，延迟450毫秒
      } else {
        delay = 45; // 其他字符，延迟45毫秒
      }
      setTimeout(typeNextCharacter, delay);
    } else {
      if (state == "chat") {
        latex2html_chat(); // 转换LaTex数学表达式
        hljs.highlightAll(); // 代码高亮
      }
      print_off() //输出结束
    }
  }

  // 暂停输出
  function pauseTyping() {
    print_off()
    isPaused = true;
  }
  //恢复输出
  function resumeTyping() {
    isPaused = false;
    typeNextCharacter(); // 继续打字
  }

  //点击暂停输出
  document.getElementById("aisearchlogo").onclick = function () {
    if (sessionStorage.getItem("printStatus") !== null) {
      pauseTyping()
    } else {
      exit_AIsearch()
    }
  };

  typeNextCharacter(); // 开始打字效果
}

// 初始化 token 计数器
initializeTokenCounters();

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
  closeConfigItems()
};

//点击退出智慧搜索
document.getElementById("aisearchlogo").onclick = function () {
  exit_AIsearch()
};

//切换引擎
function swintchEngine() {
  // 切换搜索引擎时提交图标样式的转变
  var imgElement = document.querySelector('#search_submit img');
  var search_submit = document.getElementById("search_submit");
  var searchInput = document.getElementById('search_input');

  // 检查输入框是否有内容
  if (searchInput.value.trim() !== '') {
    if (localStorage.getItem('engine') !== null) {
      search_submit.style.display = "";
      search_submit.style.pointerEvents = '';
      if (imgElement) {
        imgElement.src = 'aidea/img/submit.svg';
      } else {
        console.error('未找到元素');
      }
    } else {
      search_submit.style.display = "";
      search_submit.style.pointerEvents = 'none';
      if (imgElement) {
        imgElement.src = 'aidea/img/enter.svg';
      } else {
        console.error('未找到元素');
      }
    }
  } else {

  }
}

//判断搜索模式
var searchMode = localStorage.getItem("searchMode");
if (searchMode == null || searchMode == "null" || searchMode == "") {
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
  document.getElementById("searchTool_unfold").style.display = "";
  document.getElementById("search_submit").style.display = "none";
  if (sessionStorage.getItem("chatOn") == 'true') {
    chatWindowUnfold()
  }
};

defgoogle.onclick = function () {
  window.localStorage.setItem("engine", "https://www.google.com/search?q=%s");
  document.getElementById("dropdown-menu").style.display = "none";
  document.getElementById("search_input").focus();
  swintchEngine()
};
defbaidu.onclick = function () {
  window.localStorage.setItem("engine", "https://www.baidu.com/s?wd=%s");
  document.getElementById("dropdown-menu").style.display = "none";
  document.getElementById("search_input").focus();
  swintchEngine()
};
defbing.onclick = function () {
  window.localStorage.setItem("engine", "https://www.bing.com/search?q=%s");
  document.getElementById("dropdown-menu").style.display = "none";
  document.getElementById("search_input").focus();
  swintchEngine()
};
defcustomize.onclick = function () {
  var enginevalue = window.localStorage.getItem("engine");
  if (enginevalue == null || enginevalue == "null" || enginevalue == "") {
    var Response = prompt(
      "请输入要设置的搜索引擎URL（%s表示搜索内容）",
      "例如:https://www.google.com/search?q=%s"
    );
    window.localStorage.setItem("engine", Response);
  } else {
    var Response = prompt("请输入要设置的搜索引擎URL（%s表示搜索内容）", enginevalue);
    if (Response) {
      window.localStorage.setItem("engine", Response);
    } else {
    }
  }
  document.getElementById("dropdown-menu").style.display = "none";
  document.getElementById("search_input").focus();
  swintchEngine()
};
defdefault.onclick = function () {
  window.localStorage.removeItem("engine");
  document.getElementById("dropdown-menu").style.display = "none";
  document.getElementById("search_input").focus();
  swintchEngine()
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
  { id: "more", nameKey: "buttonName7", urlKey: "buttonUrl7" },
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
buttonUrlDef.forEach((buttonConfig) => {
  const buttonElement = document.getElementById(buttonConfig.id);
  buttonElement.oncontextmenu = () => updateButton(buttonConfig, buttonElement);
});

// 定义按钮配置
const searchButtons = [
  {
    button: urlbutton1,
    nameKey: "buttonName1",
    urlKey: "buttonUrl1",
    defaultText: "Baidu",
  },
  {
    button: urlbutton2,
    nameKey: "buttonName2",
    urlKey: "buttonUrl2",
    defaultText: "Google",
  },
  {
    button: urlbutton3,
    nameKey: "buttonName3",
    urlKey: "buttonUrl3",
    defaultText: "Bing",
  },
  {
    button: urlbutton4,
    nameKey: "buttonName4",
    urlKey: "buttonUrl4",
    defaultText: "bilibili",
  },
  {
    button: urlbutton5,
    nameKey: "buttonName5",
    urlKey: "buttonUrl5",
    defaultText: "知乎",
  },
  {
    button: urlbutton6,
    nameKey: "buttonName6",
    urlKey: "buttonUrl6",
    defaultText: "GitHub",
  },
  {
    button: urlbutton7,
    nameKey: "buttonName7",
    urlKey: "buttonUrl7",
    defaultText: "翻译",
  },
];

// 更改按钮名称
function updateButtonNames() {
  searchButtons.forEach((buttonConfig) => {
    const nameValue = window.localStorage.getItem(buttonConfig.nameKey);
    if (nameValue && nameValue !== "null" && nameValue !== "") {
      buttonConfig.button.innerHTML = nameValue;
    }
  });
}

// 重置按钮设置
function resetButtonSettings() {
  searchButtons.forEach((buttonConfig) => {
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

/*回车提交搜索内容事件*/
var search_bar = document.getElementById("search_bar");
search_bar.onsubmit = function (event) {
  event.preventDefault(); // 阻止默认的表单提交行为
  performSearch();
};

var search_submit = document.getElementById("search_submit");
search_submit.style.display = "none";
/*点击搜索提交按钮事件*/
search_submit.addEventListener('click', function () {
  var submitEvent = new Event('submit');
  search_bar.dispatchEvent(submitEvent);
});

/* 搜索内容提交逻辑 */
function performSearch() {
  const surl = document.getElementById("search_input").value;
  var searchMode = localStorage.getItem("searchMode");
  var enginevalue = localStorage.getItem("engine");
  closeConfigItems()

  if (surl == "") {
  } else {
    if (searchMode == null || searchMode == "null" || searchMode == "") {
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
            const searchValue = enginevalue.replace("%s", document.getElementById("search_input").value);
            window.location.href = searchValue
          }
        }
        return false;
      }
      return false;
    } else {
      //智慧搜索

      const chatWindow = document.getElementById("chat_window");
      if ((chatWindow.style.height = "0")) {
        chatWindowUnfold()
        //等对话框完全展开后再对话
        setTimeout(function () {
          sendMessage();
        }, 1000);
      } else {
        sendMessage();
      }
    }
  }
  return false;
}

// 搜索提交按键显示
document.getElementById("search_input").addEventListener("input", function () {
  var inputValue = this.value.trim();
  var imgElement = document.querySelector('#search_submit img');
  if (inputValue) {
    if (localStorage.getItem("searchMode") === "ai") {
      search_submit.style.display = "none";
    } else {
      if (localStorage.getItem('engine') !== null) {
        search_submit.style.display = "";
        search_submit.style.pointerEvents = '';
        if (imgElement) {
          imgElement.src = 'aidea/img/submit.svg';
        } else {
          console.error('未找到元素');
        }
      } else {
        search_submit.style.display = "";
        search_submit.style.pointerEvents = 'none';
        if (imgElement) {
          imgElement.src = 'aidea/img/enter.svg';
        } else {
          console.error('未找到元素');
        }
      }
    }
  } else {
    search_submit.style.display = "none";
    none()
  }
});

//选中搜索框事件
document.addEventListener("DOMContentLoaded", function () {
  const search_input = document.getElementById("search_input");
  search_input.addEventListener("focus", function () {
    closeConfigItems()
  });
});

/*快捷键功能*/
document.onkeydown = onKeyDown;
function onKeyDown() {
  const set1 = localStorage.getItem("set1");
  if (!set1) {

    //搜索框填入上次搜索的内容
    if (window.event.altKey && window.event.keyCode === 72) {
      var historyvalue = window.localStorage.getItem("history");
      if (
        historyvalue == null ||
        historyvalue == "null" ||
        historyvalue == ""
      ) {
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

    /*下拉搜索项（历史遗留）
    if (window.event.altKey && window.event.keyCode === 40) {
      const surl = document.getElementById("search_input").value;
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
      const surl = document.getElementById("search_input").value;
      if (surl == "") {
      } else {
        //隐藏更多url选项
        document.getElementById("url").style.display = "none";
        document.getElementById("alltype").style.display = "none";
      }
      return false;
    }
  */
    const shortcuts = {
      49: "1",
      50: "2",
      51: "3",
      52: "4",
      53: "5",
      54: "6",
      55: "7",
      56: "8",
      57: "9",
      48: "0",
    };

    //快捷键自定义
    document.addEventListener("keydown", (event) => {
      if (event.altKey && shortcuts[event.keyCode]) {
        const key = `alt+${shortcuts[event.keyCode]}`;
        localStoragecustomkey(key);
      }
    });
    //重置快捷键
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && shortcuts[event.keyCode]) {
        const altKey = shortcuts[event.keyCode];
        const signKey = `signkey${altKey}`; // 只有数字键有 signKey
        handleResetShortcut(event.keyCode, altKey, signKey);
      }
    });
  } else {
    //console.log('快捷键已关闭，请从扩展设置中打开');
  }

  //重定义 ctrl+S 屏蔽页面保存
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
      var text = window.event.dataTransfer.getData("text");
      document.getElementById("search_input").value = text;
    }
  }
}
//点击事件替代(右键点击)
var targetArea = document.getElementById("targetArea");
targetArea.oncontextmenu = function () {
  if (localStorage.getItem("searchMode") == "ai") {
    //console.log("AI处理文件");
  } else {
    file1.click();
    return false; //阻止浏览器的默认的行为
  }
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
  if (localStorage.getItem("searchMode") == "ai") {
    console.log("提交文件至多模态模型进行处理");
  } else {
    e = e || window.event;
    var file = e.dataTransfer.files[0];
    base64(file);
  }
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
  const surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl1");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://www.baidu.com/s?ie=&wd=" + surl;
  } else {
    var finalUrl = urlvalue.replace("%s", encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
  none();
};
google.onclick = function () {
  const surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl2");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://www.google.com/search?q=" + surl;
  } else {
    var finalUrl = urlvalue.replace("%s", encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
  none();
};
bing.onclick = function () {
  const surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl3");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://www.bing.com/search?q=" + surl;
  } else {
    var finalUrl = urlvalue.replace("%s", encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
  none();
};
bilibili.onclick = function () {
  const surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl4");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://search.bilibili.com/all?keyword=" + surl;
  } else {
    var finalUrl = urlvalue.replace("%s", encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
  none();
};
zhihu.onclick = function () {
  const surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl5");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://www.zhihu.com/search?q=" + surl;
  } else {
    var finalUrl = urlvalue.replace("%s", encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
  none();
};
github.onclick = function () {
  const surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl6");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    window.location.href = "https://github.com/search?q=" + surl;
  } else {
    var finalUrl = urlvalue.replace("%s", encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
  none();
};

/*显示更多*/
var more = document.getElementById("more");
var stow = document.getElementById("stow");
var alltype = document.getElementById("alltype");

more.onclick = function () {
  const surl = document.getElementById("search_input").value;
  var urlvalue = window.localStorage.getItem("buttonUrl7");
  if (urlvalue == null || urlvalue == "null" || urlvalue == "") {
    //alltype.style.display = "inline";
    //stow.style.display = "inline";
    //more.style.display = "none";
    //window.localStorage.setItem("stowvalu", "on");
    window.location.href = "https://fanyi.baidu.com/mtpe-individual/multimodal?query=" + surl + "&lang=auto";
  } else {
    var finalUrl = urlvalue.replace("%s", encodeURIComponent(surl));
    window.location.href = finalUrl;
  }
};

stow.onclick = function () {
  alltype.style.display = "none";
  stow.style.display = "none";
  more.style.display = "inline";
  window.localStorage.removeItem("stowvalu");
};

// 仅在作为浏览器扩展时执行
if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
  //新版本更新初始化
  const version = localStorage.getItem("version");
  const manifest = chrome.runtime.getManifest();
  if (version != manifest.version) {
    localStorage.setItem("version", manifest.version);
    dialog1.open();
  }
}

// 搜索框 searchtool 点击样式
document.addEventListener('DOMContentLoaded', function () {
  const searchTools = document.querySelectorAll('.searchtool');

  searchTools.forEach(searchTool => {
    const searchToolImg = searchTool.querySelector('img');
    const searchToolp = searchTool.querySelector('p');

    searchTool.addEventListener('mousedown', function () {
      if (searchToolImg) {
        searchToolImg.style.filter = 'brightness(0) saturate(100%) invert(100%)';
      }
      if (searchToolp) {
        searchToolp.style.color = '#ffffff'; // 恢复默认样式
      }
    });

    searchTool.addEventListener('mouseup', function () {
      if (searchToolImg) {
        searchToolImg.style.filter = ''; // 恢复默认样式
      }
      if (searchToolp) {
        searchToolp.style.color = '#757575'; // 恢复默认样式
      }
    });

    searchTool.addEventListener('mouseleave', function () {
      if (searchToolImg) {
        searchToolImg.style.filter = ''; // 鼠标离开时也恢复默认样式
      }
      if (searchToolp) {
        searchToolp.style.color = '#757575'; // 恢复默认样式
      }
    });
  });
});

/* 智慧搜索工具栏展开 */
document.addEventListener('DOMContentLoaded', function () {
  const img = document.querySelector('#searchTool_unfold img');
  const searchTool_unfold = document.getElementById("searchTool_unfold");
  const search_bar = document.getElementById("search_bar")
  const searchtoolList = document.getElementById('searchtool_list');

  searchTool_unfold.addEventListener('click', function () {
    img.classList.toggle('rotated');
    if (searchtoolList.style.display === 'none' || searchtoolList.style.display === '') {
      search_bar.style.height = '96px'
      searchtoolList.style.display = 'block';
    } else {
      search_bar.style.height = ''
      searchtoolList.style.display = 'none';
    }
  });
});

//获取当前模型的联网搜索开关
var modelclass = localStorage.getItem("modelclass")
if (modelclass == "Aidea") {
  var setx = "set3"
} else if (modelclass == "Qwen") {
  var setx = "set4"
} else {

}

//联网搜索开启时按键状态
function surfInternet_on() {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  const searchTool = document.getElementById('surfInternet');
  const surfInternet_p = document.querySelector('#surfInternet p');
  const surfInternet_img = document.querySelector('#surfInternet img');

  searchTool.style.width = "80px";
  surfInternet_p.style.display = "inline";
  surfInternet_p.style.color = "#148fff";
  surfInternet_img.style.filter = "invert(39%) sepia(68%) saturate(2284%) hue-rotate(193deg) brightness(104%) contrast(101%)";
  if (systemTheme.matches) {
    searchTool.style.background = "#155488";
  } else {
    searchTool.style.background = "#d7eeff";
  }
}

/*联网搜索按钮交互事件*/
document.addEventListener("DOMContentLoaded", function () {
  const searchTool = document.getElementById('surfInternet');
  const surfInternet_p = document.querySelector('#surfInternet p');
  const surfInternet_img = document.querySelector('#surfInternet img');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  var isSetxTrue = localStorage.getItem(setx) === 'true';

  // 鼠标进入事件
  searchTool.addEventListener('mouseenter', function () {
    if (!isSetxTrue) {
      searchTool.style.width = "80px";
      searchTool.querySelector('p').style.display = "inline";
    }
  });

  // 鼠标离开事件
  searchTool.addEventListener('mouseleave', function () {
    if (!isSetxTrue) {
      searchTool.style.width = "25px";
      searchTool.querySelector('p').style.display = "none";
    } else {
      surfInternet_p.style.color = '#148fff';
      surfInternet_img.style.filter = 'invert(39%) sepia(68%) saturate(2284%) hue-rotate(193deg) brightness(104%) contrast(101%)';
      if (systemTheme.matches) {
        searchTool.style.background = "#155488";
      } else {
        searchTool.style.background = "#d7eeff";
      }
    }
  });

  // 点击事件
  searchTool.addEventListener('click', function () {
    if (!isSetxTrue) {
      isSetxTrue = true;
      localStorage.setItem(setx, 'true');
      surfInternet_on()
    } else {
      isSetxTrue = false;
      localStorage.removeItem(setx);
      searchTool.style.background = '';
      searchTool.style.width = '';
      surfInternet_p.style.display = '';
      surfInternet_p.style.color = '';
      surfInternet_img.style.filter = '';
    }
  });
});

// 初始化联网搜索按钮状态
if (localStorage.getItem(setx) == 'true') {
  surfInternet_on()
}
// 初始化智慧搜索工具列表展开按键
if (localStorage.getItem("searchMode") !== "ai") {
  document.getElementById("searchTool_unfold").style.display = "none";
}

