var DCHumoursAdvancements = {};

DCHumoursAdvancements.component = function () {

    this.advancements = [
        {
            humour: "blood",
            label: "Sanguine Advancements",
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
        event.stopImmediatePropogation();
    };

    //Returns the humour object with the given name, or undefined
    this.getHumour = function(humourname){
        this.advancements.forEach(function(humour_obj){
            if(humour_obj.humour === humourname){
                return humour_obj;    
            }
        });
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
    this.OnStart = function (communicator,dependencies) {
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
                var adv_humour = this.getHumour(loaded_humour.humour);

                if(adv_humour){
                    //First put the PC's loaded taken advancements into the "taken" list
                    adv_humour.pc_advs.taken = loaded_humour.pc_advs_taken; 
                    //Then remove those advancements from the "untaken" list, if they're in it
                    loaded_humour.pc_advs_taken.forEach(function(adv){
                        var untaken_index = adv_humour.pc_advs.untaken.indexOf(adv);
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

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }

    this.getTitle = function () {
        return "Advancements";
    }

    this.OnNewCharacter();
}

g.ComponetRegistry.register(DCHumoursAdvancements.component);
