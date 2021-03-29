function clickCFSubmitButton() {
  console.log(`[+] Run clickCFSubmitButton`);
  if (url.includes("codeforces.com/contest/*/*")) {
    const button = document.getElementsByClassName("submit")[0];
    if (!button) {
      console.log(`[-] Can't find Submit button`);
      return -1;
    }
    button.click();
    console.log(`[+] Submit button clicked`);
    return 0;
  }
  console.log(`[-] Not Codeforces`);
  return -1;
}

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
    return 0;
  }
  console.log("Button was not detected");
  return -1;
}

function messageHandler(mes) {
  if (mes.command.includes("copy") && mes.command.length == 5) {
    console.log("[+] copy command detected");
    return copy(mes.url, Number(mes.command[4]));
  }
  else if (mes.command.includes("submit_cf") && mes.command.length == 9) {
    console.log("[+] submit_cf command detected");
    return clickCFSubmitButton();
  }
  else {
    console.log("[-] undefined command detected");
    return -1;
  }
}

//interact with browser
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message recieved: ", message);
  if (messageHandler(message)) console.log(`[+] ${message.command} done`), sendResponse({ success: true, result: "copied" });
  else console.log("copy failed"), sendResponse({ success: false });
});
