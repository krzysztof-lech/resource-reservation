using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models
{
    public class RezerwacjaInfo
    {
        public Rezerwacja rezerwacja { get; set; }
        public Uzytkownik uzytkownik { get; set; }

        public RezerwacjaInfo( Rezerwacja _rezerwacja, Uzytkownik _uzytkownik)
        {
            rezerwacja = _rezerwacja;
            uzytkownik = _uzytkownik;
        }

    }
}