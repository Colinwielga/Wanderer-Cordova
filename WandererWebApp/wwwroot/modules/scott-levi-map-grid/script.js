var ScottLeviMapGrid = {};

ScottLeviMapGrid.component = function () {
    this.grid =[
        [{description:"coastline"},{description:"coastline"}, {description:"coastline"}, {description:"coastline"},{description:"coastline"},{description:"coastline"},{description:"fishing-village"},{description:"coastline"},{description:"ice-bridge"},{description:"ice-castle"}],
        [{description:"sea-caves"},{description:"underground-ruins"},{description:"volcanic-mountains"},{description:"geysers"},{description:"blockfield"},{description:"refuge"},{description:""},{description:"ice-bog"},{description:"great-door"},{description:"ice-bridge"}] 
        [{description:"coastline"},{description:"wreckage"},{description:"cliffs"},{description:"glacier"},{description: "mountains"},{description:"hot-springs"},{description:"frozen-lake"},{description:"basin"},{description:"ice-maze"}, {description:"coastline"},{description: "icy-island"}],
        [{description:"coastline"},{description:"river"},{description:"mountains"},{description:"glacier"},{description:"arete"},{description:"burial-ground"},{description:"ruins"},{description:"valley"},{description:"burial-ground"},{description:"coastline"}],
        [{description:"coastline"},{description:"outpost"},{description:"monastary"},{description:"summit"},{description:"glacier"},{description:"waterfall"},{description:"river"},{description:"river"},{description:"river"},{description:"cliffs"},{description:"coastline"}],
        [{description:"coastline"},{description:"tundra"},{description:"mountains"},{description:"glacier"},{description:"crevasse"},{description:"mineral-desposits"},{description:"foothills"},{description:"permafrost-plateau"},{description:"coastline"}],
        [{description:"coastline"},{description:"tundra"},{description:"mountains"},{description:"glacier"},{description:"ice-caves"},{description:"foothills"},{description:"temple-complex"},{description:"underground-passages"},{description:"canyons"},{description:"coastline"}],
        [{description:"coastline"},{description:"forest"},{description:"forest"},{description:"mountains"},{description:"glacier"},{description:"moraine"},{description:"monadnock-mountain"},{description:"forest"},{description:"knoll"},{description:"scree"},{description:"coastline"}],
        [{description:"coastline"},{description:"forest"},{description:"frozen-farmlands"},{description:"colony"},{description:"mega-project"},{description:"forest"},{description:"ravine"},{description:"gully"},{description:"ruins"},{description:"coastline"}],
        [{description:"coastline"},{description:"sanctuary"},{description:"frozen-farmlands"},{description:"fjord"},{description:"naval-yard"},{description:"landing-site"},{description:"river"},{description:"meadow"},{description:"meadow"},{description:"coastline"}],
        [{description:"sunken-continent"}, {description:"coastline"}, {description:"coastline"}, {description:"fjord"},{description:"coastline-bay"},{description:"coastline"},{description:"coastline"},{description:"coastline"},{description:"coastline"},{description:"coastline"}]
    ]
    this.x = 2;
    this.y = 2;
    this.getVisibleGrid = function () {
        var result = [];
        for (var y = 0; y < this.grid.length; y++) {
            if (this.y - y <= 1 && this.y - y >= -1) {
                var rowResult = [];
                for (var x = 0; x < this.grid[y].length; x++) {
                    if (this.x - x <= 1 && this.x - x >= -1) {
                        rowResult.push(this.grid[y][x]);    
                    }
                }
                result.push(rowResult);
            }
        }
        return result;
    }
    
    this.getSystem = function () {
        return "Six Shooter"
    };
    // all component need a unique ID
    this.getId = function () {
        return "scott-levi-map-grid";
    };

    // A component should know how to handle some events
    // called when Wanderer is ready to talk to us
    // a component talks to the rest of the app throught a communicator
    // the communicator will call the components methods like OnNewCharacter and OnSave at the appropreat time
    // the communicator also allows know what to have to write also holds the infomation 
    // all events are optional
    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.Dependencies = dependencies;
    };
    // called when a new character is created
    this.OnNewCharacter = function () {
        // something like:
        //this.key = "value";
    };
    // called when a character is saved
    this.OnSave = function () {
        // something like:
        //this.communicator.write("key",this.key);
    };
    // called when a characrer is loaded 
    this.OnLoad = function () {
        // something like:
        // if (this.communicator.canRead("key")){
        //this.key = this.communicator.read("key");
        //}else{
        //this.key = "default value"
        //}
    };
    this.OnUpdate = function () {
    };

    // hmm is it really safe for this to be a function?
    // we use functions so no one can edit
    this.getRequires = function () {
        // example of a populated list:
        // return ["colin-wielga-tools"]
        return [];
    };

    this.getPublic = function () {
        return {
            getVersion: function () {
                return 1;
            }
        };
    };
    // can your module be close?
    this.canClose = function () {
        return true;
    };
    // a component should be able to provide some infomation
    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };

    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };

    this.getTitle = function () {
        return "Six Shooter Map";
    };

    this.OnNewCharacter();
};

g.services.componetService.registerCharacter(ScottLeviMapGrid.component);