const APIKEY = "35fb68b7709beb3e39a474e03949e3cd"

let api = `https://api.openweathermap.org/data/2.5/weather?q=Osaka&appid=${APIKEY}&units=metric&lang=uk`

const mainTemp = document.querySelector("#main-temp")
const mainHumidity = document.querySelector("#humidity")
const windSpeed = document.querySelector("#wind-speed")
const sunrise = document.querySelector("#sunrise")
const sunset = document.querySelector("#sunset")
const nearbyTemp = document.querySelector("#nearby-temp")
const nearbyCity = document.querySelector("#nearby-city")
const nearbyDescription = document.querySelector("#nearby-description")

async function sendRequest() {
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
}

sendRequest()