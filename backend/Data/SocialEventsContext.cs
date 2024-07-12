using Microsoft.EntityFrameworkCore;
using Models;

public class SocialEventsContext : DbContext{
    public SocialEventsContext(DbContextOptions<SocialEventsContext> options) : base(options){

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        modelBuilder.Entity<SocialEvents>().Ignore(l => l.Image);
    }
    public DbSet<Models.SocialEvents> SocialEvents { get; set; } = default!;
}