const timeT1 = document.getElementById('time')
const dateT1 = document.getElementById('date')
const timeZone = document.getElementById('cityName')
const items = document.getElementById('weather_item')
const current_temp = document.getElementById('temp')
const type = document.getElementById('weatherType')
const today_condition = document.getElementById('current_temp')
const futureExtraWeather = document.getElementById('weather-forecast')
const search =document.getElementById('search');
const inputField = search.querySelector('input');
const button = document.querySelector('button')




const days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']

const API = '6415e862b372e9b3bb106e469471b041';

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

button.addEventListener('click',()=>{
    requestAPI(inputField.value);
    inputField.value = "";
})

inputField.addEventListener("keyup",e =>{
    if(e.key == "Enter" && inputField.value !=""){
        requestAPI(inputField.value);
        inputField.value = "";
    }
})
function requestAPI(city){
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`).then(res=>res.json()).then(W_data =>{
        // console.log(W_data)
        timeZone.innerHTML = W_data.name;
        console.log(W_data)
        currentWeather(W_data);
        })
}
function currentWeather(info){
    let {lat, lon} = info.coord;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API}`).then(res=> res.json()).then(data =>{
        
        console.log(data)
        showWeatherData(data);
        })
    
}

getDataWeather();

function getDataWeather(){
    // navigator.geolocation.getCurrentPosition((success)=>{
    //     console.log(success);
        
    //     let {latitude,longitude} = success.coords;

    //     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API}`).then(res=> res.json()).then(data =>{
        
    //     console.log(data)
    //     showWeatherData(data);
    //     })
        
    // })
}

function showWeatherData(data){
    let {humidity,temp,pressure,wind_speed,clouds} = data.current;
    
    items.innerHTML = 
    `
    <div class="info">
                <div class="items">
                    <div class="logoImg"><img src="/logo/icons8-humidity-64.png" alt=""></div>
                    <div class="name">Humidity</div>
                    </div>
                <div id="data1" class="data">${humidity}%</div>
            </div>
            <div class="info">
                <div class="items">
                    <div class="logoImg"><img src="/logo/icons8-atmospheric-pressure-80.png" alt=""></div>
                    <div class="name">Air Pressure</div>
                </div>
                <div id="data2" class="data">${pressure} PS</div>
            </div>
            <div class="info">
                <div class="items">
                    <div class="logoImg"><img src="/logo/icons8-rain-50.png" alt=""></div>
                    <div class="name">cloudy</div>
                </div>
                <div id="data3" class="data">${clouds}%</div>
            </div>
            <div class="info">
                <div class="items">
                    <div class="logoImg"><img src="/logo/icons8-wind-64.png" alt=""></div>
                    <div class="name">Wind Speed</div>
                </div>
                <div id="data4" class="data">${wind_speed}Km/h</div>
            </div>
    `
    current_temp.innerHTML = `${temp}&#176 C`;
    type.innerHTML = data.current.weather[0].main;
    if (data.current.weather[0].main =='Clouds'){
        document.body.style.backgroundImage = "url('/weather_img/p4.jpg')";
    }
    else if (data.current.weather[0].main =='Rain'){
        document.body.style.backgroundImage = "url('/weather_img/p1.jpg')";
    }
    else if (data.current.weather[0].main =='Fog'){
        document.body.style.backgroundImage = "url('/weather_img/p6.jpg')";
    }
    else if (data.current.weather[0].main =='Clear'){
        document.body.style.backgroundImage = "url('/weather_img/p2.jpg')";
    }
    else if (data.current.weather[0].main =='Thunderstorm'){
        document.body.style.backgroundImage = "url('/weather_img/p5.jpg')";
    }
    else if (data.current.weather[0].main =='Haze'){
        document.body.style.backgroundImage = "url('/weather_img/p3.jpg')";
    }


    

let futureForecast = '';
    data.daily.forEach((day,idx)=>{
        if(idx ==0){
            today_condition.innerHTML=
            `
                <img src="/cloud_logo/p1.png" alt="weather icon" class="w-icon">
                <div class="other">
                    <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
                    <div class="temp">Max - ${day.temp.max}&#176; C</div>
                    <div class="temp">Min - ${day.temp.min}&#176; C</div>
                </div>
            `
        }
        else if (idx==7){
            futureForecast += ``;
        }
        else{
            futureForecast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="/cloud_logo/p1.png" alt="weather icon" class="w-icon">
                <div class="temp">Max - ${day.temp.max}&#176; C</div>
                <div class="temp">Min - ${day.temp.min}&#176; C</div>
            </div>
            `
        }
    });
    futureExtraWeather.innerHTML = futureForecast;
}


requestAPI("tikapur");