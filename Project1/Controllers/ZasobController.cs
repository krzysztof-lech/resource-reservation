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
    public class ZasobController : ControllerBase
    {


        private IZasobyRepository repository;
        private readonly ILogger<ZasobController> _logger;


        public ZasobController(IZasobyRepository repo, ILogger<ZasobController> logger)
        {
            repository = repo;
            _logger = logger;
        }


        [HttpPost]
        public void Post([FromBody] Zasob zasob)
        {
            repository.zapiszZasob(zasob);

        }

        [HttpGet]
        public IEnumerable<Zasob> Get()
        {
            return repository.Zasob.AsEnumerable();
        }


        [HttpGet("{id}")]
        public Zasob GetById(int id)
        {
            return repository.getZasobById(id);
        }

        [HttpDelete("{id}")]
        public void DeleteById(int id)
        {
            repository.deleteZasobById(id);
        }
    }
}

