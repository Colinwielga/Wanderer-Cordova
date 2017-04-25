var DCPbtACountdowns = {};

DCPbtACountdowns.component = function () {
    //A module to list countdowns. A countdown is a series of checkable boxes
    //with a description attached. In-game circumstances will trigger the boxes being filled.
    //When the last one is filled, something will happen.

    this.new_box_num = 6;

    this.countdown_list = [];

    this.addCountdown = function(num_boxes){
        countdown = {
            description: "",
            boxlist: [],
            show_delete: false
        };
        for(i = 0; i < num_boxes; i++){
            this.addBox(countdown);
        }
        this.countdown_list.push(countdown);
    };

    this.toggleDeleteCountdown = function(countdown){
        countdown.show_delete = !countdown.show_delete;   
    };

    this.deleteCountdown = function(countdown){
        this.countdown_list.splice(this.countdown_list.indexOf(countdown), 1);
    };

    this.markBox = function(countdown){
        i = countdown.boxlist.indexOf(false);
        if(i > -1){
            countdown.boxlist[i] = true;
        }
    };

    this.unmarkBox = function(countdown){
        i = countdown.boxlist.indexOf(false);
        if(i > 0){
            countdown.boxlist[i-1] = false;
        } else if (i === -1){
            countdown.boxlist[countdown.boxlist.length - 1] = false;
        }
    };

    this.addBox = function(countdown){
        countdown.boxlist.push(false); 
    };

    this.subtractBox = function(countdown){
        countdown.boxlist.slice(0, countdown.boxlist.length-1);
    };
    // all component need a unique ID
    this.getId = function () {
        return "dc-pbta-countdowns"
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
        this.communicator.write("countdown_list",this.countdown_list);
    }
    // called when a characrer is loaded 
    this.OnLoad = function () {
        if (this.communicator.canRead("countdown_list")){
             this.countdown_list = this.communicator.read("countdown_list");
        }
    }
    this.OnUpdate = function () {
    }

    // hmm is it really safe for this to be a function?
    // we use functions so no one can edit
    this.getRequires = function () {
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
        return "Countdowns";
    }

    this.OnNewCharacter();
}

g.ComponetRegistry.register(DCPbtACountdowns.component);
