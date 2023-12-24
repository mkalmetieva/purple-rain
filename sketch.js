const MAX_DROP_COUNT = 1000;
const MIN_DROP_COUNT = 200;
const DEFAULT_DROP_COUNT = 600;
const ZOOM_LEVEL_COUNT = 5;

let stopped = false;

let dropCount = DEFAULT_DROP_COUNT;
let speedBoost = 0;
let wind = 0;

let drops = [];

function setup() {
  setupControls();
  
  createCanvas(getResponsiveCanvasWidth(), getResponsiveCanvasHeight());
  
  for (var i = 0; i < MAX_DROP_COUNT; i++) {
    let maxZoomLevel = ZOOM_LEVEL_COUNT - 1;
    let zoomLevel = int(map(zoomMap(i), zoomMap(dropCount), 0, 0, maxZoomLevel));
    let zoomPercentage = zoomLevel / maxZoomLevel;
    
    // let zoomPercentage = 1;
    drops[i] = new Drop(zoomPercentage);
  }
  
  drops = shuffle(drops);
}

function zoomMap(value) {
  return Math.pow(value, 1);
}

function setupControls() {

  let stopButton = select('button');
  stopButton.mousePressed(() => {
    stopped = !stopped;
  });

  let speedSlider = select('#speedSlider');
  speedSlider.attribute("min", 0);
  speedSlider.attribute("max", 4);
  speedSlider.value(0);
  speedSlider.changed(() => {
    speedBoost = speedSlider.value();
  });
  
  let dropCountSlider = select('#amountSlider');
  dropCountSlider.attribute("min", MIN_DROP_COUNT);
  dropCountSlider.attribute("max", MAX_DROP_COUNT);
  dropCountSlider.value(DEFAULT_DROP_COUNT);
  dropCountSlider.attribute("step", 100);
  dropCountSlider.changed(() => {
    dropCount = dropCountSlider.value();
  });
  
  let windSlider = select('#windSlider');
  windSlider.attribute("min", -20);
  windSlider.attribute("max", 20);
  windSlider.value(0);
  windSlider.attribute("step", 2);
  windSlider.changed(() => {
    wind = windSlider.value();
  });

}

function draw() {
  if (stopped) return;
  
  background(230, 230, 250);
  for (var i = 0; i < dropCount; i++) {
    drops[i].fall(speedBoost, wind);
    drops[i].show();
  }
}

function windowResized() {
  resizeCanvas(getResponsiveCanvasWidth(), getResponsiveCanvasHeight());
}

function getResponsiveCanvasWidth() {
  return Math.min(windowWidth * 0.8, 640);
}

function getResponsiveCanvasHeight() {
  return Math.min(windowHeight * 0.5, 480);
}