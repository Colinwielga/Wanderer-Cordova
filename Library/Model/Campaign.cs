using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WandererWebAPI.Model
{
    public class Campaign
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public virtual RolePlayingSystem System { get; set; }
        public virtual List<Character> Characters { get; set; }
    }
}
