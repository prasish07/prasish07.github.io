const timeT1 = document.getElementById('time')
const dateT1 = document.getElementById('date')
const timeZone = document.getElementById('cityName')
const items = document.getElementById('weather_item')
const current_temp = document.getElementById('temp')
const type = document.getElementById('weatherType')
const today_condition = document.getElementById('current_temp')
const futureExtraWeather = document.getElementById('weather-forecast')




const days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']

const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const options = {weekdays:'long',year:'numeric', month:'long', day:'numeric'};
    const time = new Date();
    const date = time.toLocaleDateString(undefined,options)
    const hour = time.getHours();
    const day = time.getDay();
    const hoursIn12HrFormat = hour >= 13 ? hour %12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? "PM" : "AM"
    const second = time.getSeconds();
    

    timeT1.innerHTML = (hoursIn12HrFormat<10?'0'+hoursIn12HrFormat:hoursIn12HrFormat) + ':' + (minutes<10? '0' + minutes:minutes) +  ' ' + `<span id ="am-pm">${ampm}</span>`

    dateT1.innerHTML = days[day]  + ' ' + date;

}, 1000);
getDataWeather();

function getDataWeather(){
    navigator.geolocation.getCurrentPosition((success)=>{
        console.log(success);
        let {latitude,longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res=> res.json()).then(data =>{
        
        console.log(data)
        showWeatherData(data);
        })
    })
}

function showWeatherData(data){
    let {humidity,temp,pressure,wind_speed} = data.current;
    timeZone.innerHTML = data.timezone;
    items.innerHTML = 
    `
    <div class="info">
                <div class="items">
                    <div class="logoImg"><img src="/icons8-humidity-64.png" alt=""></div>
                    <div class="name">Humidity</div>
                </div>
                <div id="data1" class="data">${humidity}%</div>
            </div>
            <div class="info">
                <div class="items">
                    <div class="logoImg"><img src="/icons8-atmospheric-pressure-80.png" alt=""></div>
                    <div class="name">Air Pressure</div>
                </div>
                <div id="data2" class="data">${pressure} PS</div>
            </div>
            <div class="info">
                <div class="items">
                    <div class="logoImg"><img src="/icons8-rain-50.png" alt=""></div>
                    <div class="name">Change of Rain</div>
                </div>
                <div id="data3" class="data">0%</div>
            </div>
            <div class="info">
                <div class="items">
                    <div class="logoImg"><img src="/icons8-wind-64.png" alt=""></div>
                    <div class="name">Wind Speed</div>
                </div>
                <div id="data4" class="data">${wind_speed}Km/h</div>
            </div>
    `
    current_temp.innerHTML = `${temp}&#176 C`;
    type.innerHTML = data.current.weather[0].main;



let futureForecast = '';
    data.daily.forEach((day,idx)=>{
        if(idx ==0){
            today_condition.innerHTML=
            `
                <img src="/—Pngtree—cartoon style rain cloud_5675808.png" alt="weather icon" class="w-icon">
                <div class="other">
                    <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
                    <div class="temp">Night - ${day.temp.night}&#176; C</div>
                    <div class="temp">Day - ${day.temp.day}&#176; C</div>
                </div>
            `
        }
        else if (idx==7){
            futureForecast += ``;
        }
        else{
            futureForecast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
                <img src="/—Pngtree—cartoon style rain cloud_5675808.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>
            `
        }
    });
    futureExtraWeather.innerHTML = futureForecast;
}