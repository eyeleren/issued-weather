let weather = {
  apiKey: "55349f08623c42477bc8de7344dd3661",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=it&appid=" + this.apiKey)
      .then((response) => {
        if (!response.ok) {
          alert("Errore, inserisci una città valida");
          throw new Error("Errore...");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".valdrakken").classList.add("hidden");
    document.querySelector(".city").innerText = "Meteo a " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Umidità: " + humidity + "%";
    document.querySelector(".wind").innerText = "Vento: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')";
  },
  // search: function () {
  //   this.fetchWeather(document.querySelector(".search-bar").value);
  // },
  search: function () {
    const searchTerm = document.querySelector(".search-bar").value.toLowerCase();

    // Check if the search term is empty
    if (searchTerm.trim() === "") {
      // Refresh the page if the search term is empty
      location.reload();
      return;
    }

    // Check if the search term is "valdrakken"
    if (searchTerm === "valdrakken") {
      // Display special message for Valdrakken without making the API call
      document.querySelector(".city").innerText = "Meteo di Valdrakken delle Isole Disperse";
      // document.querySelector(".icon").src = ""; // Set the icon source to an empty string or any default value
      document.querySelector(".description").innerText = "Notte serena";
      document.querySelector(".temp").innerText = "19°";
      document.querySelector(".humidity").innerText = "Consigliato rimanere lontani da Raszageth.";
      document.querySelector(".wind").innerText = "Vento adeguato al dragonriding!";
      document.querySelector(".weather").classList.remove("loading");
      document.querySelector(".valdrakken").classList.remove("hidden");
      return;
    }

    // If the search term is not "valdrakken", make the API call
    this.fetchWeather(searchTerm);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});
