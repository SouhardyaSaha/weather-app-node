console.log('Hello from client site');



const weatherForm = document.querySelector('form')
const location_form = document.getElementById('location submission');

document.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(location_form.value);
    fetch(`http://localhost:3500/weather?location=${location_form.value}`).then((response) => {

        response.json().then((data) => {
            document.getElementById('message-1').innerHTML = '';
            document.getElementById('message-2').innerHTML = '';

            console.log(data);
            
            if(data.error) {
                document.getElementById('message-1').innerHTML = data.error;
            } else {
                document.getElementById('message-1').innerHTML = data.location;
                document.getElementById('message-2').innerHTML = data.forecastData.temp;
            }
        });

    });
});