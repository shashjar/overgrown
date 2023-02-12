function createElement({ tag, id, style, parent }) {
  const newEl = document.createElement(tag);
  if (id) {
    newEl.id = id;
  }
  assignStyling(newEl, style);
  if (parent) {
    parent.appendChild(newEl);
  }
  return newEl;
}

function assignStyling(element, style) {
  for (let key in style) {
    element.style[`old${key}`] = element.style[key];
    element.style[key] = style[key];
  }
}

function main() {
  if (document.getElementById("overgrown-overlay")) {
    console.log("Overlay already exists");
    return;
  }

  const bodyElements = document.getElementsByTagName("body").item(0).children;
  for (let i = 0; i < bodyElements.length; i++) {
    assignStyling(bodyElements.item(i), {
      filter: "blur(8px)",
      transition: "0.3s filter ease-in-out",
    });
  }

  const overlay = createElement({
    tag: "div",
    id: "overgrown-overlay",
    style: {
      boxSizing: "border-box",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100vw",
      position: "fixed",
      zIndex: "2147483640",
    },
  });

  const aboutUsContainer = createElement({
    tag: "div",
    id: "about-us-container",
    style: {
      boxSizing: "inherit",
      fontFamily: "$font-stack",
      sansSerif: true,
      top: "150px",
      left: "150px",
      height: "400px",
      width: "650px",
      position: "fixed",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      background: "#567335",
      borderRadius: "8px",
      padding: "0 2%",
      opacity: 0,
      transition: "0.3s opacity ease-in-out",
    },
    parent: overlay,
  });

  const textChunks = [
    "About Us",
    "Overgrown is a solution to unorganized, cluttered, and mismanaged tabs; the more tabs you open, the greater your screen grows.",
    "The entirety of this Chrome Extension is built in JavaScript, HTML, and CSS. Graphics are procedurally generated with the p5js graphics library.",
    "Our Team: Shashank Jarmale, Devashish Sood, Nate Sawant, Lucas Dunker, Dillon Scott",
    "Made with ♥ for HackBeanpot 2023 :)",
  ];

  for (const text of textChunks) {
    createElement({
      tag: "h3",
      parent: aboutUsContainer,
      style: {
        color: "#CEE7E6",
        fontSize: "22px",
        width: "100%",
        textAlign: "center",
        margin: 0,
        padding: 0,
      },
    }).innerText = text;
  }

  document.getElementsByTagName("body").item(0)?.appendChild(overlay);
  setTimeout(() => {
    aboutUsContainer.style.opacity = 1;
  }, 20);
  console.log("Overlay added");
}

main();
