// * API for geocoding to convert a city name into latitude and longitude coordinates:
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=573d86dc171ce289692f18783224bf7c

// * URL structure with ... variables:
// Test using city name of Bath (UK):
var cityName = "Bath";
var stateCode = "";
var countryCode = "";
// Limit the number of possible results with the same name to 5;
var limit = 5;
var queryURLcity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateCode + "," + countryCode + "&limit=" + limit + "&appid=573d86dc171ce289692f18783224bf7c";

console.log(queryURLcity);

// Global variable so the value can be referenced outside of function.
var queryURLcoordinates = "";
var lat;
var lon;






// * Fetch code:
// Reference the URL:
fetch (queryURLcity)
    // Get the boxed response:
    .then (function (response) {
        // Give the boxed response as an output.
        console.log(response);
        return response.json();
    })
    // Open the boxed response to get the data.
    .then (function (data) {
        console.log(data);
        console.log(data[0]);
        console.log(data[0].lat, data[0].lon);
        var cityLat = data[0].lat;
        console.log(cityLat);
        var cityLon = data[0].lon;
        console.log(cityLon);
        console.log(cityLat,cityLon);
    })
    .then (function (queryURLcoordinates) {
        // ! Work out how to reference cityLat and cityLon to insert into URL.
        console.log(queryURLcoordinates);
    });



    // ! Work out how to display the 5 place options as a drop-down list so the user can verify the location - testing at the moment using first option.

// * API for 5-day weather forecast using latitude and longitude variables to identify city locations:
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=573d86dc171ce289692f18783224bf7c

// * URL structure with latitude and longitude coordinate variables:
// Test using latitude and longitude for Bath, UK:
lat = 2.3597;
lon = 51.3781;
queryURLcoordinates = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=573d86dc171ce289692f18783224bf7c";

console.log(queryURLcoordinates);

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

// * Code for main search button - searching for a city when a user enters the city name in the search box.
// HTML element: <button type="submit" class="btn search-button" id="search-button">

// The user can already enter the name of a city in the search box.
// When the user clicks on the search button
var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", handleSearch);
function handleSearch() {
    console.log("Search button clicked");
}
// Then the latitude and longitude of the city are found

// And assigned to the variables lat and lon

// To give the JSON output for that city's weather forecast.
