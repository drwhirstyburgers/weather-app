import React, { Component } from 'react';
import './App.css';
import Titles from './components/titles.js';
import Form from './components/form.js';
import Weather from './components/weather.js';

const Api_Key = 'bfaa282bbd90de0a28b0d9774b321684';

class App extends Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  componentWillMount(function() {
  getCoords() {
   if(navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       const latitude = position.coords.latitude;
       const longitude = position.coords.longitude;
     });
    const api = fetch('api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}');
    const resp = api.json();
    console.log(resp);
    this.setState({
      temperature: resp.main.temp,
      city: resp.name,
      country: resp.sys.country,
      humidity: resp.main.humidity,
      description: resp.weather[0].description,
      error: ""
    });
   }
  }
})


  getWeather = async(e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    let country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
    const response = await api_call.json();
    console.log(response);
    if(response.message == 'city not found'){
      this.setState({
        error: "City not found, please try again",
      });
    }else if(city && country){
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      });
    }else{
      this.setState({
        error: "Please enter a city AND country"
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Titles />
        <Form loadWeather={this.getWeather} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}  />
      </div>
    );
  }
}

export default App;
