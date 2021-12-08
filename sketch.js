// Flight visualization!
// Mouse over any circle (a "location") to highlight its connections
// and see a list of all flights you've taken to or from that location.

let flights;
let flightObjects = [];

var mapimg;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1.4;

// function windowResized() {
// 	// Adjust canvas height to window height
// 	ww = min(1280,windowWidth);
//  	hh = ww/2;
// 	mapimg = loadImage(
//     'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
//       clon +
//       ',' +
//       clat +
//       ',' +
//       zoom +
//       '/' +
//       ww +
//       'x' +
//       hh +
//       '?access_token=pk.eyJ1IjoibWp2YXIiLCJhIjoiY2t3bHhqeTh3MjZmbTJvcXZ0MHdvb3JhOCJ9.gaBYnlPzukeVP9LhKar1YA'
//   );
// 	resizeCanvas(ww, hh);
// }

function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage(
    'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
      clon +
      ',' +
      clat +
      ',' +
      zoom +
      '/' +
      ww +
      'x' +
      hh +
      '?access_token=pk.eyJ1IjoibWp2YXIiLCJhIjoiY2t3bHhqeTh3MjZmbTJvcXZ0MHdvb3JhOCJ9.gaBYnlPzukeVP9LhKar1YA'
  );
  // Load .csv of flights
  flights = loadTable("flight_data.csv","csv","header");
}


function setup() {
	// Adjust canvas height to window height
	// createCanvas(ww, hh).parent('visualization');
  let canvas = createCanvas(ww, hh);
  canvas.parent("visualization")
  canvas.style("display", "block")

	// Load flight data from table to objects
	// Had to be done in setup because
	// doing it in preload() broke it
	loadFlights();

  // document.getElementById('visualization').appendChild(canvas);
}

function draw() {
	background(32, 32, 64);
	translate(width / 2, height / 2);
	imageMode(CENTER);
	image(mapimg, 0, 0, ww, hh);
	// Display flights
	displayAll();
}