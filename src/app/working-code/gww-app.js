"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var read_1 = require("./read");
var readParams_1 = require("./readParams");
var syn1_1 = require("./syn1");
var syn2_1 = require("./syn2");
var syn3_1 = require("./syn3");
var syn4_1 = require("./syn4");
var syn5_1 = require("./syn5");
var syn6_1 = require("./syn6");
var syn7_1 = require("./syn7");
var syn8_1 = require("./syn8");
var globalExcelData;
var financialParameters;
function main(krs) {
    return __awaiter(this, void 0, void 0, function () {
        var xmlContent, _a, i, specificTransationData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, read_1.extractDataFromExcel)("./Ceny-Trans-real.xlsx")];
                case 1:
                    globalExcelData = _b.sent();
                    return [4 /*yield*/, (0, readParams_1.retrieveFinancialParametersFromExcel)("./Ceny-Trans-real.xlsx")];
                case 2:
                    financialParameters = _b.sent();
                    xmlContent = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n    <Deklaracja xmlns=\"http://crd.gov.pl/wzor/2023/10/06/12895/\">\n      <Naglowek>\n        <KodFormularza kodSystemowy=\"TPR-C (5)\" kodPodatku=\"CIT\" rodzajZobowiazania=\"Z\" wersjaSchemy=\"1-1E\">TPR-C</KodFormularza>\n        <WariantFormularza>5</WariantFormularza>\n        <CelZlozenia>1</CelZlozenia>";
                    xmlContent += (0, syn2_1.generateXmlHeader)(globalExcelData[0]);
                    _a = xmlContent;
                    return [4 /*yield*/, (0, syn3_1.getBasicDataFromKRS)(krs)];
                case 3:
                    xmlContent = _a + _b.sent();
                    xmlContent += (0, syn4_1.createXmlString)(globalExcelData[0]);
                    xmlContent += (0, syn5_1.financialMetricsToXML)(financialParameters);
                    for (i = 0; i < globalExcelData.length; i++) {
                        specificTransationData = globalExcelData[i];
                        console.log(specificTransationData);
                        xmlContent += (0, syn6_1.transactionDataToXml)(specificTransationData);
                        xmlContent += (0, syn7_1.generateSpecialTaxOfficeCodesXml)(specificTransationData);
                        xmlContent += (0, syn8_1.addCountryDetailsToXML)(specificTransationData);
                        xmlContent += "\n<Metoda01>DODAĆ</Metoda01>\n";
                        xmlContent += "</Transakcja>\n";
                    }
                    xmlContent += " </PozycjeSzczegolowe>\n    <Oswiadczenie>OSW1</Oswiadczenie>\n    </Deklaracja>";
                    (0, syn1_1.writeXMLFile)("deklaracja.xml", xmlContent);
                    return [2 /*return*/];
            }
        });
    });
}
main('817352');
