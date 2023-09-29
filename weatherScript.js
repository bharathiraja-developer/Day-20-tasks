let cityName = document.querySelector(".cityName");
let details = document.querySelector(".details");
let searchButton = document.querySelector(".searchButton");
let cityNamediv = document.createElement("div");

// detailsFetchCall function returns the data in JSON format.
function detailsFetchCall() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=37535e05ad275688e5f46c32751e7a40`
  )
    .then((response) => response.json())
    .catch((error) => console.log(`${error}`));
}

// Event listener for search button click
searchButton.addEventListener("click", () =>
  detailsFetchCall().then((data) => weather(data))
);

// Event listener for enter
cityName.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    detailsFetchCall().then((data) => weather(data));
  }
});

// function weather append the weather details in the page
function weather(data) {
  cityNamediv.innerHTML = ``;
  cityNamediv.setAttribute(
    "class",
    "classcenter mt-4 p-3 text-light fw-semibold"
  );
  cityNamediv.innerHTML = `<p>City name : <b>${cityName.value}</b></p>
                    <p>Weather Report</p>
                    <p>Temperature : ${data.main.temp} K</p>
                    <p>Maximum temperature : ${data.main.temp_max} K</p>
                    <p>Mainimum temperature : ${data.main.temp_min} K</p>
                    <p>Humidity : ${data.main.humidity} %</p>
                    <p>Pressure : ${data.main.pressure} hPa</p>
                    <p>Main : ${data.weather[0].main}</p>
                    <p>Description : ${data.weather[0].description}</p>`;
  details.append(cityNamediv);
  cityName.value = "";
}
