import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });;
  public loginError:string = '';
  public logoPale:string = '';
  public logoShort:string = '';
  public passStyle:string='fill: #66636F';
  public showPass:boolean=false;

  constructor(
    private router:Router,
    public formBuilder: FormBuilder,
    private authService: AuthService
    ) { 
    }

 

  ngOnInit(): void {
    this.logoPale = 'assets/img/logo/BerryLogoPale.svg';
    this.logoShort = 'assets/img/logo/BerryLogoColorShort.svg';
   
  }
  public tooglePass(){
    this.showPass = !this.showPass;
    !this.showPass ? this.passStyle='fill: #66636F;' : this.passStyle='fill: #d9d9d9;'
  } 

  public login(){
  
    let user: User = {
      id: null!,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      username:null!
    };

    this.authService.login(user)
    .subscribe(res=>{
      console.log('dbdb', res)
      if(res === true){
        this.router.navigate(['/home'])
      }else{
        console.log('dbdb', res)

        if(res?.error?.msg){
          this.loginError=res.error.msg;
        }else{
          this.loginError='wrong email or password';
        }
      }
    })

  }


}