import { ToastContainer, Bounce } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        transition={Bounce}
        theme="colored"
        className="text-capitalize"
      />
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </>
  );
}

export default App;
