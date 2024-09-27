import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
function Appbar() {
  const router = useRouter();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link className='navbar-brand' href="/">Vehicle Transfer</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className={`nav-link ${router.pathname === '/' ? 'active' : ''}`} href="/">
              Home
            </Link>
            <Link className={`nav-link ${router.pathname === '/vehicles' ? 'active' : ''}`} href="/vehicles">
              Vehicles
            </Link>
            <Link className={`nav-link ${router.pathname === '/drivers' ? 'active' : ''}`} href="/drivers">
              Drivers
            </Link>
            <Link className={`nav-link ${router.pathname === '/transfers' ? 'active' : ''}`} href="/transfers">
              Transfers
            </Link>
            <Link className={`nav-link ${router.pathname === '/transfers/history' ? 'active' : ''}`} href="/transfers/history">
              History
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;
