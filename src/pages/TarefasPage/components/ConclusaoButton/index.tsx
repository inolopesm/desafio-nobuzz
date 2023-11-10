import { useState } from "react";
import Button, { ButtonProps } from "../../../../components/Button";
import useAuth from "../../../../hooks/useAuth";
import Tarefa from "../../../../interfaces/Tarefa";
import request, { RequestParams } from "../../../../utils/request";

export interface TarefasPageConclusaoProps {
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
}: TarefasPageConclusaoProps) {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const handleConclusao = () => {
    setLoading(true);

    const params: RequestParams = {
      method: "PATCH",
      url: `http://localhost:3000/v1/api/tarefas/${tarefa.id}/conclusao`,
      headers: { authorization: `Bearer ${auth.accessToken}` },
      data: { concluido: !tarefa.dataConclusao },
    };

    request<Tarefa>(params)
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
      onClick={handleConclusao}
    >
      {tarefa.dataConclusao ? "Não concluído" : "Concluir"}
    </Button>
  );
}
