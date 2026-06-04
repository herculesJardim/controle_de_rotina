import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [focused, setFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  return (
    <SafeAreaView style={style.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        right={<TextInput.Icon icon="account" />}
        style={[
          style.input,
          { borderBottomColor: focused ? "#6200ee" : "#ccc" },
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#aaa"
        value={senha}
        right={<TextInput.Icon icon="eye-off" />}
        secureTextEntry={true}
        style={[
          style.input,
          { borderBottomColor: focused ? "#6200ee" : "#ccc" },
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={(senha) => setSenha(senha)}
      />
      <Button
        mode="contained-tonal"
        style={style.button}
        onPress={() => router.push("/")}
      >
        <Text style={style.button}>Login</Text>
      </Button>
      <Button
        mode="contained-tonal"
        style={style.button}
        onPress={() => console.log("Cadastrar")}
      >
        <Text style={style.button}>Cadastrar</Text>
      </Button>
      <IconButton
        icon="google"
        mode="contained"
        size={30}
        onPress={() => console.log("Pressed")}
      />
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#38927e",
  },
  input: {
    borderBottomWidth: 1.5,
    fontSize: 16,
    paddingVertical: 1,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1C911C",
    color: "#ffffff",
    width: 137,
  },
});
