import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private AuthService:AuthService,
    private router:Router
  ){}

  canActivate(): Observable<boolean>  | boolean  {
    return this.AuthService.validateToken()
    .pipe(
      tap(
        valid => {
          if(!valid){
            this.router.navigateByUrl('/user')
          }
        }
      )
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.AuthService.validateToken().pipe(
      tap(
        valid => {
          if(!valid){
            this.router.navigateByUrl('/user')
          }
        }
      )
    );
  }
}