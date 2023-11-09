import { Navigate, Route, Routes } from "react-router-dom";
import TarefasPage from "./pages/TarefasPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Navigate to="/tarefas" />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/tarefas"
        element={
          <RequireAuth>
            <TarefasPage />
          </RequireAuth>
        }
      />
      <Route
        path="*"
        element={
          <RequireAuth>
            <NotFoundPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
