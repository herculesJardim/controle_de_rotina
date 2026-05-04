import { FlatList, View } from "react-native";
import Dia from "./Dia";
function gerarDias(qtd = 15) {
  const hoje = new Date();

  return Array.from({ length: qtd }, (_, i) => {
    const data = new Date();
    data.setDate(hoje.getDate() + i);

    return {
      diaMes: String(data.getDate()).padStart(2, "0"),
      diaSemana: data.toLocaleDateString("pt-BR", {
        weekday: "short",
      }),
      dataCompleta: data,
    };
  });
}
export default function CarrocelDias() {
  const diasSemana = gerarDias();
  return (
    <FlatList
      contentContainerStyle={{ paddingHorizontal: 16 }}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      data={diasSemana}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <Dia dia={item} />}
    />
  );
}
