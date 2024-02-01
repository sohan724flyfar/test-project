import axios from "axios";
import * as XLSX from "xlsx";


// Read Excel file
const workbook = XLSX.read('./Bkash-Statements.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const transactions = XLSX.utils.sheet_to_json(worksheet);

// Define a function to fetch agent information
async function fetchAgentInfo(transactionId, agentId) {
  try {
    const response = await axios.get(`https://api.flyfarint.com/v.1.0.0/Paymentgateway/bkashApi/search.php?trxID=${transactionId}&${agentId}`);
    return response.data; // Assuming the response contains agent information
  } catch (error) {
    console.error('Error fetching agent information:', error);
    return null;
  }
}

// Process transactions
async function processTransactions() {
  const processedTransactions = [];
  for (const transaction of transactions) {
    console.log(transaction);
    // const agentInfo = await fetchAgentInfo(transaction.agentId);
    // if (agentInfo) {
    //   const processedTransaction = {
    //     transactionId: transaction.transactionId,
    //     agentId: transaction.agentId,
    //     agentName: agentInfo.name,
    //     agentEmail: agentInfo.email,
    //     agentNumber: agentInfo.number,
    //     // Add other necessary fields from agentInfo
    //   };
    //   processedTransactions.push(processedTransaction);
    // }
  }

  // Write processed transactions to a new Excel file
  const newWorkbook = XLSX.utils.book_new();
  const newSheet = XLSX.utils.json_to_sheet(processedTransactions);
  XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Processed Transactions');
  XLSX.writeFile(newWorkbook, 'processed_transactions.xlsx');
}

// Call the function to start processing transactions
processTransactions();

function App() {
  return (
    <div>
Loading..
    </div>
  );
}

export default App;
