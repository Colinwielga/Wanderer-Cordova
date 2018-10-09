var WandererCoreActivities = {};

WandererCoreActivities.component = function () {

    this.GroupName = "";
    this.Joined = false;
    this.callbacks = {};
    this.Activities = [];
    this.Message = "";
    var that = this;

    this.Join = function () {
        g.services.SingnalRService.setCallback(this.key,
            this.GroupName,
            function (x) { return true; },
            function (message) {
                if (that.callbacks[message.callbackName] !== undefined) {
                    g.services.timeoutService.$timeout(function () {
                        var added = that.callbacks[message.callbackName](message);
                        console.log("added", added);
                        that.Activities.push(added);
                    });
                }
            });
        g.services.SingnalRService.Join(this.GroupName, this.key);
        this.Joined = true;
    };

    this.Send = function () {
        g.services.SingnalRService.Send(this.key, {
            callbackName: "Message",
            Message: that.Message,
            Sender: that.page.name
        });
        this.Message = "";
    };

    this.getId = function () {
        return "wanderer-core-activities";
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
        this.page = page;
        this.key = Math.random() + "";
    };

    this.OnNewCharacter = function () {
        this.getPublic().addCallback("Message", function (x) {
            return {
                getHtml: function () {
                    return "modules/" + that.getId() + "/message.html";
                },
                Message: x.Message,
                Sender: x.Sender
            };
        });
    };

    this.OnSave = function () {
    };

    this.OnLoad = function () {
    };

    this.OnUpdate = function () {
    };

    this.getRequires = function () {
        return [];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            },
            addCallback: function (name, method) {
                if (that.callbacks[name] !== undefined) {
                    throw "name already in use";
                }
                that.callbacks[name] = method;
            },
            publish: function (thing) {
                g.services.SingnalRService.Send(that.key, thing);
            }
        };
    };

    this.canClose = function () {
        return true;
    };

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };

    this.getTitle = function () {
        if (this.GroupName) {

            return "Activities - " + this.GroupName;
        }
        return "Activities";
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(WandererCoreActivities.component);