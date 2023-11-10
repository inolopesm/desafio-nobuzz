import { useState } from "react";

import Alert from "../../../../components/Alert";
import Backdrop from "../../../../components/Backdrop";
import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import CardBody from "../../../../components/Card/Body";
import Checkbox from "../../../../components/Checkbox";
import Container from "../../../../components/Container";
import Input from "../../../../components/Input";
import TextArea from "../../../../components/TextArea";

import Tarefa from "../../../../interfaces/Tarefa";

import useAuth from "../../../../hooks/useAuth";
import useAlert from "../../../../hooks/useAlert";

import api from "../../../../services/api";

import requestErrorToAlert from "../../../../utils/requestErrorToAlert";

import styles from "./styles.module.css";

export interface TarefasPageEditProps {
  tarefa: Tarefa;
  onUpdate: (tarefa: Tarefa) => void;
  onClose: () => void;
}

export default function TarefasPageEdit({
  tarefa,
  onUpdate,
  onClose,
}: TarefasPageEditProps) {
  const auth = useAuth();
  const alert = useAlert();
  const [titulo, setTitulo] = useState(tarefa.titulo);
  const [descricao, setDescricao] = useState(tarefa.descricao);
  const [concluido, setConcluido] = useState(!!tarefa.dataConclusao);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await api<Tarefa>({
        method: "PUT",
        url: `/tarefas/${tarefa.id}`,
        headers: { authorization: `Bearer ${auth.accessToken}` },
        data: { titulo, descricao, concluido },
      });

      alert.clear();
      onUpdate(response.data);
    } catch (err) {
      alert.set(requestErrorToAlert(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Backdrop>
      <Container className={styles.container} fluid>
        <Card>
          <CardBody className={styles.cardBody}>
            <div className={styles.title}>Editar Tarefa</div>
            {alert.state && (
              <Alert variant={alert.state.variant}>{alert.state.message}</Alert>
            )}
            <div className={styles.field}>
              <label htmlFor="descricao" className={styles.label}>
                Título
              </label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="descricao" className={styles.label}>
                Descrição
              </label>
              <TextArea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className={styles.concluido}>
              <Checkbox
                id="concluido"
                checked={concluido}
                onChange={(e) => setConcluido(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="concluido">Concluído</label>
            </div>
            <div className={styles.buttons}>
              <Button type="button" onClick={handleSubmit} disabled={loading}>
                Editar
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </CardBody>
        </Card>
      </Container>
    </Backdrop>
  );
}
