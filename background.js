chrome.runtime.onInstalled.addListener(function () {

  // Find boj first test case copy button
  const rule1 = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'acmicpc.net/problem/*' },
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'codeforces.com/*' },
      })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  };

  //  conditions에 맞는 페이지일 경우 page_action 활성화
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
  });

  // context menu 추가
  chrome.contextMenus.create({
    "id": "copy1",
    "title": "예제 입력 1 복사",
    // "contexts": ["page"] // 어떤 요소 위에서 context menu를 불렀을 때 나타날 것인가

  }, function () {
    if (chrome.extension.lastError) {
      console.log("Got error at <copy1>: " + chrome.extension.lastError.message);
    }
    else console.log("[+] Created Context Menu <copy1>");
  });
});

// add onClickHander for contextMenus
function onClickHandler(info, tab) {
  console.log("item <" + info.menuItemId + "> was clicked");
  // console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));
  const command = info.menuItemId;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tab.id, { command, url: info.pageUrl }, function (response) {
      if (chrome.extension.lastError) {
        console.log("Got error at <Sending Message>: " + chrome.extension.lastError.message);
      }
      else {
        if (response.success) console.log("res:", response.result);
        else console.log("Command " + command + " failed!");
      }
    });
  });
};

function onCommandHandler(command) {
  console.log(command);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    chrome.tabs.sendMessage(tabs[0].id, { command, url: tabs[0].url }, function (response) {
      if (chrome.extension.lastError) {
        console.log("Got error at <Sending Message>: " + chrome.extension.lastError.message);
      }
      else {
        if (response.success) console.log("[+] Res:", response.result);
        else console.log("[-] Command " + command + " failed!");
      }
    });
  });
}

chrome.contextMenus.onClicked.addListener(onClickHandler);
console.log("12312312");
chrome.commands.onCommand.addListener(onCommandHandler);
