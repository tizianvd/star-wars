import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanetsComponent } from './planets/planets.component';
import { Routes, RouterModule } from '@angular/router';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';
import { PeopleComponent } from './people/people.component';
import { PersonComponent } from './person/person.component';
import { FilmsComponent } from './films/films.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { SpeciesComponent } from './species/species.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'planets', component: PlanetsComponent},
  {path: 'planet-details/:id', component: PlanetDetailsComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'person/:id', component: PersonComponent},
  {path: 'films', component: FilmsComponent},
  {path: 'film-details/:id', component: FilmDetailsComponent},
  {path: 'species', component: SpeciesComponent},

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
