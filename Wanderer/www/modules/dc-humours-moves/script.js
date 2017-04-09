

var component = function () {
    //A component for storing Humours moves.

    //Module-specific fields

    this.getMoveslist = function(tab_idx){
        tab_idx = tab_idx || this.current_tab;
        return this.movescatalogue[tab_idx].moveslist;
    }

    //Returns true if the player should be prevented from adding
    //or editing moves
    this.lockEdits = function(tab_idx){
        tab_idx = tab_idx || this.current_tab;
        return !this.movescatalogue[tab_idx].custom;
    }

    this.addNewMove = function(){
        addmove = {
            title: this.newmove.title,
            leadin: this.newmove.leadin,
            trigger: this.newmove.trigger,
            effect: this.newmove.effect,
            collapsed: this.newmove.collapsed,
            edit: true
        };
        this.getMoveslist().push(addmove);
        this.resetNewMove();
    };

    this.resetNewMove = function(){
        this.newmove.title = "";
        this.newmove.leadin = "When you";
        this.newmove.trigger = "[act and/or circumstances dictate],";
        this.newmove.effect = "[mechanical and/or fictional effects occur.]";
        this.newmove.collapsed = true;
    };
    
    this.getMoveBody = function(move){
        //Returns the html-formatted full body of the move, including leadin, bolded trigger,
        //and effect.
        var leadin = "";
        if(move.leadin){
            leadin = move.leadin.trim() + " ";
        }
        var trigger = "<b>" + move.trigger.trim() + "</b> ";
        var effect = move.effect.trim();
        //Move initial paragraph tag to the beginning of the whole body
        if(effect.slice(0, 3) === "<p>"){
            effect = effect.slice(3);
            leadin = "<p>" + leadin;
        }
        return leadin + trigger + effect;
    }

    this.getMoveHeader = function(move){
        //Returns text for a possibly-collapsed move header
        var header = move.title.trim() || "";
        if(move.collapsed && !move.title){
            var trigger = move.trigger;
            if(move.trigger.trim().charAt(move.trigger.trim().length - 1) === ','){
                trigger = move.trigger.trim().slice(0, -1);
            }
            header = move.leadin.trim() + " <b>" + trigger.trim() + "</b>..."; 
        }
        return header;
    }
    
    this.toggleCollapse=function(event, move){
        move.collapsed = !move.collapsed;
        event.stopImmediatePropogation();
    }
    this.startEdit = function(event, move){
        move.edit = true;
        event.stopImmediatePropogation();
    }
    this.endEdit = function(event, move){
        //TODO: Check to make sure there's either a title or leadin+trigger
        move.edit = false;
        move.collapsed = false;
        event.stopImmediatePropogation();
    }
    this.setDeleteMode = function(event, move){
        move.deletemode = true;
        event.stopImmediatePropogation();
    }
    this.cancelDeleteMode = function(event, move){
        move.deletemode = false;
        event.stopImmediatePropogation();
    }
    
    this.deleteMove = function(event, move){
        this.getMoveslist().splice(this.getMoveslist().indexOf(move), 1);
        move.deletemode = true;
        event.stopImmediatePropogation();
    }

    this.changeTab = function(catalogue){
        this.current_tab = this.movescatalogue.indexOf(catalogue);
    }

    //This is the catalogue of moves that are built into the system
    //The final moves catalogue takes this and appends categories 
    //customizable by the player.
    var default_move_catalogue = [
        {
            label: "Humour Moves",
            moveslist: [
                {
                    title: "Start an Enterprise",
                    leadin: "When you",
                    trigger: "start a new project, venture, or business enterprise,",
                    effect: "make arrangements and describe its end goals and methods to the MC. \
                        The MC will examine the following list and tell you about a couple of things \
                        you may or may not have that are vital to your project: \
                        <ul> \
                            <li>Resources: Sufficient people, funds, or materials</li> \
                            <li>Tools: Proper equipment or contacts</li> \
                            <li>Circumstances: The permission of authorities, \
                                the blessing of the community, the necessary weather and terrain</li> \
                            <li>Knowledge: Skills, information, or secrets</li> \
                        </ul> \
                    The MC will also tell you to start a countdown with 2-6 boxes.",
                    collapsed: true,
                    humour: "yellowbile"
                },
                {
                    title: "Further an Enterprise",
                    trigger: "At the beginning of each session,",
                    effect: "or when you have sufficient downtime and opportunity to advance a \
                        project you've started, if all your project needs are met, draw+discard \
                        Yellow Bile. On a Sated, the work progresses well: Mark a checkbox and  \
                        then choose 2. On a Waxing, just choose 2: \
                        <ul> \
                            <li>The work progresses. Mark a checkbox.</li> \
                            <li>You proceed with care and attention to detail. \
                                (Otherwise, one of your project's needs will lapse - \
                                the MC will tell you what and why.)</li> \
                            <li>You don't neglect your interests outside of this project. \
                                (Otherwise, you're <b>inviting trouble</b>.)</li> \
                        </ul> \
                        Lower or no discard, cede initiative to the MC. \
                        If your needs go unmet, the MC will describe how and why - \
                        it's up to you to resolve the problems through play. When the \
                        last countdown section is filled, the project is complete, and the \
                        MC will tell you the results.",
                    collapsed: true,
                    humour: "yellowbile"
                },
                {
                    title: "Intrude Somewhere",
                    leadin: "When you",
                    trigger: "try to intrude somewhere you're not welcome, allowed, or expected,",
                    effect: "draw + discard Yellow Bile. On a Sated result, you're in and you have \
                        your liberty, unless or until you draw attention to yourself or decide to \
                        depart again. On a Waxing, you're in, but you only have time to do one quick \
                        thing before you must leave again - stick around, and you're <b>inviting trouble</b>. \
                        Lower or no discard, cede initiative to the MC.",
                    collapsed: true,
                    humour: "yellowbile"
                },
                {
                    title: "Seduce or Manipulate Someone",
                    leadin: "When you",
                    trigger: "try to seduce, manipulate, bluff, fast-talk, or lie to someone,",
                    effect: "tell them what you want them to do, give them a compelling reason, \
                            and draw+discard Yellow Bile.<br \> <b>For NPCs:</b> on a Sated, they'll go along \
                            with you, unless or until some fact or action betrays the reason you \
                            gave them. On a Waxing, they'll go along with you, but they need some \
                            concrete assurance, corroboration, or evidence first.<br /> <b>For PCs:</b> treat it \
                            as though you <b>Cashed In Your Dues</b>, but don't spend debt. Instead, on a Sated, \
                            proceed as though you spent two debt, and on a Waxing, proceed as though you \
                            spent one debt. Unlike <b>Cash In Your Dues</b>, you can't make this move when your \
                            character is offscreen unless there are unusual circumstances that justify your \
                            ability to seduce or manipulate someone without being physically present.<br /> In \
                            all cases, for lower or no discard, cede initiative to the MC.",
                    collapsed: true,
                    humour: "yellowbile"
                },
                {
                    title: "Rebalance Yellow Bile",
                    leadin: "When you",
                    trigger: "spend a scene in calm and reasonably friendly conversation with \
                            a fellow player-character,",
                    effect: "reset Yellow Bile to balanced. If it is already balanced or higher, \
                            ask another player involved in the conversation if they found it to be \
                            reasonably stimulating or thought-provoking. If so, take mill 1 forward to \
                            Yellow Bile. (This bonus does not stack.)",
                    collapsed: true,
                    humour: "yellowbile"
                },
                {
                    title: "Size Up Danger",
                    leadin: "When you",
                    trigger: "size up a dangerous situation,",
                    effect: "draw + discard Black Bile. On a Waxing or better, you can ask the MC \
                        questions. Whenever you act on one of the MC's answers, take mill 1. On a \
                        Sated result, ask 3. On a Waxing, ask 1: \
                        <ul> \
                            <li>What, if anything, seems strange or out of place?</li> \
                            <li>What's the nature of the danger? What makes it dangerous?</li> \
                            <li>Which danger is the biggest threat?</li> \
                            <li>What's the danger's true position?</li> \
                            <li>Is the danger aware of me yet?</li>  \
                            <li>What's my best escape route/way in/way past?</li> \
                            <li>Where's the best place to stand and fight?</li> \
                            <li>Where's the best place to hide?</li> \
                        </ul> \
                        Lower or no discard, cede initiative to the MC, but go ahead and ask \
                        one anyway first.",
                    collapsed: true,
                    humour: "blackbile"
                },
                {
                    title: "Read a Person",
                    leadin: "When you",
                    trigger: "read a person",
                    effect: "in a charged interaction, draw + discard Black Bile. On a Sated result, \
                        hold 3. On a Waxing, hold 1. While you're interacting with them, spend your \
                        hold to ask their player questions, 1 for 1: \
                        <ul> \
                            <li>Is your character telling the truth?</li> \
                            <li>What's your character really feeling?</li> \
                            <li>What does your character intend to do?</li> \
                            <li>What does your character wish I'd do?</li> \
                            <li>How could I get your character to _?</li> \
                            <li>If I do _, how will your character react?</li> \
                        </ul> \
                        Lower or no discard, cede initiative to the MC, but go ahead and ask one \
                        anyway right now.",
                    collapsed: true,
                    humour: "blackbile"
                },
                {
                    title: "Go Somewhere",
                    leadin: "When you",
                    trigger: "travel somewhere in the city,",
                    effect: "first, is there a more specific move governing the part of the city \
                        you're travelling to, or the method of transport you're using? If so, use \
                        that. Otherwise, tell the MC where you're going and how you're getting there, \
                        and ask them if you can make the journey uneventfully. If you can, you can \
                        choose to do so. The MC will describe your surroundings when you reach your \
                        destination in good detail, answering any questions you have about what you see, \
                        smell or hear.<br /> \
                        If you can't make the journey uneventfully, or if you decide your life is too \
                        simple and hope for complication, draw+discard Black Bile. On a Sated, the \
                        MC will describe something interesting you see along the way. You can choose to \
                        stop and investigate if you wish. On a Waxing, the MC will tell you what \
                        distraction or inconvenience interrupts your travel, in which case you'll \
                        probably have to stop and deal with it whether you want to or not. In either \
                        situation, if you resolve the interruption and resume your original journey, \
                        when you make this move again, the MC should tell you that you can make the journey \
                        uneventfully unless circumstances have changed in an important way. \
                        Lower or no discard, cede initiative to the MC.",
                    collapsed: true,
                    humour: "blackbile"
                },
                {
                    title: "Rebalance Black Bile",
                    leadin: "When you",
                    trigger: "spend a scene doing something peaceful in your personal home, haven or hidey-hole,",
                    effect: "reset Black Bile to balanced. If it is already balanced or higher, you may \
                        choose to describe an object of personal significance. If you've described it \
                        before, you must reveal some significant new detail. If you describe it to \
                        everyone's satisfaction, the next time something reminds you of that object, \
                        take mill 1 forward to Black Bile.",
                    collapsed: true,
                    humour: "blackbile"
                },
                {
                    title: "Invite Trouble",
                    leadin: "When you",
                    trigger: "do something reckless, foolhardy, or ill-conceived, or neglect something important,",
                    effect: "draw + discard Phlegm. On a Sated result, you're good. On a Waxing, the trouble is \
                        on the horizon: The MC will pick some aspect of either your immediate situation \
                        or long-term interests and describe the warning signs. Whether or not the trouble \
                        has anything to do with your immediate foolhardiness, or whether it is simply the \
                        whims of ill fortune, is up to their discretion. Lower or no discard, the storm \
                        breaks immediately and without warning: cede initiative to the MC.",
                    collapsed: true,
                    humour: "phlegm"
                },
                {
                    title: "Call In a Favor",
                    leadin: "When you",
                    trigger: "call in a favor someone owes you,",
                    effect: "describe the NPC who owes the favor and choose why: \
                        <ul> \
                            <li>You helped them out when they were in a pinch</li> \
                            <li>You had their back in a dangerous situation</li> \
                            <li>You went above and beyond in the line of duty for them</li> \
                            <li>You took care of a little problem they had</li> \
                        </ul> \
                        If this is news to the rest of us, the MC will tell you if they think \
                        now's a good time to find out the details. Either way, draw + discard \
                        Phlegm. <b>If we're finding out what happened,</b> we'll cut to a flashback: On a \
                        Sated result, you set the scene. Describe how you are in control of the situation. \
                        On a Waxing, the MC will set the scene, and it might not be so obvious how (or if) \
                        you're in control. Lower or no discard, the MC will set the scene, and wow, \
                        are you in deep, it's looking like it might turn out they don't owe you a \
                        favor after all. However it starts, play out the scene with the MC until \
                        it's obvious why (or if) they owe you - and oh yeah, during this flashback, \
                        you're really playing. Make moves and use up resources as per usual.<br /> \
                        <br /> \
                        <b>If we're not finding out what happened,</b> or if we already know: On a Sated result, \
                        yeah, they owe you, and they're available to help until they decide the debt is \
                        repaid (at the very least.) On a Waxing, they'll try to help, but they've also \
                        got this other bit of biz going on that might interfere - they might have to \
                        run off at an inconvenient moment, or keep a low profile, or something like that. \
                        Lower or no discard, cede initiative to the MC.",
                    collapsed: true,
                    humour: "phlegm"
                },
                {
                    title: "Have Something",
                    leadin: "When you",
                    trigger: "go through your pockets, purses or carrying bags",
                    effect: "for something you might find useful right now, and it's not something \
                        we already know you have, tell us what your need is and draw+discard Phlegm. \
                        On a Sated, you happen to be carrying just the thing - within reason. Tell us \
                        what it is. On a Waxing, you happen to be carrying something that might suffice. \
                        The MC will tell you what it is. Lower or no discard, cede intitiative to the MC.",
                    collapsed: true,
                    humour: "phlegm"
                },
                {
                    title: "Rebalance Phlegm",
                    leadin: "When you",
                    trigger: "spend a scene deliberately doing something you find unnerving or outside \
                        your comfort zone,",
                    effect: "reset Phlegm to balanced. If it is already balanced or higher, once the \
                        scene is over, ask the MC if they think you went out of your way to challenge \
                        yourself or face unnecessary risk. If they think you did, take mill 1 forward to Phlegm. \
                        (This bonus does not stack.)",
                    collapsed: true,
                    humour: "phlegm"
                },
                {
                    title: "Attack an Enemy",
                    leadin: "When you",
                    trigger: "use violence against a dangerous enemy,",
                    effect: "state what you intend to do to them and what you hope to accomplish by doing it. \
                        Then, choose an amount of Blood to commit. It must be no greater than your Blood's \
                        distance from Dry. If your opponent is a player character, and they choose to use \
                        violence against you as well, they should also state what they intend to do to you, \
                        what they hope to accomplish by doing it, and choose Blood to commit: They're making \
                        this same move also. Both players roll 1d4 (or 2d4 for a character who is a demon) and \
                        add the results to Blood committed, if any. If one side has a clear advantage in \
                        position, ability, or armaments, give them an extra +1.\
                        <br /><b>If your total is higher, you win:</b> You get what you hoped to accomplish. \
                        You also lose the Blood you committed. \
                        <br /><b>If your total is lower or equal, you lose:</b> If your opponent was a \
                        player character, they get what they hoped to accomplish, and you don't. (Unless \
                        it was a tie - see below.) If your opponent was the MC, you cede the initiative to \
                        them. They likely won't be gentle with you. You also increase Blood by 1. If it \
                        reaches Sated this way, you can choose to leave it at Sated instead of taking a \
                        Blood advancement. If you do, you you will not have the opportunity to take another \
                        Blood advancement until you have <b>rebalanced Blood</b>. \
                        <br /><b>If it's a tie between PCs, you both lose:</b> Nobody gets what they \
                        hoped to accomplish. Suffer injury as below and settle between yourselves how \
                        your characters have reached a stalemate. If you have the strength and will to \
                        continue, you can immediately make this move again, or you can try to work things \
                        out some other way, your call - but just to heat things up a little, we'll say that \
                        whoever decides to make this move again first has a clear advantage in position, \
                        ability, or armaments, since they attacked while you were still thinking about it.\
                        <br /><b>Regardless of who won or lost</b>: You each injure the other. Compare your \
                        Blood + die roll total to the following chart to see how much you hurt your opponent: \
                        <ul> \
                            <li>1-3: A painful injury</li> \
                            <li>4-5: A debilitating injury</li> \
                            <li>6+: A mortal injury</li> \
                        </ul> \
                        Compare your opponent's total to the chart to see how much they hurt you. \
                        Describe to each other what you did to inflict those injuries - winner goes first. \
                        If it's a mortal injury, and you're the one suffering it, you'll have to make \
                        the move for when you <b>endure mortal harm</b>. See below.",
                    collapsed: true,
                    humour: "blood"
                },
                {
                    title: "Rough Someone Up",
                    leadin: "When you",
                    trigger: "rough someone up who can't fight back,",
                    effect: "make it clear to them what you want from them and spend 0-2 Blood, but no more than \
                        your Blood's current distance from Dry. If you spent 2, their player tells you what \
                        you'll have to do to them to make them cooperate. You choose: do that thing, and they'll \
                        give you what you want as best they can under the immediate circumstances, or \
                        describe what you do instead, and it's their choice how to react. If you spent 1, tell us \
                        the worst thing you're willing to do to them. They choose: they give you what you want as \
                        best they can under the immediate circumstances, or you do that thing to them. If you \
                        spent 0, cede initiative to the MC. If spending Blood in this way reduces it to Dry, tell the \
                        MC to pick an advancement, and reset to Balanced.",
                    collapsed: true,
                    humour: "blood"
                },
                {
                    title: "",
                    leadin: "If someone else",
                    trigger: "roughs you up when you're defenseless,",
                    effect: "if it's a PC, gain Blood equal to the amount they spend. If it's an NPC, choose: \
                        You gain one Blood and cling to consciousness, or you gain two Blood and let yourself black out. \
                        (The MC will tell you where you come to, and under what circumstances.) Whether it's a \
                        PC or NPC, if your Blood increases to or beyond Sated from this move, you can choose to \
                        leave it at Sated instead of taking a Blood advancement. If you do, you will not have the \
                        opportunity to take another Blood advancement until you have <b>rebalanced Blood</b>.",
                    collapsed: true,
                    humour: "blood"
                },
                {
                    title: "Defend Another",
                    leadin: "When you",
                    trigger: "risk injury to defend someone or something other than yourself,",
                    effect: "first, are you merely defending, or are you fighting back? If the latter, \
                        make the <b>attack a dangerous enemy</b> move instead. If the former, choose the \
                        worst harm you're willing to suffer in order to keep the thing you're defending safe: \
                        <ul> \
                            <li>Scrapes and bruises, -1</li> \
                            <li>Painful injuries, +1</li> \
                            <li>Debilitating injuries, +2</li> \
                            <li>Mortal injuries, +3</li> \
                        </ul> \
                        Take your current Blood and add or subtract the amount from the list above, \
                        just like if you'd discarded. On a Sated, choose 2. On a Waxing, choose 1: \
                        <ul> \
                            <li>No harm spills past your defenses to the thing you're defending</li> \
                            <li>The threat won't require all of your attention to block</li> \
                            <li>You won't expose yourself to additional danger</li> \
                        </ul> \
                        The MC will describe how the threat injures you no worse than at the level you \
                        chose. If you risked debilitating injury, increase Blood by one step. If you \
                        risked mortal injury, increase Blood by two steps. If your Blood increases to or \
                        beyond Sated, choose a Player advancement and reset to Balanced as usual. \
                        (You do not have the option to leave it at Sated.)",
                    collapsed: true,
                    humour: "blood"
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "endure mortal harm,",
                    effect: "first decide: Do you want your character to live? If not, work with the \
                        MC to describe a fitting last scene. You can choose to take over an appropriate \
                        NPC, or else to make a brand new character. Otherwise, is there an \
                        opportunity for immediate medical aid? If so, and your character receives it, \
                        discard your entire hand, reset all Humours to balanced, draw a single card, \
                        and re-enter the game. The MC will describe your circumstances upon waking \
                        and give you a new move to reflect your journey to the gates of death. \
                        Finally, do you wish to live but do not receive medical attention? In that \
                        case, your only recourse is to remain a disembodied specter. As a specter, \
                        you are invisible, intangible and silent to most mortals (but not demons). \
                        Spend cards from your hand to increase your humours if possible, then \
                        discard your hand. If any humour reaches Sated, do not reset it or choose an \
                        advancement. If you died a violent death, or with fury in your heart, fill \
                        your Blood to Sated - otherwise, leave it be. Whatever Humour currently \
                        remains to you represents your ability to interact with the material world. \
                        You gain access to the following moves: \
                        <br /><b>Inspire Terror:</b> Spend 1 Orgone to make a single person who isn't a \
                        demon experience a supernatural thrill of mind-numbing terror. NPCs will flee in \
                        panic, cower, or faint. PCs can do what they want, but if it isn't fleeing in \
                        panic, cowering, or fainting, they're <b>inviting trouble</b>. \
                        <br /><b>Become tangible:</b> Spend 1 Yellow Bile to interact with the physical \
                        world. You become tangible enough to perform one significant action, or enough to \
                        perform a series of minor actions over the course of a few minutes. \
                        <br /><b>Impart knowledge:</b> Spend 1 Black Bile to communicate with someone. \
                        You can impart a single message, directive, or simple piece of information, \
                        such as the location of your body, or the ritual needed to bind a soul to it. \
                        (It has to be information you actually know - but all disembodied souls know the \
                        ritual to bind a soul to a body.) \
                        <br /><b>Become visible:</b> Spend 1 Phlegm to manifest a visible presence. \
                        Choose: Either manifest as a translucent, ragged version of your mortal appearance, \
                        or as a ghastly phantasm of terror and violence. \
                        <br /><b>Commit violence:</b> Spend 1 Blood to wound or kill any one mortal. \
                        If you died a violent death, you must inflict wounds that reflect the way you were \
                        killed. If you want to kill a PC, you'll have to make the <b>Attack an Enemy</b> move, \
                        spending Blood as usual, but go ahead and take the 2d4, just as if you were a \
                        demon. Additionally, no matter what the PC rolls, they can't deal you any wounds \
                        under normal circumstances, and whether you lose or not, you spend the Blood you \
                        committed and gain none back. \
                        <br />When your last humour reaches Dry, you have lost all connection to the mortal world.",
                    collapsed: true,
                    humour: "blood"
                },
                {
                    title: "Rebalance Blood",
                    leadin: "When you",
                    trigger: "confront an enemy who has hurt or wronged you and offer sincere forgiveness,",
                    effect: "reset Blood to balanced. If it's already balanced or higher, if you also make \
                        a tangible and costly gesture to your enemy in good faith to demonstrate your \
                        forgiveness, and they also accept it in good faith, immediately choose a Blood \
                        advancement.",
                    collapsed: true,
                    humour: "blood"
                },
            ],
            custom: false
        },
        {
            label: "Peripheral Moves",
            moveslist:[],
            custom: false
        },
        {
            label: "World Moves",
            moveslist:[],
            custom: false
        }
    ];

    //////////



    this.getId = function () {
        return "dc-pbta-moves"
    }

    // A component should know how to handle some events
    // called when Wanderer is ready to talk to us
    // a component talks to the rest of the app throught a communicator
    // the communicator will call the components methods like OnNewCharacter and OnSave at the appropreat time
    // the communicator also allows know what to have to write also holds the infomation 
    // all events are optional
    this.OnStart = function (communicator,dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    }
    // called when a new character is created
    this.OnNewCharacter = function () {
        this.movescatalogue = default_move_catalogue;
        this.movescatalogue.push({
            label: "Player Moves",
            moveslist:[],
            custom: true
        });
        this.current_tab = 0;
        this.newmove = {};
        this.resetNewMove();
    }
    // called when a character is saved
    this.OnSave = function () {
        var custom_moves = [];
        this.movescatalogue.forEach(function(movecategory){
            if(movecategory.custom){
                custom_moves.push(movecategory);
            }
        });
        this.communicator.write("custommoves", custom_moves);
    }
    // called when a characrer is loaded 
    this.OnLoad = function () {
        this.movescatalogue = default_move_catalogue;
        if (this.communicator.canRead("custommoves")){
            this.movescatalogue.concat(this.communicator.read("custommoves"));
        }
    }
    this.OnUpdate = function () {
    }

    this.getRequires = function () {
        return ["dc-pbta-moves"];
    }

    this.getPublic = function () {
        return {
            getDescription: function () {
                return "This is a unimplemented componet";
            },
            getVersion: function () {
                return 1;
            }
        }
    }

    // a component should be able to provide some infomation
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "Moves";
    }

    this.OnNewCharacter();
}

g.ComponetRegistry.register(component);
