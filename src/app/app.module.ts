import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpCacheInterceptorModule, useHttpCacheLocalStorage  } from '@ngneat/cashew';

import { MatTabsModule }  from '@angular/material/tabs'; 
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { PlanetsComponent } from './planets/planets.component';
import { HttpClientModule } from '@angular/common/http';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';
import { PeopleComponent } from './people/people.component';
import { PersonComponent } from './person/person.component';
import { FilmsComponent } from './films/films.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { SpeciesComponent } from './species/species.component';
import { SpeciesDetailsComponent } from './species-details/species-details.component';
import { DataTableComponent } from './data-table/data-table.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { StarshipsComponent } from './starships/starships.component';
import { StarshipDetailsComponent } from './starship-details/starship-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    PlanetsComponent,
    PlanetDetailsComponent,
    PeopleComponent,
    PersonComponent,
    FilmsComponent,
    FilmDetailsComponent,
    SpeciesComponent,
    SpeciesDetailsComponent,
    DataTableComponent,
    VehiclesComponent,
    VehicleDetailsComponent,
    StarshipsComponent,
    StarshipDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    AppRoutingModule,
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot()
  ],
  providers: [useHttpCacheLocalStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
