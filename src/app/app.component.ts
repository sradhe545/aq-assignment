import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  apiURL: string = 'https://swapi.dev/api/planets/?format=json';
  planets: any;
  next: string = '';
  prev: string = '';
  isLoading:boolean = false

  constructor(private appService: AppService) {}


  ngOnInit(): void {
    this.getPlanetsData(this.apiURL);
  }

  getPlanetsData(url: string) {
    this.appService.fetchPlanets(url).subscribe((data: any) => {
      this.planets = data.results;
      this.next = data.next;
      this.prev = data.previous;
      this.getResidentsData();
     this.isLoading = false
    });
  }
  getResidentsData(): void {
    this.planets.forEach((planet: any) => {
      this.appService
        .fetchResidents(planet.residents)
        .subscribe((residents: string[]) => {
          this.isLoading = true
          planet.residents = residents;
         
        });
    });
  }
}
