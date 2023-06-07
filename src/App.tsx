import React from 'react';
import { Routes , Route } from "react-router-dom";
import { 
  Main
} from "./pages";

const App = () => {
  return (
    <Routes>
       <Route path="/" element={<Main/>}> </Route>
    </Routes>
  )
}

export default App;
