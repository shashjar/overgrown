document.getElementById("preferences").addEventListener("click", () => {
  document.getElementById("preferences-overlay").classList.add("visible");
});

document.getElementById("close-preferences").addEventListener("click", () => {
  document.getElementById("preferences-overlay").classList.remove("visible");
});

// document.getElementById("statistics").addEventListener("click", () => {
//   document.getElementById("statistics-overlay").classList.add("visible");
// });

// document.getElementById("close-statistics").addEventListener("click", () => {
//   document.getElementById("statistics-overlay").classList.remove("visible");
// });
