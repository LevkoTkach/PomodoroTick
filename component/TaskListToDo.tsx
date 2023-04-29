import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = {
  id: number;
  text: string;
  done: boolean;
};
const key: string = "tasks";

const TaskListToDo: React.FC = () => {
  const [text, onChangeText] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>([]);


  async function loadTask() {
    try {
      const tasks = await AsyncStorage.getItem(key);
      if (tasks !== null) {
        setTaskList(JSON.parse(tasks));
      }
    } catch (e) {
      console.log('dont save data' + e);
    }
  }
  useEffect(() => {
    loadTask();
  }, [])
  useEffect(() => {
    try {
      AsyncStorage.setItem(key, JSON.stringify(taskList));
    } catch (e) {
      console.log('dont save data' + e);
    }
  }, [taskList])

  const addTask = () => {
    if (!text) return alert('write TODO');
    const newTask: Task = {
      id: Date.now(),
      text: text,
      done: false,
    };
    setTaskList([...taskList, newTask]);
    onChangeText('');
  };


  const toggleTask = (id: number) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };

  const removeTask = (id: number) => {
    const updatedTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTaskList);
  };

  return (
    <SafeAreaView style={styles.taskContainer}>
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Write Task"
          multiline
        />
        <Pressable style={styles.addTask} onPress={addTask}>
          <Text style={styles.addTaskText}>Add</Text>
        </Pressable>
      </View>

      <ScrollView>
        {taskList.map((task, index) => (
          <View key={task.id} style={styles.taskItem}>
            <Pressable onPress={() => toggleTask(task.id)}>
              <Text style={task.done ? styles.taskDone : styles.taskText}>
                {index + 1}. {task.text}
              </Text>
            </Pressable>
            <Pressable
              style={styles.removeTask}
              onPress={() => removeTask(task.id)}>
              <Text>X</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    minWidth: 300,
    marginHorizontal: 20,
  },
  inputBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 6,
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#333",
    borderRadius: 6,
  },
  addTask: {
    marginLeft: 10,
    width: 60,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 6,
  },
  addTaskText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  taskItem: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  taskText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  taskDone: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ccc",
    textDecorationLine: "line-through",
  },
  removeTask: {
    backgroundColor: '#f44336',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default TaskListToDo;