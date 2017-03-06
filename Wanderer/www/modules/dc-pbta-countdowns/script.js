var DCPbtACountdowns = {};

DCPbtACountdowns.component = function () {
    //A module to list countdowns. A countdown is a series of checkable boxes
    //with a description attached. In-game circumstances will trigger the boxes being filled.
    //When the last one is filled, something will happen.

    this.countdown_list = [];

    this.addCountdown = function(num_boxes){
        countdown = {
            description: "",
            boxlist: []
        };
        for(i in num_boxes){
            countdown.boxlist.push({
                description: "",
                checked: false
            }); 
        }
        this.countdown_list.push(countdown);
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
        return ["colin-wielga-tools"];
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
