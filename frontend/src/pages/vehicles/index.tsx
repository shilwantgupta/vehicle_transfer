import { useState, useEffect } from 'react';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    vehicleNumber: '',
    vehicleType: '',
  });

  useEffect(() => {
    fetch('/api/vehicles')
      .then((res) => res.json())
      .then((data) => setVehicles(data));
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    await fetch('/api/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVehicle),
    });
    setNewVehicle({ vehicleNumber: '', vehicleType: '' });
    fetch('/api/vehicles')
      .then((res) => res.json())
      .then((data) => setVehicles(data));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Vehicles</h1>

      {/* Vehicle Creation Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Vehicle</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newVehicle.vehicleNumber}
            onChange={(e) => setNewVehicle({ ...newVehicle, vehicleNumber: e.target.value })}
            className="border p-2 w-full rounded-md"
            placeholder="Vehicle Number"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={newVehicle.vehicleType}
            onChange={(e) => setNewVehicle({ ...newVehicle, vehicleType: e.target.value })}
            className="border p-2 w-full rounded-md"
            placeholder="Vehicle Type"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Add Vehicle
        </button>
      </form>

      {/* Vehicle List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Vehicle List</h2>
        <ul>
          {vehicles.map((vehicle:any) => (
            <li key={vehicle.id} className="p-4 border-b">
              {vehicle.vehicleNumber} - {vehicle.vehicleType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
