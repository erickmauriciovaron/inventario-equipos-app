import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthContext";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;