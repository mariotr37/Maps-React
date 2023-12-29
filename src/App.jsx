import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./context/authContext";

export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
