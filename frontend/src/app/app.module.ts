import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AddMeasurementComponent} from "./components/add-measurement/add-measurement.component";
import {AddResistanceComponent} from "./components/add-resistance/add-resistance.component";
import {MeasurementDetailComponent} from "./components/measurement-detail/measurement-detail.component";
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "./services/data.services";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
      AppComponent,
      AddMeasurementComponent,
      AddResistanceComponent,
      MeasurementDetailComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
