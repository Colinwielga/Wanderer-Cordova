ColinWielgaRoll = {};

ColinWielgaRoll.CreateDc = function (publicOutcomes, privateOutcomes) {
    return {
        publicOutcomes: publicOutcomes,
        privateOutcomes: privateOutcomes
    };
};

ColinWielgaRoll.CreateOutcome = function (DCh, DCl, result) {
    return {
        DCh : DCh,
        DCl : DCl,
        result : result
    }
};

ColinWielgaRoll.getDC = function (outcome) {
    if (outcome.DCh === outcome.DCl) {
        return outcome.DCh;
    } else {
        return outcome.DCh + " to " + outcome.DCl;
    };
}