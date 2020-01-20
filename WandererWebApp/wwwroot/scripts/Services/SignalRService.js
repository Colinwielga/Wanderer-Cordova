g.services.SignalRService = {
};

g.services.SignalRService.callbacks = {}

g.services.SignalRService.Callback = function (groupName, x) {
    for (var key in g.services.SignalRService.callbacks) {
        // check if the property/key is defined in the object itself, not in parent
        if (g.services.SignalRService.callbacks.hasOwnProperty(key)) {
            const currentCallback = g.services.SignalRService.callbacks[key];
            if (groupName === currentCallback.GroupName && currentCallback.Accept(x)) {
                currentCallback.Act(x);
            }
        }
    }
};

g.services.SignalRService.setCallback = function (name, groupName, accept, act) {
    g.services.SignalRService.groupNames[name] = groupName;
    g.services.SignalRService.callbacks[name] = { Accept: accept, GroupName: groupName, Act: act };
};


g.services.SignalRService.HasCallback = function (name) {
    return g.services.SignalRService.callbacks[name] !== undefined;
};

g.services.SignalRService.tryRemoveCallback = function (name) {
    if (g.services.SignalRService.HasCallback(name)) {
        g.services.SignalRService.removeCallback(name);
        return true;
    }
    return false;
};

g.services.SignalRService.removeCallback = function (name) {
    delete g.services.SignalRService.callbacks[name];
};

g.services.SignalRService.onConnectCallbacks = [];
g.services.SignalRService.connecting = false;
g.services.SignalRService.Connect = function (callback) {
    if (callback) {
        g.services.SignalRService.onConnectCallbacks.push(callback);
    }
    if (!g.services.SignalRService.connecting) {
        g.services.SignalRService.connecting = true;
        g.services.SignalRService.InnerConnection(0);
    }
};

g.services.SignalRService.InnerConnection = function (time) {
    setTimeout(function () {
        g.services.SignalRService.connection = new signalR.HubConnectionBuilder()
            .withUrl("https://wandererwebapp.azurewebsites.net/chat")
            .build();
        g.services.SignalRService.connection.start().then(function () {
            g.services.SignalRService.connecting = false;
            g.services.SignalRService.connection.on('BroadcastMessage', g.services.SignalRService.Callback);
            for (var key in g.services.SignalRService.groupNames) {
                if (g.services.SignalRService.groupNames.hasOwnProperty(key)) {
                    g.services.SignalRService.connection.send('JoinGame', g.services.SignalRService.groupNames[key]);
                }
            }
            for (var i = 0; i < g.services.SignalRService.onConnectCallbacks.length; i++) {
                g.services.SignalRService.onConnectCallbacks[i]();
            }
            g.services.SignalRService.onConnectCallbacks = [];
        }).catch(function (err) {
            g.services.SignalRService.connecting = false;
            console.error(err.toString());
            //if (time < 1000) {
            //    g.services.SignalRService.InnerConnection(time + 100);
            //}
        });
    }, time);
};

g.services.SignalRService.Connect();
g.services.SignalRService.groupNames = {};

g.services.SignalRService.Join = function (groupName, key) {
    g.services.SignalRService.groupNames[key] = groupName;
    console.log("sending group name: " + groupName);
    try {
        g.services.SignalRService.connection.send('JoinGame', groupName);
    } catch (err) {
        console.error(err.toString());
        console.log("attempting to reconnect");
        g.services.SignalRService.Connect(function () { });
    }
};

g.services.SignalRService.Send = function (key, obj) {
    if (g.services.SignalRService.groupNames[key] === null) {
        throw "Group name: " + key + " should not be null";
    }
    try {
        g.services.SignalRService.connection.send('BroadcastMessage', g.services.SignalRService.groupNames[key], obj);
    } catch (err) {
        console.error(err.toString());
        console.log("attempting to reconnect");
        g.services.SignalRService.Connect(function () {
            g.services.SignalRService.connection.send('BroadcastMessage', g.services.SignalRService.groupNames[key], obj);
        });
    }
};

