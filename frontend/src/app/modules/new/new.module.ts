import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NewComponent } from 'src/app/components/new/new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { NewCategoryComponent } from 'src/app/components/new-category/new-category.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NewComponent, NewCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
  ],
  exports: [NewComponent],
})
export class NewModule {}
