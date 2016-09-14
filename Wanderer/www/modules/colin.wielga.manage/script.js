// I am not really sure if this is even a module infact I think it's not
// name as well
var component = function () {
    this.getId = function () {
        return "colin.wielga.manage"
    }
    this.OnStart = function (communicator) {
        this.communicator = communicator
    }
    this.OnNewCharacter = function () { }
    this.OnSave = function () { }
    this.OnLoad = function () { }

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getTitle = function () {
        return "Cards";
    }
    this.getDescription = function () {
        return "This is a unimplemented componet";
    }
    this.getVersion = function () {
        return 1;
    }
}

g.Wanderer.register(component);