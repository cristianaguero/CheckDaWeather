import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';


const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '633c0626a2aaa15575ea07f74a6ac713'

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  formWeather: FormGroup;
  data: any;

  constructor(private form: FormBuilder, private httpClient: HttpClient ) {
    this.formWeather = this.form.group({
      city: ['', Validators.required]
    });
  }

  checkValidation(control: string, error: string) {
    return this.formWeather.get(control)?.hasError(error) && this.formWeather.get(control)?.touched;
  }

  getWeather(city: string){
    const url = `${baseUrl}?q=${city}&appid=${apiKey}`;

    return this.httpClient.get(url);
  }

  checkWeather() {

    if (this.formWeather.invalid) {
      return this.formWeather.controls['city'].markAsTouched();
    }

    this.getWeather(this.formWeather.controls['city'].value).subscribe({
      next: (result: any) => {
      
        this.data = result;

        let temp = this.data.main.temp;
        temp = temp - 273.15;
        temp = Math.ceil(temp);
        this.data.main.temp = temp;

        let temp_min = this.data.main.temp_min;
        temp_min = temp_min - 273.15;
        temp_min = Math.ceil(temp_min);
        this.data.main.temp_min = temp_min;

        let temp_max = this.data.main.temp_max;
        temp_max = temp_max - 273.15;
        temp_max = Math.ceil(temp_max);
        this.data.main.temp_max = temp_max;

        let feels_like = this.data.main.feels_like;
        feels_like = feels_like - 273.15;
        feels_like = Math.ceil(feels_like);
        this.data.main.feels_like = feels_like;
        
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.formWeather.reset();
  }

}
