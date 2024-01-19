interface ExcelDataObject {
    'Obowiązek sporządzenia lokalnej dokumentacji cen transferowych': string;
}

export function createXmlString(data: ExcelDataObject): string {
    let xmlString = "\n<PozycjeSzczegolowe>\n";
    let textToRetrieveTaxCodeFrom = data['Obowiązek sporządzenia lokalnej dokumentacji cen transferowych'];
    
    // Extract the code from the string. This assumes the code is always at the end after ' - '
    const parts = textToRetrieveTaxCodeFrom.split(' - ');
    const code = parts[parts.length - 1];

    xmlString += `    <PodmiotNZ>${code}</PodmiotNZ>\n`;

    return xmlString;
}