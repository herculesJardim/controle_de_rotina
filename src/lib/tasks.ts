import { TarefaType } from "../tipos/types";
import { supabase } from "./supabase";

export type TaskInput = Omit<
  TarefaType,
  "id" | "created_at" | "updated_at" | "user_id"
>;

function formatTimeValue(value?: string | null) {
  if (!value) return null;

  const cleaned = value.trim();
  if (!cleaned) return null;

  const [hours = "00", minutes = "00"] = cleaned.split(":");
  const normalizedHours = hours.padStart(2, "0").slice(0, 2);
  const normalizedMinutes = minutes.padStart(2, "0").slice(0, 2);

  return `${normalizedHours}:${normalizedMinutes}:00`;
}

async function ensureUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Usuário não autenticado.");
  }

  return user;
}

export async function getTasks() {
  await ensureUser();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("task_date", { ascending: true })
    .order("task_time", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as TarefaType[];
}

export async function createTask(input: TaskInput) {
  await ensureUser();

  const payload = {
    title: input.title.trim(),
    description: input.description?.trim() || null,
    task_date: input.task_date,
    task_time: formatTimeValue(input.task_time),
    location: input.location?.trim() || null,
    recurrence: input.recurrence,
    priority: input.priority,
    is_done: input.is_done ?? false,
  };

  const { data, error } = await supabase
    .from("tasks")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as TarefaType;
}

export async function updateTask(id: string, input: TaskInput) {
  await ensureUser();

  const payload = {
    title: input.title.trim(),
    description: input.description?.trim() || null,
    task_date: input.task_date,
    task_time: formatTimeValue(input.task_time),
    location: input.location?.trim() || null,
    recurrence: input.recurrence,
    priority: input.priority,
    is_done: input.is_done ?? false,
  };

  const { data, error } = await supabase
    .from("tasks")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as TarefaType;
}

export async function deleteTask(id: string) {
  await ensureUser();

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

export async function toggleTaskDone(id: string, is_done: boolean) {
  await ensureUser();

  const { data, error } = await supabase
    .from("tasks")
    .update({ is_done })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as TarefaType;
}
