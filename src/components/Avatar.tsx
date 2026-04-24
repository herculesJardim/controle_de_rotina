import { Image, StyleSheet, View } from "react-native";

export default function Avatar() {
  const url = require("../../assets/images/react-logo.png");
  return (
    <View style={style.container}>
      <Image source={url} style={style.image} />
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
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: "#fff",
  },
  image: {
    width: 50,
    height: 50,
  },
});
