import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap } from  'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class GameService {
  
    private AUTH_SERVER_ADDRESS:  string  =  environment.baseUrl;
    private userId:string | null = ''

    constructor(
      private HttpClient: HttpClient,
    ) { 
      this.userId = localStorage.getItem('user') || '';
          console.log('AAAA:',this.userId)

    }

    public getProjects(){
      console.log('aqui')
        const url = `${this.AUTH_SERVER_ADDRESS}/gdd/${this.userId}`;
        return this.HttpClient.get(url)
      }

  }