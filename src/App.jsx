import { useContext } from "react";
import { AuthPage } from "./components";
import { AuthContext } from "./context/authContext";

const App = () => {
  const { status, userId } = useContext(AuthContext);

  if (status === "checking")
    return (
      <p className="loading">
        <span>Checking credentials, wait a moment...</span>
      </p>
    );

  return (
    <main>
      {status === "authenticated" && userId ? <HomePage /> : <AutPage />}
    </main>
  );
};

export default App;

export const HomePage = () => {
  const { userId, handleLogOut } = useContext(AuthContext);

  return (
    <section>
      <h5>
        Your ID is: <span>{userId}</span>
      </h5>
      <button className="btn-logout" onClick={handleLogOut}>
        Log out
      </button>
    </section>
  );
};

export const AutPage = () => {
  return (
    <section>
      <AuthPage />
    </section>
  );
};
