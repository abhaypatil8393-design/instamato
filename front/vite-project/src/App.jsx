import "./App.css";
import AuthRoutes from "./Routes/auth.routes.jsx";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar.jsx";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbarPaths = [
    "/user/login",
    "/user/register",
    "/foodpartner/login",
    "/foodpartner/register"
  ];
  
  // Also check if pathname is dynamic profile link (wait, should we show navbar on profile page? Yes, show navbar on profile pages so users can go back home or add meals easily!)
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="app-container" style={{ minHeight: "100vh", position: "relative" }}>
      <div className="content-container" style={{ paddingBottom: shouldShowNavbar ? "70px" : "0px" }}>
        <AuthRoutes />
      </div>
      {shouldShowNavbar && <BottomNavbar />}
    </div>
  );
}

export default App;