import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsFormComponent } from 'src/app/components/details-form/details-form.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DetailsSubcategoryComponent } from 'src/app/components/details-subcategory/details-subcategory.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    DetailsComponent,
    DetailsFormComponent,
    DetailsSubcategoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [DetailsComponent],
})
export class DetailsModule {}
