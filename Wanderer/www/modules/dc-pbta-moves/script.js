

var component = function () {
    //A component for storing Powered By The Apocalypse-style moves.

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
        event.stopImmediatePropogation();
    }
    this.startEdit = function(event, move){
        move.edit = true;
        event.stopImmediatePropogation();
    }
    this.endEdit = function(event, move){
        //TODO: Check to make sure there's either a title or leadin+trigger
        move.edit = false;
        move.collapsed = false;
        event.stopImmediatePropogation();
    }
    this.setDeleteMode = function(event, move){
        move.deletemode = true;
        event.stopImmediatePropogation();
    }
    this.cancelDeleteMode = function(event, move){
        move.deletemode = false;
        event.stopImmediatePropogation();
    }
    
    this.deleteMove = function(event, move){
        this.getMoveslist().splice(this.getMoveslist().indexOf(move), 1);
        move.deletemode = true;
        event.stopImmediatePropogation();
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
            moveslist: [],
            custom: false
        },
        {
            label: "Peripheral Moves",
            moveslist:[],
            custom: false
        }
    ];

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
        this.movescatalogue = default_move_catalogue;
        if (this.communicator.canRead("custommoves")){
            this.movescatalogue.concat(this.communicator.read("custommoves"));
        }
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
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "Moves";
    }

    this.OnNewCharacter();
}

g.ComponetRegistry.register(component);
