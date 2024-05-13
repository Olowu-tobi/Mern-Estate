import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Header from "./Components/Header";
import {ToastContainer} from 'react-toastify'

function App() {
  return (
   <div className="bg-[rgb(241,245,241)] h-screen">
  <ToastContainer/>
      <BrowserRouter>
      <Header/>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={(<route.element/>,)} />
          ))}
        </Routes>
      </BrowserRouter>
  
   </div>
  );
}

export default App;
