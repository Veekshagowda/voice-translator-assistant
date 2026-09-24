import "./topbar.css";
import {  FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <div className="topbar">

      <div className="top-left">
        <h2> Namasthe</h2>
        <p>Voice Translation HUB</p>
      </div>

     

        <div className="profile">
          <FaUserCircle className="profile-icon" />
          <span>Guest</span>
        </div>
      </div>

    
  );
}

export default Topbar;