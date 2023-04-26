import { WeatherWidget } from '../Weather/Weather';
import './header.css';

export async function Header(text: string) {
    const div = document.createElement('div');
    div.classList.add('header');

    const header = document.createElement('h1');
    header.innerHTML = text;

    const weather = await WeatherWidget();
   
    div.append(header, weather);
    return div;
  }