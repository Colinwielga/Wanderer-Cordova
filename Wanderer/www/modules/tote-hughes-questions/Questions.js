var Questions = function(test) {
    this.test = test;
    return true;
}

Questions.QuestionTemplate = function (id, template, significance) {
    this.id = id;
    this.template = template;
    this.significance = significance;
}


Questions.QuestionTemplates = [
    // "!": don't include the article.
    // "@": use the plural word and exclude the article.
    new Questions.QuestionTemplate(1, "Why did you kill your %!family%?", 8),
//    new Questions.QuestionTemplate(17, "How did you kill your %@family%?", 4),
    new Questions.QuestionTemplate(2, "How were you betrayed by %person%?", 6),
    new Questions.QuestionTemplate(3, "When was the last time you saw your %!family%?", 4),
    new Questions.QuestionTemplate(4, "Why did you stop being %profession%?", 4),
    new Questions.QuestionTemplate(5, "Why did you suspect %profession% of a plot against %person%?", 0),
    new Questions.QuestionTemplate(6, "Why do you like %@animal% so much?", 0),
    new Questions.QuestionTemplate(7, "Why do you fear %@profession%?", 0),
    new Questions.QuestionTemplate(8, "Why do you desire such a quantity of %@item%?", 0),
    new Questions.QuestionTemplate(9, "Why did you burn down %place%?", 0),
    new Questions.QuestionTemplate(901, "What made you seek out %place% in your %!past%?", 0),
    new Questions.QuestionTemplate(10, "How did you escape from the %!profession%?", 0),
    new Questions.QuestionTemplate(11, "How did you lose the %!item% you cherished in your %!past%?", 0),
    new Questions.QuestionTemplate(12, "Why did your %!family% give you %item%?", 0),
    new Questions.QuestionTemplate(13, "After finding %item% in %place%, why did you give it to %profession%?", 0),
    new Questions.QuestionTemplate(14, "Why did you buy so much %@commodity% in your %!past%?", 0),
    new Questions.QuestionTemplate(15, "How did you become such an expert in %!concept%?", 0),
    new Questions.QuestionTemplate(16, "Who forced you to study %!subject% in your %!past%?", 0),
    new Questions.QuestionTemplate(18, "How did %person% hurt you?", 0),
    new Questions.QuestionTemplate(19, "Why did your %!family% tell you to stop consuming %!food%?", 0),
    new Questions.QuestionTemplate(20, "How did you survive the great %!event%?", 0),
    new Questions.QuestionTemplate(21, "How did you find out that %!food% makes you violently sick?", 0),
    new Questions.QuestionTemplate(22, "How did exploring %place% make you consider the concept of %!concept% more deeply?", 0),
    new Questions.QuestionTemplate(23, "When your %!family% died, why were you so happy to inherit their special %!item%?", 0),
    new Questions.QuestionTemplate(24, "How did %item% help you to make a major breakthrough in %!subject%?", 0),
    new Questions.QuestionTemplate(25, "What do you find so fascinating about %@profession%?", 0),
    new Questions.QuestionTemplate(26, "What lead you to travel to the center of the great %!event%?", 0),
    new Questions.QuestionTemplate(27, "What was your secret motive for befriending %person%?", 0),
    new Questions.QuestionTemplate(28, "Why can't you forget what your %!family% told you about %!concept%?", 0),
    new Questions.QuestionTemplate(29, "Why are you always so hesitant to enter %@place%?", 0),
    new Questions.QuestionTemplate(30, "What made you so sure the %!item% you found in the %!place% belonged to the %!person%?", 0),
    new Questions.QuestionTemplate(31, "What was the strange thing that %profession% did to cause you so much %!emotion%?", 0),
    new Questions.QuestionTemplate(32, "Why are you pursued by %person% with %item%?", 0),
    new Questions.QuestionTemplate(33, "What's your theory about %@person% and %!concept%?", 0),
    new Questions.QuestionTemplate(34, "Why don't you trust %@person% with %@item%?", 0),
    new Questions.QuestionTemplate(35, "Why do you feel %!emotion% when you're in %place%?", 0),
    new Questions.QuestionTemplate(36, "Why do %@profession% express %!emotion% when they see you?", 0),
]

Questions.QuestionField = function (word, wordPlural, article, categories) {
    this.word = word;
    this.wordPlural = wordPlural;
    this.article = article;
    this.categories = categories;
}

Questions.QuestionFields = [
    new Questions.QuestionField("grandparent", "grandparents", "a", ["family"]),
    new Questions.QuestionField("grandmother", "grandmothers", "a", ["family"]),
    new Questions.QuestionField("grandfather", "grandfathers", "a", ["family"]),
    new Questions.QuestionField("parent", "parents", "a", ["family"]),
    new Questions.QuestionField("mother", "mothers", "a", ["family"]),
    new Questions.QuestionField("father", "fathers", "a", ["family"]),
    new Questions.QuestionField("sibling", "siblings", "a", ["family"]),
    new Questions.QuestionField("sister", "sisters", "a", ["family"]),
    new Questions.QuestionField("brother", "brothers", "a", ["family"]),
    new Questions.QuestionField("child", "children", "a", ["family"]),
    new Questions.QuestionField("daughter", "daughters", "a", ["family"]),
    new Questions.QuestionField("son", "sons", "a", ["family"]),
    new Questions.QuestionField("spouse", "spouses", "a", ["family"]),
    new Questions.QuestionField("aunt", "aunts", "an", ["family"]),
    new Questions.QuestionField("uncle", "uncles", "a", ["family"]),
    new Questions.QuestionField("niece", "nieces", "a", ["family"]),
    new Questions.QuestionField("nephew", "nephews", "a", ["family"]),
    
    new Questions.QuestionField("king", "kings", "a", ["person"]),
    new Questions.QuestionField("queen", "queens", "a", ["person"]),
    new Questions.QuestionField("prince", "princes", "a", ["person"]),
    new Questions.QuestionField("princess", "princesses", "a", ["person"]),
    new Questions.QuestionField("lord", "lords", "a", ["person"]),
    new Questions.QuestionField("emperor", "emperors", "an", ["person"]),
    new Questions.QuestionField("aristocrat", "aristocrats", "an", ["person", "profession"]),
    new Questions.QuestionField("academic", "academics", "an", ["person", "profession"]),
    new Questions.QuestionField("professor", "professors", "a", ["person", "profession"]),
    new Questions.QuestionField("philosopher", "philosophers", "a", ["person", "profession"]),
    new Questions.QuestionField("translator", "translators", "a", ["person", "profession"]),
    new Questions.QuestionField("doctor", "doctors", "a", ["person", "profession"]),
    new Questions.QuestionField("surgeon", "surgeons", "a", ["person", "profession"]),
    new Questions.QuestionField("engineer", "engineers", "an", ["person", "profession"]),
    new Questions.QuestionField("accountant", "accountants", "an", ["person", "profession"]),
    new Questions.QuestionField("merchant", "merchants", "a", ["person", "profession"]),
    new Questions.QuestionField("capitalist", "capitalists", "a", ["person", "profession"]),
    new Questions.QuestionField("magnate", "magnates", "a", ["person", "profession"]),
    new Questions.QuestionField("grocer", "grocers", "a", ["person", "profession"]),
    new Questions.QuestionField("fisherman", "fishermen", "a", ["person", "profession"]),
    new Questions.QuestionField("hunter", "hunters", "a", ["person", "profession"]),
    new Questions.QuestionField("baker", "bakers", "a", ["person", "profession"]),
    new Questions.QuestionField("butcher", "butchers", "a", ["person", "profession"]),
    new Questions.QuestionField("sailor", "sailors", "a", ["person", "profession"]),
    new Questions.QuestionField("lawyer", "lawyers", "a", ["person", "profession"]),
    new Questions.QuestionField("soldier", "soldiers", "a", ["person", "profession"]),
    new Questions.QuestionField("spy", "spies", "a", ["person", "profession"]),
    new Questions.QuestionField("detective", "detectives", "a", ["person", "profession"]),
    new Questions.QuestionField("cook", "cooks", "a", ["person", "profession"]),
    new Questions.QuestionField("brewer", "brewers", "a", ["person", "profession"]),
    new Questions.QuestionField("explorer", "explorers", "an", ["person", "profession"]),
    new Questions.QuestionField("servant", "servants", "a", ["person", "profession"]),
    new Questions.QuestionField("maid", "maids", "a", ["person"]),
    new Questions.QuestionField("butler", "butlers", "a", ["person", "profession"]),
    new Questions.QuestionField("valet", "valets", "a", ["person", "profession"]),
    new Questions.QuestionField("secretary", "secretaries", "a", ["person", "profession"]),
    new Questions.QuestionField("clergyman", "clergymen", "a", ["person", "profession"]),
    new Questions.QuestionField("musician", "musicians", "a", ["person", "profession"]),
    new Questions.QuestionField("native", "natives", "a", ["person"]),
    new Questions.QuestionField("enemy", "enemies", "an", ["person"]),
    new Questions.QuestionField("rival", "rivals", "a", ["person"]),
    new Questions.QuestionField("vagabond", "vagabonds", "a", ["person"]),
    
    new Questions.QuestionField("bee", "bees", "a", ["animal"]),
    new Questions.QuestionField("sheep", "sheep", "a", ["animal"]),
    new Questions.QuestionField("goat", "goats", "a", ["animal"]),
    new Questions.QuestionField("horse", "horses", "a", ["animal", "food", "mount"]),
    new Questions.QuestionField("zebra", "zebras", "a", ["animal"]),
    new Questions.QuestionField("camel", "camels", "a", ["animal", "mount"]),
    new Questions.QuestionField("rhinoceros", "rhinoceroses", "a", ["animal", "mount"]),
    new Questions.QuestionField("elk", "elk", "a", ["animal", "mount"]),
    new Questions.QuestionField("deer", "deer", "a", ["animal"]),
    new Questions.QuestionField("caribou", "caribou", "a", ["animal"]),
    new Questions.QuestionField("elephant", "elephants", "an", ["animal", "mount"]),
    new Questions.QuestionField("crane", "cranes", "a", ["animal"]),
    new Questions.QuestionField("moth", "moths", "a", ["animal"]),
    new Questions.QuestionField("whale", "whales", "a", ["animal", "food"]),
    new Questions.QuestionField("dolphin", "dolphins", "a", ["animal"]),
    new Questions.QuestionField("clam", "clams", "a", ["animal"]),
    new Questions.QuestionField("oyster", "oysters", "a", ["animal"]),
    new Questions.QuestionField("fish", "fish", "a", ["animal", "food"]),
    new Questions.QuestionField("shark", "sharks", "a", ["animal"]),
    new Questions.QuestionField("shrimp", "shrimp", "a", ["animal", "food"]),
    new Questions.QuestionField("crab", "crabs", "a", ["animal", "food"]),
    new Questions.QuestionField("lobster", "lobsters", "a", ["animal", "food"]),
    new Questions.QuestionField("octopus", "octopodes", "a", ["animal", "food"]),
    
    new Questions.QuestionField("happiness", "happinesses", "a", ["concept", "emotion"]),
    new Questions.QuestionField("sorrow", "sorrows", "a", ["concept", "emotion"]),
    new Questions.QuestionField("confusion", "confusions", "a", ["concept", "emotion"]),
    new Questions.QuestionField("despair", "despairs", "a", ["concept", "emotion"]),
    new Questions.QuestionField("discomfort", "discomforts", "a", ["concept", "emotion"]),
    new Questions.QuestionField("suspicion", "suspicions", "a", ["concept", "emotion"]),
    new Questions.QuestionField("jealousy", "jealousies", "a", ["concept", "emotion"]),
    new Questions.QuestionField("passion", "passions", "a", ["concept", "emotion"]),
    new Questions.QuestionField("fear", "fears", "a", ["concept", "emotion"]),
    new Questions.QuestionField("death", "deaths", "a", ["concept", "subject", "event"]),
    new Questions.QuestionField("life", "lives", "a", ["concept"]),
    new Questions.QuestionField("birth", "births", "a", ["concept", "event"]),
    new Questions.QuestionField("rebirth", "rebirths", "a", ["concept", "event"]),
    new Questions.QuestionField("loss", "losses", "a", ["concept"]),
    new Questions.QuestionField("victory", "victories", "a", ["concept"]),
    new Questions.QuestionField("war", "wars", "a", ["concept", "subject", "event"]),
    new Questions.QuestionField("conspiracy", "conspiracies", "a", ["concept", "event"]),
    new Questions.QuestionField("rebellion", "rebellions", "a", ["concept", "event"]),
    new Questions.QuestionField("revolution", "revolutions", "a", ["concept", "event"]),
    new Questions.QuestionField("mathematics", "mathematics", "a", ["concept", "subject"]),
    new Questions.QuestionField("chemistry", "chemistry", "a", ["concept", "subject"]),
    new Questions.QuestionField("biology", "biology", "a", ["concept", "subject"]),
    new Questions.QuestionField("philosophy", "philosophy", "a", ["concept", "subject"]),
    new Questions.QuestionField("music", "music", "a", ["concept", "subject"]),
    new Questions.QuestionField("plague", "plagues", "a", ["concept", "event"]),
    new Questions.QuestionField("miasma", "miasmas", "a", ["concept", "event"]),
    new Questions.QuestionField("famine", "famines", "a", ["concept", "event"]),
    new Questions.QuestionField("migration", "migrations", "a", ["concept", "event"]),
    new Questions.QuestionField("self-determination", "self-determinations", "a", ["concept"]),
    new Questions.QuestionField("rice", "rice", "a", ["food"]),
    new Questions.QuestionField("beer", "beers", "a", ["food"]),
    new Questions.QuestionField("wine", "wines", "a", ["food"]),
    new Questions.QuestionField("pasta", "pastas", "a", ["food"]),
    new Questions.QuestionField("bread", "breads", "a", ["food"]),
    
    new Questions.QuestionField("compass", "compasses", "a", ["item", "tool"]),
    new Questions.QuestionField("ornate rug", "ornate rugs", "an", ["item"]),
    new Questions.QuestionField("watch", "watches", "a", ["item", "tool"]),
    new Questions.QuestionField("medicine", "medicines", "a", ["item"]),
    new Questions.QuestionField("lantern", "lanterns", "a", ["item"]),
    new Questions.QuestionField("wooden block puzzle", "wooden block puzzles", "a", ["item"]),
    new Questions.QuestionField("key", "keys", "a", ["item", "tool"]),
    new Questions.QuestionField("painting", "paintings", "a", ["item"]),
    new Questions.QuestionField("suit of armor", "suits of armor", "a", ["item"]),
    new Questions.QuestionField("rubber ball", "rubber balls", "a", ["item"]),
    new Questions.QuestionField("grain of wheat", "wheat", "a", ["item", "commodity"]),
    new Questions.QuestionField("grain of rice", "rice", "a", ["item", "commodity"]),
    new Questions.QuestionField("steel ingot", "steel", "a", ["item", "commodity"]),
    new Questions.QuestionField("iron ingot", "iron", "an", ["item", "commodity"]),
    new Questions.QuestionField("copper ingot", "copper", "a", ["item", "commodity"]),
    new Questions.QuestionField("gold bar", "gold", "a", ["item", "commodity"]),
    new Questions.QuestionField("piece of paper", "paper", "a", ["item", "commodity"]),
    new Questions.QuestionField("drop of honey", "honey", "a", ["item", "commodity"]),
    new Questions.QuestionField("treasure chest", "treasure chests", "a", ["item", "container"]),
    new Questions.QuestionField("shovel", "shovels", "a", ["item", "tool"]),
    new Questions.QuestionField("rope", "ropes", "a", ["item", "tool"]),
    new Questions.QuestionField("telescope", "telescopes", "a", ["item", "tool"]),
    new Questions.QuestionField("book", "books", "a", ["item", "tool"]),
    new Questions.QuestionField("ax", "axes", "an", ["item", "tool", "weapon"]),
    new Questions.QuestionField("pistol", "pistols", "a", ["item", "weapon"]),
    new Questions.QuestionField("knife", "knives", "a", ["item", "weapon"]),
    new Questions.QuestionField("sword", "swords", "a", ["item", "weapon"]),
    new Questions.QuestionField("flute", "flutes", "a", ["item", "instrument"]),
    new Questions.QuestionField("violin", "violins", "a", ["item", "instrument"]),
    new Questions.QuestionField("cello", "cellos", "a", ["item", "instrument"]),
    
    new Questions.QuestionField("field", "fields", "a", ["place"]),
    new Questions.QuestionField("city", "cities", "a", ["place"]),
    new Questions.QuestionField("town", "towns", "a", ["place"]),
    new Questions.QuestionField("library", "libraries", "a", ["place"]),
    new Questions.QuestionField("inn", "inns", "an", ["place"]),
    new Questions.QuestionField("hospital", "hospitals", "a", ["place"]),
    new Questions.QuestionField("tent", "tents", "a", ["place"]),
    new Questions.QuestionField("school", "schools", "a", ["place"]),
    new Questions.QuestionField("garden", "gardens", "a", ["place"]),
    new Questions.QuestionField("jail", "jails", "a", ["place"]),
    new Questions.QuestionField("prison", "prisons", "a", ["place"]),
    new Questions.QuestionField("castle", "castles", "a", ["place"]),
    new Questions.QuestionField("palace", "palaces", "a", ["place"]),
    new Questions.QuestionField("circus", "circuses", "a", ["place"]),
    new Questions.QuestionField("carnival", "carnivals", "a", ["place"]),
    new Questions.QuestionField("mine", "mines", "a", ["place"]),
    new Questions.QuestionField("ship", "ships", "a", ["place", "vehicle"]),
    new Questions.QuestionField("desert", "deserts", "a", ["place"]),
    new Questions.QuestionField("forest", "forests", "a", ["place"]),
    new Questions.QuestionField("cave", "caves", "a", ["place"]),
    
    new Questions.QuestionField("past", "pasts", "a", ["past"]),
    new Questions.QuestionField("prime", "primes", "a", ["past"]),
    new Questions.QuestionField("childhood", "childhoods", "a", ["past"]),
    new Questions.QuestionField("youth", "youths", "a", ["past", "person"]),
    new Questions.QuestionField("dream", "dreams", "a", ["past"]),
    new Questions.QuestionField("imagination", "fantasies", "an", ["past"]),
    new Questions.QuestionField("school days", "school days", "a", ["past"]),
]

Questions.getNewQuestion = function(forbiddenIDs) {
    // Get an unanswered question template:
    var possibleQuestionTemplates = [];
    for (var i = 0; i < Questions.QuestionTemplates.length; i++) {
        var allowed = (forbiddenIDs.indexOf(Questions.QuestionTemplates[i].id) == -1);
        if (allowed) {
            possibleQuestionTemplates.push(Questions.QuestionTemplates[i]);
        }
    }
    var choice = Math.floor(Math.random()*possibleQuestionTemplates.length);
    var qt = possibleQuestionTemplates[choice];
    
    // Fill question template fields:
    var ask = qt.template.replace(/%([!@]?\w+)%/g, function(match, capture){
        var allowArticle = true;
        var allowPlural = false;
        var category = capture
        if (capture.charAt(0) == "!") {
            allowArticle = false;
            category = capture.substring(1);
        }
        else if (capture.charAt(0) == "@") {
            allowArticle = false;
            allowPlural = true;
            category = capture.substring(1);
        }
        var allowedFields = [];
        for (var i = 0; i < Questions.QuestionFields.length; i++) {
            if (Questions.QuestionFields[i].categories.indexOf(category) !== -1) {
                allowedFields.push(Questions.QuestionFields[i]);
            }
        }
        var qf = allowedFields[Math.floor(Math.random()*allowedFields.length)];
        var phrase = "";
        if (allowArticle) {
            phrase += qf.article + " ";
        }
        if (allowPlural) {
            phrase += qf.wordPlural;
        }
        else {
            phrase += qf.word;
        }
        return phrase;
    });
    
    return {
        "id": qt.id,
        "ask": ask,
        "answer": "",
    };
}
