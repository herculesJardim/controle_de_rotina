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
          color="#B55D33"
          uncheckedColor="#B55D33"
        />

        <Text
          style={{
            color: "#B55D33",
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
            marginTop: 10,
            gap: 2,
          }}
        >
          <Checkbox.Item
            
            label="Diária"
            status={daily ? "checked" : "unchecked"}
            onPress={() => setDaily(!daily)}
            color="#B55D33"
            labelStyle={{ color: "#B55D33" }}
          />

          <Checkbox.Item
            label="Semanal"
            status={weekly ? "checked" : "unchecked"}
            onPress={() => setWeekly(!weekly)}
            color="#B55D33"
            labelStyle={{ color: "#B55D33" }}
          />

          <Checkbox.Item
            label="Mensal"
            status={monthly ? "checked" : "unchecked"}
            onPress={() => setMonthly(!monthly)}
            color="#B55D33"
            labelStyle={{ color: "#B55D33" }}
          />
        </View>
      )}
    </View>
  );
}
