function Roll() { }

Roll.erfinv = function (x) {
    var z;
    var a = 0.147;
    var the_sign_of_x;
    if (0 === x) {
        the_sign_of_x = 0;
    } else if (x > 0) {
        the_sign_of_x = 1;
    } else {
        the_sign_of_x = -1;
    }

    if (0 !== x) {
        var ln_1minus_x_sqrd = Math.log(1 - x * x);
        var ln_1minusxx_by_a = ln_1minus_x_sqrd / a;
        var ln_1minusxx_by_2 = ln_1minus_x_sqrd / 2;
        var ln_etc_by2_plus2 = ln_1minusxx_by_2 + 2 / (Math.PI * a);
        var first_sqrt = Math.sqrt(ln_etc_by2_plus2 * ln_etc_by2_plus2 - ln_1minusxx_by_a);
        var second_sqrt = Math.sqrt(first_sqrt - ln_etc_by2_plus2);
        z = second_sqrt * the_sign_of_x;
    } else { // x is zero
        z = 0;
    }
    return z;
};

// Roll based on the Inverse Error Function :
// http://mathworld.wolfram.com/images/eps-gif/InverseErf_1000.gif
// we pick a random x and return the erfinv(x)*scale
Roll.roll = function (scale) {
    var innerRoll = 0;
    do {
        innerRoll = Math.random() * 2 - 1;
    } while (innerRoll === -1);
    return Roll.erfinv(innerRoll) * scale;
};