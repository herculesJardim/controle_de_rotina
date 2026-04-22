import { StyleSheet, Text, View } from "react-native";

export default function Avatar() {
  return (
    <View style={style.container}>
      <Text>Avatar</Text>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 50,
    height: 50,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: "#fff",
  },
});
