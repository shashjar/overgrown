// TODO: add logic for fetching historical and current tab data

document.getElementById("preferences-button").addEventListener("click", () => {
  document.getElementById("statistics").classList.remove("visible");
  document.getElementById("preferences").classList.add("visible");
});

document.getElementById("statistics-button").addEventListener("click", () => {
  document.getElementById("preferences").classList.remove("visible");
  document.getElementById("statistics").classList.add("visible");
});
