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
        <Text style={style.label}> Abril, 2026</Text>
        <View style={style.dias}>
          <Dia dia={{ diaMes: "17", diaSemana: "Sex" }} />
          <Dia dia={{ diaMes: "18", diaSemana: "Sab" }} />
          <Dia dia={{ diaMes: "19", diaSemana: "Dom" }} />
          <Dia dia={{ diaMes: "20", diaSemana: "Seg" }} />
          <Dia dia={{ diaMes: "21", diaSemana: "Ter" }} />
          <Dia dia={{ diaMes: "22", diaSemana: "Qua" }} />
        </View>
        <Progresso tarefa={{ tarefasFeitas: 9, tarefasTotais: 18 }} />
        <View style={style.label}>
          <Text>Minhas Tarefas</Text>
        </View>
        <Tarefa
          tarefa={{
            horario: "10:00",
            title: "Reunião da Turma",
            descricao: "Reunião para decidir o que será da blusa...",
          }}
        />
        <Tarefa
          tarefa={{
            horario: "12:00",
            title: "Preparar Almoço",
            descricao: "Reunião para decidir o que será da blusa ...",
          }}
        />
        <Tarefa
          tarefa={{
            horario: "18:00",
            title: "Arrumar para Fac...",
            descricao: "Reunião para decidir o que será da blusa...",
          }}
        />
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
    flex: 1,
    borderRadius: 12,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  dias: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  label: {
    width: "90%",
  },
});
