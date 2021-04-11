var ToteFlosfulgurGm = {};

ToteFlosfulgurGm.getChallenge = function(color, shape) {
	return new ToteFlosfulgurGm.challenge(color, shape);
}

ToteFlosfulgurGm.challenge = function(color, shape) {
	this.color = color;
	this.shape = shape;
	this.id = this.color + "-" + this.shape;
	if (this.id == "-") {this.id = ""};
	this.colorText = (this.color != "") ? "color: " + this.color : "";
	this.shapeText = (this.shape != "") ? "shape: " + this.shape : "";
	this.text = (this.color != "" && this.shape != "") ? this.colorText + ", " + this.shapeText : this.colorText + this.shapeText;
	if (this.text == "") {this.text = "none"};
}

ToteFlosfulgurGm.challengeChoicesColor = [
	"any",
	"same",
	"change",
	"yellow",
	"red",
	"blue",
	"green",
	"purple"
]
ToteFlosfulgurGm.challengeChoicesShape = [
	"any",
	"same",
	"change",
	"increase",
	"decrease",
	"void",
	"axis",
	"trigon",
	"tetragon",
	"pentagon",
	"hexagon",
	"cirlce"
]
