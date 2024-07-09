using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories{
    public class LunchRepository : ILunchRepository{
        private readonly LunchContext _context;

        public LunchRepository(LunchContext context){
            _context = context;
        }

        public async Task<IEnumerable<Lunch>> GetLunchesAsync(){
            return await _context.Lunch.ToListAsync();
        }

        public async Task<Lunch> GetLunchByIdAsync(long id){
            return await _context.Lunch.FindAsync(id);
        }

        public async Task AddLunchAsync (Lunch lunch){
            await _context.Lunch.AddAsync(lunch);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateLunchAsync (Lunch lunch){
            _context.Lunch.Update(lunch);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteLunchAsync (long id){
            var lunch = await _context.Lunch.FindAsync(id);
            if (lunch != null){
                _context.Lunch.Remove(lunch);
                await _context.SaveChangesAsync();
            }
        }
    }
}