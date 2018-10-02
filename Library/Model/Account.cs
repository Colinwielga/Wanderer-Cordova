using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WandererWebAPI.Model
{
    public class Account : ExposedAccount
    {
        public string Secret { get; set; }
    }

    public class ExposedAccount
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public virtual List<Character> Characters { get; set; }
        public virtual List<RolePlayingSystem> RolePlayingSystems { get; set; }
    }
}
