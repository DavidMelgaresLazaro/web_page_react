import logo from "../images/Logo.png";

//Logo of the app
function Logo() {
  return (
    <div>
      <img src={logo} alt="Logo" className="w-20 h-auto" />
    </div>
  );
}

export default Logo;
