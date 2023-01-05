import { TestBed } from '@angular/core/testing';

import { StarWarsDataService } from './star-wars-data.service';

describe('StarWarsDataService', () => {
  let service: StarWarsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarWarsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
