import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  //Clase per intercambiar parametres entre els components

  private originalStationId = new BehaviorSubject("0");
  clickedMeasurementId = this.originalStationId.asObservable()

  private originalStationName = new BehaviorSubject("0");
  clickedMeasurementName = this.originalStationName.asObservable()

  constructor() { }

  changeMeasurementId(id: string) {
    this.originalStationId.next(id)
  }

  changeMeasurementName(name: string) {
    this.originalStationName.next(name)
  }


}
