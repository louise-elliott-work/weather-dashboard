// * API for geocoding to convert a city name into latitude and longitude coordinates:
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=573d86dc171ce289692f18783224bf7c

// * API for 5-day weather forecast using latitude and longitude variables to identify city locations:
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=573d86dc171ce289692f18783224bf7c

// TODO Work out how to display the 5 place options as a drop-down list so the user can verify the location - testing at the moment using first option.
var limit = 5;

// * For tests using city name of Bath (UK):
// ! Check which of these need to be global
var stateCode = "";
var countryCode = "";
var searchInput = "";
var queryURLcity = "";


// * Code for the main search button - searching for a city when a user enters the city name in the search box.
// The user can enter the name of a city in the search box.
// When the user clicks on the search button
var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    // then the city name entered is captured and assigned to the variable searchInput
    searchInput = document.getElementById("search-input").value;

    // the data for the city name input by the user is accessed:
    queryURLcity = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "," + stateCode + "," + countryCode + "&limit=" + limit + "&appid=573d86dc171ce289692f18783224bf7c";

    // and then the latitude and longitude for the city are found and assigned to the variables lat and lon to give the JSON output for that city's 5-day weather forecast
        // * Fetch code:
            // * Reference the URL:
            fetch (queryURLcity)
                // * Get the boxed response:
                .then (function (response) {
                    // * Give the boxed response as an output.
                    return response.json();
                })
                // * Open the boxed response to get the data.
                .then (function (data) {
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    // * URL structure with latitude and longitude coordinate variables:
                    queryURLcoordinates = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=573d86dc171ce289692f18783224bf7c";
                    // * Fetch code:
                    // Reference the URL:
                    fetch (queryURLcoordinates)
                    // Get the boxed response:
                    .then (function (response) {
                        // Give the boxed response as an output.
                        return response.json();
                    // Open the boxed response to get the data.
                    }).then (function (data) {
                        console.log("city name = " + data.city.name);

                        // Access current day and next 5 days:
                        var day0 = data.list[0];
                        var day1 = data.list[8];
                        var day2 = data.list[15];
                        var day3 = data.list[23];
                        var day4 = data.list[31];
                        var day5 = data.list[39];

                        console.log(day0.dt_txt);
                        console.log("current weather icon = " + day0.weather[0].icon);
                        var tempK = day0.main.temp;
                        console.log("current temperature in kelvin = " + tempK);
                        var tempC = Math.round(tempK-273.15);
                        console.log("current temperature in degrees celsus = " + tempC);
                        console.log("current wind speed = " + Math.round(day0.wind.speed));
                        console.log("current humidity = " + day0.main.humidity);


                        var dateDay1 = day1.dt_txt;
                        console.log("day 1 date = " + dateDay1);
                        console.log("day 1 weather icon = " + day1.weather[0].icon);
                        var tempK = day1.main.temp;
                        var tempC = Math.round(tempK-273.15);
                        console.log("day 1 temperature = " + tempC);
                        console.log("day 1 wind speed = " + Math.round(day1.wind.speed));
                        console.log("day 1 humidity = " + day1.main.humidity);

                        var dateDay2 = day2.dt_txt;
                        console.log("day 2 date = " + dateDay2);
                        console.log("day 2 weather icon = " + day2.weather[0].icon);
                        var tempK = day2.main.temp;
                        var tempC = Math.round(tempK-273.15);
                        console.log("day 2 temperature = " + tempC);
                        console.log("day 2 wind speed = " + Math.round(day2.wind.speed));
                        console.log("day 2 humidity = " + day2.main.humidity);

                        var dateDay3 = day3.dt_txt;
                        console.log("day 3 date = " + dateDay3);
                        console.log("day 3 weather icon = " + day3.weather[0].icon);
                        var tempK = day3.main.temp;
                        var tempC = Math.round(tempK-273.15);
                        console.log("day 3 temperature = " + tempC);
                        console.log("day 3 wind speed = " + Math.round(day3.wind.speed));
                        console.log("day 3 humidity = " + day3.main.humidity);

                        var dateDay4 = day4.dt_txt;
                        console.log("day 4 date = " + dateDay4);
                        console.log("day 4 weather icon = " + day4.weather[0].icon);
                        var tempK = day4.main.temp;
                        var tempC = Math.round(tempK-273.15);
                        console.log("day 4 temperature = " + tempC);
                        console.log("day 4 wind speed = " + Math.round(day4.wind.speed));
                        console.log("day 4 humidity = " + day4.main.humidity);

                        var dateDay5 = day5.dt_txt;
                        console.log("day 5 date = " + dateDay5);
                        console.log("day 5 weather icon = " + day5.weather[0].icon);
                        var tempK = day5.main.temp;
                        var tempC = Math.round(tempK-273.15);
                        console.log("day 5 temperature = " + tempC);
                        console.log("day 5 wind speed = " + Math.round(day5.wind.speed));
                        console.log("day 5 humidity = " + day5.main.humidity);

                    });
                })
                ;
});


// TODO convert wind speed as it is in meters per second currently
// TODO check all units