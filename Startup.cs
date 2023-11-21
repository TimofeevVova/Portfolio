using Microsoft.EntityFrameworkCore;
using Portfolio.Helpers;
using Portfolio.Models;

namespace Portfolio
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // Регистрация DbHelper
            services.AddScoped<DbHelper>();

            // Подключение к PostgreSQL
            services.AddDbContext<DbSettings>(options =>
                options.UseNpgsql("Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=postgres"));

            services.AddControllersWithViews();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
