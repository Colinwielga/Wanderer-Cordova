ColinWielgaCards.FlosfulgurCard = function (guid, name, polyID, polyPoints, value, adjective, ability, inDefault, color) {
    this.inDefault = inDefault;
    this.guid = guid;
    this.name = name;
    this.polyID = polyID;
    this.polyPoints = polyPoints;
    this.value = value;
    this.adjective = adjective;
    this.ability = ability;
    var that = null;
    this.color = color;
    this.getHtml = function () {
        return "modules/colin-wielga-cards/FlosfulgurCard.html";
    };
};

var cardList =
    [
        new ColinWielgaCards.FlosfulgurCard("fulgon-0-0-0-0", "null averse", "0-0-0", "", "0", "ignorant", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-0-0-0-1", "axiomatic null", "0-0-0", "", "0", "zero", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-0-0-0-2", "unific null", "0-0-0", "", "0", "everything and nothing", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-0-0-0-3", "chaotic null", "0-0-0", "", "0", "vacuous", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-0-0-0-4", "agnostic null", "0-0-0", "", "0", "what?", "", true, "4"),


        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-0-0", "axis defiant", "2-0-0", "", "2", "fuck axes", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-0-1", "first axis", "2-0-0", "", "2", "two", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-0-2", "axis", "2-0-0", "", "2", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-0-3", "axis", "2-0-0", "", "2", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-0-4", "axis", "2-0-0", "", "2", "", "", true, "4"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-30-0", "axis derisive", "2-0-30", "", "6", "ugly axis", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-30-1", "second axis", "2-0-30", "", "6", "six", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-30-2", "axis", "2-0-30", "", "6", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-30-3", "axis", "2-0-30", "", "6", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-30-4", "axis", "2-0-30", "", "6", "", "", true, "4"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-60-0", "axis evasive", "2-0-60", "", "11", "taxes", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-60-1", "third axis", "2-0-60", "", "11", "eleven", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-60-2", "axis", "2-0-60", "", "11", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-60-3", "axis", "2-0-60", "", "11", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-2-0-60-4", "axis", "2-0-60", "", "11", "", "", true, "4"),

        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-0-0", "trigon", "3-0-0", "29,4 54,47.3 4,47.3", "1", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-0-1", "first trigon", "3-0-0", "29,4 54,47.3 4,47.3", "1", "one", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-0-2", "trigon", "3-0-0", "29,4 54,47.3 4,47.3", "1", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-0-3", "trigon", "3-0-0", "29,4 54,47.3 4,47.3", "1", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-0-4", "trigon", "3-0-0", "29,4 54,47.3 4,47.3", "1", "", "", true, "4"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-30-0", "trigon", "3-0-30", "29,4 54,47.3 4,47.3", "5", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-30-1", "second trigon", "3-0-30", "29,4 54,47.3 4,47.3", "5", "five", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-30-2", "trigon", "3-0-30", "29,4 54,47.3 4,47.3", "5", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-30-3", "trigon", "3-0-30", "29,4 54,47.3 4,47.3", "5", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-30-4", "trigon", "3-0-30", "29,4 54,47.3 4,47.3", "5", "", "", true, "4"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-60-0", "trigon", "3-0-60", "29,4 54,47.3 4,47.3", "8", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-60-1", "third trigon", "3-0-60", "29,4 54,47.3 4,47.3", "8", "eight", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-60-2", "trigon", "3-0-60", "29,4 54,47.3 4,47.3", "8", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-60-3", "trigon", "3-0-60", "29,4 54,47.3 4,47.3", "8", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-60-4", "trigon", "3-0-60", "29,4 54,47.3 4,47.3", "8", "", "", true, "4"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-90-0", "trigon", "3-0-90", "29,4 54,47.3 4,47.3", "12", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-90-1", "fourth trigon", "3-0-90", "29,4 54,47.3 4,47.3", "12", "twelve", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-90-2", "trigon", "3-0-90", "29,4 54,47.3 4,47.3", "12", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-90-3", "trigon", "3-0-90", "29,4 54,47.3 4,47.3", "12", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-3-0-90-4", "trigon", "3-0-90", "29,4 54,47.3 4,47.3", "12", "", "", true, "4"),

        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-0-0", "tetragon", "4-0-0", "4,4 54,4 54,54 4,54", "3", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-0-1", "first first tetragon", "4-0-0", "4,4 54,4 54,54 4,54", "3", "three", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-0-2", "tetragon", "4-0-0", "4,4 54,4 54,54 4,54", "3", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-0-3", "tetragon", "4-0-0", "4,4 54,4 54,54 4,54", "3", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-0-4", "tetragon", "4-0-0", "4,4 54,4 54,54 4,54", "3", "", "", true, "4"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-30-0", "tetragon", "4-0-30", "4,4 54,4 54,54 4,54", "7", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-30-1", "second first tetragon", "4-0-30", "4,4 54,4 54,54 4,54", "7", "seven", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-30-2", "tetragon", "4-0-30", "4,4 54,4 54,54 4,54", "7", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-30-3", "tetragon", "4-0-30", "4,4 54,4 54,54 4,54", "7", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-30-4", "tetragon", "4-0-30", "4,4 54,4 54,54 4,54", "7", "", "", true, "4"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-60-0", "tetragon", "4-0-60", "4,4 54,4 54,54 4,54", "10", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-60-1", "third first tetragon", "4-0-60", "4,4 54,4 54,54 4,54", "10", "ten", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-60-2", "tetragon", "4-0-60", "4,4 54,4 54,54 4,54", "10", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-60-3", "tetragon", "4-0-60", "4,4 54,4 54,54 4,54", "10", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-0-60-4", "tetragon", "4-0-60", "4,4 54,4 54,54 4,54", "10", "", "", true, "4"),

        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-0-0", "tetragon", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-0-1", "first second tetragon", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "two", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-0-2", "tetragon", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-0-3", "tetragon", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-0-4", "tetragon", "4-1-0", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "2", "", "", true, "4"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-30-0", "tetragon", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-30-1", "second second tetragon", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "four", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-30-2", "tetragon", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-30-3", "tetragon", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-30-4", "tetragon", "4-1-30", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "4", "", "", true, "4"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-60-0", "tetragon", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "6", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-60-1", "third second tetragon", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "6", "six", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-60-2", "tetragon", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "6", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-60-3", "tetragon", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "6", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-60-4", "tetragon", "4-1-60", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "6", "", "", true, "4"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-90-0", "tetragon", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "8", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-90-1", "fourth second tetragon", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "8", "eight", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-90-2", "tetragon", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "8", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-90-3", "tetragon", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "8", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-90-4", "tetragon", "4-1-90", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "8", "", "", true, "4"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-120-0", "tetragon", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "10", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-120-1", "fifth second tetragon", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "10", "ten", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-120-2", "tetragon", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "10", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-120-3", "tetragon", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "10", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-120-4", "tetragon", "4-1-120", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "10", "", "", true, "4"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-150-0", "tetragon", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "12", "", "", true, "0"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-150-1", "sixth second tetragon", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "12", "twelve", "", true, "1"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-150-2", "tetragon", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "12", "", "", true, "2"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-150-3", "tetragon", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "12", "", "", true, "3"),
        new ColinWielgaCards.FlosfulgurCard("fulgon-4-1-150-4", "tetragon", "4-1-150", "52.3,4 100.6,16.95 52.3,29.9 4,16.95", "12", "", "", true, "4"),

        // new ColinWielgaCards.FlosfulgurCard("{61DE97D5-75FB-417E-B9AF-521389DFDBFD}", "Undiscovered", "4-2-0", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{69495F30-1EC9-447A-B19E-07F9E5798325}", "Undiscovered", "4-2-30", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{C52BBAAB-6019-43D0-9C45-FBDE98D047C7}", "Undiscovered", "4-2-60", "4,29 47.3,4 90.6,29 47.3,54", "4", "unknown", "+5 if you're working with someone else.", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{FD54B0B6-6386-4DCC-8EC0-72E659825D50}", "Undiscovered", "4-2-90", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{C1682B9B-81C7-4FD1-9200-0393D7C62A83}", "Undiscovered", "4-2-120", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "-5 if you can pass critically.", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{4AF3E6CC-AC36-48AE-BA2C-9F511EF52E30}", "Undiscovered", "4-2-150", "4,29 47.3,4 90.6,29 47.3,54", "5", "unknown", "+5 if you can pass critically.", true, "0"),

        // new ColinWielgaCards.FlosfulgurCard("{6EE42779-5B69-4D78-955C-69132017F81E}", "Undiscovered", "5-0-0", "4,4 54,4 97.3,29 54,54 4,54", "5", "unknown", "Take 1 hit if you fail.", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{C9B94682-B223-4B06-85BB-FA06A0761EF3}", "Undiscovered", "5-0-30", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{8D74398B-9603-4CAB-89CA-904C46154844}", "Undiscovered", "5-0-60", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{8D029FAC-EA08-46DE-AF8B-474B4E84A1A3}", "Undiscovered", "5-0-90", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Recover 1 hit if you fail.", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{28FD7C44-5271-443F-9834-4033B0E9F796}", "Undiscovered", "5-0-120", "4,4 54,4 97.3,29 54,54 4,54", "6", "unknown", "Coin: Recover 1 hit if heads, take 1 hit if tails.", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{41B75454-D8D4-4973-AE17-BF7E928F51C2}", "Undiscovered", "5-0-150", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{6B23F519-41C6-4374-873D-975C3DDD30E2}", "Undiscovered", "5-0-180", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{D5FB1D9C-7E61-4E7D-B3BF-3704856AF558}", "Undiscovered", "5-0-210", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{6D91AC5E-3C4B-4DE7-9C82-891D8C40DACD}", "Undiscovered", "5-0-240", "4,4 54,4 97.3,29 54,54 4,54", "7", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{772C9810-F49F-4E45-BD8B-A099DCE7F161}", "Undiscovered", "5-0-270", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{A5B756AF-02B5-414B-A696-B40F01BA24CF}", "Undiscovered", "5-0-300", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{CBFE47F3-816B-488B-ADEC-293724854AB6}", "Undiscovered", "5-0-330", "4,4 54,4 97.3,29 54,54 4,54", "8", "unknown", "unknown", true, "0"),

        // new ColinWielgaCards.FlosfulgurCard("{20DD145A-A530-4528-BC5F-D3A4E3C3EDE5}", "Thou", "6-0-0", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "8", "multiconscious", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{BA53FE7B-29E1-482A-BADE-66CF272A8BBD}", "Undiscovered", "6-0-30", "29,4 79,4 104,47.3 79,90.6 29,90.6 4,47.3", "9", "unknown", "unknown", true, "0"),

        // new ColinWielgaCards.FlosfulgurCard("{69D9F6C9-2E3C-4FE1-B4C1-DF3A2DCD2840}", "Undiscovered", "6-1-0", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{12962C70-6E74-4AD5-B2EB-3D2E2003CF2D}", "Undiscovered", "6-1-30", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{8239348E-3E04-4828-B72F-5CF26DB56714}", "Undiscovered", "6-1-60", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "9", "unknown", "Coin: All mixed results this round are passes if heads, all mixed results this round are failures if tails.", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{AADB2373-0DBD-4257-9EAC-A4E585B18F75}", "Undiscovered", "6-1-90", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{F375E1DE-9777-49AE-9D8E-35E9796B0918}", "Undiscovered", "6-1-120", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{1D556B79-36F8-43FD-B4C6-0FBD4681BC2B}", "Undiscovered", "6-1-150", "47.3,4 97.3,4 140.6,29 97.3,54 47.3,54 4,29", "10", "unknown", "unknown", true, "0"),

        // new ColinWielgaCards.FlosfulgurCard("{FA584D76-013C-46E8-BF93-68421D1C267A}", "Undiscovered", "6-2-0", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "10", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{28C04740-4D18-47CA-9F42-F8DA2A328964}", "Undiscovered", "6-2-30", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{B90B2E54-D8AE-474E-9107-F360E83512E0}", "Undiscovered", "6-2-60", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{EAEEFECE-1E4F-49BB-9EC0-25FAA5A06AE5}", "Undiscovered", "6-2-90", "52.3,4 89.1,39.35, 100.6,87.7 52.3,100.6 4,87.7 17,39.35", "11", "unknown", "unknown", true, "0"),

        // new ColinWielgaCards.FlosfulgurCard("{D828A35C-81D9-466F-95B4-61A041B9D204}", "Undiscovered", "6-3-0", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "11", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{1FBE16CC-D26F-467A-AFEB-9D60F31EDD6B}", "Undiscovered", "6-3-30", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{F36084E2-35BD-4046-A417-F7A990DC2A1A}", "Undiscovered", "6-3-60", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{5AA8E07B-79C3-46A6-94B1-191C50DDB423}", "Undiscovered", "6-3-90", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "unknown", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{1B5452BF-B24C-4D0F-94CE-490C09773257}", "Undiscovered", "6-3-120", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "12", "unknown", "Discard: Pick someone else. Their next pass becomes mixed.", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{7691A802-92C0-4718-88BF-1C4E7CBEA3B9}", "Undiscovered", "6-3-150", "4,4 54,4, 79,47.3 79,97.3 29,97.3 4,54", "13", "unknown", "You don't act in the next round if you pass.", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{46C8FCDF-C192-4626-ACEF-3C501F5C3322}", "Undiscovered", "6-4-0", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Pick someone else. They don't act in the next round.", true, "0"),

        // new ColinWielgaCards.FlosfulgurCard("{BFC0D515-1C18-4A2C-9802-0272B73C3ED6}", "Undiscovered", "6-4-30", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Discard: Pick 2 people. They each recover 1 hit.", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{F4B89B69-87FE-442D-94D9-44FFEA50B551}", "Undiscovered", "6-4-60", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "13", "unknown", "Hold: +2 to cards you play while defending against a melee attack.", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{7877CD1E-2E39-4465-8B16-DE9C3732BE05}", "Undiscovered", "6-4-90", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: +2 to cards you play while defending against a ranged attack.", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{34EF9814-B15F-472F-82AA-C44980A0B9DD}", "Undiscovered", "6-4-120", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: +2 to cards you play while attempting to lie.", true, "0"),
        // new ColinWielgaCards.FlosfulgurCard("{EA9B3F95-FB2D-4B43-98D2-5D506ABAF326}", "Undiscovered", "6-4-150", "29,4 79,4 79,54 54,97.3 4,97.3 4,47.3", "14", "unknown", "Hold: You're allowed to tell other players what you have in your hand.", true, "0"),
    ];

ColinWielgaCards.FlosfulgurDeck = new ColinWielgaCards.Deck("flosfulgur-deck", "Flosfulgur Deck", cardList);


ColinWielgaCards.decklist.push(ColinWielgaCards.FlosfulgurDeck);
