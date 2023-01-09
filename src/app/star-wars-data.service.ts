import { Injectable } from '@angular/core';
import { Planet, Person, Film } from './interfaces';
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

  private baseUrl = 'https://swapi.dev/api';
  private planetUrl = `${this.baseUrl}/planets/`;
  private peopleUrl = `${this.baseUrl}/people/`;
  private filmUrl = `${this.baseUrl}/films/`;

  getPlanetIDFromURL(planetUrl: string): number {
    return Number(planetUrl.substring(this.planetUrl.length, planetUrl.length - 1));
  }

  getPlanets(page: number): Observable<Planet[]> {
    
    return this.http.get<ListResponse<Planet>>(this.planetUrl + (page === 0 ? '': `?page=${page}`))
      .pipe(map((planets => planets.results.map(planet => {
            planet.id = this.getPlanetIDFromURL(planet.url);
            return planet;
          })
        ))
      );
  }

  getPlanet(id: number): Observable<Planet> {
    return this.http.get<any>(this.planetUrl + `${id}/`)
    .pipe(map(response => {
              response.id = id
              return response
    }))
  }

  getPeople(page: number): Observable<Person[]> {
    
    return this.http.get<ListResponse<Person>>(this.peopleUrl + (page === 0 ? '': `?page=${page}`))
        .pipe(map((people => people.results.map(person => {
              person.id = Number(person.url?.substring(this.peopleUrl.length, person.url?.length - 1));
              return person;
            })
          )),
        );
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<any>(this.peopleUrl + `${id}/`)
    .pipe(map(response => {
              response.id = id;
              return response
    }))
  }

  getPeopleCount(): Observable<number> {
    return this.http.get<ListResponse<Person>>(this.peopleUrl).pipe(
      map((response) => {return response.count})
    );
  }

  getFilms(): Observable<Film[]> {
    
    return this.http.get<ListResponse<Film>>(this.filmUrl)
        .pipe(map((films => films.results.map(film => {
              film.id = Number(film.url?.substring(this.filmUrl.length, film.url?.length - 1));
              return film;
            })
          )),
        );
  }

  getFilm(id: number): Observable<Film> {
    return this.http.get<any>(this.filmUrl + `${id}/`)
    .pipe(map(response => {
              response.id = id;
              return response
    }))
  }
}
