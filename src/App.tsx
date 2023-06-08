import React from 'react';
import { Routes , Route } from "react-router-dom";
import { 
  Main,
  Homepage,
  AllCrypto,
  News,
  Crypto
} from "./pages";

const App = () => {
  return (
    <Routes>
       <Route path="/" element={<Main/>}> 
         <Route index element={<Homepage/>}/>
         <Route path="cryptocurrencies" element={<AllCrypto/>}/>
         <Route path="news" element={<News/>}/>
         <Route path="crypto/:id" element={<Crypto/>}/>
       </Route>
    </Routes>
  )
}

export default App;
