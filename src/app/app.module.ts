import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './containers/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { StarsComponent } from '../stars/stars.component'
import { ResidentsComponent } from '../residents/residents.component'

// feature modules
import { AuthModule } from './../auth/auth.module';

// services
import { StarService } from '../stars/services/stars.service';

// material
import { MatDialogModule } from '@angular/material';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'personajes' },
  { path: 'personajes', component: StarsComponent },
  { path: 'residentes', component: ResidentsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    StarsComponent,
    ResidentsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    StarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
