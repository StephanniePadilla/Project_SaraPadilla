import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Measurement List',
      url: '/measurement-list',
      icon: 'home'
    },
    {
      title: 'Resistance List',
      url: '/resistance-list',
      icon: 'list'
    },
    {
      title: 'Add Measurement',
      url: '/add-measurement',
      icon: 'add'
    },
    {
      title: 'Add Resistance',
      url: '/add-resistance',
      icon: 'bicycle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
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
