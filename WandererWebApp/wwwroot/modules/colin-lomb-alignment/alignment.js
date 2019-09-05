var ColinLombAlignment = {};

ColinLombAlignment.cardSource = function (power, valueSource) {
    return {
        power: power,
        valueSource: valueSource
    };
};

ColinLombAlignment.alignment = function (name, image, cards, maxWeight) {
    return {
        name: name,
        image: image,
        getCard: function () {
            var cardSource = cards[Math.floor(Math.random() * cards.length)];
            // we are reaching accross module here 😲
            // probably should not do it directly like this
            return ColinLombCards.Card(
                cardSource.power,
                cardSource.valueSource(),
                image);
        },
        maxWeight:maxWeight
    };
};

ColinLombAlignment.High = function () {
    return Math.floor(6 + (Math.random() * 15));
};

ColinLombAlignment.Standard = function () {
    return Math.floor(1+Math.random()*20);
};

ColinLombAlignment.Low = function () {
    return Math.floor(1+Math.random()*10);
};

ColinLombAlignment.alignments = [
    ColinLombAlignment.alignment(
        "Foolish","fool",
        [
            ColinLombAlignment.cardSource("do something stupid: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("don't think it through: +6", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Curious","curious",
        [
            ColinLombAlignment.cardSource("perform an experiment: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("see what happens: +6", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Loyal","loyal",
        [
            ColinLombAlignment.cardSource("Help an allie: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("Stand up for an allie: +6", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Lawful","lawful",
        [
            ColinLombAlignment.cardSource("act according to procedure: +3", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("keep your word: +3", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Selfish","selfish",
        [
            ColinLombAlignment.cardSource("act behind the parties back: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("take something: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("get out of a sticky situation: +6 ", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Spiteful","spiteful",
        [
            ColinLombAlignment.cardSource("accept loss to hurt another: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("totally overkill: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("take revenge: +6", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Selfless","selfless",
        [
            ColinLombAlignment.cardSource("help another: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("help a stranger: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("help someone who has wronged you: +8", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Idealistic","idealist",
        [
            ColinLombAlignment.cardSource("preach: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("stick with it: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("hold your ground: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("make a sacrifice: +8", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Determined","determined",
        [
            ColinLombAlignment.cardSource("progress at any cost: +3", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("continue when any reasonable person would turn back: +3", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("this time it's different: +3", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("when you draw this card show it and say what you want to use it for, if you use it for that +3", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Pragmatic","pragmatic",
        [
            ColinLombAlignment.cardSource("Change of plan: +3", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("Hack it: +3", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("calculated loss: +3", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Loving","caring",
        [
            ColinLombAlignment.cardSource("protect someone: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("make a sacrifice: +8", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("show affection: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("work together: +6", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Angry","angry",
        [
            ColinLombAlignment.cardSource("escalate: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("over react: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("lose your cool: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("blind rage: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("smash something: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("yell: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("hurt someone: +6", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Careful","careful",
        [
            ColinLombAlignment.cardSource("take unnecessary precautions: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("plan it out: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("everyone agrees: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("defend: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("tacticle retreat: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("slow and steady: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("conserve or gain resource: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("when you draw this card show it and say what you want to use it for, if you use it for that +6", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Reckless","reckless",
        [
            ColinLombAlignment.cardSource("why waste time discussing +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("use a resource: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("couln't resist: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("Just do it: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("when you play this flip a coin, on heads add +8 to the value of this card", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("you must play this card if it is in your hand, if two cards claim you must play them you can choose", ColinLombAlignment.High),
            ColinLombAlignment.cardSource("when you draw this, you may take a bonus action, it must be the first thing that pops in to your head", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("I am let you finish but... -- + 6 if you play this card to preform and action before the DM has finished describing the scene", ColinLombAlignment.Standard)],
        8),
    ColinLombAlignment.alignment(
        "Emotional","emotional",
        [
            ColinLombAlignment.cardSource("panic: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("rage: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("over react: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("show affection: +6", ColinLombAlignment.Standard),
            ColinLombAlignment.cardSource("don't hold it in: +6", ColinLombAlignment.Standard)],
        8)
];

// todo:
// Ambitious
// naive
// impulsive
// rational



