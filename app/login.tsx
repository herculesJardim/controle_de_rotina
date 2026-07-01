import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../src/lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignIn() {
    const cleanedEmail = email.trim().toLowerCase();
    const cleanedPassword = password.trim();

    if (!cleanedEmail || !cleanedPassword) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanedEmail,
        password: cleanedPassword,
      });

      if (error) {
        Alert.alert("Erro ao entrar", error.message);
        return;
      }

      if (data.session) {
        router.replace("/home");
      }
    } finally {
      setLoading(false);
    }
  }

  async function signUpWithEmail() {
    const cleanedEmail = email.trim().toLowerCase();
    const cleanedPassword = password.trim();

    if (!cleanedEmail || !cleanedPassword) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: cleanedEmail,
        password: cleanedPassword,
      });

      if (error) {
        Alert.alert("Erro ao cadastrar", error.message);
        return;
      }

      if (!session) {
        Alert.alert(
          "Cadastro realizado",
          "Verifique seu e-mail para confirmar a conta.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.form}>
        <Text style={style.title}>Gestor de Tarefas</Text>

        <TextInput
          mode="outlined"
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="seuemail@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          style={style.input}
          outlineStyle={{ borderWidth: 1, borderColor: "#197293" }}
        />

        <TextInput
          mode="outlined"
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Sua senha"
          secureTextEntry={!showPassword}
          onSubmitEditing={handleSignIn}
          returnKeyType="done"
          style={style.input}
          outlineStyle={{ borderWidth: 1, borderColor: "#197293" }}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword((prev) => !prev)}
              forceTextInputFocus={false}
            />
          }
        />

        {loading ? (
          <ActivityIndicator size="large" color="#197293" />
        ) : (
          <>
            <Button
              mode="contained"
              buttonColor="#197293"
              textColor="#fff"
              onPress={handleSignIn}
              disabled={loading}
            >
              Entrar
            </Button>
            <Button
              mode="outlined"
              textColor="#197293"
              onPress={signUpWithEmail}
              disabled={loading}
            >
              Criar conta
            </Button>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    padding: 24,
    gap: 12,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    marginHorizontal: 24,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#197293",
    marginBottom: 8,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
  },
});
