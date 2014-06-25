Queen.prototype = new Agent();
Queen.prototype.constructor = Queen;

function Queen(params) {
    Agent.call(this);
    this.typeId = "queen";
    this.boundingRadius = 3;

    this.expertSystem = new ExpertSystem();
    this.initExpertSystem();

    this.knownWoodHeaps = [];
    this.knownWalls = [];
    this.knownAgents = [];

    this.termitesWaitingForTask = [];
    this.hasNewAgent = false;

    this.setPower(params.power);
	this.moveTo(params.x, params.y);
    this.vertex = new Vertex(params.x, params.y);

    this.geneticAlgorithm = new GeneticAlgorithm(this);
    this.geneticAlgorithm.setFixedVertices([new Vertex(this.x, this.y)]);
    this.geneticAlgorithm.setPopulationSize(15);
    this.geneticAlgorithm.setDNASize(20);

    this.graphs = null;
}

Queen.prototype.informNewAgent = function(agent) {

    if(this.knownAgents[agent.id] == null || this.knownAgents[agent.id] == undefined) {

        this.knownAgents[agent.id] = agent;

        if(agent.typeId === 'wall' && !this.knownWalls[agent.id]) {
            this.knownWalls[agent.id] = agent;
            this.hasNewAgent = true;
        }

        else if(agent.typeId === "wood_heap") {
            this.knownWoodHeaps.push(agent);
            this.hasNewAgent = true;
            this.geneticAlgorithm.addFixedVertex(agent.vertex);
        }

        else if(agent.typeId === "termite" && !this.knownAgents[agent.id]) {
            this.knownAgents[agent.id] = agent;
            this.hasNewAgent = true;
        }
    }

};

Queen.prototype.updateGraphAndStrategy = function () {
    debug('updateGraphAndStrategy')
    
    if(this.hasNewAgent) {
        this.geneticAlgorithm.generation = -1;
        this.generateGraph();
    }

    this.updateStrategy();
};

Queen.prototype.generateGraph = function() {
    do {
        this.graphs = this.geneticAlgorithm.processNextGeneration();
        // console.log('fitness:', this.graphs[0].fitness)
    } while(this.graphs[0].fitness <= 1000 || this.geneticAlgorithm.generation > 10);
};

Queen.prototype.updateStrategy = function () {
    
};

Queen.prototype.newTaskRequest = function(agent) {
    this.termitesWaitingForTask.push(agent);
};

Queen.prototype.giveNewTask = function() {

    debug('giveNewTask')
    var graph = this.graphs[0];
    if(graph !== null && this.knownWoodHeaps !== undefined && this.knownWoodHeaps.length > 0) {


        var path = graph.getPathFromTo(this.vertex, this.knownWoodHeaps[0].vertex);

        console.log(path);
        for(var termite in this.termitesWaitingForTask) {
            this.termitesWaitingForTask[termite].receiveOrderFromQueen(path);
        }

    }

};

Queen.prototype.setPower = function(power) {
	this.power = power;
};

Queen.prototype.getPower = function() {
	return this.power;
};

Queen.prototype.initExpertSystem = function() {
    // Une reine qui reçoit de nouvelles informations va mettre à jour
    // son graphe de déplacement et modifier la stratégie de sa termitière.
    this.expertSystem.addRule("update_graph_and_strategy", ["new_agent"]);

    // Une reine qui reçoit une demande de travail, va se charger de fournir au demandeur d’emploi une destination
    // (correspondant à une zone à explorer ou un tas de bois à collecter).
    this.expertSystem.addRule("give_new_task", ["termite_asked_for_work"]);
};

Queen.prototype.perceive = function() {

    this.expertSystem.resetFactValues();
    
    this.expertSystem.setFactValid("new_agent", this.hasNewAgent);

    this.expertSystem.setFactValid("termite_asked_for_work", this.termitesWaitingForTask.length > 0);

};

Queen.prototype.update = function(dt) {
    
    this.perceive();

    var conclusions = this.analyze();
    this.act(conclusions);

    this.termitesWaitingForTask = [];
    this.hasNewAgent = false;
};

Queen.prototype.analyze = function() {
    return this.expertSystem.inferForward();
};

Queen.prototype.act = function(conclusions) {
    for(var i=0; i < conclusions.length; ++i ) {
        if(conclusions[i] == "update_graph_and_strategy") {
            this.updateGraphAndStrategy();
        }

        else if(conclusions[i] == "give_new_task") {
            this.giveNewTask();
        }
    }
};

Queen.prototype.draw = function(context) {
    context.fillStyle = "blue";
    context.strokeStyle="#001";
    context.beginPath();
    context.arc(this.x, this.y, this.boundingRadius, 0, 2*Math.PI);
    context.fill();
    context.stroke();

    if(this.graphs !== null && this.graphs !== undefined && GLOBAL_DRAW_PATHS) {
        this.graphs[0].draw(context);
    }
};