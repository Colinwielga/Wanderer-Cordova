var RELATION = {
    SCORN:'SCORN',
    INDIFFERANCE:'INDIFFERANCE',
    FAVOR:'FAVOR'
};

var God = function (name, sex, godOf, misc,relation, scorn, indifferance,favor) {
    this.name = name;
    this.sex = sex;
    this.godOf = godOf;
    this.misc = misc;
    this.relation = relation;
    this.cards = {
        'SCORN':scorn,
        'INDIFFERANCE':indifferance,
        'FAVOR':favor
    }
    this.indifferance = indifferance;
};

God.getCardId = function(god) {
    return god.cards[god.relation];
}

God.generateGods = function () {
    return [
        new God("I-mon", "male", "god of drink and recklessness", "", RELATION.INDIFFERANCE, 100, 0, 200),
        new God("Heck-ate", "female", "godness of suprises, windfalls", "", RELATION.INDIFFERANCE, 101, 1, 201),
        new God("air-ah", "female", "godess commitment", "sister of Ahmer daughter of sate", RELATION.INDIFFERANCE, 102, 2, 202),
        new God("Pessiah", "female", "godness of the sea", "lover of storms", RELATION.INDIFFERANCE, 103, 3, 203),
        new God("Zoos", "male", "god of stroms, the sky", "", RELATION.INDIFFERANCE, 104, 4, 204),
        new God("Kornos", "male", "god of time, decay", "", RELATION.INDIFFERANCE, 105, 5, 205),
        new God("Didis", "female", "godness of love, lust, sex", "hot, duh", RELATION.INDIFFERANCE, 106, 6, 206),
        new God("Air-ee", "male", "godness of war, the hunt", "", RELATION.INDIFFERANCE, 107, 7, 207),
        new God("Hepollo", "male", "god of industry, fire", "has a hammer for a hand", RELATION.INDIFFERANCE, 108, 8, 208),
        new God("Ameter", "male", "the earth, farmers", "", RELATION.INDIFFERANCE, 109, 9, 209),
        new God("yi", "", "god of the unknow, the depths, travelers, chance", "always depicted from a distance", RELATION.INDIFFERANCE, 110, 10, 210),
        new God("sate", "female", "godness of justice, fate", "", RELATION.INDIFFERANCE, 111, 11, 211),
        new God("who", "male", "god of pain", "", RELATION.INDIFFERANCE, 112, 12, 212),
        new God("Hades", "female", "godness of death, saddness", "", RELATION.INDIFFERANCE, 113, 13, 213),
        new God("Ya-mara", "female", "godness of reason, calm, selflessness", "", RELATION.INDIFFERANCE, 114, 14, 214),
        new God("sennen", "male", "god of anger, greed, selfishness", "", RELATION.INDIFFERANCE, 115, 15, 215),
        new God("Diondite", "male", "god civilzation, humans, the unnatural", "", RELATION.INDIFFERANCE, 116, 16, 216),
        new God("Hevaira", "female", "cycles, repeating decimals, stars (the mixing of darkness and light)", "child or order and chaos", RELATION.INDIFFERANCE, 117, 17, 217),
        new God("Armis", "female", "order, whole numbers, moon, darkness", "twin of choas, has a complex love hate relationship with choas, in general they are oppossed but they did have a bady together and work together to kill the first mother", RELATION.INDIFFERANCE, 118, 18, 218),
        new God("Ahlo", "male", "chaos, irrational numbers, sun, light", "", RELATION.INDIFFERANCE, 119, 19, 219),
        new God("Janus", "male", "god of choices, the two headed snake", "", RELATION.INDIFFERANCE, 120, 20, 220),
        new God("Oh", "female", "the first mother, creation, creativity, art", "gave birth to herself, all the gods, killed by <chaos>", RELATION.INDIFFERANCE, 121, 21, 221),
    ];
}