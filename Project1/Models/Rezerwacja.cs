using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models
{
    public class Rezerwacja
    {
        public int id { get; set; }
        public int uzytkownik_id { get; set; }
        public int zasob_id { get; set; }
        public int rok { get; set; }
        public int mies { get; set; }
        public int dz { get; set; }
        public int godz { get; set; }
        public int min { get; set; }
    }
}
