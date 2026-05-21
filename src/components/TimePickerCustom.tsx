import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function TimePickerCustom() {
  const [hour, setHour] = useState("20");
  const [minute, setMinute] = useState("00");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Horário:</Text>

      <View style={styles.row}>
        <View style={styles.box}>
          <TextInput
            value={hour}
            onChangeText={setHour}
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
            onChangeText={setMinute}
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
