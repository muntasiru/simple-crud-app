import { ItemConfigService } from './../service/item-config.service';
import { ConfirmBoxDialogComponent } from './../common/confirm-box-dialog/confirm-box-dialog.component';
import { ToastrService } from 'ngx-toastr';
import {
  Component,
  ViewChild,
  OnInit,
  Inject,
  ElementRef,
} from '@angular/core';
import jsPDF from 'jspdf'; // js pdf
import 'jspdf-autotable'; // pdf auto table
import html2canvas from 'html2canvas';

import { FormControl, Validators, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'price', 'discount', 'total']; // table columns
  typeTableBody: any = []; //all item list
  dataSource!: MatTableDataSource<any>;
  p: any = 1;
  currentIndex: number = 0;
  updataData: string; // after update
  @Inject(MAT_DIALOG_DATA) public editData: any; //inject dialog data
  // @ViewChild('my-table', { static: false }) el!: ElementRef; //html table refference
  @ViewChild('mytable', { 'static': true }) mytable:ElementRef;

  noDiscountTotal: any;
  noDiscount: any;
  withDiscount: number;
  totalDiscount: number;

  constructor(public dialog: MatDialog, private toastr: ToastrService) {}
  //dialog open
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
      let finalData = JSON.parse(oldRecord);
      this.typeTableBody = finalData;
    }
    this.noDiscountPrice();
    this.totalDiscountPrice();
    this.withDiscountPrice();
  }
  // get all item from local
  getAllItems() {
    const oldRecord = localStorage.getItem('itemList');
    if (oldRecord) {
      this.typeTableBody = JSON.parse(oldRecord);
    }
    this.noDiscountPrice();
    this.totalDiscountPrice();
    this.withDiscountPrice();
  }
  //delete item
  handleDelete(row, i) {
    console.log('dlt', row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      confirmMessage: `Are you sure you want to Delete ${row.productName}? `,
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
  //edit item
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
  // create and view pdf
  // onCreatePdf(action) {
  //   var doc = new jsPDF();
  //   (doc as any).autoTable({ html: '#mytable' });
  //   // (doc as any).autoTable(columns, [this.typeTableBody]);
  //   if (action == 'download') {
  //     doc.save('sample.pdf');
  //   } else {
  //     doc.output('dataurlnewwindow');
  //   }
  // }

  onCreatePdf(action) {

    const div = document.getElementsByTagName('tr');
    const newDiv = Array.from(div).map((e)=> e.lastChild)
    Array.from(newDiv).map((e)=> e.remove())
    const final = document.getElementById('mytable');

   
  
    const options = {
      background: 'black',
      scale: 3
    };

    html2canvas(final, options).then((canvas) => {
      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('l', 'mm', 'a4', true);
      // Add image Canvas to PDF
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    }).then((doc) => {
     
      if (action == 'download') {
           doc.save('sample.pdf');
           location.reload();
           } else {
            doc.output('dataurlnewwindow');
            location.reload();
          }    });
          
  }




  noDiscountPrice() {
    let sum = 0;
    const oldRecord = localStorage.getItem('itemList');
    let final = JSON.parse(oldRecord);
    final.map((x) => (sum += x.price));
    this.noDiscount = sum;
  }
  withDiscountPrice() {
    let sum = 0;
    const oldRecord = localStorage.getItem('itemList');
    let final = JSON.parse(oldRecord);
    final.map((x) => (sum += x.total));
    this.withDiscount = sum;
  }
  totalDiscountPrice() {
    let sum = 0;
    const oldRecord = localStorage.getItem('itemList');
    let final = JSON.parse(oldRecord);
    final.map((x) => (sum += x.discount));
    this.totalDiscount = sum;
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  type: string;
  action: string;
}

////////////dialog ////////////

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.html',
  styleUrls: ['./item.component.css'],
})
export class DialogElementsExampleDialog {
  selected = 'option1';
  type: any;
  typesControl = new FormControl(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  types = ['Shirt', 'Pant', 'T-Shirt', 'Shoe'];
  typeTableBody = [];
  actionBtn: string = 'Save';
  modalHeader: string = 'Add configuration';
  error: string = '';
  noDiscount: any[];

  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    private formBuilder: FormBuilder,
    private data: ItemConfigService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}
  ngOnInit(): void {
    this.type = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      total: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = 'Update';
      this.modalHeader = 'Update configuration';
      this.type.controls['productName'].setValue(this.editData.productName);
      this.type.controls['price'].setValue(this.editData.price);
      this.type.controls['discount'].setValue(this.editData.discount);
      this.type.controls['total'].setValue(this.editData.total);
    }
  }
  //get item
  getAllItems() {
    const oldRecord = localStorage.getItem('itemList');
    if (oldRecord) {
      this.typeTableBody = JSON.parse(oldRecord);
    }
  }
  //save item
  saveItemTypesData() {
    if (!this.editData) {
      if (this.type.value.productName) {
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
  //update item
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
  //remove modal
  onNoClick(): void {
    this.dialogRef.close();
  }
  //set item id
  getItemId() {
    const oldRecord = localStorage.getItem('itemList');
    if (oldRecord !== null) {
      const itemList = JSON.parse(oldRecord);
      return itemList.length + 1;
    } else {
      return 1;
    }
  }
  //dicount calculate
  price(e) {
    this.type.get('total').setValue(e.target.value);
  }
  discounts(e) {
    var fee = this.type.get('price').value;
    var discount = e.target.value;
    var total = fee - discount;
    this.type.get('total').setValue(total);
  }
}
