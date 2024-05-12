import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import Home from "./pages/Home";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={(<route.element/>,)} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
