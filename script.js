/**
 * Set all elements containing information that could be retrieved from local storage
 */

// Plant
if (localStorage.plant) {
  const plant = document.getElementById("plant-dropdown");
  plant.value = localStorage.plant;
}

// Growth Speed
if (localStorage.growthSpeed) {
  const growthSpeed = document.getElementById("speed-dropdown");
  growthSpeed.value = localStorage.growthSpeed;
}

// Preferred Tab Count
if (localStorage.preferredTabCount) {
  const preferredTabCount = document.getElementById("preferred-tab-count");
  preferredTabCount.value = localStorage.preferredTabCount;
}

// Total Opened - 24 Hours
chrome.storage.local.get(["dayOpen"]).then((result) => {
  if (result && result.dayOpen) {
    const dayOpen = removeOldDays(JSON.parse(result.dayOpen));
    document.getElementById("open24").innerHTML = dayOpen.length;
  } else {
    document.getElementById("open24").innerHTML = "0";
  }
});

// Total Closed - 24 Hours
chrome.storage.local.get(["dayClosed"]).then((result) => {
  if (result && result.dayClosed) {
    const dayClosed = removeOldDays(JSON.parse(result.dayClosed));
    console.log("Setting day close to be", dayClosed.length);
    document.getElementById("close24").innerHTML = dayClosed.length;
  } else {
    document.getElementById("close24").innerHTML = "0";
  }
});

// Total Opened - All Time
chrome.storage.local.get(["totalOpenCount"]).then((result) => {
  if (result && result.totalOpenCount) {
    const totalOpenCount = JSON.parse(result.totalOpenCount);
    document.getElementById("openall").innerHTML = totalOpenCount;
  } else {
    document.getElementById("openall").innerHTML = "0";
  }
});

// Total Closed - All Time
chrome.storage.local.get(["totalClosedCount"]).then((result) => {
  if (result && result.totalClosedCount) {
    const totalClosedCount = JSON.parse(result.totalClosedCount);
    document.getElementById("closeall").innerHTML = totalClosedCount;
  } else {
    document.getElementById("closeall").innerHTML = "0";
  }
});

/**
 * Provide event listeners to support user interactions
 */

// Preference Page Button
document.getElementById("preferences-button").addEventListener("click", () => {
  document.getElementById("statistics").classList.remove("visible");
  document
    .getElementById("statistics-button")
    .classList.remove("active-button");
  document.getElementById("preferences").classList.add("visible");
  document.getElementById("preferences-button").classList.add("active-button");
});

// Statistics Page Button
document.getElementById("statistics-button").addEventListener("click", () => {
  document.getElementById("statistics").classList.add("visible");
  document.getElementById("statistics-button").classList.add("active-button");
  document.getElementById("preferences").classList.remove("visible");
  document
    .getElementById("preferences-button")
    .classList.remove("active-button");
});

// Header actions - closing out, hovering over info
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

// Plant Dropdown Selection Change
document.getElementById("plant-dropdown").addEventListener("change", () => {
  let select = document.getElementById("plant-dropdown");
  let value = select.options[select.selectedIndex].value;
  localStorage.plant = value;
});

// Growth Speed Dropdown Selection Change
document.getElementById("speed-dropdown").addEventListener("change", () => {
  let select = document.getElementById("speed-dropdown");
  let value = select.options[select.selectedIndex].value;
  localStorage.growthSpeed = value;
});

// Preferred Tab Count Input Change
document
  .getElementById("preferred-tab-count")
  .addEventListener("change", () => {
    let input = document.getElementById("preferred-tab-count");
    let value = input.value;
    localStorage.preferredTabCount = value;
  });

/**
 * Removes logged dates for opened tabs that are older than a day
 * @param {*} dateArray array of datelogs maintained for tabs recently opened or closed
 */
function removeOldDays(dateArray) {
  const curDate = new Date();
  const result = dateArray.filter((date) => !dayDiff(curDate, new Date(date)));
  return result;
}

/**
 * Compares the time between two dates and returns true if it is greater than 24 hours
 * @param {*} dateOne
 * @param {*} dateTwo
 * @returns a boolean based on date difference
 */
function dayDiff(dateOne, dateTwo) {
  const minuteDiff = Math.abs(dateOne.getTime() - dateTwo.getTime()) / 60000;
  return minuteDiff >= 1440;
}
