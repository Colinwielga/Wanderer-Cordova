ColinWielgaRoll = {};

ColinWielgaRoll.CreateDc = function (publicOutcomes, pirvateOutcomes) {
    return {
        publicOutcomes: publicOutcomes,
        pirvateOutcomes: pirvateOutcomes
    };
};

ColinWielgaRoll.CreateOutcome = function (DCh, DCl, result) {
    return {
        DCh : DCh,
        DCl : DCl,
        result : result,
        getDC : function () {
            if (DCh === DCl) {
                return DCh;
            } else {
                return DCh + " to " + DCl;
            }
        }
    }
};
