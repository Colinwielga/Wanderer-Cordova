var ScottLeviNpcGen = {};

ScottLeviNpcGen.component = function () {

    this.getId = function () {
        return "scott-levi-npc-gen"
    }

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator
        this.Dependencies = dependencies
    }

    this.animal = "";
    this.secretSociety = "";
    this.genre = "";
    this.color = "";
    this.firstName = "";
    this.lastName = "";

    this.randomFromList = function (list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    this.gen = function () {
        var animals = [
            { name: 'alligator', attrs: ['survival', 'stealth'] },
            { name: 'ant', attrs: ['teamwork', 'organization', 'community'] },
            { name: 'antelope', attrs: ['speed', 'grace'] },
            { name: 'armadillo', attrs: ['protection', 'safety'] },
            { name: 'badger', attrs: ['tenacity', 'stubbornness'] },
            { name: 'bat', attrs: ['nocturnal', 'intuition'] },
            { name: 'bear', attrs: ['strength', 'introspection', 'problem-solving'] },
            { name: 'beaver', attrs: ['building', 'shaping'] },
            { name: 'bee', attrs: ['service', 'gathering', 'community'] },
            { name: 'bird', attrs: ['unity', 'freedom'] },
            { name: 'buffalo', attrs: ['abundance', 'healing', 'good fortune'] },
            { name: 'butterfly', attrs: ['transformation', 'balance'] },
            { name: 'caribou', attrs: ['travel', 'mobility'] },
            { name: 'coyote', attrs: ['humor', 'tricky', 'reversal of fortune'] },
            { name: 'crane', attrs: ['rarity', 'majesty'] },
            { name: 'crow', attrs: ['council', 'wisdom', 'resourcefulness'] },
            { name: 'deer', attrs: ['gentle', 'sensitive', 'peaceful'] },
            { name: 'dog', attrs: ['loyalty', 'companionship'] },
            { name: 'dolphin', attrs: ['joy', 'harmony', 'awareness'] },
            { name: 'dragonfly', attrs: ['skill', 'refinement', 'relentless'] },
            { name: 'eagle', attrs: ['potency', 'healing', 'flight'] },
            { name: 'elk', attrs: ['pride', 'power'] },
            { name: 'feather', attrs: ['counting coup', 'spirit'] },
            { name: 'firefly', attrs: ['illumination', 'fluorescent'] },
            { name: 'fish', attrs: ['survival', 'swim'] },
            { name: 'fox', attrs: ['clever', 'subtle', 'discrete'] },
            { name: 'frog', attrs: ['cleansing', 'emotional healing'] },
            { name: 'goat', attrs: ['tenacity', 'diligence'] },
            { name: 'goose', attrs: ['safe return', 'love of home'] },
            { name: 'hawk', attrs: ['awareness', 'truth'] },
            { name: 'hedgehog', attrs: ['self-preservation', 'soft-side'] },
            { name: 'horse', attrs: ['freedom', 'power', 'easy movement'] },
            { name: 'hummingbird', attrs: ['wonder', 'agility', 'perception'] },
            { name: 'kangaroo', attrs: ['balance', 'toughness'] },
            { name: 'kokopelli', attrs: ['joy', 'fertility', 'agriculture'] },
            { name: 'ladybug', attrs: ['delight', 'trust'] },
            { name: 'lizard', attrs: ['letting go', 'elusiveness'] },
            { name: 'loon', attrs: ['communication', 'serenity'] },
            { name: 'moose', attrs: ['unpredictable', 'spontaneity', 'tranquility'] },
            { name: 'mouse', attrs: ['illusion', 'charm'] },
            { name: 'otter', attrs: ['laughter', 'playful'] },
            { name: 'owl', attrs: ['wisdom', 'vision', 'insight'] },
            { name: 'panther', attrs: ['hunter', 'nocturnal'] },
            { name: 'peacock', attrs: ['recognition', 'confidence'] },
            { name: 'parrot', attrs: ['mimic', 'flight'] },
            { name: 'pelican', attrs: ['abundance', 'aloof'] },
            { name: 'pheasant', attrs: ['warning', 'concealment'] },
            { name: 'porcupine', attrs: ['innocence', 'humility'] },
            { name: 'quail', attrs: ['protective', 'harmonize'] },
            { name: 'rabbit', attrs: ['unafraid', 'safety'] },
            { name: 'raccoon', attrs: ['curiosity', 'dextrous'] },
            { name: 'ram', attrs: ['strength', 'determination'] },
            { name: 'raven', attrs: ['mystery', 'exploration'] },
            { name: 'roadrunner', attrs: ['speed', 'agility', 'untrackable'] },
            { name: 'salmon', attrs: ['determination', 'tradition'] },
            { name: 'sandpiper', attrs: ['quickness', 'foraging'] },
            { name: 'scorpion', attrs: ['defense', 'the smaller the more deadly'] },
            { name: 'seagull', attrs: ['freedom', 'versatility', 'carefree'] },
            { name: 'seahorse', attrs: ['nurturing', 'protecting'] },
            { name: 'seal', attrs: ['contentment', 'warmth'] },
            { name: 'skunk', attrs: ['caution', 'drunk'] },
            { name: 'snail', attrs: ['determination', 'trail'] },
            { name: 'snake', attrs: ['power', 'lifeforce'] },
            { name: 'sloth', attrs: ['steady', 'chill'] },
            { name: 'spider', attrs: ['interconnectedness', 'industrious'] },
            { name: 'squirrel', attrs: ['trust', 'thrift', 'climb'] },
            { name: 'swan', attrs: ['elegance', 'flight'] },
            { name: 'tapir', attrs: ['swift', 'kick'] },
            { name: 'termite', attrs: ['industrious', 'colonizer'] },
            { name: 'turtle', attrs: ['protection', 'healing', 'knowledge'] },
            { name: 'weasel', attrs: ['scurry', 'sneak'] },
            { name: 'whale', attrs: ['creativity', 'intuition'] },
            { name: 'wolf', attrs: ['teaching', 'loyalty', 'symbiosis'] },
            { name: 'woodpecker', attrs: ['change', 'persistent'] },
            { name: 'x-ray tetra', attrs: ['translucent', 'water'] },
            { name: 'yak', attrs: ['mountain', 'useful'] },
            { name: 'zebra', attrs: ['safety in numbers', 'jump'] },
            { name: 'zebu', attrs: ['tough', 'traveler'] }];
        var animalEntry = this.randomFromList(animals);
        this.animal = animalEntry.name + " - " + this.randomFromList(animalEntry.attrs);

        var societies = [
            {
                name: 'Auteur Masters', attrs: ['Cult of personality', 'surprisingly good artist']
            },
            {
                name: 'Coin Miners', attrs: ['Smart Contract Operators', 'Money Lenders']
            },
            {
                name: 'Explorers Guild', attrs: ['Launching diskships deeper into Space', 'Cyrogenics']
            },
            {
                name: 'Farming Commune', attrs: ['Controls Weedville Exports']
            },
            {
                name: 'Instructor Class', attrs: ['Passing down knowledge']
            },
            {
                name: 'Ornamenters Guild', attrs: ['Decorating and design']
            },
            {
                name: 'Pharmaceutical Guild', attrs: ['Controls plant processing and drug manufacturing']
            },
            {
                name: 'Pilot Union', attrs: ['Magick users who protect ships from crashing']
            },
            {
                name: 'Pixie', attrs: ['Someone who remains Unarmored']
            },
            {
                name: 'Space Elves', attrs: ['Lunar Powers', 'Water Benders', 'Eldar, Masters of Size', 'High Caliber Musicians']
            },
            {
                name: 'Space Orcs', attrs: ['Solar Powers', 'Fire Benders', 'Reptilian, Cold Blooded', 'Natural Camouflage']
            },
            {
                name: 'Space Dwarves', attrs: ['Terra Powers', 'Earth Benders', 'Master Mine Builders', 'Master Tinkerers']
            },
            {
                name: 'Space Faeries', attrs: ['Quintessence Powers', 'Air Benders', 'Spirit Guides', 'Ancestral Music', 'Small Flyer']
            },
            {
                name: 'Theologeons Guild', attrs: ['Debate']
            },
            {
                name: 'Thieves Guild', attrs: ['20% Tax on the Five Finger Discount', 'rabbits and other small creatures abound']
            },
            {
                name: 'Trash Sorters Guild', attrs: ['Living life on the edge of a manmade,  miniaturized, blackhole']
            },
            { name: 'Writers Guild', attrs: ['Lowpaid workers making society function'] }
        ];
        var societyEntry = this.randomFromList(societies);
        this.secretSociety = societyEntry.name + " - " + this.randomFromList(societyEntry.attrs);
        
        var genres = [{ name: "Electronic", color: "White", attrs: ["House", "Industrial", "Dance", "EDM", "Dubstep", "Samples", "Trance"]},
            { name: "Hip-Hop", color: "Red", attrs: ["Classic 'Golden' Era", "Instrumental Beats", "Experimental", "Regional Flavored"] },
            { name: "Jazz ", color: "Orange", attrs: ["Strings","Woodwinds", "Electronic", "Brass", "Swing", "Big Band", "Funk"] },
            { name: "Worldly Folk", color: "Yellow", attr: ["Pop", "Country", "Klezmer", "Bluegrass", "Calypso", "Reggae"] },
            { name: "Blue", color: "Blues", attrs: ["Guitar", "Harmonica", "Singer", "Choir", "Piano"] },
            { name: "Rock", color: "Indigo", attrs: ["Grunge", "Classic", "Jam Band", "Synth Rock", "Stadium", "Festival"] },
            { name: "Punk", color: "Violet", attrs: ["Proto", "Pop / Dance", "Ska", "Screamo", "Hardcore"] },
            { name: "Metal", color: "Black", attrs: ["Heavy", "Speed", "Death", "Crust", "Stoner"] },
        ];
        var genreEntry = this.randomFromList(genres);
        this.genre = genreEntry.name + " - " + this.randomFromList(genreEntry.attrs);
        this.color = genreEntry.color

        var firstNames = ["Aeon", "Algae", "Ash", "Astor", "Babylon", "Barbados", "Bard", "Blake", "Boudica", "Calamity", "Carl", "Colin", "Chris", "Colbalt", "Crawford", "Dex", "Drake", "Dylan", "Entropy", "Ezmerelda", "Fez", "Friar", "Garvey", "Gerry", "Hemlock", "Hoist", "Indestructable", "Indiana", "Ivy", "Jeremy", "Johnny", "Joy", "J-Roc", "Keno", "King", "Knuckles", "L", "Lance", "Lamentable", "Mellifluous", "Mix", "Neon", "Nullwin", "Orn", "Ostensibly", "Phil", "Pinky", "Pluto", "Poppy", "Quest", "Rasputin", "Retro", "Rick", "Ripley", "Rocko", "Sammy", "Scott", "Seven", "Siddhartha", "Tilda", "Tote", "Tuco", "Ulma", "Ux", "Verified", "Wiley", "Winston", "Xena", "Yo-Yo", "Yusuf", "Zed", "Zip",]
        this.firstName = this.randomFromList(firstNames);

        var lastNames = ["Alton", "Antimatter", "Baldwin", "Behemoth", "Catalyst", "Comet", "Corybantic", "Crane", "Dagger", "Dirt", "Escher", "Expo", "Fang", "Fish", "Fury", "Gallows", "Gibson", "Haverford", "Herzogin", "Hughes", "Illadvised", "Ink", "James", "Ketchum", "Kim", "Kraken", "Lemming", "Levi", "Locke", "Lurch", "Ma", "Mighty", "Needsahaircut", "Nightshade", "Ocean", "Overlord", "Paraprosdokian", "Petrichor", "Pincer", "Pistorius", "Quasar", "Quiver", "Rigmarole", "Ringing", "Rogers", "Sanchez", "Satyr", "Schadenfreude", "Slime", "Spectre", "Siblings", "Tempest", "Tet", "The Brain", "Underhill", "Vectors", "Waxwork", "Wielga", "Wiggins", "X", "Yu", "Zealot", "Zentavo",]
        this.lastName = this.randomFromList(lastNames);
    }

    this.OnNewCharacter = function () {
    }

    this.OnSave = function () {
    }

    this.OnLoad = function () {
    }

    this.OnUpdate = function () {
    }

    this.getRequires = function () {
        return [];
    }

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        }
    }

    this.canClose = function () {
        return true;
    }

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }

    this.getTitle = function () {
        return "NPC Generator";
    }

    this.OnNewCharacter();
}

g.services.componetService.registerCharacter(ScottLeviNpcGen.component);