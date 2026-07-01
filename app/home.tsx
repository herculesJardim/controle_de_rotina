import Adicionar from "@/src/components/Adicionar";
import CarrocelDias from "@/src/components/CarrocelDias";
import Progresso from "@/src/components/Progresso";
import Tarefa from "@/src/components/Tarefa";
import { useSelectedDate } from "@/src/context/selectedDateContext";
import { formatDateForDisplay } from "@/src/lib/formatters";
import { getTasks } from "@/src/lib/tasks";
import { TarefaType } from "@/src/tipos/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../src/lib/supabase";

export default function Home() {
  const [tarefas, setTarefas] = useState<TarefaType[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedDate } = useSelectedDate();

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTarefas(data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as tarefas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Erro ao sair", error.message);
      return;
    }

    router.replace("/login");
  }

  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity style={style.button} onPress={handleLogout}>
        <Text style={style.buttonText}>Sair</Text>
      </TouchableOpacity>
      <View style={style.content}>
        <View style={style.dias}>
          <CarrocelDias />
        </View>
        <Progresso
          tarefa={{
            tarefasFeitas: tarefas.filter((task) => task.is_done).length,
            tarefasTotais: tarefas.length,
          }}
        />
        <View style={style.label}>
          <Text style={style.labelText}>Minhas Tarefas</Text>
          <Text style={style.dateText}>
            {formatDateForDisplay(selectedDate)}
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={{ flex: 1, width: "95%" }}
            contentContainerStyle={{ gap: 5 }}
            showsVerticalScrollIndicator={false}
            data={tarefas.filter((task) => task.task_date === selectedDate)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Tarefa tarefa={item} onChange={loadTasks} />
            )}
            ListEmptyComponent={
              <Text>Nenhuma tarefa cadastrada para esta data.</Text>
            }
          />
        )}
        <Adicionar />
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#197293",
  },
  content: {
    backgroundColor: "#d9d9d9",
    gap: 10,
    padding: 5,
    flex: 1,
    alignSelf: "stretch",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 68,
  },
  dias: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  label: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  labelText: {
    color: "#000000",
    fontSize: 16,
  },
  dateText: {
    color: "#4b5563",
    fontSize: 13,
    marginTop: 2,
  },
  button: {
    position: "absolute",
    top: 5,
    right: 15,
    backgroundColor: "#af1b1b",
    borderRadius: 4,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
});
