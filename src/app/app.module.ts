import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { NavigationListComponent } from './navigation/navigation-list/navigation-list.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { environment } from '../environments/environment';
import { UiService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { TrainingModule } from './training/training.module';
import { reducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    NavigationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    SharedModule,
    TrainingModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, TrainingService, UiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
