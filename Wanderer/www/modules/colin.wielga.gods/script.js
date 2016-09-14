// TODO this is badly designed
// I should not be saving so much info about gods
var component = function () {
    this.gods = God.generateGods();

    this.getId = function () {
        return "colin.wielga.gods"
    }
    this.OnStart = function (communicator) {
        this.communicator = communicator
    }
    this.OnNewCharacter = function () {
        this.gods = God.generateGods();
    }
    this.OnSave = function () {
        this.communicator.write("gods", JSON.stringify(this.gods));
    }
    this.OnLoad = function () {
        if (this.communicator.canRead("gods")) {
            this.gods = JSON.parse(this.communicator.read("gods"));
        } else {
            this.OnNewCharacter();
        }
    }

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getTitle = function () {
        return "Gods";
    }
    this.getDescription = function () {
        return "This is a unimplemented componet";
    }
    this.getVersion = function () {
        return 1;
    }
}

g.Wanderer.register(component);