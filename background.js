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
    t = (location.origin, { "en": "English" });
  Object.keys(t);
  e();
})();

//Get the current tab ID
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (callback) callback(tabs.length ? tabs[0].id : null);
  });
}
// The current label opens a link
function openUrlCurrentTab(url) {
  getCurrentTabId((tabId) => {
    chrome.tabs.update(tabId, { url: url });
  });
}
//Address bar search function
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  console.log("inputChanged: " + text);
  if (!text) return;
  suggest([
    { content: "Google " + text, description: "Google " + text },
    { content: "Bing " + text, description: "Bing " + text },
    { content: "Youtube " + text, description: "Youtube " + text },
  ]);
});
// Triggered when the user receives keyword suggestions
chrome.omnibox.onInputEntered.addListener((text) => {
  console.log("inputEntered: " + text);
  if (!text) return;
  var href = "";
  if (text.endsWith("instructions"))
    href = "https://yoseya.top/aidea/instructions.html";//Jump to the instructions
  else if (text.startsWith("Google"))
    href =
      "https://www.google.com/search?q=" + text.replace("Google ", "");
  else if (text.startsWith("Bing"))
    href =
      "https://www.bing.com/search?q=" + text.replace("Bing ", "");
  else if (text.startsWith("Youtube"))
    href =
      "https://www.youtube.com/results?search_query=" + text.replace("Youtube ", "");
   else
    href = "https://www.google.com/search?q=" + text;
  openUrlCurrentTab(href);
});


chrome.contextMenus.create({
  title: "Search: %s",
  id: '1',
  contexts: ['selection']
});

chrome.contextMenus.create({
  title: 'Google',
  id: 'googlem',
  parentId: '1',
  contexts: ['selection'],
});
chrome.contextMenus.create({
  title: 'Bing',
  id: 'bingm',
  parentId: '1',
  contexts: ['selection']
});
chrome.contextMenus.create({
  title: 'Translate',
  id: 'translate',
  parentId: '1',
  contexts: ['selection']
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
    chrome.tabs.create({ url: 'https://translate.google.com/?text=' + encodeURI(info.selectionText) });
  }
});












