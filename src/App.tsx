import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./router/AppRouter";
import { Toaster, ToastPosition } from "react-hot-toast"; // Import ToastPosition type
import InterceptorSetup from "./components/axiosInterceptors/axiosInterceptors";
import { useState, useEffect } from "react";

function App() {
  const [toastPosition, setToastPosition] =
    useState<ToastPosition>("top-right"); // Type the state

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setToastPosition("bottom-center"); // Ensuring a valid ToastPosition
      } else {
        setToastPosition("top-right");
      }
    };

    handleResize();

    // Update position on window resize
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Toaster
          position={toastPosition}
          toastOptions={{
            duration: 1000,
          }}
        />
        <InterceptorSetup>
          <AppRouter />
        </InterceptorSetup>
      </BrowserRouter>
    </>
  );
}

export default App;
