import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.services";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {ResistanceServices} from "../../services/resistance.services";
import {Resistance} from "../../models/resistance";


@Component({
  selector: 'app-resistance-list',
  templateUrl: './resistance-list.page.html',
  styleUrls: ['./resistance-list.page.scss'],
})
export class ResistanceListPage implements OnInit {

  llista: [Resistance];

  //Com a constructor, pasem els Services (on estaran implementades les funcions), el servei de Dades (per passar dades entre components) i el Router
  constructor(
      private resistanceService: ResistanceServices,
      private dataService:DataService,
      private router: Router, private activatedRoute:ActivatedRoute,
      public toastController: ToastController) {
    activatedRoute.params.subscribe(val => {
      this.refresh();
    });
  }

  ngOnInit() {
    this.llistaResistances();
  }

  refresh(){
    this.llistaResistances();
  }

  llistaResistances() {
    console.log("Operació de demanar bicis realitzada al BackEnd:");
    this.resistanceService.obtainResistances()
        .subscribe(async response => {
              console.log("Resposta del BackEnd" + response.body);
              //Podem filtrar per tots els codis 2XX
              if (response.status == 200) {
                this.llista = response.body as [Resistance];
                const toast = await this.toastController.create({
                  message: "Actualized Resistances",
                  duration: 2000,
                  position: 'bottom',
                });
                toast.present();
              } else {
                //Error desconegut
                console.log("Error");
              }
            },
            async err => {
              console.log("Error del BackEnd" + err);
              //Podem filtrar per tots els altres codis
              if (err.status == 400) {
                console.log("No hi han resistencies");
                this.llista = null;
                const toast = await this.toastController.create({
                  message: "No hay resistencias en la base de datos",
                  duration: 2000,
                  position: 'bottom',
                });
                toast.present();
              } else {
                //Error desconegut
                console.log("Error");
              }
            });
  }
  async order() {
    this.llista.sort(function (a, b) {
      return a.value - b.value;
    });
    const toast = await this.toastController.create({
      message: "Resistances ordered",
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

}
