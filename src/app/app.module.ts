import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './containers/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { UsersComponent } from '../users/users.component';
import { CatalogsComponent } from './../catalogs/catalogs.component';

// feature modules
import { AuthModule } from './../auth/auth.module';

// services
import { UsersService } from './../users/services/users.service';
import { CatalogsService } from './../catalogs/services/catalog.service';

// material
import { MatDialogModule } from '@angular/material';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'users', component: UsersComponent },
  { path: 'catalogs', component: CatalogsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    UsersComponent,
    CatalogsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    MatDialogModule
  ],
  providers: [
    UsersService,
    CatalogsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
