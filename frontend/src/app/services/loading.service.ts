import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  // Sets loading to true.
  showLoading() {
    this.isLoadingSubject.next(true);
  }

  // Sets loading to false.
  hideLoading() {
    this.isLoadingSubject.next(false);
  }

  // Returns isLoadingSubject as an Observable.
  get isLoading() {
    return this.isLoadingSubject.asObservable();
  }
}
