using Microsoft.EntityFrameworkCore;
using Repositories; 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Sets development environment to use in-memory database
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<LunchContext>(options =>
        options.UseInMemoryDatabase("Lunch"));

    builder.Services.AddDbContext<SocialEventsContext>(options =>
        options.UseInMemoryDatabase("SocialEvents"));

    builder.Services.AddDbContext<StaffContext>(options =>
        options.UseInMemoryDatabase("Staff"));
}
else
{
    builder.Services.AddDbContext<LunchContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("LunchContext") ?? throw new InvalidOperationException("Connection string 'LunchContext' not found.")));

    builder.Services.AddDbContext<SocialEventsContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("SocialEventsContext") ?? throw new InvalidOperationException("Connection string 'SocialEventsContext' not found.")));

    builder.Services.AddDbContext<StaffContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("StaffContext") ?? throw new InvalidOperationException("Connection string 'StaffContext' not found.")));
}

// Register repositories for dependency injection
builder.Services.AddScoped<ILunchRepository, LunchRepository>();
builder.Services.AddScoped<ISocialEventsRepository, SocialEventsRepository>();
builder.Services.AddScoped<IStaffRepository, StaffRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
