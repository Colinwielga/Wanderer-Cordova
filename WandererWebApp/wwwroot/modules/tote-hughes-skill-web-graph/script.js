var ToteHughesSkillWebGraph = {};

ToteHughesSkillWebGraph.component = function () {
    this.getId = function () {
        return "tote-hughes-skill-web-graph";
    };
    
    this.getSystem = function () {
        return "Core"
    };

    this.OnStart = function (communicator, logger, page, dependencies) {
        this.communicator = communicator;
        this.skillWeb = dependencies[0];
    };
    this.OnNewCharacter = function () {
        //        this.questions = [];
    };
    this.OnSave = function () {
        //        this.communicator.write("questions", this.questions);
    };
    this.OnLoad = function () {
        //        if (this.communicator.canRead("questions")) {
        //            this.questions = this.communicator.read("questions");
        //        } else {
        //            this.questions = [];
        //        }
        //        this.orderQuestions();
    };

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html";
    };
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html";
    };
    this.canClose = function () {
        return true;
    };
    this.getTitle = function () {
        return "Skill Web Graph";
    };
    this.getRequires = function () {
        return ["colin-wielga-skill-web"];
    };

    this.getPublic = function () {
        var that = this;
        return {
            getVersion: function () {
                return 1;
            }
        };
    };

    this.getSkillGraphJSON = function () {
        return this.skillWeb.getSkillsJSON();
    };

    this.drawSkillGraph = function () {
        $("g").remove();
        var graph = this.getSkillGraphJSON();

        var svg = d3.select("svg#graph-canvas"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.id; }).distance(200))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));
        //        console.log(json);
        //        d3.json("skills.json", function(error, graph) {
        //          if (error) throw error;

        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("marker-end", "url(#arrow)");

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node");

        node.append("circle")
            .attr("r", 10)
            .attr("class", function (d) {
                if (d.group === 2) return "specificity3";
                if (d.group === 1) return "specificity2";
                if (d.group === 0.5) return "specificity1";
                if (d.group === 0.25) return "specificity0";
            });
        node.append("text")
            .text(function (d) { return d.id; }).attr("class", "name");
        node.append("text")
            .text(function (d) { return d.rank; }).attr("class", "rank");

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        function ticked() {
            link
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
            node.selectAll("text.name").attr("dx", 15).attr("dy", 5).attr("fill", "#333333");//.attr("fill", "none").attr("stroke", "#333333").attr("stroke-width", "1px");
            node.selectAll("text.rank").attr("dx", -4).attr("dy", 5).attr("fill", "#333333");
        }
    };

    this.OnNewCharacter();
};
g.services.componetService.registerCharacter(ToteHughesSkillWebGraph.component);
