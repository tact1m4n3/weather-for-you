const API_URL = "http://5.2.255.164:25566/";

const form = document.querySelector(".weather-form");
const cityNameInput = document.querySelector("#name")
const loadingElement = document.querySelector(".loading");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

loadingElement.style.display = "none";
cityNameInput.value = "";

form.addEventListener('submit', (event) => {
    event.preventDefault();

    weatherElement.innerHTML = "";
    loadingElement.style.display = "";

    formData = new FormData(form);
    city_name = formData.get("name");
    if (city_name.trim() == "") {
        loadingElement.style.display = "none";
        return;
    } 

    fetch(`${API_URL}?city_name=${city_name}`)
        .then(response => response.json())
        .then(data => {
            const temp = data.temp;
            const pressure = data.pressure;
            const humidity = data.humidity;
            
            const nameObj = document.createElement("h3");
            const tempObj = document.createElement("p");
            const pressureObj = document.createElement("p");
            const humidityObj = document.createElement("p");
            
            nameObj.textContent = "Data for: " + city_name;
            tempObj.textContent = "Temperature (in `C): " + temp;
            pressureObj.textContent = "Pressure (in hPa unit): " + pressure;
            humidityObj.textContent = "Humidity: " + humidity + "%";

            weatherElement.appendChild(nameObj);
            weatherElement.appendChild(tempObj);
            weatherElement.appendChild(pressureObj);
            weatherElement.appendChild(humidityObj);

            cityNameInput.value = "";
            loadingElement.style.display = "none";
        });
});
