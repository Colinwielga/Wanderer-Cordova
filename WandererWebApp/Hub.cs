
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WandererWebApp
{
    public class Chat : Hub
    {
        public void JoinGame(string groupName)
        {
            Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public void BroadcastMessage(string groupName, object message)
        {
            Clients.Groups(groupName).SendAsync("BroadcastMessage", groupName, message);
        }
    }
}