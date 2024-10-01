import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Blogs } from 'src/app/modals/blogs.interface';
import { BlogSiteServiceService } from 'src/app/services/blog-site-service.service';
import { SuccessModalComponent } from 'src/app/success-modal/success-modal.component';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {
  submitted = false;

  blogForm: FormGroup;
  allBlogs: any[] = [];
  displayStyle = "none";
  showAllBlogs = false; 
  activetab = 'all-blogs';
  previousTabName: string; 
  categories: string[] = ['FOOD', 'TRAVEL', 'FASHION','HEALTH'];
  search: string = '';
  toDate: string = '';
  fromDate: string = '';
  selectedCategory: string = '';

  @ViewChild(SuccessModalComponent, { static: false }) successModal: SuccessModalComponent;

  constructor(private fb: FormBuilder, private blogSiteService: BlogSiteServiceService) {
    
  }
  ngOnInit() {
    this.blogForm = this.fb.group({
      blogname: ['', [Validators.required, Validators.maxLength(1000),Validators.required]],
      article: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(1000),Validators.required]],
      authorname: ['', [Validators.required]],
      category: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(20)]],
    });
  }
 

  refreshData() {
    this.clearFilters();
    this.showAllBlogs = !this.showAllBlogs; // Toggle the flag
    this.activetab = 'all-blogs'

    if (this.showAllBlogs) {
        this.blogSiteService.getAllBlogs().subscribe(
            data => {
                console.log('Fetched blogs:', data); // Log the fetched data
                this.allBlogs = data; 
            },
            error => {
                console.error('Error fetching blogs:', error);
            }
        );
    }
    else {
      this.allBlogs = []; // Clear displayed blogs when closing
  }
}


openPopup(tabName: string) {
  this.displayStyle = "block";
  this.blogForm.reset();
  this.previousTabName = this.activetab;
  this.activetab = tabName;
}

closePopup() {
  this.activetab = this.previousTabName;
  this.displayStyle = "none";
}
onSubmit() {
  console.log("Submit called");
  this.submitted = true;

  if (this.blogForm.invalid) {
      console.log(this.blogForm.value);
      console.log(this.blogForm.valid, this.blogForm.errors);
      return; // Prevent submission if the form is invalid
  }

  console.log(this.blogForm.value);

  this.blogSiteService.saveBlogDetails(this.blogForm.value).subscribe(
      response => {
          console.log('Blog added successfully:', response);
          this.openSuccessModal('Blog added successfully!'); // Open success modal
          this.closePopup(); // Close the "Add Blog" popup
          this.blogForm.reset(); // Reset the form after submission
          this.submitted = false; // Reset submission state
      },
      error => {
        console.error('Error adding blog:', error);
        if (error.error.message === 'Blog name already exists') {
          this.blogForm.value['blogname'].setErrors({ exists: true }); // Set custom error
        }
        this.openSuccessModal('Failed to add blog: ' + (error.error.message || 'Unknown error')); // Handle error message
      }
  );
}
openSuccessModal(message: string) {
  this.successModal.open(message);
  
}
viewMyBlogs() {
  this.clearFilters();
  
  if (this.activetab === 'my-blogs') {
  
    this.allBlogs = []; 
    this.activetab = 'all-blogs'; 
    this.showAllBlogs = false; 
  } else {
    
    this.blogSiteService.getMyBlogs().subscribe(
      data => {
        this.allBlogs = data; 
        this.showAllBlogs = false; 
        this.activetab = 'my-blogs'; 
      },
      error => {
        console.error('Error fetching my blogs:', error);
        alert('Failed to load your blogs: ' + (error.error.message || 'Unknown error'));
      }
    );
  }
}

confirmDelete(blogname: string) {
  if (confirm('Are you sure you want to delete this blog?')) {
    this.deleteBlog(blogname);
  }
}
deleteBlog(blogname: string) {
  this.blogSiteService.deleteBlog(blogname).subscribe(
    response => {
      this.allBlogs = this.allBlogs.filter(blog => blog.blogname !== blogname);
      this.openSuccessModal(`Your blog  deleted successfully`);
      
    },
    error => {
      console.error('Error deleting blog:', error);
      
      
    }
  );
}

searchBlogs() {
  if (this.selectedCategory && this.fromDate) {
    if (!this.toDate) {
      this.toDate = new Date().toISOString().split('T')[0];
    }
    this.blogSiteService.searchBlogs(this.selectedCategory, this.fromDate, this.toDate).subscribe((data) => {
      this.allBlogs = data;
    })
  }
  else {
    this.blogSiteService.searchBlogsByCategory(this.selectedCategory).subscribe((data) => {
      this.allBlogs = data;
    })
  }
}

clearFilters(){
  this.selectedCategory = '';
  this.toDate =  '';
  this.fromDate = '';
}


showSuccessMessage(message: string) {
  alert(message); 
 
}


}

