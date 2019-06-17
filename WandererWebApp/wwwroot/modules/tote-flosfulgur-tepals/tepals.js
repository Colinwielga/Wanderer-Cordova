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
        "Climbing expertly",
        "climb",
        1, 0, 0,
        ["<b>+2</b> when climbing things."],
        [["climb-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "climb-2-0-0",
        "Climbing masterfully",
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
        "Jumping expertly",
        "jump",
        1, 0, 0,
        ["<b>+2</b> when jumping over or across things."],
        [["jump-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "jump-2-0-0",
        "Jumping masterfully",
        "jump",
        2, 0, 0,
        ["<b>+3</b> when jumping over or across things.", "You feel a vague sense of boyancy when you're off the ground."],
        [["jump-1-0-0"]]
    ),
    // Contort
    ToteFlosfulgurTepal.tepal(
        "contort-1-0-0",
        "Contorting",
        "contort",
        1, 0, 0,
        ["<b>+2</b> when contorting or dancing."],
        [["climb-2-0-0"], ["jump-2-0-0"], ["jump-1-0-0", "climb-1-0-0"]]
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
    ToteFlosfulgurTepal.tepal(
        "slash-0-1-0",
        "Slashing violently",
        "slash",
        0, 1, 0,
        ["<b>+2</b> when fighting with a slashing weapon."],
        [["swing-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "stab-0-2-0",
        "Stabbing violently",
        "stab",
        0, 2, 0,
        ["<b>+2</b> when fighting with a piercing weapon."],
        [["swing-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "hit-0-3-0",
        "Bludgeoning violently",
        "hit",
        0, 3, 0,
        ["<b>+2</b> when fighting with a bludgeoning weapon."],
        [["swing-0-0-0"]]
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
    ToteFlosfulgurTepal.tepal(
        "shoot-0-1-0",
        "Shooting",
        "shoot",
        0, 1, 0,
        ["<b>+1</b> when fighting with a ranged weapon.", "You can use ranged weapons."],
        [["throw-0-0-0"], ["hand-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "shoot-1-1-0",
        "Shooting expertly",
        "shoot",
        1, 1, 0,
        ["<b>+1</b> when fighting with a ranged weapon.", "You may take two shots in a round.", "You can use ranged weapons."],
        [["shoot-0-1-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "shoot-2-1-0",
        "Shooting masterfully",
        "shoot",
        2, 1, 0,
        ["<b>+2</b> when fighting with a ranged weapon.", "You may take two shots in a round.", "You have a vague sense that you're not the only force guiding your shots.", "You can use ranged weapons."],
        [["shoot-1-1-0"]]
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
    ToteFlosfulgurTepal.tepal(
        "wrestle-0-1-0",
        "Wrestling",
        "wrestle",
        0, 1, 0,
        ["<b>+2</b> when grapple fighting."],
        [["grapple-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "wrestle-1-1-0",
        "Wrestling expertly",
        "wrestle",
        1, 1, 0,
        ["<b>+2</b> when grapple fighting.", "You may take two grapple fighting actions in a round."],
        [["wrestle-0-1-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "wrestle-2-1-0",
        "Wrestling masterfully",
        "wrestle",
        2, 1, 0,
        ["<b>+3</b> when grapple fighting.", "You may take two grapple fighting actions in a round.", "You find grapple fighting imbues you with a longlasting energy."],
        [["wrestle-1-1-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "martial-1-0-0",
        "Unarmed fighting",
        "martial",
        1, 0, 0,
        ["<b>+2</b> when fighting unarmed."],
        [["grapple-0-0-0", "swing-0-0-0"], ["wrestle-0-1-0"]]
    ),
    // Sand:
    ToteFlosfulgurTepal.tepal(
        "sand-0-0-0",
        "Sand intuiting",
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
        ["<b>+2</b> when sand or granular material is important.", "You can identify most sand types and patterns."],
        [["sand-0-0-0"]]
    ),
    // Liquid:
    ToteFlosfulgurTepal.tepal(
        "liquid-0-0-0",
        "Dowsing",
        "liquid",
        0, 0, 0,
        ["You can identify basic liquid types.", "You have a sense for where certain liquids might be located."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "liquid-1-0-0",
        "Dowsing expertly",
        "liquid",
        1, 0, 0,
        ["<b>+2</b> when liquids are involved in an important way.", "You can identify most liquid types.", "You have a sense for where certain liquids might be located."],
        [["liquid-0-0-0"]]
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
    // Remember:
    ToteFlosfulgurTepal.tepal(
        "remember-0-0-0",
        "Remembering",
        "remember",
        0, 0, 0,
        ["You have some enigmatic help remembering things."],
        []
    ),
    // Realize:
    ToteFlosfulgurTepal.tepal(
        "realize-0-0-0",
        "Realizing",
        "realize",
        0, 0, 0,
        ["You have some enigmatic help realizing how things are connected."],
        []
    ),
    // Hand:
    ToteFlosfulgurTepal.tepal(
        "hand-0-0-0",
        "Manipulating",
        "hand",
        0, 0, 0,
        ["<b>+1</b> when handling or aiming things."],
        []
    ),
    // focus:
    ToteFlosfulgurTepal.tepal(
        "focus-0-0-0",
        "Concentrating",
        "focus",
        0, 0, 0,
        ["<b>+1</b> when working under pressure."],
        []
    ),
    // biology:
    ToteFlosfulgurTepal.tepal(
        "biology-0-0-0",
        "Biological intuiting",
        "biology",
        0, 0, 0,
        ["<b>+1</b> when directly relating to animals, plants, or other biological systems.", "You have a basic understanding of biological matters."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "biology-1-0-0",
        "Biological understanding",
        "biology",
        1, 0, 0,
        ["<b>+2</b> when directly relating to animals, plants, or other biological systems.", "You have a good understanding of biological matters.", "You feel like a vague pull toward living material."],
        [["biology-0-0-0"]]
    ),
    // heal:
    ToteFlosfulgurTepal.tepal(
        "heal-0-0-0",
        "Caregiving",
        "heal",
        0, 0, 0,
        ["<b>+1</b> when helping an injured or sick person."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "heal-1-0-0",
        "Caregiving expertly",
        "heal",
        1, 0, 0,
        ["<b>+2</b> when helping an injured or sick person.", "You have a basic intuition for matters of health."],
        [["heal-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "heal-2-0-0",
        "Healing",
        "heal",
        2, 0, 0,
        ["<b>+3</b> when curing an injured or sick person.", "You have a good understanding of health.", "You have a sense that we're only living up to a fraction of our potential."],
        [["heal-1-0-0", "biology-0-0-0"], ["heal-1-0-0", "wrestling-1-1-0"]]
    ),
]
