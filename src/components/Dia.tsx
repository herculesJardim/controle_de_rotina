import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { DiaType } from "../tipos/types";

type DiaProps = {
  dia: DiaType;
};
export default function Dia({ dia }: DiaProps) {
  return (
    <TouchableOpacity style={style.container}>
      <Text style={{ fontSize: 14 }}>{dia.diaMes}</Text>
      <Text style={{ fontSize: 10 }}>{dia.diaSemana}</Text>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  container: {
    width: 35,
    height: 55,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
