import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAuthenticated()) {
        return true;
      }
      let routeParameter = '';
      if (state.url !== '/login' && state.url !== '/' && state.url !== '') {
        routeParameter = '?returnUrl=' + state.url;
      }
      return this.router.parseUrl('/login' + routeParameter);
  }

}
