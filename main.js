const APIKEY = "35fb68b7709beb3e39a474e03949e3cd"

const currentCity = document.querySelector("#current-city")
const mainTemp = document.querySelector("#main-temp")
const mainFeelsLike = document.querySelector("#main-feels-like")
const mainHumidity = document.querySelector("#humidity")
const pressure = document.querySelector("#pressure")
const windSpeed = document.querySelector("#wind-speed")
const sunrise = document.querySelector("#sunrise")
const sunset = document.querySelector("#sunset")
const nearbyTemp = document.querySelector("#nearby-temp")
const nearbyCity = document.querySelector("#nearby-city")
const nearbyDescription = document.querySelector("#nearby-description")
const nearbyTemp2 = document.querySelector("#nearby-temp2")
const nearbyCity2 = document.querySelector("#nearby-city2")
const nearbyDescription2 = document.querySelector("#nearby-description2")
const searchInput = document.querySelector("#search-input")

async function sendRequest() {

    const city = searchInput.value
    
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=uk`

    const response = await fetch(api)
    const data = await response.json()

    console.log(data);

    currentCity.innerHTML = city

    mainTemp.innerHTML = `${Math.round(data.main.temp)} °C`
    mainFeelsLike.innerHTML = `feels like ${Math.round(data.main.feels_like)} °C`
    mainHumidity.innerHTML = `${data.main.humidity} %`
    windSpeed.innerHTML = `${data.wind.speed} km/h`
    pressure.innerHTML = `${data.main.pressure} hPa`

    let sunriseUnix = data.sys.sunrise
    let sunriseTime = new Date(sunriseUnix * 1000)

    sunrise.innerHTML = sunriseTime.toLocaleTimeString()

    let sunsetUnix = data.sys.sunset
    let sunsetTime = new Date(sunsetUnix * 1000)

    sunset.innerHTML = sunsetTime.toLocaleTimeString()

    let apiCoord = `https://api.openweathermap.org/data/2.5/weather?lat=${data.coord.lat - 0.3}&lon=${data.coord.lon + 0.3}&appid=${APIKEY}&units=metric&lang=uk`;

    const responseCoord = await fetch(apiCoord)
    const dataCoord = await responseCoord.json()

    console.log(dataCoord);

    nearbyTemp.innerHTML = `${Math.round(dataCoord.main.temp)} °C`
    nearbyCity.innerHTML = `${dataCoord.name}`
    nearbyDescription.innerHTML = `${dataCoord.weather[0].main}`

    let apiCoord2 = `https://api.openweathermap.org/data/2.5/weather?lat=${data.coord.lat + 0.3}&lon=${data.coord.lon - 0.3}&appid=${APIKEY}&units=metric&lang=uk`;

    const responseCoord2 = await fetch(apiCoord2)
    const dataCoord2 = await responseCoord2.json()

    console.log(dataCoord2);

    nearbyTemp2.innerHTML = `${Math.round(dataCoord2.main.temp)} °C`
    nearbyCity2.innerHTML = `${dataCoord2.name}`
    nearbyDescription2.innerHTML = `${dataCoord2.weather[0].main}`



    changeBackgroundImage(data.weather[0].main)

    fiveDaysForecast(city)
}

const fc = document.querySelector("#forecast")
async function fiveDaysForecast(city) {
    const api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=metric&lang=uk`

    const response = await fetch(api)
    const data = await response.json()

    console.log(data);

    const days = {}

    data.list.forEach(element => {
        const date = element.dt_txt.split(' ')[0]

        const temp = element.main.temp
        
        if(!days[date])
        {
            days[date] = {
                min: temp,
                max: temp
            }
        }
        else {
            days[date].min = Math.min(days[date].min, temp)
            days[date].max = Math.max(days[date].max, temp)
        }
    });

    console.log(days);

    fc.innerHTML = ""
    for (const key in days) {
        fc.innerHTML += `<div class="day active"><p>${key}</p><span>${Math.round(days[key].max)}°C</span></div>`
    }
}


const body = document.querySelector("body")
function changeBackgroundImage(main) 
{
    if (main == "Clouds")
    {
        body.style.backgroundImage = `url("images/Cloudy.png")`
    }
    else if (main == "Rain")
    {
        body.style.backgroundImage = `url("images/Rain.png")`
    }
    else if (main == "Clear")
    {
        body.style.backgroundImage = `url("images/Sunny.png")`
    }
    else if (main == "Snow")
    {
        body.style.backgroundImage = `url("images/Snow.png")`
    }
    else if (main == "Thunderstorm")
    {
        body.style.backgroundImage = `url("images/Lighting.png")`
    }
}

sendRequest()