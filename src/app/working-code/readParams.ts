import * as ExcelJS from 'exceljs';

export async function retrieveFinancialParametersFromExcel(filePath: string): Promise<{[key: string]: any}> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheetName = 'Dane do TPR-C';
    const sheet = workbook.getWorksheet(sheetName);

    if (!sheet) {
        throw new Error(`Sheet ${sheetName} not found in the Excel file.`);
    }

    // Object to store parameters
    const parameters: {[key: string]: any} = {};

    // Iterate over rows 2 to 5
    for (let i = 2; i <= 5; i++) {
        const row = sheet.getRow(i);
        const paramName = row.getCell(2).text; // Column B
        const paramValue = row.getCell(3).text; // Column C
        parameters[paramName] = paramValue;
    }

    return parameters;
}
