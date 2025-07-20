import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav
      className="navbar fixed-top navbar-expand-lg"
      style={{
        backgroundColor: '#f0f4f8', // soft light blue-gray background
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}
    >
      <div className="container-fluid px-4">
        <NavLink
          to="/"
          className="navbar-brand"
          style={{
            fontWeight: '700',
            fontSize: '1.7rem',
            color: '#007bff', // Bootstrap primary blue
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: '1.2px',
          }}
        >
          Roll with It
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ filter: 'brightness(0) invert(0.5)' }}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div
            className="navbar-nav ms-auto"
            style={{ gap: '1.6rem', fontSize: '1.1rem' }}
          >
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'About' },
              // Packing List removed here
            ].map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active fw-semibold' : '')
                }
                style={({ isActive }) => ({
                  color: isActive ? '#0056b3' : '#495057',
                  borderRadius: '6px',
                  padding: '6px 15px',
                  transition: 'color 0.3s ease',
                })}
                onMouseEnter={(e) => {
                  if (!e.target.classList.contains('active'))
                    e.target.style.color = '#007bff';
                }}
                onMouseLeave={(e) => {
                  if (!e.target.classList.contains('active'))
                    e.target.style.color = '#495057';
                }}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
