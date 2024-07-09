using Models;

namespace Repositories{
    public interface ILunchRepository{
        Task<IEnumerable<Lunch>> GetLunchesAsync();
        Task<Lunch> GetLunchByIdAsync(long id);
        Task AddLunchAsync (Lunch lunch);
        Task UpdateLunchAsync (Lunch lunch);
        Task DeleteLunchAsync (long id);
    }
}