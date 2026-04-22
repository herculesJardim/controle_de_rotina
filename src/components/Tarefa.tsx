import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Tarefa() {
  return (
    <TouchableOpacity style={style.container}>
      <View style={style.hora}>
        <Text
          style={{
            fontSize: 12,
            color: "#837575",
          }}
        >
          10:00
        </Text>
      </View>

      <View>
        <Text style={style.title}>Reunião</Text>
        <View style={style.description}>
          <Text style={style.text}>
            Tarefas Realizadas bla lbalblablabl abllba sjjdsa
          </Text>
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
  description: {
    width: 110,
    height: 19,
  },
  text: {
    fontSize: 8,
    color: "#837575",
  },
  hora: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
