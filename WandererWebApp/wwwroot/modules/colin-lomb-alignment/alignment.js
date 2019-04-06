var ColinLombAlignment = {};

ColinLombAlignment.alignment = function (name, powers, valuesource, maxWeight) {
    return {
        name: name,
        getCard: function () {
            return ColinLombCards.Card(
                powers[Math.floor(Math.random() * powers.length)],
                valuesource());
        },
        maxWeight:maxWeight
    };
};

ColinLombAlignment.Standard = function () {
    return Math.floor(1+Math.random()*20);
};

ColinLombAlignment.Low = function () {
    return Math.floor(1+Math.random()*10);
};


ColinLombAlignment.alignments = [
    ColinLombAlignment.alignment(
        "Foolish", [
            "do something stupid: +3",
            "don't think it through: +3"
    ], ColinLombAlignment.Standard, 2),
    ColinLombAlignment.alignment("Curious", [
        "perform an experiment: +3",
        "see what happens: +3"
    ], ColinLombAlignment.Standard, 3),
    ColinLombAlignment.alignment("Loyal", [
        "Help an allie: +3",
        "Stand up for an allie: +3"
    ], ColinLombAlignment.Standard, 2),
    ColinLombAlignment.alignment("Lawful", [
        "act according to procedure: +3",
        "keep your word: +3"
    ], ColinLombAlignment.Standard, 2),
    ColinLombAlignment.alignment("Selfish", [
        "act behind the parties back: +3",
        "take something: +3",
        "get out of a sticky situation: +3 "
    ], ColinLombAlignment.Standard, 3),
    ColinLombAlignment.alignment("Spiteful", [
        "accept loss to hurt another: +3",
        "totally overkill: +3",
        "take revenge: +5"
    ], ColinLombAlignment.Standard, 3),
    ColinLombAlignment.alignment("Selfless", [
        "help another: +3",
        "help a stranger: +4",
        "help someone who has wronged you: +5"
    ], ColinLombAlignment.Standard, 3),
    ColinLombAlignment.alignment("Idealistic", [
        "preach: +3",
        "stick with it: +3",
        "hold your ground: +3",
        "make a sacrifice: +5"
    ], ColinLombAlignment.Standard, 4),
    ColinLombAlignment.alignment("Determined", [
        "progress at any cost: +3",
        "continue when any reasonable person would turn back: +3",
        "this time it's different: +3",
        "when you draw this card show it and say what you want to use it for, if you use it for that +3"
    ], ColinLombAlignment.Standard, 3),
    ColinLombAlignment.alignment("Pragmatic", [
        "Change of plan: +3",
        "Hack it: +3",
        "calculated loss: +3"
    ], ColinLombAlignment.Standard, 3),
    ColinLombAlignment.alignment("Loving", [
        "protect someone: +3",
        "make a sacrifice: +5",
        "show affection: +3",
        "work together: +3"
    ], ColinLombAlignment.Standard, 4),
    ColinLombAlignment.alignment("Angry", [
        "escalate: +3",
        "over react: +3",
        "lose your cool: +3",
        "blind rage: +3",
        "smash something: +3",
        "yell: +3",
        "hurt someone: +3"
    ], ColinLombAlignment.Standard, 7),
    ColinLombAlignment.alignment("Careful", [
        "take unnecessary precautions: +3",
        "plan it out: +3",
        "everyone agrees: +3",
        "defend: +3",
        "tacticle retreat: +3",
        "slow and steady: +3",
        "conserve or gain resource: +3",
        "when you draw this card show it and say what you want to use it for, if you use it for that +3"
    ], ColinLombAlignment.Standard, 7),
    ColinLombAlignment.alignment("Reckless", [
        "why waste time discussing",
        "use a resource: +3",
        "couln't resist: +3",
        "Just do it: +3",
        "when you play this flip a coin, on heads add +5 to the value of this card",
        "you must play this card if it is in your hand, if two cards claim you must play them you can choose",
        "when you draw this, you may take a bonus action it much be the first thing that pops in to your head",
        "I am let you finish but... -- + 3 if you play this card to preform and action before the DM has finished describing the scene",
    ], ColinLombAlignment.Standard, 8),
    ColinLombAlignment.alignment("Emotional", [
        "panic: +3",
        "rage: +3",
        "over react: +3",
        "show affection: +3",
        "don't hold it in: +3"
    ], ColinLombAlignment.Standard, 5)
];

// todo:
// Ambitious
// naive
// impulsive
// rational



