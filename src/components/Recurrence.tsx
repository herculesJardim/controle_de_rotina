import React, { useState } from "react";
import { View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { TaskRecurrence } from "../tipos/types";

type Props = {
  value?: TaskRecurrence;
  onChange?: (value: TaskRecurrence) => void;
};

export default function RecurrenceSelector({
  value = "nenhuma",
  onChange,
}: Props) {
  const [enabled, setEnabled] = useState(value !== "nenhuma");

  function updateSelection(next: TaskRecurrence) {
    onChange?.(next);
  }

  function toggleOption(option: TaskRecurrence) {
    if (value === option) {
      setEnabled(false);
      updateSelection("nenhuma");
      return;
    }

    setEnabled(true);
    updateSelection(option);
  }

  return (
    <View style={{ padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          status={enabled ? "checked" : "unchecked"}
          onPress={() => {
            const nextEnabled = !enabled;
            setEnabled(nextEnabled);
            if (!nextEnabled) {
              updateSelection("nenhuma");
            }
          }}
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
            status={value === "diaria" ? "checked" : "unchecked"}
            onPress={() => toggleOption("diaria")}
            color="#197293"
            labelStyle={{ color: "#197293" }}
          />

          <Checkbox.Item
            label="Semanal"
            status={value === "semanal" ? "checked" : "unchecked"}
            onPress={() => toggleOption("semanal")}
            color="#197293"
            labelStyle={{ color: "#197293" }}
          />

          <Checkbox.Item
            label="Mensal"
            status={value === "mensal" ? "checked" : "unchecked"}
            onPress={() => toggleOption("mensal")}
            color="#197293"
            labelStyle={{ color: "#197293" }}
          />
        </View>
      )}
    </View>
  );
}
