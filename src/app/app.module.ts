import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SesionComponent } from './pages/sesion/index/sesion.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './pages/sesion/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { PatentsComponent } from './pages/sesion/patentes/list-patents/patents.component';

import { AuthInterceptorServiceProvider } from './interceptors/auth-interceptor.service';
import { AccountComponent } from './pages/sesion/cuenta/account.component';
import { HistoryComponent } from './pages/sesion/historial/history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditPatentComponent } from './pages/sesion/patentes/edit-patent/edit-patent.component';
import { RegisterPatentComponent } from './pages/sesion/patentes/registrar-patente/register-patent.component';
import { InternationalizationModule } from './internationalization/internationalization.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/locales/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    SesionComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    PatentsComponent,
    RegisterPatentComponent,
    AccountComponent,
    HistoryComponent,
    EditPatentComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    NgbModule,
    InternationalizationModule.forRoot({ locale_id: 'en' }), // iniating with default language: en-US
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [AuthInterceptorServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
