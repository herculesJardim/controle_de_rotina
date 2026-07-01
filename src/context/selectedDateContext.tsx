import React, { createContext, useContext, useState } from "react";

type SelectedDateContextType = {
  selectedDate: string;
  setSelectedDate: (value: string) => void;
};

const SelectedDateContext = createContext<SelectedDateContextType | undefined>(
  undefined,
);

export function SelectedDateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  );

  return (
    <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </SelectedDateContext.Provider>
  );
}

export function useSelectedDate() {
  const context = useContext(SelectedDateContext);

  if (!context) {
    throw new Error(
      "useSelectedDate must be used within a SelectedDateProvider",
    );
  }

  return context;
}
