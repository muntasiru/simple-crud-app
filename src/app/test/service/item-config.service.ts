import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ItemConfigService {
  private statusSource = new BehaviorSubject(''); // set default status
  private tableSource = new BehaviorSubject(''); // set default status
  private tableTotal = new BehaviorSubject(''); // set default status

  currentStatus = this.statusSource.asObservable();
  currentTable = this.tableSource.asObservable();
  currentTotal = this.tableTotal.asObservable();

  constructor() {}

  changeMessage(data: any) {
    this.statusSource.next(data);
  }
  changeTable(data: any) {
    this.tableSource.next(data);
  } 
  changeTotal(data: any) {  
    this.tableTotal.next(data);
  }
}
