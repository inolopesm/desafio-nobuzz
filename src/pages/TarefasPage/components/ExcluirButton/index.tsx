import { useState } from "react";
import Button, { ButtonProps } from "../../../../components/Button";
import useAuth from "../../../../hooks/useAuth";
import Tarefa from "../../../../interfaces/Tarefa";
import request, { RequestParams } from "../../../../utils/request";

export interface TarefasPageExcluirButtonProps {
  tarefa: Tarefa;
  onSuccess: (tarefa: Tarefa) => void;
  onError: (error: unknown) => void;
  className?: ButtonProps["className"];
}

export default function TarefasPageExcluirButton({
  tarefa,
  onSuccess,
  onError,
  className,
}: TarefasPageExcluirButtonProps) {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    const params: RequestParams = {
      method: "DELETE",
      url: `http://localhost:3000/v1/api/tarefas/${tarefa.id}`,
      headers: { authorization: `Bearer ${auth.accessToken}` },
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
      onClick={handleClick}
    >
      Excluir
    </Button>
  );
}
