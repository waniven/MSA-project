using Microsoft.EntityFrameworkCore;
using Models;

public class LunchContext : DbContext{
    public LunchContext(DbContextOptions<LunchContext> options) : base(options){

    }

    public DbSet<Models.Lunch> Lunch { get; set; } = default!;
}