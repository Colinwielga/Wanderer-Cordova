using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WandererWebAPI.Model;
using Microsoft.AspNetCore.Authorization;

namespace WandererWebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/RolePlayingSystems")]
    [Authorize]
    public class RolePlayingSystemsController : Controller
    {
        private readonly DataContext _context;

        public RolePlayingSystemsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/RolePlayingSystems
        [HttpGet]
        public IEnumerable<RolePlayingSystem> GetSystems()
        {
            return _context.Systems;
        }

        // GET: api/RolePlayingSystems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRolePlayingSystem([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rolePlayingSystem = await _context.Systems.SingleOrDefaultAsync(m => m.Id == id);

            if (rolePlayingSystem == null)
            {
                return NotFound();
            }

            return Ok(rolePlayingSystem);
        }

        // PUT: api/RolePlayingSystems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRolePlayingSystem([FromRoute] Guid id, [FromBody] RolePlayingSystem rolePlayingSystem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rolePlayingSystem.Id)
            {
                return BadRequest();
            }

            _context.Entry(rolePlayingSystem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolePlayingSystemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RolePlayingSystems
        [HttpPost]
        public async Task<IActionResult> PostRolePlayingSystem([FromBody] RolePlayingSystem rolePlayingSystem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Systems.Add(rolePlayingSystem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRolePlayingSystem", new { id = rolePlayingSystem.Id }, rolePlayingSystem);
        }

        // DELETE: api/RolePlayingSystems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRolePlayingSystem([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rolePlayingSystem = await _context.Systems.SingleOrDefaultAsync(m => m.Id == id);
            if (rolePlayingSystem == null)
            {
                return NotFound();
            }

            _context.Systems.Remove(rolePlayingSystem);
            await _context.SaveChangesAsync();

            return Ok(rolePlayingSystem);
        }

        private bool RolePlayingSystemExists(Guid id)
        {
            return _context.Systems.Any(e => e.Id == id);
        }
    }
}