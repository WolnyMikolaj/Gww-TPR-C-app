type DataObject = {
    'Składający': string;
    'Kontrahent': string;
    'Okres od': string;
    'Okres do': string;
};

export function generateXmlHeader(data: DataObject): string {
    const okresOd = data['Okres od'];
    const okresDo = data['Okres do'];
    // Use other properties as needed

    return `
    <OkresOd>${okresOd}</OkresOd>
    <OkresDo>${okresDo}</OkresDo>
    <KodUrzedu>DODAĆ</KodUrzedu> 
</Naglowek>`;
}
