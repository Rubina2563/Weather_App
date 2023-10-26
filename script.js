const searchButton=document.querySelector('.search-btn');
const cityInput=document.querySelector('.cityInput');
const API_KEY="f8b10b34244db9f1f0ae88294de5d193";
const weatherCardDiv=document.querySelector('.weather-cards');


//Function for writing vallues in weather card
const createWeatherCard=(weatherItem)=>{
    return `<li class="cards">
    <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="icon1">
    <h4>Temp:${(weatherItem.main.temp-273.15).toFixed(2)} C</h4>
    <h4>Humidity:${weatherItem.main.humidity} %</h4>
    <h4>Wind:${weatherItem.wind.speed} M/S</h4></li>`;
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
        
        console.log(fiveDaysForcast);
        
        
        fiveDaysForcast.forEach((weatherItem)=>{
            console.log('a'); 
         weatherCardDiv.insertAdjacentHTML("beforeend",createWeatherCard(weatherItem));
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



//On click 
searchButton.addEventListener('click',getCityCoordinates);