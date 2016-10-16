ColinWielgaCards.Deck = function (guid, name, listOfCards) {
    this.name = name;
    this.guid = guid;
    this.allCards = {};
    var that = this;
    listOfCards.forEach(function(card) {
        card.deck = this;
        that.allCards[card.guid] = card;
    })
    this.defaultActive = function () {
        var res = [];
        for (var key in this.allCards) {
            if (this.allCards.hasOwnProperty(key)) {
                if (this.allCards[key].inDefault) {
                    res.push(key);
                }
            }
        }
        return res;
    }
};