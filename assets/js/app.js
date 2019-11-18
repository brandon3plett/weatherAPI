//Function to convert fahrenheit to celsius
const convertToC = (temp) => Math.round((temp - 32) / 1.8);

//Function to convert celsius to fahrenheit
const convertToF = (temp) => Math.round((temp * 1.8) + 32);

const apiKey = config.apiKey;

$(document).ready(() => {
    let mainTemp = $("#temp");
    let tempUnit = $("#temp-unit");
    let defaultUnit = "F";
    let src = "http://openweathermap.org/img/w/";

    currentWeather = (() => {
        //Used to pinpoint current location on device, will ask for permission first
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude; //Get latitude coordinates and store in variable
            let lon = position.coords.longitude; //Get longitude coordinates and store in variable

            //For the queryURL, we had to set the default unit to fahrenheit(imperial)
            //The default unit is kelvin when first making the request
            let queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
            
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then((data) => {
                //To get the results, we pass in data as a parameter
                //console.log(data)
                $("#city").text(data.name + ", ");
                $("#country").text(data.sys.country);
                mainTemp.text(Math.round(data.main.temp) + " " + String.fromCharCode(176));
                tempUnit.text(defaultUnit);

                //Click function that handles switching the displayed unit from fahrenheit to celsius and vice versa
                tempUnit.click(() => {
                    let currentTempUnit = tempUnit.text();
                    let newTempUnit = currentTempUnit == "F" ? "C" : "F";

                    tempUnit.text(newTempUnit);

                    if (newTempUnit == "C") {
                        mainTemp.text(convertToC(Math.round(data.main.temp)) + " " + String.fromCharCode(176));
                    } else {
                        mainTemp.text(Math.round(data.main.temp) + " " + String.fromCharCode(176));
                    }
                });
                $("#condition").text(data.weather[0].main);
                $("#icon").attr("src", src + data.weather[0].icon + ".png");
            });
        });
    });
    currentWeather();
});