const APIKEY = "35fb68b7709beb3e39a474e03949e3cd"

const mainTemp = document.querySelector("#main-temp")
const mainHumidity = document.querySelector("#humidity")
const windSpeed = document.querySelector("#wind-speed")
const sunrise = document.querySelector("#sunrise")
const sunset = document.querySelector("#sunset")
const nearbyTemp = document.querySelector("#nearby-temp")
const nearbyCity = document.querySelector("#nearby-city")
const nearbyDescription = document.querySelector("#nearby-description")
const searchInput = document.querySelector("#search-input")

async function sendRequest() {

    const city = searchInput.value
    
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=uk`

    const response = await fetch(api)
    const data = await response.json()

    console.log(data);

    mainTemp.innerHTML = `${Math.round(data.main.temp)} °C`
    mainHumidity.innerHTML = `${data.main.humidity} %`
    windSpeed.innerHTML = `${data.wind.speed} km/h`

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