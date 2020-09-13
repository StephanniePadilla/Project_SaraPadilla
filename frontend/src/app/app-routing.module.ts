import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AddMeasurementComponent} from "./components/add-measurement/add-measurement.component";
import {AddResistanceComponent} from "./components/add-resistance/add-resistance.component";
import {MeasurementDetailComponent} from "./components/measurement-detail/measurement-detail.component";
import {CalculateTimeComponent} from "./components/calculate-time/calculate-time.component";
import {MainMenuComponent} from "./components/main-menu/main-menu.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-menu',
    pathMatch: 'full'
  },
  { path: 'measurement-list', loadChildren: './components/measurement-list/measurement-list.module#MeasurementListPageModule' },
  { path: 'resistance-list', loadChildren: './components/resistance-list/resistance-list.module#ResistanceListPageModule' },
  { path: 'add-measurement', component: AddMeasurementComponent},
  { path: 'add-resistance', component: AddResistanceComponent},
  { path: 'measurement-detail', component: MeasurementDetailComponent},
  { path: 'calculate-time', component: CalculateTimeComponent},
  { path: 'main-menu', component: MainMenuComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
