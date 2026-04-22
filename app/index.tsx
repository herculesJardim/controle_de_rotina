import Cabecalho from "@/src/components/Cabecalho";
import Dia from "@/src/components/Dia";
import Progresso from "@/src/components/Progresso";
import Tarefa from "@/src/components/Tarefa";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={style.container}>
      <Cabecalho cabecalho={{ title: "Gerenciador Diário" }} />
      <View style={style.content}>
        <Text> Abril, 2026</Text>
        <View style={style.dias}>
          <Dia />
          <Dia />
          <Dia />
          <Dia />
          <Dia />
          <Dia />
        </View>
        <Progresso />
        <Text>Minhas Tarefas</Text>
        <Tarefa />
        <Tarefa />
        <Tarefa />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    gap: 10,
    flex: 1,
  },
  herder: {},
  dias: {
    flexDirection: "row",
    gap: 10,
  },
});
