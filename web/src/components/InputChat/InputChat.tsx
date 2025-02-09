import React from "react";
import "./InputChat.css";

import arrow from "./../../assets/arrow.svg";

interface InputChatProps {
   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const InputChat: React.FC<InputChatProps> = ({ onSubmit }) => {
   return (
      <div id="input-chat">
         <form onSubmit={(e) => onSubmit(e)}>
            <input type="text" name="message-prompt" placeholder="Mensagem" />
            <button>
               <img src={arrow} alt="Send message" />
            </button>
         </form>
      </div>
   );
};

export default InputChat;
