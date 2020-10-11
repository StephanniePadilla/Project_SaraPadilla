import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { ToastController } from '@ionic/angular';
import {Router} from "@angular/router";
import {MeasurementServices} from "../../services/measurement.services";

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class AddMeasurementComponent implements OnInit {

  Form: FormGroup;
  validation_messages: any;

  constructor(public toastController: ToastController,private formBuilder: FormBuilder,
              private router: Router, private measurementServices: MeasurementServices) {
    this.Form = this.formBuilder.group({
          name: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern(/.{0,50}$/)])),
          description: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern(/.{0,50}$/)])),
        }
    );
  }

  ngOnInit() {
    this.validation_messages = {
      'name': [
        { type: 'required', message: 'Name: Required'},
        { type: 'pattern', message: 'Name: Must contain less than 50 characters' }
      ],
      'description': [
        { type: 'required', message: 'Description: Required'},
        { type: 'pattern', message: 'Description: Must contain less than 50 characters' }
      ]}
  }
  addMeasurement() {
    var params = {
      name: this.Form.value.name,
      description: this.Form.value.description,
    };
    console.log("Operació de demanar estacions realitzada al BackEnd:");
    this.measurementServices.addMeasurement(params)
        .subscribe(async response => {
              console.log("Resposta del BackEnd" + response.body);
              //Podem filtrar per tots els codis 2XX
              if (response.status == 200) {
                const toast = await this.toastController.create({
                  message: "Measurement has been added",
                  duration: 2000,
                  position: 'bottom',
                });
                toast.present();
                this.router.navigateByUrl('/measurement-list');
              } else {
                //Error desconegut
                console.log("Error");
              }
            },
            async err => {
              console.log("Error del BackEnd" + err);
              //Podem filtrar per tots els altres codis
              if (err.status == 400) {
                const toast = await this.toastController.create({
                  message: "There is an station with that name already",
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

}
