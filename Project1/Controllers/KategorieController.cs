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
    public class KategorieController : ControllerBase
    {
        private IZasobyRepository repository;


        public KategorieController(IZasobyRepository repo)
        {
            repository = repo;
        }


        private readonly ILogger<KategorieController> _logger;
        /*
                public ZasobyController(ILogger<ZasobyController> logger)
                {
                    _logger = logger;
                }
        */
        [HttpPost]
        public void Post([FromBody] Kategoria kategoria)
        {
            repository.zapiszKategorie(kategoria);

        }

        [HttpGet]
        public IEnumerable<Kategoria> Get()
        {
            return repository.Kategoria.AsEnumerable();
        }
        [HttpGet("{id}")]
        public Kategoria GetById(int id)
        {
            return repository.getKategoriaById(id);
        }

        [HttpDelete("{id}")]
        public void DeleteById(int id)
        {
            repository.deleteKategoriaById(id);
        }
    }
}
