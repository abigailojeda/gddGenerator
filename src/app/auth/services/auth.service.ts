import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from '../interfaces/user';
import { AuthResponse } from '../interfaces/auth-response';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from  'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_SERVER_ADDRESS:  string  =  environment.baseUrl;
  private _user!:User;

  get user(){
    return {...this._user};
  }

  constructor(
    private httpClient: HttpClient,
    private UserService: UserService
  ) { }

  register(user:User){
    const url = `${this.AUTH_SERVER_ADDRESS}/auth/signup`
    const body = user;

    return this.httpClient.post<AuthResponse>(url,user)
    .pipe(
      tap(res => {
        if(res.ok){
          localStorage.setItem('token', res.token!)
          this._user = {
            username: res.username!,
            id: res.id!,
          }
        }
      }),
      map(res => res.ok),
      //to be able to subscribe, itcannot be a boolean, use of() to make an observable
      catchError(err => of(err.error))
    );
  }

  login(user:User){
    const url = `${this.AUTH_SERVER_ADDRESS}/auth/signin`
    const body = user;

    return this.httpClient.post<AuthResponse>(url,user)
    .pipe(
      tap(res => {
        if(res.ok){
          localStorage.setItem('token', res.token!)
          this._user = {
            username: res.username!,
            id: res.id!,
          }
        }
      }),
      map(res => res.ok),
      //to be able to subscribe, itcannot be a boolean, use of() to make an observable
      catchError(err => of(err.error))
    );
  }

  validateToken():Observable<boolean>{
    const url = `${this.AUTH_SERVER_ADDRESS}/auth/token`;
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

    return this.httpClient.get<AuthResponse>(url, {headers})
    .pipe(
      map(res =>{
        localStorage.setItem('token', res.token!)
        this._user = {
          username: res.username!,
          id: res.id!,
        }
        return res.ok
      }),
      catchError(err => of(false))
    )
  }

  async logout() {
     localStorage.removeItem("token");
  }


}

