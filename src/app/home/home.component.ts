import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  closeResult: string;
  user: Observable<firebase.User>;
  authenticated = false;
  constructor(private authService: AuthService) {
  }
    ngOnInit() {

    }
    


    login() {
      this.authService.login();
    }

    logout() {
      this.authService.logout();
    }

   
}



