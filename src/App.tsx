import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
          }}
        />{" "}
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
