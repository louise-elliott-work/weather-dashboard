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

// * Code for the main search button - searching for a city when a user enters the city name in the search box.
// The user can enter the name of a city in the search box.
// When the user clicks on the search button
var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function(event) {
    event.preventDefault();

    // TODO Add here to clear data from previous city before adding new if needed - test to check

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

                        // Variables to use across multiple cards:
                        var heading;
                        var date;
                        var listItem;
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
        


        // For current day card, reference and assign the key information

            var cityName = data.city.name;
            console.log(data.city.name);
            cityNameHeading = document.getElementById("city-name");
            cityNameHeading.textContent = cityName
            
            var currentDate = dayjs().format("DD/MM/YYYY");
            currentDateHeading = document.getElementById("current-date");
            currentDateHeading.textContent = currentDate

                        // Array of weather data for forecast days:
                        var forecastArray = [];
                        forecastArray.push(data.list[0], data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]);
            
                        // For each item in the forecastArray, reference and assign the key information
                        for (var i = 0; i < forecastArray.length; i++) {
                            date = forecastArray[i].dt_txt;
                            iconCode = forecastArray[i].weather[0].icon;
                            iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                            tempK = forecastArray[i].main.temp;
                            tempC = Math.round(tempK-273.15);
                            wind = Math.round(forecastArray[i].wind.speed);
                            humidity = forecastArray[i].main.humidity;
                            console.log(date, iconCode, tempC, wind, humidity);

                            // For each forecast card, assign the corresponding key information

                            heading = document.querySelectorAll("#card-heading");
                            heading[i].textContent = date;

                            icon = document.querySelectorAll("#card-icon");
                            icon[i].setAttribute("src", iconURL);
                            
                            listItem = document.createElement("li");
                            tempText = document.createTextNode("Temp: " + tempC + " ºc");
                            listItem.append(tempText);
                            document.querySelectorAll("#card-list")[i].appendChild(listItem);

                            listItem = document.createElement("li");
                            windText = document.createTextNode("Wind: " + wind + " kph");
                            listItem.append(windText);
                            document.querySelectorAll("#card-list")[i].appendChild(listItem);
                            
                            listItem = document.createElement("li");
                            humidityText = document.createTextNode("Humidity: " + humidity + " %");
                            listItem.append(humidityText);
                            document.querySelectorAll("#card-list") [i].appendChild(listItem);

                        }

                    });
                });
});
