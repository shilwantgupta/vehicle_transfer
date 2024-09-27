import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto">
        <ul className="flex justify-between items-center text-white font-semibold">
          <li>
            <Link href="/drivers">
              <span className="hover:text-gray-300">Drivers</span>
            </Link>
          </li>
          <li>
            <Link href="/vehicles">
              <span className="hover:text-gray-300">Vehicles</span>
            </Link>
          </li>
          <li>
            <Link href="/transfers">
              <span className="hover:text-gray-300">Transfer Vehicle</span>
            </Link>
          </li>
          <li>
            <Link href="/transfers/history">
              <span className="hover:text-gray-300">Transfer History</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
