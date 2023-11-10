import isEmail from "validator/lib/isEmail";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import CardBody from "../../components/Card/Body";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Link from "../../components/Link";
import useAlert from "../../hooks/useAlert";
import api from "../../services/api";
import styles from "./styles.module.css";
import requestErrorToAlert from "../../utils/requestErrorToAlert";

const isSenha = (value: string) => {
  const regex = /^[A-Za-z0-9!@#$%^&*]+$/;
  return regex.test(value);
};

const translate: Record<string, string> = {
  "E-mail in use": "E-mail em uso",
};

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email === "") return alert.warn("Campo email é obrigatório");
    if (senha === "") return alert.warn("Campo senha é obrigatório");

    if (email.length > 254)
      return alert.warn("Campo email deve ter no máximo 254 caracteres");

    if (senha.length < 8)
      return alert.warn("Campo senha deve ter no mínimo 8 caracteres");

    if (senha.length > 64)
      return alert.warn("Campo senha deve ter no máximo 64 caracteres");

    if (senha !== senhaConfirmacao)
      return alert.warn("Campos senha e confirmação da senha não são iguais");

    if (!isEmail(email)) return alert.warn("Campo email com valor inválido");
    if (!isSenha(senha)) return alert.warn("Campo com caracteres inválidos");

    setLoading(true);

    api({ method: "POST", url: "/usuarios", data: { email, senha } })
      .then(() => navigate("/login"))
      .catch((err) => alert.set(requestErrorToAlert(err)))
      .finally(() => setLoading(false));
  };

  return (
    <Container className={styles.container}>
      <Card className={styles.card}>
        <CardBody className={styles.cardBody}>
          <div className={styles.title}>Criar Usuário</div>
          {alert.state && (
            <Alert variant={alert.state.variant}>
              {translate[alert.state.message] ?? alert.state.message}
            </Alert>
          )}
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Confirmação da Senha"
            value={senhaConfirmacao}
            onChange={(e) => setSenhaConfirmacao(e.target.value)}
            disabled={loading}
          />
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            Criar
          </Button>
          <div className={styles.login}>
            Já possui uma conta? <Link to="/login">Faça o login</Link>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}
