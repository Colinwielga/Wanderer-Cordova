ColinXiCards.Card = function (text, value,image) {
    this.text = text;
    this.value = value;
    this.image = image;
    this.getImage = function () {
        return "modules/colin-xi-cards/images/" + image + ".jpg";
    };
    this.getHtml = function () {
        return "modules/colin-xi-cards/card.html";
    };
    this.getValue = function () {
        return this.value;
    };
};

