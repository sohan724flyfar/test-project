import React, { useEffect } from 'react';
import data from './transactionID.json';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        setTimeout(async () => {
          const apiResponse = await fetch(`https://api.flyfarint.com/v.1.0.0/Paymentgateway/bkashApi/search.php?trxID=${item}&agentId=FFA19775`);
          const apiData = await apiResponse.json();
          console.log(apiData);
        }, i * 4000); // Delay each API call by 5 seconds
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      Loading...
    </div>
  );
}

export default App;
