function getButtonByUrl(url, idx) {
  console.log(`[+] Run getButtonByUrl("${url}", ${idx})`);
  if (url.includes("codeforces.com/")) {
    return document.getElementsByClassName("input-output-copier")[(idx - 1) * 2];
  }
  if (url.includes("acmicpc.net/problem/")) {
    return document.getElementsByClassName("copy-button")[(idx - 1) * 2];
  }
  return undefined;
}

function copy(url, idx) {
  const button = getButtonByUrl(url, idx);
  if (button) {
    button.click();
    console.log("[+] Button Clicked");
    return 1;
  }
  console.log("Button was not detected");
  return 0;
}

function messageHandler(mes) {
  if (mes.command.includes("copy") && mes.command.length == 5) {
    console.log("[+] copy command detected");
    return copy(mes.url, Number(mes.command[4]));
  }
  else {
    console.log("[+] undefined command detected");
    return 0;
  }
}

//interact with browser
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message recieved: ", message);
  if (messageHandler(message)) console.log(`[+] ${message.command} done`), sendResponse({ success: true, result: "copied" });
  else console.log("copy failed"), sendResponse({ success: false });
});
