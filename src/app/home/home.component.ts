import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: Observable<firebase.User>;
  authenticated: boolean = false;
  constructor(public af: AngularFireAuth) { 
    this.af.authState.subscribe(
      (auth) =>{
        if(auth != null){
          this.user = af.authState;
          this.authenticated = true;
        }
      }
    )
  }
  ngOnInit() {
    $(document).ready(function(){
      $("#flip").click(function(){
          $("#panel").toggle("slide");
      });
  });
  }
  login(){
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    this.authenticated = true;
  }

  logout(){
    this.af.auth.signOut();
    this.authenticated = false;
  }
}
