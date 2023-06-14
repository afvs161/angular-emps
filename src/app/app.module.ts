import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { OkModalComponent } from './components/ok-modal/ok-modal.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IconsProviderModule } from './icons-provider.module';
import { EmpsComponent } from './pages/emps/emps.component';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AddEmpModalComponent } from './components/add-emp-modal/add-emp-modal.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    EmpsComponent,
    JobsComponent,
    SidebarComponent,
    ConfirmModalComponent,
    OkModalComponent,
    AddEmpModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzModalModule,
    NzButtonModule,
    NzTableModule,
    NzSelectModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
