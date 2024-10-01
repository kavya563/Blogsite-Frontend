import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { BlogDashboardComponent } from './components/blog-dashboard/blog-dashboard.component';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './pipes/date-pipe/date-format.pipe';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';
import { SuccessModalComponent } from './success-modal/success-modal.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BlogDashboardComponent,
    DateFormatPipe,
    NavBarComponent,
    SuccessModalComponent
  ],
  exports:[AppComponent,
    LoginComponent,
    RegisterComponent,
    BlogDashboardComponent,
    DateFormatPipe,
    NavBarComponent,
  ],
  providers: [HttpClientModule,ReactiveFormsModule,FormsModule,CommonModule,NavBarComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
