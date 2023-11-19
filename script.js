// * API for 5-day weather forecast using latitude and longitude variables to identify city locations:
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=573d86dc171ce289692f18783224bf7c

// * URL structure with latitude and longitude variables:
// Test using latitude and longitude for Bath, UK:
var lat = 2.3597;
var lon = 51.3781;
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=573d86dc171ce289692f18783224bf7c";

console.log(queryURL);

// * Fetch code:
// Reference the URL:
fetch (queryURL)
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