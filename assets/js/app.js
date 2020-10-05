// Global variables
let apiKey = config.apiKey;
let mainTemp = $("#temp");
let temperatureUnit = $("#temperatureUnit");
let defaultUnit = "F";
let src = "http://openweathermap.org/img/w/";

// Convert fahrenheit to celsius
const convertToC = (temp) => Math.round((temp - 32) / 1.8);

// Convert celsius to fahrenheit
const convertToF = (temp) => Math.round((temp * 1.8) + 32);

// Display only the day of the week, using the traditional three letters
const getWeekDay = (date) => {
    let weekdays = new Array(
        "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"
    );

    let day = date.getDay();

    return weekdays[day];
};

const getWeather = () => {
    // Used to pinpoint current location on device, will ask for permission first
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude; //Get latitude coordinates and store in variable
        let lon = position.coords.longitude; //Get longitude coordinates and store in variable

        // For the queryURL, we had to set the default unit to fahrenheit(imperial)
        // The default unit is kelvin when first making the request
        let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then((data) => {
            // To get the results, we pass in data as a parameter
            //  console.log(data)
            let currentDay = new Date(data.current.dt * 1000);
            $("#currentDay").text(getWeekDay(currentDay));


            // mainTemp.text(Math.round(data.current.temp) + " " + String.fromCharCode(176));
            $("#currentTemp").text(Math.round(data.current.temp) + " " + String.fromCharCode(176));
            temperatureUnit.text(defaultUnit);
            $("#condition").text(data.current.weather[0].main);
            $("#currentIcon").attr("src", src + data.current.weather[0].icon + ".png");
            $(".current-block").css()

            for (let l = 1; l < data.daily.length; l++) {
                let forecastOverview = $("<span>");
                let forecastDay = $("<span>");
                let forecastIcon = $("<img>");
                let tempMax = $("<span>");
                let tempMin = $("<span>");

                forecastDay.attr("id", "forecastDay");
                forecastIcon.attr("id", "forecastIcon");
                tempMax.attr("id", "tempMax");
                tempMin.attr("id", "tempMin");
                
                let dayOfWeek = new Date(data.daily[l].dt * 1000);
                forecastDay.text(getWeekDay(dayOfWeek));
                forecastIcon.attr("src", src + data.daily[l].weather[0].icon + ".png");
                tempMax.text(Math.round(data.daily[l].temp.max) + " " + String.fromCharCode(176))[l];
                tempMin.text(Math.round(data.daily[l].temp.min) + " " + String.fromCharCode(176))[l];
                forecastOverview.append(forecastDay, forecastIcon, tempMax, tempMin);
                $(".section-forecast").append(forecastOverview);
            };

            // Function that handles switching the displayed unit from fahrenheit to celsius and vice versa
            
            // temperatureUnit.click(() => {
            //     let currentTemperatureUnit = temperatureUnit.text();
            //     let newTemperatureUnit = currentTemperatureUnit == "F" ? "C" : "F";

            //     temperatureUnit.text(newTemperatureUnit);

            //     if (newTemperatureUnit == "C") {
            //         temperatureUnit.text(convertToC(Math.round(data.current.temp)) + " " + String.fromCharCode(176));
            //     } else {
            //         temperatureUnit.text(Math.round(data.current.temp) + " " + String.fromCharCode(176));
            //     }
            // });
        });
    });
};

getWeather();