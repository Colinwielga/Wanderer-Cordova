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
                    var editor = document.getElementById("wanderer-core-shared-notes-text-area");
                    that.trackedEntity = g.SharedEntity.ToTrackedEntity(payload.JObject, key1, key2);
                    that.notes = that.trackedEntity.backing.sharedNotes.backing;

                    // see {24CE38E4-9FA3-4EF8-8D99-67CD3C91A194}
                    editor.value = that.notes;  
                } else {

                    var editor = document.getElementById("wanderer-core-shared-notes-text-area");
                    var startCaretPosition = editor.selectionStart;
                    var endCaretPosition = editor.selectionEnd;
                    
                    that.trackedEntity = that.trackedEntity.entityChanges.PossiblyUpdateTrackedEntity(payload, key1, key2);
                    
                    // hello[caret] world!
                    // gooodbye[caret] world!
                    //[
                    //   { type: "delete", atIndex: 0, text: "hello" },
                    //   { type: "add", atIndex: 0, text: "goodbye" }
                    // ]
                    
                    console.log("before: " + startCaretPosition + " - " +  endCaretPosition);
                    var  changes =  g.SharedEntity.CompareStrings(that.notes, that.trackedEntity.backing.sharedNotes.backing);
                    
                    for (change of changes) {
                        if (change.type === "delete" && startCaretPosition > change.atIndex) {
                            startCaretPosition = startCaretPosition - change.text.length;
                        }
                        if (change.type === "add" && startCaretPosition > change.atIndex) {
                            startCaretPosition = startCaretPosition + change.text.length;
                        }
                        if (change.type === "delete" && endCaretPosition > change.atIndex) {
                            endCaretPosition = endCaretPosition - change.text.length;
                        }
                        if (change.type === "add" && endCaretPosition > change.atIndex) {
                            endCaretPosition = endCaretPosition + change.text.length;
                        }
                    } 
                    that.notes = that.trackedEntity.backing.sharedNotes.backing;  
                    // {24CE38E4-9FA3-4EF8-8D99-67CD3C91A194}
                    // you wouldn't think it would need this
                    // given we are using ng-model
                    // but without it the caret goes to the end whenever we make a change
                    // but it seems the ng-model is also doing something
                    // if I remove that I get a wierd angular error
                    // I think I might need data-ng-model to use data-ng-change
                    // but I need data-ng-change, onchange only fires when you change focus
                    editor.value = that.notes;
                    
                    editor.selectionStart = startCaretPosition;
                    editor.selectionEnd = endCaretPosition;
                    console.log("after: " +startCaretPosition + " - " +  endCaretPosition);
                }

                console.log("got a message:", payload);
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