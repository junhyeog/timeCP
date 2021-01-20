const cfButton = document.getElementsByClassName("input-output-copier")[0];
const bojButton = document.querySelector("#sampleinput1 > div > h2 > button");

function getButtonByUrl(url) {
  console.log(`[+] Run getButtonByUrl("${url}")`);
  if (url.includes("codeforces.com/")) return cfButton;
  if (url.includes("acmicpc.net/problem/")) return bojButton;
  return null;
}

function copy1(url) {
  const button = getButtonByUrl(url);
  if (button) {
    button.click();
    return 1;
  }
  console.log("Button was not detected");
  return 0;
}

//interact with browser
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message recieved: ", message);
  if (message.command === 'copy1') {
    if (copy1(message.url)) console.log("copy1 done"), sendResponse({ success: true, result: "copy1" });
    else console.log("copy1 failed"), sendResponse({ success: false });
  }
  else {
    sendResponse({ success: false });
  }
});
