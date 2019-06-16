var ToteFlosfulgurTepal = {};

ToteFlosfulgurTepal.tepal = function (label, name, corolla, luminosity, genus, school, text, prerequisites) {
    return {
        label: label,
        name: name,
        corolla: corolla,
        luminosity: luminosity,
        genus: genus,
        school: school,
        text: text,
        prerequisites: prerequisites,
        getHtml: function () {
            var html = "<ul>"
            for (var t of text) {
                html = html + "<li>" + t + "</li>";
            };
            html = html + "</ul>";
            return html;
        }
    };
};

ToteFlosfulgurTepal.tepals = [
    // Climb:
    ToteFlosfulgurTepal.tepal(
        "climb-0-0-0",
        "Climbing",
        "climb",
        0, 0, 0,
        ["<b>+1</b> when climbing things."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "climb-1-0-0",
        "Climbing",
        "climb",
        1, 0, 0,
        ["<b>+2</b> when climbing things."],
        [["climb-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "climb-2-0-0",
        "Climbing expertly",
        "climb",
        2, 0, 0,
        ["<b>+3</b> when climbing things.", "You feel a vague stickiness on typically smooth surfaces."],
        [["climb-1-0-0"]]
    ),
    // Jump:
    ToteFlosfulgurTepal.tepal(
        "jump-0-0-0",
        "Jumping",
        "jump",
        0, 0, 0,
        ["<b>+1</b> when jumping over or across things."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "jump-1-0-0",
        "Jumping",
        "jump",
        1, 0, 0,
        ["<b>+2</b> when jumping over or across things."],
        [["jump-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "jump-2-0-0",
        "Jumping expertly",
        "jump",
        2, 0, 0,
        ["<b>+3</b> when jumping over or across things.", "You feel a vague sense of boyancy when you're off the ground."],
        [["jump-1-0-0"]]
    ),
    // Contort
    ToteFlosfulgurTepal.tepal(
        "contort-0-0-0",
        "Contorting",
        "contort",
        0, 0, 0,
        ["<b>+1</b> when contorting or dancing."],
        [["climb-2-0-0"],["jump-2-0-0"],["jump-1-0-0", "climb-1-0-0"]]
    ),
    // Swing:
    ToteFlosfulgurTepal.tepal(
        "swing-0-0-0",
        "Swinging things",
        "swing",
        0, 0, 0,
        ["<b>+1</b> when swinging things."],
        []
    ),
    // Throw:
    ToteFlosfulgurTepal.tepal(
        "throw-0-0-0",
        "Throwing things",
        "throw",
        0, 0, 0,
        ["<b>+1</b> when throwing things."],
        []
    ),
    // Grapple:
    ToteFlosfulgurTepal.tepal(
        "grapple-0-0-0",
        "Grappling",
        "grapple",
        0, 0, 0,
        ["<b>+1</b> when holding, lifting, and wrestling things."],
        []
    ),
    // Sand:
    ToteFlosfulgurTepal.tepal(
        "sand-0-0-0",
        "Sand identifying",
        "sand",
        0, 0, 0,
        ["You can identify basic sand types and patterns."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "sand-1-0-0",
        "Sand identifying",
        "sand",
        1, 0, 0,
        ["You can identify most sand types and patterns.", "<b>+1</b> when sand is important."],
        [["sand-0-0-0"]]
    ),
    // Liquid:
    ToteFlosfulgurTepal.tepal(
        "liquid-0-0-0",
        "Dowsing",
        "liquid",
        0, 0, 0,
        [["You can identify basic liquid types."], ["You have a sense for where certain liquids might be located."]],
        []
    ),
    // Lightning:
    ToteFlosfulgurTepal.tepal(
        "lightning-0-0-0",
        "Lightning watching",
        "lightning",
        0, 0, 0,
        ["You can identify basic lightning variations and have a sense for predicting when and where it will strike."],
        []
    ),
    // Smell:
    ToteFlosfulgurTepal.tepal(
        "smell-0-0-0",
        "Smelling",
        "smell",
        0, 0, 0,
        ["<b>+1</b> when looking for or identifying things via smell."],
        []
    ),
]
