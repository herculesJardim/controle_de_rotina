import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProgressoType } from "../tipos/types";
type ProgressoProps = {
  tarefa: ProgressoType;
};
export default function Progresso({ tarefa }: ProgressoProps) {
  return (
    <TouchableOpacity style={style.container}>
      <View style={style.grafico}></View>
      <View>
        <Text style={style.title}>Progresso Semanal</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={style.painel}>
            {tarefa.tarefasFeitas}/{tarefa.tarefasTotais}
          </Text>
          <Text style={style.text}>Tarefas Realizadas</Text>
        </View>
      </View>
    </TouchableOpacity>
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
    fontSize: 12,
  },
  text: {
    color: "#6C5E5E",
    fontSize: 10,
  },
  grafico: {
    width: 50,
    height: 50,
  },
  painel: {
    color: "#197293",
    fontSize: 11,
  },
});
