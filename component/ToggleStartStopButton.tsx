import React from "react"
import { StyleSheet, Pressable, View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
interface Props {
  timerRaning: boolean;
  timerStop: () => void;
  timerStart: () => void;
}

const ToggleStartStopButton: React.FC<Props> = ({ timerRaning, timerStop, timerStart }) => {
  return (
    <Pressable onPress={timerRaning ? timerStop : timerStart}>
      <View style={styles.container}>
        <FontAwesome style={styles.icon} name={timerRaning ? 'pause' : 'play'} size={120} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    color: "#fff"
  },
  container: {
    borderWidth: 5,
    width: 200,
    height: 200,
    borderRadius: 250 / 2,
    justifyContent: "center",
    borderColor: "#fff",
    marginVertical: 20,
  },
});

export default ToggleStartStopButton;