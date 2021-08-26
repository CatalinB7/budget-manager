import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalLoadingService {
  loading$ = new BehaviorSubject<boolean>(false);
  shouldLoad = false;

  constructor() { }
  
  startLoading() {
    this.shouldLoad = true;

    setTimeout(() => {
      if(this.shouldLoad == true) {
        this.loading$.next(true);
      }
    }, 150);
  }

  stopLoading() {
    this.shouldLoad = false;
    this.loading$.next(false);
  }
}