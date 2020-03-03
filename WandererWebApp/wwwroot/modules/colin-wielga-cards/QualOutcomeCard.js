ColinWielgaCards.imageList = [
    "Adelaide",
    "AirSuperiority",
    "ArcDTriumph",
    "BackyardAirShelter",
    "BeachLanding",
    "BikingOverRuins",
    "Bougainville",
    "Broadside",
    "Bunker",
    "CapturedHardware",
    "ConcertParty",
    "Convoy",
    "CookRations",
    "DownedPlane",
    "DisplacedPersonsCamp",
    "EgyptianWomen",
    "Electricity",
    "ExhibitionBuildingMelbourne",
    "Explosion",
    "FarouksCarriage",
    "FightingStreetByStreet",
    "Fountain",
    "FrankSFriendsTatura",
    "HaircutPunishment",
    "Harvesting",
    "Howitzer",
    "KarnakLuxor",
    "Lifeboats",
    "Maps",
    "Marching",
    "Medic",
    "Memorialize",
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
    "POWFuneral",
    "PrisonerOfWarCamp",
    "Puckapunyal",
    "QuislingExecution",
    "RedCross",
    "Sailing",
    "Saipan",
    "Segregated",
    "SixteenInchGuns",
    "StrategyMeeting",
    "StreetSceneGaza",
    "SupplyQueueSalzgitter",
    "Surrender",
    "TankWelding",
    "TugBoat",
    "USSSouthDakota",
    "WaterBuffalo"
];

ColinWielgaCards.QualOutcomeCard = function (guid, name, text, oddsOfSuccess, oddsOfUncertainty) {
    this.guid = guid;
    this.name = name;
    this.text = text;
    this.oddsOfSuccess = oddsOfSuccess;
    this.oddsOfUncertainty = oddsOfUncertainty;
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

var cardList = [

    new ColinWielgaCards.QualOutcomeCard("{B602D13C-FEC9-471D-A6BC-9BD520CAB607}", "ATLANTACE - ALIEN ARTIFACT", "Discard another card in addition to this card, draw three cards.", "5%", "45%"),
    new ColinWielgaCards.QualOutcomeCard("{4EEC15F2-21BB-4821-86FD-5AD9B2C2131D}", "ATLANTAS - ALIEN ARTIFACT", "You may not discard this card. Whenever you fail, increase the Cloud of Uncertainty. Describe why you can't get rid of this carryable alien object. ", "10%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{7046335B-224C-4EA5-A862-F853661E27B0}", "ATLANTUS - ALIEN ARTIFACT", "Discard this card to add 15% uncertainty to an NPC's next roll.", "5%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{2AF06522-6235-4968-A8F3-AFAAA7AF78DC}", "ATLANTOS - ALIEN ARTIFACT", "If you pass a skill check within Atlantis, decrease the Cloud of Uncertainty. Explain how this item ended up in your possession, and why it causes you to be hunted. ", "0%","50%"),
    new ColinWielgaCards.QualOutcomeCard("{5F960058-B513-4D9A-A0ED-A0A43C8CBCBD}", "ATLANTYS - ALIEN ARTIFACT", "+15% success when making a skill check within Atlantis.", "5%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{60A78845-8762-4FDE-A4C0-4F15ACAB0CFF}", "ATLANTES - ALIEN ARTIFACT", "+10% success when navigating or searching.", "%","%"),
    new ColinWielgaCards.QualOutcomeCard("{0A20CEF3-1EC2-4C28-9030-F58E9B3869E2}", "ATLANTA - ALIEN ARTIFACT", "You may not discard this card. Whenever you fail, increase the Cloud of Uncertainty.  Describe why you can't get rid of this carryable alien object. ", "%","%"),
    new ColinWielgaCards.QualOutcomeCard("{5AD1139D-FA32-4A2A-B678-C3466081E7B5}", "ATLANTS - ALIEN ARTIFACT", "If you succeed, add 10% chance of success to your next roll.", "20%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{F31F0B29-BDB0-4C7B-9D4E-2A23A9E440EF}", "ATLANTIAN - ALIEN ARTIFACT", "Fact: if successful, invent a reasonable fact about the world. ", "0%","50%"),
    new ColinWielgaCards.QualOutcomeCard("{05E19267-BAC8-4972-9E24-A4ECC5876779}", "ATLANTIC - ALIEN ARTIFACT", "This artifact imbues the carrier with oceanic prowess. If you fail any check you must lose an important personal item. ", "10%","55%"),
    new ColinWielgaCards.QualOutcomeCard("{7C4EEB81-EECE-475E-971D-8E42F60461DF}", "ALEPH - ALIEN ARTIFACT", "If you have the highest initiative, take an extra action each round; but also take one hit and increase the Cloud of Uncertainty. ", "5%","43%"),
    new ColinWielgaCards.QualOutcomeCard("{846352C6-C233-4508-B7C6-73B20B36B9C8}", "ANTICIPATION - ALIEN ARTIFACT", "+5 towards initiative rolls.", "5%","45%"),   
    new ColinWielgaCards.QualOutcomeCard("{500B6195-5AC0-4822-8B16-5BCB8AB940C8}", "ANCIENT - ALIEN ARTIFACT", "Go into a flashback, the other players will play ghosts visitng and altering your character's past.  You may do this once per session and decrease the Cloud of Uncertainty. ", "6%","44%"),
    new ColinWielgaCards.QualOutcomeCard("{3D083342-9F22-47B9-8148-E1AC7D053D98}", "ABSTRACTIONIST - ALIEN ARTIFACT", "If you fail with this card, -10% chance of success on your next roll.", "5%","50%"),
    new ColinWielgaCards.QualOutcomeCard("{AE170BB5-ABC5-4435-A415-DB6D3732404D}", "ATONEMENT - ALIEN ARTIFACT", "You may not discard this card. Choose one: Increase the Cloud of Uncertainty .", "5%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{4DD4A14E-9454-4536-97C2-578FE294E57A}", "ATTACHMENTS - ALIEN ARTIFACT", "If you fail with this card, one of your possessions is lost or damaged.", "6%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{F5C171E3-69B3-4BAC-9BDC-04C7C8E8EFEC}", "ADOLESCENTS - ALIEN ARTIFACT", "-10% uncertainty when using old technology. ", "7%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{6AE0F473-0200-442E-A64A-9A846D87A56F}", "ATHLETICS - ALIEN ARTIFACT", "+10% chance of success when making an athletic skill check.", "8%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{AD4E32EA-5B49-4C72-A06B-BCCFC5EAFF7F}", "METASTASIS - ALIEN ARTIFACT", "A new enemy or problem presents itself if you succeed.", "5%","50%"),
    new ColinWielgaCards.QualOutcomeCard("{4EA9C4D1-87B9-4B60-8487-4EBE2620938B}", "HAUNTED - ALIEN ARTIFACT", "You may not discard this card.  Any time you try and fail to use alien technology; or if alien technology is successfully employed against you, increase the Cloud of Uncertainty.", "%","%"),
    

    new ColinWielgaCards.QualOutcomeCard("{19EED157-F42D-4E1A-BA93-6A9A1422E836}", "APPRENTICE - SPY GADGET", "Increase the Cloud of Uncertainty if you are attempting an action you haven't taken before. ", "5%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{018F6F3C-B8E2-4C26-9468-DE1EA9968EB8}", "APPENDAGE - SPY GADGET", "If you fail with this card, lose a major body part. ", "6%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{4E5372BC-F2F1-4EDC-9345-8B451F5017BD}", "ANTHROMORPH - SPY GADGET", "If you fail when discarding this card, the Rakshasa assume your form. ", "5%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{2E441CF5-6FF1-4A4F-A9E4-AC14E3FF59A7}", "APPOLOGIST - SPY GADGET", "If you get someone to forgive somebody else, you may take an extra action the next time you are in danger. ", "4%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{00AB75F2-94CF-4253-8A96-D5BA1498D80E}", "ATTRITION - SPY GADGET", "If you use this card to break a siege, you may draw two cards and discard one. ", "5%","55%"),
    new ColinWielgaCards.QualOutcomeCard("{92AC6554-AE63-4779-AAC6-73582A32070C}", "ANARCHIST - SPY GADGET", "You may not discard this card.  All your skill checks have +5% chance of success; but everytime you get an uncertain outcome, increase the Cloud of Uncertainty. ", "%","%"),
    new ColinWielgaCards.QualOutcomeCard("{12AC575C-FC97-4472-A80C-88A8E02C1B99}", "ACE - SPY GADGET", "Failing with this card can only count as simple failure.", "6%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{F76BC99A-FEFF-40E1-81AB-09CC25D979E0}", "ATLATL - SPY GADGET", "+10% success when throwing something.", "7%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{75D52CDB-E3CE-4BD2-882D-2B2C9ACBD6FC}", "ATLAS - SPY GADGET", "+10% success when referring to a reliable map or information.", "8%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{046C06DE-2CF1-4017-A647-B2E23E500D1E}", "ANTAGONIST - SPY GADGET", "Draw an additional card if you succeed in sabotaging. ", "9%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{15D3D15F-6025-4488-AB1B-85C0E6EF1684}", "EPHEMERAL - SPY GADGET", "When discarding a card you may use percentages on this card instead of the discarded cards ", "30%","35%"),
    new ColinWielgaCards.QualOutcomeCard("{7A554276-8F9F-422F-AAC2-E3CA2B575788}", "CATALYST - SPY GADGET", "Describe how your actions set off a chain of events; within reason. ", "8%","36%"),
    new ColinWielgaCards.QualOutcomeCard("{EE8F0CAB-5873-4530-BC54-014000CE64ED}", "ADONIS - SPY GADGET", "If you succeed, all successes made by your team this round count as brilliant", "10%","45%"),
    new ColinWielgaCards.QualOutcomeCard("{DBDC3767-C275-4838-A472-077D7C162D93}", "DYNASTIC - SPY GADGET", "If you succeed, add 10% chance of success to your next roll.", "24%","38%"),
    new ColinWielgaCards.QualOutcomeCard("{AC8E6BC9-8C7E-4C23-9CF5-0A053F9CA029}", "ADVANTAGEOUS - SPY GADGET", "+10% chance of success if your battlefield position is higher/advantageous.", "20%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{5DF25620-5369-41DE-AD94-DA84CCCD7F34}", "ENTROPY - SPY GADGET", "You may not discard this card.  If you fail, all other failures (your teams, and all NPCs) count as catastrophic. Describe how you have been forced to keep this gadget with you. ", "%","%"),
    new ColinWielgaCards.QualOutcomeCard("{A8585373-497A-476C-B909-57FEBED9BB3D}", "OUTLANDISH - SPY GADGET", "+10% chance of success if the action being taken with this card involves your personal biology. ", "20%","40%"),   
    new ColinWielgaCards.QualOutcomeCard("{581CFD80-1B9E-4B86-B3D7-88F8EB1854EB}", "PROPAGANDIST - SPY GADGET", "Decrease the Cloud of Uncertainty one step whenever you successfully lie. ", "20%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{CE0C01BD-D9EB-47A3-BDEF-C424D0C5DE94}", "ANTEDILUVIAN - SPY GADGET", "God tier: ignore the Cloud of Uncertainty when making a skill check submerged water. ", "20%","40%"),
    new ColinWielgaCards.QualOutcomeCard("{872A37B4-549D-49D9-BC06-D2D63A9276A0}", "LASER BEAM - SPY GADGET", "Discard this card, you may discard a card with 'you may not discard this card'. ", "20%","40%")
];

ColinWielgaCards.QualOutcomeDeck = new ColinWielgaCards.Deck("{81FB0469-1679-46E4-A47A-D40A31B44784}", "Qualitative Outcome Deck", cardList);

ColinWielgaCards.decklist.push(ColinWielgaCards.QualOutcomeDeck);
