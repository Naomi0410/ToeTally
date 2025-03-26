import { ToastContainer, Bounce } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        transition={Bounce}
        theme="colored"
        className="text-capitalize"
      />
      <AppRoutes />
    </>
  );
}

export default App;
