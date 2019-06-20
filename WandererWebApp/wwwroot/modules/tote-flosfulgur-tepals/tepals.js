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
        ["<b>+1</b> when swinging weapons and other objects."],
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
        "sand-0-1-0",
        "Sand intuiting",
        "sand",
        0, 0, 0,
        ["You can identify basic sand types and patterns."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "sand-1-1-0",
        "Sand identifying",
        "sand",
        1, 1, 0,
        ["<b>+2</b> when sand or granular material is important.", "You can identify most sand types and patterns."],
        [["sand-0-1-0"]]
    ),
    // Liquid:
    ToteFlosfulgurTepal.tepal(
        "liquid-0-2-0",
        "Dowsing",
        "liquid",
        0, 2, 0,
        ["You can identify basic liquid types.", "You have a sense for where certain liquids might be located."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "liquid-1-2-0",
        "Dowsing expertly",
        "liquid",
        1, 2, 0,
        ["<b>+2</b> when liquids are involved in an important way.", "You can identify most liquids.", "You have a sense for where certain liquids might be located."],
        [["liquid-0-2-0"]]
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
    ToteFlosfulgurTepal.tepal(
        "lightning-1-0-0",
        "Lightning observing",
        "lightning",
        1, 0, 0,
        ["<b>+2</b> when lightning is important.", "You can identify most lightning variations and can reliably predict when and where it will strike."],
        [["lightning-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "lightning-2-0-0",
        "Lightning obsessing",
        "lightning",
        2, 0, 0,
        ["<b>+3</b> when lightning is important.", "You can identify all lightning variations and can reliably predict when and where it will strike.", "It's remarked that lightning is more prevelant when you're around."],
        [["lightning-1-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "create-1-0-3",
        "Spark substantiating",
        "create-0-3",
        1, 0, 3,
        ["You can make sparks come out of your fingers.", "You believe that electricity is an emergent language of some fundamental complexity. You have some intuition for this language."],
        [["lightning-2-0-0"]]
    ),
    //nauscopy
    ToteFlosfulgurTepal.tepal(
        "nauscopy-1-0-1",
        "Nauscopic intuiting",
        "nauscopy",
        1, 0, 1,
        ["<b>+2</b> when noticing the movements of something behind a barrier.", "Air occasionally has an enigmatic color and texture."],
        [["lightning-1-0-0"]]
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
    // Hear:
    ToteFlosfulgurTepal.tepal(
        "hear-0-0-0",
        "Hearing",
        "hear",
        0, 0, 0,
        ["<b>+1</b> when looking for or identifying things via sound."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "hear-1-0-0",
        "Hearing expertly",
        "hear",
        1, 0, 0,
        ["<b>+2</b> when looking for or identifying things via sound.", "You have perfect pitch."],
        [["hear-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "hear-2-0-0",
        "Hearing masterfully",
        "hear",
        2, 0, 0,
        ["<b>+3</b> when looking for or identifying things via sound.", "You can hear sounds that others can't.", "You have perfect pitch."],
        [["hear-1-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "music-1-0-0",
        "Music making",
        "music",
        1, 0, 0,
        ["<b>+3</b> when music is important.", "You can play musical instruments."],
        [["hear-1-0-0"], ["hear-0-0-0", "hand-0-0-0"], ["hear-0-0-0", "speak-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "music-2-0-0",
        "Music making expertly",
        "music",
        2, 0, 0,
        ["<b>+4</b> when music is important.", "You can play musical instruments.", "You can be a professional musician or singer."],
        [["music-1-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "music-3-0-0",
        "Music making masterfully",
        "music",
        3, 0, 0,
        ["<b>+5</b> when music is important.", "You can play and invent musical instruments.", "You can be a professional musician.", "You can have followers."],
        [["music-2-0-0", "hear-1-0-0"], ["music-2-0-0", "hand-1-0-0"], ["music-2-0-0", "speak-1-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "create-1-0-2",
        "Sonic substantiating",
        "create-0-2",
        1, 0, 2,
        ["Occasionally sounds you create take on a life of their own."],
        [["music-3-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "create-2-0-2",
        "Sound-life birthing",
        "create-0-2",
        2, 0, 2,
        ["You can create small sound colonies.", "You have a sense that sound-life is somehow unifying."],
        [["create-1-0-2", "biology-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "create-3-0-2",
        "Sound-life rearing",
        "create-0-2",
        3, 0, 2,
        ["<b>+2</b> when helped by your colonies.", "You can create tiny to medium sound colonies.", "You're certain that sound-life is somehow unifying."],
        [["create-2-0-2"]]
    ),
    // Taste:
    ToteFlosfulgurTepal.tepal(
        "taste-0-0-0",
        "Tasting",
        "taste",
        0, 0, 0,
        ["<b>+1</b> when looking for or identifying things via taste."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "taste-1-0-0",
        "Tasting expertly",
        "taste",
        1, 0, 0,
        ["<b>+2</b> when looking for or identifying things via taste.", "You can quickly and safely identify poison with your tongue."],
        [["taste-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "cook-1-0-0",
        "Cooking",
        "cook",
        1, 0, 0,
        ["<b>+3</b> when food is involved in an important way."],
        [["taste-1-0-0"], ["taste-0-0-0", "smell-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "cook-2-0-0",
        "Cooking expertly",
        "cook",
        2, 0, 0,
        ["<b>+4</b> when food is involved in an important way.", "You can be a professional chef."],
        [["cook-1-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "cook-1-1-4",
        "Cooking narratively",
        "cook-1-4",
        1, 1, 4,
        ["You can convey simple messages through food you've made.", "You can have followers.", "You suspect that food contains narrative ingredients that are more important than their material counterparts."],
        [["cook-2-0-0", "story-1-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "cook-2-1-4",
        "Food communicating",
        "cook-1-4",
        2, 1, 4,
        ["You can convey complex messages through food you've made.", "You can have followers.", "You're certain that the narrative ingredients in food are only the tip of the iceberg lettuce."],
        [["cook-1-1-4"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "create-1-0-4",
        "Narrative substantiating",
        "create-0-4",
        1, 0, 4,
        ["<b>+2</b> when willing others to do things.", "Sometimes things you make up turn out to be real."],
        [["cook-2-1-4", "story-1-0-0"]]
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
    //rhetoric
    ToteFlosfulgurTepal.tepal(
        "speak-0-0-0",
        "Speaking",
        "speak",
        0, 0, 0,
        ["<b>+1</b> when making a verbal argument.", "It's often remarked that you have a pleasant voice."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "speak-1-0-0",
        "Speaking expertly",
        "speak",
        1, 0, 0,
        ["<b>+2</b> when making a verbal argument.", "It's often remarked that you have a beautiful voice.", "You can be a professional rhetorician.", "You suspect that there're new and deeply meaningful words hiding in the spaces between other words."],
        [["speak-0-0-0"]]
    ),
    //storytelling
    ToteFlosfulgurTepal.tepal(
        "story-1-0-0",
        "Storytelling",
        "story",
        1, 0, 0,
        ["<b>+3</b> when using a story to argue, entertain, or teach."],
        [["remember-0-0-0"], ["speak-0-0-0"]]
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
    // ToteFlosfulgurTepal.tepal(
    //     "realize-1-0-0",
    //     "Realizing significantly",
    //     "realize",
    //     1, 0, 0,
    //     ["You have some enigmatic help realizing how things are connected."],
    //     []
    // ),
    // Hand:
    ToteFlosfulgurTepal.tepal(
        "hand-0-0-0",
        "Manipulating",
        "hand",
        0, 0, 0,
        ["<b>+1</b> when handling objects."],
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
        ["<b>+2</b> when directly relating to animals, plants, or other biological systems.", "You have a good understanding of biological matters.", "You feel a vague pull toward living material."],
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
    // econ:
    ToteFlosfulgurTepal.tepal(
        "econ-0-0-0",
        "Economic intuiting",
        "econ",
        0, 0, 0,
        ["<b>+1</b> when trading or deal-making.", "You have a basic understanding of economic matters."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "econ-1-0-0",
        "Economic understanding",
        "econ",
        1, 0, 0,
        ["<b>+2</b> when trading or deal-making.", "You have a good understanding of economic matters", "You can start business enterprises."],
        [["econ-0-0-0"]]
    ),
    ToteFlosfulgurTepal.tepal(
        "econ-2-1-0",
        "Economic praying",
        "econ-1-0",
        2, 1, 0,
        ["<b>+3</b> when trading or deal-making with spiritual powers.", "You can start religious enterprises.", "You have a sense that currency's powers aren't strictly material."],
        [["econ-1-0-0", "religion-0-0-0"]]
    ),
    // religion:
    ToteFlosfulgurTepal.tepal(
        "religion-0-0-0",
        "Praying",
        "religion",
        0, 0, 0,
        ["<b>+1</b> when communing spiritually.", "You have a religious faith and a basic understanding of your religion's dogma.", "You feel guilty when your break any of your religion's tenants."],
        []
    ),
    ToteFlosfulgurTepal.tepal(
        "religion-1-0-0",
        "Praying devoutly",
        "religion",
        1, 0, 0,
        ["<b>+2</b> when communing spiritually.", "Spiritual forces occasionally give you helpful direction.", "You have a strong religious faith and a good understanding of your religion's dogma and intricacies.", "You feel physically ill when your break any of your religion's tenants."],
        [["religion-0-0-0"]]
    ),
]
