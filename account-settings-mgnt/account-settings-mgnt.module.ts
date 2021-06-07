import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CustomPipesModule } from '../../../pipe/custom-pipes.module';
import { AccountSettingsMgntComponent } from './account-settings-mgnt.component';
import { AccountsUsersCreateComponent } from './account-users/accounts-users-create/accounts-users-create.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = { suppressScrollX: true };
const routes: Routes = [
  {
    path: '',
    component: AccountSettingsMgntComponent,
    children: [
      {
        path: '',
        redirectTo: 'PatientData/New',
        pathMatch: 'full',
      },
      {
        path: 'PatientData/New',
        component: AccountsUsersCreateComponent
      }
    ]
  }
]

@NgModule({
  declarations: [AccountSettingsMgntComponent,
    AccountsUsersCreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeahterIconModule,
    FullCalendarModule, // import the FullCalendar module! will make the FullCalendar component available
    PerfectScrollbarModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    SimplemdeModule.forRoot({
      provide: SIMPLEMDE_CONFIG,
      useValue: {}
    }),
    SweetAlert2Module.forRoot(),
    CustomPipesModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AccountSettingsMgntModule { }
