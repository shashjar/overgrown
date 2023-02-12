// All time stats
chrome.storage.local.get(["totalOpenCount"]).then((result) => {
    if (result && result.key) {
        console.log("Total Open Count returned from local storage", result.key)
        const totalOpenCount = result.key;
        document.getElementById("openall").value = totalOpenCount;
    }
    else {
        console.log("In else case for total open count storage")
        chrome.storage.local.set({ "totalOpenCount": "0" });
    }
  });
  
  chrome.storage.local.get(["totalClosedCount"]).then((result) => {
    if (result && result.key) {
      const totalClosedCount = result.key;
      document.getElementById("closedall").innerHTML = totalClosedCount;
    }
    else {
      chrome.storage.local.set({ "totalClosedCount": "0" });
    }
  });
  
  // if (chrome.storage.local.get(["totalClosedCount"])) {
  //   const totalClosedCount = JSON.parse(localStorage.totalClosedCount);
  //   document.getElementById("closeall").innerHTML = totalClosedCount;
  // }
  // else {
  //   localStorage.totalClosedCount = "0";
  // }
  
  // 24 hours stats
  
  chrome.storage.local.get(["dayOpen"]).then((result) => {
    if (result && result.key) {
      const dayOpen = removeOldDays(JSON.parse(result.key));
      chrome.storage.local.set({"dayOpen": JSON.stringify(dayOpen)})
      document.getElementById("open24").innerHTML = dayOpen.length;
    }
    else {
      chrome.storage.local.set({"dayOpen": JSON.stringify([])})
    }
  });
  
  // if (chrome.storage.local.get(["dayOpen"])) {
  //   const dayOpen = removeOldDays(JSON.parse(localStorage.dayOpen));
  //   localStorage.dayOpen = JSON.stringify(dayOpen);
  //   document.getElementById("open24").innerHTML = dayOpen.length;
  // }
  // else {
  //   localStorage.dayOpen = JSON.stringify([]);
  // }
  
  chrome.storage.local.get(["dayClosed"]).then((result) => {
    if (result && result.key) {
      const dayClosed = removeOldDays(JSON.parse(result.key));
      chrome.storage.local.set({"dayClosed": JSON.stringify(dayClosed)})
      document.getElementById("close24").innerHTML = dayClosed.length;
    }
    else {
      chrome.storage.local.set({"dayClosed": JSON.stringify([])})
    }
  });
  
  
  // if (chrome.storage.local.get(["dayClosed"])) {
  //   const dayClosed = removeOldDays(JSON.parse(localStorage.dayClosed));
  //   localStorage.dayClosed = JSON.stringify(dayClosed);
  //   document.getElementById("close24").innerHTML = dayClosed.length;
  // }
  // else {
  //   localStorage.dayClosed = JSON.stringify([]);
  // }
  
  /**
   * Removes logged dates for opened tabs that are older than a day
   * @param {*} dateArray array of datelogs maintained for tabs recently opened or closed
   */
  function removeOldDays(dateArray) {
    const curDate = new Date();
    const result = dateArray.filter(date => !(dayDiff(curDate, date)));
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

chrome.tabs.onCreated.addListener((tab) => {
    console.log("creation");
    const datelog = new Date();
    chrome.storage.local.get(["totalOpenCount"]).then((result) => {
        let curTotalOpen;
        if (result && result.key) {
            curTotalOpen = JSON.parse(result.key);
        }
        else {
            curTotalOpen = "0";
        }

        curTotalOpen = Number(curTotalOpen) + 1;
        chrome.storage.local.set({"totalOpenCount": JSON.stringify(curTotalOpen)}).then(() => {
            console.log("Setting total open count to be: ", curTotalOpen);
        })

        document.getElementById("openall").innerHTML = String(curTotalOpen);
    })

    chrome.storage.local.get(["dayOpen"]).then((result) => {
        let curDayOpen;
        if (result && result.key) {
            curDayOpen = JSON.parse(result.key);
        }
        else {
            curDayOpen = [];
        }

        curDayOpen.push(datelog);
        chrome.storage.local.set({"dayOpen": JSON.stringify(curDayOpen)}).then(() => {
            console.log("Setting total open count to be: ", curDayOpen);
        })

        document.getElementById("open24").innerHTML = String(curDayOpen.length);
    })
  });
  
//   chrome.tabs.onRemoved.addListener((tabId, info) => {
//     console.log("deletion");
//     const datelog = new Date();
//     localStorage.totalClosedCount = JSON.stringify(totalClosedCount + 1);
//     localStorage.dayClosed = JSON.stringify(dayClosed.push(datelog));
//   });
