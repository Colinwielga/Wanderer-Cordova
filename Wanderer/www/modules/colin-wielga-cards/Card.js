ColinWielgaCards.AhlosainCard = function (guid,name, text, value,inDefault) {
    this.guid= guid;
    this.name = name;
    this.text = text;
    this.deck = null;
    this.value = value;
    this.inDefault = inDefault;
    this.getImage = function () {
        var id = this.id();
        // this feels like a hack
        // can i just use the name?
        while (id >= 100) {
            id -= 100;
        }
        return "images/cards/" + id + ".jpg";
    }
    this.getHtml = function () {
        return "modules/colin-wielga-cards/card.html"
    }
    this.getValue = function () {
        return this.value;
    }
};

// decrease by 3, keep it until it hits 0
// starts at 0, increase by three goes away at 12
// 0 all your other cards get a bonus
// 2 all your cards get a minus
// draw another card when you draw it

// you can only play this card if you have no cards in your hand + you can choose not to draw

// a card that is powerful if you are hurt

// order the top of you deck
// 10 during the day, 4 at night
// 10 during the night, 10 at night

// a card that is good when you are at low HP

// I think the plan is put some interesting cards that don't anything about your character in to the deck
// and make the god cards push you to play a certain way
// althought not the indifferent god cards
// the disfavor cards make you bad at the thing?
// maybe I should not even have disfavor cards

// todo make a deck constructor... 



//ColinWielgaCards.AhlosainDeck.prototype.toString = function () {
//    return this.name;
//}

var cardList =[
    new ColinWielgaCards.AhlosainCard("{A89FC9CD-FD95-4784-A491-41EB6D82227B}", "THE FOOL", "play at anytime to make someone make a mistake, 8 if you are drunk", "0", ColinWielgaCards.AhlosainDeck,true),// I hate this card
    new ColinWielgaCards.AhlosainCard("{777CF479-0630-4653-AD00-5DFA574D4828}", "THE MAGICAIN", "12 if pass is 8 or higher", "3", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{7C26A612-D5CF-4DC1-891D-70C65B6FA070}", "THE HIGH PRIESTESS", "when you play this card you may promise an offering to air-ah. if the DM finds it satifactory 12. if you fail to fufill you promise air-ah scorns you", "5", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{DA9712EC-5B22-4B68-9883-4B51C2F47D79}", "THE EMPRESS", "failure counts as failure with some gain", "12", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{BEE8F5D1-6EC8-4263-AC58-E9D856DF95ED}", "THE EMPEROR", "passes counts as passes at a cost", "10", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{E4FCE685-BCE3-4CED-B911-2DDF38E99C85}", "THE HIEROPHANT", "10, gain a fact if you fail", "10", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{46E83004-8B88-4CC8-BE0D-A68BCD12C68D}", "THE LOVERS", "11 if you are working with someone else", "3", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{92170D24-B987-47C2-BE41-0B27FE41C5B5}", "THE CHARIOT", "play this before the roll", "9", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{F2A459DE-5AA0-4B74-9A93-AB03F1E357EE}", "STRENGTH", "plus the last card played", "2", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{B3CD58C9-24E0-4EBA-88AA-245D364B8392}", "THE HERMIT", "reveal this card when you draw it", "2", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{7F117E39-9677-4FB6-B09C-874C28517EB9}", "WHEEL OF FORTUNE", "top card of the deck", "?", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{DAA114B8-FA0A-443E-8535-985A7B2D16B5}", "JUSTICE", "8 when another player plays a card you may play this to replace that card, draw a card", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{EF9F9967-E0B2-478D-8442-DD318CA3BBBB}", "THE HANGED MAN", "if you can play this card you must", "5", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{E3A09053-54A9-4A24-9978-D873ED1E72C3}", "DEATH", "0 or 15, flip a coin", "0/15", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{663E97CC-29D3-464E-BF63-DCC8708F5039}", "TEMPERANCE", "draw 2 cards", "4", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{5A414EB6-08A8-425B-8625-F769223C09D5}", "THE DEVIL", "take -2 on your next roll", "14", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{316F6316-6271-4B53-8FDF-14BE0BA9CBF5}", "THE TOWER", "you may keep this card after playing it, each time you do it's value decrease by 2", "10", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{3FAF86A5-FC13-49A4-ADAC-987C64CC6101}", "THE STAR", "reveal this card when you draw it", "10", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{28794A23-2746-4A3B-ADF0-79F372771E64}", "THE MOON", "10 when acting with the established order or conventionally", "4", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{9031BB6B-A797-4B62-8A97-9B3459CEAA64}", "THE SUN", "10 when acting against established order or outside the convention", "4", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{E300C08B-8198-47F3-9DCC-05E3B3E25583}", "JUDGEMENT", "any player may play a card to replace this. that player draws a card", "2", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{878EDA53-E308-4A39-83AF-3E0684F127B5}", "THE WORLD", "passes and failures are critcal", "8", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{8FBC14FE-36D8-49F8-8EE0-2A61ACC6DBC9}", "ACE OF WANDS", "", "1", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{A5D87141-E380-462A-96D5-2D4FE5896EF6}", "TWO OF WANDS", "", "2", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{4F92C332-AC93-41F0-A45E-AF1A4654DCE5}", "THREE OF WANDS", "", "3", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{2A275B0A-05DC-4AB5-9070-923F633E1A60}", "FOUR OF WANDS", "", "4", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{5E64A7B1-8995-47C9-841E-66D65D62A9BD}", "FIVE OF WANDS", "", "5", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{AC578D74-AE45-414D-BCAA-5C72DC3BB4D6}", "SIX OF WANDS", "", "6", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{2A566F41-B9F7-454E-B1FC-E62B2C5C58A9}", "SEVEN OF WANDS", "", "7", ColinWielgaCards.AhlosainDeck,true),
    new ColinWielgaCards.AhlosainCard("{DF4333B2-B1EF-4218-B07F-B80A876A1FA3}", "EIGHT OF WANDS", "", "8", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{AEFD7A9E-9CF3-47C7-B2BD-4C4748AC2BA0}", "NINE OF WANDS", "", "9", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{ED226454-DE05-499D-9C9E-AE1324DB6399}", "TEN OF WANDS", "", "10", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{A78522EB-CF0B-4EA4-BA78-67EA7B39CEB0}", "PAGE OF WANDS", "", "11", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{BC0ECE30-D7B3-44E6-8F2A-21C8DCAF373D}", "KNIGHT OF WANDS", "", "12", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{599CCAE2-279C-4EB2-B9F2-5600C09FCC78}", "QUEEN OF WANDS", "", "13", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{81126DFA-E39E-4D94-B5C0-90C455D1B84A}", "KING OF WANDS", "", "14", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{246F5271-B131-460A-BC3F-3E0B40310F5D}", "ACE OF CUPS", "", "1", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{60AE3569-C053-4F66-95F5-A854B84808D1}", "TWO OF CUPS", "", "2", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{A304FC00-8EB3-4094-9139-2C155F98F605}", "THREE OF CUPS", "", "3", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{EBD38DA9-5AD5-4B1E-89CE-AE2A116CA377}", "FOUR OF CUPS", "", "4", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{50C53182-2632-4ADC-A286-E14E11F8C2BB}", "FIVE OF CUPS", "", "5", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{1CB7B309-F93E-4149-8424-19C7DEE4F8C5}", "SIX OF CUPS", "", "6", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{ECE68CAF-A089-47C6-9708-5B4A5D08193C}", "SEVEN OF CUPS", "", "7", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{507626F0-E8F1-4AFC-893C-A1EEBEF15F28}", "EIGHT OF CUPS", "", "8", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{378AF126-2D1C-48A2-8896-1F00A53BFB4C}", "NINE OF CUPS", "", "9", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{574FBA33-5730-4445-9B01-045938207E05}", "TEN OF CUPS", "", "10", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{8617C197-E4FF-40B6-A4EC-EC02E0951CA2}", "PAGE OF CUPS", "", "11", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{E144B7F4-047A-4C21-B4FC-C58654E3B8B3}", "KNIGHT OF CUPS", "", "12", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{17A1B90E-25DA-4B6A-A6BE-51E3805C2B9D}", "QUEEN OF CUPS", "", "13", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{FCCCEE1E-4F34-49F4-810F-49F0FA7DD6A7}", "KING OF CUPS", "", "14", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{DAE4C90B-4D66-4207-9490-DC4337CABF2E}", "ACE OF SWORDS", "", "1", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{9DB56B7A-3230-4D3F-8A49-5F6F987329F5}", "TWO OF SWORDS", "", "2", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{436F7516-EDE4-430C-8117-E3D4A50B487F}", "THREE OF SWORDS", "", "3", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{5A5358DF-97E0-4026-A32C-CEC6BD2873F6}", "FOUR OF SWORDS", "", "4", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{D7C231C5-BD18-4AB9-834F-2273E32D57CA}", "FIVE OF SWORDS", "", "5", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{DC32F0AC-555B-4907-99B6-D33E0E2A0E6A}", "SIX OF SWORDS", "", "6", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{1EFB6FAE-5182-48F0-AD8D-280D9C5E7D3D}", "SEVEN OF SWORDS", "", "7", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{BE839800-E33F-43BF-936B-057DEE961C8A}", "EIGHT OF SWORDS", "", "8", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{6A294B34-5BEB-418A-9DD6-D19F056DF04A}", "NINE OF SWORDS", "", "9", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{DBEE4562-A2A8-41AC-8093-A424043CA30B}", "TEN OF SWORDS", "", "10", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{50C388FC-4409-4E30-B9DA-75F1A820B729}", "PAGE OF SWORDS", "", "11", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{39C7BE0B-8DF7-4F8B-9617-DA4AE9F97370}", "KNIGHT OF SWORDS", "", "12", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{91437D27-7EDC-4071-A481-94D6E7643093}", "QUEEN OF SWORDS", "", "13", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{B65DC445-161B-44F4-ABAE-58C649CA9420}", "KING OF SWORDS", "", "14", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{45AFE287-FE98-451F-A86E-61D33EC4F30E}", "ACE OF PENTACLES", "", "1", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{DC155653-27AE-47C4-AA72-813B83EEB654}", "TWO OF PENTACLES", "", "2", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{47655305-7CB6-4E57-A84B-CD1A3BB4DB7C}", "THREE OF PENTACLES", "", "3", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{64B40CC6-705E-4171-978C-0E65F9A367F3}", "FOUR OF PENTACLES", "", "4", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{15A0705F-617D-49CB-81ED-67FC9002846D}", "FIVE OF PENTACLES", "", "5", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{5D7214D2-F86C-43C6-B5F7-D491E536F580}", "SIX OF PENTACLES", "", "6", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{0D254EE6-DE14-4116-BAFB-C72101BD354A}", "SEVEN OF PENTACLES", "", "7", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{1D59387C-9A8A-49C2-9823-655635185B6C}", "EIGHT OF PENTACLES", "", "8", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{B03986EE-1F9E-4101-845C-2B128CDC8E40}", "NINE OF PENTACLES", "", "9", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{A8199985-6370-4221-B4EF-22599B46103E}", "TEN OF PENTACLES", "", "10", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{922A0C3C-E269-47A4-8115-4B14D27E9011}", "PAGE OF PENTACLES", "", "11", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{075CFD21-A076-4671-AA57-E05F953D40E6}", "KNIGHT OF PENTACLES", "", "12", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{12B81F56-D24C-4CB1-BF97-9CF9297E1F54}", "QUEEN OF PENTACLES", "", "13", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{20BC447B-4F8D-4E5A-8D88-6B8955553E5D}", "KING OF PENTACLES", "", "14", ColinWielgaCards.AhlosainDeck,true),
     new ColinWielgaCards.AhlosainCard("{1BFB29A8-5EA1-4CAA-854D-421C19D6D8E9}", "THE FOOL (scorn)", "(scorn) show this card when you draw it, -2 to all roll while it is in your hand ", "0", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{800E9ABE-018E-4DE3-809B-034F016C2995}", "THE MAGICAIN (scorn)", "(scorn) counts as a 0 if pass is 5 or higher", "15", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{0E0A21B9-536B-492D-98AE-C81A45F9A7FC}", "THE HIGH PRIESTESS (scorn)", "(scorn) when you play this card leave it in front you. next time you would roll it is played again and then discarded", "4", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{B63426F1-88D5-4FB8-8B62-11AEC9F23383}", "THE EMPRESS (scorn)", "(scorn) critical failures count as normal failures", "1", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{1B62516B-B67B-422A-8884-E8B8C7009D55}", "THE EMPEROR (scorn)", "(scorn)  passes counts as failure with some gain", "7", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{CFE32C56-ABCC-47F9-818C-8DB33D9CABCC}", "THE HIEROPHANT (scorn)", "(scorn) , lose a fact if you fail", "6", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{E0A54040-C516-46FD-8771-8EBB64190216}", "THE LOVERS (scorn)", "(scorn) 0 if you are working with someone else", "5", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{4370A472-3B93-42AE-9CE2-ED956FC7EC7F}", "THE CHARIOT (scorn)", "(scorn) play this before the roll", "4", this),
     new ColinWielgaCards.AhlosainCard("{F0221A23-D1F5-4D78-B7BA-4F320B54C076}", "STRENGTH (scorn)", "(scorn) 6 if you are using a brute force appraoch", "0", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{56DFDE62-2108-4E1C-8C2D-1A8F9BB48686}", "THE HERMIT (scorn)", "(scorn) reveal this card when you draw it", "2", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{8AE0331B-B90F-45C3-8AE8-5C052324254E}", "WHEEL OF FORTUNE (scorn)", "(scorn) top card of the deck -5", "?", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{A1792E2C-FD91-4C61-A7DE-A011B00DC9CE}", "JUSTICE (scorn)", "(scorn), when another player plays a card you may play this to replace that card, draw a card. if you can play this card you must", "2", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{8BAEEA5E-52A8-4CD4-9109-CB3507CEB596}", "THE HANGED MAN (scorn)", "(scorn) if you can play this card you must, failures count as critical failures", "2", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{CDDE3538-45E3-446A-A403-B9A52208BE2B}", "DEATH (scorn)", "(scorn) 0, 5 if you choose to take a hit", "0", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{0B14ACF4-0A5D-4EA3-AB16-A012C0F2989B}", "TEMPERANCE (scorn)", "(scorn) when you draw this card discard the rest of your hand then draw back up to 4", "1", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{BD1C5C14-1845-40BA-8191-6C4B51E27B4C}", "THE DEVIL (scorn)", "(scorn) take -3 on your next roll", "7", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{BEDDC985-6655-4B02-8D3B-8CD13CE1EB64}", "THE TOWER (scorn)", "(scorn) you keep this card after playing it, each time you do it's value decrease by 2", "8", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{505E0F1D-769B-4892-AA94-63A07474D474}", "THE STAR (scorn)", "(scorn) reveal this card when you draw it", "10", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{72650780-FB2C-46B7-904B-8BF110C955FB}", "THE MOON (scorn)", "(scorn) you may only play this card at night. discard it and draw another if you can't play any cards", "7", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{097402A0-4E2A-4817-B38B-870701D893A7}", "THE SUN (scorn)", "(scorn) you may only play this card during the day. discard it and draw another if you can't play any cards", "7", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{CAD6E6EE-755A-489B-A5F6-D18D1664C8DF}", "JUDGEMENT (scorn)", "(scorn) when you play this card place the remaining cards in your hand inorder faceup on the table. you must play them in that order", "5", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{E8035A0F-222D-4464-9AB8-97C74C9E33AE}", "THE WORLD (scorn)", "(scorn) you can't play this card. discard and draw another if you critically fail. discard it and draw another if you can't play any cards", "", ColinWielgaCards.AhlosainDeck,false),

     new ColinWielgaCards.AhlosainCard("{03583476-EC17-4E6D-B8A9-B8C9AE0F81FB}", "THE FOOL (scorn)", "(blessing) 15 when doing something stupid", "0", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{07A877A8-E040-4FFC-A283-4FDA44336642}", "THE MAGICAIN (scorn)", "(blessing) failure counts as a pass (and vice-versa), critical failure count as critical pass (and vice-versa)", "0", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{49EBEB33-543E-4575-A554-E56318B86678}", "THE HIGH PRIESTESS (scorn)", "(blessing) you may discard this card to ask a favor of air-ah if she agress lose air-ahs blessing", "10", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{734138D3-B2FF-4576-ADB8-FC450E9C7A23}", "THE EMPRESS (scorn)", "(blessing) all failure outcome count as mixed or indeterminate", "12", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{F81F07C2-8165-464F-85D7-F48A7A26A25D}", "THE EMPEROR (scorn)", "(blessing) all pass outcome count as critical passes", "12", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{DC65E595-F8B5-43EB-A69F-623531186F88}", "THE HIEROPHANT (scorn)", "(blessing) gain a fact", "12", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{C1CD617F-A4EB-44A5-AEC7-845ACC254CDE}", "THE LOVERS (scorn)", "(blessing) 15 if you are acting to help another", "10", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{0FC6EA21-658C-4F89-86BC-D4AEAB40E438}", "THE CHARIOT (scorn)", "(blessing) 15 if you are acting with violence or anger", "10", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{E9C538D0-AAC5-4CA0-802D-55E6FB32CED0}", "STRENGTH (scorn)", "(blessing) plus the last card played, the next card played gets +5", "5", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{B31471F7-81D9-4AC5-BA47-6978DA8903DF}", "THE HERMIT (scorn)", "(blessing) reveal this card when you draw it", "2", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{952472CA-6B31-4C48-AE6B-B6FF51F3B695}", "WHEEL OF FORTUNE (scorn)", "(blessing) top card of the deck", "?", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{CF0F1FA6-5FCB-4BA3-81EE-10C2432B47C1}", "JUSTICE (blessing)", "(blessing) draw three cards then discard 3 cards", "10", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{90F5593D-C9D3-4C24-8AAF-28DEB3D7F3A0}", "THE HANGED MAN (blessing)", "(blessing) if you can play this card you must", "15", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{E8F5EF91-9E27-47D4-B11E-D61B4B074389}", "DEATH (blessing)", "(blessing) heal two click if this roll results in a death", "15", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{F7857951-7299-49DB-976A-73852C764121}", "TEMPERANCE (blessing)", "(blessing) draw 3 cards", "6", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{FD3223A9-3A1C-4821-9613-04AB903A4432}", "THE DEVIL (blessing)", "(blessing) 15 if you are acting selfishly", "10", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{4137936A-27D8-4E36-8571-2BDAF0D049CA}", "THE TOWER (blessing)", "(blessing) you may keep this card after playing it, each time you do it's value increase by 3 if it's value is >=15 discard it", "6", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{C44CA506-FBF1-4A26-B46C-68A8128D1935}", "THE STAR (blessing)", "(blessing) you may discard a card to keep this one in your hand after playing it", "6", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{2C073EEF-E6DF-4D31-BFC4-8C75A489DFCF}", "THE MOON (blessing)", "(blessing) 15 if acting directly", "10", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{C2A002C5-0577-4850-B349-BA34A8771DD8}", "THE SUN (blessing)", "(blessing) 15 if acting deceptively", "10", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{66B15EDF-5A14-41B6-B782-4605B8540489}", "JUDGEMENT (blessing)", "(blessing) or 15 and take a hit", "12", ColinWielgaCards.AhlosainDeck,false),
     new ColinWielgaCards.AhlosainCard("{8625F075-C76D-4AE3-B5F0-C1462925ED25}", "THE WORLD (blessing)", "(blessing) heal 2 clicks", "13", ColinWielgaCards.AhlosainDeck,false),
    ]

ColinWielgaCards.AhlosainDeck = new ColinWielgaCards.Deck("{53799C64-1547-4FF7-9C00-E8D9AE22C6CE}", "Ahlos Deck", cardList);

ColinWielgaCards.decklist.push(ColinWielgaCards.AhlosainDeck,true);


//Card.getCard = function (id) {
//    return ColinWielgaCards.AhlosDeck.allCards[id];
//}

//Card.deckSize = function () {
//    var count = 0;
//    for (var i in ColinWielgaCards.AhlosDeck.allCards) {
//        if (ColinWielgaCards.AhlosDeck.allCards.hasOwnProperty(i)) count++;
//    }
//    return count;
//}

//Card.draw = function (gods) {
//    // list of ids
//    var deck = [];

//    // add the standard cards
//    for (var i = 22; i <= 77; i++) {
//        deck.push(i);
//    }

//    // add the god cards 
//    // TODO this is a weird dependency 
//    // and it's breaking cards 
//    gods.forEach(function (god) {
//        deck.push(God.getCardId(god));
//    });


//    return deck[Math.floor(Math.random() * deck.length)];
//}
