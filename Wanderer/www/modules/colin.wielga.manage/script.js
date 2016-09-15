// I am not really sure if this is even a module infact I think it's not
// name as well
var component = function () {
    this.getId = function () {
        return "colin.wielga.manage"
    }
    this.OnStart = function (communicator, dependencies) {
        this.communicator = communicator;
       // this.description = dependencies[0];
    }
    this.OnNewCharacter = function () { }
    this.OnSave = function () { }
    this.OnLoad = function () { }

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getTitle = function () {
        return "Manage";
    }
    this.getRequires = function () {
        return [];//"colin.wielga.description"
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

    //Hax
    this.getCharName = function (id) {
        var json = window.localStorage.getItem(id);
        var tempChar = JSON.parse(json);
        return tempChar["colin.wielga.description"].name;
    }

    this.OnNewCharacter();
}

g.Wanderer.register(component);