// TODO: add logic for fetching historical and current tab data

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

// All time stats
if (localStorage.totalOpenCount) {
  const totalOpenCount = JSON.parse(localStorage.totalOpenCount);
  document.getElementById("openall").innerHTML = totalOpenCount;
}
else {
  localStorage.totalOpenCount = "0";
}

if (localStorage.totalClosedCount) {
  const totalClosedCount = JSON.parse(localStorage.totalClosedCount);
  document.getElementById("closeall").innerHTML = totalClosedCount;
}
else {
  localStorage.totalClosedCount = "0";
}

// 24 hours stats
if (localStorage.dayOpen) {
  const dayOpen = removeOldDays(JSON.parse(localStorage.dayOpen));
  localStorage.dayOpen = JSON.stringify(dayOpen);
  document.getElementById("open24").innerHTML = dayOpen.length;
}
else {
  localStorage.dayOpen = JSON.stringify([]);
}

if (localStorage.dayClosed) {
  const dayClosed = removeOldDays(JSON.parse(localStorage.dayClosed));
  localStorage.dayClosed = JSON.stringify(dayClosed);
  document.getElementById("close24").innerHTML = dayClosed.length;
}
else {
  localStorage.dayClosed = JSON.stringify([]);
}

/**
 * Removes logged dates for opened tabs that are older than a day
 * @param {*} dateArray array of datelogs maintained for tabs recently opened or closed
 */
function removeOldDays(dateArray) {
  const curDate = new Date();
  const result = dateArray.filter(date => !(dayDiff(curDate, date)))
  return result;
}

/**
 * Compares the time between two dates and returns true if it is greater than 24 hours
 * @param {*} dateOne 
 * @param {*} dateTwo 
 * @returns a boolean based on date difference
 */
function dayDiff(dateOne, dateTwo) {
  const minuteDiff = Math.abs((dateOne.getTime() - dateTwo.getTime())) / 60000;
  return minuteDiff >= 1440;
}

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

chrome.tabs.onCreated.addListener(() => {
  const datelog = new Date();
  console.log("onCreated")
  console.log(typeof(totalOpenCount))
  console.log(totalOpenCount)
  localStorage.totalOpenCount = JSON.stringify(totalOpenCount + 1);
  localStorage.dayOpen = JSON.stringify(dayOpen.push(datelog));
});

chrome.tabs.onRemoved.addListener(() => {
  const datelog = new Date();
  console.log("onRemoved")
  console.log(typeof(totalClosedCount))
  console.log(totalClosedCount)
  localStorage.totalClosedCount = JSON.stringify(totalClosedCount + 1);
  localStorage.dayClosed = JSON.stringify(dayClosed.push(datelog));
});

