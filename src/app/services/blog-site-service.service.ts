import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { LoginCredentials } from '../modals/login-credentials.interface';
import { RegisterUser } from '../modals/register-user.interface';
import { Blogs,CreateBlog } from '../modals/blogs.interface';

const httpOptions1 = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "",
  }),
};

@Injectable({
  providedIn: 'root'
})
export class BlogSiteServiceService {
  private readonly baseUrl = 'http://localhost:8082/blogsite/user/blogs';
  private readonly blogUrl = 'http://localhost:8083/api/v1.0/blogsite/user';
  private readonly blogSearchUrl = 'http://localhost:8083/api/v1.0/blogsite/blogs';
  loggedIn: boolean;
  constructor(private httpClient: HttpClient) { }

  checkUserCredentials(value: LoginCredentials): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/signin`, value)
      .pipe(catchError(this._handleError));;
  }

  public storeUserData(
    username: string,
    authorization: string
  ) {
    localStorage.setItem("loginId", username);
    localStorage.setItem("authorization", authorization);
  }

  public logout() {
    localStorage.removeItem("loginId");
    localStorage.removeItem("authorization");
  }

  public getToken1() {
    return this.httpClient
      .get(`${this.baseUrl}/jwt/authentication`)
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))))
      .pipe(catchError(this._handleError));;
  }
  public getToken(): Observable<{ token: string }> {
    return this.httpClient
        .get<{ token: string }>(`${this.baseUrl}/jwt/authentication`)
        .pipe(
            map((data) => {
                console.log("token in getToken()", data.token); // Log the token
                localStorage.setItem("authorization", data.token); // Store the token
                return data; // Return the entire data object
            }),
            catchError(this._handleError)
        );
}


  public register(userInfo: RegisterUser): Observable<any> {
    return this.httpClient
      .post(this.baseUrl + "/signup", userInfo, httpOptions1)
      .pipe(catchError(this._handleError));
  }

  public isLoggedIn() {
    if (localStorage.getItem("loginId")) {
      return true;
    } else {
      return false;
    }

  }

  public saveBlogDetails(blogDetails: CreateBlog): Observable<any> {
    const blog = {
      blogname:blogDetails.blogname,
      article: blogDetails.article,
      authorname: blogDetails.authorname,
      category: blogDetails.category,
      
    }
    const token = localStorage.getItem("authorization");
    console.log('Authorization Token in saveBlogDetails:', token);
    return this.httpClient.post(`${this.blogUrl}/blogs/add`, blog, {
      headers: {
        Authorization: `Bearer ${token}`, 
        userName: localStorage.getItem("loginId"),
      },
    }).pipe(catchError(this._handleError));;
  }

  public getAllBlogs(): Observable<Blogs[]> {
    return this.httpClient.get<Blogs[]>(`${this.blogUrl}/getall`);
  }

  public searchBlogs(category: string, fromDate: string, toDate: string): Observable<Blogs[]> {
    return this.httpClient.get<Blogs[]>(`${this.blogSearchUrl}/info/${category}/${fromDate}/${toDate}`)
      .pipe(catchError(this._handleError));;
  }

  public searchBlogsByCategory(category: string): Observable<Blogs[]> {
    return this.httpClient.get<Blogs[]>(`${this.blogSearchUrl}/info/${category}`)
      .pipe(catchError(this._handleError));;
  }

  public getMyBlogs1(): Observable<Blogs[]> {
    return this.httpClient.get<Blogs[]>(`${this.blogUrl}/getMyBlogs`)
      .pipe(catchError(this._handleError));;
  }

  public getMyBlogs(): Observable<Blogs[]> {
    const token = localStorage.getItem("authorization");
    return this.httpClient.get<Blogs[]>(`${this.blogUrl}/getMyBlogs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).pipe(catchError(this._handleError));
  }
  

  public deleteBlog(blogname: string): Observable<any> {
    const token = localStorage.getItem("authorization");
    return this.httpClient.delete(`${this.blogUrl}/blogs/delete/${blogname}`, {
      headers: {
        Authorization: token,
        userName: localStorage.getItem("loginId"),
      },
    }).pipe(catchError(this._handleError));
  }

  public _handleError(error: any) {
    const err = {} as any;
    if (error.error instanceof ErrorEvent) {
      err.message = error.error.message;
      err.type = error.error.type;
      err.status = error.error.status;
    } else {
      err.message = error.message;
      err.status = error.response ? error.response.status : error.status;
      const { data } = error.response ? error.response : error;
      if (data) {
        err.data = data;
      }
    }
    return throwError(err);
  }
}
