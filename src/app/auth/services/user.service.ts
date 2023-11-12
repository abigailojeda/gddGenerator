import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userStorage: any = {
    currentUser: {},
    disabledUser: false,
  };


  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:4000';

  constructor(
    private  httpClient:  HttpClient,
    ) { 
    if (localStorage.getItem('currentUserName')) {
      this.userStorage.currentUser = JSON.parse(
        localStorage.getItem('currentUserName') as string
      );
    }
  }

  private getOptions(token:any){

    let bearerAccess = 'Bearer ' + token;

    let options = {
      headers: {
        'Authorization' : bearerAccess,
        // 'Content-Type' : 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }


  getUsers(token:any) {
    let myOptions = this.getOptions(token);
    //console.log(myOptions)
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/users`, myOptions);


    // return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/users`, myOptions).pipe(
    //   tap(function (res) {
    //       console.log(res);
    //     })
    // );
  }
  getUserById(id:any) {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/users/${id}`);
  }

  setCurrentUser(user: any) {
    this.userStorage.currentUser = user;
    console.log(this.userStorage)
  }

  setCurrentId(id: number) {
    localStorage.setItem('currentId', id.toString())
  }

  deleteUserByID( id:any) {
    console.log('a borrar: ' , id)
    return this.httpClient.delete(`${this.AUTH_SERVER_ADDRESS}/api/users/${id}`);
  }
}