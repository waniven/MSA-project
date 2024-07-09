using Models;

namespace Repositories{
    public interface ISocialEventsRepository{
        Task<IEnumerable<SocialEvents>> GetSocialEventsAsync();
        Task<SocialEvents> GetSocialEventByIdAsync(long id);
        Task AddSocialEventAsync (SocialEvents socialEvents);
        Task UpdateSocialEventAsync (SocialEvents socialEvents);
        Task DeleteSocialEventAsync  (long id);
    }
}