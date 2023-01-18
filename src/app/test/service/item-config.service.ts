import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ItemConfigService {
  private statusSource = new BehaviorSubject(''); // set default status
  currentStatus = this.statusSource.asObservable();
  constructor() {}

  changeMessage(data: any) {
    this.statusSource.next(data);
  }
}
