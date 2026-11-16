import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text, TextInput,
  View,
} from 'react-native';

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

export default function Index() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), title: text, done: false }]);
    setText('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Todos</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTodo}
        />
        <Pressable style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable style={{ flex: 1 }} onPress={() => toggleTodo(item.id)}>
              <Text style={[styles.itemText, item.done && styles.done]}>
                {item.title}
              </Text>
            </Pressable>
            <Pressable onPress={() => deleteTodo(item.id)}>
              <Text style={styles.delete}>✕</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  heading: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  row: { flexDirection: 'row', marginBottom: 16 },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, padding: 10, marginRight: 8,
  },
  addButton: {
    backgroundColor: '#4f46e5', paddingHorizontal: 16,
    justifyContent: 'center', borderRadius: 8,
  },
  addText: { color: 'white', fontWeight: '600' },
  item: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  itemText: { fontSize: 16 },
  done: { textDecorationLine: 'line-through', color: '#999' },
  delete: { fontSize: 18, color: '#d33', paddingLeft: 12 },
});