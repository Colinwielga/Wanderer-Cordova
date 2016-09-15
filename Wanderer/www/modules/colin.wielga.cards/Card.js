var Card = function (name, text) {
    this.name = name;
    this.text = text;
    this.id = function () {
        for (var prop in Card.map) {
            if (Card.map.hasOwnProperty(prop)) {
                var num = parseInt(prop);
                if (Card.map[num] === this) {
                    return num;
                }
            }
        }
        throw { message: "card not found" };
    }
    this.getImage = function () {
        var id = this.id();
        // this feels like a hack
        // can i just use the name?
        while (id >= 100) {
            id -= 100;
        }
        return "images/cards/" + id + ".jpg";
    }
};

// decrease by 3, keep it until it hits 0
// starts at 0, increase by three goes away at 12
// 0 all your other cards get a bonus
// 2 all your cards get a minus
// draw another card when you draw it

// you can only play this card if you have no cards in your hand + you can choose not to draw

// a card that is powerful if you are hurt

// order the top of you deck
// 10 during the day, 4 at night
// 10 during the night, 10 at night

// a card that is good when you are at low HP

// I think the plan is put some interesting cards that don't anything about your character in to the deck
// and make the god cards push you to play a certain way
// althought not the indifferent god cards
// the disfavor cards make you bad at the thing?
// maybe I should not even have disfavor cards

Card.map = {
    0: new Card("THE FOOL", "0 play at anytime to make someone make a mistake, 8 if you are drunk"),
    1: new Card("THE MAGICAIN", "3, 12 if pass is 8 or higher"),
    2: new Card("THE HIGH PRIESTESS", "5, when you play this card you may promise an offering to air-ah. if the DM finds it satifactory 12. if you fail to fufill you promise air-ah scorns you"),
    3: new Card("THE EMPRESS", "5, failure counts as failure with some gain"),
    4: new Card("THE EMPEROR", "10, passes counts as passes at a cost"),
    5: new Card("THE HIEROPHANT", "10, gain a fact if you fail"),
    6: new Card("THE LOVERS", "3, 11 if you are working with someone else"),
    7: new Card("THE CHARIOT", "9 play this before the roll"),
    8: new Card("STRENGTH", "2 plus the last card played"),
    9: new Card("THE HERMIT", "2 reveal this card when you draw it"),
    10: new Card("WHEEL OF FORTUNE", "top card of the deck"),
    11: new Card("JUSTICE", "8 when another player plays a card you may play this to replace that card, draw a card"),
    12: new Card("THE HANGED MAN", "5 if you can play this card you must"),
    13: new Card("DEATH", "0 or 15, flip a coin"),
    14: new Card("TEMPERANCE", "4 draw 2 cards"),
    15: new Card("THE DEVIL", "14 take -2 on your next roll"),
    16: new Card("THE TOWER", "10 you may keep this card after playing it, each time you do it's value decrease by 2"),
    17: new Card("THE STAR", "10 reveal this card when you draw it"),
    18: new Card("THE MOON", "4 , 10 when acting with the established order or conventionally"),
    19: new Card("THE SUN", "4 , 10 when acting against established order or outside the convention"),
    20: new Card("JUDGEMENT", "2, any player may play a card to replace this. that player draws a card"),
    21: new Card("THE WORLD", "8 passes and failures are critcal"),

    22: new Card("ACE OF WANDS", "1"),
    23: new Card("TWO OF WANDS", "2"),
    24: new Card("THREE OF WANDS", "3"),
    25: new Card("FOUR OF WANDS", "4"),
    26: new Card("FIVE OF WANDS", "5"),
    27: new Card("SIX OF WANDS", "6"),
    28: new Card("SEVEN OF WANDS", "7"),
    29: new Card("EIGHT OF WANDS", "8"),
    30: new Card("NINE OF WANDS", "9"),
    31: new Card("TEN OF WANDS", "10"),
    32: new Card("PAGE OF WANDS", "11"),
    33: new Card("KNIGHT OF WANDS", "12"),
    34: new Card("QUEEN OF WANDS", "13"),
    35: new Card("KING OF WANDS", "14"),
    36: new Card("ACE OF CUPS", "1"),
    37: new Card("TWO OF CUPS", "2"),
    38: new Card("THREE OF CUPS", "3"),
    39: new Card("FOUR OF CUPS", "4"),
    40: new Card("FIVE OF CUPS", "5"),
    41: new Card("SIX OF CUPS", "6"),
    42: new Card("SEVEN OF CUPS", "7"),
    43: new Card("EIGHT OF CUPS", "8"),
    44: new Card("NINE OF CUPS", "9"),
    45: new Card("TEN OF CUPS", "10"),
    46: new Card("PAGE OF CUPS", "11"),
    47: new Card("KNIGHT OF CUPS", "12"),
    48: new Card("QUEEN OF CUPS", "13"),
    49: new Card("KING OF CUPS", "14"),
    50: new Card("ACE OF SWORDS", "1"),
    51: new Card("TWO OF SWORDS", "2"),
    52: new Card("THREE OF SWORDS", "3"),
    53: new Card("FOUR OF SWORDS", "4"),
    54: new Card("FIVE OF SWORDS", "5"),
    55: new Card("SIX OF SWORDS", "6"),
    56: new Card("SEVEN OF SWORDS", "7"),
    57: new Card("EIGHT OF SWORDS", "8"),
    58: new Card("NINE OF SWORDS", "9"),
    59: new Card("TEN OF SWORDS", "10"),
    60: new Card("PAGE OF SWORDS", "11"),
    61: new Card("KNIGHT OF SWORDS", "12"),
    62: new Card("QUEEN OF SWORDS", "13"),
    63: new Card("KING OF SWORDS", "14"),
    64: new Card("ACE OF PENTACLES", "1"),
    65: new Card("TWO OF PENTACLES", "2"),
    66: new Card("THREE OF PENTACLES", "3"),
    67: new Card("FOUR OF PENTACLES", "4"),
    68: new Card("FIVE OF PENTACLES", "5"),
    69: new Card("SIX OF PENTACLES", "6"),
    70: new Card("SEVEN OF PENTACLES", "7"),
    71: new Card("EIGHT OF PENTACLES", "8"),
    72: new Card("NINE OF PENTACLES", "9"),
    73: new Card("TEN OF PENTACLES", "10"),
    74: new Card("PAGE OF PENTACLES", "11"),
    75: new Card("KNIGHT OF PENTACLES", "12"),
    76: new Card("QUEEN OF PENTACLES", "13"),
    77: new Card("KING OF PENTACLES", "14"),

    100: new Card("THE FOOL", "(scorn) 0 show this card when you draw it, -2 to all roll while it is in your hand "),
    101: new Card("THE MAGICAIN", "(scorn) 15, counts as a 0 if pass is 5 or higher"),
    102: new Card("THE HIGH PRIESTESS", "(scorn) 4, when you play this card leave it in front you. next time you would roll it is played again and then discarded"),
    103: new Card("THE EMPRESS", "(scorn) 1, critical failures count as normal failures"),
    104: new Card("THE EMPEROR", "(scorn) 7, passes counts as failure with some gain"),
    105: new Card("THE HIEROPHANT", "6(scorn) , lose a fact if you fail"),
    106: new Card("THE LOVERS", "(scorn) 5, 0 if you are working with someone else"),
    107: new Card("THE CHARIOT", "(scorn) 4 play this before the roll"),
    108: new Card("STRENGTH", "(scorn) 0, 6 if you are using a brute force appraoch"),
    109: new Card("THE HERMIT", "(scorn) 2 reveal this card when you draw it"),
    110: new Card("WHEEL OF FORTUNE", "(scorn) top card of the deck -5"),
    111: new Card("JUSTICE", "(scorn) 2, when another player plays a card you may play this to replace that card, draw a card. if you can play this card you must"),
    112: new Card("THE HANGED MAN", "(scorn) 2 if you can play this card you must, failures count as critical failures"),
    113: new Card("DEATH", "(scorn) 0, 5 if you choose to take a hit"),
    114: new Card("TEMPERANCE", "(scorn) 1 when you draw this card discard the rest of your hand then draw back up to 4"),
    115: new Card("THE DEVIL", "(scorn) 7 take -3 on your next roll"),
    116: new Card("THE TOWER", "(scorn) 8 you keep this card after playing it, each time you do it's value decrease by 2"),
    117: new Card("THE STAR", "(scorn) 10 reveal this card when you draw it"),
    118: new Card("THE MOON", "(scorn) 7 you may only play this card at night. discard it and draw another if you can't play any cards"),
    119: new Card("THE SUN", "(scorn) 7 you may only play this card during the day. discard it and draw another if you can't play any cards"),
    120: new Card("JUDGEMENT", "(scorn) 5 when you play this card place the remaining cards in your hand inorder faceup on the table. you must play them in that order"),
    121: new Card("THE WORLD", "(scorn) you can't play this card. discard and draw another if you critically fail. discard it and draw another if you can't play any cards"),

    200: new Card("THE FOOL", "(blessing) 0, 15 when doing something stupid"),
    201: new Card("THE MAGICAIN", "(blessing) 0, failure counts as a pass (and vice-versa), critical failure count as critical pass (and vice-versa)"),
    202: new Card("THE HIGH PRIESTESS", "(blessing) 10, you may discard this card to ask a favor of air-ah if she agress lose air-ahs blessing"),
    203: new Card("THE EMPRESS", "(blessing) 12, all failure outcome count as mixed or indeterminate"),
    204: new Card("THE EMPEROR", "(blessing) 12, all pass outcome count as critical passes"),
    205: new Card("THE HIEROPHANT", "(blessing) 12, gain a fact"),
    206: new Card("THE LOVERS", "(blessing) 10, 15 if you are acting to help another"),
    207: new Card("THE CHARIOT", "(blessing) 10, 15 if you are acting with violence or anger"),
    208: new Card("STRENGTH", "(blessing) 5 plus the last card played, the next card played gets +5"),
    209: new Card("THE HERMIT", "(blessing) 2 reveal this card when you draw it"),
    210: new Card("WHEEL OF FORTUNE", "(blessing) top card of the deck"),
    211: new Card("JUSTICE", "(blessing) 10 draw three cards then discard 3 cards"),
    212: new Card("THE HANGED MAN", "(blessing) 15 if you can play this card you must"),
    213: new Card("DEATH", "(blessing) 15, heal two click if this roll results in a death"),
    214: new Card("TEMPERANCE", "(blessing) 6, draw 3 cards"),
    215: new Card("THE DEVIL", "(blessing) 10, 15 if you are acting selfishly"),
    216: new Card("THE TOWER", "(blessing) 6 you may keep this card after playing it, each time you do it's value increase by 3 if it's value is >=15 discard it"),
    217: new Card("THE STAR", "(blessing) 6 you may discard a card to keep this one in your hand after playing it"),
    218: new Card("THE MOON", "(blessing) 10, 15 if acting directly"),
    219: new Card("THE SUN", "(blessing) 10, 15 if acting deceptively"),
    220: new Card("JUDGEMENT", "(blessing) 12, or 15 and take a hit"),
    221: new Card("THE WORLD", "(blessing) 13 heal 2 clicks"),

}

Card.getCard = function (id) {
    return Card.map[id];
}

Card.deckSize = function () {
    var count = 0;
    for (var i in Card.map) {
        if (Card.map.hasOwnProperty(i)) count++;
    }
    return count;
}

Card.draw = function (gods) {
    // list of ids
    var deck = [];

    // add the standard cards
    for (var i = 22; i <= 77; i++) {
        deck.push(i);
    }

    // add the god cards 
    // TODO this is a weird dependency 
    // and it's breaking cards 
    gods.forEach(function (god) {
        deck.push(God.getCardId(god));
    });


    return deck[Math.floor(Math.random() * deck.length)];
}