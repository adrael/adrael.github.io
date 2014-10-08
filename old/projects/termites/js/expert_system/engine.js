function InferenceEngine() {

}

InferenceEngine.prototype.inferForward = function(factBase, ruleBase) {
	var inferredFacts = [];
	var finished = false;
	while(!finished) {
		finished = true;
		for (var ruleIndex in ruleBase.rules) {
			var rule = ruleBase.rules[ruleIndex];
			if(!rule.goal.isValid() && rule.isValid()) {
				rule.goal.value = true;
				inferredFacts.push(rule.goal.label);

				finished = false;
			}
		}
	}

	return inferredFacts;
};

InferenceEngine.prototype.inferBackward = function(factBase, ruleBase) {
	var primaryGoals = ruleBase.primaryGoals();
	for(var goalIndex in primaryGoals) {
		var goalLabel = primaryGoals[goalIndex];
		var initialPremises = ruleBase.initialPremises(goalLabel);
		for(var premiseIndex in initialPremises) {
			var premiseLabel = initialPremises[premiseIndex];
			if(!factBase.isFactValid(premiseLabel)) {
				return premiseLabel;
			}
		}
	}
	return null;
};
