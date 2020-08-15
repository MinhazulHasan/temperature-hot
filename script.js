const key = "fbf9967b7898810d1c2d9bec7fed35c3";

const place = document.getElementById('place');
const temperature = document.getElementById('temperature');
const conditionImage = document.getElementById('image');
const condition = document.getElementById('condition');

document.getElementById('submit-btn').addEventListener('click', displayResults);

function displayResults() {
    const city = document.getElementById('keyword').value;
    if (city === '') {
        place.innerText = 'Please Enter Your Location First 😕';
        clearField();
    }
    else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
            .then(res => res.json())
            .then(data => {
                temperature.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`;
                place.innerText = data.name;
                condition.innerText = data.weather[0].main;
                conditionImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                document.getElementById('keyword').value = '';
            })
            .catch(()=>{
                place.innerText = "Sorry!!! Location Not Found 😒";
                clearField();
            })
    }
}

function clearField() {
    temperature.innerText = '';
    conditionImage.src = '#';
    condition.innerText = '';
    document.getElementById('keyword').value = '';
}