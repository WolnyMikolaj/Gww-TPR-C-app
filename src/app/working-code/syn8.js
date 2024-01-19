"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCountryDetailsToXML = void 0;
function addCountryDetailsToXML(data) {
    var transactionWorth = data['Wartość transakcji'];
    var xmlString = "<InformacjaOKrajuA2>\n<Kraj>PL</Kraj>\n";
    xmlString += "<WartoscAKraj2 kodWaluty=\"PLN\">".concat(transactionWorth, "</WartoscAKraj2>\n");
    xmlString += "</InformacjaOKrajuA2>";
    return xmlString;
}
exports.addCountryDetailsToXML = addCountryDetailsToXML;
