import { WeatherWidget } from '../Weather/Weather'
import './header.css'

export function Header ({text}: {text: string}){

    return (
        <div className='header'>
            <h1>{text}</h1>
            <WeatherWidget/>
        </div>
    )
}