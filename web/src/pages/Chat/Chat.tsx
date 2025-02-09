import React, { useState } from "react";
import "./Chat.css";

import Logo from "../../components/Logo/Logo";
import InputChat from "../../components/InputChat/InputChat";

import botImage from "./../../assets/bot/bot-hello.png";
import MessageChat from "../../components/MessageChat/MessageChat";

interface messageI {
   text?: string;
   expression?: number;
   typeUser: "user" | "bot" | "searching";
}

const Chat = () => {
   const exampleMessageUser: messageI = {
      text: "Olá, qual seu nome e como pode me ajudar?",
      typeUser: "user",
   };

   const exampleMessageBot: messageI = {
      text: "Olá! Sou Orion, seu assistente virtual. Posso ajudar com informações, explicações, sugestões e auxílio em tarefas diversas. Em que posso ser útil?",
      expression: 2,
      typeUser: "bot",
   };

   const [messages, setMessages] = useState<messageI[]>([]);

   // Function request prompt
   async function submitPrompt(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const message = (
         e.currentTarget.elements.namedItem(
            "message-prompt"
         ) as HTMLInputElement
      ).value;

      // Add message user
      setMessages((prevMessages) => [
         ...prevMessages,
         {
            text: message,
            typeUser: "user",
         },
      ]);

      // Add message searching
      setMessages((prevMessages) => [
         ...prevMessages,
         {
            typeUser: "searching",
         },
      ]);

      const fakeTimeResponse = setTimeout( async () => {
         try {
            const data = await fetch("http://localhost:3001/api/bot-message", {
               method: "POST",
               headers: {
                  "Content-type": "application/json",
               },
               body: JSON.stringify({ message }),
            });
            const result = await data.json();

            // Add message bot and remove last searching message
            setMessages((prevMessages) => {
               const updatedMessages = [...prevMessages]; // Cria uma cópia do array
               updatedMessages.pop(); // Remove o último item da cópia
               updatedMessages.push({
                  text: result.data.response,
                  typeUser: "bot",
                  expression: result.data.expression,
               }); // Adiciona o novo objeto
               return updatedMessages; // Retorna o novo array
            });
            console.log(result);
         } catch (error) {
            alert("Erro ao gerar resposta!");
            console.log(error);
         }
      }, 1500);
   }

   return (
      <>
         <Logo />
         <main>
            <section id="chat">
               {/* Initial render */}
               {messages.length === 0 && (
                  <>
                     <img
                        src={botImage}
                        alt="boot talking hello"
                        id="img-bot-hello"
                     />
                     <div id="content-chat-initial">
                        <p>Como posso ajudar você?</p>
                        <InputChat onSubmit={submitPrompt} />
                     </div>
                  </>
               )}

               {/* Messages */}
               {messages.length > 0 && (
                  <>
                     <div id="render-messages">
                        <div id="content-chat">
                           <div id="messages">
                              {messages.map((message, index) => (
                                 <MessageChat
                                    message={message.text as string}
                                    type={message.typeUser}
                                    numberImageBot={
                                       index === messages.length - 1
                                          ? message.expression
                                          : undefined
                                    }
                                 />
                              ))}
                           </div>
                        </div>
                        <InputChat onSubmit={submitPrompt} />
                     </div>
                  </>
               )}
            </section>
         </main>
      </>
   );
};

export default Chat;
