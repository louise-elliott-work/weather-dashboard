// * Global variable declared for search input which is used in multiple functions.
var searchInput;

// * The user can enter the name of a city in the search box and when the user clicks on the search button, the search is initiated.
var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", processSearchRequest);

function processSearchRequest () {
    // * The city name entered is captured and assigned to the variable searchInput.
    searchInput = document.getElementById("search-input").value;
    // * The cityName is added as a history button underneath the main search box and localStorage is used so buttons persist when the page is refreshed.
    var historyButton = document.querySelector("#city-history");
    var newButton = document.createElement("button");
    newButton.setAttribute("class", "search-input");
    newButton.setAttribute("id", "history-button");
    
    var storedCity = document.getElementById("search-input").value;
    localStorage.setItem("citySearch", storedCity);
    newButton.textContent = localStorage.getItem("citySearch");

    historyButton.appendChild(newButton);
    historyButton.addEventListener("click", processHistorySearchRequest);
    // * Then the search is done for the data to be displayed.
    runSearch ();
}

// * When the user clicks on a search history button, the search is re-initiated for that cityName.
function processHistorySearchRequest (clickedButton) {
    // * The button value is assigned as the search request value.
    searchInput = clickedButton.target.innerHTML;
    console.log(searchInput);
    // * Then the search is done for the data to be displayed.
    runSearch ();
};

function runSearch () {
    // * The data for the city name input by the user is accessed to produce the URL to use.
    var stateCode = "";
    var countryCode = "";
    var limit = "";
    var queryURLcity = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "," + stateCode + "," + countryCode + "&limit=" + limit + "&appid=573d86dc171ce289692f18783224bf7c";

    // * Then the latitude and longitude for the city are found and assigned to the variables lat and lon to give the JSON output for that city's current weather and a 5-day weather forecast.
            fetch (queryURLcity)
                .then (function getResponse (response) {
                    return response.json();
                })
                .then (function getURL (data) {
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    queryURLcoordinates = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=573d86dc171ce289692f18783224bf7c";
                    fetch (queryURLcoordinates)
                    .then (function getResponse (response) {
                        return response.json();
                    }).then (function getData (data) {

                        // * For the current day card, the key information is referenced and assigned.

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

                        // * The search box is cleared so the city name does not persist.
                        document.getElementById("search-input").value = "";

                        // * The weather data for the 5-day forecast is added to an array.
                        var forecastArray = [];
                        forecastArray.push(data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]);

                        // * For each forecast card, the key information is referenced and assigned.

                        var forecastCards = document.querySelectorAll("#forecast-card");
                        
                        for (var i = 0; i <= forecastCards.length; i++) {

                            forecastDate = dayjs().add((i+1), 'day').format("DD/MM/YYYY");
                            forecastDateHeading = document.querySelectorAll("#card-heading");
                            forecastDateHeading[i].textContent = forecastDate;

                            forecastIconCode = forecastArray[i].weather[0].icon;
                            forecastIconURL = "http://openweathermap.org/img/w/" + forecastIconCode + ".png";
                            forecastIcon = document.querySelectorAll("#card-icon");
                            forecastIcon[i].setAttribute("src", forecastIconURL);

                            forecastTempK = forecastArray[i].main.temp;
                            forecastTempC = Math.round(forecastTempK-273.15);
                            forecastTempText = document.querySelectorAll("#temperature");
                            forecastTempText[i].textContent = "Temp: " + forecastTempC + " ºc";

                            forecastWind = Math.round(forecastArray[i].wind.speed);
                            forecastWindText = document.querySelectorAll("#wind");
                            forecastWindText[i].textContent = "Wind: " + forecastWind + " kph";

                            forecastHumidity = forecastArray[i].main.humidity;
                            forecastHumidityText = document.querySelectorAll("#humidity");
                            forecastHumidityText[i].textContent = "Humidity: " + forecastHumidity + " %";

                        }
                    });
                });
};
