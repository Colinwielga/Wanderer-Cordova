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
    [Route("api/Accounts")]
    [Authorize]
    public class AccountsController : Controller
    {
        private readonly DataContext _context;

        public AccountsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Accounts
        [HttpGet]
        public IEnumerable<ExposedAccount> GetAccounts()
        {
            return _context.Accounts;
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccount([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var account = await _context.Accounts
                .Include(x=>x.Characters)
                .Include(x => x.RolePlayingSystems)
                .SingleOrDefaultAsync(m => m.Id == id) as ExposedAccount;

            if (account == null)
            {
                return NotFound();
            }

            return Ok(account);
        }

        // PUT: api/Accounts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount([FromRoute] Guid id, [FromBody] Account account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != account.Id)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
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

        // POST: api/Accounts
        [HttpPost]
        public async Task<IActionResult> PostAccount([FromBody] Account account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var account = await _context.Accounts.SingleOrDefaultAsync(m => m.Id == id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return Ok(account);
        }

        private bool AccountExists(Guid id)
        {
            return _context.Accounts.Any(e => e.Id == id);
        }
    }
}