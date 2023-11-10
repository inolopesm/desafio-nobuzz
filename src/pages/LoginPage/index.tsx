import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import CardBody from "../../components/Card/Body";
import CardRoot from "../../components/Card/Root";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";
import styles from "./styles.module.css";
import useAlert from "../../hooks/useAlert";
import request, { RequestError } from "../../utils/request";

const translate = { "Invalid credentials": "Credenciais inválidas" };

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email === "") return alert.set("warn", "Campo email é obrigatório");
    if (senha === "") return alert.set("warn", "Campo senha é obrigatório");

    if (email.length > 254)
      return alert.set("warn", "Campo email deve ter no máximo 254 caracteres");

    if (senha.length > 64)
      return alert.set("warn", "Campo senha deve ter no máximo 64 caracteres");

    if (!isEmail(email))
      return alert.set("warn", "Campo email com valor inválido");

    setLoading(true);

    try {
      const response = await request<{ accessToken: string }>({
        method: "POST",
        url: "http://localhost:3000/v1/api/sessoes",
        data: { email, senha },
      });

      auth.login(response.data.accessToken);
      navigate("/tarefas");
    } catch (err) {
      alert.set(
        err instanceof RequestError ? err.type : "error",
        err instanceof Error
          ? translate["Invalid credentials"] ?? err.message
          : String(err)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <CardRoot className={styles.card}>
        <CardBody className={styles.cardBody}>
          <div className={styles.title}>Desafio NoBuzz</div>
          {alert.state && (
            <Alert variant={alert.state.variant}>{alert.state.message}</Alert>
          )}
          <Input
            type="email"
            placeholder="nome@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="********"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={loading}
          />
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            Entrar
          </Button>
        </CardBody>
      </CardRoot>
    </div>
  );
}
