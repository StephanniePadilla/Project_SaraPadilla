import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { ToastController } from '@ionic/angular';
import {Router} from "@angular/router";
import {ResistanceServices} from "../../services/resistance.services";

@Component({
  selector: 'app-calculate-time',
  templateUrl: './calculate-time.component.html',
  styleUrls: ['./calculate-time.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class CalculateTimeComponent implements OnInit {

  Form: FormGroup;
  validation_messages: any;

  constructor(public toastController: ToastController,private formBuilder: FormBuilder,
              private router: Router, private resistanceServices: ResistanceServices) {
    this.Form = this.formBuilder.group({
          measRow: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern(/.{0,200}$/)])),
          measCol: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern(/.{0,1000}$/)])),
          measSec: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern(/.{0,5000000}$/)])),
        }
    );
  }

  ngOnInit() {
    this.validation_messages = {
      'measRow': [
        { type: 'required', message: 'Name: Required'},
        { type: 'pattern', message: 'Name: Must contain less than 50 characters' }
      ],
      "measCol": [
        { type: 'required', message: 'Value: Required'},
        { type: 'pattern', message: 'Value: Must contain less than 50 characters' }
      ],
      'measSec': [
        { type: 'required', message: 'Description: Required'},
        { type: 'pattern', message: 'Description: Must contain less than 50 characters' }
      ]}
  }
  calculateTime() {
    var params = {
      measRow: this.Form.value.measRow,
      measCol:this.Form.value.measCol,
      measSec: this.Form.value.measSec,
    };
    console.log("Operació de demanar estacions realitzada al BackEnd:");

  }



}