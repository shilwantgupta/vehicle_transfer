import { useState, useEffect } from 'react';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleType, setVehicleType] = useState('');
  const [pucCertificate, setPucCertificate] = useState('');
  const [insuranceCertificate, setInsuranceCertificate] = useState('');

  useEffect(() => {
    fetch('/api/vehicles')
      .then((res) => res.json())
      .then((data) => setVehicles(data));
  }, []);

  const addVehicle = async (e: any) => {
    e.preventDefault();
    const response = await fetch('/api/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vehicleType,
        pucCertificate,
        insuranceCertificate,
      }),
    });
    const newVehicle = await response.json();
    setVehicles([...vehicles, newVehicle]);
    setVehicleType('');
    setPucCertificate('');
    setInsuranceCertificate('');
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Vehicles</h1>
      <form onSubmit={addVehicle} className="space-y-4">
        <input
          type="text"
          placeholder="Vehicle Type"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        />
        <input
          type="text"
          placeholder="PUC Certificate"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={pucCertificate}
          onChange={(e) => setPucCertificate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Insurance Certificate"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={insuranceCertificate}
          onChange={(e) => setInsuranceCertificate(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Vehicle
        </button>
      </form>

      <ul className="mt-8 space-y-2">
        {vehicles.map((vehicle: any) => (
          <li
            key={vehicle.id}
            className="bg-white p-4 shadow-md rounded-md"
          >
            {vehicle.vehicleType} - {vehicle.pucCertificate}
          </li>
        ))}
      </ul>
    </div>
  );
}
