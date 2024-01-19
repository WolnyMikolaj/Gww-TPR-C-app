"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionDataToXml = void 0;
function transactionDataToXml(transaction) {
    var transactionCathegory = transaction['Kategoria transakcji'];
    var transactionItem = transaction['Przedmiot transakcji kontrolowanej'];
    var transactionWorth = transaction['Wartość transakcji'];
    var xmlString = "<Transakcja>\n";
    xmlString += "<KategoriaA>".concat(transactionCathegory, "<KategoriaA>\n");
    xmlString += "<PrzedmiotA>".concat(transactionItem, "</PrzedmiotA>\n");
    xmlString += "<WartoscA kodWaluty=\"PLN\">".concat(transactionWorth, "</WartoscA>\n");
    return xmlString;
    //`  <${keyFormatted} kodWaluty="PLN">${value}</${keyFormatted}>\n`
}
exports.transactionDataToXml = transactionDataToXml;
