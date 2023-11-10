import { useEffect, useState } from "react";

import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Table from "../../components/Table";
import TableResponsive from "../../components/Table/Responsive";

import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";

import Tarefa from "../../interfaces/Tarefa";

import ellipsis from "../../utils/ellipsis";
import formatDate from "../../utils/formatDate";
import request from "../../utils/request";

import TarefasPageCreate from "./components/Create";
import TarefasPageEdit, { TarefasPageEditProps } from "./components/Edit";
import TarefasPageExcluirButton from "./components/ExcluirButton";
import TarefasPageHeader from "./components/Header";
import TarefasPageConclusaoButton from "./components/ConclusaoButton";
import requestErrorToAlert from "../../utils/requestErrorToAlert";

import styles from "./styles.module.css";

export default function TarefasPage() {
  const auth = useAuth();
  const alert = useAlert();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [modal, setModal] = useState<{ tarefa: Tarefa; index: number }>();

  useEffect(() => {
    if (!auth.accessToken) return;

    request<Tarefa[]>({
      url: "http://localhost:3000/v1/api/tarefas",
      headers: { authorization: `Bearer ${auth.accessToken}` },
    })
      .then((response) => setTarefas(response.data))
      .catch((err) => alert.set(requestErrorToAlert(err)));
  }, [auth.accessToken, alert]);

  const handleUpdate =
    (index: number): TarefasPageEditProps["onUpdate"] =>
    (tarefa) => {
      tarefas[index] = tarefa;
      setTarefas([...tarefas]);
      setModal(undefined);
    };

  const handleConclusao = (index: number) => (tarefa: Tarefa) => {
    tarefas[index] = tarefa;
    setTarefas([...tarefas]);
    alert.clear();
  };

  return (
    <div className={styles.main}>
      <TarefasPageHeader />

      <Container className={styles.container}>
        <TarefasPageCreate
          onCreate={(tarefa) => setTarefas([...tarefas, tarefa])}
        />

        <div>
          {alert.state && (
            <Alert className={styles.alert} variant={alert.state.variant}>
              {alert.state.message}
            </Alert>
          )}

          <div className={styles.tasks}>
            <TableResponsive>
              <Table className={styles.table}>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Criado Em</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {tarefas.map((tarefa, index) => (
                    <tr key={tarefa.id}>
                      <td>{tarefa.titulo}</td>
                      <td>{ellipsis(tarefa.descricao, 30)}</td>

                      <td title={tarefa.dataConclusao ?? undefined}>
                        {tarefa.dataConclusao ? "concluído" : "não concluído"}
                        <TarefasPageConclusaoButton
                          tarefa={tarefa}
                          onSuccess={handleConclusao(index)}
                          onError={(err) => alert.set(requestErrorToAlert(err))}
                          className={styles.conclusaoButton}
                        />
                      </td>

                      <td title={tarefa.dataCriacao}>
                        {formatDate(new Date(tarefa.dataCriacao))}
                      </td>

                      <td>
                        <Button
                          type="button"
                          variant="secondary"
                          size="small"
                          onClick={() => setModal({ tarefa, index })}
                        >
                          Editar
                        </Button>
                        <TarefasPageExcluirButton
                          tarefa={tarefa}
                          onSuccess={handleConclusao(index)}
                          onError={(err) => alert.set(requestErrorToAlert(err))}
                          className={styles.excluirButton}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableResponsive>
          </div>
        </div>
      </Container>

      {modal && (
        <TarefasPageEdit
          tarefa={modal.tarefa}
          onUpdate={handleUpdate(modal.index)}
          onClose={() => setModal(undefined)}
        />
      )}
    </div>
  );
}
