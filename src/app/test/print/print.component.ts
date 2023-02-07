import { ItemConfigService } from './../service/item-config.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jsPDF from 'jspdf'; // js pdf
import 'jspdf-autotable'; // pdf auto table
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  typeTableBody:any
  total:any


  
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private tableInfo: ItemConfigService
  ) { 

  }

  ngOnInit(): void {
    this.tableInfo.currentTotal.subscribe((e)=>{
  this.total =e
    })
    this.tableInfo.currentTable.subscribe((e)=>{
      this.typeTableBody = e
    })
  }
  onCreatePdf(action) {

    const div = document.getElementById("mytable");

    html2canvas(div).then((canvas) => {
      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('l', 'mm', 'a4');
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

}
