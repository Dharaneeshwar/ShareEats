import React from 'react';
import NavBar from './common/Navbar';
import Footer from './common/Footer';

function Base({activeNav = "receiver",children}) {
  // set state for a variable 
  
  return (
      <div>
        <NavBar activeNav = {activeNav}/>
          {children}
        <Footer/>
      </div>
  );
}

export default Base;
