type ObjectFormExcelData = {
    'Wartość transakcji': string;
}

export function addCountryDetailsToXML(data: ObjectFormExcelData): string {
    
    const transactionWorth = data['Wartość transakcji'];
    let xmlString = "<InformacjaOKrajuA2>\n<Kraj>PL</Kraj>\n";
    xmlString += `<WartoscAKraj2 kodWaluty="PLN">${transactionWorth}</WartoscAKraj2>\n`
    xmlString += "</InformacjaOKrajuA2>";

    return xmlString;
}