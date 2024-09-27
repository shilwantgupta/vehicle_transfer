import { useState, useEffect } from 'react';

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Fetch drivers from API
    fetch('/api/drivers')
      .then((res) => res.json())
      .then((data) => setDrivers(data));
  }, []);

  const addDriver = async (e: any) => {
    e.preventDefault();
    const response = await fetch('/api/drivers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phoneNumber }),
    });
    const newDriver = await response.json();
    setDrivers([...drivers, newDriver]);
    setName('');
    setPhoneNumber('');
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Drivers</h1>
      <form onSubmit={addDriver} className="space-y-4">
        <input
          type="text"
          placeholder="Driver Name"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Driver
        </button>
      </form>

      <ul className="mt-8 space-y-2">
        {drivers.map((driver: any) => (
          <li
            key={driver.id}
            className="bg-white p-4 shadow-md rounded-md"
          >
            {driver.name} - {driver.phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}
