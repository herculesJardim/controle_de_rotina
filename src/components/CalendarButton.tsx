import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

export function CalendarButton() {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <>
      <Pressable onPress={() => setVisible(true)}>
        <Feather name="calendar" size={25} color="#ffff" />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <Text style={styles.title}>Escolha uma data</Text>

              <Pressable onPress={() => setVisible(false)}>
                <Feather name="x" size={22} color="#333" />
              </Pressable>
            </View>

            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                setVisible(false);
              }}
              markedDates={
                selectedDate
                  ? {
                      [selectedDate]: {
                        selected: true,
                        selectedColor: "#B75A3A",
                      },
                    }
                  : {}
              }
              theme={{
                todayTextColor: "#B75A3A",
                arrowColor: "#B75A3A",
                selectedDayBackgroundColor: "#B75A3A",
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#B75A3A",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modal: {
    width: "100%",
    borderRadius: 18,
    backgroundColor: "#FFF",
    padding: 16,
  },

  header: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  calendarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
