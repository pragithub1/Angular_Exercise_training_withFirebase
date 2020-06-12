import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.css']
})
export class NavigationListComponent implements OnInit{
  isAuth$ : Observable<boolean>;
  @Output() closeEvent = new EventEmitter<void>(); 
  constructor(private authService : AuthService, private store : Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose(){
  this.closeEvent.emit();
  }


  onLogout(){
    this.onClose();
    this.authService.logout();
  }

}
