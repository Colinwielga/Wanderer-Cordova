

var component = function () {
    // all component need a unique ID
    this.getId = function () {
        return "colin.wielga.template"
    }

    // A component should know how to handle some events
    // called when Wanderer is ready to talk to us
    // a component talks to the rest of the app throught a communicator
    // the communicator will call the components methods like OnNewCharacter and OnSave at the appropreat time
    // the communicator also allows know what to have to write also holds the infomation 
    this.OnStart = function (communicator) {
        this.communicator = communicator
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


    // a component should be able to provide some infomation
    this.getHmtl = function () {
        return "modules/"+ this.getId() + "/page.html"
    }
    this.getTitle = function () {
        return "title";
    }
    this.getDescription = function () {
        return "This is a unimplemented componet";
    }
    this.getVersion = function () {
        return 1;
    }
}

g.Wanderer.register(component);