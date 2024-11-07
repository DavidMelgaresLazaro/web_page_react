import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Logo from "./Logo"


function Footer() {
  
  return (
    <footer className="bg-indigo-600 text-white py-4">
     
      <nav className="flex gap-4 justify-center">
        <a href="https://facebook.com" target="_blank"><FaFacebookF /></a>
        <a href="https://instagram.com" target="_blank"><FaInstagram /></a>
        <a href="https://twitter.com" target="_blank"><FaTwitter /></a>
        <Logo size="15"/>
      </nav>

      
    </footer>
  )
}

export default Footer;