using Models;

namespace Repositories{
    public interface IStaffRepository{
        Task<IEnumerable<Staff>> GetAllStaffAsync();
        Task<Staff> GetStaffByIdAsync(long id);
        Task AddStaffAsync (Staff staff);
        Task UpdateStaffAsync (Staff staff);
        Task DeleteStaffAsync  (long id);
    }
}