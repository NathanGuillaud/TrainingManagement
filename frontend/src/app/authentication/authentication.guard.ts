import { AlertService } from './../alert/alert.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

@Injectable()
export class AuthenticationGuard implements CanActivate {
 isLoggedIn: boolean;

 constructor(public authService: AuthenticationService,
    private router: Router,
    private alertService: AlertService,
    private location: Location) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // this will be passed from the route config from the data property
        const expectedRole = route.data.expectedRole;

        let authorityValidated = false;
        switch (expectedRole) {
            case 'ADMIN': {
                if (this.authService.isAdmin()) {
                    authorityValidated = true;
                }
                break;
            }
            case 'USER': {
                if (this.authService.isUser()) {
                    authorityValidated = true;
                }
                break;
            }
            default: {
                break;
            }
        }

        this.authService.isLoggedIn.subscribe(value => this.isLoggedIn = value);
        // If member is logged in and role is compliant with route OR if member is logged (no role to be checked)
        if (this.isLoggedIn && ((authorityValidated && expectedRole != null) || (expectedRole == null))) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        if (!this.isLoggedIn) {
            if (state.url !== '/') {
                this.alertService.warning(401, 'Vous n\'êtes pas ou plus connecté.', true);
            }
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        }

        // Member is logged but authorization is denied for route
        if (this.isLoggedIn && ((!authorityValidated && expectedRole != null))) {
            this.alertService.warning(401, 'Vous n\'êtes pas autorisé à accéder à cette ressource.', true);
            this.router.navigate(['/']);
        }

        return false;
    }
}
