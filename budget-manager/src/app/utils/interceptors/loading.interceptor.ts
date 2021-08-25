import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoadingService } from '../services/loading.service';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptorService {

    isPending = true;
    activeRequests = 0;

    constructor(
        private _loadingScreenService: LoadingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.isPending = true;

        if (this.activeRequests === 0) {
            setTimeout(() => {
                if(this.isPending) {
                    this._loadingScreenService.startLoading();
                }
            }, 500);
        }

        this.activeRequests++;

        return next.handle(request).pipe(
            finalize(() => {
                this.activeRequests--;
                this.isPending = false;
                if (this.activeRequests === 0) {
                    this._loadingScreenService.stopLoading();
                }
            })
        )
    };
}