import React from "react";
import "./MessageChat.css";

import bot1 from "./../../assets/bot/bot-1.png";
import bot2 from "./../../assets/bot/bot-2.png";
import bot3 from "./../../assets/bot/bot-3.png";
import bot4 from "./../../assets/bot/bot-4.png";
import botSearching from "./../../assets/bot/bot-searching.png";

interface MessageChatPropsI {
   message: string;
   type?: "user" | "bot" | "searching";
   numberImageBot?: number | undefined;
}

const MessageChat: React.FC<MessageChatPropsI> = ({
   message,
   type,
   numberImageBot,
}) => {
   return (
      <div
         className={`
            ${type === "bot" && "message-bot"}
            ${type === "user" && "message-user"}
            ${type === "searching" && "message-searching"}
         `}
      >
         {/* Render image bot */}
         {type === "bot" && numberImageBot === 1 && <img src={bot1} />}
         {type === "bot" && numberImageBot === 2 && <img src={bot2} />}
         {type === "bot" && numberImageBot === 3 && <img src={bot3} />}
         {type === "bot" && numberImageBot === 4 && <img src={bot4} />}
         {type === "searching" && <img src={botSearching} />}

         {/* Message */}
         <p
            className={
               type === "bot" && numberImageBot
                  ? "last-message"
                  : "other-messages"
            }
         >
            <span dangerouslySetInnerHTML={{ __html: message }}></span>
            {type === "searching" && (
               <>
                  <span id="point1" className="point-loading">
                     .
                  </span>
                  <span id="point2" className="point-loading">
                     .
                  </span>
                  <span id="point3" className="point-loading">
                     .
                  </span>
               </>
            )}
         </p>
      </div>
   );
};

export default MessageChat;
