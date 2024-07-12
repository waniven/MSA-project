using Microsoft.EntityFrameworkCore;
using Models;

public class LunchContext : DbContext{
    public LunchContext(DbContextOptions<LunchContext> options) : base(options){

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        modelBuilder.Entity<Lunch>().Ignore(l => l.Image);
    }

    public DbSet<Models.Lunch> Lunch { get; set; } = default!;
}