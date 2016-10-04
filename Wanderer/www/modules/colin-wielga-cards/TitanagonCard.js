ColinWielgaCards.TitanagonCard = function (name, polyID, polyPoints, value, adjective, ability, deck) {
    this.deck = deck;
    this.id = function () {
        for (var prop in deck.allCards) {
            if (deck.allCards.hasOwnProperty(prop)) {
                var num = parseInt(prop);
                if (deck.allCards[num] === this) {
                    return num;
                }
            }
        }
        throw { message: "card not found" };
    }
    this.name = name;
    this.polyID = polyID;
    this.polyPoints = polyPoints;
    this.value = value;
    this.adjective = adjective;
    this.ability = ability;
    this.color = Math.floor(this.id / 56);
    this.getHtml = function () {
        //return "modules/colin-wielga-cards/card.html"
        return "modules/tote-hughes-titanagon-cards/card.html"
    }
};

ColinWielgaCards.decklist.push({
    name: "Ousichor Deck",
    allCards:
    {
        0: new TitanagonCard("The Ousichor", "0-0-0", "", "0", "vacuous", "unknown", this),

        1: new TitanagonCard("Sover", "3-0-0", "29,4 54,47.3 4,47.3", "1", "dictatorial", "unknown", this),
        2: new TitanagonCard("Tuck", "3-0-30", "29,4 54,47.3 4,47.3", "1", "focused", "If you take 1 hit, draw 1 card.", this),
        3: new TitanagonCard("Wamb", "3-0-60", "29,4 54,47.3 4,47.3", "1", "voyeuristic", "unknown", this),
        4: new TitanagonCard("Undiscovered", "3-0-90", "29,4 54,47.3 4,47.3", "1", "unknown", "unknown", this),

        5: new TitanagonCard("Verd", "4-0-0", "4,4 54,4 54,54 4,54", "2", "placid", "unknown", this),
        6: new TitanagonCard("Kyle", "4-0-30", "4,4 54,4 54,54 4,54", "2", "tantalized", "unknown", this),
        7: new TitanagonCard("Undiscovered", "4-0-60", "4,4 54,4 54,54 4,54", "2", "unknown", "unknown", this),

        8: new TitanagonCard("Undiscovered", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "unknown", "unknown", this),
        9: new TitanagonCard("Undiscovered", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "unknown", this),
        10: new TitanagonCard("Tobo", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "narcissistic", "unknown", this),
        11: new TitanagonCard("Undiscovered", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "unknown", this),
        12: new TitanagonCard("Undiscovered", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "Coin: Act again this round if heads, don't act in the next round if tails.", this),
        13: new TitanagonCard("Spack", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "disgruntled", "unknown", this),

        14: new TitanagonCard("Undiscovered", "4-2-0", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "unknown", this),
        15: new TitanagonCard("Undiscovered", "4-2-30", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "unknown", this),
        16: new TitanagonCard("Undiscovered", "4-2-60", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "+5 if you're working with someone else.", this),
        17: new TitanagonCard("Undiscovered", "4-2-90", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "unknown", this),
        18: new TitanagonCard("Undiscovered", "4-2-120", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "-5 if you can pass critically.", this),
        19: new TitanagonCard("Undiscovered", "4-2-150", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "+5 if you can pass critically.", this),

        20: new TitanagonCard("Undiscovered", "5-0-0", "4,4 54,4 97.3,29 54,54 4,54", "5", "unknown", "Take 1 hit if you fail.", this),
        21: new TitanagonCard("Undiscovered", "5-0-30", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", this),
        22: new TitanagonCard("Undiscovered", "5-0-60", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", this),
        23: new TitanagonCard("Undiscovered", "5-0-90", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Recover 1 hit if you fail.", this),
        24: new TitanagonCard("Undiscovered", "5-0-120", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Coin: Recover 1 hit if heads, take 1 hit if tails.", this),
        25: new TitanagonCard("Undiscovered", "5-0-150", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", this),
        26: new TitanagonCard("Undiscovered", "5-0-180", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", this),
        27: new TitanagonCard("Undiscovered", "5-0-210", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", this),
        28: new TitanagonCard("Undiscovered", "5-0-240", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", this),
        29: new TitanagonCard("Undiscovered", "5-0-270", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", this),
        30: new TitanagonCard("Undiscovered", "5-0-300", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", this),
        31: new TitanagonCard("Undiscovered", "5-0-330", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", this),

        32: new TitanagonCard("Thou", "6-0-0", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "8", "multiconscious", "unknown", this),
        33: new TitanagonCard("Undiscovered", "6-0-30", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "9", "unknown", "unknown", this),

        34: new TitanagonCard("Undiscovered", "6-1-0", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "unknown", this),
        35: new TitanagonCard("Undiscovered", "6-1-30", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "unknown", this),
        36: new TitanagonCard("Undiscovered", "6-1-60", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "Coin: All mixed results this round are passes if heads, all mixed results this round are failures if tails.", this),
        37: new TitanagonCard("Undiscovered", "6-1-90", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", this),
        38: new TitanagonCard("Undiscovered", "6-1-120", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", this),
        39: new TitanagonCard("Undiscovered", "6-1-150", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", this),

        40: new TitanagonCard("Undiscovered", "6-2-0", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "10", "unknown", "unknown", this),
        41: new TitanagonCard("Undiscovered", "6-2-30", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", this),
        42: new TitanagonCard("Undiscovered", "6-2-60", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", this),
        43: new TitanagonCard("Undiscovered", "6-2-90", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", this),

        44: new TitanagonCard("Undiscovered", "6-3-0", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "11", "unknown", "unknown", this),
        45: new TitanagonCard("Undiscovered", "6-3-30", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", this),
        46: new TitanagonCard("Undiscovered", "6-3-60", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", this),
        47: new TitanagonCard("Undiscovered", "6-3-90", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", this),
        48: new TitanagonCard("Undiscovered", "6-3-120", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "Discard: Pick someone else. Their next pass becomes mixed.", this),
        49: new TitanagonCard("Undiscovered", "6-3-150", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "13", "unknown", "You don't act in the next round if you pass.", this),

        50: new TitanagonCard("Undiscovered", "6-4-0", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Pick someone else. They don't act in the next round.", this),
        51: new TitanagonCard("Undiscovered", "6-4-30", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Pick 2 people. They each recover 1 hit.", this),
        52: new TitanagonCard("Undiscovered", "6-4-60", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Hold: +2 to cards you play while defending against a melee attack.", this),
        53: new TitanagonCard("Undiscovered", "6-4-90", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: +2 to cards you play while defending against a ranged attack.", this),
        54: new TitanagonCard("Undiscovered", "6-4-120", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: +2 to cards you play while attempting to lie.", this),
        55: new TitanagonCard("Undiscovered", "6-4-150", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: You're allowed to tell other players what you have in your hand.", this),

        //    Color: 1
        56: new TitanagonCard("The Ousichor", "0-0-0", "", "0", "vacuous", "unknown", this),

        57: new TitanagonCard("Sover", "3-0-0", "29,4 54,47.3 4,47.3", "1", "dictatorial", "unknown", this),
        58: new TitanagonCard("Tuck", "3-0-30", "29,4 54,47.3 4,47.3", "1", "focused", "unknown", this),
        59: new TitanagonCard("Wamb", "3-0-60", "29,4 54,47.3 4,47.3", "1", "voyeuristic", "unknown", this),
        60: new TitanagonCard("Undiscovered", "3-0-90", "29,4 54,47.3 4,47.3", "1", "unknown", "unknown", this),

        61: new TitanagonCard("Verd", "4-0-0", "4,4 54,4 54,54 4,54", "2", "placid", "unknown", this),
        62: new TitanagonCard("Kyle", "4-0-30", "4,4 54,4 54,54 4,54", "2", "tantalized", "unknown", this),
        63: new TitanagonCard("Undiscovered", "4-0-60", "4,4 54,4 54,54 4,54", "2", "unknown", "unknown", this),

        64: new TitanagonCard("Undiscovered", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "unknown", "unknown", this),
        65: new TitanagonCard("Undiscovered", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "unknown", this),
        66: new TitanagonCard("Tobo", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "narcissistic", "unknown", this),
        67: new TitanagonCard("Undiscovered", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "unknown", this),
        68: new TitanagonCard("Undiscovered", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "Coin: +4 if heads, -3 if tails.", this),
        69: new TitanagonCard("Spack", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "disgruntled", "unknown", this),

        70: new TitanagonCard("Undiscovered", "4-2-0", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "unknown", this),
        71: new TitanagonCard("Undiscovered", "4-2-30", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "unknown", this),
        72: new TitanagonCard("Undiscovered", "4-2-60", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "If you would take 1 hit, take 2 hits instead.", this),
        73: new TitanagonCard("Undiscovered", "4-2-90", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "unknown", this),
        74: new TitanagonCard("Undiscovered", "4-2-120", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "+5 if you can fail critically.", this),
        75: new TitanagonCard("Undiscovered", "4-2-150", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "-5 if you can fail critically.", this),

        76: new TitanagonCard("Undiscovered", "5-0-0", "4,4 54,4 97.3,29 54,54 4,54", "5", "unknown", "Mixed results count as passes.", this),
        77: new TitanagonCard("Undiscovered", "5-0-30", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", this),
        78: new TitanagonCard("Undiscovered", "5-0-60", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", this),
        79: new TitanagonCard("Undiscovered", "5-0-90", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Mixed results count as failures.", this),
        80: new TitanagonCard("Undiscovered", "5-0-120", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Coin: +8 if heads, -6 if tails.", this),
        81: new TitanagonCard("Undiscovered", "5-0-150", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", this),
        82: new TitanagonCard("Undiscovered", "5-0-180", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", this),
        83: new TitanagonCard("Undiscovered", "5-0-210", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", this),
        84: new TitanagonCard("Undiscovered", "5-0-240", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", this),
        85: new TitanagonCard("Undiscovered", "5-0-270", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", this),
        86: new TitanagonCard("Undiscovered", "5-0-300", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", this),
        87: new TitanagonCard("Undiscovered", "5-0-330", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", this),

        88: new TitanagonCard("Thou", "6-0-0", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "8", "multiconscious", "unknown", this),
        89: new TitanagonCard("Undiscovered", "6-0-30", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "9", "unknown", "unknown", this),

        90: new TitanagonCard("Undiscovered", "6-1-0", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "unknown", this),
        91: new TitanagonCard("Undiscovered", "6-1-30", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "-5 if you're working with someone else.", this),
        92: new TitanagonCard("Undiscovered", "6-1-60", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "Coin: all failures are passes if heads, all passes are failures if tails.", this),
        93: new TitanagonCard("Undiscovered", "6-1-90", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", this),
        94: new TitanagonCard("Undiscovered", "6-1-120", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", this),
        95: new TitanagonCard("Undiscovered", "6-1-150", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", this),

        96: new TitanagonCard("Undiscovered", "6-2-0", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "10", "unknown", "unknown", this),
        97: new TitanagonCard("Undiscovered", "6-2-30", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", this),
        98: new TitanagonCard("Undiscovered", "6-2-60", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", this),
        99: new TitanagonCard("Undiscovered", "6-2-90", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", this),

        100: new TitanagonCard("Undiscovered", "6-3-0", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "11", "unknown", "unknown", this),
        101: new TitanagonCard("Undiscovered", "6-3-30", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", this),
        102: new TitanagonCard("Undiscovered", "6-3-60", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", this),
        103: new TitanagonCard("Undiscovered", "6-3-90", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", this),
        104: new TitanagonCard("Undiscovered", "6-3-120", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "Discard: Pick someone else. They take 2 hits.", this),
        105: new TitanagonCard("Undiscovered", "6-3-150", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "13", "unknown", "Take 1 hit if you pass.", this),

        106: new TitanagonCard("Undiscovered", "6-4-0", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Pick someone else. +5 to their next card.", this),
        107: new TitanagonCard("Undiscovered", "6-4-30", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Pick 2 people. They each act again this round.", this),
        108: new TitanagonCard("Undiscovered", "6-4-60", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Hold: +2 to cards you play while attacking with a melee weapon.", this),
        109: new TitanagonCard("Undiscovered", "6-4-90", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: +2 to cards you play while attacking with a ranged weapon.", this),
        110: new TitanagonCard("Undiscovered", "6-4-120", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: +2 to cards you play while attempting to persuade.", this),
        111: new TitanagonCard("Undiscovered", "6-4-150", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: Whenever you play a card, one player of your choice may replace it with one of their cards.", this),

        //    Color: 2
        112: new TitanagonCard("The Ousichor", "0-0-0", "", "0", "vacuous", "unknown", this),

        113: new TitanagonCard("Sover", "3-0-0", "29,4 54,47.3 4,47.3", "1", "dictatorial", "unknown", this),
        114: new TitanagonCard("Tuck", "3-0-30", "29,4 54,47.3 4,47.3", "1", "focused", "You must play this card if you're able to.", this),
        115: new TitanagonCard("Wamb", "3-0-60", "29,4 54,47.3 4,47.3", "1", "voyeuristic", "Draw 2 cards.", this),
        116: new TitanagonCard("Undiscovered", "3-0-90", "29,4 54,47.3 4,47.3", "1", "unknown", "Draw 2 cards.", this),

        117: new TitanagonCard("Verd", "4-0-0", "4,4 54,4 54,54 4,54", "2", "placid", "Draw 2 cards.", this),
        118: new TitanagonCard("Kyle", "4-0-30", "4,4 54,4 54,54 4,54", "2", "tantalized", "When you draw this card, discard all of your cards except this card and one other card of your choice.", this),
        119: new TitanagonCard("Undiscovered", "4-0-60", "4,4 54,4 54,54 4,54", "2", "unknown", "unknown", this),

        120: new TitanagonCard("Undiscovered", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "unknown", "unknown", this),
        121: new TitanagonCard("Undiscovered", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "unknown", this),
        122: new TitanagonCard("Tobo", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "narcissistic", "unknown", this),
        123: new TitanagonCard("Undiscovered", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "When you draw this card, draw 1 card.", this),
        124: new TitanagonCard("Undiscovered", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "Coin: Gain 1 fact if heads, discard 1 card if tails.", this),
        125: new TitanagonCard("Spack", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "disgruntled", "If you would take 1 hit, lose 1 fact instead.", this),

        126: new TitanagonCard("Undiscovered", "4-2-0", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "Draw 1 card.", this),
        127: new TitanagonCard("Undiscovered", "4-2-30", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "Draw 1 card.", this),
        128: new TitanagonCard("Undiscovered", "4-2-60", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "Draw 1 card.", this),
        129: new TitanagonCard("Undiscovered", "4-2-90", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "Draw 1 card.", this),
        130: new TitanagonCard("Undiscovered", "4-2-120", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "unknown", this),
        131: new TitanagonCard("Undiscovered", "4-2-150", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "unknown", this),

        132: new TitanagonCard("Undiscovered", "5-0-0", "4,4 54,4 97.3,29 54,54 4,54", "5", "unknown", "unknown", this),
        133: new TitanagonCard("Undiscovered", "5-0-30", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", this),
        134: new TitanagonCard("Undiscovered", "5-0-60", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", this),
        135: new TitanagonCard("Undiscovered", "5-0-90", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Gain 1 fact if you fail.", this),
        136: new TitanagonCard("Undiscovered", "5-0-120", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Coin: Draw 2 cards if heads, discard 1 card if tails.", this),
        137: new TitanagonCard("Undiscovered", "5-0-150", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", this),
        138: new TitanagonCard("Undiscovered", "5-0-180", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", this),
        139: new TitanagonCard("Undiscovered", "5-0-210", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", this),
        140: new TitanagonCard("Undiscovered", "5-0-240", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "+5 if you're intoxicated.", this),
        141: new TitanagonCard("Undiscovered", "5-0-270", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", this),
        142: new TitanagonCard("Undiscovered", "5-0-300", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", this),
        143: new TitanagonCard("Undiscovered", "5-0-330", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "Lose 1 fact if you fail.", this),

        144: new TitanagonCard("Thou", "6-0-0", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "8", "multiconscious", "Discard 1 card.", this),
        145: new TitanagonCard("Undiscovered", "6-0-30", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "9", "unknown", "unknown", this),

        146: new TitanagonCard("Undiscovered", "6-1-0", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "nuknown", this),
        147: new TitanagonCard("Undiscovered", "6-1-30", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "unknown", this),
        148: new TitanagonCard("Undiscovered", "6-1-60", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "Coin: keep this card if heads, discard 1 card if tails.", this),
        149: new TitanagonCard("Undiscovered", "6-1-90", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", this),
        150: new TitanagonCard("Undiscovered", "6-1-120", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", this),
        151: new TitanagonCard("Undiscovered", "6-1-150", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", this),

        152: new TitanagonCard("Undiscovered", "6-2-0", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "10", "unknown", "Discard 1 card.", this),
        153: new TitanagonCard("Undiscovered", "6-2-30", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", this),
        154: new TitanagonCard("Undiscovered", "6-2-60", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", this),
        155: new TitanagonCard("Undiscovered", "6-2-90", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", this),

        156: new TitanagonCard("Undiscovered", "6-3-0", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "11", "unknown", "unknown", this),
        157: new TitanagonCard("Undiscovered", "6-3-30", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", this),
        158: new TitanagonCard("Undiscovered", "6-3-60", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", this),
        159: new TitanagonCard("Undiscovered", "6-3-90", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", this),
        160: new TitanagonCard("Undiscovered", "6-3-120", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "Discard: You're no longer part of the encounter.", this),
        161: new TitanagonCard("Undiscovered", "6-3-150", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "13", "unknown", "Discard 2 cards if you pass.", this),

        162: new TitanagonCard("Undiscovered", "6-4-0", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Pick someone else. They draw 3 cards.", this),
        163: new TitanagonCard("Undiscovered", "6-4-30", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Draw 4 cards.", this),
        164: new TitanagonCard("Undiscovered", "6-4-60", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Hold: Your passes and failures are critical.", this),
        165: new TitanagonCard("Undiscovered", "6-4-90", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: Each time someone flips a coin, you may let them reflip it.", this),
        166: new TitanagonCard("Undiscovered", "6-4-120", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: +1 to all of your cards.", this),
        157: new TitanagonCard("Undiscovered", "6-4-150", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: Each time you draw, draw two cards and discard one of them.", this),
    }
});

