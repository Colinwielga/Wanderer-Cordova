ColinWielgaCards.imageList = [
    "AbandonedMill",
    "Adelaide",
    "AirSuperiority",
    "ArcDTriumph",
    "Ardennes",
    "BackyardAirShelter",
    "BattleOfTheBulge",
    "BeachLanding",
    "BikingOverRuins",
    "Bougainville",
    "Broadside",
    "Bunker",
    "CapturedHardware",
    "CommandPost",
    "ConcertParty",
    "Convoy",
    "CookRations",
    "Cross",
    "Desperation",
    "DownedPlane",
    "DisplacedPersonsCamp",
    "EgyptianWomen",
    "Electricity",
    "ExhibitionBuildingMelbourne",
    "Explosion",
    "FarouksCarriage",
    "FightingStreetByStreet",
    "ForestFighting",
    "Fountain",
    "FrankSFriendsTatura",
    "Grave",
    "HaircutPunishment",
    "Harvesting",
    "Howitzer",
    "Infantry",
    "KarnakLuxor",
    "KnockedOut",
    "Lifeboats",
    "Maps",
    "Marching",
    "MajorGeneralThomas",
    "Medic",
    "Memorialize",
    "Mending",
    "ModelMaking",
    "MohammedAliMosque",
    "Mortars",
    "MurchisonDistrictVictoria",
    "NearMissPerth",
    "NellDIsabelPWearingGasMasks",
    "Normandy1944",
    "OldHouseCairo",
    "Parachuters",
    "PersianGardens",
    "PlaneCrash",
    "POWFuneral",
    "PrisonerOfWarCamp",
    "Puckapunyal",
    "QuislingExecution",
    "RedCross",
    "Return",
    "Sailing",
    "Saipan",
    "Segregated",
    "SixteenInchGuns",
    "SnowyRoad",
    "StrategyMeeting",
    "StreetSceneGaza",
    "SupplyQueueSalzgitter",
    "Surrender",
    "TankWelding",
    "Triage",
    "TugBoat",
    "USSSouthDakota",
    "WaterBuffalo"
];

ColinWielgaCards.QualOutcomeCard = function (guid, name, type, text, oddsOfSuccess, oddsOfUncertainty, inDefault) {
    this.guid = guid;
    this.name = name;
    this.type = type;
    this.text = text;
    this.oddsOfSuccess = oddsOfSuccess;
    this.oddsOfUncertainty = oddsOfUncertainty;
    this.inDefault = inDefault;
    this.deck = null;
    this.GetImage = function () {
        return ColinWielgaCards.imageList[Math.floor(Math.random() * ColinWielgaCards.imageList.length)];
    };
    this.image = this.GetImage();
    this.getImage = function () {
        return "images/ww2Photos/" + this.image + ".jpg";
    };
    this.getHtml = function () {
        return "modules/colin-wielga-cards/QualOutcomeCard.html";
    };
    this.getOddsOfSuccess = function () {
        return this.oddsOfSuccess;
    };
    this.getOddsOfUncertainty = function () {
        return this.oddsOfUncertainty;    
    };
    this.discardMessage = name + " - " + oddsOfSuccess + " - " + oddsOfUncertainty;
};

//var uncertaintyX = Math.round(Math.random(100)*10);
//var successY = Math.round(Math.random(100)*10);

var cardList = [
    //new ColinWielgaCards.QualOutcomeCard("{FB637FA0-CC04-4DC3-BAE3-2FFB3B09C959}", "TRUE NUETRAL", "NUETRAL", "Randomly generated certainty, what could go wrong? ", uncertaintyX + "%", successY + "%", true), 
    new ColinWielgaCards.QualOutcomeCard("{F31F0B29-BDB0-4C7B-9D4E-2A23A9E440EF}", "UNKNOWN ORIGIN", "NUETRAL", "Fact: if successful, invent a cool and reasonable fact about the world. ", "0%","50%", true),
    //new ColinWielgaCards.QualOutcomeCard("{9BF02CAA-0883-4D95-ABDF-DCED043EFB08}", "ANIMAL FRIEND", "NUETRAL", "A small animal has decided to follow you around. ", "10%", "40%", true),
    new ColinWielgaCards.QualOutcomeCard("{A0493DC7-F90A-4E0B-9D40-32BAB80E33A8}", "RANDOM ENCOUNTER", "NUETRAL", "Discard this card to interrupt any action. Increase the Cloud of Uncertainty by one step. ", "20%", "40%", true),
    //new ColinWielgaCards.QualOutcomeCard("{935019DC-C181-4BB1-B49B-A3E0848A1F1C}", "FLASHBACK", "NUETRAL", "Discard this card to have flashback with one or more other chacters. The CM will decide if the Cloud of Uncertainty should increase or decrease. ", "25%", "35%", true),
    new ColinWielgaCards.QualOutcomeCard("{5F960058-B513-4D9A-A0ED-A0A43C8CBCBD}", "ATLANTYS", "ALIEN ARTIFACT", "Invisibility: Once per day, become invisible and add +10% success for the duration of one encounter. ", "","", true),
    new ColinWielgaCards.QualOutcomeCard("{05E19267-BAC8-4972-9E24-A4ECC5876779}", "ATLANTIC", "ALIEN ARTIFACT", "A phaser with different settings in a language you cannot read. ", "40%","25%", true),
    new ColinWielgaCards.QualOutcomeCard("{60A78845-8762-4FDE-A4C0-4F15ACAB0CFF}", "ATLANTES", "ALIEN ARTIFACT", "Make your own alien artifact (with CM approval). ", "%","%", true),
    new ColinWielgaCards.QualOutcomeCard("{7046335B-224C-4EA5-A862-F853661E27B0}", "ATLANTUS ", "ALIEN ARTIFACT", "Portable force field, one time use per day lasts for one action. ", "20%","60%", true),
    new ColinWielgaCards.QualOutcomeCard("{5AD1139D-FA32-4A2A-B678-C3466081E7B5}", "ATLANTS", "ALIEN ARTIFACT", "Chemical breath that puts lifeforms to sleep. ", "20%","40%", true),
    new ColinWielgaCards.QualOutcomeCard("{4DD4A14E-9454-4536-97C2-578FE294E57A}", "COLD WEREBEAR", "ALIEN ARTIFACT", "Slowing effect on your attacks, but you always have lowest initiative. ", "6%","40%", true),
    new ColinWielgaCards.QualOutcomeCard("{AD4E32EA-5B49-4C72-A06B-BCCFC5EAFF7F}", "ATLANTIAN", "ALIEN ARTIFACT", "Atlantian made remote control drone. ", "5%","50%", true),
    new ColinWielgaCards.QualOutcomeCard("{4EEC15F2-21BB-4821-86FD-5AD9B2C2131D}", "ATLANTACE", "ALIEN ARTIFACT", "Every time you fail using this gadget, roll 1d10, if you roll a number lower than the number of failures you've had, you are horribly maimed. ", "20%","40%", true),
    new ColinWielgaCards.QualOutcomeCard("{4EA9C4D1-87B9-4B60-8487-4EBE2620938B}", "HAUNTED", "ALIEN ARTIFACT", "Any time you try and fail to use alien technology; or if alien technology is successfully employed against you, increase the Cloud of Uncertainty.", "20%","45%", true),
    new ColinWielgaCards.QualOutcomeCard("{AE170BB5-ABC5-4435-A415-DB6D3732404D}", "FUNGAL", "ALIEN ARTIFACT", "Whenever anyone in your party fails, increase the Cloud of Uncertainty. If the Cloud is over 60%, you acquire the knowledge to make fungal mind control helmets. ", "5%","40%", true),
    new ColinWielgaCards.QualOutcomeCard("{3D083342-9F22-47B9-8148-E1AC7D053D98}", "NOCTURNAL INSECTOID", "ALIEN ARTIFACT", "+10% success in lowlight/darkness. Take an additional hit, for every hit you take. ", "5%","50%", true),
    new ColinWielgaCards.QualOutcomeCard("{2AF06522-6235-4968-A8F3-AFAAA7AF78DC}", "ATLANTOS", "ALIEN ARTIFACT", "Hold: explain how to appease this item; if it is pleased +10% success, if it is unhappy -10% success. Expound on why this object won't leave your posession. ", "20%","20%", true),
    new ColinWielgaCards.QualOutcomeCard("{500B6195-5AC0-4822-8B16-5BCB8AB940C8}", "INSECTOID", "ALIEN ARTIFACT", "You can no longer breathe Earth's air, and you can spit corrosive acid. ", "6%","44%", true),
    new ColinWielgaCards.QualOutcomeCard("{E79A7AC7-01C9-40CA-9C1F-525768D5E54E}", "SUBTERRANEAN INSECTOID", "ALIEN ARTIFACT", "Your body secretes slime unpredictably. ", "6%","44%", true),
    new ColinWielgaCards.QualOutcomeCard("{F5C171E3-69B3-4BAC-9BDC-04C7C8E8EFEC}", "AVIAN FLYER", "ALIEN ARTIFACT", "An entity is hunting you for a wind-up personal flight contraption. ", "7%","40%", true),
    new ColinWielgaCards.QualOutcomeCard("{6AE0F473-0200-442E-A64A-9A846D87A56F}", "ATLANTIS", "ALIEN ARTIFACT", "+10% chance of success when utilizing water. ", "8%","40%", true),
    new ColinWielgaCards.QualOutcomeCard("{0A20CEF3-1EC2-4C28-9030-F58E9B3869E2}", "ATLANTA", "ALIEN ARTIFACT", "The blood boiler, you may draw up to 4 random uncertainty cards. ", "20%","50%", true),
    new ColinWielgaCards.QualOutcomeCard("{7C4EEB81-EECE-475E-971D-8E42F60461DF}", "WEREBEAR", "ALIEN ARTIFACT", "Pick one, bonus protection from cold or hot elements? ", "4%","60%", true),
    new ColinWielgaCards.QualOutcomeCard("{B602D13C-FEC9-471D-A6BC-9BD520CAB607}", "ATLANTAS", "ALIEN ARTIFACT", "Take one extra action if you have the highest initiative, take a hit for each time you have triggered this. ", "20%", "50%", true),
    new ColinWielgaCards.QualOutcomeCard("{846352C6-C233-4508-B7C6-73B20B36B9C8}", "AVIAN FIGHTER", "ALIEN ARTIFACT", "Hunting talisman, an extendable light weight spear/club. ", "5%","45%", true),   
    new ColinWielgaCards.QualOutcomeCard("{018F6F3C-B8E2-4C26-9468-DE1EA9968EB8}", "MECHANICAL VIPER APPENDAGE", "SPY GADGET", "A spring loaded device. ", "6%","45%", true),
    new ColinWielgaCards.QualOutcomeCard("{F76BC99A-FEFF-40E1-81AB-09CC25D979E0}", "ATLATL", "SPY GADGET", "+10% success for throwing grappling hooks/harpoons. ", "7%","40%", true),
    new ColinWielgaCards.QualOutcomeCard("{75D52CDB-E3CE-4BD2-882D-2B2C9ACBD6FC}", "ATLAS", "SPY GADGET", "+10% success when referring to a reliable map or information.", "8%","40%", true),
    new ColinWielgaCards.QualOutcomeCard("{7A554276-8F9F-422F-AAC2-E3CA2B575788}", "CATALYST", "SPY GADGET", "A quick acting DNA comparison testing device. ", "8%","36%", true),
    new ColinWielgaCards.QualOutcomeCard("{A8585373-497A-476C-B909-57FEBED9BB3D}", "BELT BUCKLE GUN", "SPY GADGET", "Four barrels, each with its own trigger. ", "","", true),   
    new ColinWielgaCards.QualOutcomeCard("{AC8E6BC9-8C7E-4C23-9CF5-0A053F9CA029}", "MINI FLAMETHROWER", "SPY GADGET", "Requires buffet tray heater gas cartidge. ", "","", true),  
    new ColinWielgaCards.QualOutcomeCard("{581CFD80-1B9E-4B86-B3D7-88F8EB1854EB}", "PROPAGANDIST", "SPY GADGET", "Universal translator. ", "20%","40%", true),
    new ColinWielgaCards.QualOutcomeCard("{92AC6554-AE63-4779-AAC6-73582A32070C}", "ENTROPY", "SPY GADGET", "All your skill checks have +5% chance of success; but everytime you get an uncertain outcome, increase the Cloud of Uncertainty. ", "6%","60%", true),
    new ColinWielgaCards.QualOutcomeCard("{5DF25620-5369-41DE-AD94-DA84CCCD7F34}", "EXPLOSIVE", "SPY GADGET", "Detonator extraordinaire, -10% uncertainty when using explosives. ", "6%","60%", true),
    new ColinWielgaCards.QualOutcomeCard("{DBDC3767-C275-4838-A472-077D7C162D93}", "NEURALIZER", "SPY GADGET", "You may attempt to alter memories, if you fail, increase the Cloud of Uncertainty. ", "40%","20%", true),
    new ColinWielgaCards.QualOutcomeCard("{CE0C01BD-D9EB-47A3-BDEF-C424D0C5DE94}", "ANTEDILUVIAN", "SPY GADGET", "Ignore the Cloud of Uncertainty when making skill checks completely submerged in water. ", "20%","40%", true),
    new ColinWielgaCards.QualOutcomeCard("{15D3D15F-6025-4488-AB1B-85C0E6EF1684}", "EPHEMERAL", "SPY GADGET", "You can see ghosts. ", "30%","35%", true),
    new ColinWielgaCards.QualOutcomeCard("{12AC575C-FC97-4472-A80C-88A8E02C1B99}", "ACES", "SPY GADGET", "Bullet proof vest. ", "6%","45%", true),
    new ColinWielgaCards.QualOutcomeCard("{4E5372BC-F2F1-4EDC-9345-8B451F5017BD}", "ANTHROMORPH", "SPY GADGET", "Pick one, you have considerably improved sight, hearing, or smell. ", "5%","40%", true),
    new ColinWielgaCards.QualOutcomeCard("{EE8F0CAB-5873-4530-BC54-014000CE64ED}", "PIP", "SPY GADGET", "A crisp 50 dollar bill. ", "10%","45%", true),
    new ColinWielgaCards.QualOutcomeCard("{2E441CF5-6FF1-4A4F-A9E4-AC14E3FF59A7}", "FAKE PACK OF CIGARETTES", "SPY GADGET", "Secretive video recording device. ", "","", true),
    new ColinWielgaCards.QualOutcomeCard("{00AB75F2-94CF-4253-8A96-D5BA1498D80E}", "IAIJUTSU", "SPY GADGET", "Deal double damage if you attack from having your sword sheathed. ", "5%","55%", true),
    new ColinWielgaCards.QualOutcomeCard("{872A37B4-549D-49D9-BC06-D2D63A9276A0}", "LASER WATCH", "SPY GADGET", "Discard this card, you or another player may discard any Hold card. ", "20%","50%", true),
    new ColinWielgaCards.QualOutcomeCard("{046C06DE-2CF1-4017-A647-B2E23E500D1E}", "BALLOON BOMB", "SPY GADGET", "Floats to a specified altitude, then drops. ", "9%","45%", true),
    new ColinWielgaCards.QualOutcomeCard("{3F7E1A19-8069-4D3B-A904-C4173048C35A}", "ANTIMATTER", "SPY GADGET", "The most unstable element in the Universe. ", "100%","%", true),
    
    ];

ColinWielgaCards.QualOutcomeDeck = new ColinWielgaCards.Deck("{81FB0469-1679-46E4-A47A-D40A31B44784}", "Qualitative Outcome Deck", cardList);

ColinWielgaCards.decklist.push(ColinWielgaCards.QualOutcomeDeck);
