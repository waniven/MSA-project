using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;

namespace backend.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class LunchController : ControllerBase{
        private readonly ILunchRepository _lunchRepository;

        public LunchController(ILunchRepository lunchRepository){
            _lunchRepository = lunchRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Lunch>> GetLunches(){
            return await _lunchRepository.GetLunchesAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lunch>> GetLunchById(long id){
            var lunch = await _lunchRepository.GetLunchByIdAsync(id);
            if (lunch == null){
                return NotFound();
            }else{
                return lunch;
            }
        }

        [HttpPost]
        public async Task<ActionResult<Lunch>> AddLunch(Lunch lunch){
            await _lunchRepository.AddLunchAsync(lunch);
            return CreatedAtAction(nameof(GetLunchById), new { id = lunch.ID }, lunch);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLunch(long id, Lunch lunch){
            if (id != lunch.ID){
                return BadRequest();
            }else{
                await _lunchRepository.UpdateLunchAsync(lunch);
                return NoContent();
            }
        }

    [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLunch(long id){
            var lunch = await _lunchRepository.GetLunchByIdAsync(id);
            if (lunch == null){
                return NotFound();
            }else{
                await _lunchRepository.DeleteLunchAsync(id);
                return NoContent();
            }
        }
    }
}