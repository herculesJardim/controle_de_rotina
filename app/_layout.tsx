import Cabecalho from "@/src/components/Cabecalho";
import { SelectedDateProvider } from "@/src/context/selectedDateContext";
import { Stack, useLocalSearchParams } from "expo-router";
import { PaperProvider } from "react-native-paper";

function CadastroHeader() {
  const params = useLocalSearchParams<{ id?: string }>();
  const title = params.id ? "Editar Tarefa" : "Nova Tarefa";

  return <Cabecalho cabecalho={{ title }} />;
}

export default function RootLayout() {
  return (
    <PaperProvider>
      <SelectedDateProvider>
        <Stack
          screenOptions={{
            header: () => <Cabecalho cabecalho={{ title: "Padrão" }} />,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen
            name="home"
            options={{
              header: () => (
                <Cabecalho cabecalho={{ title: "Gerenciador Diário" }} />
              ),
            }}
          />
          <Stack.Screen
            name="cadastro_tarefa"
            options={{
              header: () => <CadastroHeader />,
            }}
          />
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
      </SelectedDateProvider>
    </PaperProvider>
  );
}
