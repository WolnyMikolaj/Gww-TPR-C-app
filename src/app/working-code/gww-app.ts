import { retrieveFinancialParametersFromExcel} from './readParams';
import { generateXmlHeader } from './syn2';
import { getBasicDataFromKRS } from './syn3';
import { createXmlString } from './syn4';
import { financialMetricsToXML} from './syn5';
import { transactionDataToXml } from './syn6';
import {generateSpecialTaxOfficeCodesXml} from './syn7';
import {addCountryDetailsToXML} from './syn8';


export async function main(globalExcelData:any,financialParameters: any,krs:any){

    let xmlContent: string = `<?xml version="1.0" encoding="UTF-8"?>
    <Deklaracja xmlns="http://crd.gov.pl/wzor/2023/10/06/12895/">
      <Naglowek>
        <KodFormularza kodSystemowy="TPR-C (5)" kodPodatku="CIT" rodzajZobowiazania="Z" wersjaSchemy="1-1E">TPR-C</KodFormularza>
        <WariantFormularza>5</WariantFormularza>
        <CelZlozenia>1</CelZlozenia>`;

    xmlContent += generateXmlHeader(globalExcelData[0]);
    xmlContent += await getBasicDataFromKRS(krs);
    xmlContent += createXmlString(globalExcelData[0]);
    xmlContent += financialMetricsToXML(financialParameters);
    
    for(let i =0; i < globalExcelData.length; i++){
        let specificTransationData = globalExcelData[i];
        console.log(specificTransationData);
        xmlContent += transactionDataToXml(specificTransationData);
        xmlContent += generateSpecialTaxOfficeCodesXml(specificTransationData);
        xmlContent += addCountryDetailsToXML(specificTransationData);
        xmlContent += "\n<Metoda01>DODAĆ</Metoda01>\n";
        xmlContent+= "</Transakcja>\n"
    }
    xmlContent+= ` </PozycjeSzczegolowe>
    <Oswiadczenie>OSW1</Oswiadczenie>
    </Deklaracja>`;
    return xmlContent;
    //writeXMLFile("deklaracja.xml",xmlContent);
}