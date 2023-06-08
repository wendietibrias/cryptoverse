import { Outlet } from "react-router-dom";
import { Sidebar,Footer } from "../components";

const Main = () => {
   return (
      <div className="App flex">
          <Sidebar/>
          <div className="content">
            <Outlet/>
            <Footer/>
          </div>
      </div>
   )
}

export default Main;