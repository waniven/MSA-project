using Microsoft.EntityFrameworkCore;

public class StaffContext : DbContext{
    public StaffContext(DbContextOptions<StaffContext> options) : base(options){

    }

    public DbSet<Models.Staff> Staff { get; set; } = default!;
}