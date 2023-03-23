import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SaveButtonComponent } from 'src/app/components/save-button/save-button.component';

@NgModule({
  declarations: [SharedComponent, HeaderComponent, SaveButtonComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, SaveButtonComponent],
})
export class SharedModule {}
