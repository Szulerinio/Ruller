const opener = document.getElementById("opener");
console.log(opener);
opener.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: addRuller,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function addRuller() {
  console.log("Adding content");
  //   const ruller = document.createElement("div");
  //   const angle = document.createElement("input");
  //   // transform-origin: center;
  //   let rullerStyle = `transform-origin: top left; width:400px; height:100px; background-color:#FF0000AA; border:1px solid black; position:fixed; z-index: 9999999999; top:100px; left:50px ;`;

  //   ruller.style.cssText = rullerStyle;
  //   ruller.id = "linijeczkafajnamoja";
  //   angle.id = "katfajny";

  //   angle.type = "number";
  //   ruller.append(angle);
  //   document.body.append(ruller);

  //   const elementRuller = document.getElementById("linijeczkafajnamoja");
  //   const elementAngle = document.getElementById("linijeczkafajnamoja");

  //   elementAngle.addEventListener("input", (e) => {
  //     rullerSettings.currentRotation = (e.target.value * Math.PI) / 180;
  //     elementRuller.style.transform = `rotate(${e.target.value}deg)`;
  //   });

  //   const rullerSettings = {
  //     clicked: false,
  //     clickedPosition: { x: 0, y: 0 },
  //     currentRotation: 0,
  //   };

  //   elementRuller.addEventListener("mousedown", (e) => {
  //     console.log("AAAAAAAAAAA");
  //     console.log(e.currentTarget);
  //     console.log(e.target);

  //     if (e.target === elementRuller) {
  //       e.stopPropagation();
  //       rullerSettings.clicked = true;
  //       rullerSettings.clickedPosition.x =
  //         e.offsetX * Math.cos(rullerSettings.currentRotation) -
  //         e.offsetY * Math.sin(rullerSettings.currentRotation);
  //       rullerSettings.clickedPosition.y =
  //         e.offsetY * Math.cos(rullerSettings.currentRotation) -
  //         e.offsetX * Math.sin(-rullerSettings.currentRotation);
  //       console.log(rullerSettings.clickedPosition);
  //     }
  //   });

  //   document.addEventListener("mousemove", (e) => {
  //     if (rullerSettings.clicked) {
  //       console.log("X:" + e.clientX, "Y:" + e.clientX);
  //       elementRuller.style.left = `${
  //         e.clientX - rullerSettings.clickedPosition.x
  //       }px`;
  //       elementRuller.style.top = `${
  //         e.clientY - rullerSettings.clickedPosition.y
  //       }px`;
  //     }
  //   });

  //   document.addEventListener("mouseup", (e) => {
  //     console.log(elementRuller);
  //     rullerSettings.clicked = false;
  //   });
}
