const searchButton=document.querySelector('.search-btn');
const cityInput=document.querySelector('.cityInput');
const API_KEY="f8b10b34244db9f1f0ae88294de5d193";
const weatherCardDiv=document.querySelector('.weather-cards');
const currentCardDiv=document.querySelector('.current-weather');
const locationButton=document.querySelector('.location-btn');


//Function for writing vallues in weather card
const createWeatherCard=(cityName ,weatherItem, index)=>{
if(index===0){
    return `<div class="details">
    <h2>${cityName} ${weatherItem.dt_txt.split(" ")[0]}</h2>
    <h4>Temperature:${(weatherItem.main.temp-273.15).toFixed(2)} C</h4>
    <h4>Humidity:${weatherItem.main.humidity} %</h4>
    <h4>Wind:${weatherItem.wind.speed} M/S</h4></li>;
</div>

<div class="icon">
    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="rainy day icon">
     <h4>${weatherItem.weather[0].description}</h4>
</div>`;
}else{

    return `<li class="cards">
    <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="icon1">
    <h4>Temp:${(weatherItem.main.temp-273.15).toFixed(2)} C</h4>
    <h4>Humidity:${weatherItem.main.humidity} %</h4>
    <h4>Wind:${weatherItem.wind.speed} M/S</h4></li>`;
}

}

//Function giving 6 days forecast
const getWeatherDetails=(cityName, lat, lon)=>{
    const WEATHER_API_URL=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(res=>res.json()).then(data=>{
        console.log(data);

        const uniqueForcastsDays=[];

        const fiveDaysForcast = data.list.filter((forcast)=>{
            const forcastDate=new Date(forcast.dt_txt).getDate();

            if(!uniqueForcastsDays.includes(forcastDate)){
                return uniqueForcastsDays.push(forcastDate);
            }

        });

        //clearing html data 
        cityInput.value="";
        weatherCardDiv.innerHTML="";
        currentCardDiv.innerHTML="";

        console.log(fiveDaysForcast);
        
        
        fiveDaysForcast.forEach((weatherItem ,index)=>{
            if(index===0){
                currentCardDiv.insertAdjacentHTML("beforeend",createWeatherCard(cityName ,weatherItem, index));
            }else{
                weatherCardDiv.insertAdjacentHTML("beforeend",createWeatherCard(cityName ,weatherItem, index));  
            }
         
        }
        )

    }).catch(()=>{alert("An error occured while fetching the weather forecast")});

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

//Function for using current location
const useCurrentCoordinates=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        const { longitude , latitude}=position.coords;

        //below link gives cityname with longitude and lagitude
        const REVERSE_GEOCODING_URL=`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

       
       
       
        fetch(REVERSE_GEOCODING_URL).then(resp=>resp.json()).then(data=>{
            
         const { name, lat, lon} = data[0];
         
         getWeatherDetails(name, latitude, longitude);
         
         }).catch(()=>{alert("An error occured while fetching the content")})
    
    }),(error)=>{
        if(error.code === error.PERMISSION_DENIED){
            alert("geolocation permission denied , please set location permission to grant access");
        }
    }}

//On clicks 
searchButton.addEventListener('click',getCityCoordinates);
locationButton.addEventListener('click',useCurrentCoordinates);