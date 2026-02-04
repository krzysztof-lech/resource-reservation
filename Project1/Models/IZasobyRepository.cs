using System.Linq;

namespace Project1.Models
{
    public interface IZasobyRepository
    {
        IQueryable<Zasob> Zasob { get; }
        public void zapiszZasob(Zasob zasob);
        public Zasob getZasobById(int id);
        public void deleteZasobById(int id);
        IQueryable<Rezerwacja> Rezerwacja { get; }
        public void zapiszRezerwacja(Rezerwacja rezerwacja);
        public Rezerwacja getRezerwacjaById(int id);
        public void deleteRezerwacjaById(int id);
        IQueryable<Uzytkownik> Uzytkownik { get; }
        public void zapiszUzytkownik(Uzytkownik uzytkownik);
        public Uzytkownik getUzytkownikById(int id);
        public void deleteUzytkownikById(int id);
        IQueryable<Kategoria> Kategoria { get; }
        public void zapiszKategorie(Kategoria kategoria);
        public Kategoria getKategoriaById(int id);
        public void deleteKategoriaById(int id);
    }
}