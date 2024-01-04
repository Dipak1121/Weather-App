const api_key = "839accec1f1270d4453bfbd8133dd7f3";
const inputSearch = document.getElementById("inputSearch");
const button = document.getElementById("addBtn");
const weatherDisplay = document.querySelector(".wether-display");
button.addEventListener("click", addCity);

const addedCity = [];
const addedCityWithTemp = [];
const allCards = [];

async function addCity(){
    const city = inputSearch.value;
    try{
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    const data = await response.json();
    if(addedCity.includes(data.name)){
        alert("City is alredy added");
        return;
    }
    
    const div = document.createElement("div");
    div.classList.add("weather-card");
//     div.innerHTML = `
//     <div class="weather-info">
//     <div class="info-1">
//     <p class="temp">${data.main.temp}°</p>
//     <p class="coords">H-${data.main.temp_max}°  L-${data.main.temp_min}°</p>
//     <p class="city">${data.name}, ${data.sys.country}</p>
// </div>
// <div class="info-2">
//     <img class="img" src="${data.weather[0].main}.png">
//     <p class="condition">${data.weather[0].main}</p>
// </div>
// </div>
// <div class="other-info">
// <div class="info-div">
// <p class="humidity">Humidity</p>
// <p>${data.main.humidity}%</p>
// </div>
// <div class="info-div">
//     <p class="pressure">Pressure</p>
//     <p>${data.main.pressure} Pa</p>
//     </div>
//     <div class="info-div">
//     <p class="wind-speed">Wind Speed</p>
//     <p>${data.wind.speed}kmph</p>
//     </div>
// </div>`;

    const weatherInfo = document.createElement("div");
    weatherInfo.classList.add("weather-info");

    const otherInfo = document.createElement("div");
    otherInfo.classList.add("other-info");

const info1 = document.createElement("div");
info1.classList.add("info-1");

const p1 = document.createElement("p");
p1.classList.add("temp")
p1.innerText = `${data.main.temp}°`;

const p2 = document.createElement("p");
p2.classList.add("coords");
p2.innerText = `H-${data.main.temp_max}°  L-${data.main.temp_min}°`;

const p3 = document.createElement("p");
p3.classList.add("city");
p3.innerText = `${data.name}, ${data.sys.country}`;

info1.appendChild(p1);
info1.appendChild(p2);
info1.appendChild(p3);

const info2 = document.createElement("div");
info2.classList.add("info-2");

const img = document.createElement("img");
img.classList.add("img");
if(data.weather[0].main == "Mist"){
    img.src = "Mist.png";
}
else if(data.weather[0].main == "Fog"){
    img.src = "fog.png";
}
else if(data.weather[0].main == "Rain"){
    img.src = "rain.png";
}
else if(data.weather[0].main == "Clouds"){
    img.src = "clouds.png";
}
else if(data.weather[0].main == "Haze"){
    img.src = "Haze.png";
}
else if(data.weather[0].main == "Smoke"){
    img.src = "smoke.png";
}
else if(data.weather[0].main == "Snow"){
    img.src = "snow.png";
}
else if(data.weather[0].main == "Drizzle"){
    img.src = "drizzle.png";
}
else{
    img.src = "Clear.png";
}


const p4 = document.createElement("p");
p4.classList.add("condition");
p4.innerText = `${data.weather[0].main}`;

info2.appendChild(img);
info2.appendChild(p4);

weatherInfo.appendChild(info1);
weatherInfo.appendChild(info2);

otherInfo.innerHTML = `
    <div class="info-div">
        <p class="humidity">Humidity</p>
        <p>${data.main.humidity}%</p>
    </div>
    <div class="info-div">
        <p class="pressure">Pressure</p>
        <p>${data.main.pressure} Pa</p>
    </div>
    <div class="info-div">
        <p class="wind-speed">Wind Speed</p>
        <p>${data.wind.speed}kmph</p>
    </div>`;

div.appendChild(weatherInfo);
div.appendChild(otherInfo);

    addedCity.push(data.name);
    addedCityWithTemp.push([div, data.main.temp]);
    console.log(typeof data.main.temp)
    sortAndAddCard(addedCityWithTemp);

    }
    catch(error){
        alert("Please check city name");
        console.log(error);
    }
    
inputSearch.value = "";
}

function sortAndAddCard(addedCityWithTemp){
    while(weatherDisplay.firstChild){
        weatherDisplay.removeChild(weatherDisplay.firstChild);
    }
    addedCityWithTemp.sort((a,b)=>{
        return a[1]-b[1];
    });
    for ( let i = 0; i < addedCityWithTemp.length; i++ ){
        weatherDisplay.appendChild(addedCityWithTemp[i][0]);
    }
}


