import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type TimerMode = "Focus" | "Break";

interface Props {
  timerMode: TimerMode;
}

const TimerModeDisplay: React.FC<Props> = ({ timerMode }) => (
  <View>
    <Text style={styles.timerModeContainer}>
      {timerMode} Time {timerMode === "Break" ? "🥦" : "🍅"}{" "}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  timerModeContainer: {
    alignItems: "center",
    fontSize: 35,
    fontWeight: "600",
    color: "#fff"
  }
});

export default TimerModeDisplay;