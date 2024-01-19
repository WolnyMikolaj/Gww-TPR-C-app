import axios from 'axios';

export async function getBasicDataFromKRS(krs: string): Promise<string> {
    const endpoint = `https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/${krs}?rejestr=P&format=json`;
    try {
        const response = await axios.get(endpoint);
        if (response.data && response.data.odpis && response.data.odpis.dane && response.data.odpis.dane.dzial1 && response.data.odpis.dane.dzial1.danePodmiotu) {
            const nazwa = response.data.odpis.dane.dzial1.danePodmiotu.nazwa;
            const nip = response.data.odpis.dane.dzial1.danePodmiotu.identyfikatory.nip;
            
            return `<Podmiot1 rola="Podmiot, którego dotyczy informacja o cenach transferowych">
    <NIP>${nip}</NIP> 
    <PelnaNazwa>${nazwa}</PelnaNazwa>
    <KodKraju>PL</KodKraju> 
    <KodPKD>DODAĆ</KodPKD> 
</Podmiot1>`;
        } else {
            console.log('Data structure is not as expected or data is missing.');
            return '';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return '';
    }
}
