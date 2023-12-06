using Microsoft.EntityFrameworkCore;

namespace Portfolio.Models
{
    public class DbSettings : DbContext
    {
        public DbSettings(DbContextOptions<DbSettings> options) : base(options)
        {
        }

        public DbSet<InfoDataBase> InfoDataBases { get; set; } // таблица db в базе данных [Table("db")]
        public DbSet<ClientDataBase> ClientDataBase { get; set; } // таблица loginData в базе данных [Table("loginData")]

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Игнорируем таблицу "db"
            //modelBuilder.Ignore<InfoDataBase>();
        }
    }
}
