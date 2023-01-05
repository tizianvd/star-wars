import { Injectable } from '@angular/core';
import { Planet } from './planet';
import { PLANETS } from './planets';
import { Observable, retry, of, catchError, map, tap, throwError  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StarWarsDataService {

  constructor(

                private http: HttpClient,
  ) { }

  private baseUrl = 'https://swapi.dev/api/';

  // getPlanets(): Observable<Planet> {
  //   return this.http
  //     .get<Planet>(this.planetsUrl)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  getPlanets(): Planet[] {
    return PLANETS;
  }

  getPlanet(id: number): Observable<Planet> {
    return this.http.get<any>(this.baseUrl + `planets/${id}/?format=json`)
    .pipe(map(response => ({
      name: response.name,
      rotationPeriod: response.rotationPeriod,
      orbitalPeriod: response.orbitalPeriod,
    } as Planet)));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
