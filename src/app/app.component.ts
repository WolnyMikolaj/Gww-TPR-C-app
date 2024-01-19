import { Component } from '@angular/core';
import { FileProcessingService } from './file-processing.service'; // Update the path as needed
import {main} from "./working-code/gww-app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,  // Marking the component as standalone
})
export class AppComponent {
  taxNumber: string = '';
  fileOutput: string = '';

  constructor(private fileProcessingService: FileProcessingService) {}

  onTaxNumberInput(event: Event) {
    const element = event.target as HTMLInputElement; // Cast to HTMLInputElement
    this.taxNumber = element.value; // Now you can safely access 'value'
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      try {
        const data = await this.fileProcessingService.extractDataFromExcel(file, this.taxNumber);
        const financialParameters = await this.fileProcessingService.retrieveFinancialParametersFromExcel(file);

        this.fileOutput = await main(data, financialParameters, this.taxNumber);
      } catch (error) {
        console.error(error);
      }
    }
  }

}
