import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-[#202020] text-white py-4 ">
      <div className="container mx-auto text-center">
        <h6>Developed by Aniruddh semalty</h6>
        <p>{`Copyright ©  Code ${year}`}</p>
      </div>
    </footer>
  );
};

export default Footer;
