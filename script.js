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
    });

