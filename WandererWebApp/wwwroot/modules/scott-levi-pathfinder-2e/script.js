var ScottLeviPathfinder2e = {};

ScottLeviPathfinder2e.component = function () {

    this.getId = function () {
        return "scott-levi-pathfinder-2e";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };

    this.ancestry = "";
    this.background = "";
    this.firstName = "";
    this.lastName = "";


    this.randomFromList = function (list) {
        return list[Math.floor(Math.random() * list.length)];
    };

    this.characterLevelList = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
    ];

    this.charLevel = this.characterLevelList[5];

    this.gen = function () {
        var backgrounds = [
            { name: 'acolyte', attrs: ['survival', 'stealth'] },
            { name: 'acrobat', attrs: ['teamwork', 'organization', 'community'] },
            { name: 'animal whisperer', attrs: ['speed', 'grace'] },
            { name: 'artisan', attrs: ['protection', 'safety'] },
            { name: 'artist', attrs: ['tenacity', 'stubbornness'] },
            { name: 'barkeep', attrs: ['nocturnal', 'intuition'] },
            { name: 'barrister', attrs: ['strength', 'introspection', 'problem-solving'] },
            { name: 'bounty hunter', attrs: ['building', 'shaping'] },
            { name: 'charlatan', attrs: ['service', 'gathering', 'community'] },
            { name: 'criminal', attrs: ['unity', 'freedom'] },
            { name: 'detective', attrs: ['abundance', 'healing', 'good fortune'] },
            { name: 'emissary', attrs: ['transformation', 'balance'] },
            { name: 'entertainer', attrs: ['travel', 'mobility'] },
            { name: 'farmhand', attrs: ['humor', 'tricky', 'reversal of fortune'] },
            { name: 'field medic', attrs: ['rarity', 'majesty'] },
            { name: 'fortune teller', attrs: ['council', 'wisdom', 'resourcefulness'] },
            { name: 'gambler', attrs: ['gentle', 'sensitive', 'peaceful'] },
            { name: 'gladiator', attrs: ['loyalty', 'companionship'] },
            { name: 'guard', attrs: ['joy', 'harmony', 'awareness'] },
            { name: 'herbalist', attrs: ['skill', 'refinement', 'relentless'] },
            { name: 'hermit', attrs: ['potency', 'healing', 'flight'] },
            { name: 'hunter', attrs: ['pride', 'power'] },
            { name: 'laborer', attrs: ['counting coup', 'spirit'] },
            { name: 'martial disciple', attrs: ['illumination', 'fluorescent'] },
            { name: 'merchant', attrs: ['survival', 'swim'] },
            { name: 'miner', attrs: ['clever', 'subtle', 'discrete'] },
            { name: 'noble', attrs: ['cleansing', 'emotional healing'] },
            { name: 'nomad', attrs: ['tenacity', 'diligence'] },
            { name: 'prisoner', attrs: ['safe return', 'love of home'] },
            { name: 'sailor', attrs: ['awareness', 'truth'] },
            { name: 'scholar', attrs: ['self-preservation', 'soft-side'] },
            { name: 'tinker', attrs: ['freedom', 'power', 'easy movement'] },
            { name: 'warrior', attrs: ['wonder', 'agility', 'perception'] },
        
            /*{ name: 'kangaroo', attrs: ['balance', 'toughness'] },
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
            { name: 'zebu', attrs: ['tough', 'traveler'] }*/
        ];
        var backgroundEntry = this.randomFromList(backgrounds);
        this.background = backgroundEntry.name + " - " + this.randomFromList(backgroundEntry.attrs);

        var ancestries = [
            { name: 'Gnome', attrs: ['Cult of personality', 'surprisingly good artist'] },
            { name: 'Halfling', attrs: ['Passing down knowledge'] },
            { name: 'Pixie', attrs: ['Flighty'] },
            { name: 'Elf', attrs: ['Lunar Powers', 'Water Magic', 'Eldar, Masters of Size', 'High Caliber Musicians'] },
            { name: 'Goblin', attrs: ['Solar Powers', 'Fire Benders', 'Reptilian, Cold Blooded', 'Natural Camouflage'] },
            { name: 'Dwarf', attrs: ['Terra Powers', 'Flying Machine Pilots', 'Master Mine Builders', 'Master Tinkerers'] },
            { name: 'Faerie', attrs: ['Quintessence Powers', 'Air Benders', 'Spirit Guides'] },
            { name: 'Human', attrs: ['Debate'] },
            { name: 'Centaur', attrs: ['rabbits and other small creatures abound'] },
            { name: 'Orc', attrs: ['Living life on the edge',] },
        ];
        
        var ancestryEntry = this.randomFromList(ancestries);
        this.ancestry = ancestryEntry.name + " - " + this.randomFromList(ancestryEntry.attrs);

        var charClasses = [
            { name: "Alchemist", traditions: ["arcane", "occult", "divine", "primal"] },
            { name: "Barbarian", traditions: ["arcane", "occult", "divine", "primal"] },
            { name: "Bard", traditions: ["arcane", "occult", "divine", "primal"] },
            { name: "Champion", traditions: ["arcane", "occult", "divine", "primal"] },
            { name: "Cleric", traditions: ["arcane", "occult", "divine", "primal"] },
            { name: "Druid", traditions: ["arcane", "occult", "divine", "primal"] },
            { name: "Fighter", traditions: ["arcane", "occult", "divine", "primal"] },
            { name: "Monk", traditions: ["arcane", "occult", "divine", "primal"] },
            { name: "Ranger", traditions: ["arcane", "occult", "divine", "primal"] },
            { name: "Rouge", traditions: ["arcane", "occult", "divine", "primal"] },
            { name: "Sorcerer", traditions: ["arcane", "occult", "divine", "primal"] },
            { name: "Wizard", traditions: ["arcane", "occult", "divine", "primal"] },
        ];
        var charClassEntry = this.randomFromList(charClasses);
        var charTradition = this.randomFromList(charClassEntry.traditions)
        this.charClass = charClassEntry.name + " - " + charTradition;

        var charSpellList = [
            { spell: "Summon Construct", traditions: ["arcane"], level: 01 }, 	
            { spell: "Summon Dragon", traditions: ["arcane"], level: 05 }, 	
            { spell: "Disintegrate", traditions: ["arcane"], level: 06 }, 	
            { spell: "Contingency", traditions:[ "arcane"], level:	07 }, 	
            { spell: "Power Word Blind", traditions:[ "arcane"], level: 07 }, 
            { spell: "Turning", traditions:[ "arcane"], level: 07 }, 	
            { spell: "Power Word Stun", traditions:[ "arcane"], level: 08 }, 	
            { spell: "Power Word Kill", traditions: ["arcane"], level: 09 }, 	
            { spell: "Wish", traditions: ["arcane"], level: 10 },
            
            { spell: "Chill Touch", traditions: ["arcane", "divine", "occult"], level: 01 },	
            { spell: "Drop Dead", traditions: ["arcane", "divine"], level: 05 },

            { spell: "Command", traditions: ["arcane", "divine", "occult"], level: 01 }, 	
            { spell: "Daze", traditions: ["arcane", "divine", "occult"], level: 01 }, 	
            { spell: "Lock", traditions: ["arcane", "divine", "occult"], level: 01 }, 	
            { spell: "Magic Weapon", traditions: ["arcane", "divine", "occult"], level: 01 }, 	
            { spell: "Message", traditions: ["arcane", "divine", "occult"], level: 01 }, 	
            { spell: "Ray of Enfeeblement", traditions: ["arcane", "divine", "occult"], level: 01 }, 	
            { spell: "Shield", traditions: ["arcane", "divine", "occult"], level: 01 }, 	
            { spell: "Comprehend Language", traditions: ["arcane", "divine", "occult"], level:	02 }, 	
            { spell: "See Invisibility", traditions: ["arcane", "divine", "occult"], level: 02 }, 	
            { spell: "Bind Undead", traditions: ["arcane", "divine", "occult"], level:	03 }, 	
            { spell: "Dream Message", traditions: ["arcane", "divine", "occult"], level: 03 }, 	
            { spell: "Locate", traditions: ["arcane", "divine", "occult"],	level: 03 }, 	
            { spell: "Vampiric Touch", traditions: ["arcane", "divine", "occult"], level: 03 }, 	
            { spell: "Dimensional Anchor", traditions: ["arcane", "divine", "occult"], level: 04 }, 	
            { spell: "Discern Lies", traditions: ["arcane", "divine", "occult"], level: 04 }, 	
            { spell: "Globe of Invulnerability", traditions:	["arcane", "divine", "occult"], level: 04 }, 	
            { spell: "Immunity", traditions: ["arcane", "divine", "occult"], level: 04 }, 	
            { spell: "Outcast’s Curse", traditions: ["arcane", "divine", "occult"], level: 04 }, 	
            { spell: "Prying Eye", traditions: ["arcane", "divine", "occult"], level: 05 }, 	
            { spell: "Sending", traditions: ["arcane", "divine", "occult"], level: 05 }, 	
            { spell: "Tongues", traditions: ["arcane", "divine", "occult"], level: 05 }, 	
            { spell: "Repulsion", traditions: ["arcane", "divine", "occult"], level:	06 }, 	
            { spell: "Spellwrack", traditions: ["arcane", "divine", "occult"], level: 06 }, 	
            { spell: "Vampiric Exsanguination", traditions: ["arcane", "divine", "occult"], level: 06 }, 	
            { spell: "Dimensional Lock", traditions: ["arcane", "divine", "occult"], level: 07 }, 	
            { spell: "Antimagic Field", traditions: ["arcane", "divine", "occult"], level: 08 }, 	
            { spell: "Discern Location", traditions:	["arcane", "divine", "occult"],	level: 08 },	
            { spell: "Foresight", traditions: ["arcane", "divine", "occult"], level: 09 }, 	
            { spell: "Telepathic Demand", traditions: ["arcane", "divine", "occult"], level: 09 }, 	
            { spell: "Gate", traditions: ["arcane", "divine", "occult"], level: 10 }, 	
            
            { spell: "Alarm", traditions: ["arcane", "divine", "occult", "primal"], level: 01 },
            { spell: "Shrink Item", traditions:[ "arcane"], level: 03 }, 	
            { spell: "Fear", traditions:	["arcane", "divine", "occult", "primal"], level: 01 }, 	
            { spell: "Light", traditions: ["arcane", "divine", "occult", "primal"], level: 01 }, 	
            { spell: "Detect Magic", traditions:	["arcane", "divine", "occult", "primal"], level: 01 },
            { spell: "Mending", traditions: ["arcane", "divine", "occult", "primal"], level: 01 }, 	
            { spell: "Prestidigitation", traditions: ["arcane", "divine", "occult", "primal"], level: 01 }, 	
            { spell: "Read Aura", traditions: ["arcane", "divine", "occult", "primal"], level: 01 }, 	
            { spell: "Sigil", traditions: ["arcane", "divine", "occult", "primal"], level: 01 }, 	
            { spell: "Ventriloquism", traditions: ["arcane", "divine", "occult", "primal"], level: 01 }, 	
            { spell: "Continual Flame", traditions: ["arcane", "divine", "occult", "primal"], level: 02 }, 	
            { spell: "Darkness", traditions:	["arcane", "divine", "occult", "primal"], level: 02 }, 	
            { spell: "Darkvision", traditions: ["arcane", "divine", "occult", "primal"], level: 02 }, 	
            { spell: "Deafness", traditions:	["arcane", "divine", "occult", "primal"], level: 02 }, 	
            { spell: "Dispel Magic", traditions:	["arcane", "divine", "occult", "primal"], level: 02 }, 	
            { spell: "Gentle Repose", traditions: ["arcane", "divine", "occult", "primal"], level: 02 }, 	
            { spell: "Resist Energy", traditions: ["arcane", "divine", "occult", "primal"], level: 02 }, 	
            { spell: "Blindness", traditions: ["arcane", "divine", "occult", "primal"], level: 03 }, 	
            { spell: "Glyph of Warding", traditions:	["arcane", "divine", "occult", "primal"], level: 03 }, 	
            { spell: "Banishment", traditions: ["arcane", "divine", "occult", "primal"],	level: 05 }, 	
            { spell: "True Seeing", traditions: ["arcane", "divine", "occult", "primal"], level:	06 }, 	
            { spell: "Energy Aegis", traditions:	["arcane", "divine", "occult", "primal"], level: 07 }, 	
            { spell: "Plane Shift", traditions: ["arcane", "divine", "occult", "primal"], level:	07 },	
            { spell: "Remake", traditions: ["arcane", "divine", "occult", "primal"], level: 10 },

            { spell: "Air Bubble", traditions: ["arcane", "divine", "primal"], level: 01 },
            { spell: "Create Water", traditions: ["arcane", "divine", "primal"], level: 01 }, 		
            { spell: "Create Food", traditions: ["arcane", "divine", "primal"], level: 02 }, 		
            { spell: "Endure Elements", traditions: ["arcane", "divine", "primal"], level: 02 }, 		
            { spell: "Water Breathing", traditions: ["arcane", "divine", "primal"], level: 02 }, 		
            { spell: "Water Walk", traditions: ["arcane", "divine", "primal"], level: 02 }, 		
            { spell: "Freedom of Movement", traditions: ["arcane", "divine", "primal"], level: 04 }, 		
            { spell: "Eclipse Burst", traditions: ["arcane", "divine", "primal"], level: 07 }, 		
            { spell: "Massacre", traditions: ["arcane", "divine", "primal"], level: 09 },
            
            { spell: "Color Spray", traditions: ["arcane", "occult"], level:	01 }, 		
            { spell: "Floating Disk", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "Ghost Sound", traditions: ["arcane", "occult"], level:	01 }, 		
            { spell: "Grim Tendrils", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "Illusory Disguise", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "Illusory Object", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "Item Facade", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "Mage Armor", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "Mage Hand", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "Magic Aura", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "Magic Missile", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "Sleep", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "Telekinetic Projectile", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "True Strike", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "Unseen Servant", traditions: ["arcane", "occult"], level: 01 }, 		
            { spell: "Blur", traditions: ["arcane", "occult"], level: 02 }, 		
            { spell: "False Life", traditions: ["arcane", "occult"], level: 02 }, 		
            { spell: "Hideous Laughter", traditions: ["arcane", "occult"], level: 02 }, 		
            { spell: "Illusory Creature", traditions: ["arcane", "occult"], level: 02 }, 		
            { spell: "Invisibility", traditions: ["arcane", "occult"], level: 02 }, 		
            { spell: "Knock", traditions: ["arcane", "occult"], level: 02 }, 		
            { spell: "Magic Mouth", traditions: ["arcane", "occult"], level: 02 }, 		
            { spell: "Mirror Image", traditions: ["arcane", "occult"], level: 02 }, 		
            { spell: "Misdirection", traditions: ["arcane", "occult"], level: 02 }, 		
            { spell: "Spectral Hand", traditions: ["arcane", "occult"], level: 02 }, 		
            { spell: "Telekinetic Maneuver", traditions: ["arcane", "occult"], level: 02 }, 		
            { spell: "Touch of Idiocy", traditions: ["arcane", "occult"], level: 02 }, 		
            { spell: "Clairaudience", traditions: ["arcane", "occult"], level: 03 }, 		
            { spell: "Enthrall", traditions: ["arcane", "occult"], level: 03 }, 		
            { spell: "Ghostly Weapon", traditions: ["arcane", "occult"], level: 03 }, 		
            { spell: "Hypnotic Pattern", traditions: ["arcane", "occult"], level: 03 }, 		
            { spell: "Invisibility Sphere", traditions: ["arcane", "occult"], level: 03 }, 		
            { spell: "Levitate", traditions: ["arcane", "occult"], level: 03 }, 		
            { spell: "Mind Reading", traditions: ["arcane", "occult"], level: 03 }, 		
            { spell: "Paralyze", traditions: ["arcane", "occult"], level: 03 }, 		
            { spell: "Secret Page", traditions: ["arcane", "occult"], level: 03 }, 		
            { spell: "Blink", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Clairvoyance", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Confusion", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Detect Scrying", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Dimension Door", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Nightmare", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Phantasmal Killer", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Private Sanctum", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Resilient Sphere", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Rope Trick", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Suggestion", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Telepathy", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Veil", traditions: ["arcane", "occult"], level: 04 }, 		
            { spell: "Black Tentacles", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "Chromatic Wall", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "Cloak of Colors", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "Crushing Despair", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "False Vision", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "Hallucination", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "Illusory Scene", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "Mind Probe", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "Shadow Siphon", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "Shadow Walk", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "Subconscious Suggestion", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "Telekinetic Haul", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "Telepathic Bond", traditions: ["arcane", "occult"], level: 05 }, 		
            { spell: "Collective Transposition", traditions: ["arcane", "occult"], level: 06 }, 		
            { spell: "Dominate", traditions: ["arcane", "occult"], level: 06 }, 		
            { spell: "Feeblemind", traditions: ["arcane", "occult"], level: 06 }, 		
            { spell: "Mislead", traditions: ["arcane", "occult"], level: 06 }, 		
            { spell: "Phantasmal Calamity", traditions: ["arcane", "occult"], level: 06 }, 		
            { spell: "Scrying", traditions: ["arcane", "occult"], level: 06 }, 		
            { spell: "Teleport", traditions: ["arcane", "occult"], level: 06 }, 		
            { spell: "Vibrant Pattern", traditions: ["arcane", "occult"], level: 06 }, 		
            { spell: "Wall of Force", traditions: ["arcane", "occult"], level: 06 }, 		
            { spell: "Duplicate Foe", traditions: ["arcane", "occult"], level: 07 }, 		
            { spell: "Magnificent Mansion", traditions: ["arcane", "occult"], level: 07 }, 		
            { spell: "Prismatic Spray", traditions: ["arcane", "occult"], level: 07 }, 		
            { spell: "Project Image", traditions: ["arcane", "occult"], level: 07 }, 		
            { spell: "Reverse Gravity", traditions: ["arcane", "occult"], level: 07 }, 		
            { spell: "True Target", traditions: ["arcane", "occult"], level: 07 }, 		
            { spell: "Warp Mind", traditions: ["arcane", "occult"], level: 07 }, 		
            { spell: "Disappearance", traditions: ["arcane", "occult"], level: 08 }, 		
            { spell: "Dream Council", traditions: ["arcane", "occult"], level: 08 }, 		
            { spell: "Maze", traditions: ["arcane", "occult"], level: 08 }, 		
            { spell: "Mind Blank", traditions: ["arcane", "occult"], level: 08 }, 		
            { spell: "Prismatic Wall", traditions: ["arcane", "occult"], level: 08 }, 		
            { spell: "Scintillating Pattern", traditions: ["arcane", "occult"], level: 08 }, 		
            { spell: "Uncontrollable Dance", traditions: ["arcane", "occult"], level: 08 }, 		
            { spell: "Unrelenting Observation", traditions: ["arcane", "occult"], level: 08 }, 		
            { spell: "Prismatic Sphere", traditions: ["arcane", "occult"], level: 09 }, 		
            { spell: "Resplendent Mansion", traditions: ["arcane", "occult"], level: 09 }, 		
            { spell: "Weird", traditions: ["arcane", "occult"], level: 09 }, 		
            { spell: "Time Stop", traditions: ["arcane", "occult"], level: 10 },
        
            { spell: "Charm", traditions: ["arcane", "occult", "primal"], level: 01 }, 		
            { spell: "Dancing Lights", traditions: ["arcane", "occult", "primal"], level: 01 }, 		
            { spell: "Humanoid Form", traditions: ["arcane", "occult", "primal"], level: 02 }, 		
            { spell: "Phantom Steed", traditions: ["arcane", "occult", "primal"], level: 02 }, 		
            { spell: "Haste", traditions: ["arcane", "occult", "primal"], level: 03 }, 		
            { spell: "Nondetection", traditions: ["arcane", "occult", "primal"], level: 03 }, 		
            { spell: "Slow", traditions: ["arcane", "occult", "primal"], level: 03 }, 		
            { spell: "Fly", traditions: ["arcane", "occult", "primal"], level: 04 }, 		
            { spell: "Gaseous Form", traditions: ["arcane", "occult", "primal"], level: 04 }, 		
            { spell: "Hallucinatory Terrain", traditions: ["arcane", "occult", "primal"], level: 04 }, 		
            { spell: "Mariner’s Curse", traditions: ["arcane", "occult", "primal"], level: 05 }, 		
            { spell: "Mask of Terror", traditions: ["arcane", "occult", "primal"], level: 07 },
            
            { spell: "Acid Splash", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Ant Haul", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Burning Hands", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Electric Arc", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Feather Fall", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Fleet Step", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Goblin Pox", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Grease", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Gust of Wind", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Hydraulic Push", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Jump", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Longstrider", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Negate Aroma", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Pest Form", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Produce Flame", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Ray of Frost", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Shocking Grasp", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Spider Sting", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Summon Animal", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Tanglefoot", traditions: ["arcane", "primal"], level: 01 }, 		
            { spell: "Acid Arrow", traditions: ["arcane", "primal"], level: 02 }, 		
            { spell: "Enlarge", traditions: ["arcane", "primal"], level: 02 }, 		
            { spell: "Flaming Sphere", traditions: ["arcane", "primal"], level: 02 }, 		
            { spell: "Glitterdust", traditions: ["arcane", "primal"], level: 02 }, 		
            { spell: "Obscuring Mist", traditions: ["arcane", "primal"], level: 02 }, 		
            { spell: "Shrink", traditions: ["arcane", "primal"], level: 02 }, 		
            { spell: "Spider Climb", traditions: ["arcane", "primal"], level: 02 }, 		 		
            { spell: "Summon Elemental", traditions: ["arcane", "primal"], level: 02 }, 		
            { spell: "Web", traditions: ["arcane", "primal"], level: 02 }, 		
            { spell: "Earthbind", traditions: ["arcane", "primal"], level: 03 }, 		
            { spell: "Feet To Fins", traditions: ["arcane", "primal"], level: 03 }, 		
            { spell: "Fireball", traditions: ["arcane", "primal"], level: 03 }, 		
            { spell: "Lightning Bolt", traditions: ["arcane", "primal"], level: 03 }, 		
            { spell: "Meld into Stone", traditions: ["arcane", "primal"], level:	03 }, 		
            { spell: "Stinking Cloud", traditions: ["arcane", "primal"], level: 03 }, 		
            { spell: "Wall of Wind", traditions: ["arcane", "primal"], level: 03 }, 		
            { spell: "Aerial Form", traditions: ["arcane", "primal"], level: 04 }, 		
            { spell: "Creation", traditions: ["arcane", "primal"], level: 04 }, 		
            { spell: "Fire Shield", traditions: ["arcane", "primal"], level: 04 }, 		
            { spell: "Shape Stone", traditions: ["arcane", "primal"], level: 04 }, 		
            { spell: "Solid Fog", traditions: ["arcane", "primal"], level: 04 }, 		
            { spell: "Stoneskin", traditions: ["arcane", "primal"], level: 04 }, 		
            { spell: "Wall of Fire", traditions: ["arcane", "primal"], level: 04 }, 		
            { spell: "Weapon Storm", traditions: ["arcane", "primal"], level: 04 }, 		
            { spell: "Cloudkill", traditions: ["arcane", "primal"], level: 05 }, 		
            { spell: "Cone of Cold", traditions: ["arcane", "primal"], level: 05 }, 		
            { spell: "Control Water", traditions: ["arcane", "primal"], level: 05 }, 		
            { spell: "Elemental Form", traditions: ["arcane", "primal"], level: 05 }, 		
            { spell: "Passwall", traditions: ["arcane", "primal"], level: 05 }, 		
            { spell: "Wall of Ice", traditions: ["arcane", "primal"], level: 05 }, 		
            { spell: "Wall of Stone", traditions: ["arcane", "primal"], level: 05 }, 		
            { spell: "Baleful Polymorph", traditions: ["arcane", "primal"], level: 06 }, 		
            { spell: "Chain lightning", traditions: ["arcane", "primal"], level: 06 }, 		
            { spell: "Dragon Form", traditions: ["arcane", "primal"], level: 06 }, 		
            { spell: "Flesh to Stone", traditions: ["arcane", "primal"], level: 06 }, 		
            { spell: "Purple Worm Sting", traditions: ["arcane", "primal"], level: 06 }, 		
            { spell: "Fiery Body", traditions: ["arcane", "primal"], level: 07 }, 		
            { spell: "Earthquake", traditions: ["arcane", "primal"], level: 08 }, 		
            { spell: "Horrid Wilting", traditions: ["arcane", "primal"], level: 08 }, 		
            { spell: "Monstrosity Form", traditions: ["arcane", "primal"], level: 08 }, 		
            { spell: "Polar Ray", traditions: ["arcane", "primal"], level: 08 }, 		
            { spell: "Disjunction", traditions: ["arcane", "primal"], level: 09 }, 		
            { spell: "Implosion", traditions: ["arcane", "primal"], level: 09 }, 		
            { spell: "Meteor Swarm", traditions: ["arcane", "primal"], level: 09 }, 		
            { spell: "Shapechange", traditions: ["arcane", "primal"], level: 09 }, 		
            { spell: "Cataclysm", traditions: ["arcane", "primal"], level: 10     },

            { spell: "Disrupting Weapons", traditions: ["divine"], level: 01 },		
            { spell: "Divine Lance", traditions: ["divine"], level: 01 },		
            { spell: "Harm", traditions: ["divine"], level: 01 },		
            { spell: "Shield Other", traditions: ["divine"], level: 02 },		
            { spell: "Chilling Darkness", traditions: ["divine"], level: 03 },		
            { spell: "Crisis of Faith", traditions: ["divine"], level: 03 },		
            { spell: "Sanctified Ground", traditions: ["divine"], level: 03 },		
            { spell: "Anathematic Reprisal", traditions: ["divine"], level: 04 },		
            { spell: "Divine Wrath", traditions: ["divine"], level: 04 },		
            { spell: "Holy Cascade", traditions: ["divine"], level: 04 },		
            { spell: "Breath of Life", traditions: ["divine"], level: 05 },		
            { spell: "Flame Strike", traditions: ["divine"], level: 05 },		
            { spell: "Spiritual Guardian", traditions: ["divine"], level: 05 },		
            { spell: "Summon Celestial", traditions: ["divine"], level: 05 },		
            { spell: "Summon Fiend", traditions: ["divine"], level: 05 },		
            { spell: "Blade Barrier", traditions: ["divine"], level: 06 },		
            { spell: "Raise Dead", traditions: ["divine"], level: 06 },		
            { spell: "Righteous Might", traditions: ["divine"], level: 06 },		
            { spell: "Divine Decree", traditions: ["divine"], level: 07 },		
            { spell: "Divine Vessel", traditions: ["divine"], level: 07 },		
            { spell: "Divine Aura", traditions: ["divine"], level: 08 },		
            { spell: "Divine Inspiration", traditions: ["divine"], level: 08 },		
            { spell: "Crusade", traditions: ["divine"], level: 09 },		
            { spell: "Weapon of Judgment", traditions: ["divine"], level: 09 },		
            { spell: "Avatar", traditions: ["divine"], level: 10 }, 		
            { spell: "Miracle", traditions: ["divine"], level: 10 },

            { spell: "Bane", traditions: ["divine", "occult"], level: 01 }, 		
            { spell: "Bless", traditions: ["divine", "occult"], level: 01 }, 		
            { spell: "Detect Alignment", traditions: ["divine", "occult"], level: 01 }, 		
            { spell: "Forbidding Ward", traditions: ["divine", "occult"], level: 01 }, 		
            { spell: "Protection", traditions: ["divine", "occult"], level: 01 }, 		
            { spell: "Sanctuary", traditions: ["divine", "occult"], level: 01 }, 		
            { spell: "Spirit Link", traditions: ["divine", "occult"], level: 01 }, 		
            { spell: "Augury", traditions: ["divine", "occult"], level: 02 }, 		
            { spell: "Calm Emotions", traditions: ["divine", "occult"], level: 02 }, 		
            { spell: "Death Knell", traditions: ["divine", "occult"], level: 02 }, 		
            { spell: "Ghoulish Cravings", traditions: ["divine", "occult"], level: 02 }, 		
            { spell: "Silence", traditions: ["divine", "occult"], level: 02 }, 		
            { spell: "Sound Burst", traditions: ["divine", "occult"], level: 02 }, 		
            { spell: "Spiritual Weapon", traditions: ["divine", "occult"], level: 02 }, 		
            { spell: "Undetectable Alignment", traditions: ["divine", "occult"], level: 02 }, 		
            { spell: "Circle of Protection", traditions: ["divine", "occult"], level: 03 }, 		
            { spell: "Heroism", traditions: ["divine", "occult"], level: 03 }, 		
            { spell: "Wanderer’s Guide", traditions: ["divine", "occult"], level: 03 }, 		
            { spell: "Zone of Truth", traditions: ["divine", "occult"], level: 03 }, 		
            { spell: "Read Omens", traditions: ["divine", "occult"], level: 04 }, 		
            { spell: "Remove Curse", traditions: ["divine", "occult"], level: 04 }, 		
            { spell: "Talking Corpse", traditions: ["divine", "occult"], level: 04 }, 		
            { spell: "Abyssal Plague", traditions: ["divine", "occult"], level: 05 }, 		
            { spell: "Shadow Blast", traditions: ["divine", "occult"], level: 05 }, 		
            { spell: "Spirit Blast", traditions: ["divine", "occult"], level: 06 }, 		
            { spell: "Zealous Conviction", traditions: ["divine", "occult"], level: 06 }, 		
            { spell: "Ethereal Jaunt", traditions: ["divine", "occult"], level: 07 }, 		
            { spell: "Spiritual Epidemic", traditions: ["divine", "occult"], level: 08 }, 		
            { spell: "Bind Soul", traditions: ["divine", "occult"], level: 09 }, 		
            { spell: "Overwhelming Presence", traditions: ["divine", "occult"], level: 09 }, 		
            { spell: "Wail of the Banshee", traditions: ["divine", "occult"], level: 09 },

            { spell: "Guidance", traditions: ["divine", "occult", "primal"], level: 01 }, 		
            { spell: "Know Direction", traditions: ["divine", "occult", "primal"], level: 01 }, 		
            { spell: "Faerie Fire", traditions: ["divine", "occult", "primal"], level: 02 }, 		
            { spell: "Remove Fear", traditions: ["divine", "occult", "primal"], level: 02 }, 		
            { spell: "Remove Paralysis", traditions: ["divine", "occult", "primal"], level: 02 }, 		
            { spell: "Restoration", traditions: ["divine", "occult", "primal"], level: 02 }, 		
            { spell: "Restore Senses", traditions: ["divine", "occult", "primal"], level: 02 }, 		
            { spell: "Status", traditions: ["divine", "occult", "primal"], level: 02 }, 		
            { spell: "Death Ward", traditions: ["divine", "occult", "primal"], level: 05  },

            { spell: "Detect Poison", traditions: ["divine", "primal"], level: 1 },		
            { spell: "Disrupt Undead", traditions: ["divine", "primal"], level: 1 },		
            { spell: "Heal", traditions: ["divine", "primal"], level: 1 },		
            { spell: "Purify Food and Drink", traditions: ["divine", "primal"], level: 1 },		
            { spell: "Stabilize", traditions: ["divine", "primal"], level: 1 },		
            { spell: "Enhance Victuals", traditions: ["divine", "primal"], level: 2 },		
            { spell: "Neutralize Poison", traditions: ["divine", "primal"], level: 3 },		
            { spell: "Remove Disease", traditions: ["divine", "primal"], level: 3 },		
            { spell: "Searing Light", traditions: ["divine", "primal"], level: 3 },		
            { spell: "Air Walk", traditions: ["divine", "primal"], level: 4 },		
            { spell: "Vital Beacon", traditions: ["divine", "primal"], level: 4 },		
            { spell: "Field of Life", traditions: ["divine", "primal"], level: 6 },		
            { spell: "Stone Tell", traditions: ["divine", "primal"], level: 6 },		
            { spell: "Stone To Flesh", traditions: ["divine", "primal"], level: 6 },		
            { spell: "Finger of Death", traditions: ["divine", "primal"], level: 7 },		
            { spell: "Regenerate", traditions: ["divine", "primal"], level: 7 },		
            { spell: "Sunburst", traditions: ["divine", "primal"], level: 7 },		
            { spell: "Moment of Renewal", traditions: ["divine", "primal"], level: 8 },		
            { spell: "Revival", traditions: ["divine", "primal"], level: 10 },

            { spell: "Mindlink", traditions: ["occult"], level: 01 }, 		
            { spell: "Phantom Pain", traditions: ["occult"], level: 01 }, 		
            { spell: "Soothe", traditions: ["occult"], level: 01 }, 		
            { spell: "Paranoia", traditions: ["occult"], level: 02 }, 		
            { spell: "Hypercognition", traditions: ["occult"], level: 03 }, 		
            { spell: "Glibness", traditions: ["occult"], level: 04 }, 		
            { spell: "Modify Memory", traditions: ["occult"], level: 04 }, 		
            { spell: "Dreaming Potential", traditions: ["occult"], level: 05 }, 		
            { spell: "Summon Entity", traditions: ["occult"], level: 05 }, 		
            { spell: "Synaptic Pulse", traditions: ["occult"], level: 05 }, 		
            { spell: "Synesthesia", traditions: ["occult"], level: 05 }, 		
            { spell: "Possession", traditions: ["occult"], level: 07 }, 		
            { spell: "Retrocognition", traditions: ["occult"], level: 07 }, 		
            { spell: "Visions of Danger", traditions: ["occult"], level: 07 }, 		
            { spell: "Spirit Song", traditions: ["occult"], level: 08 }, 		
            { spell: "Unfathomable Song", traditions: ["occult"], level: 09 }, 		
            { spell: "Alter Reality", traditions: ["occult"], level: 10 },	
            { spell: "Fabricated Truth", traditions: ["occult"], level: 10 },

            { spell: "Summon Fey", traditions: ["occult", "primal"], level: 01 }, 		
            { spell: "Shatter", traditions: ["occult", "primal"], level:	02 },

            { spell: "Magic Fang", traditions: ["primal"], level: 01 }, 		
            { spell: "Pass Without Trace", traditions: ["primal"], level: 01 }, 		
            { spell: "Shillelagh", traditions: ["primal"], level: 01 }, 		
            { spell: "Summon Plant or Fungus", traditions: ["primal"], level: 01 }, 		
            { spell: "Animal Form", traditions: ["primal"], level: 02 }, 		
            { spell: "Animal Messenger", traditions: ["primal"], level: 02 }, 		
            { spell: "Barkskin", traditions: ["primal"], level: 02 }, 		
            { spell: "Entangle", traditions: ["primal"], level: 02 }, 		
            { spell: "Shape Wood", traditions: ["primal"], level: 02 }, 		
            { spell: "Speak with Animals", traditions: ["primal"], level: 02 }, 		
            { spell: "Tree Shape", traditions: ["primal"], level: 02 }, 		
            { spell: "Animal Vision", traditions: ["primal"], level: 03 }, 		
            { spell: "Insect Form", traditions: ["primal"], level: 03 }, 		
            { spell: "Wall of Thorns", traditions: ["primal"], level: 03 }, 		
            { spell: "Dinosaur Form", traditions: ["primal"], level: 04 }, 		
            { spell: "Hydraulic Torrent", traditions: ["primal"], level: 04 }, 		
            { spell: "Speak with Plants", traditions: ["primal"], level: 04 }, 		
            { spell: "Moon Frenzy", traditions: ["primal"], level: 05 }, 		
            { spell: "Plant Form", traditions: ["primal"], level: 05 }, 		
            { spell: "Summon Giant", traditions: ["primal"], level: 05 }, 		
            { spell: "Tree Stride", traditions: ["primal"], level: 05 }, 		
            { spell: "Fire Seeds", traditions: ["primal"], level: 06 }, 		
            { spell: "Tangling Creepers", traditions: ["primal"], level: 06 }, 		
            { spell: "Unfettered Pack", traditions: ["primal"], level: 07 }, 		
            { spell: "Volcanic Eruption", traditions: ["primal"], level: 07 }, 		
            { spell: "Punishing Winds", traditions: ["primal"], level: 08 }, 		
            { spell: "Wind Walk", traditions: ["primal"], level: 08 }, 		
            { spell: "Nature’s Enmity", traditions: ["primal"], level: 09 }, 		
            { spell: "Storm of Vengeance", traditions: ["primal"], level: 09 }, 		
            { spell: "Nature Incarnate", traditions: ["primal"], level: 10 }, 		
            { spell: "Primal Herd", traditions: ["primal"], level: 10 }, 		
            { spell: "Primal Phenomenon", traditions: ["primal"], level: 10 },
        ];

        var orderedSpellList = {};

        for (var spell of charSpellList){
            for (var tradition of spell.traditions) {
                if (!(tradition in orderedSpellList)){
                    orderedSpellList[tradition]={};    
                }
                
                var spellListForTradition = orderedSpellList[tradition];

                if (!(spell.level in spellListForTradition)){
                    spellListForTradition[spell.level]=[]; 
                }
                
                orderedSpellList[tradition][spell.level].push(spell);
            }
        }; 

        this.characterSpellList = [];

        var spellsOfTradition = orderedSpellList[charTradition];
        
        for (var i = 1; i <= this.charLevel; i++) {
            this.characterSpellList.push(this.randomFromList(spellsOfTradition[i]));
        };
        
        var firstNames = ["Aeon", "Algae", "Ash", "Astor", "Atlantis", "Ariadne", "Arianwen", "Babylon", "Barbados", "Boudica", "Caspian", "Cassia", "Colbalt", "Cyprian", "Enviable", "Ezmerelda", "Friar", "Garvey", "Hesperos", "Lancer", "Nullwin", "Olga", "Pluto", "Poppy", "Prince", "Rasputin", "Solaris", "Xena", "Yusuf", "Zed", "Zip", "Zorion",];
        this.firstName = this.randomFromList(firstNames);

        var lastNames = ["Agripa",  "Behemoth", "Chiron(tribal royalty)", "Centaurus(religious)", "Comet",  "Furietti", "Iliad", "Kinnaras(heroic royalty)", "Nightshade", "Petrichor", "Pulicane(smaller breed)", "Quiver",  "Tempest(druid)" ];
        this.lastName = this.randomFromList(lastNames);
    };

    this.OnNewCharacter = function () {
    };

    this.OnSave = function () {
    };

    this.OnLoad = function () {
    };

    this.OnUpdate = function () {
    };

    this.getRequires = function () {
        return [];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        };
    };

    this.canClose = function () {
        return true;
    };

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };

    this.getTitle = function () {
        return "Pathfinder 2nd Edition";
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ScottLeviPathfinder2e.component);