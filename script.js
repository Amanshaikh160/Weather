
let apiKey = "fc30ce06b7ff7568fc9bff7525c60c72";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCard = document.querySelector(".card");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const body = document.body;

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        body.style.background = "linear-gradient(135deg, #ff4e50, #f9d423)";
    } else {
        const data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weather = data.weather[0].main;

        if (weather === "Clouds") {
            weatherIcon.src = "clouds.png";
            body.style.background = "linear-gradient(135deg, #8e9eab, #eef2f3)";
        } else if (weather === "Clear") {
            weatherIcon.src = "clear.png";
            body.style.background = "linear-gradient(135deg, #00c6ff, #0072ff)";
        } else if (weather === "Rain") {
            weatherIcon.src = "rain.png";
            body.style.background = "linear-gradient(135deg, #004e92, #000428)";
        } else if (weather === "Drizzle") {
            weatherIcon.src = "drizzle.png";
            body.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
        } else if (weather === "Mist") {
            weatherIcon.src = "mist.png";
            body.style.background = "linear-gradient(135deg, #3a7bd5, #3a6073)";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});