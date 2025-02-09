import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat/Chat";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Chat />}></Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
