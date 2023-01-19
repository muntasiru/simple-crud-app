import { ConfirmBoxDialogComponent } from './common/confirm-box-dialog/confirm-box-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ItemComponent,
  DialogElementsExampleDialog,
} from './item/item.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    ItemComponent,
    DialogElementsExampleDialog,
    ConfirmBoxDialogComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    NgxPaginationModule,
  ],
  exports: [ItemComponent],
})
export class TestModule {}
