interface ObjectFormExcelData {
  'Wartość korekty': string;
  'Kompensata': string;
  'Transakcja zwolniona na podst. art. 11n pkt 1-2 ustawy': string;
  'Rodzaj transakcji': string;
  }
  
  export function generateSpecialTaxOfficeCodesXml(transaction: ObjectFormExcelData): string {
    let xmlOutput: string = "";
  
    if (transaction['Wartość korekty'] === 'n/d') {
      xmlOutput += "<BrakKorektyCT1>KC02</BrakKorektyCT1>\n";
    } else {
      xmlOutput += "<BrakKorektyCT1>KC01</BrakKorektyCT1>\n";
    }
  
    if (transaction['Kompensata'] === 'Brak') {
      xmlOutput += "<Kompensata>KS03</Kompensata>\n";
    } else {
      xmlOutput += "<Kompensata>DODAĆ</Kompensata>\n";
    }
  
    if (transaction['Transakcja zwolniona na podst. art. 11n pkt 1-2 ustawy'] === 'NIE') {
      xmlOutput += "<KodZW2>ZW02</KodZW2>\n";
    } else {
      xmlOutput += "<KodZW2>ZW01</KodZW2>\n";
    }
  
    if (transaction['Rodzaj transakcji'] === 'transakcja kontrolowana') {
      xmlOutput += "<RodzajTrans1>TK01</RodzajTrans1>\n";
    } else {
      xmlOutput += "<RodzajTrans1>TK02</RodzajTrans1>\n";
    }
  
    return xmlOutput;
  }

  