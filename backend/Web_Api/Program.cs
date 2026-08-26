using ExpenseLibrary;
using ExpenseLibrary.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<ServiceContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"));
});
//builder.Services.Configure<JwtSettings>(
//    builder.Configuration.GetSection("Jwt"));
builder.Services.AddScoped<IRepository,Repository>();
builder.Services.AddScoped<IAuthServices, AuthServices>();
//builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddSwaggerGen();

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowFrontend", policy =>
//    {
//        policy.WithOrigins("http://localhost:5173")
//        .AllowAnyHeader()
//        .AllowAnyMethod();
//    });
//});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendCloud", policy =>
    {
        policy.WithOrigins("https://expense-tracker-one-chi-42.vercel.app")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.UseCors("AllowFrontend");
app.UseCors("AllowFrontendCloud");
//app.UseAuthentication();
//app.UseAuthorization();
app.UseHttpsRedirection();


app.MapControllers();

app.Run();
