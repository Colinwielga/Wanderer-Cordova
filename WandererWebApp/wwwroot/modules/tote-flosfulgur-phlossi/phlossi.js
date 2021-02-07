var ToteFlosfulgurPhlossi = {};

ToteFlosfulgurPhlossi.title = "Phlossi"
ToteFlosfulgurPhlossi.subtitle = "a friendly wax tablet"

ToteFlosfulgurPhlossi.phlossiPoly = function (polyBox, polyPoints) {
    this.polyBox = "0 0 " + polyBox;
    this.polyPoints = polyPoints;
    this.getHtml = function () {
        return "modules/tote-flosfulgur-phlossi/phlossiPoly.html";
    };
};


// ToteFlosfulgurPhlossi.getPhlossiPolySvg = function() {
// 	return '<svg class="phlossi-poly"><polygon ng-attr-points="29,4 54,47.3 4,47.3"></polygon></svg>'
// }
