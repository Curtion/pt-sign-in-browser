document.addEventListener("DOMContentLoaded", function() {
  console.log(chrome.tabs)
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    console.log(activeTab.url);
  });
});