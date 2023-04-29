import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

type Props = {
  timerDate: Date;
  restartTimer: () => void;
}

const TimerCountDown: React.FC<Props> = ({ timerDate, restartTimer }) => (
  <View>
    <Pressable onPress={restartTimer}>
      <Text style={styles.timerText}>
        {timerDate.getMinutes().toString().padStart(2, "0")}:
        {timerDate.getSeconds().toString().padStart(2, "0")}
      </Text>
    </Pressable>

  </View>
)

const styles = StyleSheet.create({
  timerText: {
    fontSize: 60,
    fontWeight: "700",
    color: "#fff",
  }
}); 
export default TimerCountDown;