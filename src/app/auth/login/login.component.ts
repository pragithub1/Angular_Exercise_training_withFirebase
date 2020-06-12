import { Component, OnInit } from '@angular/core';
import {  Observable } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading$ : Observable<boolean>;
  constructor(private authService : AuthService,
              private uiService : UiService,
              private store : Store<fromRoot.State>) { }

  ngOnInit() {
    // this.loadingSub = this.uiService.loadingChanged.subscribe(isloading => {
    //   this.isLoading = isloading;
    // });
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onLogin(formData){
    this.authService.login({
      email : formData.value.email,
      password : formData.value.password
    });
  }

  // ngOnDestroy(){
  //   if(this.loadingSub){
  //     this.loadingSub.unsubscribe();
  //   }
  // }

}
