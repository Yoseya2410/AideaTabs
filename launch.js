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
