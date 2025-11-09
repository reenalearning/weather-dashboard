using System.Text.Json.Serialization;

namespace WeatherApi.Models
{
    public class WeatherResponse
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("main")]
        public Main Main { get; set; } = new Main();

        [JsonPropertyName("weather")]
        public Weather[] Weather { get; set; } = Array.Empty<Weather>();
    }

    public class Main
    {
        [JsonPropertyName("temp")]
        public double Temp { get; set; }
    }

    public class Weather
    {
        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("icon")]
        public string Icon { get; set; } = string.Empty;
    }
}
