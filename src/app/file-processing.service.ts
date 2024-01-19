import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';

type ExcelCellContent = string | number | boolean | null;

interface ExcelRowData {
  [header: string]: ExcelCellContent;
}

@Injectable({
  providedIn: 'root'
})
export class FileProcessingService {

  constructor() {}

  async extractDataFromExcel(file: File, worksheetName: string, headerRowIndex: number = 7, dataStartRowIndex: number = 8): Promise<ExcelRowData[]> {
    try {
      const reader = new FileReader();
      const workbook = new Workbook();
      const promise = new Promise<ExcelRowData[]>((resolve, reject) => {
        reader.onload = async (e: any) => {
          const buffer = e.target.result;
          await workbook.xlsx.load(buffer);

          const worksheet = workbook.getWorksheet("Dane do TPR-C");
          if (!worksheet) {
            throw new Error(`Worksheet named "${worksheetName}" not found in the Excel file.`);
          }
          
          const columnHeaders = this.extractColumnHeadersFromRow(worksheet, headerRowIndex);
          const data = this.extractDataRowsFromWorksheet(worksheet, columnHeaders, dataStartRowIndex);
          resolve(data);
        };
        reader.onerror = (error) => reject(error);
      });
      reader.readAsArrayBuffer(file);
      return await promise;
    } catch (error) {
      console.error('Error reading Excel file:', error);
      throw error; // or handle the error as needed
    }
  }
  

  private extractColumnHeadersFromRow(worksheet :any, headerRowIndex: number): string[] {
    const headers: string[] = [];
    const headerRow = worksheet.getRow(headerRowIndex);
    headerRow.eachCell((cell:any, columnIndex:any) => {
      headers[columnIndex - 1] = cell.text.trim();
    });
  
    return headers;
  }

  private getCellTextValue(cell:any): ExcelCellContent {
    const cellValue = cell.text; 
    return typeof cellValue === 'string' ? cellValue : 'null';
  }

  private isRowDataNotEmpty(rowData: ExcelRowData): boolean {
    return Object.values(rowData).some(value => value !== null);
  }

  private extractDataRowsFromWorksheet(worksheet:any, columnHeaders: string[], startingRow: number): ExcelRowData[] {
    const dataRows: ExcelRowData[] = [];
  
    worksheet.eachRow({ includeEmpty: false }, (row:any, rowIndex:any) => {
      if (rowIndex >= startingRow) {
        const rowData = this.buildRowData(row, columnHeaders);
        if (this.isRowDataNotEmpty(rowData)) {
          dataRows.push(rowData);
        }
      }
    });
  
    return dataRows;
  }

  private buildRowData(row:any, columnHeaders: string[]): ExcelRowData {
    const rowData: ExcelRowData = {};

    row.eachCell({ includeEmpty: true }, (cell:any, columnIndex:any) => {
      const header = columnHeaders[columnIndex - 1];
      rowData[header] = this.getCellTextValue(cell);
    });
  
    return rowData;
  }

  async retrieveFinancialParametersFromExcel(file: File): Promise<{ [key: string]: any }> {
    try {
      const reader = new FileReader();
      const workbook = new Workbook();
      const promise = new Promise<{ [key: string]: any }>((resolve, reject) => {
        reader.onload = async (e: any) => {
          const buffer = e.target.result;
          await workbook.xlsx.load(buffer);
          const sheetName = 'Dane do TPR-C';
          const sheet = workbook.getWorksheet(sheetName);

          if (!sheet) {
            throw new Error(`Sheet ${sheetName} not found in the Excel file.`);
          }

          // Object to store parameters
          const parameters: { [key: string]: any } = {};

          // Iterate over rows 2 to 5
          for (let i = 2; i <= 5; i++) {
            const row = sheet.getRow(i);
            const paramName = row.getCell(2).text; // Column B
            const paramValue = row.getCell(3).text; // Column C
            parameters[paramName] = paramValue;
          }

          resolve(parameters);
        };
        reader.onerror = (error) => reject(error);
      });
      reader.readAsArrayBuffer(file);
      return await promise;
    } catch (error) {
      console.error('Error reading Excel file:', error);
      throw error; // or handle the error as needed
    }
  }

}
