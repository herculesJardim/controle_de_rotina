import Adicionar from "@/src/components/Adicionar";
import CarrocelDias from "@/src/components/CarrocelDias";
import Progresso from "@/src/components/Progresso";
import Tarefa from "@/src/components/Tarefa";
import { TarefaType } from "@/src/tipos/types";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const tarefas: TarefaType[] = [
    {
      horario: "10:00",
      title: "Reunião da Turma",
      descricao: "Reunião para decidir o que será da blusa...",
    },
    {
      horario: "12:00",
      title: "Preparar Almoço",
      descricao: "Reunião para decidir o que será da blusa ...",
    },
    {
      horario: "18:00",
      title: "Arrumar para Fac...",
      descricao: "Reunião para decidir o que será da blusa...",
    },
    {
      horario: "18:00",
      title: "Arrumar para Fac...",
      descricao:
        "So now we know styling the bars. But did you observe that the styles we supply through props are applied to all the bars? What if we want some styles to be applied to only specific bars?",
    },
    {
      horario: "18:00",
      title: "Arrumar para Fac...",
      descricao: "Reunião para decidir o que será da blusa...",
    },
  ];
  return (
    <SafeAreaView style={style.container}>
      <View style={style.content}>
        <View style={style.dias}>
          <CarrocelDias />
        </View>
        <Progresso tarefa={{ tarefasFeitas: 9, tarefasTotais: 20 }} />
        <View style={style.label}>
          <Text>Minhas Tarefas</Text>
        </View>
        <FlatList
          style={{ flex: 1, width: "95%" }}
          contentContainerStyle={{ gap: 5 }}
          showsVerticalScrollIndicator={false}
          data={tarefas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Tarefa tarefa={item} />}
        />
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
    paddingTop: 20,
    backgroundColor: "#ffff",
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
  },
  dias: {
    flexDirection: "row",
    height: 150,
    alignSelf: "stretch",
  },
  label: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
