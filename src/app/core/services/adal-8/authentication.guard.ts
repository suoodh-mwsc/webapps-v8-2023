import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Adal8Service } from 'adal-angular8';
import { TokenStorageService } from '../token/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn = false;

  constructor(
    private _router: Router,
    private _adalService: Adal8Service,
    private _tokenStorageService: TokenStorageService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard.canActivate');

    if (this._adalService.userInfo.token) {
      console.log('AuthGuard - canActivate -> isLoggedIn :: True', 'Ok');
      return true;
    } else {
      console.log('AuthGuard - canActivate -> isLoggedIn :: False', 'Not So Ok');
      this._router.navigate(['/welcome'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
