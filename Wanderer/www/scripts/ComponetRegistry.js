g.ComponetRegistry = {};
g.ComponetRegistry.componentFactories = [];

g.ComponetRegistry.register =function (componentFactory) {
    g.ComponetRegistry.componentFactories.push(componentFactory);
}

