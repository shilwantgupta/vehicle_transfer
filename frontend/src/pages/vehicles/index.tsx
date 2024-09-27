import { useState, useEffect } from 'react';
import ajax from '@/pages/lib/instance';
import { toast } from 'react-toastify';
export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    vehicleNumber: '',
    vehicleType: '',
  });

  const fetchVehicles = () => {
    ajax.get('/vehicles')
      .then(res => {
        if (res.status === 200) {
          setVehicles(res.data)
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    ajax.post('/vehicles', newVehicle)
      .then(res => {
        setNewVehicle({ vehicleNumber: '', vehicleType: '' });
        toast.success("Successfully added")
        fetchVehicles();
      })
      .catch(err => console.log(err))
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
        <button type="submit" className="btn btn-primary px-4 py-2 rounded-md">
          Add Vehicle
        </button>
      </form>

      {/* Vehicle List */}
      <div className="bg-white p-6 mt-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Vehicle List</h2>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Vehicle Number</th>
              <th>Vehicle Type</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle: any, i: number) => (
              <tr key={vehicle.id}>
                <td>{++i}</td>
                <td>{vehicle.vehicleNumber}</td>
                <td>{vehicle.vehicleType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
