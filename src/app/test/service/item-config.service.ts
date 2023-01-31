import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ItemConfigService {
  private statusSource = new BehaviorSubject(''); // set default status
  private totalPrice = new BehaviorSubject(0); // set default status
  currentStatus = this.statusSource.asObservable();
  currentTotal = this.totalPrice.asObservable();
  constructor() {}

  changeMessage(data: any) {
    this.statusSource.next(data);
  }
  changeTotal(data: any) {
    this.totalPrice.next(data);
  }
}
