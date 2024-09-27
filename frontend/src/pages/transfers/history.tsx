import { useState, useEffect } from 'react';
import ajax from '@/pages/lib/instance';

export default function TransferHistoryPage() {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    ajax.get('/transfer')
    .then(res=>{
      console.log(res)
      setTransfers(res.data)
    })
    .catch(err=>console.log(err))
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Transfer History</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Past Transfers</h2>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>From</th>
              <th>To</th>
              <th>Vehicle No.</th>
              <th>Vehicle Type</th>
            </tr>
          </thead>
          <tbody>
            {
              transfers && transfers?.map((transfer:any,i:number)=>{
                return <tr key={transfer.id}>
                  <td>{++i}</td>
                  <td>{transfer.fromDriver.name}</td>
                  <td>{transfer.toDriver.name}</td>
                  <td>{transfer.vehicle.vehicleNumber}</td>
                  <td>{transfer.vehicle.vehicleType}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
