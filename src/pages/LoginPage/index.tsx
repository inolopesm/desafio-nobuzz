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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [alert, setAlert] = useState<{ type: "warn" | "error"; msg: string }>();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const emitWarn = (msg: string) => setAlert({ type: "warn", msg });

  const handleSubmit = async () => {
    if (email === "") return emitWarn("Campo email é obrigatório");
    if (senha === "") return emitWarn("Campo senha é obrigatório");

    if (email.length > 254)
      return emitWarn("Campo email deve ter no máximo 254 caracteres");

    if (senha.length > 64)
      return emitWarn("Campo senha deve ter no máximo 64 caracteres");

    if (!isEmail(email)) return emitWarn("Campo email com valor inválido");

    setLoading(true);

    const response = await fetch("http://localhost:3000/v1/api/sessoes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (response.status >= 400 && response.status <= 599) {
      return setAlert({
        type: response.status <= 499 ? "warn" : "error",
        msg: Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message,
      });
    }

    auth.login(data.accessToken);
    navigate("/tarefas");
  };

  return (
    <div className={styles.container}>
      <CardRoot className={styles.card}>
        <CardBody className={styles.cardBody}>
          <div className={styles.title}>Login</div>
          {alert && <Alert type={alert.type}>{alert.msg}</Alert>}
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
