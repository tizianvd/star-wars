import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanetsComponent } from './planets/planets.component';
import { Routes, RouterModule } from '@angular/router';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'planets', component: PlanetsComponent},
  {path: 'planet_details/:id', component: PlanetDetailsComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
