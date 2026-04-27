import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { ProgressoType } from "../tipos/types";
type ProgressoProps = {
  tarefa: ProgressoType;
};
export default function Progresso({ tarefa }: ProgressoProps) {
  const aFazer = tarefa.tarefasTotais - tarefa.tarefasFeitas;
  const porcentagemFeita = (tarefa.tarefasFeitas / tarefa.tarefasTotais) * 100;
  const porcentagemAFazer = (aFazer / tarefa.tarefasTotais) * 100;
  const pieData = [
    {
      value: porcentagemFeita,
      color: "#ff5c00",
    },
    {
      value: porcentagemAFazer,
      color: "#474442",
    },
  ];
  return (
    <TouchableOpacity style={style.container}>
      <PieChart
        data={pieData}
        donut
        radius={45}
        innerRadius={35}
        showGradient={false}
        sectionAutoFocus
        centerLabelComponent={() => {
          return (
            <Text style={{ fontSize: 18, color: "#ff5c00" }}>
              {porcentagemFeita}%
            </Text>
          );
        }}
      />
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
    alignSelf: "stretch",
    height: 100,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 16,
  },
  text: {
    color: "#6C5E5E",
    fontSize: 12,
  },

  painel: {
    color: "#197293",
    fontSize: 12,
  },
});
