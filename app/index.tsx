import Adicionar from "@/src/components/Adicionar";
import Cabecalho from "@/src/components/Cabecalho";
import CarrocelDias from "@/src/components/CarrocelDias";
import Progresso from "@/src/components/Progresso";
import Tarefa from "@/src/components/Tarefa";
import { TarefaType } from "@/src/tipos/types";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Index() {
  /*const diasSemana: DiaType[] = [
    { diaMes: "17", diaSemana: "Sex" },
    { diaMes: "18", diaSemana: "Sab" },
    { diaMes: "19", diaSemana: "Dom" },
    { diaMes: "20", diaSemana: "Seg" },
    { diaMes: "21", diaSemana: "Ter" },
    { diaMes: "22", diaSemana: "Qua" },
    { diaMes: "17", diaSemana: "Sex" },
    { diaMes: "18", diaSemana: "Sab" },
    { diaMes: "19", diaSemana: "Dom" },
    { diaMes: "20", diaSemana: "Seg" },
    { diaMes: "21", diaSemana: "Ter" },
    { diaMes: "22", diaSemana: "Qua" },
  ];*/
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
    <View style={style.container}>
      <Cabecalho cabecalho={{ title: "Gerenciador Diário" }} />
      <View style={style.content}>
        <Text style={style.label}> Abril, 2026</Text>
        <View style={style.dias}>
          <CarrocelDias />
          {/*<FlatList
            contentContainerStyle={{ gap: 2 }}
            data={diasSemana}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Dia dia={item} />}
          />*/}
        </View>
        <Progresso tarefa={{ tarefasFeitas: 9, tarefasTotais: 20 }} />
        <View style={style.label}>
          <Text>Minhas Tarefas</Text>
        </View>
        <FlatList
          style={{ flex: 1, alignSelf: "stretch" }}
          contentContainerStyle={{ gap: 5 }}
          showsHorizontalScrollIndicator={false}
          data={tarefas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Tarefa tarefa={item} />}
        />
        <Adicionar />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A35635",
  },
  content: {
    backgroundColor: "#ffff",
    gap: 10,
    padding: 5,
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 12,
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
    justifyContent: "space-around",
    height: 80,
    alignSelf: "stretch",
  },
  label: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
