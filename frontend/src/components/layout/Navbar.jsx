import React, { useState, useEffect } from 'react';
import logo from '/images/logo.png';
import { NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMedium, setIsMedium] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsMedium(window.innerWidth <= 1024);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen); // toggle on-off
  };

  const navItems = [
    { path: '/quiz-stepper', title: 'Take a Quiz' },
    { path: '/admin', title: 'Admin' },
    { path: '/aboutus', title: 'About us' },
  ];

  return (
    <div className='relative'>
      <header className={`h-16 shadow-lg flex items-center z-10 ${isMenuOpen ? 'mb-40' : ''} fixed top-0 left-0 w-full bg-white`}>
        <nav className={`flex items-center ${isMedium ? 'justify-start' : 'justify-between'} w-9/12 mx-auto`}>
          <div>
            <a href='/'>
              <img src={logo} alt='logo' />
            </a>
          </div>

          {/* navitems */}
          <div className='flex items-center space-x-5'>
            <ul className={`sm:flex items-center space-x-10 ${isMedium ? 'hidden' : ''}`}>
              {navItems.map(({ path, title }) => (
                <li key={path} className='text-base font-semibold hover:text-primary'>
                  <NavLink to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
                    {title}
                  </NavLink>
                </li>
              ))}
              <button
                className={`font-semibold px-5 py-1 border border-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in rounded ${
                  isMedium ? 'hidden' : ''
                }`}
              >
                Login
              </button>
            </ul>

            {/* Mobile menu */}
            <div className='md:hidden ml-auto'>
              <button className='' onClick={handleMenuToggler}>
                {isMenuOpen ? (
                  <FaXmark className='w-7 h-7 text-primary' />
                ) : (
                  <FaBarsStaggered className='w-7 h-6 text-primary' />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* navitems for mobile */}
      <div
        className={`px-4 sm:flex sm:flex-col bg-white py-5 rounded-sm lg:hidden fixed  top-16 right-0 w-full ${
          isMenuOpen ? 'z-50' : 'hidden'
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className='text-base font-semibold hover:text-primary py-1'>
              <NavLink to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
                {title}
              </NavLink>
            </li>
          ))}
          <li className='text-base font-semibold hover:text-primary  py-1'>
            {' '}
            <NavLink to='/login'>Log in</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
