// Diameter for circles of airport
const diameter = 15;

// Class for any given flight.
// Contains origin and destination coordinates,
// origin and destination names, and year of travel.
class Flight{
	constructor(x1, y1, x2, y2, from, to, year, mode){
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
		this.from = from;
		this.to = to;
		this.year = year;
		this.mode = mode;
		this.mouseOver = false;

		if (this.mode == "p"){
			this.emoji = "✈️";
		}
		else if (this.mode == "b"){
			this.emoji = "🚌";
		}
		else if (this.mode == "t"){
			this.emoji = "🚆";
		}
	}

	// Draw origin, destination, and line for this flight
	drawFlight(){
		push();
		// Change alpha or stroke based on mouse over
		let alpha = this.mouseOver ? 255 : 100;
		let weight = this.mouseOver ? 4 : 1;
		noFill();

		let modeColor = color(0,0,0,0);

		if (this.mode == "p"){
			modeColor = color(217,95,2,alpha*2);
		}
		else if (this.mode == "b"){
			modeColor = color(27,158,119,alpha*2);
		}
		else if (this.mode == "t"){
			modeColor = color(117,112,179,alpha*2);
		}
		else {
			modeColor = color(217,95,2,alpha*2);
		}

		strokeWeight(weight);
		stroke(modeColor);
		line(this.x1, this.y1, this.x2, this.y2);

		strokeWeight(3);
		stroke(modeColor);
		modeColor.setAlpha(alpha/2);
		fill(modeColor);

		ellipse(this.x1, this.y1, diameter, diameter);
		ellipse(this.x2, this.y2, diameter, diameter);
		pop();
	}

	// Checks if mouse is in circle
	checkMouse(){
		var cx = mercX(0);
  		var cy = mercY(0);
		if(dist(mouseX-width/2, mouseY-height/2, this.x1, this.y1) < diameter/2 || dist(mouseX-width/2, mouseY-height/2, this.x2, this.y2) < diameter/2) {
			this.mouseOver = true;
			console.log("POG");
		} else {
			this.mouseOver = false;
		}
	}
}

// Load flights from table into objects
function loadFlights() {
	var cx = mercX(clon);
  	var cy = mercY(clat);
	for (let x = 0; x < flights.getRowCount(); x++){
		flightObjects[x] = new Flight(
			// Here we map the latitude and longitude
			// to stay within the canvas
			mercX(flights.getColumn("from_lon")[x])-cx,
			mercY(flights.getColumn("from_lat")[x])-cy,
			mercX(flights.getColumn("to_lon")[x])-cx,
			mercY(flights.getColumn("to_lat")[x])-cy,
			flights.getColumn("from_name")[x],
			flights.getColumn("to_name")[x],
			flights.getColumn("year")[x],
			flights.getColumn("mode")[x]);
		console.log(flightObjects[x]);
	}
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

// Displays all flight data
function displayAll() {
	// info is the array of flights that are
	// currently being moused over
	let info = [];
	for(let x = 0; x < flights.getRowCount(); x++) {
		// Every frame, check if each flight is being moused over
		flightObjects[x].checkMouse();
		flightObjects[x].drawFlight();
		if(flightObjects[x].mouseOver) {
			append(info, flightObjects[x]);
		}
	}

	// Have a single string for all flight data
	// to be shown in this frame
	let displayText = "";
	let displayTextNoEmoji = "";
	for(let x = 0; x < info.length; x++) {
		// Construct a line of format
		// "Manila -> Abu Dhabi, 2020"
		displayText += info[x].from
			+ " -> " + info[x].to
			+ ", " + info[x].year 
			+ " " + info[x].emoji + "\n";
		displayTextNoEmoji += info[x].from
			+ " -> " + info[x].to
			+ ", " + info[x].year 
			+ "      " + "\n";
	}

	// Display text
	noStroke();
	fill(84, 56, 100);
	textSize(diameter);

	// Change text align based on position of circle
	if(mouseX > width/2){
		textAlign(RIGHT, BOTTOM);
	} else {
		textAlign(LEFT, BOTTOM);
	}
	text(displayText, mouseX-width/2, mouseY-height/2);
	fill(255);
	text(displayTextNoEmoji, mouseX-width/2-2, mouseY-height/2-2);
}