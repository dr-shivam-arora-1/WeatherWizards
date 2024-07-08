import './App.css';
import { useState } from 'react';

function App() {
  let [city, setCity] = useState('');
  let [wDetails,setWDetails]=useState()

  let getData=(e)=>{

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        console.log(finalRes);
        if(finalRes.cod=="404"){
          setWDetails(undefined)
        }
        else{
          setWDetails(finalRes)

        }
      });
    e.preventDefault()
    setCity('')
  }

  return (
    <div className="w-[100%] h-[100vh] bg-[#77bcc9]">
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-[40px] font-bold py-[50px] text-white">WeatherWizards
        </h1>
        <form onSubmit={getData}>
          <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} className="w-[300px] h-[40px] pl-3" placeholder="City Name" />
          <button className="bg-[#567378] text-white py-2 px-4 rounded">Search</button>
        </form>

        <div className="w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px]">
          
          {
            wDetails!=undefined
            ?
            <>
          <h3 className='font-bold text-[30px]'>
              {wDetails.name} <span className='bg-[yellow]'>{wDetails.sys.country}</span>
            </h3>
          <h2 className="font-bold text-[40px]">{wDetails.main.temp}</h2>
          <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} alt="weather icon" />
          <p>{wDetails.weather[0].description}</p>
            </>
            :
            "No city found"
          }
        </div>

      </div>
    </div>
  );
}

export default App;
