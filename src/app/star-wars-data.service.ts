import { Injectable } from '@angular/core';
import { Planet, Person } from './interfaces';
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
  private peopleUrl = `${this.baseUrl}/people/`;

  getPlanets(page: number): Observable<Planet[]> {
    
    return this.http.get<ListResponse<Planet>>(this.planetUrl + (page === 0 ? '': `?page=${page}`))
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

  getPeople(page: number): Observable<Person[]> {
    
    return this.http.get<ListResponse<Person>>(this.peopleUrl + (page === 0 ? '': `?page=${page}`))
        .pipe(map((planets => planets.results.map(planet => {
              planet.id = Number(planet.url?.substring(this.peopleUrl.length - 1, planet.url?.length - 1));
              return planet;
            })
          )),
        );
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<any>(this.peopleUrl + `${id}/`)
    .pipe(map(response => {
              return response
    }))
  }
}
