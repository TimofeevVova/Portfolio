using Microsoft.EntityFrameworkCore;

namespace Portfolio.Models
{
    public class DbSettings : DbContext
    {
        public DbSettings(DbContextOptions<DbSettings> options) : base(options)
        {
        }

        public DbSet<InfoDataBase> InfoDataBases { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Дополнительные настройки модели могут быть добавлены здесь
            // Например, указание первичных и внешних ключей и т.д.
        }
    }
}
