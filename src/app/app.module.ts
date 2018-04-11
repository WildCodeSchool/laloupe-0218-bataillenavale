import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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
<<<<<<< HEAD
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
=======
import { MatchMakingComponent } from './matchmaking/matchmaking.component';
>>>>>>> dev
// import { MatchmakingComponent } from './matchmaking/matchmaking.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'boat-position', component: BoatPositionComponent },
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
    NgbModule.forRoot(),
    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [AuthService,NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
