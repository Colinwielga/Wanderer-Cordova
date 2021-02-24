var ToteFlosfulgurGm = {};

ToteFlosfulgurGm.getChallenge = function (challengeId) {
	return new ToteFlosfulgurGm.challenge(challengeId);
}

ToteFlosfulgurGm.challenge = function(challengeId) {
	this.id = challengeId;
}
