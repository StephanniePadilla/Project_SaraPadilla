import { Component} from '@angular/core';
import { MenuController } from '@ionic/angular';

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

    openMenu(){
        console.log("Menu abierto");
        //this.router.navigateByUrl('/api/menu/' + this.user._id);
        this.menu.enable(true, 'first');
        this.menu.open('first');
    }

    closeMenu(){
        console.log("Cerrar Menu");
        this.menu.close('first');
    }

    openEnd(){
        this.menu.open('end');
    }

    openCustom(){
        this.menu.enable(true, 'custom');
        this.menu.open('custom');
    }
}
