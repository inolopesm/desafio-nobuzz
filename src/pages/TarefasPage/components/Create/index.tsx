import { useState } from "react";
import Alert from "../../../../components/Alert";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import useAlert from "../../../../hooks/useAlert";
import useAuth from "../../../../hooks/useAuth";
import Tarefa from "../../../../interfaces/Tarefa";
import request from "../../../../utils/request";
import requestErrorToAlert from "../../../../utils/requestErrorToAlert";
import styles from "./styles.module.css";

export interface TarefasPageCreateProps {
  onCreate: (tarefa: Tarefa) => void;
}

export default function TarefasPageCreate({
  onCreate,
}: TarefasPageCreateProps) {
  const auth = useAuth();
  const alert = useAlert();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (titulo === "") return alert.warn("Campo titulo é obrigatório");

    if (titulo.length > 60)
      return alert.warn("Campo titulo deve ter no máximo 60 caracteres");

    if (descricao.length > 2 ** 16 - 1)
      return alert.warn("Campo descricao deve ter no máximo 64 caracteres");

    setLoading(true);

    try {
      const response = await request<Tarefa>({
        method: "POST",
        url: "http://localhost:3000/v1/api/tarefas",
        headers: { authorization: `Bearer ${auth.accessToken}` },
        data: { titulo, descricao },
      });

      onCreate(response.data);

      setTitulo("");
      setDescricao("");

      alert.clear();
    } catch (err) {
      alert.set(requestErrorToAlert(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {alert.state && (
        <Alert className={styles.alert} variant={alert.state.variant}>
          {alert.state.message}
        </Alert>
      )}
      <div className={styles.form}>
        <div className={styles.formInputs}>
          <Input
            className={styles.formInputTitulo}
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            disabled={loading}
          />
          <Input
            className={styles.formInputDescricao}
            placeholder="Descrição (opcional)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className={styles.formButton}>
          <Button type="button" onClick={handleSubmit}>
            Criar tarefa
          </Button>
        </div>
      </div>
    </div>
  );
}
