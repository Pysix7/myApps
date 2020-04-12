import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
// import SandBox from './components/SandBox';

export default function App() {
  const [todos, setTodo] = useState([
    { text: 'Eat', key: "1" },
    { text: 'Pubg', key: "2" },
    { text: 'Repeat', key: "3" },
  ])

  const pressHandler = (id) => {
    setTodo(prevTodos => {
      return prevTodos.filter(item => item.key !== id);
    })
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodo(prevTodos => {
        return [
          ...prevTodos,
          { text: text, key: Math.random().toString() }
        ]
      })
    } else {
      Alert.alert('OOPS!', "Todo must be over 3 Chars long", [
        { text: "Understood" }
      ])
    }
  };

  return (
    // <SandBox />
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <TodoForm submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem
                  onPress={pressHandler}
                  item={item} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    padding: 40
  },
  list: {
    flex: 1,
    marginTop: 20
  }
});
