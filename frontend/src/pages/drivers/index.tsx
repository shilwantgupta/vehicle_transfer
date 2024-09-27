import { useState, useEffect } from 'react';

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({ name: '', phoneNumber: '' });

  useEffect(() => {
    // Fetch drivers from API
    fetch('/api/drivers')
      .then((res) => res.json())
      .then((data) => setDrivers(data));
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // POST new driver to API
    await fetch('/api/drivers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDriver),
    });
    setNewDriver({ name: '', phoneNumber: '' });
    // Fetch updated drivers
    fetch('/api/drivers')
      .then((res) => res.json())
      .then((data) => setDrivers(data));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Drivers</h1>

      {/* Driver Creation Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Driver</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newDriver.name}
            onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
            className="border p-2 w-full rounded-md"
            placeholder="Driver Name"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="tel"
            value={newDriver.phoneNumber}
            onChange={(e) => setNewDriver({ ...newDriver, phoneNumber: e.target.value })}
            className="border p-2 w-full rounded-md"
            placeholder="Phone Number"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Add Driver
        </button>
      </form>

      {/* Driver List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Driver List</h2>
        <ul>
          {drivers.map((driver:any) => (
            <li key={driver.id} className="p-4 border-b">
              {driver.name} - {driver.phoneNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
