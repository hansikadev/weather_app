import React, { useEffect,useState,useRef } from 'react'
import search_icon from "../assets/aassets/search.png"
import clear_icon from "../assets/aassets/clear.png"
import drizzle_icon from "../assets/aassets/drizzle.png"
import cloud_icon from "../assets/aassets/cloud.png"
import snow_icon from "../assets/aassets/snow.png"
import wind_icon from "../assets/aassets/wind.png"
import rain_icon from "../assets/aassets/rain.png"
import humidity_icon from "../assets/aassets/humidity.png"
import { Carousel, Typography, Button } from "@material-tailwind/react";

const Weather = () => {
  const inputRef=useRef()
  const [weatherData,setWeatherData]=useState(false);
  const allIcons={
    "01d": "https://openweathermap.org/img/wn/01d@2x.png",
    "01n": "https://openweathermap.org/img/wn/01n@2x.png",
    "02d": "https://openweathermap.org/img/wn/02d@2x.png",
    "02n": "https://openweathermap.org/img/wn/02n@2x.png",
    "03d": "https://openweathermap.org/img/wn/03d@2x.png",
    "03n": "https://openweathermap.org/img/wn/03n@2x.png",
    "04d": "https://openweathermap.org/img/wn/04d@2x.png",
    "04n": "https://openweathermap.org/img/wn/04n@2x.png",
    "09d": "https://openweathermap.org/img/wn/09d@2x.png",
    "09n": "https://openweathermap.org/img/wn/09n@2x.png",
    "010d": "https://openweathermap.org/img/wn/10d@2x.png",
    "010n": "https://openweathermap.org/img/wn/10n@2x.png",
    "013d": "https://openweathermap.org/img/wn/13d@2x.png",
    "013n": "https://openweathermap.org/img/wn/13n@2x.png",
  }
  const search= async(city)=>{
    if(city===""){
      alert("Enter city name")
      return
    }
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response=await fetch(url);
      const data=await response.json();

      if(!response.ok){
        alert(data.message)
        return
      }
      console.log(data);
      const icon=allIcons[data.weather[0].icon] || clear_icon
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon:icon
      })
    }catch(error){
      setWeatherData(false);
      console.error("Error in fetching weather data")

    }
  }

  useEffect(()=>{
    search("london")
  },[])

  
  return (  
    <div className='flex flex-col bg-gradient-to-r from-[#2f4680] to-[#ac8fec] rounded-[20px] items-center place-self-center '>
      
      <div className='search-bar padding-[40px] p-7'>
        <input ref={inputRef} type="text" autoComplete="on" placeholder="search" className='placeholder-gray-600 placeholder:text-3xl placeholder:italic font-serif font- w-[300px] h-10 p-2 rounded-[30px]'/>
        <img className= " inline-block items-center p-1 bg-[#ebfffc] cursor-pointer rounded-full ml-2 h-[40px]" src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
      </div>
      {/* if the api call is incorrect  */}
      {weatherData?<> 
      <Carousel className='rounded-xl'>

      <div className='place-items-center'>
      <img src={weatherData.icon} alt="" className='w-[150px] mx-[30px] ' />
      <p className=' text-[#fff] leading-none mt-3  text-7xl '>{weatherData.temperature}°C</p>
      <p className='text-white mb-10 text-4xl'>{weatherData.location}</p>
      </div>

        
      
      <div className="place-items-center">      
          <img src={humidity_icon} alt="" className='w-[120px] mb-[40px] mt-6' />
            <p className=' text-[#fff] leading-none text-6xl '>{weatherData.humidity}%</p>
            <p className='text-white mb-10 text-4xl'>Humidity</p>
          
      </div>

      <div className='place-items-center'>
          <img src={wind_icon} alt="" className='w-[120px] mb-[30px] mt-6' />
          <div>
            <p className=' text-[#fff] leading-none ml-[70px] text-5xl '>{weatherData.windSpeed}Km/h</p>
            <p className='text-white mb-[20px] ml-[40px] text-5xl'>Wind Speed</p>
          </div>
      </div>
      
      </Carousel>
      </>:<></>}

    </div>
    
  )
}

export default Weather
 