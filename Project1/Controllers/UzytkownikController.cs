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
    public class UzytkownikController : ControllerBase
    {


        private IZasobyRepository repository;
        private readonly ILogger<UzytkownikController> _logger;


        public UzytkownikController(IZasobyRepository repo, ILogger<UzytkownikController> logger)
        {
            repository = repo;
            _logger = logger;
        }


        [HttpPost]
        public void Post([FromBody] Uzytkownik uzytkownik)
        {
            repository.zapiszUzytkownik(uzytkownik);

        }

        [HttpGet]
        public IEnumerable<Uzytkownik> Get()
        {
            return repository.Uzytkownik.AsEnumerable();
        }

        
        [HttpGet("{id}/{login}")]
        public Uzytkownik GetById(int id, string login)
        {
            return repository.getUzytkownikById(id);
        }
        
        [HttpGet("{login}")]
        public IEnumerable<Uzytkownik> GetByLogin(string login)
        {

            return repository.Uzytkownik.Where(u => (u.login == login)).Select(u => u);


        }

        [HttpDelete("{id}")]
        public void DeleteById(int id)
        {
            repository.deleteUzytkownikById(id);
        }
    }
}

