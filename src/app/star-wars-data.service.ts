import { Injectable } from '@angular/core';
import { Observable, expand, EMPTY, map  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { withCache } from '@ngneat/cashew';


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

  getIDFromURL(field: string, url: string): number {
    return Number(url.substring((this.baseUrl + field + "/").length, url.length - 1));
  }

  
  getPage(field: string, page: number): Observable<any[]> {
    return this.http.get<ListResponse<any>>(this.baseUrl + field + (page === 0 ? '/': `/?page=${page}`), {context: withCache()})
      .pipe(map((data => data.results.map(record => {
            record.id = this.getIDFromURL(field, record.url);
            return record;
          })
        ))
      );
  }

  getRecord(field: string, id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + field + `/${id}/`, {context: withCache()})
    .pipe(map(response => {
              response.id = id
              return response
    }))
  }

  getRecordCount(field: string): Observable<number> {
    return this.http.get<ListResponse<any>>(this.baseUrl + field, {context: withCache()}).pipe(
      map((response) => {return response.count})
    );
  }

  getAllRecords(field: string): Observable<any[]> {
    
    return this.http.get<ListResponse<any>>(this.baseUrl + field + "/?page=1", {context: withCache()})
        .pipe(
              expand(response => response.next ? this.http.get<ListResponse<any>>(response.next, {context: withCache()}) : EMPTY),
              map((data => data.results.map(record => {
              record.id = this.getIDFromURL(field, record.url)
              return record;
            })
          )),
        );
  }
}
