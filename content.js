const ruller = document.createElement("div");
const angle = document.createElement("input");

const rullerSettings = {
  size: { x: 400, y: 100 },
  tempSize: { x: 400, y: 100 },
  position: { x: 400, y: 100 },
  tempPosition: { x: 400, y: 100 },
  moving: false,
  scaling: { t: false, r: false, b: false, l: false },
  clickedPosition: { x: 0, y: 0 },
  currentRotation: 0,
};
const rullerStyle = () =>
  `transform-origin: top left; 
  width:${rullerSettings.tempSize.x}px; 
  height:${rullerSettings.tempSize.y}px; 
  background-color:#FF0000AA; 
  border:5px 
  solid black; 
  position:fixed; 
  z-index: 9999999999; 
  top:${rullerSettings.tempPosition.y}px; 
  left:${rullerSettings.tempPosition.x}px; 
  transform:rotate(${rullerSettings.currentRotation}rad);
  -webkit-user-select: none;
  -ms-user-select: none; 
  user-select: none;
  display:flex;
  align-items: center;
  justify-content: center;
  `;

ruller.style.cssText = rullerStyle();
ruller.id = "ruller";
angle.id = "angle";

angle.type = "number";
ruller.append(angle);
document.body.append(ruller);

const toGlobalRotation = (localX, localY, angle) => {
  const x = localX * Math.cos(angle) - localY * Math.sin(angle);
  const y = localY * Math.cos(angle) - localX * Math.sin(-angle);
  return { x, y };
};

const degToRad = (value) => {
  return (value * Math.PI) / 180;
};

const radToDeg = (value) => {
  return (value * 180) / Math.PI;
};

const elementRuller = document.getElementById("ruller");
const elementAngle = document.getElementById("ruller");

elementAngle.addEventListener("input", (e) => {
  rullerSettings.currentRotation = degToRad(e.target.value);
  ruller.style.cssText = rullerStyle();
});

elementRuller.addEventListener("mousedown", (e) => {
  if (e.target === elementRuller) {
    e.stopPropagation();
    if (
      e.offsetX > 5 &&
      e.offsetX < rullerSettings.size.x - 5 &&
      e.offsetY > 5 &&
      e.offsetY < rullerSettings.size.y - 5
    ) {
      rullerSettings.moving = true;
    } else {
      if (e.offsetY < 5) {
        rullerSettings.scaling.t = true;
      }
      if (e.offsetX > rullerSettings.size.x - 5) {
        rullerSettings.scaling.r = true;
      }
      if (e.offsetY > rullerSettings.size.y - 5) {
        rullerSettings.scaling.b = true;
      }
      if (e.offsetX < 5) {
        rullerSettings.scaling.l = true;
      }
    }
    const inGlobalRotation = toGlobalRotation(
      e.offsetX,
      e.offsetY,
      rullerSettings.currentRotation
    );
    rullerSettings.clickedPosition.x = inGlobalRotation.x;
    rullerSettings.clickedPosition.y = inGlobalRotation.y;
  }
});

document.addEventListener("mousemove", (e) => {
  if (rullerSettings.moving) {
    rullerSettings.tempPosition.x =
      e.clientX - rullerSettings.clickedPosition.x;
    rullerSettings.tempPosition.y =
      e.clientY - rullerSettings.clickedPosition.y;
    ruller.style.cssText = rullerStyle();
  } else if (rullerSettings.scaling) {
    positionDelta = { x: 0, y: 0 };
    if (rullerSettings.scaling.t) {
      rullerSettings.tempSize.y =
        rullerSettings.size.y +
        (rullerSettings.clickedPosition.y +
          rullerSettings.position.y -
          e.clientY) *
          Math.sin(rullerSettings.currentRotation + degToRad(90)) +
        (rullerSettings.clickedPosition.x +
          rullerSettings.position.x -
          e.clientX) *
          Math.sin(-rullerSettings.currentRotation);

      if (rullerSettings.tempSize.y < 50) rullerSettings.tempSize.y = 50;
      positionDelta.x +=
        (rullerSettings.size.y - rullerSettings.tempSize.y) *
        Math.sin(-rullerSettings.currentRotation);

      positionDelta.y +=
        (rullerSettings.size.y - rullerSettings.tempSize.y) *
        Math.sin(rullerSettings.currentRotation + degToRad(90));
    }
    if (rullerSettings.scaling.r) {
      rullerSettings.tempSize.x =
        rullerSettings.size.x +
        (rullerSettings.clickedPosition.y +
          rullerSettings.position.y -
          e.clientY) *
          Math.sin(-rullerSettings.currentRotation) +
        (rullerSettings.clickedPosition.x +
          rullerSettings.position.x -
          e.clientX) *
          Math.sin(rullerSettings.currentRotation - degToRad(90));

      if (rullerSettings.tempSize.x < 50) rullerSettings.tempSize.x = 50;
    }
    if (rullerSettings.scaling.b) {
      rullerSettings.tempSize.y =
        rullerSettings.size.y +
        (rullerSettings.clickedPosition.y +
          rullerSettings.position.y -
          e.clientY) *
          Math.sin(rullerSettings.currentRotation - degToRad(90)) +
        (rullerSettings.clickedPosition.x +
          rullerSettings.position.x -
          e.clientX) *
          Math.sin(rullerSettings.currentRotation);

      if (rullerSettings.tempSize.y < 50) rullerSettings.tempSize.y = 50;
    }
    if (rullerSettings.scaling.l) {
      rullerSettings.tempSize.x =
        rullerSettings.size.x +
        (rullerSettings.clickedPosition.y +
          rullerSettings.position.y -
          e.clientY) *
          Math.sin(rullerSettings.currentRotation) +
        (rullerSettings.clickedPosition.x +
          rullerSettings.position.x -
          e.clientX) *
          Math.sin(rullerSettings.currentRotation + degToRad(90));

      if (rullerSettings.tempSize.x < 50) rullerSettings.tempSize.x = 50;
      positionDelta.x +=
        (rullerSettings.size.x - rullerSettings.tempSize.x) *
        Math.sin(rullerSettings.currentRotation + degToRad(90));
      positionDelta.y +=
        +(rullerSettings.size.x - rullerSettings.tempSize.x) *
        Math.sin(rullerSettings.currentRotation);
    }

    rullerSettings.tempPosition.x = rullerSettings.position.x + positionDelta.x;
    rullerSettings.tempPosition.y = rullerSettings.position.y + positionDelta.y;

    ruller.style.cssText = rullerStyle();
  }
});

document.addEventListener("mouseup", (e) => {
  rullerSettings.moving = false;
  rullerSettings.scaling.t = false;
  rullerSettings.scaling.r = false;
  rullerSettings.scaling.b = false;
  rullerSettings.scaling.l = false;
  rullerSettings.size.x = rullerSettings.tempSize.x;
  rullerSettings.size.y = rullerSettings.tempSize.y;
  rullerSettings.position.x = rullerSettings.tempPosition.x;
  rullerSettings.position.y = rullerSettings.tempPosition.y;
});
