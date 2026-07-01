import Cabecalho from "@/src/components/Cabecalho";
import { PrioritySelect } from "@/src/components/PrioritySelect";
import Recurrence from "@/src/components/Recurrence";
import TimePickerCustom from "@/src/components/TimePickerCustom";
import { useSelectedDate } from "@/src/context/selectedDateContext";
import {
  formatDateForDisplay,
  formatTimeForDisplay,
  normalizeDateForStorage,
  normalizeTimeForStorage,
} from "@/src/lib/formatters";
import { createTask, updateTask } from "@/src/lib/tasks";
import { TarefaType, TaskPriority, TaskRecurrence } from "@/src/tipos/types";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { supabase } from "../src/lib/supabase";

export default function CadastroTarefa() {
  const params = useLocalSearchParams<{ id?: string }>();
  const navigation = useNavigation();
  const { selectedDate } = useSelectedDate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskDate, setTaskDate] = useState(formatDateForDisplay(selectedDate));
  const [taskTime, setTaskTime] = useState("20:00");
  const [location, setLocation] = useState("");
  const [recurrence, setRecurrence] = useState<TaskRecurrence>("nenhuma");
  const [priority, setPriority] = useState<TaskPriority>("media");
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const isEditing = Boolean(params.id);

  useEffect(() => {
    setTaskDate(formatDateForDisplay(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Cabecalho
          cabecalho={{ title: isEditing ? "Editar Tarefa" : "Nova Tarefa" }}
        />
      ),
    });
  }, [isEditing, navigation]);

  useEffect(() => {
    async function loadTask() {
      if (!params.id) return;

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !data) {
        Alert.alert("Erro", "Não foi possível carregar a tarefa.");
        return;
      }

      const task = data as TarefaType;
      setTitle(task.title);
      setDescription(task.description ?? "");
      setTaskDate(formatDateForDisplay(task.task_date));
      setTaskTime(formatTimeForDisplay(task.task_time));
      setLocation(task.location ?? "");
      setRecurrence(task.recurrence ?? "nenhuma");
      setPriority(task.priority ?? "media");
    }

    loadTask();
  }, [params.id]);

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert("Atenção", "Informe o título da tarefa.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        task_date: normalizeDateForStorage(taskDate),
        task_time: normalizeTimeForStorage(taskTime),
        location,
        recurrence,
        priority,
        is_done: false,
      };

      if (params.id) {
        await updateTask(params.id, payload);
      } else {
        await createTask(payload);
      }

      router.replace("/home");
    } catch {
      Alert.alert("Erro", "Não foi possível salvar a tarefa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={style.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            style.content,
            { paddingBottom: 30 + insets.bottom },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            mode="outlined"
            activeOutlineColor="#197293"
            outlineColor="#197293"
            label="Título"
            value={title}
            onChangeText={setTitle}
            style={style.input}
            outlineStyle={{
              borderWidth: 2,
            }}
          />
          <TextInput
            mode="outlined"
            activeOutlineColor="#197293"
            outlineColor="#197293"
            label="Descrição"
            value={description}
            onChangeText={setDescription}
            style={{ height: 176, width: "90%" }}
            outlineStyle={{
              borderWidth: 2,
            }}
            multiline
          />
          <TextInput
            mode="outlined"
            activeOutlineColor="#197293"
            outlineColor="#197293"
            label="Data"
            value={taskDate}
            onChangeText={setTaskDate}
            placeholder="DD-MM-AAAA"
            style={style.input}
            outlineStyle={{
              borderWidth: 2,
            }}
          />
          <TimePickerCustom value={taskTime} onChange={setTaskTime} />
          <TextInput
            mode="outlined"
            activeOutlineColor="#197293"
            outlineColor="#197293"
            label="Local"
            value={location}
            onChangeText={setLocation}
            style={style.input}
            outlineStyle={{
              borderWidth: 2,
            }}
          />
          <View style={style.leftAlignedField}>
            <Recurrence value={recurrence} onChange={setRecurrence} />
          </View>
          <View style={[style.leftAlignedField, style.priorityField]}>
            <PrioritySelect value={priority} onChange={setPriority} />
          </View>
          <View
            style={{
              position: "relative",
              bottom: 10,
              right: 10,
              flexDirection: "row",
              gap: 10,
              justifyContent: "flex-end",
              alignSelf: "stretch",
            }}
          >
            <Button
              mode="contained-tonal"
              style={style.button}
              onPress={handleSave}
              loading={loading}
              disabled={loading}
            >
              <Text style={style.button}>
                {isEditing ? "Editar" : "Salvar"}
              </Text>
            </Button>
            <Button
              mode="contained-tonal"
              style={[
                style.button,
                { backgroundColor: "#A35635", borderRadius: 2 },
              ]}
              onPress={() => router.push("/home")}
            >
              <Text style={{ backgroundColor: "#A35635", color: "#fff" }}>
                Cancelar
              </Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    backgroundColor: "#197293",
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#197293",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  content: {
    paddingTop: 20,
    paddingBottom: 30,
    flexGrow: 1,
    alignSelf: "stretch",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    gap: 5,
  },
  input: {
    width: "90%",
  },
  leftAlignedField: {
    width: "90%",
    alignItems: "flex-start",
  },
  priorityField: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1C911C",
    color: "#fff",
    width: 150,
    borderRadius: 2,
  },
});
