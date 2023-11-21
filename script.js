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

                        var cityName = data.city.name;

                        // Access current day and next 5 days:
                        var day0 = data.list[0];
                        var day1 = data.list[7];
                        var day2 = data.list[15];
                        var day3 = data.list[23];
                        var day4 = data.list[31];
                        var day5 = data.list[39];

                        // Variables for all days:
                        var date;
                        var listItem;
                        var icon;
                        var iconCode;
                        var iconURL;
                        var tempK;
                        var tempC;
                        var tempText;
                        var wind;
                        var windText;
                        var humidity;
                        var humidityText;

                        var cardDay0Heading = document.getElementById("card-day0-heading");
                        cardDay0Heading.textContent = cityName + " (" + dayjs().format("DD/MM/YYYY") + ") ";

                        icon = document.getElementById("card-day0-icon");
                        iconCode = day0.weather[0].icon;
                        iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                        icon.setAttribute("src", iconURL);

                        tempK = day0.main.temp;
                        tempC = Math.round(tempK-273.15);
                        listItem = document.createElement("li");
                        tempText = document.createTextNode("Temp: " + tempC + "ºc");
                        listItem.append(tempText);
                        document.getElementById("card-day0-list").appendChild(listItem);

                        wind = Math.round(day0.wind.speed);
                        listItem = document.createElement("li");
                        windText = document.createTextNode("Wind: " + wind + "kph");
                        listItem.append(windText);
                        document.getElementById("card-day0-list").appendChild(listItem);

                        humidity = day0.main.humidity;
                        listItem = document.createElement("li");
                        humidityText = document.createTextNode("Humidity: " + humidity + "%");
                        listItem.append(humidityText);
                        document.getElementById("card-day0-list").appendChild(listItem);


                        date = day1.dt_txt;
                        tempK = day1.main.temp;
                        tempC = Math.round(tempK-273.15);
                        wind = Math.round(day1.wind.speed);
                        humidity = day1.main.humidity;

                        var cardDay1Heading = document.getElementById("card-day1-heading");
                        cardDay1Heading.textContent = date;
                        
                        icon = document.getElementById("card-day1-icon");
                        iconCode = day1.weather[0].icon;
                        iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                        icon.setAttribute("src", iconURL);

                        listItem = document.createElement("li");
                        tempText = document.createTextNode("Temp: " + tempC + "ºc");
                        listItem.append(tempText);
                        document.getElementById("card-day1-list").appendChild(listItem);

                        listItem = document.createElement("li");
                        windText = document.createTextNode("Wind: " + wind + "kph");
                        listItem.append(windText);
                        document.getElementById("card-day1-list").appendChild(listItem);

                        listItem = document.createElement("li");
                        humidityText = document.createTextNode("Humidity: " + humidity + "%");
                        listItem.append(humidityText);
                        document.getElementById("card-day1-list").appendChild(listItem);

                        
                        date = day2.dt_txt;
                        tempK = day2.main.temp;
                        tempC = Math.round(tempK-273.15);
                        wind = Math.round(day2.wind.speed);
                        humidity = day2.main.humidity;

                        var cardDay2Heading = document.getElementById("card-day2-heading");
                        cardDay2Heading.textContent = date;

                        icon = document.getElementById("card-day2-icon");
                        iconCode = day2.weather[0].icon;
                        iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                        icon.setAttribute("src", iconURL);

                        listItem = document.createElement("li");
                        tempText = document.createTextNode("Temp: " + tempC + "ºc");
                        listItem.append(tempText);
                        document.getElementById("card-day2-list").appendChild(listItem);

                        listItem = document.createElement("li");
                        windText = document.createTextNode("Wind: " + wind + "kph");
                        listItem.append(windText);
                        document.getElementById("card-day2-list").appendChild(listItem);

                        listItem = document.createElement("li");
                        humidityText = document.createTextNode("Humidity: " + humidity + "%");
                        listItem.append(humidityText);
                        document.getElementById("card-day2-list").appendChild(listItem);


                        date = day3.dt_txt;
                        tempK = day3.main.temp;
                        tempC = Math.round(tempK-273.15);
                        wind = Math.round(day3.wind.speed);
                        humidity = day3.main.humidity;

                        var cardDay3Heading = document.getElementById("card-day3-heading");
                        cardDay3Heading.textContent = date;

                        icon = document.getElementById("card-day3-icon");
                        iconCode = day3.weather[0].icon;
                        iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                        icon.setAttribute("src", iconURL);

                        listItem = document.createElement("li");
                        tempText = document.createTextNode("Temp: " + tempC + "ºc");
                        listItem.append(tempText);
                        document.getElementById("card-day3-list").appendChild(listItem);

                        listItem = document.createElement("li");
                        windText = document.createTextNode("Wind: " + wind + "kph");
                        listItem.append(windText);
                        document.getElementById("card-day3-list").appendChild(listItem);

                        var listItem = document.createElement("li");
                        var humidityText = document.createTextNode("Humidity: " + humidity + "%");
                        listItem.append(humidityText);
                        document.getElementById("card-day3-list").appendChild(listItem);


                        date = day4.dt_txt;
                        tempK = day4.main.temp;
                        tempC = Math.round(tempK-273.15);
                        wind = Math.round(day4.wind.speed);
                        humidity = day4.main.humidity;

                        var cardDay4Heading = document.getElementById("card-day4-heading");
                        cardDay4Heading.textContent = date;

                        icon = document.getElementById("card-day4-icon");
                        iconCode = day4.weather[0].icon;
                        iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                        icon.setAttribute("src", iconURL);

                        listItem = document.createElement("li");
                        tempText = document.createTextNode("Temp: " + tempC + "ºc");
                        listItem.append(tempText);
                        document.getElementById("card-day4-list").appendChild(listItem);

                        listItem = document.createElement("li");
                        windText = document.createTextNode("Wind: " + wind + "kph");
                        listItem.append(windText);
                        document.getElementById("card-day4-list").appendChild(listItem);

                        listItem = document.createElement("li");
                        humidityText = document.createTextNode("Humidity: " + humidity + "%");
                        listItem.append(humidityText);
                        document.getElementById("card-day4-list").appendChild(listItem);



                        date = day5.dt_txt;
                        tempK = day5.main.temp;
                        tempC = Math.round(tempK-273.15);
                        wind = Math.round(day5.wind.speed);
                        humidity = day5.main.humidity;

                        var cardDay5Heading = document.getElementById("card-day5-heading");
                        cardDay5Heading.textContent = date;

                        icon = document.getElementById("card-day5-icon");
                        iconCode = day5.weather[0].icon;
                        iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                        icon.setAttribute("src", iconURL);

                        listItem = document.createElement("li");
                        tempText = document.createTextNode("Temp: " + tempC + "ºc");
                        listItem.append(tempText);
                        document.getElementById("card-day5-list").appendChild(listItem);

                        listItem = document.createElement("li");
                        windText = document.createTextNode("Wind: " + wind + "kph");
                        listItem.append(windText);
                        document.getElementById("card-day5-list").appendChild(listItem);

                        listItem = document.createElement("li");
                        humidityText = document.createTextNode("Humidity: " + humidity + "%");
                        listItem.append(humidityText);
                        document.getElementById("card-day5-list").appendChild(listItem);



                    });
                })
                ;
});


// TODO convert wind speed as it is in meters per second currently
// TODO check all units