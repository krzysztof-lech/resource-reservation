using Microsoft.EntityFrameworkCore;

namespace Project1.Models
{
    public class ZasobyDbContext : DbContext
    {
        public ZasobyDbContext(DbContextOptions<ZasobyDbContext>
            options) : base(options) { }

        public DbSet<Zasob> Zasob { get; set; }
        public DbSet<Rezerwacja> Rezerwacja { get; set; }
        public DbSet<Uzytkownik> Uzytkownik { get; set; }

        public DbSet<Kategoria> Kategoria { get; set; }
    }
}
