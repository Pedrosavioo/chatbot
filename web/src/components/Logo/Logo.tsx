import React from "react";
import "./Logo.css";

import chatLogoImg from "./../../assets/logo-chat.svg";

const Logo = () => {
   return (
      <header>
         <div>
            <p>orionbot</p>
            <img src={chatLogoImg} alt="logo chat" />
         </div>
      </header>
   );
};

export default Logo;
