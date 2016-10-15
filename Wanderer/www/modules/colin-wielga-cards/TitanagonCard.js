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
    this.color = function () {
        return Math.floor(this.id() / 56);
    }
    this.getHtml = function () {
        //return "modules/colin-wielga-cards/card.html"
        return "modules/colin-wielga-cards/TitanagonCard.html"
    }
};

ColinWielgaCards.OusichorDeck = {
    id: 1,
    name: "Ousichor Deck",
}

ColinWielgaCards.OusichorDeck.allCards=
{
    0: new ColinWielgaCards.TitanagonCard("The Ousichor", "0-0-0", "", "0", "vacuous", "unknown", ColinWielgaCards.OusichorDeck),

    1: new ColinWielgaCards.TitanagonCard("Sover", "3-0-0", "29,4 54,47.3 4,47.3", "1", "dictatorial", "unknown", ColinWielgaCards.OusichorDeck),
    2: new ColinWielgaCards.TitanagonCard("Tuck", "3-0-30", "29,4 54,47.3 4,47.3", "1", "focused", "If you take 1 hit, draw 1 card.", ColinWielgaCards.OusichorDeck),
    3: new ColinWielgaCards.TitanagonCard("Wamb", "3-0-60", "29,4 54,47.3 4,47.3", "1", "voyeuristic", "unknown", ColinWielgaCards.OusichorDeck),
    4: new ColinWielgaCards.TitanagonCard("Undiscovered", "3-0-90", "29,4 54,47.3 4,47.3", "1", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    5: new ColinWielgaCards.TitanagonCard("Verd", "4-0-0", "4,4 54,4 54,54 4,54", "2", "placid", "unknown", ColinWielgaCards.OusichorDeck),
    6: new ColinWielgaCards.TitanagonCard("Kyle", "4-0-30", "4,4 54,4 54,54 4,54", "2", "tantalized", "unknown", ColinWielgaCards.OusichorDeck),
    7: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-0-60", "4,4 54,4 54,54 4,54", "2", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    8: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    9: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    10: new ColinWielgaCards.TitanagonCard("Tobo", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "narcissistic", "unknown", ColinWielgaCards.OusichorDeck),
    11: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    12: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "Coin: Act again this round if heads, don't act in the next round if tails.", ColinWielgaCards.OusichorDeck),
    13: new ColinWielgaCards.TitanagonCard("Spack", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "disgruntled", "unknown", ColinWielgaCards.OusichorDeck),

    14: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-0", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    15: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-30", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    16: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-60", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "+5 if you're working with someone else.", ColinWielgaCards.OusichorDeck),
    17: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-90", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    18: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-120", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "-5 if you can pass critically.", ColinWielgaCards.OusichorDeck),
    19: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-150", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "+5 if you can pass critically.", ColinWielgaCards.OusichorDeck),

    20: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-0", "4,4 54,4 97.3,29 54,54 4,54", "5", "unknown", "Take 1 hit if you fail.", ColinWielgaCards.OusichorDeck),
    21: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-30", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    22: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-60", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    23: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-90", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Recover 1 hit if you fail.", ColinWielgaCards.OusichorDeck),
    24: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-120", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Coin: Recover 1 hit if heads, take 1 hit if tails.", ColinWielgaCards.OusichorDeck),
    25: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-150", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    26: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-180", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    27: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-210", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    28: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-240", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    29: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-270", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    30: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-300", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    31: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-330", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    32: new ColinWielgaCards.TitanagonCard("Thou", "6-0-0", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "8", "multiconscious", "unknown", ColinWielgaCards.OusichorDeck),
    33: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-0-30", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "9", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    34: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-0", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    35: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-30", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    36: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-60", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "Coin: All mixed results this round are passes if heads, all mixed results this round are failures if tails.", ColinWielgaCards.OusichorDeck),
    37: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-90", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    38: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-120", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    39: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-150", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    40: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-2-0", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "10", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    41: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-2-30", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    42: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-2-60", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    43: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-2-90", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    44: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-0", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "11", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    45: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-30", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    46: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-60", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    47: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-90", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    48: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-120", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "Discard: Pick someone else. Their next pass becomes mixed.", ColinWielgaCards.OusichorDeck),
    49: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-150", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "13", "unknown", "You don't act in the next round if you pass.", ColinWielgaCards.OusichorDeck),

    50: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-0", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Pick someone else. They don't act in the next round.", ColinWielgaCards.OusichorDeck),
    51: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-30", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Pick 2 people. They each recover 1 hit.", ColinWielgaCards.OusichorDeck),
    52: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-60", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Hold: +2 to cards you play while defending against a melee attack.", ColinWielgaCards.OusichorDeck),
    53: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-90", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: +2 to cards you play while defending against a ranged attack.", ColinWielgaCards.OusichorDeck),
    54: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-120", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: +2 to cards you play while attempting to lie.", ColinWielgaCards.OusichorDeck),
    55: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-150", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: You're allowed to tell other players what you have in your hand.", ColinWielgaCards.OusichorDeck),

    //    Color: 1
    56: new ColinWielgaCards.TitanagonCard("The Ousichor", "0-0-0", "", "0", "vacuous", "unknown", ColinWielgaCards.OusichorDeck),

    57: new ColinWielgaCards.TitanagonCard("Sover", "3-0-0", "29,4 54,47.3 4,47.3", "1", "dictatorial", "unknown", ColinWielgaCards.OusichorDeck),
    58: new ColinWielgaCards.TitanagonCard("Tuck", "3-0-30", "29,4 54,47.3 4,47.3", "1", "focused", "unknown", ColinWielgaCards.OusichorDeck),
    59: new ColinWielgaCards.TitanagonCard("Wamb", "3-0-60", "29,4 54,47.3 4,47.3", "1", "voyeuristic", "unknown", ColinWielgaCards.OusichorDeck),
    60: new ColinWielgaCards.TitanagonCard("Undiscovered", "3-0-90", "29,4 54,47.3 4,47.3", "1", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    61: new ColinWielgaCards.TitanagonCard("Verd", "4-0-0", "4,4 54,4 54,54 4,54", "2", "placid", "unknown", ColinWielgaCards.OusichorDeck),
    62: new ColinWielgaCards.TitanagonCard("Kyle", "4-0-30", "4,4 54,4 54,54 4,54", "2", "tantalized", "unknown", ColinWielgaCards.OusichorDeck),
    63: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-0-60", "4,4 54,4 54,54 4,54", "2", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    64: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    65: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    66: new ColinWielgaCards.TitanagonCard("Tobo", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "narcissistic", "unknown", ColinWielgaCards.OusichorDeck),
    67: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    68: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "Coin: +4 if heads, -3 if tails.", ColinWielgaCards.OusichorDeck),
    69: new ColinWielgaCards.TitanagonCard("Spack", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "disgruntled", "unknown", ColinWielgaCards.OusichorDeck),

    70: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-0", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    71: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-30", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    72: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-60", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "If you would take 1 hit, take 2 hits instead.", ColinWielgaCards.OusichorDeck),
    73: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-90", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    74: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-120", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "+5 if you can fail critically.", ColinWielgaCards.OusichorDeck),
    75: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-150", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "-5 if you can fail critically.", ColinWielgaCards.OusichorDeck),

    76: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-0", "4,4 54,4 97.3,29 54,54 4,54", "5", "unknown", "Mixed results count as passes.", ColinWielgaCards.OusichorDeck),
    77: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-30", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    78: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-60", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    79: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-90", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Mixed results count as failures.", ColinWielgaCards.OusichorDeck),
    80: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-120", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Coin: +8 if heads, -6 if tails.", ColinWielgaCards.OusichorDeck),
    81: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-150", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    82: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-180", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    83: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-210", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    84: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-240", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    85: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-270", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    86: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-300", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    87: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-330", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    88: new ColinWielgaCards.TitanagonCard("Thou", "6-0-0", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "8", "multiconscious", "unknown", ColinWielgaCards.OusichorDeck),
    89: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-0-30", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "9", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    90: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-0", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    91: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-30", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "-5 if you're working with someone else.", ColinWielgaCards.OusichorDeck),
    92: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-60", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "Coin: all failures are passes if heads, all passes are failures if tails.", ColinWielgaCards.OusichorDeck),
    93: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-90", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    94: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-120", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    95: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-150", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    96: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-2-0", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "10", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    97: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-2-30", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    98: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-2-60", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    99: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-2-90", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    100: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-0", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "11", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    101: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-30", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    102: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-60", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    103: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-90", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    104: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-120", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "Discard: Pick someone else. They take 2 hits.", ColinWielgaCards.OusichorDeck),
    105: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-150", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "13", "unknown", "Take 1 hit if you pass.", ColinWielgaCards.OusichorDeck),

    106: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-0", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Pick someone else. +5 to their next card.", ColinWielgaCards.OusichorDeck),
    107: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-30", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Pick 2 people. They each act again this round.", ColinWielgaCards.OusichorDeck),
    108: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-60", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Hold: +2 to cards you play while attacking with a melee weapon.", ColinWielgaCards.OusichorDeck),
    109: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-90", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: +2 to cards you play while attacking with a ranged weapon.", ColinWielgaCards.OusichorDeck),
    110: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-120", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: +2 to cards you play while attempting to persuade.", ColinWielgaCards.OusichorDeck),
    111: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-150", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: Whenever you play a card, one player of your choice may replace it with one of their cards.", ColinWielgaCards.OusichorDeck),

    //    Color: 2
    112: new ColinWielgaCards.TitanagonCard("The Ousichor", "0-0-0", "", "0", "vacuous", "unknown", ColinWielgaCards.OusichorDeck),

    113: new ColinWielgaCards.TitanagonCard("Sover", "3-0-0", "29,4 54,47.3 4,47.3", "1", "dictatorial", "unknown", ColinWielgaCards.OusichorDeck),
    114: new ColinWielgaCards.TitanagonCard("Tuck", "3-0-30", "29,4 54,47.3 4,47.3", "1", "focused", "You must play this card if you're able to.", ColinWielgaCards.OusichorDeck),
    115: new ColinWielgaCards.TitanagonCard("Wamb", "3-0-60", "29,4 54,47.3 4,47.3", "1", "voyeuristic", "Draw 2 cards.", ColinWielgaCards.OusichorDeck),
    116: new ColinWielgaCards.TitanagonCard("Undiscovered", "3-0-90", "29,4 54,47.3 4,47.3", "1", "unknown", "Draw 2 cards.", ColinWielgaCards.OusichorDeck),

    117: new ColinWielgaCards.TitanagonCard("Verd", "4-0-0", "4,4 54,4 54,54 4,54", "2", "placid", "Draw 2 cards.", ColinWielgaCards.OusichorDeck),
    118: new ColinWielgaCards.TitanagonCard("Kyle", "4-0-30", "4,4 54,4 54,54 4,54", "2", "tantalized", "When you draw this card, discard all of your cards except this card and one other card of your choice.", this),
    119: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-0-60", "4,4 54,4 54,54 4,54", "2", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    120: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    121: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    122: new ColinWielgaCards.TitanagonCard("Tobo", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "narcissistic", "unknown", ColinWielgaCards.OusichorDeck),
    123: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "When you draw this card, draw 1 card.", ColinWielgaCards.OusichorDeck),
    124: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown", "Coin: Gain 1 fact if heads, discard 1 card if tails.", ColinWielgaCards.OusichorDeck),
    125: new ColinWielgaCards.TitanagonCard("Spack", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "disgruntled", "If you would take 1 hit, lose 1 fact instead.", ColinWielgaCards.OusichorDeck),

    126: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-0", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "Draw 1 card.", ColinWielgaCards.OusichorDeck),
    127: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-30", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "Draw 1 card.", ColinWielgaCards.OusichorDeck),
    128: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-60", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "Draw 1 card.", ColinWielgaCards.OusichorDeck),
    129: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-90", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "Draw 1 card.", ColinWielgaCards.OusichorDeck),
    130: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-120", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    131: new ColinWielgaCards.TitanagonCard("Undiscovered", "4-2-150", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    132: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-0", "4,4 54,4 97.3,29 54,54 4,54", "5", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    133: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-30", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    134: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-60", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    135: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-90", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Gain 1 fact if you fail.", ColinWielgaCards.OusichorDeck),
    136: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-120", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Coin: Draw 2 cards if heads, discard 1 card if tails.", ColinWielgaCards.OusichorDeck),
    137: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-150", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    138: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-180", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    139: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-210", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    140: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-240", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "+5 if you're intoxicated.", ColinWielgaCards.OusichorDeck),
    141: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-270", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    142: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-300", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    143: new ColinWielgaCards.TitanagonCard("Undiscovered", "5-0-330", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "Lose 1 fact if you fail.", ColinWielgaCards.OusichorDeck),

    144: new ColinWielgaCards.TitanagonCard("Thou", "6-0-0", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "8", "multiconscious", "Discard 1 card.", ColinWielgaCards.OusichorDeck),
    145: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-0-30", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "9", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    146: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-0", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "nuknown", ColinWielgaCards.OusichorDeck),
    147: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-30", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    148: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-60", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "Coin: keep this card if heads, discard 1 card if tails.", ColinWielgaCards.OusichorDeck),
    149: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-90", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    150: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-120", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    151: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-1-150", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    152: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-2-0", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "10", "unknown", "Discard 1 card.", ColinWielgaCards.OusichorDeck),
    153: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-2-30", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    154: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-2-60", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    155: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-2-90", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", ColinWielgaCards.OusichorDeck),

    156: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-0", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "11", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    157: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-30", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    158: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-60", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    159: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-90", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", ColinWielgaCards.OusichorDeck),
    160: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-120", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "Discard: You're no longer part of the encounter.", ColinWielgaCards.OusichorDeck),
    161: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-3-150", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "13", "unknown", "Discard 2 cards if you pass.", ColinWielgaCards.OusichorDeck),

    162: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-0", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Pick someone else. They draw 3 cards.", ColinWielgaCards.OusichorDeck),
    163: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-30", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Draw 4 cards.", ColinWielgaCards.OusichorDeck),
    164: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-60", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Hold: Your passes and failures are critical.", ColinWielgaCards.OusichorDeck),
    165: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-90", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: Each time someone flips a coin, you may let them reflip it.", ColinWielgaCards.OusichorDeck),
    166: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-120", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: +1 to all of your cards.", ColinWielgaCards.OusichorDeck),
    157: new ColinWielgaCards.TitanagonCard("Undiscovered", "6-4-150", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: Each time you draw, draw two cards and discard one of them.", ColinWielgaCards.OusichorDeck),
    }

ColinWielgaCards.decklist.push(ColinWielgaCards.OusichorDeck);

