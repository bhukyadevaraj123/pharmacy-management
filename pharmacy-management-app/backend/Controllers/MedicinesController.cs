
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicinesController : ControllerBase
    {
        private readonly MedicineService _medicineService;

        public MedicinesController(MedicineService medicineService)
        {
            _medicineService = medicineService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_medicineService.GetAll());
        }

        [HttpGet("search")]
        public IActionResult Search(string name)
        {
            var medicines = _medicineService
                .GetAll()
                .Where(x => x.FullName.Contains(name, StringComparison.OrdinalIgnoreCase));

            return Ok(medicines);
        }

        [HttpPost]
        public IActionResult Add(Medicine medicine)
        {
            _medicineService.Add(medicine);

            return Ok(new { message = "Medicine added successfully" });
        }
    }
}
