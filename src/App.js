import React, { useEffect, useState } from "react"
import alanBtn from '@alan-ai/alan-sdk-web';

const alan_key = '62dc98464b3a4a16290297bcaefcf9172e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
    
    const [weather, setWeather] = useState()
    
    useEffect(()=>{
        alanBtn({
            key:alan_key,
            onCommand: ({command, data}) => {
                if(command === 'weather') {
                    console.log(data)
                    alert(data)
                    setWeather(data)
                }
            }
        })
    }, [])
    return (
        <> 
            {weather ? 
                <>
                    {/* heading */}
			<h3 className="text-lg font-bold pb-2 w-full text-start">Current Weather</h3>
			{/* heading cnt-1 current weather */}
			<div className="flex flex-col md:flex-row justify-center items-center md:h-[88%] h-auto w-full primaryBColor rounded-md p-2">
				{/* current details cnt */}
				<div className="flex flex-col w-2/3 pl-2 justify-center items-center md:justify-start md:items-start order-2 md:order-1">
					<h3 className="font-bold text-lg mb-1 hidden md:block PrimaryFont">Mumbai</h3>
					<h3 className="font-bold text-5xl mb-1">{weather.main ? <>{weather.main.temp.toFixed(0)}<sup>o</sup>C</>:'temp..'}</h3>
					<p className="font-light mb-3">{weather.weather ? <>{weather.weather.map(x=>{return x.main})}</>:
				            'load..'
				    	}</p>
					<div className="w-full h-auto flex items-center justify-center md:justify-start text-center">
						<div className="bg-white px-1 py-2 rounded-lg mr-2">
							<p>Pressure</p>
							<p>{weather.main ? <>{weather.main.pressure}</>:
							    'pre..'
							}hpa</p>
						</div>
						<div className="bg-white px-1 py-2 rounded-lg mr-2">
							<p>Humidity</p>
							<p>{weather.main ? <>{weather.main.humidity}</>:
							    'humi...'
							}%</p>
						</div>
						<div className="bg-white px-1 py-2 rounded-lg mr-2">
							<p>Wind</p>
							<p>{weather.wind ? <>{weather.wind.speed.toFixed(1)}</>:
					            'load..'
							}m/hr</p>
						</div>
					</div>
				</div>
				{/* icon cnt */}
				<div className="w-fit h-auto flex flex-col sm:justify-center md:justify-end sm:items-center md:items-end sm:order-1 md:order-2">
					<p className="font-bold text-lg md:hidden block">Mumbai</p>
					{weather.weather ? <>{weather.weather.map(x=>{
					    return <img src={`https://openweathermap.org/img/wn/${x.icon}@2x.png`} alt="icon" className="w-full h-full"></img>
					})}</>:<div className="lds-dual-ring"></div>}
				</div>
			</div>
                </>
                : <div className="h-full -full flex justify-center items-center">
                    <p className="font-bold">Try Saying : "How is the weather ?"</p>
                </div>}
            
            </>
        )
}

export default App