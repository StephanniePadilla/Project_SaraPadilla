import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Environment } from "./environment";

@Injectable({
  providedIn: 'root'
})
export class MeasurementServices {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  obtainMeasurement() {
    return this.http.get(this.environment.url + "getMeasurement", {observe: 'response'})
  }

  obtainRestsnacesMeasurement(measurementId) {
    return this.http.get(this.environment.url + "getResistancesMeasurement/"+measurementId, {observe: 'response'})
  }
  addMeasurement(params) {
    return this.http.post(this.environment.url + "addMeasurement/",params, {observe: 'response'})
  }

}
