import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TaskListToDo from './component/TaskListToDo';
import TimerCountDown from './component/TimerCountDown';
import TimerModeDisplay, { TimerMode } from './component/TimerModeDisplay';
import ToggleStartStopButton from './component/ToggleStartStopButton';
import { Audio } from 'expo-av';


const FocusTime: number = 1000 * 60 * 25;
const BreakTime: number = 1000 * 60 * 5;

export default function App() {
  const [timerCount, setTimerCount] = useState<number>(FocusTime);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);
  const [timerRaning, setTimerRaning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<TimerMode>("Focus")
  const [sound, setSound] = useState<any>();

  async function playAlarm1() {
    const { sound } = await Audio.Sound.createAsync(require('./assets/sounds/Alarm1.mp3'));
    setSound(sound);
    await sound.playAsync();
  };

  async function playAlarm2() {
    const { sound } = await Audio.Sound.createAsync(require('./assets/sounds/Alarm2.mp3'));
    setSound(sound);
    await sound.playAsync();
  };

  const timerStart = () => {
    const id = setInterval(() => setTimerCount((prev) => prev - 1000), 1000);
    setTimerInterval(id);
    setTimerRaning(true);
  }
  const timerStop = () => {
    if (timerInterval != null) {
      clearInterval(timerInterval);
    }
    setTimerRaning(false);
  }

  useEffect(() => {
    if (timerCount === 0) {
      if (timerMode === "Focus") {
        setTimerCount(BreakTime);
        setTimerMode("Break");
        playAlarm1();
      }
      if (timerMode === "Break") {
        setTimerCount(FocusTime);
        setTimerMode("Focus");
        playAlarm2();
      }
    }
  }, [timerCount])

  const restartTimer = () => {
    setTimerCount(0);
  }

  return (
    <View style={{ ...styles.container, ...{ backgroundColor: timerMode === "Focus" ? "#d95550" : "#9bcc98" } }}>
      <StatusBar style="auto" />
      <TimerModeDisplay timerMode={timerMode} />
      <TimerCountDown timerDate={new Date(timerCount)} restartTimer={restartTimer} />
      <ToggleStartStopButton timerRaning={timerRaning} timerStop={timerStop} timerStart={timerStart} />
      <TaskListToDo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
