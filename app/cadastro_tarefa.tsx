import Recurrence from "@/src/components/Recurrence";
import TimePickerCustom from "@/src/components/TimePickerCustom";
import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
export default function CadastroTarefa() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={style.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            style.content,
            { paddingBottom: 30 + insets.bottom },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            mode="outlined"
            activeOutlineColor="#197293"
            outlineColor="#197293"
            label="Título"
            right={<TextInput.Affix text="/100" />}
            style={style.input}
            outlineStyle={{
              borderWidth: 2,
            }}
          />
          <TextInput
            mode="outlined"
            activeOutlineColor="#197293"
            outlineColor="#197293"
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
            activeOutlineColor="#197293"
            outlineColor="#197293"
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
              position: "relative",
              bottom: 10,
              right: 10,
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
              style={[
                style.button,
                { backgroundColor: "#A35635", borderRadius: 2 },
              ]}
              onPress={() => router.push("/")}
            >
              <Text style={{ backgroundColor: "#A35635", color: "#fff" }}>
                Cancelar
              </Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    backgroundColor: "#197293",
    flex: 1,
  },
  content: {
    paddingTop: 30,
    paddingBottom: 30,
    flexGrow: 1,
    alignSelf: "stretch",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 5,
  },
  input: {
    width: "90%",
  },
  button: {
    backgroundColor: "#1C911C",
    color: "#fff",
    width: 100,
    borderRadius: 2,
  },
});
