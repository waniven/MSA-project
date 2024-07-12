using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LunchController : ControllerBase
    {
        private readonly ILunchRepository _lunchRepository;

        public LunchController(ILunchRepository lunchRepository)
        {
            _lunchRepository = lunchRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Lunch>> GetLunches()
        {
            return await _lunchRepository.GetLunchesAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lunch>> GetLunchById(long id)
        {
            var lunch = await _lunchRepository.GetLunchByIdAsync(id);
            if (lunch == null)
            {
                return NotFound();
            }
            else
            {
                return lunch;
            }
        }

        [HttpGet("image/{id}")]
        public async Task<IActionResult> GetImage(long id)
        {
            var lunch = await _lunchRepository.GetLunchByIdAsync(id);
            if (lunch == null || string.IsNullOrEmpty(lunch.ImageFilePath))
            {
                return NotFound();
            }

            var image = System.IO.File.OpenRead(lunch.ImageFilePath);
            return File(image, "image/jpeg");
        }

        [HttpPost]
        public async Task<ActionResult<Lunch>> AddLunch([FromForm] Lunch lunch)
        {
            if (lunch.Image != null && lunch.Image.Length > 0)
            {
                var filePath = Path.Combine("Uploads", lunch.Image.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await lunch.Image.CopyToAsync(stream);
                }

                lunch.ImageFilePath = filePath; // Save the file path
            }

            await _lunchRepository.AddLunchAsync(lunch);
            return CreatedAtAction(nameof(GetLunchById), new { id = lunch.ID }, lunch);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLunch(long id, [FromForm] Lunch lunch)
        {
            if (id != lunch.ID)
            {
                return BadRequest();
            }

            if (lunch.Image != null && lunch.Image.Length > 0)
            {
                var filePath = Path.Combine("Uploads", lunch.Image.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await lunch.Image.CopyToAsync(stream);
                }

                lunch.ImageFilePath = filePath; // Save the file path
            }

            await _lunchRepository.UpdateLunchAsync(lunch);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLunch(long id)
        {
            var lunch = await _lunchRepository.GetLunchByIdAsync(id);
            if (lunch == null)
            {
                return NotFound();
            }

            // Delete the associated image file if it exists
            if (!string.IsNullOrEmpty(lunch.ImageFilePath) && System.IO.File.Exists(lunch.ImageFilePath))
            {
                System.IO.File.Delete(lunch.ImageFilePath);
            }

            await _lunchRepository.DeleteLunchAsync(id);
            return NoContent();
        }
    }
}
