using System.Net.Http;
using System.Text.Json;
using WeatherApi.Models;

namespace WeatherApi.Services
{
    public class WeatherService
    {
        private readonly HttpClient _http;
        private readonly string _apiKey;

        public WeatherService(HttpClient http, IConfiguration config)
        {
            _http = http;
            _apiKey = config["OpenWeatherApiKey"] ?? "";
        }

        // Fixed: Added 'unit' parameter with default value 'metric'
        public async Task<WeatherResponse?> GetWeatherAsync(string city, string unit = "metric")
        {
            try
            {
                var url = $"https://api.openweathermap.org/data/2.5/weather?q={Uri.EscapeDataString(city)}&appid={_apiKey}&units={unit}";
                Console.WriteLine($"Calling OpenWeather URL: {url}");

                var response = await _http.GetAsync(url);
                var content = await response.Content.ReadAsStringAsync();

                Console.WriteLine($"HTTP Status: {response.StatusCode}");
                Console.WriteLine($"Response Body: {content}");

                if (!response.IsSuccessStatusCode)
                    return null;

                return JsonSerializer.Deserialize<WeatherResponse>(content);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return null;
            }
        }
    }
}



