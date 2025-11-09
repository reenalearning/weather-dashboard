using Microsoft.AspNetCore.Mvc;
using WeatherApi.Services;

namespace WeatherApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly WeatherService _service;

        public WeatherController(WeatherService service)
        {
            _service = service;
        }

       
        
        [HttpGet("{city}")]
        public async Task<IActionResult> GetWeather(string city, string unit = "metric")
        {
            var data = await _service.GetWeatherAsync(city, unit);
            if (data == null) return NotFound(new { message = "City not found" });
            return Ok(data);
        }
    }
}
