function copy1() {
  const button = document.querySelector("#sampleinput1 > div > h2 > button");
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
    if (copy1()) console.log("copy1 done"), sendResponse({ success: true, result: "copy1" });
    else console.log("copy1 failed"), sendResponse({ success: false });
  }
  else {
    sendResponse({ success: false });
  }
});
