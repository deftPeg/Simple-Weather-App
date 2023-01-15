// Declaring variable for DOM Manipulation adding comment for git purposes
let background = document.getElementById("background")
let temp = document.getElementById("box3")
let description = document.getElementById("box6")
let cityName = document.getElementById("box1")
let date = document.getElementById("box2")
let icon = document.getElementById("box5")
let inputField = document.getElementById("searchArea")
let weatherCard = document.getElementById("responseArea")
let errorMessageBox = document.getElementById("errorMessageBox")
let errorMessage = document.getElementById("errorMessage")

let resetButton = document.getElementById("box7")
resetButton.addEventListener("click", Reset)

let searchButton = document.getElementById("searchButton")
searchButton.addEventListener("click", getWeatherData,)



async function getWeatherData (city) {

  ResetError()

    // get city declared in input field
    city = document.getElementById("searchArea").value;

    // get current date
    let longDate = new Date ()



    try{
    // Fetching the API info and returning it in an object
    let response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=70f82761536b0093550c6878b0bb6b93`)
    loading()
    let data = await response.json()
    .then((data) => {

        // Retrieving weather info for styling purposes
        let weather = data.weather[0].main

        background.classList.remove("backgroundColor-Clear", "backgroundColor-Clouds", "backgroundColor-Rain", "backgroundColor-Wind", "backgroundColor-Thunderstorm")
        background.classList.add(`backgroundColor-${weather}`)

        icon.classList.remove("photo-Clear", "photo-Clouds", "photo-Rain", "photo-Wind", "photo-Thunderstorm")
        icon.classList.add(`photo-${weather}`)

        // Passing values via DOM to HTML
        date.innerText=longDate.toDateString()
        cityName.innerText = city
        temp.innerText = Math.round(data.main.temp - 273.15)
        description.innerText = data.weather[0].description

         // Display Weather Card (Response Area)
         weatherCard.style.display = "block"
    })
    }catch(error) {
        Reset()
        // catches errors both in fetch and response.json
        errorMessageBox.style.display = "block"
        errorMessage.style.display = "block"
      }
      
}

// RESET FUNCTION
function Reset(){

    // Clear input field
    document.getElementById("searchArea").value = "";

    // remove weather styling classLists
    background.classList.remove("backgroundColor-Clear", "backgroundColor-Clouds", "backgroundColor-Rain", "backgroundColor-Wind", "backgroundColor-Thunderstorm")
    icon.classList.remove("photo-Clear", "photo-Clouds", "photo-Rain", "photo-Wind", "photo-Thunderstorm")

    // Hide WeatherCard
    weatherCard.style.display = "none"
}

function ResetError(){
      // Hide Error Message
      errorMessageBox.style.display = "none"
      errorMessage.style.display = "none"
}

// LOADING FUNCTION

function loading() {
    let i = 0;
    // If loop to start a counter
  if (i == 0) {
    i = 1;

    // Display the loading bars
    let elem = document.getElementById("loadingBar");
    elem.style.display = "block"
        document.getElementById("loadingBar").style.display = "block"
    // Starting width
    let width = 1;
    // setting interval time as to how fast the bar will load
    let id = setInterval(frame, 10);
    // running loading frames 
    function frame() {
        //at 100 or greater 
      if (width >= 100) {
        // clear interval timer
        clearInterval(id);
        // hide loading bars
        elem.style.display = "none"
        document.getElementById("loadingBar").style.display = "none"
        // reset counter
        i = 0;
        // else continue filling width
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

