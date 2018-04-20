import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// authentification firebase
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';

// Routing application
import { RouterModule, Routes } from '@angular/router';
import { BoatPositionComponent } from './boat-position/boat-position.component';
import { AuthService } from './auth.service';

import { MatchMakingComponent } from './matchmaking/matchmaking.component';

// import { MatchmakingComponent } from './matchmaking/matchmaking.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'boat-position/:id', component: BoatPositionComponent },
  { path: 'matchmaking', component: MatchMakingComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoatPositionComponent,
    MatchMakingComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),

    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
