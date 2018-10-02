var DCHumoursPlayerQuestions = {};

DCHumoursPlayerQuestions.component = function () {

    //Returns the list of questions for tab at index tab_idx, defaulting to 
    //the currently selected tab.
    this.getQuestionlistForTab = function (tab_idx) {
        tab_idx = tab_idx || this.current_tab;
        return this.questionlist[tab_idx].questions;
    };
    this.getNonQuestionlistForTab = function (tab_idx) {
        tab_idx = tab_idx || this.current_tab;
        return this.questionlist[tab_idx].non_questions;
    };

    //Changes the currently selected question section.
    this.changeTab = function (section) {
        this.current_tab = this.questionlist.indexOf(section);
    };

    //Changes the currently selected question choice.
    this.selectChoice = function (question, choice) {
        question.choices.forEach(function (q_choice) {
            q_choice.chosen = q_choice === choices;
        });
    };

    this.questionlist = [
        {
            name: "Yourself",
            questions: [
                {
                    q: "How did you end up here in the city?",
                    q_details: "Was it intentional, accidental, or \
                        were you brought here against your will? Or were you born here?",
                    a: ""
                },
                {
                    q: "How long have you lived in the city?",
                    q_details: "What place do you call home? \
                        How do you get by, day to day? (I encourage you to have been here for at \
                            least a few months, minimum. It's not to the game's benefit for you to be a stranger.)",
                    a: ""
                },
                {
                    q: "What do you look like?",
                    q_details: "What sort of clothes do you wear? What's the one \
                        detail of your appearance that a stranger who'd only met you once would most \
                        likely use to describe you?",
                    a: ""
                }
            ]
        },
        {
            name: "Your Circumstances",
            questions: [
                {
                    q: "Describe a (non-player) character who is your friend, ally, or confidante.",
                    c1: "What problem did they recently lay at your feet, and how has it become your problem, too?",
                    c2: "What risky scheme or business venture did they enlist you in? What makes it appealing to you, despite the gamble?",
                    a: ""
                },
                {
                    q: "Describe a location, business, or establishment in the city where your face is well-known.",
                    c1: "What unusual job did they recently hire you for? Why did you agree to do it, even though you're secretly not sure you're up to the task?",
                    c2: "How come you've felt the need to avoid that place for your own safety over the past week or two? What changed to make you unwelcome?",
                    a: ""
                },
                {
                    q: "Describe a (non-player) person, organization, local custom, or feature of the landscape that is adversarial to you, either directly or passively.",
                    c1: "What's your plan to kill, destroy, disband, or otherwise eliminate them, and what obstacle stops you from enacting it (for the moment)?",
                    c2: "What have they done recently that directly, personally threatens your livelihood, where previously the threat was impersonal or distant?",
                    a: ""
                },
                {
                    q: "Describe a strange, mysterious, or noteworthy object that many people in the city would recognize.",
                    c1: "Why do you covet it, and why haven't you just gone and gotten it for yourself yet?",
                    c2: "How did it fall into your possession, and why haven't you gotten rid of it yet, given that your enemies know you have it?",
                    a: ""
                }
            ]
        },
        {
            name: "Your Friends (or possibly Enemies)",
            questions: [
                {
                    q: "If you haven't named yourself, do so now:",
                    short_answer: true,
                    a: ""
                },
                {
                    q_details: "Wait to proceed until everyone's caught up to this point. \
                        Once they are, go around the table and briefly introduce your \
                        characters to each other by name, description and circumstances. \
                        Then continue with the next set of questions. We'll go around the \
                        table for each one and let everyone answer before moving on to the \
                        next. You might want to make note of the other players' answers \
                        somewhere as well as your own, especially if they directly involve \
                        you:",
                    a: ""
                },
                {
                    q_details: "Ask the other players: \"Who do I owe a great debt to, and why?\" \
                        If multiple players answer, choose the one whose \"why\" you like the \
                        most. Whoever it ends up being, set your debt with them to -3 and \
                        remind them that since debt is zero-sum, they should set their debt \
                        with you to +3. If that person later asks who they owe a debt to, don't \
                        answer. We already know where the balance of debt falls between you \
                        and them.",
                    use_name: true,
                    name: "",
                    a: ""
                },
                {
                    q_details: "Now, choose one of the remaining players. They have something you \
                        need or want: An ability they could use to help you, a resource, a piece \
                        of information, training or knowledge, a particular object, connections \
                        to the right people, forgiveness, their undying love... Whatever it is, \
                        tell them now. They might be surprised by this revelation, but so it goes. \
                        If necessary, you and the MC can work with them to give them an appropriate \
                        move to reflect the thing they have.",
                    use_name: true,
                    name: "",
                    a: ""
                },
                {
                    q_details: "Finally, turn to whoever's left, choose together one thing from \
                        this list, and agree on the details:",
                    choice_list: [
                        "You share a common enemy (who?)",
                        "You share a common ally (who?)",
                        "You share a common resource (what?)",
                        "You share a common duty or responsibility (what?)",
                        "You share a common affiliation (with what group?)",
                        "You share a common goal or business interest (what?)",
                        "You share a common heritage (what sets the two of you \
                            apart from everyone else and clearly marks you as \
                            different?)",
                        "You share a grudge or vendetta against each other (why?)"
                    ],
                    use_name: true,
                    name: "",
                    a: ""
                },
                {
                    q_details: "Meanwhile, the other players will be doing the same \
                        thing, so for each one of them, you'll wind up either being owed \
                        a debt by them, having something they need, or else picking something\
                        from the list together. If it works out that your \"whoever's left\" \
                        also has you for their \"whoever's left\", go ahead and pick two things \
                        from the list together, no worries. Here are some text boxes for \
                        you to record the other players' relationship details with you:",
                    use_name: true,
                    name: "",
                    a: ""
                },
                {
                    use_name: true,
                    name: "",
                    a: ""
                },
                {
                    use_name: true,
                    name: "",
                    a: ""
                }
            ]
        },
        {
            name: "Finally, do this:",
            non_questions: [
                "Pick one reputation for yourself (in the Reputations module)",
                "List any interesting or important gear you carry (in the Tools \
                    module)",
                "Set Blood to Waxing, one other humour to Balanced, and the rest \
        to Waning (in the Humour Sliders module)",
                "Create two moves for your character and add them to your player \
        moves (in the Moves module.) Please tie at least one of them to \
        Orgone, with Sated and Waxing results. Please also don't hesitate \
        to toss ideas around or ask the MC for suggestions if you're \
        stumped."
            ]
        }

    ];

    // all component need a unique ID
    this.getId = function () {
        return "dc-humours-player-questions";
    };

    // A component should know how to handle some events
    // called when Wanderer is ready to talk to us
    // a component talks to the rest of the app throught a communicator
    // the communicator will call the components methods like OnNewCharacter and OnSave at the appropreat time
    // the communicator also allows know what to have to write also holds the infomation 
    // all events are optional
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };
    // called when a new character is created
    this.OnNewCharacter = function () {
        this.current_tab = 0;
    };
    // called when a character is saved
    this.OnSave = function () {
        this.communicator.write("questionlist", this.questionlist);
    };
    // called when a characrer is loaded 
    this.OnLoad = function () {
        if (this.communicator.canRead("questionlist")) {
            this.questionlist = this.communicator.read("questionlist");
        }
    };
    this.canClose = function () {
        return true;
    };
    this.OnUpdate = function () {
    };

    // hmm is it really safe for this to be a function?
    // we use functions so no one can edit
    this.getRequires = function () {
        return ["colin-wielga-tools"];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        };
    };

    // a component should be able to provide some infomation
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };

    this.getTitle = function () {
        return "Player Questions";
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(DCHumoursPlayerQuestions.component);
