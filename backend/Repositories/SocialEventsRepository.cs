using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories{
    public class SocialEventsRepository : ISocialEventsRepository{
        private readonly SocialEventsContext _context;

        public SocialEventsRepository(SocialEventsContext context){
            _context = context;
        }

        public async Task<IEnumerable<SocialEvents>> GetSocialEventsAsync(){
            return await _context.SocialEvents.ToListAsync();
        }

        public async Task<SocialEvents> GetSocialEventByIdAsync(long id){
            return await _context.SocialEvents.FindAsync(id);
        }

        public async Task AddSocialEventAsync(SocialEvents socialEvents){
            await _context.SocialEvents.AddAsync(socialEvents);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSocialEventAsync(SocialEvents socialEvents){
            _context.SocialEvents.Update(socialEvents);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSocialEventAsync(long id){
            var socialEvent = await _context.SocialEvents.FindAsync(id);
            if (socialEvent != null){
                _context.SocialEvents.Remove(socialEvent);
                await _context.SaveChangesAsync();  // Ensure this line has the await keyword
            }
        }
    }
}
