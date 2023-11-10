import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/Button";
import Input from "../../components/Input";
import formatDate from "../../utils/formatDate";
import Container from "../../components/Container";
import request, { RequestError } from "../../utils/request";
import Alert from "../../components/Alert";
import TableResponsive from "../../components/Table/Responsive";
import Table from "../../components/Table";
import ellipsis from "../../utils/ellipsis";
import useAlert from "../../hooks/useAlert";

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
  const alert = useAlert();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (!auth.accessToken) return;

    request<Tarefa[]>({
      url: "http://localhost:3000/v1/api/tarefas",
      headers: { authorization: `Bearer ${auth.accessToken}` },
    })
      .then((response) => setTarefas(response.data))
      .catch((err) =>
        alert.set(
          err instanceof RequestError ? err.type : "error",
          err instanceof Error ? err.message : String(err)
        )
      )
      .finally(() => setLoading(false));
  }, [auth.accessToken, alert]);

  const handleSubmit = async () => {
    if (titulo === "") return alert.set("warn", "Campo titulo é obrigatório");

    if (titulo.length > 60)
      return alert.set("warn", "Campo titulo deve ter no máximo 60 caracteres");

    if (descricao.length > 2 ** 16 - 1)
      return alert.set(
        "warn",
        "Campo descricao deve ter no máximo 64 caracteres"
      );

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

      alert.clear();
    } catch (err) {
      alert.set(
        err instanceof RequestError ? err.type : "error",
        err instanceof Error ? err.message : String(err)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConclusao = (tarefa: Tarefa, index: number) => async () => {
    setLoading(true);

    try {
      const response = await request<Tarefa>({
        method: "PATCH",
        url: `http://localhost:3000/v1/api/tarefas/${tarefa.id}/conclusao`,
        headers: { authorization: `Bearer ${auth.accessToken}` },
        data: { concluido: !tarefa.dataConclusao },
      });

      tarefas[index] = response.data;
      setTarefas([...tarefas]);

      alert.clear();
    } catch (error) {
      const err = error as RequestError;
      alert.set(
        err instanceof RequestError ? err.type : "error",
        err instanceof Error ? err.message : String(err)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerBrand}>Desafio NoBuzz</div>
      </div>
      <Container>
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
        <div className={styles.tasks}>
          <TableResponsive>
            <Table className={styles.table}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descrição</th>
                  <th>Status</th>
                  <th>Criado Em</th>
                </tr>
              </thead>
              <tbody>
                {tarefas.map((tarefa, index) => (
                  <tr key={tarefa.id}>
                    <td>{tarefa.titulo}</td>
                    <td>{ellipsis(tarefa.descricao, 30)}</td>
                    <td title={tarefa.dataConclusao ?? undefined}>
                      {tarefa.dataConclusao ? "concluído" : "não concluído"}
                      <Button
                        className={styles.conclusaoButton}
                        type="button"
                        variant="secondary"
                        size="small"
                        disabled={loading}
                        onClick={handleConclusao(tarefa, index)}
                      >
                        {tarefa.dataConclusao ? "Não concluído" : "Concluir"}
                      </Button>
                    </td>
                    <td title={tarefa.dataCriacao}>
                      {formatDate(new Date(tarefa.dataCriacao))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableResponsive>
        </div>
      </Container>
    </>
  );
}
