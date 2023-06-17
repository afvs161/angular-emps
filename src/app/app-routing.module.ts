import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordComponent } from './components/password/password.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsernameComponent } from './components/username/username.component';
import { EmpsComponent } from './pages/emps/emps.component';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: SidebarComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'employees', component: EmpsComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'username', component: UsernameComponent },
      { path: 'password', component: PasswordComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
