var component = function () {
    var that = this;
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
        event.stopImmediatePropagation();
    }
    this.startEdit = function(event, move){
        move.edit = true;
        event.stopImmediatePropagation();
    }
    this.endEdit = function(event, move){
        //TODO: Check to make sure there's either a title or leadin+trigger
        move.edit = false;
        move.collapsed = false;
        event.stopImmediatePropagation();
    }
    this.setDeleteMode = function(event, move){
        move.deletemode = true;
        event.stopImmediatePropagation();
    }
    this.cancelDeleteMode = function(event, move){
        move.deletemode = false;
        event.stopImmediatePropagation();
    }
    
    this.deleteMove = function(event, move){
        this.getMoveslist().splice(this.getMoveslist().indexOf(move), 1);
        move.deletemode = true;
        event.stopImmediatePropagation();
    }

    this.changeTab = function(catalogue){
        this.current_tab = this.movescatalogue.indexOf(catalogue);
    }

    //This is the catalogue of moves that are built into the system
    //The final moves catalogue takes this and appends categories 
    //customizable by the player.
    var default_move_catalogue = [
        {
            label: "Basic Moves",
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
                    effect: "for something you might find useful right now, and it's something we \
                        don't already know you have but that you justifiably might, \
                        tell us what your need is and draw+discard Phlegm. \
                        On a Sated, you happen to be carrying just the thing - within reason. Tell us \
                        what it is. On a Waxing, you happen to be carrying something that might suffice. \
                        The MC will tell you what it is. Lower or no discard, cede intitiative to the MC.",
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
                },
            ],
            custom: false
        },
        {
            label: "Rebalance Moves",
            moveslist:[
                {
                    title: "Rebalance Orgone",
                    leadin: "When you",
                    trigger: "cut to a flashback and describe a short scene from your character's past,",
                    effect: "reset Orgone to balanced. Once the \
                        scene is over, ask the other players if they think what you've revealed \
                        fundamentally changes the way they see your character, or colors his/her actions \
                        in a surprising new light. If they think so, the next time you follow up on that \
                        revelation with your actions, take mill 1 forward to Orgone. (This \
                        bonus does not stack.) ",
                    humour: "orgone",
                    collapsed: true,
                },
                {
                    title: "Rebalance Yellow Bile",
                    leadin: "When you",
                    trigger: "spend a scene in calm and reasonably friendly conversation with \
                            a fellow player-character,",
                    effect: "reset Yellow Bile to balanced. After the conversation, ask another player \
                            involved in the conversation if they found it to be \
                            reasonably stimulating or thought-provoking. If so, take mill 1 forward to \
                            Yellow Bile. (This bonus does not stack.)",
                    humour: "yellowbile",
                    collapsed: true,
                },
                {
                    title: "Rebalance Black Bile",
                    leadin: "When you",
                    trigger: "spend a scene doing something peaceful in your personal home, haven or hidey-hole,",
                    effect: "reset Black Bile to balanced. As part of the scene, you may \
                        choose to describe an object of personal significance. If you've described it \
                        before, you must reveal some significant new detail. If you describe it to \
                        everyone's satisfaction, the next time something reminds you of that object, \
                        take mill 1 forward to Black Bile.",
                    humour: "blackbile",
                    collapsed: true,
                },
                {
                    title: "Rebalance Phlegm",
                    leadin: "When you",
                    trigger: "spend a scene deliberately doing something you find unnerving or outside \
                        your comfort zone,",
                    effect: "reset Phlegm to balanced. Once the scene is over, ask the MC if they \
                        think you went out of your way to challenge \
                        yourself or face unnecessary risk. If they think you did, take mill 1 forward to Phlegm. \
                        (This bonus does not stack.)",
                    humour: "phlegm",
                    collapsed: true,
                },
                {
                    title: "Rebalance Blood",
                    leadin: "When you",
                    trigger: "confront an enemy who has hurt or wronged you and offer sincere forgiveness,",
                    effect: "reset Blood to balanced. If you also make a tangible and costly \
                        gesture to your enemy in good faith to demonstrate your \
                        forgiveness, and they accept it in good faith, immediately choose a Blood \
                        advancement.",
                    humour: "blood",
                    collapsed: true,
                },
            ],
            custom: false
        },
        {
            label: "Peripheral Moves",
            moveslist:[
                {
                    title: "Pay Back Debt",
                    leadin: "When you",
                    trigger: "try to restore balance of debt with someone",
                    effect: "with whom you have negative debt balance, clarify what you've done to \
                        pay them back (if necessary) and ask them if what you did counts as \
                        <ul> \
                            <li>Doing them a favor, even if unasked-for</li> \
                            <li>Giving them a meaningful gift</li> \
                            <li>Being honest to them when it hurts you to do so</li> \
                            <li>Winning their approval</li> \
                        </ul> \
                        Their call if it counts as one of those, but remind them that if they're too \
                        hard to please, you might have no reason to keep trying. If it does count, \
                        shift the balance of debt one point in your favor.",
                    collapsed: true,
                },
                {
                    title: "Cash In Your Dues",
                    leadin: "When you",
                    trigger: "request a favor from someone,",
                    effect: "say what you want them to do and spend up to 2 debt. If you spend \
                        1, choose; if you spend 2, both: \
                        <ul> \
                            <li>If they do it, they draw a card</li> \
                            <li>If they don't do it, they're inviting trouble</li>   \
                        </ul> \
                        Debt spent is shifted in their favor. Obviously, you can't spend more \
                        debt in this way than you currently have, but if your debt is 0 or lower, \
                        (or even if not,) you can still offer 1 debt to get someone to do something \
                        for you. It's their call if they take the offer. <br />(You can use this move even \
                        when your character isn't in the scene or can't act directly: We'll say you \
                        told the other character what you wanted offscreen, or that they realize what \
                        you'd want them to do in this situation even if you never said it explicitly. A \
                        little weird, I know, but it gives everyone a good reason to pay attention to \
                        each others' scenes.)",
                    collapsed: true,
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "help or interfere with someone",
                    effect: "who is making a draw + discard, describe how you're getting involved \
                        and discard a single card of your own. They get +1 or -1 forward, your choice.",
                    collapsed: true,
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "meet someone new who you think might have heard of you,",
                    effect: "pick one of your Reputations and tell the MC that this \
                        person knows you by it. What exactly the character thinks about that \
                        is the MC's choice. At their discretion, they might decide the \
                        character also knows you by any of your other reputations",
                    collapsed: true,
                },
                {
                    title: "",
                    leadin: "At the",
                    trigger: "end of session,",
                    effect: "if it seems right to do so, you may nominate a player character \
                        for a new reputation. Discuss your reasoning briefly, and if the players - \
                        including the MC, and not including the player of that character - can reach \
                        consensus, award it.",
                    collapsed: true,
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "haggle over a price,",
                    effect: "either monetary or otherwise, state your best offer and choose to \
                        discard a single card, or no. If you discard, they have to choose: Take your \
                        offer, or end the deal and throw you out. If you don't discard, they can \
                        choose one of those two options, or instead one of these: \
                        <ul> \
                            <li>Ask you to throw in a little something extra</li> \
                            <li>Give you only most of what you wanted</li> \
                            <li>Pass you along to their superiors</li> \
                            <li>Point you at someone else they know to be interested</li> \
                            <li>Counter with something of comparable cost or value</li> \
                        </ul>",
                    collapsed: true,
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "collect information,",
                    effect: "draw + discard Black Bile. On a hit, the MC gives you two truths \
                            and a lie about the thing you're interested in. On a Sated, ask the \
                            MC about one of the three, and they'll tell you if it's the lie. Lower \
                            or no discard, cede initiative to the MC.",
                    collapsed: true,
                    humour: "blackbile"
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "follow someone discreetly,",
                    effect: "draw + discard Yellow Bile. On a Sated, you track them to their destination without \
                        being noticed. On a Waxing, for an NPC, the MC flips a coin and does not tell you \
                        the result: If it's heads, you track your quarry to their destination without being \
                        noticed. If it's tails, they notice. For a PC, choose: Shift the balance of debt in \
                        their favor by one and you track them to their destination without being noticed, or \
                        else ask their player whether they notice, and if they do, where you are when they \
                        reveal that they noticed you and what they do that reveals it.</br> \
                        Lower or no discard, they get away clean, but not before leading you somewhere troublesome.",
                    collapsed: true,
                    humour: "yellowbile"
                },
                {
                    title: "When you stalk an enemy through difficult terrain or prepare yourself and wait for the \
                    enemy to come to you...",
                    leadin: "When you",
                    trigger: "stalk an enemy through difficult terrain",
                    effect: "draw + discard Yellow Bile. When you <b> prepare yourself and wait for the enemy \
                        to come to you</b>, draw + discard Phlegm. In either case, on a Waxing or higher, \
                        describe your position when direct conflict is imminent. Make it clear what your \
                        advantage is. On a Waxing, the MC will add a twist or inconvenient detail. <br/> \
                        Lower or no discard, your enemy finds a way to get the drop on you, or to turn the \
                        terrain to their own advantage.",
                    collapsed: true
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "expose yourself to an enemy's attack,",
                    effect: "the MC will tell you how they attempt to capitalize on the opportunity.  \
                        Either allow their attack to land, or else draw + discard Phlegm. On a Sated, \
                        describe how you block or avoid their attack and carry through with your original intent. \
                        On a Waxing, choose: Describe how you carry through with your original intent despite their \
                        attack hitting you, or else describe how you abandon your intent in order to block or \
                        avoid their attack. Lower or no discard, the MC will describe how they hurt you and \
                        force you into a worse position.",
                    collapsed: true,
                    humour: "phlegm"
                }
            ],
            custom: false
        },
        {
            label: "World Moves",
            moveslist:[
                {
                    title: "",
                    leadin: "If you",
                    trigger: "have any humours at waxing,",
                    effect: "demons can smell them on you, and it makes them hungry. If you have at \
                        least two humours at waxing, take -1 ongoing to all draws that involve or \
                        take place in the presence of demons. If you have three or more humours at waxing, the \
                        demons will start to come looking for you. Tell the MC they have a new move they \
                        can make when you cede initiative to them: <b>Introduce a demon</b>.",
                    collapsed: true,
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "go into The Embassy and offer payment to a demon,",
                    effect: "tell them what you want and make the <b>haggle over a price</b> move. \
                        Instead of the usual list, the demons can choose from these: \
                        <ul> \
                            <li>Ask you for a greater amount of your humour</li> \
                            <li>Give you a warped version of what you wanted</li> \
                            <li>Involve more demons in the arrangement</li> \
                            <li>Counter with something of comparable cost or value</li> \
                            <li>Counter with something unexpected or wildly irrelevant</li> \
                        </ul>",
                    collapsed: true,
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "attend one of Amadeus's parties,",
                    effect: "draw + discard Phlegm. On a Sated, hold 3. On a Waxing, hold 1. Spend \
                        your hold 1 for 1 on these options: \
                        <ul> \
                            <li>Name or invent an NPC: They're there at the party with you.</li> \
                            <li>Have a conversation with an NPC who's present, and they'll be impressed with what you say.</li> \
                            <li>Have a conversation with an NPC who's present, and they'll agree to talk to you later.</li> \
                            <li>Choose a character who's present: You manage to evade them all night. They never even realize you were there.</li> \
                            <li>Invent a rumor, and everyone at the party will hear it and remember it without knowing its source.</li> \
                        </ul> \
                        Lower or no discard, you publically disgrace yourself due to your clumsiness, \
                        ignorance, or poor manners. Unless you can make good with Amadeus somehow, you won't \
                        be welcome at the next party.",
                    collapsed: true,
                    humour: "phlegm"
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "attend one of Amadeus's parties dressed to impress,",
                    effect: "you may choose to discard a card. If you do, the other guests find your \
                        clothing to be the height of fashion and will show up to the next party wearing \
                        outfits inspired by your own.",
                    collapsed: true
                },
                {
                    title: "",
                    leadin: "",
                    trigger: "At the beginning of each session,",
                    effect: "if Amadeus hasn't yet announced his next party, (and it isn't currently ongoing,) \
                        flip a coin. On a heads, mark a box in the Party Countdown. When two boxes are marked, \
                        Amadeus will send out invitations to all PCs who have his favor.",
                    collapsed: true
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "travel through the tunnels beneath the city with a particular destination in mind,",
                    effect: "instead of making the <b>Go Somewhere</b> move, do this: State your intended \
                        destination, then draw + discard Yellow Bile. On a Sated, choose 3. On a Waxing, choose \
                        2: \
                        <ul> \
                            <li>You find your way to the place you were looking for, or as close as can be managed. \
                                (If not, the MC tells you what you find instead.)</li> \
                            <li>You avoid running into any demonic presence</li> \
                            <li>You don't expose yourself to Fall-dough corruption. (Otherwise, mark a box in the \
                                appropriate countdown.)</li> \
                            <li>You remember the way back to where you came from</li> \
                        </ul> \
                        Lower or no discard, choose 2 anyway, but neither can be that you find your way.",
                    collapsed: true,
                    humour: "yellowbile"
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "visit Oyster's apartment,",
                    effect: "ask the MC what's happening downstairs. The MC will choose one of these and \
                        describe: \
                        <ul> \
                            <li>You hear unsettling sounds</li> \
                            <li>You see unsettling visions</li> \
                            <li>You smell unsettling smells</li> \
                            <li>A ghost appears</li> \
                        </ul> \
                    If you are Oyster, make this move no more than once per session.",
                    collapsed: true
                }
            ],
            custom: false
        },
        {
            label: "Trial Moves",
            moveslist: [
                {
                    title: "Introduce Law",
                    leadin: "When you",
                    trigger: "cite an existing law or legal precedent,", 
                    effect: "draw + discard Orgone. \
                            On a sated, the law or precedent stands, just as you say. On a waxing, the \
                            MC will add a twist or detail. If the law or legal precedent clearly and unambigiously \
                            supports your case for Zanzibar, choose one relevant slider and move it towards acquittal. \
                            If it clearly and unambiguously undermines your case, the MC will choose one relevant \
                            slider and move it towards conviction. \
                            <br/>Lower or no discard, cede initiative to the prosecution (or the MC.)",
                    humour: "orgone",
                    collapsed: true
                },
                {
                    title: "Make an Emotional Appeal",
                    leadin: "When you",
                    trigger: "attempt to sway the emotions of the court,", 
                    effect: "draw + discard Orgone. On a Sated, choose one emotional state from the \
                            list that matches the tone of your attempt, and the court will feel that \
                            emotion until circumstances change. On a Waxing, pick three emotional states \
                            to eliminate from the list, and the MC will choose the court's new state from \
                            the ones that remain.<br />\
                            <ul> \
                                <li>Anger</li>\
                                <li>Sorrow</li>\
                                <li>Joy</li>\
                                <li>Boredom</li>\
                                <li>Fear/Disgust</li>\
                                <li>Strange demon emotions</li>\
                            </ul> \
                            Regardless, the prosecutor gets a chance to speak immediately after.\
                            <br/>Lower or no discard, cede initiative to the prosecution (or the MC.)",
                    humour: "orgone",
                    collapsed: true
                },
                {
                    title: "Argue or Refute",
                    leadin: "When you",
                    trigger: "make an argument to the court,", 
                    effect: "or when you logically refute an argument already made, ask the \
                            MC if the judge accepts your logic. If they accept your logic, draw + \
                            discard Yellow Bile. Take mill 1 forward if your argument cites evidence, \
                            law, or legal precedent that has been introduced. On a hit, choose one \
                            relevant slider and move it one space towards acquittal (if that's what \
                            your argument or refutation supports.) If the audience's emotional state is \
                            congruent with your argument's tone, instead move it two spaces. On a Waxing, \
                            the prosecution also gets a chance to speak immediately after. \
                            <br/>Lower or no discard, cede initiative to the prosecution (or the MC.)",
                    humour: "yellowbile",
                    collapsed: true
                },
                {
                    title: "Introduce Evidence/Call Witness",
                    leadin: "When you",
                    trigger: "call for evidence or a witness to be presented to the court,", 
                    effect: "explain to the judge how the evidence or witness is relevant to the case. \
                            If the judge agrees it is relevant, you may introduce it/them to the court. \
                            If the judge does not see the relevance, draw + discard Black Bile. On a Sated, \
                            they will allow it anyway. On a Waxing, they will allow it, provided the prosecutor \
                            gets a chance to examine, question, or tamper with it in private first. \
                            If the evidence or witness is not currently available but might reasonably \
                            be obtained, you can call for recess to \
                            obtain it - if you do, take mill 1 forward for that move. \
                            <br/>Lower or no discard, cede initiative to the prosecution (or the MC.)",
                    humour: "blackbile",
                    collapsed: true
                },
                {
                    title: "Interrogate a Witness",
                    leadin: "When you",
                    trigger: "interrogate a witness", 
                    effect: "proceed as per the <b>Read a Person</b> move, but spend your hold\
                            instead on these options:<br />\
                            <ul>\
                                <li>Is your character telling the truth?</li> \
                                <li>What is your character really feeling?</li> \
                                <li>Is your character holding anything back?</li> \
                                <li>Do you know anything important about _____ ?</li> \
                                <li>What subject do you wish I'd ask about?</li> \
                                <li>What subject do you most hope I'd avoid?</li> \
                            </ul><br />\
                            Or if your witness is a demon, on these options:<br />\
                            <ul>\
                                <li>Are you Zanzibar's friend?</li>\
                                <li>Are you hungry?</li>\
                            </ul>",
                    humour: "blackbile",
                    collapsed: true
                },
                {
                    title: "Call for Recess",
                    leadin: "When you",
                    trigger: "formally request recess from trial,", 
                    effect: "state the reason why to the judge and draw + discard Phlegm. On a hit, your \
                            request is granted. On a Sated, also choose one:<br />\
                            <ul> \
                                <li>The recess will last long enough for you to do more than a single quick thing</li> \
                                <li>You won't be escorted by demons until it ends</li> \
                            </ul>\
                            In either case, when the recess ends, reset your \"Held in Contempt\" countdown to 0. \
                            <br/>Lower or no discard, cede initiative to the prosecution (or the MC.)",
                    humour: "phlegm",
                    collapsed: true
                },
                {
                    title: "Show Contempt",
                    leadin: "When you",
                    trigger: "show contempt for court in the eyes of the judge,", 
                    effect: "either intentionally or by accident, mark a box in a countdown called \
                            \"Held in Contempt\". If you have no such countdown, create it as a 3-box \
                            countdown. \
                            <br/>If the third box becomes checked, immediately cede initiative to the MC.",
                    collapsed: true
                },
                {
                    title: "MC Trial Moves",
                    leadin: "",
                    trigger: "", 
                    effect: "During the trial, the MC has access to the following moves: \
                    <ul> \
                        <li><b>Introduce a new demon law</b></li>\
                        <li><b>Change, complicate or expand an existing law</b></li>\
                        <li><b>Make demands, reasonable or un-</b></li>\
                        <li><b>Enact penalties on any or all present in the courtroom</b></li>\
                        <li><b>Introduce new evidence or witnesses</b></li>\
                        <li><b>Demons: Act on their emotional state</b></li>\
                        <li><b>Call for legal processes to be carried out</b></li>\
                        <li><b>Offer a deal</b></li>\
                        <li><b>Move a trial slider one step in any direction</b></li>\
                    </ul>",
                    collapsed: true
                }
            ]
        },
        {
            label: "Card Moves",
            moveslist:[
                {
                    title: "Draw + Discard",
                    leadin: "When",
                    trigger: "a move tells you to draw + discard,",
                    effect: "immediately draw a card, then either choose a card from your hand and discard it. \
                        if your card has one panel that shares a color with the humour specified by the move, \
                        take your slider value for that humour and add one to it. If both of the card's panels \
                        share a color with the humour specified by the move, take your slider value for that \
                        humour and add two to it. If neither panel matches the color of the humour specified \
                        by the move, take your slider value for the humour specified by the move and use it \
                        unaltered. If you choose not to discard, take the 'no discard' result for the move.",
                    collapsed: true,
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "play a card for draw+discard that has a left-pointing arrow,",
                    effect: "reduce the slider level of the slider corresponding to the arrow's humour \
                        color by one notch. If your humour is reduced to Dry, immediately reset to Balanced \
                        and tell the MC to choose an MC Advancement for you from the appropriate list.",
                    collapsed: true,
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "discard two cards containing at least one panel each of the same color,",
                    effect: "increase the slider level of the humour that matches that color by one step. You may \
                        not increase more than one humour at a time in this way. If your discard \
                        reduces your hand to 0 cards, you may immediately draw 1. If your humour \
                        advances to Sated, immediately reset to Balanced and choose a Player Advancement \
                        from the appropriate list.",
                    collapsed: true,
                },
                {
                    title: "",
                    leadin: "When you",
                    trigger: "draw for draw+discard and have mill,",
                    effect: "choose: Keep the card you drew, or discard it to no effect and draw again. You \
                        may make this choice as many times as you have mill. (Typically, only once - 'mill 1'.) \
                        Note that if you have a bonus 'forward', it only applies to the next draw, whereas \
                        if you have a bonus 'ongoing', it applies as long as the circumstances that grant it \
                        are in effect.",
                    collapsed: true,
                },
            ],
            custom: false
        },
        {
            label: "Plasmic Rituals",
            moveslist: [
                {
                    title: "Perform a Ritual",
                    leadin: "When you",
                    trigger: "perform a plasmic ritual,",
                    effect: "choose 0 or more Plasm to spend. Use Plasm spent 1 for 1 to buy effects. \
                        Also, for each Plasm spent, flip a coin. For every flip that comes up heads, the \
                        MC gets one point to buy side effects.",
                    collapsed: true
                },
                {
                    title: "Ritual for Returning from Magbriggan",
                    leadin: "",
                    trigger: "",
                    effect: "<p>Prepare a pig swaddled in black velvet, a set of five pewter oil lamps, \
                        a red glass tumbler, and a chamber of perfect silence and darkness. Arrange the \
                        lamps within the chamber according to the forms and ways.</p> \
                        <p> Blindfold the ritual's subject in black velvet and lead them into the \
                        chamber. Bid them sit cross-legged at the chamber's crux-point and remain utterly \
                        still and silent.</p> \
                        </p>Into the silence and darkness, introduce five pure tones on a pentatonic scale. \
                        Lead in the pig while the tones carry and lie it down in the exact center of the \
                        floor. Unwrap the swaddling and pierce its gallbladder with brass. Catch the blood in \
                        the tumbler. Annoint the ritual's subject with the blood.</p> \
                        <p>As the pig bleeds to death, light the lamps in counterclockwise order without \
                        gazing upon the subject. When the last lamp is lit, the subject will have vanished.</p> \
                        <br/> \
                        <p>By default, you get the first effect in each list. Spend plasm to buy your way up the list.</p> \
                        Number Affected: \
                        <ul> \
                            <li>1 person</li> \
                            <li>2 people</li> \
                            <li>A group of people</li> \
                            <li>A crowd of people</li> \
                        </ul> \
                        Destination: \
                        <ul> \
                            <li>Anywhere on Earth</li> \
                            <li>A specific continent</li> \
                            <li>A specific country</li> \
                            <li>A specific city</li> \
                            <li>Within a specific 10-foot radius</li> \
                        </ul> \
                        Time Period: \
                        <ul> \
                            <li>Anywhere in Earth's history</li> \
                            <li>A specific century</li> \
                            <li>A specific decade</li> \
                            <li>A specific year</li> \
                            <li>A specific day</li> \
                            <li>A specific hour</li> \
                        </ul> \
                        Possessions: \
                        <ul> \
                            <li>None</li> \
                            <li>Skintight clothing, the contents of a gripped fist</li> \
                            <li>Loose clothing, the contents of pockets</li> \
                            <li>Up to ten pounds of matter in physical contact with the subject</li> \
                        </ul> \
                        <br /> \
                        Side Effects: \
                        <ul> \
                        <li>The subject suffers amnesia of the last day for hours \
                            <ul><li>...of the last week \
                                <ul><li>...of the whole time they spent in Magbriggan \
                                    <ul><li>...of their whole life \
                                    </li></ul> \
                                </li></ul> \
                            </li></ul> \
                            <ul><li>...of a specific thing, person or incident \
                            </li></ul> \
                            <ul><li>...for weeks \
                                <ul><li>...forever \
                                </li></ul> \
                            </li></ul> \
                        </li> \
                        <li>The ritual-caster is transported to some other location within Magbriggan</li> \
                        <li>The ritual-caster is transported hours into the future \
                            <ul><li>...days \
                                <ul><li>...years \
                                </li></ul> \
                            </li></ul> \
                            <ul><li>...into the past \
                            </li></ul> \
                        </li> \
                        <li>The ritual-caster experiences a vision of some other time or place within Magbriggan</li> \
                        <li>The ritual-caster learns the secret thoughts of one subject \
                            <ul><li>...all subjects \
                            </li></ul> \
                        </li> \
                        </ul>",
                    collapsed: true
                },
                {
                    title: "General Side-Effects",
                    leadin: "",
                    trigger: "",
                    effect: "\
                        <ul> \
                            <li>The ritual-caster suffers mystic injuries \
                                <ul><li>...with permanent mental side effects \
                                    <ul><li>...that drastically transform their perception of the world \
                                    </li></ul> \
                                </li></ul> \
                                <ul><li>...with permanent physical side effects \
                                    <ul><li>....that drastically transform their body \
                                    </li></ul> \
                                </li></ul> \
                            </li> \
                            <li>Ghosts appear at the ritual site \
                                <ul><li>...and linger \
                                </li></ul> \
                                <ul><li>...and take personal issue with one person involved \
                                    <ul><li>...all people involved \
                                    </li></ul> \
                                </li></ul> \
                            </li> \
                            <li>One of the ritual-caster's humours is depleted by one snifter \
                                <ul><li>...two snifters \
                                </li></ul> \
                                <ul><li>All of the ritual-caster's humours... \
                                </li></ul> \
                            </li> \
                        </ul>",
                    collapsed: true
                }
            ],
            custom: false
        }
    ];

    //////////



    this.getId = function () {
        return "dc-humours-moves"
    }

    // A component should know how to handle some events
    // called when Wanderer is ready to talk to us
    // a component talks to the rest of the app throught a communicator
    // the communicator will call the components methods like OnNewCharacter and OnSave at the appropreat time
    // the communicator also allows know what to have to write also holds the infomation 
    // all events are optional
    this.OnStart = function (communicator, logger, page, dependencies) {
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
        this.movescatalogue = [];
        default_move_catalogue.forEach(function (defaultMove) {
            that.movescatalogue.push(defaultMove);
        });
        if (this.communicator.canRead("custommoves")) {
            that.communicator.read("custommoves").forEach(function (customMove) {
                that.movescatalogue.forEach(function (move) {
                    if (move.label == customMove.label) {
                        var at = that.movescatalogue.indexOf(move);
                        that.movescatalogue.splice(at, 1, customMove);
                    }
                })
            });
        }
    }
    this.OnUpdate = function () {
    }

    this.getRequires = function () {
        return ["dc-humours-moves"];
    }

    this.canClose = function () {
        return true;
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

g.services.componetService.registerCharacter(component);
