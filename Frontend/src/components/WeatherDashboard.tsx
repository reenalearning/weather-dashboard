import React, { useState, useEffect } from "react";

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
}

const WeatherDashboard: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  
  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setCity(savedCity);
      fetchWeather(savedCity);
    }

    window.addEventListener("online", () => setIsOffline(false));
    window.addEventListener("offline", () => setIsOffline(true));
    
  }, []);

  const fetchWeather = async (searchCity?: string) => {
    const targetCity = searchCity || city;
    if (!targetCity) return;

    setLoading(true);
    setError(null);

    try {
      if (!navigator.onLine) {
        setIsOffline(true);
        const cachedWeather = localStorage.getItem("cachedWeather");
        if (cachedWeather) setWeather(JSON.parse(cachedWeather));
        return;
      }

      const response = await fetch(
        `https://localhost:7085/api/weather/${targetCity}?unit=metric`
      );

      if (!response.ok) {
        throw new Error("City not found or API error");
      }

      const data = await response.json();

      const formattedData: WeatherData = {
        city: data.name,
        temperature: Number(data.main.temp.toFixed(1)), 
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      };

      setWeather(formattedData);
      localStorage.setItem("lastCity", targetCity);
      localStorage.setItem("cachedWeather", JSON.stringify(formattedData));
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = () => {
    if (!city || favorites.includes(city)) return;
    const updatedFavorites = [...favorites, city];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const bgStyle = () => {
    if (!weather) return { background: "#f0f0f0" };

    const cond = weather.description.toLowerCase();
    if (cond.includes("cloud")) return { background: "linear-gradient(to right, #757f9a, #d7dde8)" };
    if (cond.includes("rain")) return { background: "linear-gradient(to right, #141e30, #243b55)" };
    if (cond.includes("clear")) return { background: "linear-gradient(to right, #fceabb, #f8b500)" };

    return { background: "#f0f0f0" };
  };

  return (
    <div style={{ minHeight: "100vh", textAlign: "center", padding: "40px", ...bgStyle() }}>
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={() => fetchWeather()}
        style={{ padding: "10px 20px", marginLeft: "10px" }}
      >
        Get Weather
      </button>
      <button
        onClick={addFavorite}
        style={{ padding: "10px 20px", marginLeft: "10px" }}
      >
        ★ Favorite
      </button>

      {isOffline && <p style={{ color: "red" }}>Offline: Showing cached data</p>}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.description}</p>
          <img src={weather.icon} alt={weather.description} />
        </div>
      )}

      <h3 style={{ marginTop: "40px" }}>Favorite Cities</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {favorites.map((f) => (
          <li
            key={f}
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              setCity(f);
              fetchWeather(f);
            }}
          >
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default WeatherDashboard;


