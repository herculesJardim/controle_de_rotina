import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PriorityValue = "alta" | "media" | "baixa";

type PriorityOption = {
  label: string;
  value: PriorityValue;
  color: string;
};

const PRIORITIES: PriorityOption[] = [
  { label: "Alta", value: "alta", color: "#FF3B30" },
  { label: "Média", value: "media", color: "#d0cd19" },
  { label: "Baixa", value: "baixa", color: "#34A853" },
];

type Props = {
  value?: PriorityValue;
  onChange?: (value: PriorityValue) => void;
};

export function PrioritySelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const selected = PRIORITIES.find((item) => item.value === value);

  const defaultColor = "#B75A3A";
  const currentColor = selected?.color ?? defaultColor;

  function handleSelect(option: PriorityOption) {
    onChange?.(option.value);
    setOpen(false);
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setOpen((prev) => !prev)}
        style={[
          styles.item,
          selected && {
            borderBottomWidth: 1,
            borderBottomColor: currentColor,
          },
        ]}
      >
        <View style={styles.left}>
          <Feather name="alert-triangle" size={16} color={currentColor} />

          <Text style={[styles.label, { color: currentColor }]}>
            {selected?.label ?? "Prioridade"}
          </Text>
        </View>

        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color={currentColor}
        />
      </Pressable>

      {open && (
        <View style={styles.dropdown}>
          {PRIORITIES.map((option) => {
            const isSelected = option.value === selected?.value;

            return (
              <Pressable
                key={option.value}
                onPress={() => handleSelect(option)}
                style={[
                  styles.item,
                  styles.option,
                  isSelected && {
                    borderBottomWidth: 1,
                    borderBottomColor: option.color,
                  },
                ]}
              >
                <View style={styles.left}>
                  <Feather
                    name="alert-triangle"
                    size={16}
                    color={option.color}
                  />

                  <Text style={[styles.label, { color: option.color }]}>
                    {option.label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
  },

  dropdown: {
    marginTop: 12,
    gap: 12,
  },

  item: {
    minHeight: 40,
    paddingHorizontal: 4,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  option: {
    justifyContent: "flex-start",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: "400",
  },
});
