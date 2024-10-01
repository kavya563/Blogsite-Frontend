import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogSiteServiceService } from '../../services/blog-site-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserLogin: FormGroup;
  submitted = false;
  invalid: string;
  message: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private blogSiteServiceService: BlogSiteServiceService,
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('loginId')) {
      this.router.navigateByUrl('/home');
    } else {
      
      this.UserLogin = this.fb.group({
        username: [
          '',
          [
            Validators.required,
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
      //if (this.router.getCurrentNavigation()) {

      //console.log(this.message);
      //  }
    }
  }
 
  OnSubmit() {
    this.submitted = true;
    if (this.UserLogin.invalid) {
        return;
    }

    this.blogSiteServiceService.checkUserCredentials(this.UserLogin.value).subscribe(
        (data) => {
            this.blogSiteServiceService.getToken().subscribe(
                (tokenResponse) => {
                    const authorization = tokenResponse.token; // Ensure you access the token correctly
                    this.blogSiteServiceService.storeUserData(data.username, authorization);
                    console.log('Stored Token:', localStorage.getItem('authorization')); // Check stored token
                    this.router.navigateByUrl('/home');
                },
                (err) => {
                    alert(err.message);
                }
            );
        },
        (error) => {
            if (error && error.message.includes('400')) {
                this.invalid = 'Invalid Credentials';
            } else {
                alert(error.message);
            }
        }
    );
}



}
