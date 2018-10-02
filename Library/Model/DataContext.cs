using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WandererWebAPI.Model
{
    public class DataContext :DbContext 
    {
        public DataContext(DbContextOptions<DataContext> context) : base(context) { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<RolePlayingSystem> Systems { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<Character> Characters { get; set; }

    }
}
