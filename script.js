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
