(() => {
  "use strict";
  const e = () => {
    chrome.runtime.onInstalled.addListener(async ({ reason: e }) => {
      if ("install" === e)
        return (
          chrome.storage.local.set({ install: Date.now() + "" }),
          void chrome.tabs.create({})
        );
    });
  },
    t = (location.origin, { "zh-CN": "中文简体" });
  Object.keys(t);
  e();
})();

// 获取当前选项卡ID
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (callback) callback(tabs.length ? tabs[0].id : null);
  });
}
// 当前标签打开某个链接
function openUrlCurrentTab(url) {
  getCurrentTabId((tabId) => {
    chrome.tabs.update(tabId, { url: url });
  });
}
//地址栏搜索功能
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  //console.log("inputChanged: " + text);
  if (!text) return;
  suggest([
    { content: "百度搜索 " + text, description: "百度搜索 " + text },
    { content: "谷歌搜索 " + text, description: "谷歌搜索 " + text },
    { content: "必应搜索 " + text, description: "必应搜索 " + text },
    { content: "哔哩哔哩 " + text, description: "哔哩哔哩 " + text },
    { content: "翻译 " + text, description: "翻译 " + text },
    { content: "知网 " + text, description: "知网 " + text },
    
  ]);
});
// 当用户接收关键字建议时触发
chrome.omnibox.onInputEntered.addListener((text) => {
  //console.log("inputEntered: " + text);
  if (!text) return;
  var href = "";
  if (text.endsWith("使用说明"))
    href = "https://yoseya.top/aidea/instructions.html";//跳转到使用说明
  else if (text.startsWith("百度搜索"))
    href = "https://www.baidu.com/s?ie=UTF-8&wd=" + text.replace("百度搜索 ", "");
  else if (text.startsWith("谷歌搜索"))
    href = "https://www.google.com/search?q=" + text.replace("谷歌搜索 ", "");
  else if (text.startsWith("必应搜索"))
    href = "https://cn.bing.com/search?q=" + text.replace("必应搜索 ", "");
  else if (text.startsWith("哔哩哔哩"))
    href = "https://search.bilibili.com/all?keyword=" + text.replace("哔哩哔哩 ", "");
  else if (text.startsWith("翻译"))
    href = "https://fanyi.baidu.com/#en/zh/" + text.replace("翻译 ", "");
  else if (text.startsWith("知网"))
    href = "https://kns.cnki.net/kns8/defaultresult/index?kw=" + text.replace("知网 ", "");
    
  else
    href = "https://www.baidu.com/s?ie=UTF-8&wd=" + text;
  openUrlCurrentTab(href);
});

chrome.contextMenus.create({
  title: "搜索: %s",
  id: '1',
  contexts: ['selection']
});

chrome.contextMenus.create({
  title: '百度',
  id: 'baidum',
  parentId: '1',
  contexts: ['selection']
});
chrome.contextMenus.create({
  title: '谷歌',
  id: 'googlem',
  parentId: '1',
  contexts: ['selection'],
});
chrome.contextMenus.create({
  title: '必应',
  id: 'bingm',
  parentId: '1',
  contexts: ['selection']
});
chrome.contextMenus.create({
  title: '翻译',
  id: 'translate',
  parentId: '1',
  contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId == "baidum") {
    chrome.tabs.create({ url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(info.selectionText) });
  }
});
chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId == "googlem") {
    chrome.tabs.create({ url: 'https://www.google.com/search?q=' + encodeURI(info.selectionText) });
  }
});
chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId == "bingm") {
    chrome.tabs.create({ url: 'https://cn.bing.com/search?q=' + encodeURI(info.selectionText) });
  }
});
chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId == "translate") {
    chrome.tabs.create({ url: 'https://fanyi.baidu.com/#en/zh/' + encodeURI(info.selectionText) });
  }
});

