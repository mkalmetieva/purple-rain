const MAX_DROP_COUNT = 1500;
const DEFAULT_DROP_COUNT = 900;
const ZOOM_LEVEL_COUNT = 5;

let stopped = false;

let dropCount = DEFAULT_DROP_COUNT;
let speedBoost = 0;
let wind = 0;

let drops = [];

function setup() {
  setupControls();
  
  createCanvas(640, 360);
  
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
  let stopButton = createButton('Run/Stop');
  stopButton.mousePressed(() => {
    stopped = !stopped;
  });
  
  let speedBoostSlider = createSlider(0, 4, 0);
  speedBoostSlider.changed(() => {
    speedBoost = speedBoostSlider.value();
  });
  
  let dropCountSlider = createSlider(300, MAX_DROP_COUNT, DEFAULT_DROP_COUNT, 100);
  dropCountSlider.changed(() => {
    dropCount = dropCountSlider.value();
  });
  
  let windSlider = createSlider(-20, 20, 0, 2);
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