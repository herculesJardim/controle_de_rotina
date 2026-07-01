import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../src/lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
        <Text>E-mail</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="seuemail@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
          }}
        />

        <Text>Senha</Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Sua senha"
          secureTextEntry
          onSubmitEditing={handleSignIn}
          returnKeyType="done"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
          }}
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Button title="Entrar" onPress={handleSignIn} disabled={loading} />
            <Button
              title="Criar conta"
              onPress={signUpWithEmail}
              disabled={loading}
            />
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
  },
});
