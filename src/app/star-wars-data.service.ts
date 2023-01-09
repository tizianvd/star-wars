import { Injectable } from '@angular/core';
import { Planet, Person, Film } from './interfaces';
import { Observable, expand, EMPTY, catchError, map, tap, throwError  } from 'rxjs';
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
  private filmUrl = `${this.baseUrl}/films/`;

  getIDFromURL(field: string, url: string): number {
    return Number(url.substring((this.baseUrl + field + "/").length, url.length - 1));
  }

  
  getPage(field: string, page: number): Observable<any[]> {
    return this.http.get<ListResponse<any>>(this.baseUrl + field + (page === 0 ? '/': `/?page=${page}`))
      .pipe(map((data => data.results.map(record => {
            record.id = this.getIDFromURL(field, record.url);
            console.log(record.url);
            return record;
          })
        ))
      );
  }

  getRecord(field: string, id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + field + `/${id}/`)
    .pipe(map(response => {
              response.id = id
              return response
    }))
  }

  getRecordCount(field: string): Observable<number> {
    return this.http.get<ListResponse<Person>>(this.baseUrl + field).pipe(
      map((response) => {return response.count})
    );
  }

  getAllRecords(field: string): Observable<any[]> {
    
    return this.http.get<ListResponse<any>>(this.baseUrl + field + "/?page=1")
        .pipe(
              expand(response => response.next ? this.http.get<ListResponse<any>>(response.next) : EMPTY),
              map((data => data.results.map(record => {
              record.id = this.getIDFromURL(field, record.url)
              return record;
            })
          )),
        );
  }
}
