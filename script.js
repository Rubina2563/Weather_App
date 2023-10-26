const searchButton=document.querySelector('.search-btn');
const cityInput=document.querySelector('.cityInput');
const API_KEY="f8b10b34244db9f1f0ae88294de5d193";


const getWeatherDetails=(name, lat, lon)=>{
    const WEATHER_API_URL=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(res=>res.json()).then(data=>{
        console.log(data);
    })..catch(()=>{alert("An error occured while fetching the weather forecast")});

}

//gives city coordinates like name , longitude , latitude
const getCityCoordinates=()=>{
const cityName = cityInput.value.trim();

if (!cityName) return;

const GEOCODING_API_URL=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

fetch(GEOCODING_API_URL).then(resp=>resp.json()).then(data=>{
   if (!data.length) return alert(`No coordinates found for ${cityName}`);
const { name, lat, lon} = data[0];

getWeatherDetails(name, lat, lon);

}).catch(()=>{alert("An error occured while fetching the content")})
}



//On click 
searchButton.addEventListener('click',getCityCoordinates);