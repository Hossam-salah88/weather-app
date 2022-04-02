import React, { useState, useEffect } from "react";

const WeatherApp = () => {
  const [search, setSearch] = useState("egypt");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;

  // let KEY = c99539c773385b7d0869dfc2469e5aaf

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=c99539c773385b7d0869dfc2469e5aaf`
      );
      if (componentMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main == "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main == "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main == "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main == "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>....loading</div>;
  }

  let temp = (data.main.temp - 273.15).toFixed(2);
  let tempMin = (data.main.temp_min - 273.15).toFixed(2);
  let tempMax = (data.main.temp_max - 273.15).toFixed(2);

  // Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  // Time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handel = (e) => {
    e.preventDefault();
    setSearch(input);
  };
  return (
    <div>
      <div className="container-lg mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5 col-lg-5 col-xl-4">
            <div className="card text-white text-center border-0">
              <img
                className="card-img"
                src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
              />
              <div className="card-img-overlay text-center">
                <form onSubmit={handel}>
                  <div className="input-group mb-4 w-75 mx-auto ">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="search city"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h2 className="card-title">{data.name}</h2>
                  <p className="card-text lead">
                    {day}, {month} {date}, {year}
                    <br />
                    {time}
                  </p>
                  <hr />
                  <i className={`fas ${emoji} fa-4x`}></i>
                  <p className="fw-bolder  mb-md-5 fs-1">{temp} &deg;c</p>
                  <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                  <p className="lead">
                    {tempMin}&deg;c | {tempMax}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
