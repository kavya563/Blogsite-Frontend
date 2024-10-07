import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BlogSiteServiceService } from 'src/app/services/blog-site-service.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { MatSnackBar,MatSnackBarModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { RegisterUser } from 'src/app/modals/register-user.interface'

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: BlogSiteServiceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([{path:'login',component:LoginComponent}]),HttpClientTestingModule,OverlayModule,MatSnackBarModule],
      declarations: [ RegisterComponent,LoginComponent ],
      providers:[FormBuilder, BlogSiteServiceService,MatSnackBar],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have onSubmit function', () => {
    const spy = spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('should check invalid form', () => {
    component.UserRegister.controls['username'].setValue('');
    component.UserRegister.controls['password'].setValue('');
    component.UserRegister.controls['email'].setValue('');
    component.onSubmit();
    expect(component.UserRegister.valid).toBeFalsy();
  });

  it('should check valid form', () => {   
   let myService = TestBed.get(BlogSiteServiceService);
    component.UserRegister.controls['username'].setValue('sivapallem');
    component.UserRegister.controls['password'].setValue('password');
    component.UserRegister.controls['email'].setValue('siva@gmail.com');
   const spy= spyOn(myService,'register').and.returnValue(of({username:'siva',password:'password',email:'siva@gmail.com'}));
    myService.register({userName:'siva',password:'password',email:'siva@gmail.com'});
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
    expect(component.UserRegister.valid).toBeTruthy();
  }
  );

  
});
