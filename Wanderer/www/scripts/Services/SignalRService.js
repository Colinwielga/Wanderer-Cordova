g.services.SingnalRService = {
}

g.services.SingnalRService.callbacks = {}

g.services.SingnalRService.Callback = function (groupName, x) {
    for (var key in g.services.SingnalRService.callbacks) {
        // check if the property/key is defined in the object itself, not in parent
        if (g.services.SingnalRService.callbacks.hasOwnProperty(key)) {
            const currentCallback = g.services.SingnalRService.callbacks[key];
            if (groupName == currentCallback.GroupName && currentCallback.Accept(x)) {
                currentCallback.Act(x);
            }
        }
    }
}

g.services.SingnalRService.setCallback = function (name, groupName, accept, act) {
    g.services.SingnalRService.callbacks[name] = { Accept: accept, GroupName: groupName,  Act: act };
}

g.services.SingnalRService.removeCallback = function (name, accept, act) {
    delete g.services.SingnalRService.callbacks[name];
}

g.services.SingnalRService.Connect = function () {
    g.services.SingnalRService.connection = new signalR.HubConnectionBuilder()
        .withUrl("https://wandererwebapp.azurewebsites.net/chat")
        .build();
    g.services.SingnalRService.connection.on('BroadcastMessage', g.services.SingnalRService.Callback);
    g.services.SingnalRService.connection.start().catch(err => console.error("do all signalR errors go here? "+err.toString()));
}

g.services.SingnalRService.Connect();
g.services.SingnalRService.groupNames = {};

g.services.SingnalRService.Join = function (groupName, key) {
    g.services.SingnalRService.groupNames[key] = groupName;
    g.services.SingnalRService.connection.send('JoinGame', groupName);
}

g.services.SingnalRService.Send = function (key, obj) {
    if (g.services.SingnalRService.groupNames[key] == null) {
        throw "Group name should not be null";
    }
    g.services.SingnalRService.connection.send('BroadcastMessage', g.services.SingnalRService.groupNames[key] ,obj);
}

