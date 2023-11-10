export default interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  dataAtualizacao: string;
  dataConclusao: string | null;
}
