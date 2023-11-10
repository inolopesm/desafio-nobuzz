import isEmail from "validator/lib/isEmail";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import CardBody from "../../components/Card/Body";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";
import useAlert from "../../hooks/useAlert";
import api from "../../services/api";
import styles from "./styles.module.css";
import requestErrorToAlert from "../../utils/requestErrorToAlert";
import Link from "../../components/Link";

const translate: Record<string, string> = {
  "Invalid credentials": "Credenciais inválidas",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email === "") return alert.warn("Campo email é obrigatório");
    if (senha === "") return alert.warn("Campo senha é obrigatório");

    if (email.length > 254)
      return alert.warn("Campo email deve ter no máximo 254 caracteres");

    if (senha.length > 64)
      return alert.warn("Campo senha deve ter no máximo 64 caracteres");

    if (!isEmail(email)) return alert.warn("Campo email com valor inválido");

    setLoading(true);

    try {
      const response = await api<{ accessToken: string }>({
        method: "POST",
        url: "/sessoes",
        data: { email, senha },
      });

      auth.login(response.data.accessToken);
      navigate("/tarefas");
    } catch (err) {
      alert.set(requestErrorToAlert(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={styles.container}>
      <Card className={styles.card}>
        <CardBody className={styles.cardBody}>
          <div className={styles.title}>Desafio NoBuzz</div>
          {alert.state && (
            <Alert variant={alert.state.variant}>
              {translate[alert.state.message] ?? alert.state.message}
            </Alert>
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
          <div className={styles.signup}>
            Não possui uma conta? <Link to="/signup">Faça o cadastro</Link>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}
