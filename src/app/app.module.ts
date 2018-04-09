import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// authentification firebase
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from '../environments/environment';

// Routing application
import { RouterModule, Routes } from '@angular/router';
import { BoatPositionComponent } from './boat-position/boat-position.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'boat-position', component: BoatPositionComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoatPositionComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
