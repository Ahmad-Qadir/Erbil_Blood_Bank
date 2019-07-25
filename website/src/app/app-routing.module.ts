import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { DonarComponent } from './donar/donar.component';
import { PatientComponent } from './patient/patient.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { DonarListComponent } from './donar-list/donar-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { EditComponent } from './edit/edit.component';
import { BloodFilterPip } from './blood-filter.pipe';
import { BloodBankService } from './blood-bank.service';
import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: '/home/dashbord', pathMatch: 'full' },
      { path: 'dashbord', component: DashbordComponent },
      { path: 'donar', component: DonarComponent },
      { path: 'patient', component: PatientComponent },
      { path: 'list', component: ListComponent },
      { path: 'patient-list', component: PatientListComponent },
      { path: 'donar-list', component: DonarListComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'edit', component: EditComponent },
      { path: '**', redirectTo: '/home/dashbord', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  declarations: [
    DonarComponent,
    PatientComponent,
    LoginComponent,
    ListComponent,
    DonarListComponent,
    PatientListComponent,
    DashbordComponent,
    NotificationComponent,
    EditComponent,
    HomeComponent,
    BloodFilterPip,
    
    
  ],

  imports: [RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule,
  ],
  providers: [BloodBankService, ],

  exports: [RouterModule


  ]
})
export class AppRoutingModule { }
