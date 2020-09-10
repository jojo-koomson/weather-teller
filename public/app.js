// Api declaartion anf initialization from openweathermap

const api ={
    key: "73d87bcf35bd8fc9aeaf65e51a72433d",
    base: "https://api.openweathermap.org/data/2.5/"
};


let searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

let weather;

function setQuery(event){
    if(event.keyCode === 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather){
    // console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText =`${weather.name}, ${weather.sys.country}`;

    let today = new Date();
    let date =document.querySelector('.location .date');
    date.innerText = dateBuilder(today);

    let temp  = document.querySelector('.current .temp');
    temp.innerHTML =`${Math.round(weather.main.temp).toFixed(0)}<span>°c</span>`;

    let weather_element = document.querySelector('.current .weather');
    weather_element.innerText = weather.weather[0].description;

    let iconWeather =document.querySelector('.current .icons');
    iconWeather.innerText = weather.icon[0].icon;

    let tempRange = document.querySelector('.hi-lo');
    tempRange.innerText =`${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
    
}

function dateBuilder(dData){
    let months=["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day =days[dData.getDay()];
    let date = dData.getDate();
    let month = months[dData.getMonth()];
    let year =dData.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

