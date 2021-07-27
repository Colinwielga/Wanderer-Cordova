var sharedNotes = {}
sharedNotes.component = function () {
    this.notes = "";
    this.getSystem = function () {
        return "Core"
    };
    this.getId = function () {
        return "wanderer-core-shared-notes";
    };
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.page = page;
    };
    this.OnNewCharacter = function () {
        // { sharedNotes: "notes"}
        var fallbackEntity = g.SharedEntity.MakeTrackedEntity();
        fallbackEntity.SetString("sharedNotes", "Test");
        var that = this;

        var handleUpdateFromServer = function (key1, key2, payload) {
            g.services.timeoutService.$timeout(function () {
                if (that.trackedEntity === undefined) {
                    that.trackedEntity = g.SharedEntity.ToTrackedEntity(payload.JObject, key1, key2);
                } else {
                    that.trackedEntity = that.trackedEntity.entityChanges.PossiblyUpdateTrackedEntity(payload, key1, key2);
                }
                that.notes = that.trackedEntity.backing.sharedNotes.backing;  
                console.log(payload);
            });
        };

        g.services.SignalRService.SubscribeToEntity(
            "F58B1E99-FE7C-4C5E-98F0-E4A4450517F5",
            "F9631143-B930-409E-BA01-08AE654E5E7C",
            fallbackEntity.entityChanges.GetEntityChanges(), 
            handleUpdateFromServer);
    };

    // server ""
    // colin "k"
    // scott "o"

    // sever "o"
    // colin "ko"
    // scott "ou"

    // server "ok"
    // colin "koo" "o", I know the version from the server doesn't include my changes. I am going for the version from the server to include all my change to accept it's version  
    // scott "out" "o", scott's local is ahead of the version from the server so we keep the local

    // server "kool out"
    // 

    // 

    this.notesChanged = function () {
        if (this.trackedEntity === undefined){
            return;
        }
        console.log(this.trackedEntity.backing.sharedNotes);

        this.trackedEntity.backing.sharedNotes.UpdateForCollaboration(this.notes);
        this.trackedEntity.entityChanges.Publish();
    }

    this.OnSave = function () {
        
    };
    this.OnLoad = function () {
        
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
        return "Shared Notes";
    };
    this.getRequires = function () {
        return [];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        };
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(sharedNotes.component);