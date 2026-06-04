import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
  return (
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
        <Text style={style.title}>{tarefa.title}</Text>
        <View style={style.description}>
          <Text style={style.text} numberOfLines={2} ellipsizeMode="tail">
            {tarefa.descricao}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Feather name="check" size={30} color="#22CC41" />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name="pencil-square-o" size={30} color="#A35635" />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons name="close" size={30} color="#F92323" />
      </TouchableOpacity>
    </View>
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
});
