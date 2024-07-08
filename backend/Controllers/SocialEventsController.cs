using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;

namespace backend.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class SocialEventsController : ControllerBase{
        private readonly ISocialEventsRepository _socialEventsRepository;

        public SocialEventsController(ISocialEventsRepository socialEventsRepository){
            _socialEventsRepository = socialEventsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<SocialEvents>> GetAllSocialEvents(){
            return await _socialEventsRepository.GetSocialEventsAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SocialEvents>> GetSocialEventById(long id){
            var socialEvent = await _socialEventsRepository.GetSocialEventByIdAsync(id);
            if (socialEvent == null){
                return NotFound();
            }else{
                return socialEvent;
            }
        }

        [HttpPost]
        public async Task<ActionResult<SocialEvents>> AddSocialEvent(SocialEvents socialEvent){
            await _socialEventsRepository.AddSocialEventAsync(socialEvent);
            return CreatedAtAction(nameof(GetSocialEventById), new { id = socialEvent.ID }, socialEvent);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSocialEvent(long id, SocialEvents socialEvent){
            if (id != socialEvent.ID){
                return BadRequest();
            }else{
                await _socialEventsRepository.UpdateSocialEventAsync(socialEvent);
                return NoContent();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSocialEvent(long id){
            var socialEvent = await _socialEventsRepository.GetSocialEventByIdAsync(id);
            if (socialEvent == null){
                return NotFound();
            }else{
                await _socialEventsRepository.DeleteSocialEventAsync(id);
                return NoContent();
            }
        }
    }
}
