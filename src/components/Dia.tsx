import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Dia() {
  return (
    <TouchableOpacity style={style.container}>
      <Text>17</Text>
      <Text>s</Text>
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
