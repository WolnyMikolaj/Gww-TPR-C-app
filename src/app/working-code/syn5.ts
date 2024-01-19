interface FinancialMetrics {
    'Marża operacyjna': string;
    'Marża zysku brutto': string;
    'Rentowność aktywów': string;
    'Rentowność kapitału własnego': string;
  }
  
export  function financialMetricsToXML(metrics: FinancialMetrics): string {
    // Convert the values from strings to floats and multiply by 100 for percentage representation
    const marzaOper = parseFloat(metrics['Marża operacyjna']) * 100;
    const marzaZysku = parseFloat(metrics['Marża zysku brutto']) * 100;
    const rentAkt = parseFloat(metrics['Rentowność aktywów']) * 100;
    const rentKW = parseFloat(metrics['Rentowność kapitału własnego']) * 100;
  
    // Construct the XML string using template literals
    return `<InnyPodmiot>
    <MarzaOper>${marzaOper.toFixed(2)}</MarzaOper>
    <MarzaZysku>${marzaZysku.toFixed(2)}</MarzaZysku>
    <RentAkt>${rentAkt.toFixed(2)}</RentAkt>
    <RentKW>${rentKW.toFixed(2)}</RentKW>
  </InnyPodmiot>\n`;
  }

  