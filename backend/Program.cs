using Microsoft.EntityFrameworkCore;
using Repositories;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env file
Env.Load();

// Get connection strings from environment variables
var lunchDbConnectionString = Environment.GetEnvironmentVariable("LUNCH_DB_CONNECTION_STRING");
var socialEventsDbConnectionString = Environment.GetEnvironmentVariable("SOCIALEVENTS_DB_CONNECTION_STRING");
var staffDbConnectionString = Environment.GetEnvironmentVariable("STAFF_DB_CONNECTION_STRING");

// Add services to the container.
builder.Services.AddDbContext<LunchContext>(options =>
    options.UseSqlServer(lunchDbConnectionString ?? throw new InvalidOperationException("Connection string 'LunchContext' not found.")));

builder.Services.AddDbContext<SocialEventsContext>(options =>
    options.UseSqlServer(socialEventsDbConnectionString ?? throw new InvalidOperationException("Connection string 'SocialEventsContext' not found.")));

builder.Services.AddDbContext<StaffContext>(options =>
    options.UseSqlServer(staffDbConnectionString ?? throw new InvalidOperationException("Connection string 'StaffContext' not found.")));

// Register repositories for dependency injection
builder.Services.AddScoped<ILunchRepository, LunchRepository>();
builder.Services.AddScoped<ISocialEventsRepository, SocialEventsRepository>();
builder.Services.AddScoped<IStaffRepository, StaffRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAllOrigins"); // Add the CORS middleware

app.UseAuthorization();

app.MapControllers();

app.Run();
