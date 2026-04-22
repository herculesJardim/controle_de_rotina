import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Progresso() {
  return (
    <TouchableOpacity style={style.container}>
      <View style={style.grafico}></View>
      <View>
        <Text style={style.title}>Progresso Semanal</Text>
        <View style={style.text}>
          <Text>09/18</Text>
          <Text>Tarefas Realizadas</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  container: {
    width: 251,
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
  text: {
    flexDirection: "row",
    gap: 10,
  },
  grafico: {
    width: 50,
    height: 50,
  },
});
