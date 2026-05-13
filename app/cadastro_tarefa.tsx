import Recurrence from "@/src/components/Recurrence";
import TimePickerCustom from "@/src/components/TimePickerCustom";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
export default function CadastroTarefa() {
  return (
    <View style={style.container}>
      <TextInput
        mode="outlined"
        activeOutlineColor="#f16615"
        outlineColor="#f16615"
        label="Título"
        right={<TextInput.Affix text="/100" />}
        style={style.input}
        outlineStyle={{
          borderWidth: 2,
        }}
      />
      <TextInput
        mode="outlined"
        activeOutlineColor="#f16615"
        outlineColor="#f16615"
        label="Descrição"
        right={<TextInput.Affix text="/400" />}
        style={{ height: 176, width: "90%" }}
        outlineStyle={{
          borderWidth: 2,
        }}
      />
      <TimePickerCustom />
      <TextInput
        mode="outlined"
        activeOutlineColor="#f16615"
        outlineColor="#f16615"
        label="local"
        right={<TextInput.Icon icon="google-maps" />}
        style={style.input}
        outlineStyle={{
          borderWidth: 2,
        }}
      />
      <View style={{ alignSelf: "stretch" }}>
        <Recurrence />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 50,
          right: 20,
          flexDirection: "row",
          gap: 10,
          justifyContent: "flex-end",
          alignSelf: "stretch",
        }}
      >
        <Button
          mode="contained-tonal"
          style={style.button}
          onPress={() => console.log("Cadastrar")}
        >
          <Text style={style.button}>Salvar</Text>
        </Button>
        <Button
          mode="contained-tonal"
          style={
            (style.button, { backgroundColor: "#A35635", borderRadius: 2 })
          }
          onPress={() => router.push("/")}
        >
          <Text style={{ backgroundColor: "#A35635", color: "#ffffff" }}>
            Cancelar
          </Text>
        </Button>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 5,
  },
  input: {
    width: "90%",
  },
  button: {
    backgroundColor: "#1C911C",
    color: "#ffffff",
    width: 100,
    borderRadius: 2,
  },
});
