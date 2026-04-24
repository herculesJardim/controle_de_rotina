import { StyleSheet, Text, View } from "react-native";
import { CabecalhoType } from "../tipos/types";
import Avatar from "./Avatar";

type CabecalhoProps = {
  cabecalho: CabecalhoType;
};

export default function Cabecalho({ cabecalho }: CabecalhoProps) {
  return (
    <View style={style.container}>
      <View>
        <Avatar />
      </View>
      <View>
        <Text style={style.text}>{cabecalho.title}</Text>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#A35635",
    alignSelf: "stretch",
  },
  text: {
    color: "#ffff",
    fontSize: 20,
  },
});
