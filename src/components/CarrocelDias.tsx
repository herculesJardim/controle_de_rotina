import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

const nomesDias = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function CalendarioModerno() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const { width } = useWindowDimensions();

  const itemWidth = Math.min(72, Math.max(44, width / 7));

  const dias = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return Array.from({ length: 31 }, (_, index) => {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + index - 15);

      return {
        id: data.getTime().toString(),
        data,
        diaMes: data.getDate(),
        diaSemana: nomesDias[data.getDay()],
      };
    });
  }, []);

  const mesmoDia = (a: Date, b: Date) => a.toDateString() === b.toDateString();

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.mes}>{meses[dataSelecionada.getMonth()]}</Text>

        <Text style={styles.ano}>{dataSelecionada.getFullYear()}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        contentContainerStyle={styles.lista}
      >
        {dias.map((item) => {
          const selecionado = mesmoDia(item.data, dataSelecionada);

          return (
            <Pressable
              key={item.id}
              onPress={() => setDataSelecionada(item.data)}
              style={[
                styles.card,
                { width: itemWidth },
                selecionado && styles.cardSelecionado,
              ]}
            >
              <Text
                style={[
                  styles.diaSemana,
                  selecionado && styles.textoSelecionado,
                ]}
              >
                {item.diaSemana}
              </Text>

              <Text
                style={[styles.diaMes, selecionado && styles.textoSelecionado]}
              >
                {item.diaMes}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",

    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 14,
  },

  mes: {
    color: "#197293",
    fontSize: 18,
    fontWeight: "700",
  },

  ano: {
    color: "#197293",
    fontSize: 18,
    fontWeight: "700",
  },

  lista: {
    gap: 10,
    paddingHorizontal: 4,
  },

  card: {
    height: 72,

    borderRadius: 18,

    backgroundColor: "#F8FAFC",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "#E2E8F0",

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  cardSelecionado: {
    backgroundColor: "#197293",

    transform: [{ scale: 1.05 }],

    borderColor: "#197293",

    elevation: 5,

    shadowColor: "#197293",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  diaSemana: {
    fontSize: 11,
    fontWeight: "700",

    color: "#64748B",

    marginBottom: 6,
  },

  diaMes: {
    fontSize: 20,
    fontWeight: "800",

    color: "#0F172A",
  },

  textoSelecionado: {
    color: "#FFFFFF",
  },
});
