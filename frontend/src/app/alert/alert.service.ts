import { Alert, AlertType } from './../model/alert';
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<Alert>();
    private keepAfterNavigationChange = false;
    private messageToDisplay: string;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single route change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(status: number, message: string, keepAfterNavigationChange = false) {
        this.messageToDisplay = this.getMessageFromErrorCode(status, message);
        this.alert(AlertType.Success, this.messageToDisplay, keepAfterNavigationChange);
    }

    error(status: number, message: string, keepAfterNavigationChange = false) {
        this.messageToDisplay = this.getMessageFromErrorCode(status, message);
        this.alert(AlertType.Error, this.messageToDisplay, keepAfterNavigationChange);
    }

    info(status: number, message: string, keepAfterNavigationChange = false) {
        this.messageToDisplay = this.getMessageFromErrorCode(status, message);
        this.alert(AlertType.Info, this.messageToDisplay, keepAfterNavigationChange);
    }

    warning(status: number, message: string, keepAfterNavigationChange = false) {
        this.messageToDisplay = this.getMessageFromErrorCode(status, message);
        this.alert(AlertType.Warning, this.messageToDisplay, keepAfterNavigationChange);
    }

    alert(type: AlertType, message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next(<Alert>{ type: type, message: message });
    }

    clear() {
        // clear alerts
        this.subject.next();
    }

    getMessageFromErrorCode(initialStatus: number, initalMessage: string): string {
        let newMessage: string;

        switch (initialStatus) {
            case 0: {
                newMessage = 'Le serveur est injoignable, merci de réessayer ultérieurement.';
                break;
             }
            case 401: {
                switch (initalMessage) {
                    case 'User is disabled': {
                        newMessage = 'L\'utilisateur est désactivé.';
                        break;
                    }
                    case 'Bad credentials': {
                        newMessage = 'Utilisateur et/ou mot de passe erroné(s).';
                        break;
                    }
                    default: {
                        if (initalMessage === '') {
                            newMessage = 'Vous avez été déconnecté.';
                        } else {
                            newMessage = initalMessage;
                        }
                        break;
                    }
                }
               break;
            }
            case 403: {
               newMessage = 'Vous n\'êtes pas autorisé à accéder à cette ressource.';
               break;
            }
            default: {
               newMessage = initalMessage;
               break;
            }
         }
         return newMessage;
    }
}
