
ColinWielgaCards.AhlosainCard = function (name, text, value,deck) {
    this.name = name;
    this.text = text;
    this.deck = deck;
    this.value = value;
    this.id = function () {
        for (var prop in deck.allCards) {
            if (deck.allCards.hasOwnProperty(prop)) {
                var num = parseInt(prop);
                if (deck.allCards[num] === this) {
                    return parseInt(num);
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
    this.getHtml = function () {
        return "modules/colin-wielga-cards/card.html"
    }
    this.getValue = function () {
        return this.value;
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

// todo make a deck constructor... 

ColinWielgaCards.AhlosainDeck ={
    id:0,
    name: "Ahlos Deck",
}


ColinWielgaCards.AhlosainDeck.allCards={
    0: new ColinWielgaCards.AhlosainCard("THE FOOL", "play at anytime to make someone make a mistake, 8 if you are drunk","0",ColinWielgaCards.AhlosainDeck),// I hate this card
    1: new ColinWielgaCards.AhlosainCard("THE MAGICAIN", "12 if pass is 8 or higher","3",ColinWielgaCards.AhlosainDeck),
    2: new ColinWielgaCards.AhlosainCard("THE HIGH PRIESTESS", "when you play this card you may promise an offering to air-ah. if the DM finds it satifactory 12. if you fail to fufill you promise air-ah scorns you", "5",ColinWielgaCards.AhlosainDeck),
    3: new ColinWielgaCards.AhlosainCard("THE EMPRESS", "failure counts as failure with some gain","12",ColinWielgaCards.AhlosainDeck),
    4: new ColinWielgaCards.AhlosainCard("THE EMPEROR", "passes counts as passes at a cost","10",ColinWielgaCards.AhlosainDeck),
    5: new ColinWielgaCards.AhlosainCard("THE HIEROPHANT", "10, gain a fact if you fail","10",ColinWielgaCards.AhlosainDeck),
    6: new ColinWielgaCards.AhlosainCard("THE LOVERS", "11 if you are working with someone else","3",ColinWielgaCards.AhlosainDeck),
    7: new ColinWielgaCards.AhlosainCard("THE CHARIOT", "play this before the roll","9",ColinWielgaCards.AhlosainDeck),
    8: new ColinWielgaCards.AhlosainCard("STRENGTH", "plus the last card played","2",ColinWielgaCards.AhlosainDeck),
    9: new ColinWielgaCards.AhlosainCard("THE HERMIT", "reveal this card when you draw it","2",ColinWielgaCards.AhlosainDeck),
    10: new ColinWielgaCards.AhlosainCard("WHEEL OF FORTUNE", "top card of the deck","?",ColinWielgaCards.AhlosainDeck),
    11: new ColinWielgaCards.AhlosainCard("JUSTICE", "8 when another player plays a card you may play this to replace that card, draw a card",ColinWielgaCards.AhlosainDeck),
    12: new ColinWielgaCards.AhlosainCard("THE HANGED MAN", "if you can play this card you must","5",ColinWielgaCards.AhlosainDeck),
    13: new ColinWielgaCards.AhlosainCard("DEATH", "0 or 15, flip a coin","0/15",ColinWielgaCards.AhlosainDeck),
    14: new ColinWielgaCards.AhlosainCard("TEMPERANCE", "draw 2 cards","4",ColinWielgaCards.AhlosainDeck),
    15: new ColinWielgaCards.AhlosainCard("THE DEVIL", "take -2 on your next roll","14",ColinWielgaCards.AhlosainDeck),
    16: new ColinWielgaCards.AhlosainCard("THE TOWER", "you may keep this card after playing it, each time you do it's value decrease by 2","10",ColinWielgaCards.AhlosainDeck),
    17: new ColinWielgaCards.AhlosainCard("THE STAR", "reveal this card when you draw it","10",ColinWielgaCards.AhlosainDeck),
    18: new ColinWielgaCards.AhlosainCard("THE MOON", "10 when acting with the established order or conventionally","4",ColinWielgaCards.AhlosainDeck),
    19: new ColinWielgaCards.AhlosainCard("THE SUN", "10 when acting against established order or outside the convention","4",ColinWielgaCards.AhlosainDeck),
    20: new ColinWielgaCards.AhlosainCard("JUDGEMENT", "any player may play a card to replace this. that player draws a card","2",ColinWielgaCards.AhlosainDeck),
    21: new ColinWielgaCards.AhlosainCard("THE WORLD", "passes and failures are critcal","8",ColinWielgaCards.AhlosainDeck),

    22: new ColinWielgaCards.AhlosainCard("ACE OF WANDS", "", "1",ColinWielgaCards.AhlosainDeck),
    23: new ColinWielgaCards.AhlosainCard("TWO OF WANDS", "", "2",ColinWielgaCards.AhlosainDeck),
    24: new ColinWielgaCards.AhlosainCard("THREE OF WANDS", "", "3",ColinWielgaCards.AhlosainDeck),
    25: new ColinWielgaCards.AhlosainCard("FOUR OF WANDS", "", "4",ColinWielgaCards.AhlosainDeck),
    26: new ColinWielgaCards.AhlosainCard("FIVE OF WANDS", "", "5",ColinWielgaCards.AhlosainDeck),
    27: new ColinWielgaCards.AhlosainCard("SIX OF WANDS", "", "6",ColinWielgaCards.AhlosainDeck),
    28: new ColinWielgaCards.AhlosainCard("SEVEN OF WANDS", "", "7",ColinWielgaCards.AhlosainDeck),
    29: new ColinWielgaCards.AhlosainCard("EIGHT OF WANDS", "", "8",ColinWielgaCards.AhlosainDeck),
    30: new ColinWielgaCards.AhlosainCard("NINE OF WANDS", "", "9",ColinWielgaCards.AhlosainDeck),
    31: new ColinWielgaCards.AhlosainCard("TEN OF WANDS", "", "10",ColinWielgaCards.AhlosainDeck),
    32: new ColinWielgaCards.AhlosainCard("PAGE OF WANDS", "", "11",ColinWielgaCards.AhlosainDeck),
    33: new ColinWielgaCards.AhlosainCard("KNIGHT OF WANDS", "", "12",ColinWielgaCards.AhlosainDeck),
    34: new ColinWielgaCards.AhlosainCard("QUEEN OF WANDS", "", "13",ColinWielgaCards.AhlosainDeck),
    35: new ColinWielgaCards.AhlosainCard("KING OF WANDS", "", "14",ColinWielgaCards.AhlosainDeck),
    36: new ColinWielgaCards.AhlosainCard("ACE OF CUPS", "", "1",ColinWielgaCards.AhlosainDeck),
    37: new ColinWielgaCards.AhlosainCard("TWO OF CUPS", "", "2",ColinWielgaCards.AhlosainDeck),
    38: new ColinWielgaCards.AhlosainCard("THREE OF CUPS", "", "3",ColinWielgaCards.AhlosainDeck),
    39: new ColinWielgaCards.AhlosainCard("FOUR OF CUPS", "", "4",ColinWielgaCards.AhlosainDeck),
    40: new ColinWielgaCards.AhlosainCard("FIVE OF CUPS", "", "5",ColinWielgaCards.AhlosainDeck),
    41: new ColinWielgaCards.AhlosainCard("SIX OF CUPS", "", "6",ColinWielgaCards.AhlosainDeck),
    42: new ColinWielgaCards.AhlosainCard("SEVEN OF CUPS", "", "7",ColinWielgaCards.AhlosainDeck),
    43: new ColinWielgaCards.AhlosainCard("EIGHT OF CUPS", "", "8",ColinWielgaCards.AhlosainDeck),
    44: new ColinWielgaCards.AhlosainCard("NINE OF CUPS", "", "9",ColinWielgaCards.AhlosainDeck),
    45: new ColinWielgaCards.AhlosainCard("TEN OF CUPS", "", "10",ColinWielgaCards.AhlosainDeck),
    46: new ColinWielgaCards.AhlosainCard("PAGE OF CUPS", "", "11",ColinWielgaCards.AhlosainDeck),
    47: new ColinWielgaCards.AhlosainCard("KNIGHT OF CUPS", "", "12",ColinWielgaCards.AhlosainDeck),
    48: new ColinWielgaCards.AhlosainCard("QUEEN OF CUPS", "", "13",ColinWielgaCards.AhlosainDeck),
    49: new ColinWielgaCards.AhlosainCard("KING OF CUPS", "", "14",ColinWielgaCards.AhlosainDeck),
    50: new ColinWielgaCards.AhlosainCard("ACE OF SWORDS", "", "1",ColinWielgaCards.AhlosainDeck),
    51: new ColinWielgaCards.AhlosainCard("TWO OF SWORDS", "", "2",ColinWielgaCards.AhlosainDeck),
    52: new ColinWielgaCards.AhlosainCard("THREE OF SWORDS", "", "3",ColinWielgaCards.AhlosainDeck),
    53: new ColinWielgaCards.AhlosainCard("FOUR OF SWORDS", "", "4",ColinWielgaCards.AhlosainDeck),
    54: new ColinWielgaCards.AhlosainCard("FIVE OF SWORDS", "", "5",ColinWielgaCards.AhlosainDeck),
    55: new ColinWielgaCards.AhlosainCard("SIX OF SWORDS", "", "6",ColinWielgaCards.AhlosainDeck),
    56: new ColinWielgaCards.AhlosainCard("SEVEN OF SWORDS", "", "7",ColinWielgaCards.AhlosainDeck),
    57: new ColinWielgaCards.AhlosainCard("EIGHT OF SWORDS", "", "8",ColinWielgaCards.AhlosainDeck),
    58: new ColinWielgaCards.AhlosainCard("NINE OF SWORDS", "", "9",ColinWielgaCards.AhlosainDeck),
    59: new ColinWielgaCards.AhlosainCard("TEN OF SWORDS", "", "10",ColinWielgaCards.AhlosainDeck),
    60: new ColinWielgaCards.AhlosainCard("PAGE OF SWORDS", "", "11",ColinWielgaCards.AhlosainDeck),
    61: new ColinWielgaCards.AhlosainCard("KNIGHT OF SWORDS", "", "12",ColinWielgaCards.AhlosainDeck),
    62: new ColinWielgaCards.AhlosainCard("QUEEN OF SWORDS", "", "13",ColinWielgaCards.AhlosainDeck),
    63: new ColinWielgaCards.AhlosainCard("KING OF SWORDS", "", "14",ColinWielgaCards.AhlosainDeck),
    64: new ColinWielgaCards.AhlosainCard("ACE OF PENTACLES", "", "1",ColinWielgaCards.AhlosainDeck),
    65: new ColinWielgaCards.AhlosainCard("TWO OF PENTACLES", "", "2",ColinWielgaCards.AhlosainDeck),
    66: new ColinWielgaCards.AhlosainCard("THREE OF PENTACLES", "", "3",ColinWielgaCards.AhlosainDeck),
    67: new ColinWielgaCards.AhlosainCard("FOUR OF PENTACLES", "", "4",ColinWielgaCards.AhlosainDeck),
    68: new ColinWielgaCards.AhlosainCard("FIVE OF PENTACLES", "", "5",ColinWielgaCards.AhlosainDeck),
    69: new ColinWielgaCards.AhlosainCard("SIX OF PENTACLES", "", "6",ColinWielgaCards.AhlosainDeck),
    70: new ColinWielgaCards.AhlosainCard("SEVEN OF PENTACLES", "", "7",ColinWielgaCards.AhlosainDeck),
    71: new ColinWielgaCards.AhlosainCard("EIGHT OF PENTACLES", "", "8",ColinWielgaCards.AhlosainDeck),
    72: new ColinWielgaCards.AhlosainCard("NINE OF PENTACLES", "", "9",ColinWielgaCards.AhlosainDeck),
    73: new ColinWielgaCards.AhlosainCard("TEN OF PENTACLES", "", "10",ColinWielgaCards.AhlosainDeck),
    74: new ColinWielgaCards.AhlosainCard("PAGE OF PENTACLES", "", "11",ColinWielgaCards.AhlosainDeck),
    75: new ColinWielgaCards.AhlosainCard("KNIGHT OF PENTACLES", "", "12",ColinWielgaCards.AhlosainDeck),
    76: new ColinWielgaCards.AhlosainCard("QUEEN OF PENTACLES", "", "13",ColinWielgaCards.AhlosainDeck),
    77: new ColinWielgaCards.AhlosainCard("KING OF PENTACLES", "", "14",ColinWielgaCards.AhlosainDeck),

    100: new ColinWielgaCards.AhlosainCard("THE FOOL", "(scorn) show this card when you draw it, -2 to all roll while it is in your hand ","0",ColinWielgaCards.AhlosainDeck),
    101: new ColinWielgaCards.AhlosainCard("THE MAGICAIN", "(scorn) counts as a 0 if pass is 5 or higher","15",ColinWielgaCards.AhlosainDeck),
    102: new ColinWielgaCards.AhlosainCard("THE HIGH PRIESTESS", "(scorn) when you play this card leave it in front you. next time you would roll it is played again and then discarded","4",ColinWielgaCards.AhlosainDeck),
    103: new ColinWielgaCards.AhlosainCard("THE EMPRESS", "(scorn) critical failures count as normal failures","1",ColinWielgaCards.AhlosainDeck),
    104: new ColinWielgaCards.AhlosainCard("THE EMPEROR", "(scorn)  passes counts as failure with some gain","7",ColinWielgaCards.AhlosainDeck),
    105: new ColinWielgaCards.AhlosainCard("THE HIEROPHANT", "(scorn) , lose a fact if you fail","6",ColinWielgaCards.AhlosainDeck),
    106: new ColinWielgaCards.AhlosainCard("THE LOVERS", "(scorn) 0 if you are working with someone else","5",ColinWielgaCards.AhlosainDeck),
    107: new ColinWielgaCards.AhlosainCard("THE CHARIOT", "(scorn) play this before the roll","4",this),
    108: new ColinWielgaCards.AhlosainCard("STRENGTH", "(scorn) 6 if you are using a brute force appraoch","0",ColinWielgaCards.AhlosainDeck),
    109: new ColinWielgaCards.AhlosainCard("THE HERMIT", "(scorn) reveal this card when you draw it","2",ColinWielgaCards.AhlosainDeck),
    110: new ColinWielgaCards.AhlosainCard("WHEEL OF FORTUNE", "(scorn) top card of the deck -5","?",ColinWielgaCards.AhlosainDeck),
    111: new ColinWielgaCards.AhlosainCard("JUSTICE", "(scorn), when another player plays a card you may play this to replace that card, draw a card. if you can play this card you must","2",ColinWielgaCards.AhlosainDeck),
    112: new ColinWielgaCards.AhlosainCard("THE HANGED MAN", "(scorn) if you can play this card you must, failures count as critical failures","2",ColinWielgaCards.AhlosainDeck),
    113: new ColinWielgaCards.AhlosainCard("DEATH", "(scorn) 0, 5 if you choose to take a hit","0",ColinWielgaCards.AhlosainDeck),
    114: new ColinWielgaCards.AhlosainCard("TEMPERANCE", "(scorn) when you draw this card discard the rest of your hand then draw back up to 4","1",ColinWielgaCards.AhlosainDeck),
    115: new ColinWielgaCards.AhlosainCard("THE DEVIL", "(scorn) take -3 on your next roll","7",ColinWielgaCards.AhlosainDeck),
    116: new ColinWielgaCards.AhlosainCard("THE TOWER", "(scorn) you keep this card after playing it, each time you do it's value decrease by 2","8",ColinWielgaCards.AhlosainDeck),
    117: new ColinWielgaCards.AhlosainCard("THE STAR", "(scorn) reveal this card when you draw it","10",ColinWielgaCards.AhlosainDeck),
    118: new ColinWielgaCards.AhlosainCard("THE MOON", "(scorn) you may only play this card at night. discard it and draw another if you can't play any cards","7",ColinWielgaCards.AhlosainDeck),
    119: new ColinWielgaCards.AhlosainCard("THE SUN", "(scorn) you may only play this card during the day. discard it and draw another if you can't play any cards","7",ColinWielgaCards.AhlosainDeck),
    120: new ColinWielgaCards.AhlosainCard("JUDGEMENT", "(scorn) when you play this card place the remaining cards in your hand inorder faceup on the table. you must play them in that order","5",ColinWielgaCards.AhlosainDeck),
    121: new ColinWielgaCards.AhlosainCard("THE WORLD", "(scorn) you can't play this card. discard and draw another if you critically fail. discard it and draw another if you can't play any cards","",ColinWielgaCards.AhlosainDeck),

    200: new ColinWielgaCards.AhlosainCard("THE FOOL", "(blessing) 15 when doing something stupid","0",ColinWielgaCards.AhlosainDeck),
    201: new ColinWielgaCards.AhlosainCard("THE MAGICAIN", "(blessing) failure counts as a pass (and vice-versa), critical failure count as critical pass (and vice-versa)","0",ColinWielgaCards.AhlosainDeck),
    202: new ColinWielgaCards.AhlosainCard("THE HIGH PRIESTESS", "(blessing) you may discard this card to ask a favor of air-ah if she agress lose air-ahs blessing","10",ColinWielgaCards.AhlosainDeck),
    203: new ColinWielgaCards.AhlosainCard("THE EMPRESS", "(blessing) all failure outcome count as mixed or indeterminate","12",ColinWielgaCards.AhlosainDeck),
    204: new ColinWielgaCards.AhlosainCard("THE EMPEROR", "(blessing) all pass outcome count as critical passes","12",ColinWielgaCards.AhlosainDeck),
    205: new ColinWielgaCards.AhlosainCard("THE HIEROPHANT", "(blessing) gain a fact","12",ColinWielgaCards.AhlosainDeck),
    206: new ColinWielgaCards.AhlosainCard("THE LOVERS", "(blessing) 15 if you are acting to help another","10",ColinWielgaCards.AhlosainDeck),
    207: new ColinWielgaCards.AhlosainCard("THE CHARIOT", "(blessing) 15 if you are acting with violence or anger","10",ColinWielgaCards.AhlosainDeck),
    208: new ColinWielgaCards.AhlosainCard("STRENGTH", "(blessing) plus the last card played, the next card played gets +5","5",ColinWielgaCards.AhlosainDeck),
    209: new ColinWielgaCards.AhlosainCard("THE HERMIT", "(blessing) reveal this card when you draw it","2",ColinWielgaCards.AhlosainDeck),
    210: new ColinWielgaCards.AhlosainCard("WHEEL OF FORTUNE", "(blessing) top card of the deck","?",ColinWielgaCards.AhlosainDeck),
    211: new ColinWielgaCards.AhlosainCard("JUSTICE", "(blessing) draw three cards then discard 3 cards","10",ColinWielgaCards.AhlosainDeck),
    212: new ColinWielgaCards.AhlosainCard("THE HANGED MAN", "(blessing) if you can play this card you must","15",ColinWielgaCards.AhlosainDeck),
    213: new ColinWielgaCards.AhlosainCard("DEATH", "(blessing) heal two click if this roll results in a death","15",ColinWielgaCards.AhlosainDeck),
    214: new ColinWielgaCards.AhlosainCard("TEMPERANCE", "(blessing) draw 3 cards","6",ColinWielgaCards.AhlosainDeck),
    215: new ColinWielgaCards.AhlosainCard("THE DEVIL", "(blessing) 15 if you are acting selfishly","10",ColinWielgaCards.AhlosainDeck),
    216: new ColinWielgaCards.AhlosainCard("THE TOWER", "(blessing) you may keep this card after playing it, each time you do it's value increase by 3 if it's value is >=15 discard it","6",ColinWielgaCards.AhlosainDeck),
    217: new ColinWielgaCards.AhlosainCard("THE STAR", "(blessing) you may discard a card to keep this one in your hand after playing it","6",ColinWielgaCards.AhlosainDeck),
    218: new ColinWielgaCards.AhlosainCard("THE MOON", "(blessing) 15 if acting directly","10",ColinWielgaCards.AhlosainDeck),
    219: new ColinWielgaCards.AhlosainCard("THE SUN", "(blessing) 15 if acting deceptively","10",ColinWielgaCards.AhlosainDeck),
    220: new ColinWielgaCards.AhlosainCard("JUDGEMENT", "(blessing) or 15 and take a hit","12",ColinWielgaCards.AhlosainDeck),
    221: new ColinWielgaCards.AhlosainCard("THE WORLD", "(blessing) heal 2 clicks","13",ColinWielgaCards.AhlosainDeck),

    }


ColinWielgaCards.decklist.push(ColinWielgaCards.AhlosainDeck);


//Card.getCard = function (id) {
//    return ColinWielgaCards.AhlosDeck.allCards[id];
//}

//Card.deckSize = function () {
//    var count = 0;
//    for (var i in ColinWielgaCards.AhlosDeck.allCards) {
//        if (ColinWielgaCards.AhlosDeck.allCards.hasOwnProperty(i)) count++;
//    }
//    return count;
//}

//Card.draw = function (gods) {
//    // list of ids
//    var deck = [];

//    // add the standard cards
//    for (var i = 22; i <= 77; i++) {
//        deck.push(i);
//    }

//    // add the god cards 
//    // TODO this is a weird dependency 
//    // and it's breaking cards 
//    gods.forEach(function (god) {
//        deck.push(God.getCardId(god));
//    });


//    return deck[Math.floor(Math.random() * deck.length)];
//}
