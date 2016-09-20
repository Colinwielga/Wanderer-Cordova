

var component = function () {
    //A component for storing Powered By The Apocalypse-style moves.

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
        this.communicator = communicator
        this.Dependencies = dependencies
    }
    // called when a new character is created
    this.OnNewCharacter = function () {
        this.moveslist = [{
            title: "Go Aggro",
            leadin: "When you",
            conditions: "go aggro on someone,",
            prelist: "roll +hard. On a 10+, they have to choose: \
                Force your hand and suck it up, or cave and do what you want. \
                On a 7-9, they can instead choose 1: ",
            list: ["get the hell out of your way",
                "barricade themselves securely in",
                "give you something they think you want",
                "back off calmly, hands where you can see",
                "tell you what you want to know (or what you want to hear)"],
            postlist: ""
        }];
        this.showNewMovePanel = false
        // this.newmove = {
        //     title:"",
        //     leadin:"",
        //     conditions:"",
        //     prelist:"",
        //     list:["",
        //         "",
        //         ""],
        //     postlist:""
        // }
        this.newmove = {
        title:"[New Move]",
        leadin:"",
        conditions:"[you act and/or circumstances dictate]",
        prelist:"[Say what you do/what happens and maybe roll + some stat. On a 10+, \
            something specific happens that's probably what you wanted, \
            and maybe you pick enough options from a list to get a good outcome. \
            On a 7-9, something specific happens that's probably only some of what you wanted, \
            or what you wanted but with strings attached, and maybe you pick enough options \
            from a list to have to make a hard choice between important things. \
            On a 6 or less, the MC makes a hard move, but this move might offer some \
            choices or suggestions.",
        list:["The thing you're trying to do fundamentally works",
            "You don't suffer the side-effects",
            "You avoid some negative consequence that you'd otherwise have to deal with",
            "You get some extra benefit or way in which you are effective"],
        postlist:"Overall, the move can affect the fiction, the mechanics, or both, it can \
            have a temporary or permanent effect, it can trigger another move, it can \
            change the way another move works when you use it, or anything else you \
            might think of.]"
            }
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

    //Module-specific components
    this.addNewMove = function(){
        this.moveslist.push(this.newmove); 
    }

}

g.Wanderer.register(component);
