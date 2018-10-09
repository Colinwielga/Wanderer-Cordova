g.SystemPageController = function (name, accessKey) {
    return new g.ModulesPage(name, accessKey, g.services.componetService.startComponentFactories, []);
}