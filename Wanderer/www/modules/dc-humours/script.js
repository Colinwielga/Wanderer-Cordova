var component = function () {
    //A component for tracking humours

    // all component need a unique ID
    this.getId = function () {
        return "dc-humours"
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
        this.communicator.write("humours", this.humours);
    }
    // called when a characrer is loaded 
    this.OnLoad = function () {
        if(this.communicator.canRead("humours")){
            this.humours = this.communicator.read("humours");
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
        return "Humours";
    }

    this.OnNewCharacter();

    this.humour_levels = ["Dry", "Waning", "Balanced", "Waxing", "Sated"];
    this.humours = [
        {
            id: "blackbile",
            name: "Black Bile",
            value: "Balanced"
        },
        {
            id: "yellowbile",
            name: "Yellow Bile",
            value: "Balanced"
        },
        {
            id: "phlegm",
            name: "Phlegm",
            value: "Balanced"
        }
    ];
}

g.ComponetRegistry.register(component);
