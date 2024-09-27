import { useState, useEffect } from 'react';

export default function TransfersPage() {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [transfer, setTransfer] = useState({
    fromDriverId: '',
    toDriverId: '',
    vehicleId: '',
  });

  useEffect(() => {
    fetch('/api/drivers').then((res) => res.json()).then(setDrivers);
    fetch('/api/vehicles').then((res) => res.json()).then(setVehicles);
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    await fetch('/api/transfers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transfer),
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Transfer Vehicle</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block mb-2">Select Vehicle</label>
          <select
            value={transfer.vehicleId}
            onChange={(e) => setTransfer({ ...transfer, vehicleId: e.target.value })}
            className="border p-2 w-full rounded-md"
          >
            <option value="">Select a vehicle</option>
            {vehicles.map((vehicle:any) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.vehicleNumber} - {vehicle.vehicleType}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Transfer From Driver</label>
          <select
            value={transfer.fromDriverId}
            onChange={(e) => setTransfer({ ...transfer, fromDriverId: e.target.value })}
            className="border p-2 w-full rounded-md"
          >
            <option value="">Select from driver</option>
            {drivers.map((driver:any) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Transfer To Driver</label>
          <select
            value={transfer.toDriverId}
            onChange={(e) => setTransfer({ ...transfer, toDriverId: e.target.value })}
            className="border p-2 w-full rounded-md"
          >
            <option value="">Select to driver</option>
            {drivers.map((driver:any) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Submit Transfer
        </button>
      </form>
    </div>
  );
}
