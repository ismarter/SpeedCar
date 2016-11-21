import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {FormValidatePage} from "../pages/form-validate/form-validate";
import {FormValidateModule} from "../modules/form-validator/module";

@NgModule({
    declarations: [
        MyApp,
        FormValidatePage
    ],
    imports: [
        FormValidateModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        FormValidatePage
    ],
    providers: []
})
export class AppModule {
}
