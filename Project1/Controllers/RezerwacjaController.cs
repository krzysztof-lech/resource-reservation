using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project1.Models;

namespace Project1.Controllers
{
 
        [ApiController]
        [Route("api/[controller]")]
        public class RezerwacjaController : ControllerBase
        {


            private IZasobyRepository repository;
            private readonly ILogger<RezerwacjaController> _logger;


        public RezerwacjaController(IZasobyRepository repo, ILogger<RezerwacjaController> logger)
            {
                repository = repo;
                _logger = logger;
            }


        [HttpPost]
        public void Post([FromBody] Rezerwacja rezerwacja)
        {
            repository.zapiszRezerwacja(rezerwacja);

        }

        [HttpGet]
        public IEnumerable<Rezerwacja> Get()
        {
            return repository.Rezerwacja.AsEnumerable();
        }
        [HttpGet("{id}")]
        public Rezerwacja GetById(int id)
        {
            return repository.getRezerwacjaById(id);
        }

        [HttpGet("{zasob_id}/{year_from}/{month_from}/{day_from}/{year_to}/{month_to}/{day_to}")]
        public IEnumerable<RezerwacjaInfo> GetbyDateRange(int zasob_id, int year_from, int month_from, int day_from, int year_to, int month_to, int day_to)
        {
            int date_from = year_from * 10000 + month_from * 100 + day_from;
            int date_to = year_to * 10000 + month_to * 100 + day_to;
            return repository.Rezerwacja.Where(r => (r.zasob_id == zasob_id && (r.rok * 10000 + r.mies * 100 + r.dz) >= date_from && (r.rok * 10000 + r.mies * 100 + r.dz) <= date_to)) 
            .Join(repository.Uzytkownik, r => r.uzytkownik_id, u => u.id, (r, u) => new RezerwacjaInfo(r, u));

        }

        [HttpGet("{zasob_id}/{rok}/{mies}/{dz}/{godz}/{min}")]
        public IEnumerable<Rezerwacja> GetbyDzienTermin(int zasob_id, int rok, int mies, int dz, int godz, int min)
        {

        return repository.Rezerwacja.Where(r => (r.zasob_id == zasob_id && r.rok == rok
            && r.mies == mies && r.dz == dz && r.godz == godz && r.min == min)).Select(r => r);
 
 
        }

        [HttpDelete("{id}")]
            public void DeleteById(int id)
            {
                repository.deleteRezerwacjaById(id);
            }
        }

}
