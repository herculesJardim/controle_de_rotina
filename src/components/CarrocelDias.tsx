import { useEffect, useMemo, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSelectedDate } from "../context/selectedDateContext";

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
  const { selectedDate, setSelectedDate } = useSelectedDate();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [dias, setDias] = useState<Date[]>([]);

  const itemWidth = Math.min(72, Math.max(44, width / 7));

  const selectedDateObj = useMemo(() => {
    const date = new Date(selectedDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }, [selectedDate]);

  useEffect(() => {
    const base = new Date(selectedDateObj);
    const nextDays = Array.from({ length: 21 }, (_, index) => {
      const date = new Date(base);
      date.setDate(base.getDate() + index - 10);
      return date;
    });

    setDias(nextDays);
  }, [selectedDateObj]);

  useEffect(() => {
    if (dias.length === 0) return;

    const selectedIndex = dias.findIndex(
      (day) => day.toDateString() === selectedDateObj.toDateString(),
    );
    const offset = selectedIndex * itemWidth;

    scrollRef.current?.scrollTo({ x: offset, animated: false });
  }, [dias, itemWidth, selectedDateObj]);

  function addDays(direction: "left" | "right") {
    setDias((prev) => {
      const base = direction === "right" ? prev[prev.length - 1] : prev[0];
      const next = Array.from({ length: 5 }, (_, index) => {
        const date = new Date(base);
        date.setDate(
          base.getDate() + (direction === "right" ? index + 1 : -(index + 1)),
        );
        return date;
      });

      if (direction === "right") {
        return [...prev, ...next];
      }

      return [...next, ...prev];
    });
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const offset = event.nativeEvent.contentOffset.x;
    const threshold = itemWidth * 5;

    if (offset <= threshold) {
      addDays("left");
    }

    if (offset >= (dias.length - 6) * itemWidth - threshold) {
      addDays("right");
    }
  }

  const mesmoDia = (a: Date, b: string) => a.toISOString().slice(0, 10) === b;

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.mes}>{meses[selectedDateObj.getMonth()]}, </Text>

        <Text style={styles.ano}>{selectedDateObj.getFullYear()}</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        contentContainerStyle={styles.lista}
        onScroll={handleScroll}
        scrollEventThrottle={200}
      >
        {dias.map((item, index) => {
          const selecionado = mesmoDia(item, selectedDate);

          return (
            <Pressable
              key={`${item.toISOString()}-${index}`}
              onPress={() => setSelectedDate(item.toISOString().slice(0, 10))}
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
                {nomesDias[item.getDay()]}
              </Text>

              <Text
                style={[styles.diaMes, selecionado && styles.textoSelecionado]}
              >
                {item.getDate()}
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
    backgroundColor: "#d9d9d9",

    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  topo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",

    marginBottom: 14,
  },

  mes: {
    color: "#000000",
    fontSize: 16,
  },

  ano: {
    color: "#000000",
    fontSize: 16,
  },

  lista: {
    gap: 5,
    paddingHorizontal: 4,
  },

  card: {
    height: 75,

    borderRadius: 12,

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
    fontSize: 12,
    fontWeight: "500",

    color: "#64748B",

    marginBottom: 6,
  },

  diaMes: {
    fontSize: 16,
    fontWeight: "700",

    color: "#0F172A",
  },

  textoSelecionado: {
    color: "#FFFFFF",
  },
});
