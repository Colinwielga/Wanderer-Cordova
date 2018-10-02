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
    [Route("api/Characters")]
    [Authorize]
    public class CharactersController : Controller
    {
        private readonly DataContext _context;

        public CharactersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Characters
        [HttpGet]
        public IEnumerable<Character> GetCharacters()
        {
            return _context.Characters;
        }

        // GET: api/Characters/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCharacter([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var character = await _context.Characters.SingleOrDefaultAsync(m => m.Id == id);

            if (character == null)
            {
                return NotFound();
            }

            return Ok(character);
        }

        // PUT: api/Characters/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCharacter([FromRoute] Guid id, [FromBody] Character character)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != character.Id)
            {
                return BadRequest();
            }

            _context.Entry(character).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharacterExists(id))
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

        // POST: api/Characters
        [HttpPost]
        public async Task<IActionResult> PostCharacter([FromBody] Character character)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Characters.Add(character);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCharacter", new { id = character.Id }, character);
        }

        // DELETE: api/Characters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharacter([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var character = await _context.Characters.SingleOrDefaultAsync(m => m.Id == id);
            if (character == null)
            {
                return NotFound();
            }

            _context.Characters.Remove(character);
            await _context.SaveChangesAsync();

            return Ok(character);
        }

        private bool CharacterExists(Guid id)
        {
            return _context.Characters.Any(e => e.Id == id);
        }
    }
}