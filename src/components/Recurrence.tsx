import React, { useState } from "react";
import { View } from "react-native";
import { Checkbox, Text } from "react-native-paper";

export default function RecurrenceSelector() {
  const [enabled, setEnabled] = useState(false);

  const [daily, setDaily] = useState(false);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);

  return (
    <View style={{ padding: 20 }}>
      {/* Checkbox principal */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          status={enabled ? "checked" : "unchecked"}
          onPress={() => setEnabled(!enabled)}
          color="#197293"
          uncheckedColor="#197293"
        />

        <Text
          style={{
            color: "#197293",
            fontSize: 22,
          }}
        >
          Recorrência
        </Text>
      </View>

      {/* Opções */}
      {enabled && (
        <View
          style={{
            marginLeft: 20,
            marginTop: 5,
            gap: 2,
          }}
        >
          <Checkbox.Item
            label="Diária"
            status={daily ? "checked" : "unchecked"}
            onPress={() => setDaily(!daily)}
            color="#197293"
            labelStyle={{ color: "#197293" }}
          />

          <Checkbox.Item
            label="Semanal"
            status={weekly ? "checked" : "unchecked"}
            onPress={() => setWeekly(!weekly)}
            color="#197293"
            labelStyle={{ color: "#197293" }}
          />

          <Checkbox.Item
            label="Mensal"
            status={monthly ? "checked" : "unchecked"}
            onPress={() => setMonthly(!monthly)}
            color="#197293"
            labelStyle={{ color: "#197293" }}
          />
        </View>
      )}
    </View>
  );
}
