interface ObjectFormExcelData {
    'Kategoria transakcji': string;
    'Przedmiot transakcji kontrolowanej': string;
    'Wartość transakcji': string;
}

export function transactionDataToXml(transaction: ObjectFormExcelData): string {

    const transactionCathegory = transaction['Kategoria transakcji'];
    const transactionItem = transaction['Przedmiot transakcji kontrolowanej'];
    const transactionWorth = transaction['Wartość transakcji'];


    let xmlString = "<Transakcja>\n";
    xmlString += `<KategoriaA>${transactionCathegory}<KategoriaA>\n`;
    xmlString += `<PrzedmiotA>${transactionItem}</PrzedmiotA>\n`;
    xmlString += `<WartoscA kodWaluty="PLN">${transactionWorth}</WartoscA>\n`;
    return xmlString;
    //`  <${keyFormatted} kodWaluty="PLN">${value}</${keyFormatted}>\n`
}
