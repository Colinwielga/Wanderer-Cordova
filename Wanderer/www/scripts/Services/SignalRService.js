g.services.SingnalRService = {
};

g.services.SingnalRService.callbacks = {};

g.services.SingnalRService.Callback = function (groupName, x) {
    for (var key in g.services.SingnalRService.callbacks) {
        // check if the property/key is defined in the object itself, not in parent
        if (g.services.SingnalRService.callbacks.hasOwnProperty(key)) {
            const currentCallback = g.services.SingnalRService.callbacks[key];
            if (groupName === currentCallback.GroupName && currentCallback.Accept(x)) {
                currentCallback.Act(x);
            }
        }
    }
};

g.services.SingnalRService.setCallback = function (name, groupName, accept, act) {
    g.services.SingnalRService.groupNames[name] = groupName;
    g.services.SingnalRService.callbacks[name] = { Accept: accept, GroupName: groupName, Act: act };
};


g.services.SingnalRService.HasCallback = function (name) {
    return g.services.SingnalRService.callbacks[name] !== undefined;
};

g.services.SingnalRService.tryRemoveCallback = function (name) {
    if (g.services.SingnalRService.HasCallback(name)) {
        g.services.SingnalRService.removeCallback(name);
        return true;
    }
    return false;
};

g.services.SingnalRService.removeCallback = function (name) {
    delete g.services.SingnalRService.callbacks[name];
};

g.services.SingnalRService.onConnectCallbacks = [];
g.services.SingnalRService.connecting = false;
g.services.SingnalRService.Connect = function (callback) {
    if (callback) {
        g.services.SingnalRService.onConnectCallbacks.push(callback);
    }
    if (!g.services.SingnalRService.connecting) {
        g.services.SingnalRService.connecting = true;
        g.services.SingnalRService.InnerConnection(0);
    }
};

g.services.SingnalRService.InnerConnection = function (time) {
    setTimeout(function () {
        g.services.SingnalRService.connection = new signalR.HubConnectionBuilder()
            .withUrl("https://wandererwebapp.azurewebsites.net/chat")
            .build();
        g.services.SingnalRService.connection.on('BroadcastMessage', g.services.SingnalRService.Callback);
        g.services.SingnalRService.connection.start().then(function () {
            g.services.SingnalRService.connecting = false;
            for (var key in g.services.SingnalRService.groupNames) {
                if (g.services.SingnalRService.groupNames.hasOwnProperty(key)) {
                    g.services.SingnalRService.connection.send('JoinGame', g.services.SingnalRService.groupNames[key]);
                }
            }
            for (var i = 0; i < g.services.SingnalRService.onConnectCallbacks.length; i++) {
                g.services.SingnalRService.onConnectCallbacks[i]();
            }
            g.services.SingnalRService.onConnectCallbacks = [];
        }).catch(function (err) {
            g.services.SingnalRService.connecting = false;
            console.error(err.toString());
            if (time < 1000) {
                g.services.SingnalRService.InnerConnection(time + 100);
            }
        });
    }, time);
};

g.services.SingnalRService.Connect();
g.services.SingnalRService.groupNames = {};

g.services.SingnalRService.Join = function (groupName, key) {
    g.services.SingnalRService.groupNames[key] = groupName;
    try {
        g.services.SingnalRService.connection.send('JoinGame', groupName);
    } catch (err) {
        console.error(err.toString());
        console.log("attempting to reconnect");
        g.services.SingnalRService.Connect(function () { });
    }
};

g.services.SingnalRService.Send = function (key, obj) {
    if (g.services.SingnalRService.groupNames[key] === null) {
        throw "Group name: " + key + " should not be null";
    }
    try {
        g.services.SingnalRService.connection.send('BroadcastMessage', g.services.SingnalRService.groupNames[key], obj);
    } catch (err) {
        console.error(err.toString());
        console.log("attempting to reconnect");
        g.services.SingnalRService.Connect(function () {
            g.services.SingnalRService.connection.send('BroadcastMessage', g.services.SingnalRService.groupNames[key], obj);
        });
    }
};

