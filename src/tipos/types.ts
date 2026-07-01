export type CabecalhoType = {
  title: string;
};

export type TaskPriority = "baixa" | "media" | "alta";
export type TaskRecurrence = "nenhuma" | "diaria" | "semanal" | "mensal";

export type TarefaType = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  task_date: string;
  task_time: string | null;
  location: string | null;
  recurrence: TaskRecurrence;
  priority: TaskPriority;
  is_done: boolean;
  created_at: string;
  updated_at: string;
};

export type DiaType = {
  diaMes: string;
  diaSemana: string;
};
export type ProgressoType = {
  tarefasFeitas: number;
  tarefasTotais: number;
};
