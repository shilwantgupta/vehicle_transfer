import { useState, useEffect } from 'react';

export default function TransferHistoryPage() {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    fetch('/api/transfers/history').then((res) => res.json()).then(setTransfers);
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Transfer History</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Past Transfers</h2>
        <ul>
          {transfers.map((transfer:any) => (
            <li key={transfer.id} className="p-4 border-b">
              Vehicle {transfer.vehicle.vehicleNumber} transferred from {transfer.fromDriver.name} to {transfer.toDriver.name} on {new Date(transfer.transferDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
