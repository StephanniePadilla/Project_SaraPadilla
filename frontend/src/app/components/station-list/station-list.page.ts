import {Component, OnInit} from '@angular/core';
import { StationServices } from "../../services/station.services";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../services/data.services";
import {MenuController, ToastController} from "@ionic/angular";
import {Station} from "../../models/station";

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.page.html',
  styleUrls: ['./station-list.page.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class StationListPage implements OnInit {
//Com a variables globals, posem simplement la llista
  llista: Station[];
  llistaOriginal: Station[];
  searchTerm: string = "";

  //Com a constructor, pasem els Services (on estaran implementades les funcions), el servei de Dades (per passar dades entre components) i el Router
  constructor(private stationService: StationServices,private dataService:DataService,
              private router: Router,private activatedRoute:ActivatedRoute,
              /*private menu: MenuController,*/
              public toastController: ToastController) {
    activatedRoute.params.subscribe(val => {
      this.refresh();
    });
  }

  ngOnInit() {
    this.llistaStations();
  }

  refresh(){
    this.llistaStations();
  }

  llistaStations() {
    console.log("Operació de demanar estacions realitzada al BackEnd:");
    this.stationService.obtainStations()
        .subscribe(async response => {
              console.log("Resposta del BackEnd" + response.body);
              //Podem filtrar per tots els codis 2XX
              if (response.status == 200) {
                this.llista = response.body as Station[];
                this.llistaOriginal=this.llista;
                const toast = await this.toastController.create({
                  message: "Estaciones Actualizadas",
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
                console.log("No hi han estacions");
                this.llista = null;
                const toast = await this.toastController.create({
                  message: "No hay estaciones en la base de datos",
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
  botoLlista(id,name) {
    this.dataService.changeStationId(id);
    this.dataService.changeStationName(name);
    this.router.navigateByUrl("/station-detail");
  }
  async order() {
    this.llista.sort(function (a, b) {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    const toast = await this.toastController.create({
      message: "Stations ordered",
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  filterItems() {
    var filtered= this.llista.filter(item => {
      return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
    if(this.searchTerm=="")
      this.llista=this.llistaOriginal;
    else{
      this.llista=filtered;
    }

  }
/*
  openMenu(){
    this.menu.enable(true, 'station-list');
    //this.router.navigateByUrl('/api/menu/' + this.user._id);
    this.menu.open('station-list');
    console.log("Abrir menu");
  }

  closeMenu(){
    console.log("Cerrar Menu");
    this.menu.close('station-list');
  }*/


}
