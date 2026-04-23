import { StyleSheet, Text, View } from "react-native";
import { CabecalhoType } from "../tipos/types";
import Avatar from "./Avatar";

type CabecalhoProps = {
  cabecalho: CabecalhoType;
};
export default function Cabecalho({ cabecalho }: CabecalhoProps) {
  return (
    <View style={style.container}>
      <Avatar />
      <Text style={style.text}>{cabecalho.title}</Text>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#A35635",
    width: "100%",
  },
  text: {
    color: "#ffff",
    fontSize: 16,
  },
});
