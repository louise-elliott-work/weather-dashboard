// * API for geocoding to convert a city name into latitude and longitude coordinates:
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=573d86dc171ce289692f18783224bf7c

// * API for 5-day weather forecast using latitude and longitude variables to identify city locations:
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=573d86dc171ce289692f18783224bf7c

// TODO Work out how to display the 5 place options as a drop-down list so the user can verify the location - testing at the moment using first option.
var limit = 5;

// TODO convert wind speed as it is in meters per second currently
// TODO check all units

// * For tests using city name of Bath (UK):
// ! Check which of these need to be global
var stateCode = "";
var countryCode = "";
var searchInput = "";
var queryURLcity = "";
var newButton;

// * Code for the main search button - searching for a city when a user enters the city name in the search box.
// The user can enter the name of a city in the search box.
// When the user clicks on the search button
var searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", runSearch);

function runSearch (event) {
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
                .then (function getResponse (response) {
                    // * Give the boxed response as an output.
                    return response.json();
                })
                // * Open the boxed response to get the data.
                .then (function getURL (data) {
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    // * URL structure with latitude and longitude coordinate variables:
                    queryURLcoordinates = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=573d86dc171ce289692f18783224bf7c";
                    // * Fetch code:
                    // Reference the URL:
                    fetch (queryURLcoordinates)
                    // Get the boxed response:
                    .then (function getResponse (response) {
                        // Give the boxed response as an output.
                        return response.json();
                    // Open the boxed response to get the data.
                    }).then (function getData (data) {

                        // Variables to use across multiple cards:
                        var heading;
                        var date;
                        var iconCode;
                        var iconURL;
                        var icon;
                        var tempK;
                        var tempC;
                        var tempText;
                        var wind;
                        var windText;
                        var humidity;
                        var humidityText;
        

        // For the current day card, reference and assign the key information

            var cityName = data.city.name;
            cityNameHeading = document.getElementById("city-name");
            cityNameHeading.textContent = cityName;
            
            var currentDate = dayjs().format("DD/MM/YYYY");
            currentDateHeading = document.getElementById("current-date");
            currentDateHeading.textContent = currentDate;

            var currentIconCode = data.list[0].weather[0].icon;
            currentIconURL = "http://openweathermap.org/img/w/" + currentIconCode + ".png";
            currentIcon = document.querySelector("#current-card-icon");
            currentIcon.setAttribute("src", currentIconURL);

            currentTempK = data.list[0].main.temp;
            currentTempC = Math.round(currentTempK-273.15);
            currentTempText = document.getElementById("current-temperature");
            currentTempText.textContent = "Temp: " + currentTempC + " ºc";

            currentWind = Math.round(data.list[0].wind.speed);
            currentWindText = document.getElementById("current-wind");
            currentWindText.textContent = "Wind: " + currentWind + " kph";

            currentHumidity = data.list[0].main.humidity;
            currentHumidityText = document.getElementById("current-humidity");
            currentHumidityText.textContent = "Humidity: " + currentHumidity + " %";

            // Store cityName in local storage.
            window.localStorage.setItem("cityName", cityName);

            // and clear the search box so the city name does not persist:
            document.getElementById("search-input").value = "";

            // Get cityName from local storage and
            var cityButton = localStorage.getItem("cityName");
                        
            // add cityName to history button underneath the main search box.
            var historyButton = document.querySelector("#city-history");
            const newButton = document.createElement('button');
            newButton.setAttribute("id", "history-button");
            newButton.textContent = cityButton;
            historyButton.appendChild(newButton);

            

                        // Array of weather data for forecast days:
                        var forecastArray = [];
                        forecastArray.push(data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]);

                        // For each forecast card, reference and assign the key information.
                        var forecastCards = document.querySelectorAll("#forecast-card");
                        for (var i = 0; i <= forecastCards.length; i++) {
                            date = dayjs().add((i+1), 'day').format("DD/MM/YYYY");
                            iconCode = forecastArray[i].weather[0].icon;
                            iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                            tempK = forecastArray[i].main.temp;
                            tempC = Math.round(tempK-273.15);
                            wind = Math.round(forecastArray[i].wind.speed);
                            humidity = forecastArray[i].main.humidity;

                            // For each of the five forecast cards, assign the corresponding key information.

                            heading = document.querySelectorAll("#card-heading");
                            heading[i].textContent = date;

                            icon = document.querySelectorAll("#card-icon");
                            icon[i].setAttribute("src", iconURL);

                            tempText = document.querySelectorAll("#temperature");
                            tempText[i].textContent = "Temp: " + tempC + " ºc";

                            windText = document.querySelectorAll("#wind");
                            windText[i].textContent = "Wind: " + wind + " kph";

                            humidityText = document.querySelectorAll("#humidity");
                            humidityText[i].textContent = "Humidity: " + humidity + " %";

                        }

                    });
                });
};