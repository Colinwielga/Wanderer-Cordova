g.services.SignalRService = {
};

g.services.SignalRService.callbacks = {};

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

g.services.SignalRService.EntityUpdateCallback = function (key1,key2, payload) {
    var listener = g.services.SignalRService.entityListeners[key1 +"|" + key2];
    if (listener) {
        listener.callback(key1, key2, JSON.parse(payload));
    }
};

g.services.SignalRService.SubscribeToEntity = function (key1, key2, fallback, callback) {
    g.services.SignalRService.entityListeners[key1 + "|" + key2] = {
        callback: callback,
        fallback: fallback
    };
    try {
        g.services.SignalRService.connection.send('RequestEntity', key1, key2, fallback);
    } catch (err) {
        console.error(err.toString());
        console.log("attempting to reconnect");
        g.services.SignalRService.Connect(function () { });
    }
};

// entityName -> list of call backs for that entity
g.services.SignalRService.entityListeners = {};

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
            .withUrl("/chat", {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .configureLogging(signalR.LogLevel.Information)
            //.withUrl("https://wandererwebapp.azurewebsites.net/chat")
            .build();
        g.services.SignalRService.connection.start().then(function () {
            g.services.SignalRService.connecting = false;

            // manually messages 
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

            // tracked entities
            g.services.SignalRService.connection.on('EntityUpdate', g.services.SignalRService.EntityUpdateCallback);
            for (var entityListenersKey in g.services.SignalRService.entityListeners) {
                if (g.services.SignalRService.entityListeners.hasOwnProperty(entityListenersKey)) {
                    var splitKey = key.split("|");
                    var key1 = splitKey[0];
                    var key2 = splitKey[1];
                    g.services.SignalRService.connection.send('RequestEntity', key1, key2, g.services.SignalRService.entityListeners[entityListenersKey].fallback);
                }
            }

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

