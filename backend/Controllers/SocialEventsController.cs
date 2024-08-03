using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SocialEventsController : ControllerBase
    {
        private readonly ISocialEventsRepository _socialEventsRepository;

        public SocialEventsController(ISocialEventsRepository socialEventsRepository)
        {
            _socialEventsRepository = socialEventsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<SocialEvents>> GetAllSocialEvents()
        {
            var socialEvents = await _socialEventsRepository.GetSocialEventsAsync();

            foreach (var socialEvent in socialEvents)
            {
                var filePath = Path.Combine("Uploads/SocialEvents", $"{socialEvent.ID}.jpg");
                if (System.IO.File.Exists(filePath))
                {
                    var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                    socialEvent.ImageUrl = $"{baseUrl}/api/socialevents/image/{socialEvent.ID}";
                }
            }
            return socialEvents;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SocialEvents>> GetSocialEventById(long id)
        {
            var socialEvent = await _socialEventsRepository.GetSocialEventByIdAsync(id);
            if (socialEvent == null)
            {
                return NotFound();
            }

            var filePath = Path.Combine("Uploads/SocialEvents", $"{id}.jpg");
            if (System.IO.File.Exists(filePath))
            {
                var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                socialEvent.ImageUrl = $"{baseUrl}/api/socialevents/image/{id}";
            }

            return socialEvent;
        }

        [HttpGet("image/{id}")]
        public IActionResult GetImage(long id)
        {
            var filePath = Path.Combine("Uploads/SocialEvents", $"{id}.jpg");
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            var image = System.IO.File.OpenRead(filePath);
            return File(image, "image/jpeg");
        }

        [HttpPost]
        public async Task<ActionResult<SocialEvents>> AddSocialEvent([FromForm] SocialEvents socialEvent)
        {
            await _socialEventsRepository.AddSocialEventAsync(socialEvent);

            if (socialEvent.Image != null && socialEvent.Image.Length > 0)
            {
                var filePath = Path.Combine("Uploads/SocialEvents", $"{socialEvent.ID}.jpg");

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await socialEvent.Image.CopyToAsync(stream);
                }

                var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                socialEvent.ImageUrl = $"{baseUrl}/api/socialevents/image/{socialEvent.ID}";
            }

            return CreatedAtAction(nameof(GetSocialEventById), new { id = socialEvent.ID }, socialEvent);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSocialEvent(long id, [FromForm] SocialEvents socialEvent)
        {
            if (id != socialEvent.ID)
            {
                return BadRequest();
            }

            await _socialEventsRepository.UpdateSocialEventAsync(socialEvent);

            if (socialEvent.Image != null && socialEvent.Image.Length > 0)
            {
                var filePath = Path.Combine("Uploads/SocialEvents", $"{id}.jpg");

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await socialEvent.Image.CopyToAsync(stream);
                }

                var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                socialEvent.ImageUrl = $"{baseUrl}/api/socialevents/image/{id}";
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSocialEvent(long id)
        {
            var socialEvent = await _socialEventsRepository.GetSocialEventByIdAsync(id);
            if (socialEvent == null)
            {
                return NotFound();
            }

            // Delete the image file if it exists
            var filePath = Path.Combine("Uploads/SocialEvents", $"{id}.jpg");
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            await _socialEventsRepository.DeleteSocialEventAsync(id);
            return NoContent();
        }
    }
}
