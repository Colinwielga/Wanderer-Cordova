g.ComponetRegistry = {};
g.ComponetRegistry.characterComponentFactories = [];
g.ComponetRegistry.startComponentFactories = [];

g.ComponetRegistry.registerCharacter = function (componentFactory) {
    g.ComponetRegistry.characterComponentFactories.push(componentFactory);
};

g.ComponetRegistry.registerStart = function (componentFactory) {
    g.ComponetRegistry.startComponentFactories.push(componentFactory);
};