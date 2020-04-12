import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [persons, setPersons] = useState([
    { name: "abcd", id: 1 },
    { name: "efgh", id: 2 },
    { name: "ijkl", id: 3 },
    { name: "mnop", id: 4 },
    { name: "qrst", id: 5 },
    { name: "mnop", id: 6 },
    { name: "mnop", id: 7 },
    { name: "mnop", id: 8 },
    { name: "mnop", id: 49 },
    { name: "mnop", id: 41 },
    { name: "mnop", id: 42 },
    { name: "mnop", id: 43 },
  ]);

  const pressHandler = (id) => {
    console.log("id", id)
    setPersons(prevPersons => prevPersons.filter(item => item.id !== id))
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={persons}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => pressHandler(item.id)}>
            <Text style={styles.listItem}>{item.name}</Text>
          </TouchableOpacity>}
      />
      {/* <ScrollView>
        {persons.map(item => (
          <View key={item.key} style={styles.listItem}>
            <Text>{item.name}</Text>
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  listItem: {
    backgroundColor: '#7fcced',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10
  }
});
