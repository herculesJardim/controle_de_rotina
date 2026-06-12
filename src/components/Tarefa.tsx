import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import { TarefaType } from "../tipos/types";
type TarefaProps = {
  tarefa: TarefaType;
};
export default function Tarefa({ tarefa }: TarefaProps) {
  const cores: Record<TarefaType["prioridade"], string> = {
    1: "#F92323",
    2: "#d0cd19",
    3: "#22CC41",
  };
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
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
            {tarefa.horario}
          </Text>
          <Feather
            name="alert-triangle"
            size={24}
            color={cores[tarefa.prioridade]}
          />
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Pressable onPress={showModal}>
            <Text style={style.title} numberOfLines={1} ellipsizeMode="tail">
              {tarefa.title}
            </Text>

            <View style={style.description}>
              <Text style={style.text} numberOfLines={2} ellipsizeMode="tail">
                {tarefa.descricao}
              </Text>
            </View>
          </Pressable>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={style.modal}
            >
              <Text style={style.title}>{tarefa.title}</Text>
              <Text style={style.text}>{tarefa.descricao}</Text>
            </Modal>
          </Portal>
        </View>
        <TouchableOpacity>
          <Feather name="check" size={30} color="#22CC41" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/cadastro_tarefa")}>
          <FontAwesome name="pencil-square-o" size={30} color="#A35635" />
        </TouchableOpacity>
        <TouchableOpacity>
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
    margin: 30,
    gap: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
