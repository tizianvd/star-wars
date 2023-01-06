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

  getPlanets(page: number): Observable<Planet[]> {
    
    return this.http.get<ListResponse<Planet>>(this.planetUrl + `?page=${page}`)
        .pipe(map((planets => planets.results.map(planet => {
              planet.id = Number(planet.url?.substring(this.planetUrl.length - 1, planet.url?.length - 1));
              return planet;
            })
          )),
        );
  }

  getPlanet(id: number): Observable<Planet> {
    return this.http.get<any>(this.planetUrl + `${id}/`)
    .pipe(map(response => {
              return response
    }))
  }
}
