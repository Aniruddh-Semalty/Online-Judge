
const Footer = () => {
    const year = new Date().getFullYear();
    
    return <footer className=" my-2 mb-0 bg-[#202020] text-[#F0F0F0] flex flex-col"><h6>Developed by Aniruddh semalty</h6><p>{`Copyright ©  Code ${year}`}</p></footer>;
  };
export default Footer;