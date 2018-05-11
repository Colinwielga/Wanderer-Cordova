var DCHumoursAdvancements = {};

DCHumoursAdvancements.component = function () {
    var that = this;
    this.advancements = [
        {
            humour: "",
            label: "Ungiven Future",
            expanded: false,
            pc_advs: {
                taken: [],
                untaken: [
                    {text: "Create a new move for your character."},
                    {text: "Create a new move for your character."},
                    {text: "Choose one of your character's moves and delete it."},
                    {text: "Choose a humour. From now on, whenever you draw+discard that humour, take +1 mill"},
                    {text: "Choose a humour. From now on, whenever you draw+discard that humour, take +1 mill"},
                    {text: "From now on, nothing you do counts as Inviting Trouble."},
                    {text: "Name a demon. That demon dies a horrible death with or without clear reason."},
                    {text: "Retire your character to safety. Create a new character to play with if you wish."},
                    {text: "Create a second character and play them alongside the current one."},
                ]
            },
            mc_advs: {taken:[], untaken:[]}
        },
        {
            humour: "orgone",
            label: "Orgonic Advancements",
            expanded: false,
            pc_advs: {
                taken: [],
                untaken: [
                    {text: "Choose another player. That player creates a new move for you."},
                    {text: "Give yourself a new reputation: Lively, Inspired, Charismatic, Healthy or Virile"},
                    {text: "Give yourself a new reputation of your choice"},
                    {text: "Choose one physical ailment, injury or disease that afflicts you: It heals or is cured, even if it seemed permanent or uncurable."},
                    {text: "When you Cash In Your Dues, you can also spend 1 debt to choose: If they do it, they can increase one slider (of your choice) by 1."},
                    {text: "Choose another player. You gain 3 debt with that player."},
                ]
            },
            mc_advs: {
                taken: [],
                untaken: [
                    {text: "Choose another player. That player creates a new move for this player that is tied to Orgone."},
                    {text: "Create a move for the player that is triggered when this humour is Waxing"},
                    {text: "Give the player a new reputation: Wacko, Hyperactive, Creepy, Egotistical or Deranged"},
                    {text: "Give the player a new countdown with three boxes, a clear trigger for checking them, and a dramatic complication that will occur when the third box is checked."},
                ]
            }
        },
        {
            humour: "blood",
            label: "Sanguine Advancements",
            expanded: false,
            pc_advs: {
                taken: [],
                untaken: [
                    {text: "You gain a distinct, permanent mark of your injuries, such as a scar. Describe it as you choose and list it on your character sheet. You may take this advancement more than once.",
                        retakable: true},
                    {text: "Someone who once defeated you in a fight becomes your ally, if you'll forgive them. Decide who."},
                    {text: "Give yourself a reputation: Generous, Kind, Compassionate, Big-hearted, Loyal, or Jolly."},
                    {text: "Draw a card."},
                    {text: "Draw a card."},
                    {text: "Draw two cards."},
                    {text: "Choose one NPC, object or place (building-sized) that is important to you: It is now protected. The MC will not kill it, break it, destroy or ruin it, or allow it to come to unbearable harm."},
                    {text: "The next time you would be killed, you can choose for your character to survive by an inch. Work with the MC to explain how your character survived and where and in what condition they will make their return."},
                ]
            },
            mc_advs: {
                taken: [],
                untaken: [
                    {text: "The character gains a distinct, permanent disfigurement, such as a scar. Describe it appropriately and tell them to list it on their character sheet. You may pick this advancement more than once.",
                        retakable: true},
                    {text: "They get a persistent wound: Describe it in as much gory detail as pleases you. They take -1 ongoing until they find treatment. You may pick this advancement more than once.",
                        retakable: true},
                    {text: "Someone they once defeated in a fight is back for revenge. Your decision when and how this person shows up."},
                    {text: "Give them a Reputation: Cold-Blooded, Vicious, Cruel, Manipulative, Vengeful or Dangerous"},
                    {text: "Decrease their Black Bile by one step."},
                    {text: "Decrease their Yellow Bile by one step."},
                    {text: "Decrease their Phlegm by one step."},
                    {text: "Decrease their Yellow Bile by two steps."},
                    {text: "Ask them to name three things - objects, characters or buildings/establishments that they honestly care about (and that aren't protected, as per the player advancement). Choose one and introduce a significant threat to it at your earliest convenience. If they can't name three, tell them to name as many as they can manage. If they can't name any - and nobody else at the table can, either - you'll just have to send the threat after their own ice-hearted self. Make it a particularly twisted one."},
                ]
            }
        },
        {
            humour: "yellowbile",
            label: "Choleric Advancements",
            expanded: false,
            pc_advs: {
                taken: [],
                untaken: [
                    {text: "Create a new move."},
                    {text: "Give yourself a new reputation: Bold, Strong, Powerful, Important, Leaderlike, or Macho"},
                    {text: "You get a group of reasonably loyal followers. Work with the MC to detail them and create a new move if necessary."},
                    {text: "Check two boxes on one of your countdowns. If this fills it to completion, resolve it as appropriate."},
                    {text: "From now on, when you Seduce or Manipulate someone, your solemnly sworn oath counts as concrete assurance."},
                    {text: "From now on, when you Intrude Somewhere, you can choose to remain hidden in place after doing one quick thing instead of leaving. Nobody will find you until you act."},
                ]
            },
            mc_advs: {
                taken: [],
                untaken: [
                    {text: "Create a new move for the player"},
                    {text: "Create a move for the player that is triggered when this humour is Waxing"},
                    {text: "Give the player a new reputation: Angry, Bullish, Short-tempered, Hot-headed, Loudmouthed or Pushy"},
                    {text: "The player attracts the attention of a new rival, opponent, clinger-on, busybody or stalker. Detail their moves and impulses in your notes."},
                ]
            }
        },
        {
            humour: "blackbile",
            label: "Melancholic Advancements",
            expanded: false,
            pc_advs: {
                taken: [],
                untaken: [
                    {text: "Create a new move."},
                    {text: "Give yourself a new reputation: Thoughtful, Wise, Perceptive, Creative, Sensitive, or Clever"},
                    {text: "You get a small building or piece of land for which you are responsible. Work with the MC to detail it and describe your duties towards it."},
                    {text: "You discover a new fact about the world or the answer to a curiousity. Ask the MC one simple question about the world, the city, or the city's inhabitants, and they will answer fully and honestly. If you think it's important to do so, the two of you can take a moment to figure out where and how your character found this information."},
                    {text: "From now on, when you Go Somewhere, treat any result less than a Waxing as if it were Waxing."},
                    {text: "From now on, when you Read a Person, if it's a PC, you may also ask 'What could I do to put your character in my debt?' If you do the thing they say, move your debt with them 1 point in your favor."},
                ]
            },
            mc_advs: {
                taken: [],
                untaken: [
                    {text: "Create a new move for the player"},
                    {text: "Create a move for the player that is triggered when this humour is Waxing"},
                    {text: "Give the player a new reputation: Flighty, Aloof, Withdrawn, Anxious, Moody or Vain"},
                    {text: "Describe how a location important to the player shifts or changes in a way that is unwholesome or inconvenient. Create a new World move to reflect the change."},
                ]
            }
        },
        {
            humour: "phlegm",
            label: "Phlegmatic Advancements",
            expanded: false,
            pc_advs: {
                taken: [],
                untaken: [
                    {text: "Create a new move."},
                    {text: "Give yourself a new reputation: Amiable, Easygoing, Durable, Cheerful, Solid or Gentle"},
                    {text: "You find a mysterious artifact. Ask the MC to describe it to you: It's yours to do with as you wish, though it might bring trouble."},
                    {text: "Uncheck two boxes on one of your countdowns"},
                    {text: "From now on, when you Call in a Favor, you can describe an NPC you've never met but who might view you favorably and offer help."},
                    {text: "From now on, when you Have Something, on a Waxing, you can add one reasonable detail to the object the MC describes."},
                ]
            },
            mc_advs: {
                taken: [],
                untaken: [
                    {text: "Create a new move for the player"},
                    {text: "Create a move for the player that is triggered when this humour is Waxing"},
                    {text: "Give the player a new reputation: Slothful, Apathetic, Useless, Pudgy, Hedonistic or Stupid"},
                    {text: "The player is burdened with a new job, duty, responsiblility, expectation, or debt. Describe the conditions they must meet to fulfill it and create a move or countdown as appropriate."},
                ]
            }
        }
    ];
    
    //Returns the names of the advancements for a single category
    this.getAdvs = function(adv_dict){
        var advs = [];
        for(adv in adv_dict){
            if(adv_dict.hasOwnProperty(adv)){
                advs.push(adv);
            }
        }
        return advs;
    };

    this.take = function(adv_dict, adv){
        if(!adv.retakable){
            adv_dict.untaken.splice(adv_dict.untaken.indexOf(adv), 1);
            adv_dict.taken.push(adv);
        }else{
            //This is terrible and JavaScript is stupid.
            adv_dict.taken.push(
                {
                    text: adv.text,
                    retakable: adv.retakable
                }
            );
        }
    }
    this.untake = function(adv_dict, adv){
        adv_dict.taken.splice(adv_dict.taken.indexOf(adv), 1);
        if(!adv.retakable){
            adv_dict.untaken.push(adv);
        }
    }

    //Expands or collapses the list in the view
    this.toggleCollapse = function($event, humour){
        humour.expanded = !humour.expanded; 
        event.stopImmediatePropagation();
    };

    //Returns the humour object with the given name, or undefined
    this.getHumour = function (humourname) {
        for (var i = 0; i < this.advancements.length; i++) {
            if (this.advancements[i].humour === humourname) {
                return this.advancements[i];
            }
        }
        return undefined;
    };

    /////////////////

    // all component need a unique ID
    this.getId = function () {
        return "dc-humours-advancements"
    }

    // A component should know how to handle some events
    // called when Wanderer is ready to talk to us
    // a component talks to the rest of the app throught a communicator
    // the communicator will call the components methods like OnNewCharacter and OnSave at the appropreat time
    // the communicator also allows know what to have to write also holds the infomation 
    // all events are optional
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator
        this.Dependencies = dependencies
    }
    // called when a new character is created
    this.OnNewCharacter = function () {
    }
    // called when a character is saved
    this.OnSave = function () {
        var taken_advancements = [];
        this.advancements.forEach(function(humour_obj){
             var obj = {
                 humour: humour_obj.humour,
                 pc_advs_taken: humour_obj.pc_advs.taken,
                 mc_advs_taken: humour_obj.mc_advs.taken
             }
            taken_advancements.push(obj);
        });
        this.communicator.write("taken_advancements", taken_advancements);
    }
    // called when a characrer is loaded 
    this.OnLoad = function () {
        if (this.communicator.canRead("taken_advancements")){
            var taken_advancements = this.communicator.read("taken_advancements");
            taken_advancements.forEach(function(loaded_humour){
                var adv_humour = that.getHumour(loaded_humour.humour);

                if(adv_humour){
                    //First put the PC's loaded taken advancements into the "taken" list
                    adv_humour.pc_advs.taken = loaded_humour.pc_advs_taken; 
                    //Then remove those advancements from the "untaken" list, if they're in it
                    loaded_humour.pc_advs_taken.forEach(function(adv){
                        var untaken_index = adv_humour.pc_advs.untaken.map(x => x["text"]).indexOf(adv["text"]);
                        if(untaken_index > -1 && !adv.retakable){
                            adv_humour.pc_advs.untaken.splice(untaken_index, 1);
                        }
                    });
                    //And again for the MC moves. (Oy, maybe I should restructure this...)
                    adv_humour.mc_advs.taken = loaded_humour.mc_advs_taken; 
                    loaded_humour.mc_advs_taken.forEach(function(adv){
                        var untaken_index = adv_humour.mc_advs.untaken.indexOf(adv);
                        if(untaken_index > -1 && !adv.retakable){
                            adv_humour.mc_advs.untaken.splice(untaken_index, 1);
                        }
                    });
                }
            });
        }
    }
    this.OnUpdate = function () {
    }

    // hmm is it really safe for this to be a function?
    // we use functions so no one can edit
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

    // a component should be able to provide some infomation
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }

    this.canClose = function () {
        return true;
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }

    this.getTitle = function () {
        return "Advancements";
    }

    this.OnNewCharacter();
}

g.services.componetService.registerCharacter(DCHumoursAdvancements.component);
