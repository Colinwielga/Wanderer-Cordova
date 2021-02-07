var ToteFlosfulgurPhlossi = {};

ToteFlosfulgurPhlossi.title = "Phlossi"
ToteFlosfulgurPhlossi.subtitle = "a friendly wax tablet"

ToteFlosfulgurPhlossi.phlossiPoly = function (fulgonId) {
	// console.log("here " + polyPoints)
	var atts = fulgonId.split("-");
	var polyPoints = "";
	var polyBox = "0 0 0 0";
	var polyRotation = parseInt(atts[2]);
	var polyId = atts[0] + "-" + atts[1];
	// console.log(atts[0] + "-" + atts[1])
	switch (polyId) {
		case "-":
			polyPoints = "none";
			break;
		case "0-0":
			polyPoints = "circleEmpty";
			polyBox = "0 0 50 50";
			break;
		case "2-0":
			polyPoints = "line";
			polyBox = "0 0 50 50";
			break;
		case "3-0":
			polyPoints = "25,0 50,43.3 0,43.3";
			polyBox = "0 0 50 43.3";
			break;
		case "4-0":
			polyPoints = "0,0 50,0 50,50 0,50";
			polyBox = "0 0 50 50";
			break;
		case "4-1":
			polyPoints = "48.3,0 96.6,12.95 48.3,25.9 0,12.95";
			polyBox = "0 0 96.6 25.9";
			polyRotation += 15;
			break;
		case "4-2":
			polyPoints = "0,25 43.3,0 86.6,25 43.3,50";
			polyBox = "0 0 86.6 50";
			polyRotation += 90;
			break;
		case "5-0":
			polyPoints = "0,0 50,0 93.3,25 50,50 0,50";
			polyBox = "0 0 93.3 50";
			polyRotation -= 90;
			break;
		case "6-0":
			polyPoints = "25,0 75,0 100,43.3 75,86.6 25,86.6 0,43.3";
			polyBox = "0 0 100 86.6";
			break;
		case "6-1":
			polyPoints = "43.3,0 93.3,0 136.6,25 93.3,50 43.3,50 0,25";
			polyBox = "0 0 136.6 50";
			break;
		case "6-2":
			polyPoints = "48.3,0 85.1,34.35, 96.6,83.7 48.3,96.6 0,83.7 13,35.35";
			polyBox = "0 0 96.6 96.6";
			polyRotation += 15;
			break;
		case "6-3":
			polyPoints = "0,0 50,0, 75,43.3 75,93.3 25,93.3 0,50";
			polyBox = "0 0 75 93.3";
			break;
		case "6-4":
			polyPoints = "25,0 75,0 75,50 50,93.3 0,93.3 0,43.3";
			polyBox = "0 0 75 93.3";
			break;
		case "7-0":
			polyPoints = "circleFull";
			polyBox = "0 0 50 50";
	};
	// console.log(polyPoints);
	this.fulgonId = fulgonId;
	this.polyId = polyId;
    this.polyPoints = polyPoints;
    this.polyBox = polyBox;
    this.polyBoxWidth = polyBox.split(" ")[2];
	this.polyScale = 3.5;
	this.polyRotation = polyRotation;
    this.getHtml = function () {
		if (this.polyPoints === "line"){
        	return "modules/tote-flosfulgur-phlossi/phlossiLine.html";
		}
		else if (this.polyPoints === "circleEmpty"){
        	return "modules/tote-flosfulgur-phlossi/phlossiCircleEmpty.html";
		}
		else if (this.polyPoints === "circleFull"){
        	return "modules/tote-flosfulgur-phlossi/phlossiCircleFull.html";
		}
		else {
        	return "modules/tote-flosfulgur-phlossi/phlossiPoly.html";
		}
    };
};


// ToteFlosfulgurPhlossi.getPhlossiPolySvg = function() {
// 	return '<svg class="phlossi-poly"><polygon ng-attr-points="29,4 54,47.3 4,47.3"></polygon></svg>'
// }
