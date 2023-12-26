using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extentions
{
    public static class ApplicationServiceExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection service, IConfiguration config)
        {
            service.AddDbContext<DataContext>(option =>
            {
                //option.UseSqlite(config.GetConnectionString("DefaultConnection"));
                option.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });

            service.AddCors();
            service.AddScoped<ITokenService, TokenService>();
            service.AddScoped<IUserRepository, UserRepository>();

            return service;
        }

    }
}
