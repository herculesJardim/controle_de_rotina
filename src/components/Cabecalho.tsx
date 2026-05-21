import { StyleSheet, Text, View } from "react-native";
import { CabecalhoType } from "../tipos/types";
import Avatar from "./Avatar";

type CabecalhoProps = {
  cabecalho: CabecalhoType;
};

export default function Cabecalho({ cabecalho }: CabecalhoProps) {
  return (
    <View style={style.container}>
      <View style={style.avatar}>
        <Avatar />
      </View>
      <View style={style.titulo}>
        <Text style={style.text}>{cabecalho.title}</Text>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    paddingTop: 50,
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#197293",
    alignSelf: "stretch",
  },
  titulo: {
    alignItems: "center",
    width: "80%",
  },
  avatar: {
    alignItems: "center",
    width: "20%",
  },
  text: {
    color: "#ffff",
    fontSize: 20,
  },
});
