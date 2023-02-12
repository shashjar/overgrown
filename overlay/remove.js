function removeStyling(element) {
  for (let key in element.style) {
    if (`old${key}` in element.style) {
      if (key === "transition") {
        setTimeout(() => {
          element.style[key] = element.style[`old${key}`];
          delete element.style[`old${key}`];
        }, 400);
      } else {
        element.style[key] = element.style[`old${key}`];
        delete element.style[`old${key}`];
      }
    }
  }
}

function main() {
  let overlay = document.getElementById("overgrown-overlay");
  if (overlay) {
    console.log("Removing overlay");
    setTimeout(() => {
      document.getElementById("about-us-container").style.opacity = 0;
    }, 20);
    setTimeout(() => {
      overlay.remove();
    }, 500);
    const bodyElements = document.getElementsByTagName("body").item(0).children;
    for (let i = 0; i < bodyElements.length; i++) {
      if (bodyElements.item(i).id !== "overgrown-overlay") {
        removeStyling(bodyElements.item(i));
      }
    }
  } else {
    console.log("Overlay does not exist");
  }
}

main();
