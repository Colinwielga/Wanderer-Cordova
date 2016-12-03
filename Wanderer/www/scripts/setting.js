var settings = {};

settings.Types = {
    String: "String",
    int: "int",
    float: "flaot",
    bool: "bool"
};

settings.makeSetting = function(label,key,type,value) {
    return {
        label: label,
        key: key,
        type: type,
        value: value,
    }
}

// this might be a better pattern for saving
// just define the things and let it  handle it
