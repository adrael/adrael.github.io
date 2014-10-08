Termite.prototype = new Agent();
Termite.prototype.constructor = Termite;

function Termite() {
    Agent.call(this);
    this.typeId = "termite";
    this.boundingRadius = 3;
    this.perceptionRadius = 30;

    this.collideTypes = ["wood_heap", "wall"];
    this.contactTypes = ["wood_heap", "termite", "wall"];

    this.agentsMet = [];

    this.nextChange = 0;
    this.speed = 0;
    this.expertSystem = new ExpertSystem();
    this.initExpertSystem();
    
    this.takeARandomDirection();

    this.caryingWood = false;
    this.last_hit_type = "";
    this.lastWoodHeap = null;
    this.lastTermite = null;
    this.lastPickUpHeap = null;
    this.lastHitWall = null;

    this.queen = null;
}

Termite.prototype.initExpertSystem = function() {

    // Lorsqu’un termite “rōnin” rencontre un tas de bois sans reine, il change ce tas de bois en termitière
    // en y plaçant une nouvelle reine et se change en termite “ouvrier”.
    this.expertSystem.addRule("drop_queen", ["hit_heap", "dontHasQueen", "wood_heapDontHasQueen", "wood_heapDontHasPheromone"]);
    // this.expertSystem.addRule("drop_wood", ["charged", "hit_heap", "dontHasQueen", "wood_heapDontHasQueen", "wood_heapDontHasPheromone"]);

    // Lorsqu’un termite “rōnin” rencontre une termitière, il jure fidélité à la reine qui la dirige et devient un termite “ouvrier”
    this.expertSystem.addRule("ally_queen", ["hit_heap", "dontHasQueen", "wood_heapHasQueen"]);

    // Si un termite “ouvrier” rencontre un termite “rōnin” ou un termite “ouvrier” d’une reine différente
    // et moins puissante, celui-ci rallie ce dernier à sa cause.
    this.expertSystem.addRule("propagate_queen", ["hit_termite", "hasQueen", "lastTermiteDontHasQueen"]);
    this.expertSystem.addRule("propagate_queen", ["hit_termite", "hasQueen", "lastTermiteHasQueen", "queenMorePowerfulThanOtherTermiteQueen"]);

    // Si un termite “ouvrier” rencontre une termitière d’une autre reine, trois cas de figure se présentent à lui :
        
        // 1 - Sa reine est plus puissante (de 20 points) il va alors éliminer la reine et marquer la termitière comme “déchue”
        // (pour que d’autre individu ne rechange plus le tas de bois en termitière). Afin que les ouvriers de la termitière “déchue”
        // ne redeviennent pas des “rōnins” le termite laisse le phéromone de sa propre reine sur le tas de bois. Pour finir,
        // le termite retourne auprès de sa reine pour l’informer de son régicide (ainsi que la position de la termitière “déchue”).
        this.expertSystem.addRule("kill_queen", ["hit_heap", "hasQueen", "wood_heapHasQueen", "wood_heapQueenIsNotQueen", "queenMorePowerfulThanOtherWoodHeapQueen"]);
        this.expertSystem.addRule("drop_pheromone", ["hit_heap", "hasQueen", "wood_heapHasQueen", "wood_heapQueenIsNotQueen", "queenMorePowerfulThanOtherWoodHeapQueen"]);
        this.expertSystem.addRule("back_to_queen", ["hit_heap", "hasQueen", "wood_heapHasQueen", "wood_heapQueenIsNotQueen", "queenMorePowerfulThanOtherWoodHeapQueen"]);
        this.expertSystem.addRule("take_wood", ["hit_heap", "hasQueen", "wood_heapHasQueen", "wood_heapQueenIsNotQueen", "queenMorePowerfulThanOtherWoodHeapQueen", "uncharged"]);


        // 2 - Sa reine est moins puissante (de 20 points) il va alors juré fidélité à sa nouvelle reine et l’informer
        // de la position de son ancienne reine.
        this.expertSystem.addRule("ally_queen", ["hit_heap", "hasQueen", "wood_heapHasQueen", "wood_heapQueenIsNotQueen", "queenLessPowerfulThanOtherWoodHeapQueen"]);
        this.expertSystem.addRule("drop_wood", ["charged", "hit_heap", "hasQueen", "wood_heapHasQueen", "queenLessPowerfulThanOtherWoodHeapQueen"]);

        // 3 - Sa reine est aussi puissante (différence inférieure à 20 points), le termite va simplement prendre un
        // bout de bois de la termitière et retourner auprès de sa reine pour l’informer de la position de la termitière rencontrée.
        this.expertSystem.addRule("take_wood", ["hit_heap", "hasQueen", "wood_heapHasQueen", "wood_heapQueenIsNotQueen", "queenAsPowerfulAsOtherWoodHeapQueen", "uncharged"]);
        this.expertSystem.addRule("back_to_queen", ["hit_heap", "hasQueen", "wood_heapHasQueen", "wood_heapQueenIsNotQueen", "queenAsPowerfulAsOtherWoodHeapQueen"]);

    // Si un termite rencontre un tas de bois sans reine et sans phéromone, trois options s’offrent à lui :

        // 1 - Le tas de bois est plus petit (20 points) que la puissance de sa reine actuelle. Il laisse
        // le phéromone de sa reine sur le tas de bois, le récolte et retourne auprès de sa reine en l’informant
        // de la position du tas de bois.
        this.expertSystem.addRule("drop_pheromone", ["hit_heap", "hasQueen", "wood_heapDontHasQueen", "wood_heapDontHasPheromone", "wood_heapSmallerThanQueen"]);
        this.expertSystem.addRule("take_wood", ["hit_heap", "hasQueen", "wood_heapDontHasQueen", "wood_heapDontHasPheromone", "wood_heapSmallerThanQueen", "uncharged"]);
        this.expertSystem.addRule("back_to_queen", ["hit_heap", "hasQueen", "wood_heapDontHasQueen", "wood_heapDontHasPheromone", "wood_heapSmallerThanQueen"]);

        // 2 - Le tas de bois est plus grand (20 points) que la puissance de sa reine actuelle.
        // Il va alors changer le tas de bois en termitière et informer sa nouvelle reine de la position de son ancienne.
        this.expertSystem.addRule("drop_queen", ["hit_heap", "hasQueen", "wood_heapBiggerThanQueen", "wood_heapDontHasQueen", "wood_heapDontHasPheromone"]);
        this.expertSystem.addRule("drop_wood", ["charged", "hit_heap", "hasQueen", "wood_heapBiggerThanQueen", "wood_heapDontHasQueen", "wood_heapDontHasPheromone"]);

        // 3 - Le tas de bois est équivalent (différence inférieure à 20 points) à la puissance de sa reine,
        // il prends alors un bout de bois et retourne voir sa reine.
        this.expertSystem.addRule("take_wood", ["hit_heap", "hasQueen", "wood_heapDontHasQueen", "wood_heapDontHasPheromone", "wood_heapAsBigAsQueen", "uncharged"]);
        this.expertSystem.addRule("back_to_queen", ["hit_heap", "hasQueen", "wood_heapDontHasQueen", "wood_heapDontHasPheromone", "wood_heapAsBigAsQueen", "uncharged"]);

    // Si un termite rencontre un tas de bois avec un phéromone différent de celui de sa reine, il va effectuer
    // la somme du tas de bois et de la puissance de la reine qui le collecte.
    // En fonction de la somme, deux options s’offrent à lui :

        // 1 - La puissance de sa reine est plus petite que la somme (20 points).
        // Il va jurer fidélité à la reine qui collecte le tas de bois et informer celle-ci de la position de son ancienne reine.
        this.expertSystem.addRule("ally_queen", ["hit_heap", "hasQueen", "wood_heapHasPheromone", "wood_heapPheromoneNotQueens", "sumWithOtherPheromoneIsBiggerThanQueen"]);
        
        // 2 - La puissance de sa reine est plus grande que la somme (20 points).
        // Il va écraser le phéromone par celui de sa reine, et retourne auprès de celle-ci pour lui communiquer la position de l’autre.
        this.expertSystem.addRule("drop_pheromone", ["hit_heap", "hasQueen", "wood_heapHasPheromone", "wood_heapPheromoneNotQueens", "sumWithOtherPheromoneIsSmallerThanQueen"]);
        this.expertSystem.addRule("take_wood", ["hit_heap", "hasQueen", "wood_heapHasPheromone", "wood_heapPheromoneNotQueens", "sumWithOtherPheromoneIsSmallerThanQueen"]);
        this.expertSystem.addRule("back_to_queen", ["hit_heap", "hasQueen", "wood_heapHasPheromone", "wood_heapPheromoneNotQueens", "sumWithOtherPheromoneIsSmallerThanQueen"]);
    
    // Si on retombe sur notre termitière, on donne le bout de bois
    this.expertSystem.addRule("drop_wood", ["charged", "hit_heap", "hasQueen", "wood_heapHasQueen", "wood_heapQueenIsQueen"]);
    this.expertSystem.addRule("inform_queen", ["hit_heap", "hasQueen", "wood_heapHasQueen", "wood_heapQueenIsQueen"]);

    // Un termite “ouvrier” sans travail va demander un travail à sa reine.
    this.expertSystem.addRule("get_order_from_queen", ["hit_heap", "hasQueen", "wood_heapHasQueen", "wood_heapQueenIsQueen"]);

    // Si on rencontre un tas de bois avec notre pheromone, on recolte si possible
    this.expertSystem.addRule("take_wood", ["hit_heap", "hasQueen", "wood_heapHasPheromone", "wood_heapPheromoneIsQueens", "uncharged"]);

    // Si le "timer" du termite est terminé, il change de direction (déplacement aléatoire)
    this.expertSystem.addRule("change_direction", [/*"uncharged", */"timer_out"]);
};

Termite.prototype.update = function(dt) {

    this.perceive();

    var conclusions = this.analyze();
    this.act(conclusions);

    this.moveBy(this.destination, this.speed * dt / 1000);
    this.nextChange -= dt;
    this.last_hit_type = "";
    this.lastWoodHeap = null;
    this.lastHitWall = null;
    this.lastTermite = null;
    this.hit_wall = false;
};

Termite.prototype.perceive = function() {

    this.expertSystem.resetFactValues();
    this.expertSystem.setFactValid("timer_out", this.nextChange <= 0);
    this.expertSystem.setFactValid("hit_wall", this.last_hit_type == "wall");
    this.expertSystem.setFactValid("hit_heap", this.last_hit_type == "wood_heap");
    this.expertSystem.setFactValid("hit_termite", this.last_hit_type == "termite");
    this.expertSystem.setFactValid("charged", this.caryingWood);
    this.expertSystem.setFactValid("uncharged", !this.caryingWood);
    this.expertSystem.setFactValid("different_heap", this.lastWoodHeap != this.lastPickUpHeap || this.lastPickUpHeap == null);

    this.expertSystem.setFactValid("hasQueen", this.hasQueen());
    this.expertSystem.setFactValid("dontHasQueen", !this.hasQueen());

    this.expertSystem.setFactValid("wood_heapHasPheromone", this.lastWoodHeap && this.lastWoodHeap.hasPheromone());
    this.expertSystem.setFactValid("wood_heapDontHasPheromone", this.lastWoodHeap &&  !this.lastWoodHeap.hasPheromone());
    this.expertSystem.setFactValid("wood_heapHasQueen", this.lastWoodHeap && this.lastWoodHeap.hasQueen());
    this.expertSystem.setFactValid("wood_heapDontHasQueen", this.lastWoodHeap && !this.lastWoodHeap.hasQueen());
    this.expertSystem.setFactValid("wood_heapSmallerThanQueen", this.hasQueen() && this.lastWoodHeap && (this.lastWoodHeap.woodCount + 20) < this.getQueen().getPower());
    this.expertSystem.setFactValid("wood_heapBiggerThanQueen", this.hasQueen() && this.lastWoodHeap && (this.lastWoodHeap.woodCount - 20) > this.getQueen().getPower());
    this.expertSystem.setFactValid("wood_heapAsBigAsQueen", this.hasQueen() && this.lastWoodHeap && Math.abs(this.lastWoodHeap.woodCount - this.getQueen().getPower()) < 20);
    this.expertSystem.setFactValid("wood_heapPheromoneNotQueens", this.hasQueen() && this.lastWoodHeap && this.lastWoodHeap.hasPheromone() && this.lastWoodHeap.getPheromone().getQueen().id !== this.getQueen().id);
    this.expertSystem.setFactValid("wood_heapPheromoneIsQueens", this.hasQueen() && this.lastWoodHeap && this.lastWoodHeap.hasPheromone() && this.lastWoodHeap.getPheromone().getQueen().id === this.getQueen().id);
    this.expertSystem.setFactValid("wood_heapQueenIsQueen", this.hasQueen() && this.lastWoodHeap && this.lastWoodHeap.hasQueen() && this.lastWoodHeap.getQueen().id === this.getQueen().id);
    this.expertSystem.setFactValid("wood_heapQueenIsNotQueen", this.hasQueen() && this.lastWoodHeap && this.lastWoodHeap.hasQueen() && this.lastWoodHeap.getQueen().id !== this.getQueen().id);

    this.expertSystem.setFactValid("lastTermiteHasQueen", this.lastTermite && this.lastTermite.hasQueen());
    this.expertSystem.setFactValid("lastTermiteDontHasQueen", this.lastTermite && !this.lastTermite.hasQueen());

    this.expertSystem.setFactValid("queenMorePowerfulThanOtherWoodHeapQueen", this.hasQueen() && this.lastWoodHeap && this.lastWoodHeap.hasQueen() && (this.getQueen().getPower() > (this.lastWoodHeap.getQueen().getPower() + 20)));
    this.expertSystem.setFactValid("queenLessPowerfulThanOtherWoodHeapQueen", this.hasQueen() && this.lastWoodHeap && this.lastWoodHeap.hasQueen() && ((this.getQueen().getPower() + 20) < this.lastWoodHeap.getQueen().getPower()));
    this.expertSystem.setFactValid("queenAsPowerfulAsOtherWoodHeapQueen", this.hasQueen() && this.lastWoodHeap && this.lastWoodHeap.hasQueen() && Math.abs(this.getQueen().getPower() - this.lastWoodHeap.getQueen().getPower()) < 20);

    this.expertSystem.setFactValid("queenMorePowerfulThanOtherTermiteQueen", this.hasQueen() && this.lastTermite && this.lastTermite.hasQueen() && (this.getQueen().getPower() > (this.lastTermite.getQueen().getPower() + 20)));
    this.expertSystem.setFactValid("queenLessPowerfulThanOtherTermiteQueen", this.hasQueen() && this.lastTermite && this.lastTermite.hasQueen() && ((this.getQueen().getPower() + 20) < this.lastTermite.getQueen().getPower()));
    this.expertSystem.setFactValid("queenAsPowerfulAsOtherTermiteQueen", this.hasQueen() && this.lastTermite && this.lastTermite.hasQueen() && Math.abs(this.getQueen().getPower() - this.lastTermite.getQueen().getPower()) < 20);

    this.expertSystem.setFactValid("sumWithOtherPheromoneIsBiggerThanQueen", this.hasQueen() && this.lastWoodHeap && this.lastWoodHeap.hasPheromone() && (this.lastWoodHeap.woodCount + this.lastWoodHeap.getPheromone().getQueen().getPower()) > (this.getQueen().getPower() + 20));
    this.expertSystem.setFactValid("sumWithOtherPheromoneIsSmallerThanQueen", this.hasQueen() && this.lastWoodHeap && this.lastWoodHeap.hasPheromone() && (this.lastWoodHeap.woodCount + this.lastWoodHeap.getPheromone().getQueen().getPower() + 20) < this.getQueen().getPower());
};

Termite.prototype.analyze = function() {

    return this.expertSystem.inferForward();
};

Termite.prototype.act = function(conclusions) {

    for (var i=0; i < conclusions.length; ++i) {

        if (conclusions[i] == "change_direction") {
            this.takeARandomDirection();
        }

        else if (conclusions[i] == "drop_wood") {
            this.addWood();
        }

        else if (conclusions[i] == "take_wood") {
            this.takeWood();
        }

        else if (conclusions[i] == "drop_queen") {
            this.dropQueen();
        }

        else if (conclusions[i] == "drop_pheromone") {
            this.dropPheromone();
        }

        else if (conclusions[i] == "kill_queen") {
            this.killQueen();
        }

        else if (conclusions[i] == "back_to_queen") {
            this.backToQueen();
        }

        else if (conclusions[i] == "propagate_queen") {
            this.propagateQueen();
        }

        else if (conclusions[i] == "ally_queen") {
            this.allyQueen();
        }

        else if (conclusions[i] == "inform_queen") {
            this.informQueen();
        }

        else if (conclusions[i] == "get_order_from_queen") {
            this.getOrderFromQueen();
        }
    }
};

Termite.prototype.receiveOrderFromQueen = function(path) {
    debug('receiveOrderFromQueen')
};

Termite.prototype.getOrderFromQueen = function() {
    this.queen.newTaskRequest(this);

    debug('getOrderFromQueen')
};

Termite.prototype.takeARandomDirection = function () {

    this.destination = {
        x : Math.random() * 200 - 100,
        y : Math.random() * 200 - 100
    };

    this.speed = Math.random() * 150 + 150;
    this.nextChange = Math.random() * 800 + 200;

    debug('randomDirection ' + this.destination)
};

Termite.prototype.allyQueen = function() {
    var oldQueen = null;
    if(this.hasQueen()) {
        oldQueen = this.queen;
    }

    if(this.lastWoodHeap.hasQueen()) {
        this.setQueen(this.lastWoodHeap.getQueen());
    } else if(this.lastWoodHeap.hasPheromone()) {
        this.setQueen(this.lastWoodHeap.getPheromone().getQueen());
    }

    if(oldQueen !== null) {
        this.queen.informNewAgent(oldQueen);
    }
    debug("Ally Queen");
};

Termite.prototype.propagateQueen = function() {
    this.lastTermite.setQueen(this.getQueen());
    debug("Propagate Queen");
};

Termite.prototype.addWood = function() {
    if(this.caryingWood) {
        this.lastWoodHeap.addWood();
        this.caryingWood = false;
        this.lastPickUpHeap = this.lastWoodHeap;
        debug("Add wood");
        return;
    }

    debug('Cannot Add Wood Because Not Carying')
};

Termite.prototype.takeWood = function() {
    if(!this.caryingWood) {
        this.lastWoodHeap.takeWood();
        this.caryingWood = true;
        debug("Take wood");
        return;
    }

    debug('Cannot Take Wood Because Carying');
};

Termite.prototype.backToQueen = function() {
    if(this.hasQueen()) {
        this.takeARandomDirection();

        debug('Back to Queen')
        return;
    }
    
    debug('Cannot Go Back to Queen Because No Queen')
};

Termite.prototype.killQueen = function() {
    this.lastWoodHeap.killQueen();
    debug("Kill Queen");
};

Termite.prototype.dropPheromone = function() {
     var pheromone = new Pheromone(this.getQueen());
    world.addAgent(pheromone);
    this.lastWoodHeap.setPheromone(pheromone);
    debug("Drop Pheromone");
};

Termite.prototype.dropQueen = function() {
    var oldQueen = null;
    if(this.hasQueen()) {
        oldQueen = this.queen;
    }

    this.queen = new Queen(
        {
            x: this.lastWoodHeap.x,
            y: this.lastWoodHeap.y,
            power: this.lastWoodHeap.woodCount
        }
    );

    this.queen.informNewAgent(this);

    if(oldQueen !== null) {
        this.queen.informNewAgent(oldQueen);
    }

    this.lastWoodHeap.setQueen(this.queen);
    world.addAgent(this.queen);
    debug("Drop Queen");
};

Termite.prototype.informQueen = function() {
    if(this.hasQueen()) {

        for(var i in this.agentsMet) {
            // console.log('informing queen', this.agentsMet[i].typeId)
            this.queen.informNewAgent(this.agentsMet[i]);
        }

        // this.agentsMet = [];

    }

    debug("Inform Queen");
};

Termite.prototype.draw = function(context) {
    context.fillStyle = this.caryingWood ? "rgba(255, 0, 0, 1)" : "rgba(255, 255, 255, 1)";
    context.strokeStyle="#001";
    context.beginPath();
    context.arc(this.x, this.y, this.boundingRadius, 0, 2*Math.PI);
    context.fill();
    context.stroke();

    if(this.hasQueen() && GLOBAL_DRAW_UMBILICAL) {
        context.beginPath();
        context.strokeStyle="rgba(0, 0, 255, .4)";
        context.moveTo(this.x, this.y);
        context.lineTo(this.queen.x, this.queen.y);
        context.stroke();
    }
};

Termite.prototype.hasQueen = function() {
    return this.queen !== null;
};

Termite.prototype.getQueen = function() {
    return this.queen;
};

Termite.prototype.setQueen = function(queen) {
    this.queen = queen;
    this.queen.informNewAgent(this);
};

Termite.prototype.processCollision = function(collidedAgent) {

    if(collidedAgent) {

        this.agentsMet.push(collidedAgent);
        // console.log(this.agentsMet.length)

        if (collidedAgent === null) {
            this.last_hit_type = "wall";
            return;
        }

        this.last_hit_type = collidedAgent.typeId;

        if(this.last_hit_type === "wall") {
            this.lastHitWall = collidedAgent;
            debug("hit wall");
            return;
        }

        if (this.last_hit_type === "wood_heap") {
            this.lastWoodHeap = collidedAgent;
            debug("hit heap");
            return;
        }

        else if(this.last_hit_type === "termite") {
            this.lastTermite = collidedAgent;
        }

    }
};

Termite.prototype.processPerception = function(perceivedAgent) {
};
