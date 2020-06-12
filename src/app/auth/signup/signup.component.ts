import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromTraining from '../../training/training.reducer';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading$ : Observable<boolean>;
  maxDate;
  constructor(private authService : AuthService,
              private store : Store<fromTraining.State>) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onSignup(form : NgForm){
    // console.log(form);
    const email = form.value.email;
    const pass = form.value.password;
    const user = {
      email : email,
      password : pass
    }
    this.authService.registerUser(user);
  }

}
