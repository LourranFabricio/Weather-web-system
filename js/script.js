const apiKey = '546557f7880e7d27f3ce7c3b8655e5f6';
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const input = document.getElementById('input');
const btn = document.getElementById('btn-city');

const background = document.querySelector('.background-image');
const cityTitle = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const span_humidity = document.getElementById('span-humidity');
const span_wind = document.getElementById('span-wind');
const weatherIcon = document.getElementById('weather-icon');

async function getData(city){
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    try{
        const getWeatherData = await fetch(apiWeatherURL);
        const dataJSON = await getWeatherData.json();
        if(dataJSON?.cod && dataJSON.cod === '404'){
            return alert('Local não encontrado')
        }
        else{
            loadData(dataJSON);
        }
    }
    catch (error){
        alert(error);
    }
}

btn.addEventListener('click', e=>{
    e.preventDefault();
    if(input.value == '') alert('Enter the name of a city');
    const city = input.value;
    clearInput();
    getData(city);
})

function loadData(dataJSON){
    cityTitle.innerHTML = `${dataJSON.name}, ${dataJSON.sys.country}`
    temperature.innerHTML = `${Math.floor(dataJSON.main.temp)}°C`
    temperature.classList.add('temperature-number');
    span_humidity.innerHTML = `${dataJSON.main.humidity}%`
    span_wind.innerHTML = `${dataJSON.wind.speed} km/h`
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${dataJSON.weather[0].icon}.png`);
    weatherIcon.classList.add('weather-icon-change');
    background.classList.remove('background-image');
    document.body.style.backgroundImage = `url("${apiUnsplash + dataJSON.name}")`;
    document.body.classList.add('background-image-properties');
}

function clearInput(){
    input.value = '';
}