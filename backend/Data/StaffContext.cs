using Microsoft.EntityFrameworkCore;
using Models;

public class StaffContext : DbContext{
    public StaffContext(DbContextOptions<StaffContext> options) : base(options){

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        modelBuilder.Entity<Staff>().Ignore(l => l.Image);
    }
    public DbSet<Models.Staff> Staff { get; set; } = default!;
}