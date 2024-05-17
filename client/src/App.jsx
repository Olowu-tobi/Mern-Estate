import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthMiddleware from "./middleware/AuthMiddleware";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <AuthMiddleware isPrivate={route.isPrivate}>
                  <route.element />
                </AuthMiddleware>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
