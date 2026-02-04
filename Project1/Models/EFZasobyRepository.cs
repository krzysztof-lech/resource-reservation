using System.Linq;
namespace Project1.Models
{
    public class EFZasobyRepository : IZasobyRepository
    {
        private ZasobyDbContext context;
        public EFZasobyRepository(ZasobyDbContext ctx)
        {
            context = ctx;
        }
        public IQueryable<Zasob> Zasob => context.Zasob;
        public void zapiszZasob(Zasob zasob)
        {
            if (zasob.id == 0)
            {
                context.Zasob.Add(zasob);
            }
            else
            {
                context.Zasob.Update(zasob);
            }
            context.SaveChanges();
        }
        public Zasob getZasobById(int id)
        {
            Zasob zasob = context.Zasob.Find(id);
            return zasob;
        }

        public void deleteZasobById(int id)
        {
            Zasob zasob = context.Zasob.Find(id);
            context.Zasob.Remove(zasob);
            context.SaveChanges();
        }

        public IQueryable<Rezerwacja> Rezerwacja => context.Rezerwacja;
        public void zapiszRezerwacja(Rezerwacja rezerwacja)
        {
            if (rezerwacja.id == 0)
            {
                context.Rezerwacja.Add(rezerwacja);
            }
            else
            {
                context.Rezerwacja.Update(rezerwacja);
            }
            context.SaveChanges();
        }
        public Rezerwacja getRezerwacjaById(int id)
        {
            Rezerwacja rezerwacja = context.Rezerwacja.Find(id);
            return rezerwacja;
        }

        public void deleteRezerwacjaById(int id)
        {
            Rezerwacja rezerwacja = context.Rezerwacja.Find(id);
            context.Rezerwacja.Remove(rezerwacja);
            context.SaveChanges();
        }
        public IQueryable<Uzytkownik> Uzytkownik => context.Uzytkownik;
        public void zapiszUzytkownik(Uzytkownik uzytkownik)
        {
            if (uzytkownik.id == 0)
            {
                context.Uzytkownik.Add(uzytkownik);
            }
            else
            {
                context.Uzytkownik.Update(uzytkownik);
            }
            context.SaveChanges();
        }
        public Uzytkownik getUzytkownikById(int id)
        {
            Uzytkownik uzytkownik = context.Uzytkownik.Find(id);
            return uzytkownik;
        }

        public void deleteUzytkownikById(int id)
        {
            Uzytkownik uzytkownik = context.Uzytkownik.Find(id);
            context.Uzytkownik.Remove(uzytkownik);
            context.SaveChanges();
        }

        public IQueryable<Kategoria> Kategoria => context.Kategoria;
        public void zapiszKategorie(Kategoria kategoria)
        {
            if (kategoria.id == 0)
            {
                context.Kategoria.Add(kategoria);
            }
            else
            {
                context.Kategoria.Update(kategoria);
            }
            context.SaveChanges();
        }
        public Kategoria getKategoriaById(int id)
        {
            Kategoria kategoria = context.Kategoria.Find(id);
            return kategoria;
        }

        public void deleteKategoriaById(int id)
        {
            Kategoria kategoria = context.Kategoria.Find(id);
            context.Kategoria.Remove(kategoria);
            context.SaveChanges();
        }

    }
}