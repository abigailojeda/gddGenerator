import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  public registerForm: FormGroup  = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]],
    username: ['',[Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public logoPale:string = '';
  public logoShort:string = '';
  public passStyle:string='fill: #66636F';
  public showPass:boolean=false;
  public loginError:string = '';
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

  public register(){
  
    let user: User = {
      id: null!,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      username:this.registerForm.value.username
    };

    this.authService.register(user)
    .subscribe(res=>{
      console.log('dbdb', res)
      if(res === true){
        this.router.navigate(['/login'])
      }else{
        console.log('dbdb', res)

        if(res?.error?.msg){
          this.loginError=res.error.msg;
        }else{
          this.loginError='All fields are required';
        }
      }
    })

  }

  public tooglePass(){
    this.showPass = !this.showPass;
    !this.showPass ? this.passStyle='fill: #66636F;' : this.passStyle='fill: #d9d9d9;'
  }
 

}