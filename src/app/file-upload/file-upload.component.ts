// In file-upload.component.ts
import { Component } from '@angular/core';
import { FileProcessingService } from '../file-processing.service';
import { error } from 'console';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  taxNumber: string = '';

  constructor(private FileProcessingService: FileProcessingService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.FileProcessingService.extractDataFromExcel(file, this.taxNumber).then(data=>{
        console.log(data);
      })
      .catch(error=>{
        console.error(error);
      });
        
    }
  }
}
