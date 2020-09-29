// Global variables
let apiKey = config.apiKey;
let mainTemp = $("#temp");
let tempUnit = $("#temp-unit");
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
            // console.log(data)
            let currentDay = new Date(data.current.dt * 1000);
            $("#currentDay").text(getWeekDay(currentDay));


            mainTemp.text(Math.round(data.current.temp) + " " + String.fromCharCode(176));
            tempUnit.text(defaultUnit)
            $("#condition").text(data.current.weather[0].main);
            $("#icon").attr("src", src + data.current.weather[0].icon + ".png");

            for (let l = 1; l < data.daily.length; l++) {
                let overview = $("<div>");
                let forecastDay = $("<span>");
                let forecastIcon = $("<img>");
                let tempMax = $("<span>");
                let tempMin = $("<span>");

                overview.addClass("overview");
                forecastDay.attr("id", "forecastDay");
                forecastIcon.addClass("forecast-icon");
                tempMax.attr("id", "maxTemp");
                tempMin.attr("id", "minTemp");

                console.log(data.daily[l]);
                // console.log(data.daily[l].weather[0].icon);

                // let forecastDayText = forecastDay.text(new Date(data.daily[l].dt * 1000))[l];
                // getWeekDay(forecastDayText);
                let dayOfWeek = new Date(data.daily[l].dt * 1000);
                forecastDay.text(getWeekDay(dayOfWeek));
                forecastIcon.attr("src", src + data.daily[l].weather[0].icon + ".png");
                tempMax.text(Math.round(data.daily[l].temp.max) + " " + String.fromCharCode(176))[l];
                tempMin.text(Math.round(data.daily[l].temp.min) + " " + String.fromCharCode(176))[l];
                overview.append(forecastDay, forecastIcon, tempMax, tempMin);
                $(".section-forecast").append(overview)[l];

                //$(".forecast-icon").attr("src", src + data.daily[l].weather[0].icon + ".png");
            };

            // $(".day").append(getWeekDay(date));
            // $(".max").append(Math.round(data.daily[0].temp.max) + " " + String.fromCharCode(176))
            // $(".min").append(Math.round(data.daily[0].temp.min) + " " + String.fromCharCode(176))
            // $("#forecast-icon").attr("src", src + data.daily[0].weather[0].icon + ".png");

            // $("#city").text(data.name + ", ");
            // $("#country").text(data.sys.country);
            // mainTemp.text(Math.round(data.main.temp) + " " + String.fromCharCode(176));
            // tempUnit.text(defaultUnit);

            // //Click function that handles switching the displayed unit from fahrenheit to celsius and vice versa
            // tempUnit.click(() => {
            //     let currentTempUnit = tempUnit.text();
            //     let newTempUnit = currentTempUnit == "F" ? "C" : "F";

            //     tempUnit.text(newTempUnit);

            //     if (newTempUnit == "C") {
            //         mainTemp.text(convertToC(Math.round(data.main.temp)) + " " + String.fromCharCode(176));
            //     } else {
            //         mainTemp.text(Math.round(data.main.temp) + " " + String.fromCharCode(176));
            //     }
            // });
            // $("#condition").text(data.weather[0].main);
            // $("#icon").attr("src", src + data.weather[0].icon + ".png");

            // $(".day").append(getWeekDay(date));
            // $(".main").append(Math.round(data.list[0].main.temp) + " " + String.fromCharCode(176))
            // $("#forecast-icon").attr("src", src + data.list[0].weather[0].icon + ".png");
        });
    });
};

getWeather();