// Event Listener for Tab Creation
chrome.tabs.onCreated.addListener((tab) => {
  console.log("creation");
  console.log(tab);

  incrementTotalOpenCount();
  incrementDayOpenCount();
});

function incrementTotalOpenCount() {
  console.log("CALL TO INCREMENT TOTAL OPEN COUNT");
  chrome.storage.local.get(["totalOpenCount"]).then((result) => {
    console.log("Total Open Count Result:", result);
    let curTotalOpen;
    if (result && result.totalOpenCount) {
      curTotalOpen = JSON.parse(result.totalOpenCount);
      console.log("Current Total Open Count:", curTotalOpen);
    } else {
      curTotalOpen = "0";
    }

    curTotalOpen = Number(curTotalOpen) + 1;
    chrome.storage.local
      .set({ totalOpenCount: JSON.stringify(curTotalOpen) })
      .then(() => {
        console.log("Setting total open count to be: ", curTotalOpen);
      });
  });
}

function incrementDayOpenCount() {
  chrome.storage.local.get(["dayOpen"]).then((result) => {
    let curDayOpen;
    if (result && result.dayOpen) {
      curDayOpen = JSON.parse(result.dayOpen);
    } else {
      curDayOpen = [];
    }

    const datelog = new Date();
    curDayOpen = removeOldDays(curDayOpen);
    curDayOpen.push(datelog);
    chrome.storage.local
      .set({ dayOpen: JSON.stringify(curDayOpen) })
      .then(() => {
        console.log("Setting current day open count to be: ", curDayOpen);
      });
  });
}

// Event Listener for Tab Deletion
chrome.tabs.onRemoved.addListener((tabId, info) => {
  console.log("deletion");

  incrementTotalClosedCount();
  incrementDayClosedCount();
});

function incrementTotalClosedCount() {
  console.log("CALL TO INCREMENT TOTAL CLOSED COUNT");
  chrome.storage.local.get(["totalClosedCount"]).then((result) => {
    console.log("Total Closed Count Result:", result);
    let curTotalClosed;
    if (result && result.totalClosedCount) {
      curTotalClosed = JSON.parse(result.totalClosedCount);
      console.log("Current Total Closed Count:", curTotalClosed);
    } else {
      curTotalClosed = "0";
    }

    curTotalClosed = Number(curTotalClosed) + 1;
    chrome.storage.local
      .set({ totalClosedCount: JSON.stringify(curTotalClosed) })
      .then(() => {
        console.log("Setting total closed count to be: ", curTotalClosed);
      });
  });
}

function incrementDayClosedCount() {
  chrome.storage.local.get(["dayClosed"]).then((result) => {
    let curDayClosed;
    if (result && result.dayClosed) {
      curDayClosed = JSON.parse(result.dayClosed);
      console.log("curDayClosed:", curDayClosed);
    } else {
      console.log("in else statement");
      curDayClosed = [];
    }

    const datelog = new Date();
    curDayClosed = removeOldDays(curDayClosed);
    curDayClosed.push(datelog);
    chrome.storage.local
      .set({ dayClosed: JSON.stringify(curDayClosed) })
      .then(() => {
        console.log("Setting current day close count to be: ", curDayClosed);
      });
  });
}

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
