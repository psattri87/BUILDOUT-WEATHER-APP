import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const key = "2292257936f54ffabcc90836230112";

  async function fetchData() {
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${inputValue}`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error.message);
      setData({});
      alert("Failed to fetch weather data");
    }
    setLoading(false);
  }

  return (
    <div>
      <div>
        <input type="text" onChange={handleChange} value={inputValue} />
        <button onClick={fetchData}>Search</button>
      </div>
      {loading ? (
        <p className="weather-cards">Loading data...</p>
      ) : Object.keys(data).length === 0? "" : (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <div>{data.current.temp_c}&deg;C</div>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <div>{data.current.humidity};%</div>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <div>{data.current.condition.text}</div>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <div>{data.current.wind_kph} kph</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
