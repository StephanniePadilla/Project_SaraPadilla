import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  //Clase per intercambiar parametres entre els components

  private originalMeasurementId = new BehaviorSubject("0");
  clickedMeasurementId = this.originalMeasurementId.asObservable()

  private originalMasurementName = new BehaviorSubject("0");
  clickedMeasurementName = this.originalMasurementName.asObservable()

  constructor() { }

  changeMeasurementId(id: string) {
    this.originalMeasurementId.next(id)
  }

  changeMeasurementName(name: string) {
    this.originalMasurementName.next(name)
  }


}
