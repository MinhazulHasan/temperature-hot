const api = {
    key: "fbf9967b7898810d1c2d9bec7fed35c3",
    base: "https://api.openweathermap.org/data/2.5/"
}
const place = document.getElementById('place');
const temperature = document.getElementById('temperature');
const conditionImage = document.getElementById('image');
const condition = document.getElementById('condition');

document.getElementById('submit-btn').addEventListener('click', getResult);

function getResult() {
    const city = document.getElementById('keyword').value;
    if (city === '') {
        place.innerText = 'Please Enter Your Location First 😕';
    }
    else {
        fetchAPI(city);
    }
}

function fetchAPI(query) {
    fetch(`${api.base}weather?q=${query}&APPID=${api.key}`)
        .then(res => res.json())
        .then(displayResults);
}

function displayResults(loc) {
    // console.log(loc);
    if (loc.cod == '404') {
        place.innerText = "Sorry!!! Location Not Found 😒";
        document.getElementById('keyword').value = '';
    }
    else {
        place.innerText = loc.name;
        temperature.innerHTML = `${(loc.main.temp - 273.15).toFixed(2)}&deg;C`;
        conditionImage.src = `https://openweathermap.org/img/wn/${loc.weather[0].icon}@2x.png`;
        condition.innerText = loc.weather[0].main;
        document.getElementById('keyword').value = '';
    }
}