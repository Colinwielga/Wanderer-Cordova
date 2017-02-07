var DCHumoursAdvancements = {};

DCHumoursAdvancements.component = function () {

    this.advancements = [
        {
            humour: "blood",
            label: "Sanguine Advancements",
            expanded: false,
            pc_advs: {
                taken: [
                    {
                        text: "The player gets a lovely red canoe"
                    }
                ],
                untaken: [
                    {
                        text: "The player feels calm and at peace"
                    },
                    {
                        text: "The player gets a 20% discount at Costco"
                    }
                ]
            },
            mc_advs: {
                taken: [
                    {
                        text: "The player's favorite stuffed animal loses all of its stuffing"
                    },
                    {
                        text: "The player is forced to take a bath"
                    }
                ],
                untaken: [
                    {
                        text: "The player's luggage is sent to Belgium"
                    }
                ]
            }
        },
        {
            humour: "yellowbile",
            label: "Choleric Advancements",
            expanded: false,
            pc_advs: {
                taken: [],
                untaken: []
            },
            mc_advs: {
                taken: [],
                untaken: []
            }
        },
        {
            humour: "blackbile",
            label: "Melancholic Advancements",
            expanded: false,
            pc_advs: {
                taken: [],
                untaken: []
            },
            mc_advs: {
                taken: [],
                untaken: []
            }
        },
        {
            humour: "phlegm",
            label: "Phlegmatic Advancements",
            expanded: false,
            pc_advs: {
                taken: [],
                untaken: []
            },
            mc_advs: {
                taken: [],
                untaken: []
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
        adv_dict.untaken.splice(adv_dict.untaken.indexOf(adv), 1);
        adv_dict.taken.push(adv);
    }
    this.untake = function(adv_dict, adv){
        adv_dict.taken.splice(adv_dict.taken.indexOf(adv), 1);
        adv_dict.untaken.push(adv);
    }

    //Expands or collapses the list in the view
    this.toggleCollapse = function($event, humour){
        humour.expanded = !humour.expanded; 
        event.stopImmediatePropogation();
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
    this.OnStart = function (communicator,dependencies) {
        this.communicator = communicator
        this.Dependencies = dependencies
    }
    // called when a new character is created
    this.OnNewCharacter = function () {
        // something like:
        //this.key = "value";
    }
    // called when a character is saved
    this.OnSave = function () {
        // something like:
        //this.communicator.write("key",this.key);
    }
    // called when a characrer is loaded 
    this.OnLoad = function () {
        // something like:
        // if (this.communicator.canRead("key")){
        //this.key = this.communicator.read("key");
        //}else{
        //this.key = "default value"
        //}
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

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }

    this.getTitle = function () {
        return "Advancements";
    }

    this.OnNewCharacter();
}

g.ComponetRegistry.register(DCHumoursAdvancements.component);
