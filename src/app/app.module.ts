import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {FormValidatePage} from "../pages/form-validate/form-validate";
import {FormValidateModule} from "../modules/form-validator/module";
import {EchartsPage} from "../pages/echarts/echarts";

@NgModule({
    declarations: [
        MyApp,
        FormValidatePage,
        EchartsPage
    ],
    imports: [
        FormValidateModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        FormValidatePage,
        EchartsPage
    ],
    providers: []
})
export class AppModule {
}
