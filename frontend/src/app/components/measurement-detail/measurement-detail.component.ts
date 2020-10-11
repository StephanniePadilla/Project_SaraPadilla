import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../services/data.services";
import { MeasurementServices } from "../../services/measurement.services";
import { ResistanceServices } from "../../services/resistance.services";

@Component({
  selector: 'app-station-detail',
  templateUrl: './measurement-detail.component.html',
  styleUrls: ['./measurement-detail.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class MeasurementDetailComponent implements OnInit {


//Si cambiem el nom cal també fer-ho al app.module.ts i hem de definir les rutes a app-routing module



//Com a variables globals, posem:
  resistancesMeasurement: Object;
  unnasignedResistances: Object;
  measurementId: string;
  measurementName:string;

  //Com a constructor, pasem els Services (on estaran implementades les funcions), el servei de Dades (per passar dades entre components) i el Router
  constructor(private resistanceServices: ResistanceServices, private measurementService: MeasurementServices, private dataService:DataService, private router: Router) { }

  ngOnInit() {
    //Si obtenim el id del element de DataService:
    this.dataService.clickedMeasurementId.subscribe(measurementId => this.measurementId = measurementId)
    this.dataService.clickedMeasurementName.subscribe(measurementName => this.measurementName = measurementName)
    console.log("Id del element clickat: "+this.measurementId)
    if(this.measurementId=="0")
    {
      this.router.navigateByUrl("/");
    }

    //Cridem a la funció al arrencar
    this.obtainMeasurementResistances()
    this.obtainUnnasignedResistances()
  }

  obtainMeasurementResistances() {
    console.log("Operació de demanar resistencies de les mesures");
    if(this.measurementId!="0") {
      this.measurementService.obtainResistancesMeasurement(this.measurementId)
          .subscribe(response => {
                console.log("Resposta del BackEnd" + response.body);
                //Podem filtrar per tots els codis 2XX
                if (response.status == 200) {
                  this.resistancesMeasurement = response.body;
                  console.log("Proba ***" + this.resistancesMeasurement.toString());
                }
                else if (response.status == 204) {
                  //M.toast({html: "La medida "+this.measurementName+" no tiene resistencias"});
                  this.resistancesMeasurement = 0;
                }
                else {
                  //Error desconegut
                  console.log("Error");
                }
              },
              err => {
                console.log("Error del BackEnd" + err);
                //Podem filtrar per tots els altres codis
                //M.toast({html: 'Error al solicitar las resistencias'});
              });
    }
  }
  obtainUnnasignedResistances() {
    console.log("Operació de demanar resistencies sense assignar");
    if(this.measurementId!="0") {
      this.resistanceServices.obtainUnnasignedResistances()
          .subscribe(response => {
                console.log("Resposta del BackEnd" + response.body);
                //Podem filtrar per tots els codis 2XX
                if (response.status == 200) {
                  this.unnasignedResistances = response.body;
                }
                else if (response.status == 204) {
                  //M.toast({html: 'No hay resistencias sin asignar'});
                  this.unnasignedResistances = 0;
                }
                else {
                  //Error desconegut
                  console.log("Error");
                }
              },
              err => {
                console.log("Error del BackEnd" + err);
                //Podem filtrar per tots els altres codis
                //M.toast({html: 'Error al solicitar las resistencias'});
              });
    }

  }

  botoAsignar(resistance_id){
    console.log("Operació de assignar la resistencia amb id "+resistance_id);
    this.resistanceServices.assignResistance(this.measurementId,resistance_id)
        .subscribe(response => {
              console.log("Resposta del BackEnd" + response.body);
              //Podem filtrar per tots els codis 2XX
              if (response.status == 200) {
                //M.toast({html: 'Bici asignada correctamente'});
                this.obtainMeasurementResistances();
                this.obtainUnnasignedResistances()
              }
              else {
                //Error desconegut
                console.log("Error");
              }
            },
            err => {
              if (err.status == 400) {
                //M.toast({html: 'Error al Asignar'});
                this.obtainMeasurementResistances();
                this.obtainUnnasignedResistances()
              }
              else {
                //Error desconegut
                console.log("Error");
              }
            });
  }

  botoDesAsignar(resistance_id) {
    console.log("Operació de desassignar la resistencia amb id "+resistance_id);
    this.resistanceServices.desAssignResistance(this.measurementId,resistance_id)
        .subscribe(response => {
              console.log("Resposta del BackEnd" + response.body);
              //Podem filtrar per tots els codis 2XX
              if (response.status == 200) {
                //M.toast({html: 'Resistencia desasignada correctamente'});
                this.obtainMeasurementResistances();
                this.obtainUnnasignedResistances()
              }
              else {
                //Error desconegut
                console.log("Error");
              }
            },
            err => {
              if (err.status == 400) {
                //M.toast({html: 'Error al Desasignar'});
                this.obtainMeasurementResistances();
                this.obtainUnnasignedResistances()
              }
              else {
                //Error desconegut
                console.log("Error");
              }
            });
  }

}
