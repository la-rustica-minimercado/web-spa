import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../interface/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild('navBar') navBar: ElementRef;

  public showNavbar: boolean = false;
  public isAuthenticated: boolean = false;
  public userInfo: User | null = null;

  constructor(private router: Router, public authService: AuthenticationService) {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userInfo = this.authService.getUserInfo();
    this.authService.getLogoutSubject().subscribe({
      next: value => {
        if (value) {
          this.isAuthenticated = false;
          this.userInfo = null;
        }
      }
    })
  }

  navbarBtnClick() {
    this.showNavbar = !this.showNavbar;
    if (this.navBar) {
      if (this.showNavbar) {
        this.navBar.nativeElement.classList.add('show');
      } else {
        this.navBar.nativeElement.classList.remove('show');
      }
    }
  }

  logout() {
    this.navbarBtnClick();
    this.authService.logout();
    this.router.navigate(['/login-vendedor']);
  }

}
