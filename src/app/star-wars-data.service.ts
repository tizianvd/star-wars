import { Injectable } from '@angular/core';
import { Planet } from './planet';
import { Observable, mergeMap, of, catchError, map, tap, throwError  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface ListResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})

export class StarWarsDataService {

  constructor(

                private http: HttpClient,
  ) { }

  private baseUrl = 'https://swapi.dev/api/';
  private planetUrl = `${this.baseUrl}/planets/`;

  planets: Planet[] = [];

  getPlanets(): Observable<Planet[]> {
    
    return this.http.get<ListResponse<Planet>>(`${this.planetUrl}?format=json`)
        .pipe(map((planets => planets.results.map(planet => {
              planet.id = Number(planet.url?.substring(this.planetUrl.length - 1, planet.url?.length - 1));
              return planet;
            })
          )),
        );
  }

  getPlanet(id: number): Observable<Planet> {
    return this.http.get<any>(this.baseUrl + `planets/${id}/?format=json`)
    .pipe(map(response => {
              return response
    }))
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
