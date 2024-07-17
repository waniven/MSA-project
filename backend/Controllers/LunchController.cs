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
            var lunches = await _lunchRepository.GetLunchesAsync();
            foreach (var lunch in lunches){
                SetImageUrl(lunch);
            }

            return lunches;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lunch>> GetLunchById(long id){
            var lunch = await _lunchRepository.GetLunchByIdAsync(id);
            if (lunch == null){
                return NotFound();
            }

            SetImageUrl(lunch);

            return lunch;
        }

        [HttpGet("image/{id}")]
        public async Task<IActionResult> GetImage(long id){
            var filePath = Path.Combine("Uploads/Lunch", $"{id}.jpg");
            if (!System.IO.File.Exists(filePath)){
                return NotFound();
            }

            var image = System.IO.File.OpenRead(filePath);
            return File(image, "image/jpeg");
        }

        [HttpPost]
        public async Task<ActionResult<Lunch>> AddLunch([FromForm] Lunch lunch){
            await _lunchRepository.AddLunchAsync(lunch);

            if (lunch.Image != null && lunch.Image.Length > 0){
                var filePath = Path.Combine("Uploads/Lunch", $"{lunch.ID}.jpg");

                using (var stream = new FileStream(filePath, FileMode.Create)){
                    await lunch.Image.CopyToAsync(stream);
                }

                SetImageUrl(lunch);
            }

            return CreatedAtAction(nameof(GetLunchById), new { id = lunch.ID }, lunch);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLunch(long id, [FromForm] Lunch lunch){
            if (id != lunch.ID){
                return BadRequest();
            }

            if (lunch.Image != null && lunch.Image.Length > 0){
                var filePath = Path.Combine("Uploads/Lunch", $"{id}.jpg");

                using (var stream = new FileStream(filePath, FileMode.Create)){
                    await lunch.Image.CopyToAsync(stream);
                }

                SetImageUrl(lunch);
            }

            await _lunchRepository.UpdateLunchAsync(lunch);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLunch(long id){
            var lunch = await _lunchRepository.GetLunchByIdAsync(id);
            if (lunch == null){
                return NotFound();
            }

            // Delete the associated image file if it exists
            var filePath = Path.Combine("Uploads/Lunch", $"{id}.jpg");
            if (System.IO.File.Exists(filePath)){
                System.IO.File.Delete(filePath);
            }

            await _lunchRepository.DeleteLunchAsync(id);
            return NoContent();
        }

        private void SetImageUrl(Lunch lunch){
            var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            lunch.ImageUrl = $"{baseUrl}/api/lunch/image/{lunch.ID}";
        }
    }
}
