//Function to convert fahrenheit to celsius
const convertToC = (temp) => Math.round((temp - 32) / 1.8)

//Function to convert celsius to fahrenheit
const convertToF = (temp) => Math.round((temp * 1.8) + 32)

const apiKey = config.apiKey

$(document).ready(() => {
    testGeo = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude
            let lon = position.coords.longitude
            let queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then((data) => {
                console.log(data)
                $("#city").text(data.name + ", ")
                $("#country").text(data.sys.country)
                $("#temp").text(Math.round(data.main.temp) + String.fromCharCode(176))
                //$("#temp-scale").text(convertToC(data.main.temp))
                $("#temp-scale").text(" F")
                $("#condition").text(data.weather[0].main)
            })
        })
    }


    testGeo()
})