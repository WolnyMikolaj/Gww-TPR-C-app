"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createXmlString = void 0;
function createXmlString(data) {
    var xmlString = "\n<PozycjeSzczegolowe>\n";
    var textToRetrieveTaxCodeFrom = data['Obowiązek sporządzenia lokalnej dokumentacji cen transferowych'];
    // Extract the code from the string. This assumes the code is always at the end after ' - '
    var parts = textToRetrieveTaxCodeFrom.split(' - ');
    var code = parts[parts.length - 1];
    xmlString += "    <PodmiotNZ>".concat(code, "</PodmiotNZ>\n");
    return xmlString;
}
exports.createXmlString = createXmlString;
