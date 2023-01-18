import { ItemConfigService } from './../service/item-config.service';
import { ConfirmBoxDialogComponent } from './../common/confirm-box-dialog/confirm-box-dialog.component';
import { ToastrService } from 'ngx-toastr';
import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  Inject,
} from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  displayedColumns: string[] = ['position', 'typeName', 'itemName', 'action'];

  typeTableBody: any = [];
  dataSource!: MatTableDataSource<any>;
  updataData: string;
  @Inject(MAT_DIALOG_DATA) public editData: any;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private data: ItemConfigService,
    private toastr: ToastrService
  ) {}

  openDialog() {
    this.dialog
      .open(DialogElementsExampleDialog)
      .afterClosed()
      .subscribe(() => {
        this.getAllItems();
      });
  }

  ngOnInit(): void {
    const oldRecord = localStorage.getItem('itemList');
    if (oldRecord) {
      this.typeTableBody = JSON.parse(oldRecord);
      console.log(JSON.parse(oldRecord));
    }
  }

  getAllItems() {
    const oldRecord = localStorage.getItem('itemList');
    if (oldRecord) {
      this.typeTableBody = JSON.parse(oldRecord);
    }
  }

  handleDelete(row, i) {
    console.log('dlt');
    const dialogConfig = new MatDialogConfig();
    console.log(dialogConfig);
    dialogConfig.data = {
      confirmMessage: 'Are you sure you want to Delete?',
    };
    this.dialog
      .open(ConfirmBoxDialogComponent, {
        data: { ...row, id: i },
      })
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          const oldRecord = localStorage.getItem('itemList');
          if (oldRecord !== null) {
            const itemList = JSON.parse(oldRecord);
            itemList.splice(i, 1);
            localStorage.setItem('itemList', JSON.stringify(itemList));
            this.toastr.error('Successfully Delete!', 'Delete a item!', {
              timeOut: 2000,
            });
            this.getAllItems();
          }
        }
      });
  }
  handleEdit(row: any, i: any) {
    this.dialog
      .open(DialogElementsExampleDialog, {
        data: { ...row, id: i },
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllItems();
      });
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  type: string;
  action: string;
}

// dialogo component

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../common/common-modal/dialog-elements-example-dialog.html',
  styleUrls: ['./item.component.css'],
})
export class DialogElementsExampleDialog {
  selected = 'option1';
  type: any;
  typesControl = new FormControl(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  types = ['Dog', 'Cat', 'Cow', 'Fox'];
  typeTableBody = [];

  actionBtn: string = 'Save';
  modalHeader: string = 'Add configuration';
  error: string = '';
  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    private formBuilder: FormBuilder,
    private data: ItemConfigService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}
  ngOnInit(): void {
    this.type = this.formBuilder.group({
      typeName: ['', Validators.required],
      itemName: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = 'Update';
      this.modalHeader = 'Update configuration';
      this.type.controls['typeName'].setValue(this.editData.typeName);
      this.type.controls['itemName'].setValue(this.editData.itemName);
    }
  }

  getAllItems() {
    const oldRecord = localStorage.getItem('itemList');
    if (oldRecord) {
      this.typeTableBody = JSON.parse(oldRecord);
    }
  }
  saveItemTypesData() {
    if (!this.editData) {
      if (this.type.value.typeName && this.type.value.itemName) {
        this.data.changeMessage(this.type.value);
        const latestId = this.getItemId();
        this.type.value = { ...this.type.value, id: latestId };
        // this.toastr.success('Hello world!', 'Toastr fun!');
        this.toastr.success('A Sucessfully Created!', 'Added a new item!', {
          timeOut: 2000,
        });
        const oldRecord = localStorage.getItem('itemList');
        if (oldRecord !== null) {
          const itemList = JSON.parse(oldRecord);
          itemList.push(this.type.value);
          localStorage.setItem('itemList', JSON.stringify(itemList));
        } else {
          const itemArr = [];
          itemArr.push(this.type.value);
          localStorage.setItem('itemList', JSON.stringify(itemArr));
        }
      } else {
        this.error = 'Please fill all the required filed';
      }
      this.dialogRef.close('save');
    } else {
      this.updateTypeConfig(this.type.value);
    }
  }

  updateTypeConfig(data) {
    const clickId = this.editData.id + 1;
    const updateData = { ...data, id: clickId };
    const oldRecord = localStorage.getItem('itemList');
    if (oldRecord !== null) {
      const itemList = JSON.parse(oldRecord);
      itemList.splice(clickId - 1, 1, updateData);
      localStorage.setItem('itemList', JSON.stringify(itemList));
      this.data.changeMessage(itemList);
      this.toastr.info('Successfully Updated!', 'Update item!', {
        timeOut: 2000,
      });
    }

    this.onNoClick();
  }

  handleDelete(data, i) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getItemId() {
    const oldRecord = localStorage.getItem('itemList');
    if (oldRecord !== null) {
      const itemList = JSON.parse(oldRecord);
      return itemList.length + 1;
    } else {
      return 1;
    }
  }
}
