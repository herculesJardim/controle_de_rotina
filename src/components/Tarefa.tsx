import { StyleSheet, Text, View } from "react-native";
import { TarefaType } from "../tipos/types";
type TarefaProps = {
  tarefa: TarefaType;
};
export default function Tarefa({ tarefa }: TarefaProps) {
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
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={style.title}>{tarefa.title}</Text>
        <View style={style.description}>
          <Text style={style.text} numberOfLines={2} ellipsizeMode="tail">
            {tarefa.descricao}
          </Text>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    height: 100,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
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
