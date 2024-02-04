import "../../public/Footer.css"
const Footer = () => {
    const year = new Date().getFullYear();
    
    return <footer><h6>Developed by Aniruddh semalty</h6>{`Copyright ©  Code ${year}`}</footer>;
  };
export default Footer;