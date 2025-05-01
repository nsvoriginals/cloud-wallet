import { useState } from 'react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, Connection } from '@solana/web3.js';
import axios from 'axios';
import './App.css';

function App() {
  const connection = new Connection('https://api.devnet.solana.com', "confirmed");
  const [amount, setAmount] = useState();
  const [recipient, setRecipient] = useState();
  const mypublickey = localStorage.getItem('pub');

  const sendSol = async () => {
    try {
      // Validate inputs
      if (!mypublickey) throw new Error('Public key not found in localStorage');
      if (!recipient) throw new Error('Recipient address is required');
      if (!amount) throw new Error('Amount is required');

      const amountNum = parseFloat(amount);
      if (isNaN(amountNum)) throw new Error('Invalid amount');
      if (amountNum <= 0) throw new Error('Amount must be positive');

      // Create PublicKey instances
      const fromPubkey = new PublicKey(mypublickey);
      const toPubkey = new PublicKey(recipient);

      // Get latest blockhash (note the parentheses to call the function)
      const { blockhash } = await connection.getLatestBlockhash();

      // Create transfer instruction
      const ix = SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports: amountNum * LAMPORTS_PER_SOL
      });

      // Create transaction
      const tx = new Transaction({
        feePayer: fromPubkey,
        recentBlockhash: blockhash,
      }).add(ix);

      // Serialize transaction
      const serializedTxn = tx.serialize({
        requireAllSignatures: false,
        verifySignatures: false
      });

      // Convert to base64 for transmission
      
     alert(serializedTxn)
     console.log(serializedTxn)
      // Send to backend
      await axios.post('http://localhost:3000/api/v1/txn/sign', {
        message: serializedTxn,
        pub:mypublickey 
      });

      alert('Transaction sent for signing!');

    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Transaction</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Public Key
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter recipient address"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (SOL)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            min="0"
            step="0.000001"
          />
        </div>

        <button
          onClick={sendSol}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Serialized Transaction
        </button>
      </div>
    </div>
  );
}

export default App;