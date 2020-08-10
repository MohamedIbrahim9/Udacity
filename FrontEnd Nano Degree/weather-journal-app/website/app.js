/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&APPID=661daa7377189bfe425b6af1f07ac279";
const postWeatherDataUrl = "http://localhost:8000/AddWeatherData";
const allDataUrl = "http://localhost:8000/allData";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//add event listener to generate element

const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", performAction);

//perform Action on click generate Button

function performAction() {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeatherData(baseURL, zipCode, apiKey)
    .then((data) => {
      postWeatherData(postWeatherDataUrl, {
        cityName: data.name,
        countryName: data.sys.country,
        temperature: data.main.temp,
        date: newDate,
        userResponse: feelings,
      });
    })
    .then(() => {
      updateUI(allDataUrl);
    });
}

//fetch Weather Data from openAPI Weather
const getWeatherData = async (baseURL, zipCode, key) => {
  const res = await fetch(baseURL + zipCode + key);
  console.log(res);
  try {
    const weatherData = await res.json();
    console.log(weatherData);
    return weatherData;
  } catch (err) {
    console.log("error has ecoured " + err);
  }
};

//post data to server side

const postWeatherData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  try {
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (err) {
    console.log("error has ecoured " + err);
  }
};

// update UI ELmemets

const updateUI = async (url = "") => {
  const requestData = await fetch(url);
  try {
    const response = await requestData.json();
    console.log(response);
    document.getElementById(
      "city"
    ).innerHTML = `City Name : ${response.cityName}`;
    document.getElementById(
      "country"
    ).innerHTML = `Country Name : ${response.countryName}`;
    document.getElementById("date").innerHTML = `Date: ${response.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperture : ${response.temperature} F `;
    document.getElementById(
      "content"
    ).innerHTML = `User Response : ${response.userResponse}`;
  } catch (err) {
    console.log("error has ecoured " + err);
  }
};
