using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models
{
    public class Uzytkownik
    {
        public int id { get; set; }

        public string imie { get; set; }

        public string nazwisko { get; set; }

        public string login { get; set; }

        public string haslo { get; set; }

        public int admin { get; set; }


    }
}