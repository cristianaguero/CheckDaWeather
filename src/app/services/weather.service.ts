import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '633c0626a2aaa15575ea07f74a6ac713'

@Injectable({
  providedIn: 'root'
})
export default class WeatherService {

  constructor(private http: HttpClient) { }


  getWeather(city: string){
    const url = `${baseUrl}?q=${city}&appid=${apiKey}`;

    return this.http.get(url);
  }
}
