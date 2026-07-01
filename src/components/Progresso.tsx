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
  const porcentagemFeitaFormatada = porcentagemFeita.toFixed(2);
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
      <View style={style.graphic}>
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
                {porcentagemFeitaFormatada}%
              </Text>
            );
          }}
        />
      </View>
      <View style={style.content}>
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
  graphic: {
    width: "33%",
    alignItems: "center",
  },
  content: {
    width: "67%",
  },
  container: {
    width: "95%",
    height: 100,
    backgroundColor: "#ffff",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  text: {
    color: "#6C5E5E",
    fontSize: 16,
  },

  painel: {
    color: "#197293",
    fontSize: 16,
  },
});
