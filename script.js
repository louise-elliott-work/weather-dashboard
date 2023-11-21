// * API for geocoding to convert a city name into latitude and longitude coordinates:
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=573d86dc171ce289692f18783224bf7c

// * API for 5-day weather forecast using latitude and longitude variables to identify city locations:
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=573d86dc171ce289692f18783224bf7c

// * For tests using city name of Bath (UK):
var cityName = "Bath";
var stateCode = "";
var countryCode = "";

// TODO Work out how to display the 5 place options as a drop-down list so the user can verify the location - testing at the moment using first option.
// Limit the number of possible results with the same name to 5;
var limit = 5;
var queryURLcity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateCode + "," + countryCode + "&limit=" + limit + "&appid=573d86dc171ce289692f18783224bf7c";
console.log("Test query using cityName of 'Bath' = " + queryURLcity);

// * Code for the main search button - searching for a city when a user enters the city name in the search box.
// The user can enter the name of a city in the search box.
// When the user clicks on the search button
var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", handleSearch());
// then the handleSearch function is run
function handleSearch() {
    // ! When the user enters a city name into the search box and clicks search, I want to capture that value and store is in the variable searchInput.
    var searchInput = document.getElementById("search-input").value;
    console.log("Search button clicked");
    console.log(searchInput);
};

// and then the latitude and longitude for the city are found and assigned to the variables lat and lon to give the JSON output for that city's weather forecast.
    // * Fetch code:
        // * Reference the URL:
        fetch (queryURLcity)
            // * Get the boxed response:
            .then (function (response) {
                // * Give the boxed response as an output.
                console.log(response);
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
                    console.log(response);
                    return response.json();
                // Open the boxed response to get the data.
                }).then (function (data) {
                    console.log(data);
                });
            })
        ;
