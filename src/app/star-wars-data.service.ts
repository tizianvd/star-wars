import { Injectable } from '@angular/core';
import { Planet } from './planet';
import { PLANETS } from './planets';

@Injectable({
  providedIn: 'root'
})
export class StarWarsDataService {

  constructor() { }

  getPlanets(): Planet[] {
    return PLANETS;
  }

}
