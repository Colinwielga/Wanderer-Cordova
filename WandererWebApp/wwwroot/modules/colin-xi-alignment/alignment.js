
ColinXiAlignment.alignment = function (name, powers, valuesource, image) {
    return {
        name: name,
        getNameText: function () {
            return powers[Math.floor(Math.random() * powers.length)];
        },
        getCard: function () {
            var nameText = this.getNameText();
            return ColinXiCards.Card(nameText, valuesource(), image)
        }
    };
};


ColinXiAlignment.alignments = [
    ColinXiAlignment.alignment("Foolish", [
        "do something stupid",
    ],,),
    ColinXiAlignment.alignment("Curious", [
        "perform an experiment",
    ],,),
    ColinXiAlignment.alignment("Loyal", [
        "+3 when Helping an allie",
    ],,),
    ColinXiAlignment.alignment("Lawful", [
        "+3 when acting according to procedure",
        "+3 when sticking to the script",
    ],,),
    ColinXiAlignment.alignment("Selfish", [
        "Behind the parties back",
        "take something",
        "for me and me alone",
        "save your own skin",
    ],,),
    ColinXiAlignment.alignment("Spiteful", [
        "+3 if no one benifits from your action",
        "+3 if you accept loss to hurt another",
        "+3 if your action is totally overkill",
        "+3 when hurting someone against whom you have held a grudge for some time",
    ], ,),
    ColinXiAlignment.alignment("Selfless", [
        "+3 when acting to help another",
    ],,),
    ColinXiAlignment.alignment("Idealistic", [
        "preach",
        "talk about why",
        "hold your ground",
        "for the cause",
        "make a sacrifice",
    ], ,),
    ColinXiAlignment.alignment("Determined", [
        "Progress at any cost",
        "This time it's different",
        "declare intent","when you draw this card say what you want to use it for",
    ], ,),
    ColinXiAlignment.alignment("Pragmatic", [
        "it will have to do",
        "Change of plan",
        "Hack it",
        "calculated loss"
    ],,),
    ColinXiAlignment.alignment("Loving", [
        "protect someone",
        "make a sacrifice",
        "show affection",
        "work together",
    ],,),
    ColinXiAlignment.alignment("Angry", [
        "escalate",
        "over react",
        "lose your cool",
        "blind rage",
        "smash something",
        "yell",
        "hurt someone",
    ], ,),
    ColinXiAlignment.alignment("Careful", [
        "take unnecessary precautions",
        "I planned it out",
        "We all agree",
        "defend",
        "abort",
        "slow and steady",
        "conserve or gain resource",
        "when you draw this card, draw a card, when you play this card discard a card",
    ], ,),
    ColinXiAlignment.alignment("Reckless", [
        "why waste time discussing",
        "+2 when using a resource",
        "when you play this flip a coin, on heads add +5 to the value of this card",
        "Couldn't resist -- you must play this card if it is in your hand, if two cards claim you must play them you can choose",
        "Just do it -- when you draw this, you may take an action it much be the first thing that pops in to your head",
        "when you draw this card, discard another card, when you play this card draw a card",
    ], ,),
    ColinXiAlignment.alignment("Emotional", [], ,),
    ColinXiAlignment.alignment("Ambishus", [], ,),
]

