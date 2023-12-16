import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WeatherComponent } from './components/weather/weather.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: 'home', 'title': "CheckDa'Home", component: HomeComponent },
    { path: 'weather', 'title': "CheckDa'Weather", component: WeatherComponent },
    { path: 'about', 'title': "CheckDa'About", component: AboutComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', 'title': "CheckDa'404", component: NotFoundComponent}
];
