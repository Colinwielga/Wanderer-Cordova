

var component = function () {
    //A component for storing Powered By The Apocalypse-style moves.

    //Module-specific fields
    this.addNewMove = function(){
        addmove = {
            title: this.newmove.title,
            leadin: this.newmove.leadin,
            trigger: this.newmove.trigger,
            effect: this.newmove.effect
        };
        console.log(addmove);
        this.moveslist.push(addmove);
        this.resetNewMove();
    };

    this.resetNewMove = function(){
        this.newmove.title = "";
        this.newmove.leadin = "When you";
        this.newmove.trigger = "[act and/or circumstances dictate],";
        this.newmove.effect = "[mechanical and/or fictional effects occur.]";
    };
    
    this.getMoveBody = function(move){
        //Returns the html-formatted full body of the move, including leadin, bolded trigger,
        //and effect.
        var leadin = "";
        if(move.leadin){
            leadin = move.leadin.trim() + " ";
        }
        var trigger = "<b>" + move.trigger.trim() + "</b> ";
        return leadin + trigger + move.effect.trim();
    }
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
        this.moveslist = [{
            title: "Go Aggro",
            leadin: "When you",
            trigger: "go aggro on someone,",
            effect: "roll +hard. On a 10+, they have to \
            choose: Force your hand and suck it up, or cave \
            and do what you want. On a 7-9, they can instead \
            choose 1: \
            <ul> \
            <li>get the hell out of your way</li> \
            <li>barricade themselves securely in</li> \
            <li>give you something they think you want</li> \
            <li>back off calmly, hands where you can see</li> \
            <li>tell you what you want to know (or what you want to hear)</li> \
            </ul>"
        }];
        this.showNewMovePanel = false

        this.newmove = {};
        this.resetNewMove();
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
    this.getTitle = function () {
        return "Moves";
    }

    this.OnNewCharacter();
}

g.ComponetRegistry.register(component);
