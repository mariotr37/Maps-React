import { useContext } from "react";
import { AuthPage, HomePage } from "./components";
import { AuthContext } from "./context/authContext";

const App = () => {
  const { status, userId } = useContext(AuthContext);

  if (status === "checking")
    return (
      <p className="loading">
        <span>Chequeando credenciales, espere un momento...</span>
      </p>
    );

  return (
    <main>
      {status === "authenticated" && userId ? <HomePage /> : <AuthPage />}
    </main>
  );
};

export default App;
