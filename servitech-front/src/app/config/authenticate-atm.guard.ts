import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateAtmGuard implements CanActivate {
  constructor(
    private router: Router,
    private settings: SettingsService,
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!localStorage.getItem('token')){
      this.settings.viewsnack('Debe iniciar sesion', 'Error');
      return this.router.navigateByUrl('/login');
    }
    if(localStorage.getItem('role') != '3'){
      this.settings.viewsnack('No tiene permisos para acceder', 'Error');
      return this.router.navigateByUrl('/dashboard');
    }
    if(!JSON.parse(localStorage.getItem('verify'))){
      this.settings.viewsnack('Debe verificarse', 'Error');
      return this.router.navigateByUrl('/verificacion');
    }

    return true
  }
  
}
