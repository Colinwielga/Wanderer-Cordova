using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WandererWebAPI.Model;

namespace DatabasePopulator
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var context = new DataContext(new DbContextOptionsBuilder<DataContext>().UseSqlite("Data Source=database.sqlite").Options))
            {
                var character1 = new Character
                {
                    Body = "Character 1",
                    Id = Guid.NewGuid(),
                };

                var character2 = new Character
                {
                    Body = "Character 2",
                    Id = Guid.NewGuid(),
                };

                var rolePlayingSystem1 = new RolePlayingSystem
                {
                    Body = "RolePlayingSystem 1",
                    Id = Guid.NewGuid(),
                };

                var rolePlayingSystem2 = new RolePlayingSystem
                {
                    Body = "RolePlayingSystem 2",
                    Id = Guid.NewGuid(),
                };

                var account = new Account
                {
                    Id = Guid.NewGuid(),
                    Body = "Account 1 Body",
                    Characters = new List<Character> {
                        character1,
                        character2
                    },
                    RolePlayingSystems = new List<RolePlayingSystem> {
                        rolePlayingSystem1,
                        rolePlayingSystem2,
                    },
                    Secret = Guid.NewGuid().ToString()
                };

                var campaign2 = new Campaign
                {
                    Id = Guid.NewGuid(),
                    Body = "Campaign 2",
                    Characters = new List<Character> {
                            character2
                        },
                    System = rolePlayingSystem2,
                };

                var campaign1 = new Campaign
                {
                    Id = Guid.NewGuid(),
                    Body = "Campaign 1",
                    Characters = new List<Character> {
                            character1
                        },
                    System = rolePlayingSystem1,
                };

                context.Accounts.Add(account);
                
                context.Campaigns.Add(campaign1);

                context.Campaigns.Add(campaign2);

                context.SaveChanges();

            }
        }
    }
}
