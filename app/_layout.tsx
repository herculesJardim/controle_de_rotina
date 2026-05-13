import Cabecalho from "@/src/components/Cabecalho";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
