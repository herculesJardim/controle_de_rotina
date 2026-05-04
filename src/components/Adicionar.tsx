import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
export default function Adicionar() {
  return (
    <TouchableOpacity style={style.container}>
      <Ionicons name="add" size={40} color="white" />
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,

    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: "#197293",
    alignItems: "center",
    justifyContent: "center",

    elevation: 6, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
