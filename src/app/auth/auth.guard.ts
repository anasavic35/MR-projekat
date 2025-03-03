/*import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return this.authService.isUserAuthenticated.pipe(take(1), tap(isAuthenticated =>{
      if(!isAuthenticated){
        this.router.navigateByUrl('/log-in');
      }
    }))
  }
 }*/
 import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isUserAuthenticated) {
      router.navigateByUrl('/log-in');
  }

  return authService.isUserAuthenticated;
}
