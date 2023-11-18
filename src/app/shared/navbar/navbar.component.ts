import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  @ViewChild('sidebar') sidebar!: ElementRef;

  public userName='';
  public logoIcon:string = 'assets/img/logo/3.svg'
  public logOutIcon:string = 'assets/img/users/logout.svg'
  public userIcon:string = 'assets/img/icons/user.svg'
  public menuIcon:string = 'assets/img/icons/menu.svg'

  
  constructor(
    private router:Router,
    private AuthService:AuthService
    ) {
     
   }

  ngOnInit(): void {

    this.setUserName()
  }

  logout(){
    this.toggleMobileClass()
    this.AuthService.logout().then(() => {
      this.router.navigateByUrl("/login");
    });
  }

  setUserName(){
     let user = this.AuthService.user;
    this.userName = user?.username!;
  }

  toggleMobileClass() {
    if (this.sidebar) {
      this.sidebar.nativeElement.classList.toggle('mobile-hidden');
      this.sidebar.nativeElement.classList.toggle('mobile-show');
    }
  }

}