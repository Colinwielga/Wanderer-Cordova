var TitanagonCard = function (name, polyID, polyPoints, value, ability) {
    this.name = name;
    this.polyID = polyID;
    this.polyPoints = polyPoints;
    this.value = value;
    this.ability = ability;
    this.id = function () {
        for (var prop in TitanagonCard.map) {
            if (TitanagonCard.map.hasOwnProperty(prop)) {
                var num = parseInt(prop);
                if (TitanagonCard.map[num] === this) {
                    return num;
                }
            }
        }
        throw { message: "card not found" };
    }
};

TitanagonCard.map = {
    0: new TitanagonCard("The Ousichor", "0-0-0", "", "0", "vacuous"),
    
    1: new TitanagonCard("Sover", "3-0-0", "29,4 54,47.3 4,47.3", "1", "dictatorial"),
    2: new TitanagonCard("Tuck", "3-0-30", "29,4 54,47.3 4,47.3", "1", "focused"),
    3: new TitanagonCard("Wamb", "3-0-60", "29,4 54,47.3 4,47.3", "1", "voyeuristic"),
    4: new TitanagonCard("Undiscovered", "3-0-90", "29,4 54,47.3 4,47.3", "1", "unknown"),
    
    5: new TitanagonCard("Verd", "4-0-0", "4,4 54,4 54,54 4,54", "2", "placid"),
    6: new TitanagonCard("Kyle", "4-0-30", "4,4 54,4 54,54 4,54", "2", "tantalized"),
    7: new TitanagonCard("Undiscovered", "4-0-60", "4,4 54,4 54,54 4,54", "2", "unknown"),
    
    8: new TitanagonCard("Undiscovered", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "unknown"),
    9: new TitanagonCard("Undiscovered", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown"),
    10: new TitanagonCard("Tobo", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "narcissistic"),
    11: new TitanagonCard("Undiscovered", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown"),
    12: new TitanagonCard("Undiscovered", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "3", "unknown"),
    13: new TitanagonCard("Spack", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "disgruntled"),
    
    14: new TitanagonCard("Undiscovered", "4-2-0", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown"),
    15: new TitanagonCard("Undiscovered", "4-2-30", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown"),
    16: new TitanagonCard("Undiscovered", "4-2-60", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown"),
    17: new TitanagonCard("Undiscovered", "4-2-90", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown"),
    18: new TitanagonCard("Undiscovered", "4-2-120", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown"),
    19: new TitanagonCard("Undiscovered", "4-2-150", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown"),
    
    20: new TitanagonCard("Undiscovered", "5-0-0", "4,4 54,4 97.3,29 54,54 4,54", "5", "unknown"),
    21: new TitanagonCard("Undiscovered", "5-0-30", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    22: new TitanagonCard("Undiscovered", "5-0-60", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    23: new TitanagonCard("Undiscovered", "5-0-90", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    24: new TitanagonCard("Undiscovered", "5-0-120", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown"),
    25: new TitanagonCard("Undiscovered", "5-0-150", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    26: new TitanagonCard("Undiscovered", "5-0-180", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    27: new TitanagonCard("Undiscovered", "5-0-210", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    28: new TitanagonCard("Undiscovered", "5-0-240", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown"),
    29: new TitanagonCard("Undiscovered", "5-0-270", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown"),
    30: new TitanagonCard("Undiscovered", "5-0-300", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown"),
    31: new TitanagonCard("Undiscovered", "5-0-330", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown"),
    
    32: new TitanagonCard("Thou", "6-0-0", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "8", "multiconscious"),
    33: new TitanagonCard("Undiscovered", "6-0-30", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "9", "unknown"),
    
    34: new TitanagonCard("Undiscovered", "6-1-0", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown"),
    35: new TitanagonCard("Undiscovered", "6-1-30", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown"),
    36: new TitanagonCard("Undiscovered", "6-1-60", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown"),
    37: new TitanagonCard("Undiscovered", "6-1-90", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown"),
    38: new TitanagonCard("Undiscovered", "6-1-120", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown"),
    39: new TitanagonCard("Undiscovered", "6-1-150", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown"),
    
    40: new TitanagonCard("Undiscovered", "6-2-0", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "10", "unknown"),
    41: new TitanagonCard("Undiscovered", "6-2-30", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown"),
    42: new TitanagonCard("Undiscovered", "6-2-60", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown"),
    43: new TitanagonCard("Undiscovered", "6-2-90", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown"),
    
    44: new TitanagonCard("Undiscovered", "6-3-0", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "11", "unknown"),
    45: new TitanagonCard("Undiscovered", "6-3-30", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    46: new TitanagonCard("Undiscovered", "6-3-60", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    47: new TitanagonCard("Undiscovered", "6-3-90", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    48: new TitanagonCard("Undiscovered", "6-3-120", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown"),
    49: new TitanagonCard("Undiscovered", "6-3-150", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "13", "unknown"),
    
    50: new TitanagonCard("Undiscovered", "6-4-0", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown"),
    51: new TitanagonCard("Undiscovered", "6-4-30", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown"),
    52: new TitanagonCard("Undiscovered", "6-4-60", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown"),
    53: new TitanagonCard("Undiscovered", "6-4-90", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown"),
    54: new TitanagonCard("Undiscovered", "6-4-120", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown"),
    55: new TitanagonCard("Undiscovered", "6-4-150", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown"),
}

TitanagonCard.getCard = function (id) {
    return TitanagonCard.map[id];
}

TitanagonCard.deckSize = function () {
    var count = 0;
    for (var i in TitanagonCard.map) {
        if (TitanagonCard.map.hasOwnProperty(i)) count++;
    }
    return count;
}

TitanagonCard.draw = function () {
    // list of ids
    var deck = [];

    // add the standard cards
    for (var i = 0; i <= 55; i++) {
        deck.push(i);
    }

    return deck[Math.floor(Math.random() * deck.length)];
}
