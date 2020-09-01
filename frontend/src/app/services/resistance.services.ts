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

  obtainUnnasignedBikes() {
    return this.http.get(this.environment.url + "getUnnasignBikes", {observe: 'response'})
  }
  obtainResistances() {
    return this.http.get(this.environment.url + "getResistances", {observe: 'response'})
  }
  assignResistance(stationId, bikeId) {
    return this.http.get(this.environment.url + "assignResistance/"+stationId+"/"+bikeId, {observe: 'response'})
  }
  desAssignBike(stationId, bikeId) {
    return this.http.get(this.environment.url + "unassignResistance/"+stationId+"/"+bikeId, {observe: 'response'})
  }
  addResistance(params) {
    return this.http.post(this.environment.url + "addResistance/",params, {observe: 'response'})
  }
}
