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
            fontSize: 12,
            color: "#837575",
          }}
        >
          {tarefa.horario}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={style.title}>{tarefa.title}</Text>
        <View style={style.description}>
          <Text style={style.text}>{tarefa.descricao}</Text>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    width: "90%",
    height: 54,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    flex: 1,
  },
  text: {
    fontSize: 8,
    color: "#837575",
  },
  hora: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
