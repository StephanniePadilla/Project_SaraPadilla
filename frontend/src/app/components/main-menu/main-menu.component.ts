import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent{


    public appPages = [
        {
            title: 'Measurement List',
            url: '/measurement-list',
            icon: 'clipboard'
        },
        {
            title: 'Resistance List',
            url: '/resistance-list',
            icon: 'list'
        },
        {
            title: 'Add Measurement',
            url: '/add-measurement',
            icon: 'add-circle'
        },
        {
            title: 'Add Resistance',
            url: '/add-resistance',
            icon: 'add'
        },
        {
            title: 'Calculate time',
            url: '/calculate-time',
            icon: 'stopwatch'
        }

    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private menu: MenuController
    ) {
        this.initializeApp();
    }


    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }



}
