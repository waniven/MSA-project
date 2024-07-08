using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories{
    public class StaffRepository : IStaffRepository{
        private readonly StaffContext _context;

        public StaffRepository(StaffContext context){
            _context = context;
        }

        public async Task<IEnumerable<Staff>> GetAllStaffAsync(){
            return await _context.Staff.ToListAsync();
        }

        public async Task<Staff> GetStaffByIdAsync(long id){
            return await _context.Staff.FindAsync(id);
        }

        public async Task AddStaffAsync (Staff staff){
            await _context.Staff.AddAsync(staff);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateStaffAsync (Staff staff){
            _context.Update(staff);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteStaffAsync  (long id){
            var staff = await _context.Staff.FindAsync(id);
            if (staff != null){
                _context.Staff.Remove(staff);
                _context.SaveChangesAsync();
            }
        }
    }
}