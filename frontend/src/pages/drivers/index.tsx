import { useState, useEffect } from 'react';
import ajax from '@/pages/lib/instance'

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({ name: '', phoneNumber: '' });

  const fetchDrivers = () => {
    ajax.get('/drivers')
      .then(res => {
        if (res.status === 200) {
          setDrivers(res.data)
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    ajax.post('/drivers', newDriver)
      .then(res => {
        setNewDriver({ name: '', phoneNumber: '' });
        fetchDrivers();
      })
      .catch(err => console.log(err))
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
        <button type="submit" className="btn btn-primary px-4 py-2 rounded-md">
          Add Driver
        </button>
      </form>

      {/* Driver List */}
      <div className="bg-white p-6 mt-5 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Driver List</h2>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Driver Name</th>
              <th>Driver Number</th>
            </tr>
          </thead>
          <tbody>
            {drivers && drivers.map((driver: any, i: number) => (
              <tr key={driver.id}>
                <td>{++i}</td>
                <td>{driver.name}</td>
                <td>{driver.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
