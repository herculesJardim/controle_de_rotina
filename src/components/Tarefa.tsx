import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import { formatDateForDisplay, formatTimeForDisplay } from "../lib/formatters";
import { deleteTask, toggleTaskDone } from "../lib/tasks";
import { TarefaType } from "../tipos/types";

type TarefaProps = {
  tarefa: TarefaType;
  onChange?: () => void;
};

export default function Tarefa({ tarefa, onChange }: TarefaProps) {
  const cores: Record<TarefaType["priority"], string> = {
    alta: "#F92323",
    media: "#d0cd19",
    baixa: "#22CC41",
  };
  const [visible, setVisible] = useState(false);
  const [isDone, setIsDone] = useState(tarefa.is_done);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    setIsDone(tarefa.is_done);
  }, [tarefa.is_done]);

  async function handleToggleDone() {
    const nextValue = !isDone;
    setIsDone(nextValue);

    try {
      await toggleTaskDone(tarefa.id, nextValue);
      onChange?.();
    } catch {
      setIsDone(!nextValue);
      Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
    }
  }

  async function handleDelete() {
    try {
      await deleteTask(tarefa.id);
      onChange?.();
    } catch {
      Alert.alert("Erro", "Não foi possível excluir a tarefa.");
    }
  }

  return (
    <>
      <View style={style.container}>
        <View style={style.hora}>
          <Text
            style={{
              fontSize: 18,
              color: "#837575",
            }}
          >
            {formatTimeForDisplay(tarefa.task_time)}
          </Text>
          <Feather
            name="alert-triangle"
            size={24}
            color={cores[tarefa.priority]}
          />
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Pressable onPress={showModal}>
            <Text style={style.title} numberOfLines={1} ellipsizeMode="tail">
              {tarefa.title}
            </Text>

            <View style={style.description}>
              <Text style={style.text} numberOfLines={2} ellipsizeMode="tail">
                {tarefa.description ?? "Sem descrição"}
              </Text>
            </View>
          </Pressable>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={style.modal}
            >
              <View>
                <Feather
                  name="alert-triangle"
                  size={24}
                  color={cores[tarefa.priority]}
                />
              </View>
              <Text style={style.title}>{tarefa.title}</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#837575",
                  }}
                >
                  {formatTimeForDisplay(tarefa.task_time)}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#837575",
                  }}
                >
                  {formatDateForDisplay(tarefa.task_date)}
                </Text>
              </View>
              <Text style={style.text}>
                {tarefa.description ?? "Sem descrição"}
              </Text>
              {tarefa.location ? (
                <Text style={style.text}>Local: {tarefa.location}</Text>
              ) : null}
            </Modal>
          </Portal>
        </View>
        <TouchableOpacity onPress={handleToggleDone}>
          <Feather name="check" size={30} color={isDone ? "#22CC41" : "#999"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/cadastro_tarefa",
              params: { id: tarefa.id },
            })
          }
        >
          <FontAwesome name="pencil-square-o" size={30} color="#A35635" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <MaterialIcons name="close" size={30} color="#F92323" />
        </TouchableOpacity>
      </View>
    </>
  );
}
const style = StyleSheet.create({
  container: {
    padding: 5,
    gap: 5,
    alignSelf: "stretch",
    height: 100,
    backgroundColor: "#ffff",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  description: {
    width: "80%",
  },
  text: {
    fontSize: 12,
    color: "#837575",
  },
  hora: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    paddingTop: 40,
    height: 444,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    margin: 20,
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
