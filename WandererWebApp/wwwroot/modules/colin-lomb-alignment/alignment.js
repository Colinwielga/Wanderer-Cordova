
ColinLombAlignment.alignment = function (name, powers, valuesource) {
    return {
        name: name,
        getNameText: function () {
            return powers[Math.floor(Math.random() * powers.length)];
        },
        getCard: function () {
            var nameText = this.getNameText();
            return ColinLombCards.Card(nameText, valuesource())
        }
    };
};

ColinLombAlignment.Standard = function () {

};

ColinLombAlignment.alignments = [
    ColinLombAlignment.alignment("Foolish", [
        "do something stupid"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Curious", [
        "perform an experiment",
        "see what happens"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Loyal", [
        "+3 when Helping an allie"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Lawful", [
        "+3 when acting according to procedure",
        "+3 when sticking to the script"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Selfish", [
        "Behind the parties back",
        "take something",
        "for me and me alone",
        "save your own skin"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Spiteful", [
        "+3 if no one benifits from your action",
        "+3 if you accept loss to hurt another",
        "+3 if your action is totally overkill",
        "+3 when hurting someone against whom you have held a grudge for some time"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Selfless", [
        "+3 when acting to help another"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Idealistic", [
        "preach",
        "talk about why",
        "hold your ground",
        "for the cause",
        "make a sacrifice"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Determined", [
        "Progress at any cost",
        "This time it's different",
        "declare intent", "when you draw this card say what you want to use it for"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Pragmatic", [
        "it will have to do",
        "Change of plan",
        "Hack it",
        "calculated loss"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Loving", [
        "protect someone",
        "make a sacrifice",
        "show affection",
        "work together"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Angry", [
        "escalate",
        "over react",
        "lose your cool",
        "blind rage",
        "smash something",
        "yell",
        "hurt someone"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Careful", [
        "take unnecessary precautions",
        "I planned it out",
        "We all agree",
        "defend",
        "abort",
        "slow and steady",
        "conserve or gain resource",
        "when you draw this card, draw a card, when you play this card discard a card"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Reckless", [
        "why waste time discussing",
        "+2 when using a resource",
        "when you play this flip a coin, on heads add +5 to the value of this card",
        "Couldn't resist -- you must play this card if it is in your hand, if two cards claim you must play them you can choose",
        "Just do it -- when you draw this, you may take an action it much be the first thing that pops in to your head",
        "I am let you finish but... -- + 3 if you play this card to preform and action before the DM has finished describing the scene",
        "when you draw this card, discard another card, when you play this card draw a card"
    ], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Emotional", [], ColinLombAlignment.Standard),
    ColinLombAlignment.alignment("Ambitious", [], ColinLombAlignment.Standard)
];



