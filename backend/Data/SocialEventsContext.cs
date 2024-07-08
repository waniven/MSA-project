using Microsoft.EntityFrameworkCore;

public class SocialEventsContext : DbContext{
    public SocialEventsContext(DbContextOptions<SocialEventsContext> options) : base(options){

    }

    public DbSet<Models.SocialEvents> SocialEvents { get; set; } = default!;
}