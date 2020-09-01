import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Environment } from "./environment";

@Injectable({
  providedIn: 'root'
})
export class ResistanceServices {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  obtainUnnasignedResistances() {
    return this.http.get(this.environment.url + "getUnnasignedResistances", {observe: 'response'})
  }
  obtainResistances() {
    return this.http.get(this.environment.url + "getResistances", {observe: 'response'})
  }
  assignResistance(measurementId, resistanceId) {
    return this.http.get(this.environment.url + "assignResistance/"+measurementId+"/"+resistanceId, {observe: 'response'})
  }
  desAssignResistance(measurementId, resistanceId) {
    return this.http.get(this.environment.url + "unassignResistance/"+measurementId+"/"+resistanceId, {observe: 'response'})
  }
  addResistance(params) {
    return this.http.post(this.environment.url + "addResistance/",params, {observe: 'response'})
  }
}
