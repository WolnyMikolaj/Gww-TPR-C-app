"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateXmlHeader = void 0;
function generateXmlHeader(data) {
    var okresOd = data['Okres od'];
    var okresDo = data['Okres do'];
    // Use other properties as needed
    return "\n    <OkresOd>".concat(okresOd, "</OkresOd>\n    <OkresDo>").concat(okresDo, "</OkresDo>\n    <KodUrzedu>DODA\u0106</KodUrzedu> \n</Naglowek>");
}
exports.generateXmlHeader = generateXmlHeader;
