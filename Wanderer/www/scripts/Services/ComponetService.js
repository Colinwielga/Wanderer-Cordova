g.services.componetService = {};
g.services.componetService.characterComponentFactories = [];
g.services.componetService.startComponentFactories = [];

g.services.componetService.registerCharacter = function (componentFactory) {
    g.services.componetService.characterComponentFactories.push(componentFactory);
}

g.services.componetService.registerStart = function (componentFactory) {
    g.services.componetService.startComponentFactories.push(componentFactory);
}