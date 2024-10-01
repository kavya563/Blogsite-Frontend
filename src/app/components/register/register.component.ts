import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogSiteServiceService } from '../../services/blog-site-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  UserRegister: FormGroup;
  submitted = false;
  message: string;
  constructor(private fb: FormBuilder, private blogSiteServiceService: BlogSiteServiceService, private router: Router,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.UserRegister = this.fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z ]*')],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
    );
  }
 

  onSubmit() {
    const CurrentTimeStamp = new Date().toISOString();
   console.log("entered into on submit")
    this.submitted = true;
    if (this.UserRegister.invalid) {
      console.log("Form is invalid");
      return;
    }
    console.log("before submitting",this.UserRegister.value);
    this.blogSiteServiceService.register(this.UserRegister.value).subscribe(
      (data) => {
        console.log("User registered successfully");
        this.router.navigateByUrl('/login')
      
      },
      (error) => {
        console.log("Inside error callback");
      console.error("Error during registration", error);
      if (error.status === 400 || error.status === 409) {
        this.message = error.error.message || "An error occurred"; // Adjusting to read message from JSON response
      } else {
        this.message = "An unexpected error occurred.";
      }
    }
    );
    console.log("API call made, waiting for response...");
  }
 

}
