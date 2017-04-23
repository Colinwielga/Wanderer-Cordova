g.services.pageService = {
}

g.services.pageService.private = {};

g.services.pageService.private.Pages = [];
g.services.pageService.private.activeIndex = 0;

g.services.pageService.GetPages = function () {
    return g.services.pageService.private.Pages;
}

g.services.pageService.activePage = function () {
    return g.services.pageService.private.Pages[g.services.pageService.private.activeIndex];
}

g.services.pageService.Select = function (page) {
    g.services.pageService.private.activeIndex = g.services.pageService.private.Pages.indexOf(page)
}

g.services.pageService.Selected = function (page) {
    return g.services.pageService.private.Pages.indexOf(page) === g.services.pageService.private.activeIndex;
}

g.services.pageService.Close = function (page) {
    var at = g.services.pageService.private.Pages.indexOf(page);
    if (at >= 0) {
        g.services.pageService.private.Pages.splice(at, 1);
    }
    if (g.services.pageService.private.activeIndex >= g.services.pageService.private.Pages.length) {
        g.services.pageService.private.activeIndex = g.services.pageService.private.activeIndex - 1;
    }
}

g.services.pageService.Add = function () {
    var newPage = g.CharacterPageFactory(new g.Character(g.$timeout, "new character", g.makeid()));
    g.services.pageService.private.Pages.push(newPage);
    g.services.pageService.Select(newPage);
}

g.services.pageService.OpenCharacterById = function (id) {
    var tempPage = g.LoadingPageFactory(g.$timeout, "loading " + id);
    g.services.pageService.private.Pages.push(tempPage);
    g.services.pageService.Select(tempPage);
    g.services.characterService.GetCharacter(id, function (json) {
        var at = g.services.pageService.private.Pages.indexOf(tempPage);
        var character = new g.Character(g.$timeout, json["name"], json["id"]);
        character.load(json);
        g.$timeout(function () {
            g.services.pageService.private.Pages[at] = g.CharacterPageFactory(character);
        });
        // update the account
        var accessor = g.models.newCharacterAccesser(json["id"], json["name"]);
        var changed = g.services.accountService.currentAccount.addChatacterAccesser(accessor);
        if (changed) {
            g.services.accountService.saveAccount(function () { }, function () {
                throw { message: "save failed" }
            })
        }

    }, function () {
        g.$timeout(function () {
            var at = g.services.pageService.private.Pages.indexOf(tempPage);
            g.services.pageService.private.Pages[at] = g.ErrorPageFactory(new g.getErrorController(g.$timeout, "Character does not exist"));
        });
    }, function (err) {
        g.$timeout(function () {
            var at = g.services.pageService.private.Pages.indexOf(tempPage);
            g.services.pageService.private.Pages[at] = g.ErrorPageFactory(new g.getErrorController(g.$timeout, "Error: " + err));
        });
    }
    )
}

g.services.pageService.OpenCharacter = function (characterAccessor) {
    g.services.pageService.OpenCharacterById(characterAccessor.id);
}

g.services.pageService.GetAccount = function () {
    var tempPage = g.LoadingPageFactory(g.$timeout, "loading account...");
    g.services.pageService.private.Pages.push(tempPage);
    g.services.accountService.GetAccount(function (account) {
        g.$timeout(function () {
            var at = g.services.pageService.private.Pages.indexOf(tempPage);
            var newPage = g.MainPageFactory(g.StartPageController(g.$timeout, account.id));
            g.services.pageService.private.Pages[at] = newPage;
        });
    }, function (error) {
        g.$timeout(function () {
            var at = g.services.pageService.private.Pages.indexOf(tempPage);
            g.services.pageService.private.Pages[at] = g.ErrorPageFactory(new g.getErrorController(g.$timeout, "Account not found"));
        });
    }, function (error) {
        g.$timeout(function () {
            var at = g.services.pageService.private.Pages.indexOf(tempPage);
            g.services.pageService.private.Pages[at] = g.ErrorPageFactory(new g.getErrorController(g.$timeout, "Error: " + error));
        });
    });
};

g.services.pageService.OpenAccount = function (id) {
    var tempPage = g.LoadingPageFactory(g.$timeout, "loading account...");
    g.$timeout(function () {
        g.services.pageService.private.Pages[0] = tempPage;
    });
    return g.services.accountService.SwitchAccount(
        id,
        function (account) {
            g.$timeout(function () {
                var at = g.services.pageService.private.Pages.indexOf(tempPage);
                var newPage = g.MainPageFactory(g.StartPageController(g.$timeout, account.id));
                g.services.pageService.private.Pages[at] = newPage;
            });
        }, function (error) {
            g.$timeout(function () {
                var at = g.services.pageService.private.Pages.indexOf(tempPage);
                g.services.pageService.private.Pages[at] = g.ErrorPageFactory(new g.getErrorController(g.$timeout, "Account not found"));
            });
        }, function (error) {
            g.$timeout(function () {
                var at = g.services.pageService.private.Pages.indexOf(tempPage);
                g.services.pageService.private.Pages[at] = g.ErrorPageFactory(new g.getErrorController(g.$timeout, "Error: " + error));
            });
        });
};