import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {FormValidatePage} from "../pages/form-validate/form-validate";
import {EchartsPage} from "../pages/echarts/echarts";
import {ChartPage} from "../pages/chart/chart";
import {IconsPage} from "../pages/icons/icons";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = IconsPage;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: '表单验证', component: FormValidatePage},
            {title: '图表－ECharts', component: EchartsPage},
            {title: '图表－Chart', component: ChartPage},
            {title: '图标－svg', component: IconsPage},

        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
