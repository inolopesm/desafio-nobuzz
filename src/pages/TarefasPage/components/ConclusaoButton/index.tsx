import { useState } from "react";
import Button, { ButtonProps } from "../../../../components/Button";
import useAuth from "../../../../hooks/useAuth";
import Tarefa from "../../../../interfaces/Tarefa";
import api from "../../../../services/api";
import { RequestParams } from "../../../../utils/request";

export interface TarefasPageConclusaoButtonProps {
  tarefa: Tarefa;
  onSuccess: (tarefa: Tarefa) => void;
  onError: (error: unknown) => void;
  className?: ButtonProps["className"];
}

export default function TarefasPageConclusaoButton({
  tarefa,
  onSuccess,
  onError,
  className,
}: TarefasPageConclusaoButtonProps) {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    const params: RequestParams = {
      method: "PATCH",
      url: `/tarefas/${tarefa.id}/conclusao`,
      headers: { authorization: `Bearer ${auth.accessToken}` },
      data: { concluido: !tarefa.dataConclusao },
    };

    api<Tarefa>(params)
      .then((response) => onSuccess(response.data))
      .catch((error) => onError(error))
      .finally(() => setLoading(false));
  };

  return (
    <Button
      className={className}
      type="button"
      variant="secondary"
      size="small"
      disabled={loading}
      onClick={handleClick}
    >
      {tarefa.dataConclusao ? "Não concluído" : "Concluir"}
    </Button>
  );
}
