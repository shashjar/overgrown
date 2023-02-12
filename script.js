// TODO: add logic for fetching historical and current tab data

document.getElementById("preferences-button").addEventListener("click", () => {
  document.getElementById("statistics").classList.remove("visible");
  document
    .getElementById("statistics-button")
    .classList.remove("active-button");
  document.getElementById("preferences").classList.add("visible");
  document.getElementById("preferences-button").classList.add("active-button");
});

document.getElementById("statistics-button").addEventListener("click", () => {
  document.getElementById("statistics").classList.add("visible");
  document.getElementById("statistics-button").classList.add("active-button");
  document.getElementById("preferences").classList.remove("visible");
  document
    .getElementById("preferences-button")
    .classList.remove("active-button");
});

document
  .getElementById("close-out")
  .addEventListener("click", () => window.close());

document.getElementById("info-img").addEventListener(
  "mouseover",
  () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["overlay/create.js"],
      });
    });
  },
  console.log
);

document.getElementById("info-img").addEventListener(
  "mouseleave",
  () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["overlay/remove.js"],
      });
    });
  },
  console.log
);
