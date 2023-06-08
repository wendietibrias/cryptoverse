import React from 'react';
import { Routes , Route } from "react-router-dom";
import { 
  Main,
  Homepage
} from "./pages";

const App = () => {
  return (
    <Routes>
       <Route path="/" element={<Main/>}> 
         <Route index element={<Homepage/>}/>
       </Route>
    </Routes>
  )
}

export default App;
