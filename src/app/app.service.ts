import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  fetchPlanets(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  fetchResidents(residentsUrls: string[]): Observable<any[]> {
    const residentObservables: Observable<any>[] = residentsUrls.map((url) => {
      return this.http.get<any>(url);
    });
    return forkJoin(residentObservables);
  }
}
