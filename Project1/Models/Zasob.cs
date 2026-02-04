using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models
{
    public class Zasob
    {
        public int id { get; set; }

        public string nazwa { get; set; }


        public int interwal { get; set; }
        
        public int godz_od { get; set; }
       
       
        public int min_od { get; set; }

        public int godz_do { get; set; }

        public int min_do { get; set; }
               
        

    }
}

