﻿var ToteHughesSkillWebGraph = {};

ToteHughesSkillWebGraph.component = function () {
    this.getId = function () {
        return "tote-hughes-skill-web-graph"
    }
    this.OnStart = function (communicator, dependencies) {
        this.communicator = communicator;
        this.skillWeb = dependencies[0];
        console.log("start");
    }
    this.OnNewCharacter = function () {
//        this.questions = [];
    }
    this.OnSave = function () {
//        this.communicator.write("questions", this.questions);
    }
    this.OnLoad = function () {
//        if (this.communicator.canRead("questions")) {
//            this.questions = this.communicator.read("questions");
//        } else {
//            this.questions = [];
//        }
//        this.orderQuestions();
    }

    this.getHmtl = function () {
        return "modules/" + this.getId() + "/page.html"
    }
    this.getRulesHtml = function () {
        return "modules/" + this.getId() + "/rules.html"
    }
    this.getTitle = function () {
        return "Skill Web Graph";
    }
    this.getRequires = function () {
        return ["colin-wielga-skill-web"];
    }

    this.getPublic = function () {
        var that = this;
        return {
            getVersion: function () {
                return 1;
            }
        }
    }
    
    this.getSkillGraphJSON = function() {
        return this.skillWeb.getSkillsJSON();
    }
    
    this.drawSkillGraph = function() {
        $("g").remove();
        var graph = this.getSkillGraphJSON();
        
        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(100))
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
            .attr("class", function(d) {
                if (d.group == 2) return "specificity3";
                if (d.group == 1) return "specificity2";
                if (d.group == 0.5) return "specificity1";
                if (d.group == 0.25) return "specificity0";
            });
          node.append("text")
              .text(function(d) { return d.id; }).attr("class", "name");
          node.append("text")
              .text(function(d) { return d.rank; }).attr("class", "rank");

          simulation
              .nodes(graph.nodes)
              .on("tick", ticked);

          simulation.force("link")
              .links(graph.links);

          function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

	        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	        node.selectAll("text.name").attr("dx", 15).attr("dy", 5).attr("fill", "#333333");//.attr("fill", "none").attr("stroke", "#333333").attr("stroke-width", "1px");
	        node.selectAll("text.rank").attr("dx", -4).attr("dy", 5).attr("fill", "#333333");
          }
//        });
        
        
    }
//    this.getNewQuestion = function() {
//        var alreadyAskedIDs = [];
//        for (var i = 0; i < this.questions.length; i++) {
//            alreadyAskedIDs.push(this.questions[i]["id"]);
//        }
//        var newDict = Questions.getNewQuestion(alreadyAskedIDs); //{"id": 2, "ask": "What's going on?", "answer": "I have no idea."};
//        this.questions.push(newDict);
////        this.questions.push(Questions.Questioned(1, "What makes me content?", ""));
////        this.questions.push(Questions.getNewQuestion());
////        return this.questions[this.questions.length - 1];
//    }
//    
//    this.getQuestionIndex = function(questionID) {
//        for (var i = 0; i < this.questions.length; i++) {
//            if (this.questions[i]["id"] == questionID) {
//                return i;
//            }
//        }
//    }
//    
//    this.editQuestion = function(questionID) {
//        var qi = this.getQuestionIndex(questionID);
//        this.questions[qi]["answer"] = "";
//    }
//    
//    this.saveQuestion = function(questionID) {
//        var qi = this.getQuestionIndex(questionID);
//        this.questions[qi]["answer"] = this.questions[qi]["suggestion"];
////        this.orderQuestions();
//    }
//    
//    this.orderQuestions = function() {
//        var answered = [];
//        var unanswered = [];
//        for (var i = 0; i < this.questions.length; i++) {
//            if (this.questions[i]["answer"]) {
//                answered.push(this.questions[i]);
//            }
//            else {
//                unanswered.push(this.questions[i]);
//            }
//        }
//        this.questions = unanswered.concat(answered);
//    }
    
    this.OnNewCharacter();
}
g.ComponetRegistry.register(ToteHughesSkillWebGraph.component);