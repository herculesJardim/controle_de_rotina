import Cabecalho from "@/src/components/Cabecalho";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          header: () => <Cabecalho cabecalho={{ title: "Padrão" }} />,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            header: () => (
              <Cabecalho cabecalho={{ title: "Gerenciador Diário" }} />
            ),
          }}
        />
        <Stack.Screen
          name="cadastro_tarefa"
          options={{
            header: () => <Cabecalho cabecalho={{ title: "Nova tarefa" }} />,
          }}
        />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
