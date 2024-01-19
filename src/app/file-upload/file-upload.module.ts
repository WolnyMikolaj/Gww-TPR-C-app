import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [CommonModule],
  exports: [FileUploadComponent]  // Ensure it's exported
})
export class FileUploadModule { }
