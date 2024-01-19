"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.financialMetricsToXML = void 0;
function financialMetricsToXML(metrics) {
    // Convert the values from strings to floats and multiply by 100 for percentage representation
    var marzaOper = parseFloat(metrics['Marża operacyjna']) * 100;
    var marzaZysku = parseFloat(metrics['Marża zysku brutto']) * 100;
    var rentAkt = parseFloat(metrics['Rentowność aktywów']) * 100;
    var rentKW = parseFloat(metrics['Rentowność kapitału własnego']) * 100;
    // Construct the XML string using template literals
    return "<InnyPodmiot>\n    <MarzaOper>".concat(marzaOper.toFixed(2), "</MarzaOper>\n    <MarzaZysku>").concat(marzaZysku.toFixed(2), "</MarzaZysku>\n    <RentAkt>").concat(rentAkt.toFixed(2), "</RentAkt>\n    <RentKW>").concat(rentKW.toFixed(2), "</RentKW>\n  </InnyPodmiot>\n");
}
exports.financialMetricsToXML = financialMetricsToXML;
