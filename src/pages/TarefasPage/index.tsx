import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/Button";
import Input from "../../components/Input";
import formatDate from "../../utils/formatDate";
import Container from "../../components/Container";
import request, { RequestError } from "../../utils/request";
import Alert from "../../components/Alert";

interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  dataAtualizacao: string;
  dataConclusao: string | null;
}

export default function TarefasPage() {
  const auth = useAuth();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [alert, setAlert] = useState<{ type: "warn" | "error"; msg: string }>();

  const emitWarn = (msg: string) => setAlert({ type: "warn", msg });

  useEffect(() => {
    if (!auth.accessToken) return;

    request<Tarefa[]>({
      url: "http://localhost:3000/v1/api/tarefas",
      headers: { authorization: `Bearer ${auth.accessToken}` },
    })
      .then((response) => setTarefas(response.data))
      .catch((er: RequestError) => setAlert({ type: er.type, msg: er.message }))
      .finally(() => setLoading(false));
  }, [auth.accessToken]);

  const handleSubmit = async () => {
    if (titulo === "") return emitWarn("Campo titulo é obrigatório");

    if (titulo.length > 60)
      return emitWarn("Campo titulo deve ter no máximo 60 caracteres");

    if (descricao.length > 2 ** 16 - 1)
      return emitWarn("Campo descricao deve ter no máximo 64 caracteres");

    setLoading(true);

    try {
      const response = await request<Tarefa>({
        method: "POST",
        url: "http://localhost:3000/v1/api/tarefas",
        headers: { authorization: `Bearer ${auth.accessToken}` },
        data: { titulo, descricao },
      });

      setTarefas([...tarefas, response.data]);
      setTitulo("");
      setDescricao("");
    } catch (error) {
      const err = error as RequestError;
      setAlert({ type: err.type, msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.headerBrand}>Desafio NoBuzz</div>
      </div>
      <Container>
        {alert && (
          <Alert className={styles.alert} type={alert.type}>
            {alert.msg}
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
        <div className={styles.tasks}>
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descrição</th>
                  <th>Status</th>
                  <th>Criado Em</th>
                </tr>
              </thead>
              <tbody>
                {tarefas.map((tarefa) => (
                  <tr key={tarefa.id}>
                    <td>{tarefa.titulo}</td>
                    <td>{tarefa.descricao}</td>
                    <td>
                      {tarefa.dataConclusao ? "concluído" : "não concluído"}
                    </td>
                    <td title={tarefa.dataCriacao}>
                      {formatDate(new Date(tarefa.dataCriacao))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}
