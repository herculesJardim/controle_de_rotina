import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type TimePickerCustomProps = {
  value?: string | null;
  onChange?: (value: string) => void;
};

function parseTimeParts(value?: string | null) {
  if (!value) {
    return { hour: "20", minute: "00" };
  }

  const trimmed = value.trim();
  const match = /^([0-9]{1,2})[:.\-]([0-9]{1,2})/.exec(trimmed);

  if (!match) {
    return { hour: "20", minute: "00" };
  }

  return {
    hour: String(Math.min(23, Math.max(0, Number(match[1])))).padStart(2, "0"),
    minute: String(Math.min(59, Math.max(0, Number(match[2])))).padStart(
      2,
      "0",
    ),
  };
}

function onlyTwoDigits(value: string) {
  return value.replace(/\D/g, "").slice(0, 2);
}

function formatHour(value: string) {
  const digits = onlyTwoDigits(value);

  if (!digits) return "00";

  const number = Number(digits);

  return String(Math.min(23, Math.max(0, number))).padStart(2, "0");
}

function formatMinute(value: string) {
  const digits = onlyTwoDigits(value);

  if (!digits) return "00";

  const number = Number(digits);

  return String(Math.min(59, Math.max(0, number))).padStart(2, "0");
}

export default function TimePickerCustom({
  value,
  onChange,
}: TimePickerCustomProps) {
  const [hour, setHour] = useState("20");
  const [minute, setMinute] = useState("00");

  useEffect(() => {
    const parsed = parseTimeParts(value);
    setHour(parsed.hour);
    setMinute(parsed.minute);
  }, [value]);

  function handleHourChange(text: string) {
    const nextHour = onlyTwoDigits(text);
    setHour(nextHour);
  }

  function handleMinuteChange(text: string) {
    const nextMinute = onlyTwoDigits(text);
    setMinute(nextMinute);
  }

  function applyFormattedTime() {
    const formattedHour = formatHour(hour);
    const formattedMinute = formatMinute(minute);

    setHour(formattedHour);
    setMinute(formattedMinute);

    onChange?.(`${formattedHour}:${formattedMinute}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Horário:</Text>

      <View style={styles.row}>
        <View style={styles.box}>
          <TextInput
            value={hour}
            onChangeText={handleHourChange}
            onBlur={applyFormattedTime}
            keyboardType="numeric"
            maxLength={2}
            style={styles.input}
          />

          <Text style={styles.subLabel}>Hora</Text>
        </View>

        <Text style={styles.separator}>:</Text>

        <View style={styles.box}>
          <TextInput
            value={minute}
            onChangeText={handleMinuteChange}
            onBlur={applyFormattedTime}
            keyboardType="numeric"
            maxLength={2}
            style={styles.input}
          />

          <Text style={styles.subLabel}>Minutos</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#197293",
    padding: 20,
    borderRadius: 20,
    width: "90%",
  },

  label: {
    fontSize: 12,
    marginBottom: 10,
    color: "#ffff",
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    alignItems: "center",
  },

  input: {
    width: 100,
    height: 50,
    backgroundColor: "#DDD3E6",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 36,
    color: "#3A1A1A",
  },

  separator: {
    fontSize: 40,
    marginHorizontal: 10,
    color: "#3A1A1A",
  },

  subLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#ffff",
  },
});
